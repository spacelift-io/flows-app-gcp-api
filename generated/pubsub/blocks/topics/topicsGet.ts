import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const topicsGet: AppBlock = {
  name: "Topics - Get",
  description: `Gets the configuration of a topic.`,
  category: "Topics",
  inputs: {
    default: {
      config: {
        topic: {
          name: "Topic",
          description:
            "Required. The name of the topic to get. Format is `projects/{project}/topics/{topic}`.",
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
            "https://www.googleapis.com/auth/pubsub",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://pubsub.googleapis.com/";
        const path = `v1/{+topic}`;
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
          kmsKeyName: {
            type: "string",
          },
          ingestionDataSourceSettings: {
            type: "object",
            properties: {
              cloudStorage: {
                type: "object",
                additionalProperties: true,
              },
              platformLogsSettings: {
                type: "object",
                additionalProperties: true,
              },
              azureEventHubs: {
                type: "object",
                additionalProperties: true,
              },
              awsMsk: {
                type: "object",
                additionalProperties: true,
              },
              awsKinesis: {
                type: "object",
                additionalProperties: true,
              },
              confluentCloud: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          messageTransforms: {
            type: "array",
            items: {
              type: "object",
              properties: {
                javascriptUdf: {
                  type: "object",
                  additionalProperties: true,
                },
                enabled: {
                  type: "object",
                  additionalProperties: true,
                },
                disabled: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          messageStoragePolicy: {
            type: "object",
            properties: {
              enforceInTransit: {
                type: "boolean",
              },
              allowedPersistenceRegions: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          satisfiesPzs: {
            type: "boolean",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          name: {
            type: "string",
          },
          tags: {
            type: "object",
            additionalProperties: true,
          },
          schemaSettings: {
            type: "object",
            properties: {
              encoding: {
                type: "string",
                enum: ["ENCODING_UNSPECIFIED", "JSON", "BINARY"],
              },
              lastRevisionId: {
                type: "string",
              },
              firstRevisionId: {
                type: "string",
              },
              schema: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          messageRetentionDuration: {
            type: "string",
          },
          state: {
            type: "string",
            enum: ["STATE_UNSPECIFIED", "ACTIVE", "INGESTION_RESOURCE_ERROR"],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default topicsGet;
