import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const subscriptionsList: AppBlock = {
  name: "Subscriptions - List",
  description: `Lists matching subscriptions.`,
  category: "Subscriptions",
  inputs: {
    default: {
      config: {
        pageSize: {
          name: "Page Size",
          description: "Optional. Maximum number of subscriptions to return.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "Page Token",
          description:
            "Optional. The value returned by the last `ListSubscriptionsResponse`; indicates that this is a continuation of a prior `ListSubscriptions` call, and that the system should return the next page of data.",
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
        let path = `v1/{+project}/subscriptions`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
          subscriptions: {
            type: "array",
            items: {
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
                  type: "object",
                  additionalProperties: true,
                },
                messageTransforms: {
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
                },
                topicMessageRetentionDuration: {
                  type: "object",
                  additionalProperties: true,
                },
                cloudStorageConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                messageRetentionDuration: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                ackDeadlineSeconds: {
                  type: "object",
                  additionalProperties: true,
                },
                filter: {
                  type: "object",
                  additionalProperties: true,
                },
                topic: {
                  type: "object",
                  additionalProperties: true,
                },
                enableExactlyOnceDelivery: {
                  type: "object",
                  additionalProperties: true,
                },
                state: {
                  type: "object",
                  additionalProperties: true,
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
          },
          nextPageToken: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default subscriptionsList;
