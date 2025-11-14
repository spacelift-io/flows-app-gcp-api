import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const patch: AppBlock = {
  name: "Patch - Patch",
  description: `Updates the 'display_name' and labels of the project identified by the specified 'name' (for example, 'projects/415104041262').`,
  category: "Patch",
  inputs: {
    default: {
      config: {
        updateMask: {
          name: "UpdateMask",
          description: "Optional. An update mask to selectively update fields.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description:
            'Output only. The unique resource name of the project. It is an int64 generated number prefixed by "projects/". Example: `projects/415104041262`',
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "A project is a high-level Google Cloud entity. It is a container for ACLs, APIs, App Engine Apps, VMs, and other Google Cloud Platform resources.",
          type: {
            type: "object",
            properties: {
              updateTime: {
                type: "string",
              },
              labels: {
                type: "object",
                additionalProperties: true,
              },
              createTime: {
                type: "string",
              },
              configuredCapabilities: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              deleteTime: {
                type: "string",
              },
              parent: {
                type: "string",
              },
              projectId: {
                type: "string",
              },
              displayName: {
                type: "string",
              },
              etag: {
                type: "string",
              },
              tags: {
                type: "object",
                additionalProperties: true,
              },
              state: {
                type: "string",
                enum: ["STATE_UNSPECIFIED", "ACTIVE", "DELETE_REQUESTED"],
              },
              name: {
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

export default patch;
