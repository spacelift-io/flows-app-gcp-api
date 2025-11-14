import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const foldersGet: AppBlock = {
  name: "Folders - Get",
  description: `Returns metadata for the specified folder.`,
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
        folder: {
          name: "Folder",
          description: "Name of a folder.",
          type: "string",
          required: true,
        },
        ifMetagenerationMatch: {
          name: "IfMetagenerationMatch",
          description:
            "Makes the return of the folder metadata conditional on whether the folder's current metageneration matches the given value.",
          type: "string",
          required: false,
        },
        ifMetagenerationNotMatch: {
          name: "IfMetagenerationNotMatch",
          description:
            "Makes the return of the folder metadata conditional on whether the folder's current metageneration does not match the given value.",
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
            "https://www.googleapis.com/auth/cloud-platform.read-only",
            "https://www.googleapis.com/auth/devstorage.full_control",
            "https://www.googleapis.com/auth/devstorage.read_only",
            "https://www.googleapis.com/auth/devstorage.read_write",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        const path = `b/{bucket}/folders/{folder}`;
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

export default foldersGet;
