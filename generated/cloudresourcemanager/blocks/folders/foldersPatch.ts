import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const foldersPatch: AppBlock = {
  name: "Folders - Patch",
  description: `Updates a folder, changing its 'display_name'.`,
  category: "Folders",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            'Identifier. The resource name of the folder. Its format is `folders/{folder_id}`, for example: "folders/1234".',
          type: "string",
          required: true,
        },
        updateMask: {
          name: "UpdateMask",
          description:
            "Required. Fields to be updated. Only the `display_name` can be updated.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "A folder in an organization's resource hierarchy, used to organize that organization's resources.",
          type: {
            type: "object",
            properties: {
              etag: {
                type: "string",
              },
              displayName: {
                type: "string",
              },
              managementProject: {
                type: "string",
              },
              parent: {
                type: "string",
              },
              name: {
                type: "string",
              },
              deleteTime: {
                type: "string",
              },
              createTime: {
                type: "string",
              },
              updateTime: {
                type: "string",
              },
              tags: {
                type: "object",
                additionalProperties: true,
              },
              configuredCapabilities: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              state: {
                type: "string",
                enum: ["STATE_UNSPECIFIED", "ACTIVE", "DELETE_REQUESTED"],
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
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://cloudresourcemanager.googleapis.com/";
        const path = `v3/{+name}`;
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
          response: {
            type: "object",
            additionalProperties: true,
          },
          metadata: {
            type: "object",
            additionalProperties: true,
          },
          name: {
            type: "string",
          },
          error: {
            type: "object",
            properties: {
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
              code: {
                type: "number",
              },
            },
            additionalProperties: true,
          },
          done: {
            type: "boolean",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default foldersPatch;
