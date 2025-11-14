import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const snoozesCreate: AppBlock = {
  name: "Snoozes - Create",
  description: `Creates a Snooze that will prevent alerts, which match the provided criteria, from being opened.`,
  category: "Snoozes",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) in which a Snooze should be created. The format is: projects/[PROJECT_ID_OR_NUMBER] ",
          type: "string",
          required: true,
        },
        name: {
          name: "Name",
          description: "Required.",
          type: "string",
          required: false,
        },
        criteria: {
          name: "Criteria",
          description: "Required.",
          type: {
            type: "object",
            properties: {
              policies: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              filter: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        interval: {
          name: "Interval",
          description: "Required.",
          type: {
            type: "object",
            properties: {
              endTime: {
                type: "string",
              },
              startTime: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        displayName: {
          name: "Display Name",
          description: "Required.",
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
        let path = `v3/{+parent}/snoozes`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.criteria !== undefined)
          requestBody.criteria = input.event.inputConfig.criteria;
        if (input.event.inputConfig.interval !== undefined)
          requestBody.interval = input.event.inputConfig.interval;
        if (input.event.inputConfig.displayName !== undefined)
          requestBody.displayName = input.event.inputConfig.displayName;

        if (Object.keys(requestBody).length > 0) {
          requestOptions.body = JSON.stringify(requestBody);
        }

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
          name: {
            type: "string",
          },
          criteria: {
            type: "object",
            properties: {
              policies: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              filter: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          interval: {
            type: "object",
            properties: {
              endTime: {
                type: "string",
              },
              startTime: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          displayName: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default snoozesCreate;
