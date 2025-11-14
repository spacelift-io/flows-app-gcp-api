import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const managedFoldersInsert: AppBlock = {
  name: "Managed Folders - Insert",
  description: `Creates a new managed folder.`,
  category: "Managed Folders",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "Name of the bucket containing the managed folder.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "A managed folder.",
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
        const path = `b/{bucket}/managedFolders`;
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
        },
        additionalProperties: true,
      },
    },
  },
};

export default managedFoldersInsert;
