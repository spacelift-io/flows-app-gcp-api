import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const uptimeCheckConfigsList: AppBlock = {
  name: "Uptime Check Configs - List",
  description: `Lists the existing valid Uptime check configurations for the project (leaving out any invalid configurations).`,
  category: "Uptime Check Configs",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) whose Uptime check configurations are listed. The format is: projects/[PROJECT_ID_OR_NUMBER] ",
          type: "string",
          required: true,
        },
        filter: {
          name: "Filter",
          description:
            "If provided, this field specifies the criteria that must be met by uptime checks to be included in the response.For more details, see Filtering syntax (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering#filter_syntax).",
          type: "string",
          required: false,
        },
        pageSize: {
          name: "PageSize",
          description:
            "The maximum number of results to return in a single response. The server may further constrain the maximum number of results returned in a single page. If the page_size is <=0, the server will decide the number of results to be returned.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description:
            "If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return more results from the previous method call.",
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
        const path = `v3/{+parent}/uptimeCheckConfigs`;
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
          uptimeCheckConfigs: {
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
                monitoredResource: {
                  type: "object",
                  additionalProperties: true,
                },
                resourceGroup: {
                  type: "object",
                  additionalProperties: true,
                },
                syntheticMonitor: {
                  type: "object",
                  additionalProperties: true,
                },
                httpCheck: {
                  type: "object",
                  additionalProperties: true,
                },
                tcpCheck: {
                  type: "object",
                  additionalProperties: true,
                },
                period: {
                  type: "object",
                  additionalProperties: true,
                },
                timeout: {
                  type: "object",
                  additionalProperties: true,
                },
                contentMatchers: {
                  type: "object",
                  additionalProperties: true,
                },
                checkerType: {
                  type: "object",
                  additionalProperties: true,
                },
                disabled: {
                  type: "object",
                  additionalProperties: true,
                },
                selectedRegions: {
                  type: "object",
                  additionalProperties: true,
                },
                logCheckFailures: {
                  type: "object",
                  additionalProperties: true,
                },
                isInternal: {
                  type: "object",
                  additionalProperties: true,
                },
                internalCheckers: {
                  type: "object",
                  additionalProperties: true,
                },
                userLabels: {
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

export default uptimeCheckConfigsList;
