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
        subscription: {
          name: "Subscription",
          description: "Required.",
          type: {
            type: "object",
            properties: {
              expirationPolicy: {
                type: "object",
                properties: {
                  ttl: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
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
                  additionalProperties: true,
                },
              },
              deadLetterPolicy: {
                type: "object",
                properties: {
                  maxDeliveryAttempts: {
                    type: "object",
                    additionalProperties: true,
                  },
                  deadLetterTopic: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              analyticsHubSubscriptionInfo: {
                type: "object",
                properties: {
                  subscription: {
                    type: "object",
                    additionalProperties: true,
                  },
                  listing: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                  minimumBackoff: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                  maxMessages: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxDuration: {
                    type: "object",
                    additionalProperties: true,
                  },
                  avroConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  filenameDatetimeFormat: {
                    type: "object",
                    additionalProperties: true,
                  },
                  bucket: {
                    type: "object",
                    additionalProperties: true,
                  },
                  textConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  filenamePrefix: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serviceAccountEmail: {
                    type: "object",
                    additionalProperties: true,
                  },
                  filenameSuffix: {
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
                    type: "object",
                    additionalProperties: true,
                  },
                  useTableSchema: {
                    type: "object",
                    additionalProperties: true,
                  },
                  useTopicSchema: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serviceAccountEmail: {
                    type: "object",
                    additionalProperties: true,
                  },
                  writeMetadata: {
                    type: "object",
                    additionalProperties: true,
                  },
                  dropUnknownFields: {
                    type: "object",
                    additionalProperties: true,
                  },
                  table: {
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

        if (input.event.inputConfig.subscription !== undefined)
          requestBody.subscription = input.event.inputConfig.subscription;
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
