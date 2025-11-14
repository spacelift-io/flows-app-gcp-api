import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const managedFoldersGetIamPolicy: AppBlock = {
  name: "Managed Folders - Get Iam Policy",
  description: `Returns an IAM policy for the specified managed folder.`,
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
        optionsRequestedPolicyVersion: {
          name: "OptionsRequestedPolicyVersion",
          description:
            "The IAM policy format version to be returned. If the optionsRequestedPolicyVersion is for an older version that doesn't support part of the requested IAM policy, the request fails.",
          type: "number",
          required: false,
        },
        managedFolder: {
          name: "ManagedFolder",
          description: "The managed folder name/path.",
          type: "string",
          required: true,
        },
        userProject: {
          name: "UserProject",
          description:
            "The project to be billed for this request. Required for Requester Pays buckets.",
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
        const path = `b/{bucket}/managedFolders/{managedFolder}/iam`;
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
          bindings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                condition: {
                  type: "object",
                  additionalProperties: true,
                },
                members: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                role: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          etag: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          resourceId: {
            type: "string",
          },
          version: {
            type: "number",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default managedFoldersGetIamPolicy;
