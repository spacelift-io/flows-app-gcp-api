import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const subscriptionsPatch: AppBlock = {
  name: "Subscriptions - Patch",
  description: `Updates an existing subscription by updating the fields specified in the update mask.`,
  category: "Subscriptions",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            'Required. The name of the subscription. It must have the format `"projects/{project}/subscriptions/{subscription}"`. `{subscription}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`.',
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "Request for the UpdateSubscription method.",
          type: {
            type: "object",
            properties: {
              subscription: {
                type: "object",
                properties: {
                  expirationPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  pushConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableMessageOrdering: {
                    type: "boolean",
                  },
                  messageTransforms: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  deadLetterPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  analyticsHubSubscriptionInfo: {
                    type: "object",
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
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              updateMask: {
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
            "https://www.googleapis.com/auth/pubsub",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://pubsub.googleapis.com/";
        const path = `v1/{+name}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
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

export default subscriptionsPatch;
