import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const topicsPatch: AppBlock = {
  name: "Topics - Patch",
  description: `Updates an existing topic by updating the fields specified in the update mask.`,
  category: "Topics",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            'Required. The name of the topic. It must have the format `"projects/{project}/topics/{topic}"`. `{topic}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`.',
          type: "string",
          required: true,
        },
        topic: {
          name: "Topic",
          description: "Required.",
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
                  additionalProperties: true,
                },
              },
              messageStoragePolicy: {
                type: "object",
                properties: {
                  enforceInTransit: {
                    type: "object",
                    additionalProperties: true,
                  },
                  allowedPersistenceRegions: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                  lastRevisionId: {
                    type: "object",
                    additionalProperties: true,
                  },
                  firstRevisionId: {
                    type: "object",
                    additionalProperties: true,
                  },
                  schema: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              messageRetentionDuration: {
                type: "string",
              },
              state: {
                type: "string",
                enum: [
                  "STATE_UNSPECIFIED",
                  "ACTIVE",
                  "INGESTION_RESOURCE_ERROR",
                ],
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        updateMask: {
          name: "Update Mask",
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
              "https://www.googleapis.com/auth/pubsub",
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
        const baseUrl = "https://pubsub.googleapis.com/";
        let path = `v1/{+name}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.topic !== undefined)
          requestBody.topic = input.event.inputConfig.topic;
        if (input.event.inputConfig.updateMask !== undefined)
          requestBody.updateMask = input.event.inputConfig.updateMask;

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

export default topicsPatch;
