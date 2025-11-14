import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const topicsPublish: AppBlock = {
  name: "Topics - Publish",
  description: `Adds one or more messages to the topic.`,
  category: "Topics",
  inputs: {
    default: {
      config: {
        topic: {
          name: "Topic",
          description:
            "Required. The messages in the request will be published on this topic. Format is `projects/{project}/topics/{topic}`.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "Request for the Publish method.",
          type: {
            type: "object",
            properties: {
              messages: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    orderingKey: {
                      type: "object",
                      additionalProperties: true,
                    },
                    messageId: {
                      type: "object",
                      additionalProperties: true,
                    },
                    publishTime: {
                      type: "object",
                      additionalProperties: true,
                    },
                    attributes: {
                      type: "object",
                      additionalProperties: true,
                    },
                    data: {
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
            "https://www.googleapis.com/auth/pubsub",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://pubsub.googleapis.com/";
        const path = `v1/{+topic}:publish`;
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
          messageIds: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default topicsPublish;
