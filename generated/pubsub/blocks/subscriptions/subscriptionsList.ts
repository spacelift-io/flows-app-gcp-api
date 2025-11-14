import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const subscriptionsList: AppBlock = {
  name: "Subscriptions - List",
  description: `Lists matching subscriptions.`,
  category: "Subscriptions",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description:
            "Required. The name of the project in which to list subscriptions. Format is `projects/{project-id}`.",
          type: "string",
          required: true,
        },
        pageSize: {
          name: "PageSize",
          description: "Optional. Maximum number of subscriptions to return.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description:
            "Optional. The value returned by the last `ListSubscriptionsResponse`; indicates that this is a continuation of a prior `ListSubscriptions` call, and that the system should return the next page of data.",
          type: "string",
          required: false,
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
        const path = `v1/{+project}/subscriptions`;
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
