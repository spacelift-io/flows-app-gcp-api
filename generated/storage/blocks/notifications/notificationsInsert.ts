import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const notificationsInsert: AppBlock = {
  name: "Notifications - Insert",
  description: `Creates a notification subscription for a given bucket.`,
  category: "Notifications",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "The parent bucket of the notification.",
          type: "string",
          required: true,
        },
        userProject: {
          name: "UserProject",
          description:
            "The project to be billed for this request. Required for Requester Pays buckets.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description: "A subscription to receive Google PubSub notifications.",
          type: {
            type: "object",
            properties: {
              custom_attributes: {
                type: "object",
                additionalProperties: true,
              },
              etag: {
                type: "string",
              },
              event_types: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              id: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              object_name_prefix: {
                type: "string",
              },
              payload_format: {
                type: "string",
              },
              selfLink: {
                type: "string",
              },
              topic: {
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
            "https://www.googleapis.com/auth/devstorage.full_control",
            "https://www.googleapis.com/auth/devstorage.read_write",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        const path = `b/{bucket}/notificationConfigs`;
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
          custom_attributes: {
            type: "object",
            additionalProperties: true,
          },
          etag: {
            type: "string",
          },
          event_types: {
            type: "array",
            items: {
              type: "string",
            },
          },
          id: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          object_name_prefix: {
            type: "string",
          },
          payload_format: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          topic: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default notificationsInsert;
