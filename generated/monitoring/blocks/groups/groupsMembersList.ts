import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const groupsMembersList: AppBlock = {
  name: "Groups - List",
  description: `Lists the monitored resources that are members of a group.`,
  category: "Groups",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The group whose members are listed. The format is: projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] ",
          type: "string",
          required: true,
        },
        pageSize: {
          name: "PageSize",
          description:
            "A positive number that is the maximum number of results to return.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description:
            "If this field is not empty then it must contain the next_page_token value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call.",
          type: "string",
          required: false,
        },
        filter: {
          name: "Filter",
          description:
            'An optional list filter (https://cloud.google.com/monitoring/api/learn_more#filtering) describing the members to be returned. The filter may reference the type, labels, and metadata of monitored resources that comprise the group. For example, to return only resources representing Compute Engine VM instances, use this filter: `resource.type = "gce_instance"` ',
          type: "string",
          required: false,
        },
        "interval.endTime": {
          name: "Interval EndTime",
          description: "Required. The end of the time interval.",
          type: "string",
          required: false,
        },
        "interval.startTime": {
          name: "Interval StartTime",
          description:
            "Optional. The beginning of the time interval. The default value for the start time is the end time. The start time must not be later than the end time.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        // Parse service account credentials
        const credentials = JSON.parse(input.app.config.serviceAccountKey);

        // Initialize Google Auth
        const auth = new GoogleAuth({
          credentials,
          scopes: [
            "https://www.googleapis.com/auth/cloud-platform",
            "https://www.googleapis.com/auth/monitoring",
            "https://www.googleapis.com/auth/monitoring.read",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://monitoring.googleapis.com/";
        const path = `v3/{+name}/members`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error(
            `GCP API error: ${response.status} ${response.statusText}`,
          );
        }

        const result = await response.json();
        await events.emit(result || {});
      },
    },
  },
  outputs: {
    default: {
      possiblePrimaryParents: ["default"],
      type: {
        type: "object",
        properties: {
          members: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: {
                  type: "object",
                  additionalProperties: true,
                },
                labels: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          nextPageToken: {
            type: "string",
          },
          totalSize: {
            type: "number",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default groupsMembersList;
