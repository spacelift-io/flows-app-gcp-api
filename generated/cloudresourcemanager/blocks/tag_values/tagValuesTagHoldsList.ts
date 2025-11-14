import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const tagValuesTagHoldsList: AppBlock = {
  name: "Tag Values - List",
  description: `Lists TagHolds under a TagValue.`,
  category: "Tag Values",
  inputs: {
    default: {
      config: {
        filter: {
          name: "Filter",
          description:
            "Optional. Criteria used to select a subset of TagHolds parented by the TagValue to return. This field follows the syntax defined by aip.dev/160; the `holder` and `origin` fields are supported for filtering. Currently only `AND` syntax is supported. Some example queries are: * `holder = //compute.googleapis.com/compute/projects/myproject/regions/us-east-1/instanceGroupManagers/instance-group` * `origin = 35678234` * `holder = //compute.googleapis.com/compute/projects/myproject/regions/us-east-1/instanceGroupManagers/instance-group AND origin = 35678234`",
          type: "string",
          required: false,
        },
        pageSize: {
          name: "PageSize",
          description:
            "Optional. The maximum number of TagHolds to return in the response. The server allows a maximum of 300 TagHolds to return. If unspecified, the server will use 100 as the default.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description:
            "Optional. A pagination token returned from a previous call to `ListTagHolds` that indicates where this listing should continue from.",
          type: "string",
          required: false,
        },
        parent: {
          name: "Parent",
          description:
            "Required. The resource name of the parent TagValue. Must be of the form: `tagValues/{tag-value-id}`.",
          type: "string",
          required: true,
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
            "https://www.googleapis.com/auth/cloud-platform.read-only",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://cloudresourcemanager.googleapis.com/";
        const path = `v3/{+parent}/tagHolds`;
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
          nextPageToken: {
            type: "string",
          },
          tagHolds: {
            type: "array",
            items: {
              type: "object",
              properties: {
                holder: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                origin: {
                  type: "object",
                  additionalProperties: true,
                },
                createTime: {
                  type: "object",
                  additionalProperties: true,
                },
                helpLink: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default tagValuesTagHoldsList;
