import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const subscriptionsModifyPushConfig: AppBlock = {
  name: "Subscriptions - Modify Push Config",
  description: `Modifies the 'PushConfig' for a specified subscription.`,
  category: "Subscriptions",
  inputs: {
    default: {
      config: {
        subscription: {
          name: "Subscription",
          description:
            "Required. The name of the subscription. Format is `projects/{project}/subscriptions/{sub}`.",
          type: "string",
          required: true,
        },
        pushConfig: {
          name: "Push Config",
          description: "Required.",
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
        let path = `v1/{+subscription}:modifyPushConfig`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.pushConfig !== undefined)
          requestBody.pushConfig = input.event.inputConfig.pushConfig;

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
        properties: {},
        additionalProperties: true,
      },
    },
  },
};

export default subscriptionsModifyPushConfig;
