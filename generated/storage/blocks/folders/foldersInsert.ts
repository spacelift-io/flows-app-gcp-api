import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const foldersInsert: AppBlock = {
  name: "Folders - Insert",
  description: `Creates a new folder.`,
  category: "Folders",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "Name of the bucket in which the folder resides.",
          type: "string",
          required: true,
        },
        recursive: {
          name: "Recursive",
          description:
            "If true, any parent folder which doesn't exist will be created automatically.",
          type: "boolean",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "A folder. Only available in buckets with hierarchical namespace enabled.",
          type: {
            type: "object",
            properties: {
              bucket: {
                type: "string",
              },
              id: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              metageneration: {
                type: "string",
              },
              name: {
                type: "string",
              },
              selfLink: {
                type: "string",
              },
              createTime: {
                type: "string",
              },
              updateTime: {
                type: "string",
              },
              pendingRenameInfo: {
                type: "object",
                properties: {
                  operationId: {
                    type: "string",
                  },
                },
                additionalProperties: true,
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
            "https://www.googleapis.com/auth/devstorage.read_write",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        const path = `b/{bucket}/folders`;
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
          bucket: {
            type: "string",
          },
          id: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          metageneration: {
            type: "string",
          },
          name: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          createTime: {
            type: "string",
          },
          updateTime: {
            type: "string",
          },
          pendingRenameInfo: {
            type: "object",
            properties: {
              operationId: {
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

export default foldersInsert;
