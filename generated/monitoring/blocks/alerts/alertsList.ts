import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const alertsList: AppBlock = {
  name: "Alerts - List",
  description: `Lists the existing alerts for the metrics scope of the project.`,
  category: "Alerts",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description: "Required. The name of the project to list alerts for.",
          type: "string",
          required: true,
        },
        filter: {
          name: "Filter",
          description:
            "Optional. An alert is returned if there is a match on any fields belonging to the alert or its subfields.",
          type: "string",
          required: false,
        },
        orderBy: {
          name: "Order By",
          description:
            "Optional. A comma-separated list of fields in Alert to use for sorting. The default sort direction is ascending. To specify descending order for a field, add a desc modifier. The following fields are supported: open_time close_timeFor example, close_time desc, open_time will return the alerts closed most recently, with ties broken in the order of older alerts listed first.If the field is not set, the results are sorted by open_time desc.",
          type: "string",
          required: false,
        },
        pageSize: {
          name: "Page Size",
          description:
            "Optional. The maximum number of results to return in a single response. If not set to a positive number, at most 50 alerts will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "Page Token",
          description:
            "Optional. If non-empty, page_token must contain a value returned as the next_page_token in a previous response to request the next set of results.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        // Support both service account keys and pre-generated access tokens
        let accessToken: string;

        if (input.app.config.accessToken) {
          // Use pre-generated access token (Workload Identity Federation, etc.)
          accessToken = input.app.config.accessToken;
        } else if (input.app.config.serviceAccountKey) {
          // Parse service account credentials and generate token
          const credentials = JSON.parse(input.app.config.serviceAccountKey);

          const auth = new GoogleAuth({
            credentials,
            scopes: [
              "https://www.googleapis.com/auth/cloud-platform",
              "https://www.googleapis.com/auth/monitoring",
              "https://www.googleapis.com/auth/monitoring.read",
            ],
          });

          const client = await auth.getClient();
          const token = await client.getAccessToken();
          accessToken = token.token!;
        } else {
          throw new Error(
            "Either serviceAccountKey or accessToken must be provided in app configuration",
          );
        }

        // Build request URL and parameters
        const baseUrl = "https://monitoring.googleapis.com/";
        let path = `v3/{+parent}/alerts`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
          alerts: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                state: {
                  type: "object",
                  additionalProperties: true,
                },
                openTime: {
                  type: "object",
                  additionalProperties: true,
                },
                closeTime: {
                  type: "object",
                  additionalProperties: true,
                },
                resource: {
                  type: "object",
                  additionalProperties: true,
                },
                metadata: {
                  type: "object",
                  additionalProperties: true,
                },
                metric: {
                  type: "object",
                  additionalProperties: true,
                },
                log: {
                  type: "object",
                  additionalProperties: true,
                },
                policy: {
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

export default alertsList;
