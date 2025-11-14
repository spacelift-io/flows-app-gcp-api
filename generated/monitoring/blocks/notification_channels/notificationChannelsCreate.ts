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
          description: "Identifier.",
          type: "string",
          required: false,
        },
        type: {
          name: "Type",
          description: "The type of the notification channel.",
          type: "string",
          required: false,
        },
        displayName: {
          name: "Display Name",
          description:
            "An optional human-readable name for this notification channel.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description:
            "An optional human-readable description of this notification channel.",
          type: "string",
          required: false,
        },
        labels: {
          name: "Labels",
          description:
            "Configuration fields that define the channel and its behavior.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        userLabels: {
          name: "User Labels",
          description:
            "User-supplied key/value data that does not need to conform to the corresponding NotificationChannelDescriptor's schema, unlike the labels field.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        verificationStatus: {
          name: "Verification Status",
          description:
            "Indicates whether this channel has been verified or not.",
          type: "string",
          required: false,
        },
        enabled: {
          name: "Enabled",
          description:
            "Whether notifications are forwarded to the described channel.",
          type: "boolean",
          required: false,
        },
        creationRecord: {
          name: "Creation Record",
          description: "Record of the creation of this channel.",
          type: {
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
          required: false,
        },
        mutationRecords: {
          name: "Mutation Records",
          description: "Records of the modification of this channel.",
          type: {
            type: "array",
            items: {
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
          },
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
        let path = `v3/{+name}/notificationChannels`;

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

        if (input.event.inputConfig.type !== undefined)
          requestBody.type = input.event.inputConfig.type;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.displayName !== undefined)
          requestBody.displayName = input.event.inputConfig.displayName;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.userLabels !== undefined)
          requestBody.userLabels = input.event.inputConfig.userLabels;
        if (input.event.inputConfig.verificationStatus !== undefined)
          requestBody.verificationStatus =
            input.event.inputConfig.verificationStatus;
        if (input.event.inputConfig.enabled !== undefined)
          requestBody.enabled = input.event.inputConfig.enabled;
        if (input.event.inputConfig.creationRecord !== undefined)
          requestBody.creationRecord = input.event.inputConfig.creationRecord;
        if (input.event.inputConfig.mutationRecords !== undefined)
          requestBody.mutationRecords = input.event.inputConfig.mutationRecords;

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
