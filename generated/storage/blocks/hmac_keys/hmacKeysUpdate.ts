import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const hmacKeysUpdate: AppBlock = {
  name: "Hmac Keys - Update",
  description: `Updates the state of an HMAC key.`,
  category: "Hmac Keys",
  inputs: {
    default: {
      config: {
        accessId: {
          name: "AccessId",
          description: "Name of the HMAC key being updated.",
          type: "string",
          required: true,
        },
        projectId: {
          name: "ProjectId",
          description:
            "Project ID owning the service account of the updated key.",
          type: "string",
          required: true,
        },
        userProject: {
          name: "UserProject",
          description: "The project to be billed for this request.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "JSON template to produce a JSON-style HMAC Key metadata resource.",
          type: {
            type: "object",
            properties: {
              accessId: {
                type: "string",
              },
              etag: {
                type: "string",
              },
              id: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              projectId: {
                type: "string",
              },
              selfLink: {
                type: "string",
              },
              serviceAccountEmail: {
                type: "string",
              },
              state: {
                type: "string",
              },
              timeCreated: {
                type: "string",
              },
              updated: {
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
            "https://www.googleapis.com/auth/devstorage.full_control",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        const path = `projects/{projectId}/hmacKeys/{accessId}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PUT",
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
          accessId: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          id: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          projectId: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          serviceAccountEmail: {
            type: "string",
          },
          state: {
            type: "string",
          },
          timeCreated: {
            type: "string",
          },
          updated: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default hmacKeysUpdate;
