import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const snapshotsPatch: AppBlock = {
  name: "Snapshots - Patch",
  description: `Updates an existing snapshot by updating the fields specified in the update mask.`,
  category: "Snapshots",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Optional. The name of the snapshot.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "Request for the UpdateSnapshot method.",
          type: {
            type: "object",
            properties: {
              snapshot: {
                type: "object",
                properties: {
                  expireTime: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  topic: {
                    type: "string",
                  },
                  labels: {
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
          expireTime: {
            type: "string",
          },
          name: {
            type: "string",
          },
          topic: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default snapshotsPatch;
