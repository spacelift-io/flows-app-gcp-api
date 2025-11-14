import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const notificationChannelsCreate: AppBlock = {
  name: "Notification Channels - Create",
  description: `Creates a new notification channel, representing a single notification endpoint such as an email address, SMS number, or PagerDuty service.`,
  category: "Notification Channels",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] This names the container into which the channel will be written, this does not name the newly created channel. The resulting channel's name will have a normalized version of this field as a prefix, but will add /notificationChannels/[CHANNEL_ID] to identify the channel.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "A NotificationChannel is a medium through which an alert is delivered when a policy violation is detected. Examples of channels include email, SMS, and third-party messaging applications. Fields containing sensitive information like authentication tokens or contact info are only partially populated on retrieval.",
          type: {
            type: "object",
            properties: {
              type: {
                type: "string",
              },
              name: {
                type: "string",
              },
              displayName: {
                type: "string",
              },
              description: {
                type: "string",
              },
              labels: {
                type: "object",
                additionalProperties: true,
              },
              userLabels: {
                type: "object",
                additionalProperties: true,
              },
              verificationStatus: {
                type: "string",
                enum: [
                  "VERIFICATION_STATUS_UNSPECIFIED",
                  "UNVERIFIED",
                  "VERIFIED",
                ],
              },
              enabled: {
                type: "boolean",
              },
              creationRecord: {
                type: "object",
                properties: {
                  mutateTime: {
                    type: "string",
                  },
                  mutatedBy: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              mutationRecords: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    mutateTime: {
                      type: "object",
                      additionalProperties: true,
                    },
                    mutatedBy: {
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
        const path = `v3/{+name}/notificationChannels`;
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
          type: {
            type: "string",
          },
          name: {
            type: "string",
          },
          displayName: {
            type: "string",
          },
          description: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          userLabels: {
            type: "object",
            additionalProperties: true,
          },
          verificationStatus: {
            type: "string",
            enum: ["VERIFICATION_STATUS_UNSPECIFIED", "UNVERIFIED", "VERIFIED"],
          },
          enabled: {
            type: "boolean",
          },
          creationRecord: {
            type: "object",
            properties: {
              mutateTime: {
                type: "string",
              },
              mutatedBy: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          mutationRecords: {
            type: "array",
            items: {
              type: "object",
              properties: {
                mutateTime: {
                  type: "object",
                  additionalProperties: true,
                },
                mutatedBy: {
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

export default notificationChannelsCreate;
