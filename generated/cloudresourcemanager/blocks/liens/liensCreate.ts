import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const liensCreate: AppBlock = {
  name: "Liens - Create",
  description: `Create a Lien which applies to the resource denoted by the 'parent' field.`,
  category: "Liens",
  inputs: {
    default: {
      config: {
        requestBody: {
          name: "Request Body",
          description:
            "A Lien represents an encumbrance on the actions that can be performed on a resource.",
          type: {
            type: "object",
            properties: {
              restrictions: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              origin: {
                type: "string",
              },
              createTime: {
                type: "string",
              },
              reason: {
                type: "string",
              },
              name: {
                type: "string",
              },
              parent: {
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
            "https://www.googleapis.com/auth/cloud-platform.read-only",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://cloudresourcemanager.googleapis.com/";
        const path = `v3/liens`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
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
          restrictions: {
            type: "array",
            items: {
              type: "string",
            },
          },
          origin: {
            type: "string",
          },
          createTime: {
            type: "string",
          },
          reason: {
            type: "string",
          },
          name: {
            type: "string",
          },
          parent: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default liensCreate;
