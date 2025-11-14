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
        requestBody: {
          name: "Request Body",
          description:
            "A Snooze will prevent any alerts from being opened, and close any that are already open. The Snooze will work on alerts that match the criteria defined in the Snooze. The Snooze will be active from interval.start_time through interval.end_time.",
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
            "https://www.googleapis.com/auth/monitoring",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://monitoring.googleapis.com/";
        const path = `v3/{+parent}/snoozes`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        };

        // Add request body
        if (input.event.inputConfig.requestBody) {
          requestOptions.body = JSON.stringify(
            input.event.inputConfig.requestBody,
          );
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
