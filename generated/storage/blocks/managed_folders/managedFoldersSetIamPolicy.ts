import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const managedFoldersSetIamPolicy: AppBlock = {
  name: "Managed Folders - Set Iam Policy",
  description: `Updates an IAM policy for the specified managed folder.`,
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
        requestBody: {
          name: "Request Body",
          description: "A bucket/object/managedFolder IAM policy.",
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
        const path = `b/{bucket}/managedFolders/{managedFolder}/iam`;
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

export default managedFoldersSetIamPolicy;
