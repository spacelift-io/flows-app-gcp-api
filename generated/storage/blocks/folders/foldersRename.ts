import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const foldersRename: AppBlock = {
  name: "Folders - Rename",
  description: `Renames a source folder to a destination folder.`,
  category: "Folders",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "Name of the bucket in which the folders are in.",
          type: "string",
          required: true,
        },
        destinationFolder: {
          name: "DestinationFolder",
          description: "Name of the destination folder.",
          type: "string",
          required: true,
        },
        ifSourceMetagenerationMatch: {
          name: "IfSourceMetagenerationMatch",
          description:
            "Makes the operation conditional on whether the source object's current metageneration matches the given value.",
          type: "string",
          required: false,
        },
        ifSourceMetagenerationNotMatch: {
          name: "IfSourceMetagenerationNotMatch",
          description:
            "Makes the operation conditional on whether the source object's current metageneration does not match the given value.",
          type: "string",
          required: false,
        },
        sourceFolder: {
          name: "SourceFolder",
          description: "Name of the source folder.",
          type: "string",
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
        const path = `b/{bucket}/folders/{sourceFolder}/renameTo/folders/{destinationFolder}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
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
          done: {
            type: "boolean",
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "number",
              },
              details: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              message: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          metadata: {
            type: "object",
            additionalProperties: true,
          },
          name: {
            type: "string",
          },
          response: {
            type: "object",
            additionalProperties: true,
          },
          selfLink: {
            type: "string",
          },
          kind: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default foldersRename;
