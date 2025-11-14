import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const managedFoldersSetIamPolicy: AppBlock = {
  name: "Managed Folders - Set IAM Policy",
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
          name: "Managed Folder",
          description: "The managed folder name/path.",
          type: "string",
          required: true,
        },
        userProject: {
          name: "User Project",
          description:
            "The project to be billed for this request. Required for Requester Pays buckets.",
          type: "string",
          required: false,
        },
        bindings: {
          name: "Bindings",
          description:
            "An association between a role, which comes with a set of permissions, and members who may assume that role.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                condition: {
                  type: "object",
                  properties: {
                    description: {
                      type: "object",
                      additionalProperties: true,
                    },
                    expression: {
                      type: "object",
                      additionalProperties: true,
                    },
                    location: {
                      type: "object",
                      additionalProperties: true,
                    },
                    title: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
                members: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                role: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        etag: {
          name: "Etag",
          description: "HTTP 1.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "The kind of item this is.",
          type: "string",
          required: false,
        },
        resourceId: {
          name: "Resource ID",
          description: "The ID of the resource to which this policy belongs.",
          type: "string",
          required: false,
        },
        version: {
          name: "Version",
          description: "The IAM policy format version.",
          type: "number",
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
              "https://www.googleapis.com/auth/devstorage.full_control",
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
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        let path = `b/{bucket}/managedFolders/{managedFolder}/iam`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.bindings !== undefined)
          requestBody.bindings = input.event.inputConfig.bindings;
        if (input.event.inputConfig.etag !== undefined)
          requestBody.etag = input.event.inputConfig.etag;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.resourceId !== undefined)
          requestBody.resourceId = input.event.inputConfig.resourceId;
        if (input.event.inputConfig.version !== undefined)
          requestBody.version = input.event.inputConfig.version;

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
