import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const alertPoliciesList: AppBlock = {
  name: "Alert Policies - List",
  description: `Lists the existing alerting policies for the workspace.`,
  category: "Alert Policies",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) whose alert policies are to be listed. The format is: projects/[PROJECT_ID_OR_NUMBER] Note that this field names the parent container in which the alerting policies to be listed are stored. To retrieve a single alerting policy by name, use the GetAlertPolicy operation, instead.",
          type: "string",
          required: true,
        },
        filter: {
          name: "Filter",
          description:
            "Optional. If provided, this field specifies the criteria that must be met by alert policies to be included in the response.For more details, see sorting and filtering (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering).",
          type: "string",
          required: false,
        },
        orderBy: {
          name: "OrderBy",
          description:
            "Optional. A comma-separated list of fields by which to sort the result. Supports the same set of field references as the filter field. Entries can be prefixed with a minus sign to sort by the field in descending order.For more details, see sorting and filtering (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering).",
          type: "string",
          required: false,
        },
        pageSize: {
          name: "PageSize",
          description:
            "Optional. The maximum number of results to return in a single response.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description:
            "Optional. If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return more results from the previous method call.",
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
        const path = `v3/{+name}/alertPolicies`;
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
          alertPolicies: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                displayName: {
                  type: "object",
                  additionalProperties: true,
                },
                documentation: {
                  type: "object",
                  additionalProperties: true,
                },
                userLabels: {
                  type: "object",
                  additionalProperties: true,
                },
                conditions: {
                  type: "object",
                  additionalProperties: true,
                },
                combiner: {
                  type: "object",
                  additionalProperties: true,
                },
                enabled: {
                  type: "object",
                  additionalProperties: true,
                },
                validity: {
                  type: "object",
                  additionalProperties: true,
                },
                notificationChannels: {
                  type: "object",
                  additionalProperties: true,
                },
                creationRecord: {
                  type: "object",
                  additionalProperties: true,
                },
                mutationRecord: {
                  type: "object",
                  additionalProperties: true,
                },
                alertStrategy: {
                  type: "object",
                  additionalProperties: true,
                },
                severity: {
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

export default alertPoliciesList;
