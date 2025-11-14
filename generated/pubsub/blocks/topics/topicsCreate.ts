import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const topicsCreate: AppBlock = {
  name: "Topics - Create",
  description: `Creates the given topic with the given name.`,
  category: "Topics",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Required.",
          type: "string",
          required: false,
        },
        kmsKeyName: {
          name: "KMS Key Name",
          description: "Optional.",
          type: "string",
          required: false,
        },
        ingestionDataSourceSettings: {
          name: "Ingestion Data Source Settings",
          description: "Optional.",
          type: {
            type: "object",
            properties: {
              cloudStorage: {
                type: "object",
                properties: {
                  pubsubAvroFormat: {
                    type: "object",
                    additionalProperties: true,
                  },
                  matchGlob: {
                    type: "object",
                    additionalProperties: true,
                  },
                  avroFormat: {
                    type: "object",
                    additionalProperties: true,
                  },
                  bucket: {
                    type: "object",
                    additionalProperties: true,
                  },
                  minimumObjectCreateTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  state: {
                    type: "object",
                    additionalProperties: true,
                  },
                  textFormat: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              platformLogsSettings: {
                type: "object",
                properties: {
                  severity: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              azureEventHubs: {
                type: "object",
                properties: {
                  subscriptionId: {
                    type: "object",
                    additionalProperties: true,
                  },
                  gcpServiceAccount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  clientId: {
                    type: "object",
                    additionalProperties: true,
                  },
                  eventHub: {
                    type: "object",
                    additionalProperties: true,
                  },
                  resourceGroup: {
                    type: "object",
                    additionalProperties: true,
                  },
                  tenantId: {
                    type: "object",
                    additionalProperties: true,
                  },
                  namespace: {
                    type: "object",
                    additionalProperties: true,
                  },
                  state: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              awsMsk: {
                type: "object",
                properties: {
                  awsRoleArn: {
                    type: "object",
                    additionalProperties: true,
                  },
                  clusterArn: {
                    type: "object",
                    additionalProperties: true,
                  },
                  state: {
                    type: "object",
                    additionalProperties: true,
                  },
                  gcpServiceAccount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  topic: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              awsKinesis: {
                type: "object",
                properties: {
                  state: {
                    type: "object",
                    additionalProperties: true,
                  },
                  consumerArn: {
                    type: "object",
                    additionalProperties: true,
                  },
                  streamArn: {
                    type: "object",
                    additionalProperties: true,
                  },
                  awsRoleArn: {
                    type: "object",
                    additionalProperties: true,
                  },
                  gcpServiceAccount: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              confluentCloud: {
                type: "object",
                properties: {
                  clusterId: {
                    type: "object",
                    additionalProperties: true,
                  },
                  gcpServiceAccount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  state: {
                    type: "object",
                    additionalProperties: true,
                  },
                  identityPoolId: {
                    type: "object",
                    additionalProperties: true,
                  },
                  topic: {
                    type: "object",
                    additionalProperties: true,
                  },
                  bootstrapServer: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        messageTransforms: {
          name: "Message Transforms",
          description: "Optional.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                javascriptUdf: {
                  type: "object",
                  additionalProperties: true,
                },
                enabled: {
                  type: "boolean",
                },
                disabled: {
                  type: "boolean",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        messageStoragePolicy: {
          name: "Message Storage Policy",
          description: "Optional.",
          type: {
            type: "object",
            properties: {
              enforceInTransit: {
                type: "boolean",
              },
              allowedPersistenceRegions: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        satisfiesPzs: {
          name: "Satisfies Pzs",
          description: "Optional.",
          type: "boolean",
          required: false,
        },
        labels: {
          name: "Labels",
          description: "Optional.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        tags: {
          name: "Tags",
          description: "Optional.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        schemaSettings: {
          name: "Schema Settings",
          description: "Optional.",
          type: {
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
          required: false,
        },
        messageRetentionDuration: {
          name: "Message Retention Duration",
          description: "Optional.",
          type: "string",
          required: false,
        },
        state: {
          name: "State",
          description: "Output only.",
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
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.kmsKeyName !== undefined)
          requestBody.kmsKeyName = input.event.inputConfig.kmsKeyName;
        if (input.event.inputConfig.ingestionDataSourceSettings !== undefined)
          requestBody.ingestionDataSourceSettings =
            input.event.inputConfig.ingestionDataSourceSettings;
        if (input.event.inputConfig.messageTransforms !== undefined)
          requestBody.messageTransforms =
            input.event.inputConfig.messageTransforms;
        if (input.event.inputConfig.messageStoragePolicy !== undefined)
          requestBody.messageStoragePolicy =
            input.event.inputConfig.messageStoragePolicy;
        if (input.event.inputConfig.satisfiesPzs !== undefined)
          requestBody.satisfiesPzs = input.event.inputConfig.satisfiesPzs;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.tags !== undefined)
          requestBody.tags = input.event.inputConfig.tags;
        if (input.event.inputConfig.schemaSettings !== undefined)
          requestBody.schemaSettings = input.event.inputConfig.schemaSettings;
        if (input.event.inputConfig.messageRetentionDuration !== undefined)
          requestBody.messageRetentionDuration =
            input.event.inputConfig.messageRetentionDuration;
        if (input.event.inputConfig.state !== undefined)
          requestBody.state = input.event.inputConfig.state;

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

export default topicsCreate;
