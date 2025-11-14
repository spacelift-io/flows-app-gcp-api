import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const subscriptionsCreate: AppBlock = {
  name: "Subscriptions - Create",
  description: `Creates a subscription to a given topic.`,
  category: "Subscriptions",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Required.",
          type: "string",
          required: false,
        },
        expirationPolicy: {
          name: "Expiration Policy",
          description: "Optional.",
          type: {
            type: "object",
            properties: {
              ttl: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        pushConfig: {
          name: "Push Config",
          description: "Optional.",
          type: {
            type: "object",
            properties: {
              pubsubWrapper: {
                type: "object",
                properties: {},
                additionalProperties: true,
              },
              pushEndpoint: {
                type: "string",
              },
              attributes: {
                type: "object",
                additionalProperties: true,
              },
              noWrapper: {
                type: "object",
                properties: {
                  writeMetadata: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              oidcToken: {
                type: "object",
                properties: {
                  serviceAccountEmail: {
                    type: "object",
                    additionalProperties: true,
                  },
                  audience: {
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
        enableMessageOrdering: {
          name: "Enable Message Ordering",
          description: "Optional.",
          type: "boolean",
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
        deadLetterPolicy: {
          name: "Dead Letter Policy",
          description: "Optional.",
          type: {
            type: "object",
            properties: {
              maxDeliveryAttempts: {
                type: "number",
              },
              deadLetterTopic: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        analyticsHubSubscriptionInfo: {
          name: "Analytics Hub Subscription Info",
          description: "Output only.",
          type: {
            type: "object",
            properties: {
              subscription: {
                type: "string",
              },
              listing: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        retainAckedMessages: {
          name: "Retain Acked Messages",
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
        retryPolicy: {
          name: "Retry Policy",
          description: "Optional.",
          type: {
            type: "object",
            properties: {
              maximumBackoff: {
                type: "string",
              },
              minimumBackoff: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        detached: {
          name: "Detached",
          description: "Optional.",
          type: "boolean",
          required: false,
        },
        topicMessageRetentionDuration: {
          name: "Topic Message Retention Duration",
          description: "Output only.",
          type: "string",
          required: false,
        },
        cloudStorageConfig: {
          name: "Cloud Storage Config",
          description: "Optional.",
          type: {
            type: "object",
            properties: {
              maxBytes: {
                type: "string",
              },
              maxMessages: {
                type: "string",
              },
              maxDuration: {
                type: "string",
              },
              avroConfig: {
                type: "object",
                properties: {
                  writeMetadata: {
                    type: "object",
                    additionalProperties: true,
                  },
                  useTopicSchema: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              filenameDatetimeFormat: {
                type: "string",
              },
              bucket: {
                type: "string",
              },
              textConfig: {
                type: "object",
                properties: {},
                additionalProperties: true,
              },
              filenamePrefix: {
                type: "string",
              },
              serviceAccountEmail: {
                type: "string",
              },
              filenameSuffix: {
                type: "string",
              },
              state: {
                type: "string",
                enum: [
                  "STATE_UNSPECIFIED",
                  "ACTIVE",
                  "PERMISSION_DENIED",
                  "NOT_FOUND",
                  "IN_TRANSIT_LOCATION_RESTRICTION",
                  "SCHEMA_MISMATCH",
                ],
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
        ackDeadlineSeconds: {
          name: "Ack Deadline Seconds",
          description: "Optional.",
          type: "number",
          required: false,
        },
        filter: {
          name: "Filter",
          description: "Optional.",
          type: "string",
          required: false,
        },
        topic: {
          name: "Topic",
          description: "Required.",
          type: "string",
          required: false,
        },
        enableExactlyOnceDelivery: {
          name: "Enable Exactly Once Delivery",
          description: "Optional.",
          type: "boolean",
          required: false,
        },
        state: {
          name: "State",
          description: "Output only.",
          type: "string",
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
        bigqueryConfig: {
          name: "Bigquery Config",
          description: "Optional.",
          type: {
            type: "object",
            properties: {
              state: {
                type: "string",
                enum: [
                  "STATE_UNSPECIFIED",
                  "ACTIVE",
                  "PERMISSION_DENIED",
                  "NOT_FOUND",
                  "SCHEMA_MISMATCH",
                  "IN_TRANSIT_LOCATION_RESTRICTION",
                ],
              },
              useTableSchema: {
                type: "boolean",
              },
              useTopicSchema: {
                type: "boolean",
              },
              serviceAccountEmail: {
                type: "string",
              },
              writeMetadata: {
                type: "boolean",
              },
              dropUnknownFields: {
                type: "boolean",
              },
              table: {
                type: "string",
              },
            },
            additionalProperties: true,
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

        if (input.event.inputConfig.expirationPolicy !== undefined)
          requestBody.expirationPolicy =
            input.event.inputConfig.expirationPolicy;
        if (input.event.inputConfig.pushConfig !== undefined)
          requestBody.pushConfig = input.event.inputConfig.pushConfig;
        if (input.event.inputConfig.enableMessageOrdering !== undefined)
          requestBody.enableMessageOrdering =
            input.event.inputConfig.enableMessageOrdering;
        if (input.event.inputConfig.messageTransforms !== undefined)
          requestBody.messageTransforms =
            input.event.inputConfig.messageTransforms;
        if (input.event.inputConfig.deadLetterPolicy !== undefined)
          requestBody.deadLetterPolicy =
            input.event.inputConfig.deadLetterPolicy;
        if (input.event.inputConfig.analyticsHubSubscriptionInfo !== undefined)
          requestBody.analyticsHubSubscriptionInfo =
            input.event.inputConfig.analyticsHubSubscriptionInfo;
        if (input.event.inputConfig.retainAckedMessages !== undefined)
          requestBody.retainAckedMessages =
            input.event.inputConfig.retainAckedMessages;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.retryPolicy !== undefined)
          requestBody.retryPolicy = input.event.inputConfig.retryPolicy;
        if (input.event.inputConfig.detached !== undefined)
          requestBody.detached = input.event.inputConfig.detached;
        if (input.event.inputConfig.topicMessageRetentionDuration !== undefined)
          requestBody.topicMessageRetentionDuration =
            input.event.inputConfig.topicMessageRetentionDuration;
        if (input.event.inputConfig.cloudStorageConfig !== undefined)
          requestBody.cloudStorageConfig =
            input.event.inputConfig.cloudStorageConfig;
        if (input.event.inputConfig.messageRetentionDuration !== undefined)
          requestBody.messageRetentionDuration =
            input.event.inputConfig.messageRetentionDuration;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.ackDeadlineSeconds !== undefined)
          requestBody.ackDeadlineSeconds =
            input.event.inputConfig.ackDeadlineSeconds;
        if (input.event.inputConfig.filter !== undefined)
          requestBody.filter = input.event.inputConfig.filter;
        if (input.event.inputConfig.topic !== undefined)
          requestBody.topic = input.event.inputConfig.topic;
        if (input.event.inputConfig.enableExactlyOnceDelivery !== undefined)
          requestBody.enableExactlyOnceDelivery =
            input.event.inputConfig.enableExactlyOnceDelivery;
        if (input.event.inputConfig.state !== undefined)
          requestBody.state = input.event.inputConfig.state;
        if (input.event.inputConfig.tags !== undefined)
          requestBody.tags = input.event.inputConfig.tags;
        if (input.event.inputConfig.bigqueryConfig !== undefined)
          requestBody.bigqueryConfig = input.event.inputConfig.bigqueryConfig;

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
          expirationPolicy: {
            type: "object",
            properties: {
              ttl: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          pushConfig: {
            type: "object",
            properties: {
              pubsubWrapper: {
                type: "object",
                additionalProperties: true,
              },
              pushEndpoint: {
                type: "string",
              },
              attributes: {
                type: "object",
                additionalProperties: true,
              },
              noWrapper: {
                type: "object",
                additionalProperties: true,
              },
              oidcToken: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          enableMessageOrdering: {
            type: "boolean",
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
          deadLetterPolicy: {
            type: "object",
            properties: {
              maxDeliveryAttempts: {
                type: "number",
              },
              deadLetterTopic: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          analyticsHubSubscriptionInfo: {
            type: "object",
            properties: {
              subscription: {
                type: "string",
              },
              listing: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          retainAckedMessages: {
            type: "boolean",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          retryPolicy: {
            type: "object",
            properties: {
              maximumBackoff: {
                type: "string",
              },
              minimumBackoff: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          detached: {
            type: "boolean",
          },
          topicMessageRetentionDuration: {
            type: "string",
          },
          cloudStorageConfig: {
            type: "object",
            properties: {
              maxBytes: {
                type: "string",
              },
              maxMessages: {
                type: "string",
              },
              maxDuration: {
                type: "string",
              },
              avroConfig: {
                type: "object",
                additionalProperties: true,
              },
              filenameDatetimeFormat: {
                type: "string",
              },
              bucket: {
                type: "string",
              },
              textConfig: {
                type: "object",
                additionalProperties: true,
              },
              filenamePrefix: {
                type: "string",
              },
              serviceAccountEmail: {
                type: "string",
              },
              filenameSuffix: {
                type: "string",
              },
              state: {
                type: "string",
                enum: [
                  "STATE_UNSPECIFIED",
                  "ACTIVE",
                  "PERMISSION_DENIED",
                  "NOT_FOUND",
                  "IN_TRANSIT_LOCATION_RESTRICTION",
                  "SCHEMA_MISMATCH",
                ],
              },
            },
            additionalProperties: true,
          },
          messageRetentionDuration: {
            type: "string",
          },
          name: {
            type: "string",
          },
          ackDeadlineSeconds: {
            type: "number",
          },
          filter: {
            type: "string",
          },
          topic: {
            type: "string",
          },
          enableExactlyOnceDelivery: {
            type: "boolean",
          },
          state: {
            type: "string",
            enum: ["STATE_UNSPECIFIED", "ACTIVE", "RESOURCE_ERROR"],
          },
          tags: {
            type: "object",
            additionalProperties: true,
          },
          bigqueryConfig: {
            type: "object",
            properties: {
              state: {
                type: "string",
                enum: [
                  "STATE_UNSPECIFIED",
                  "ACTIVE",
                  "PERMISSION_DENIED",
                  "NOT_FOUND",
                  "SCHEMA_MISMATCH",
                  "IN_TRANSIT_LOCATION_RESTRICTION",
                ],
              },
              useTableSchema: {
                type: "boolean",
              },
              useTopicSchema: {
                type: "boolean",
              },
              serviceAccountEmail: {
                type: "string",
              },
              writeMetadata: {
                type: "boolean",
              },
              dropUnknownFields: {
                type: "boolean",
              },
              table: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default subscriptionsCreate;
