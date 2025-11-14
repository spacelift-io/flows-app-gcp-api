import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const create: AppBlock = {
  name: "Operations - Create",
  description: `Request that a new project be created.`,
  category: "Operations",
  inputs: {
    default: {
      config: {
        updateTime: {
          name: "Update Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        labels: {
          name: "Labels",
          description: "Optional.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        createTime: {
          name: "Create Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        configuredCapabilities: {
          name: "Configured Capabilities",
          description: "Output only.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        deleteTime: {
          name: "Delete Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        parent: {
          name: "Parent",
          description: "Optional.",
          type: "string",
          required: false,
        },
        displayName: {
          name: "Display Name",
          description: "Optional.",
          type: "string",
          required: false,
        },
        etag: {
          name: "Etag",
          description: "Output only.",
          type: "string",
          required: false,
        },
        tags: {
          name: "Tags",
          description: "Optional.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        state: {
          name: "State",
          description: "Output only.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "Output only.",
          type: "string",
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
            scopes: ["https://www.googleapis.com/auth/cloud-platform"],
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
        const baseUrl = "https://cloudresourcemanager.googleapis.com/";
        let path = `v3/projects`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};
        requestBody.projectId = input.app.config.projectId;
        if (input.event.inputConfig.updateTime !== undefined)
          requestBody.updateTime = input.event.inputConfig.updateTime;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.createTime !== undefined)
          requestBody.createTime = input.event.inputConfig.createTime;
        if (input.event.inputConfig.configuredCapabilities !== undefined)
          requestBody.configuredCapabilities =
            input.event.inputConfig.configuredCapabilities;
        if (input.event.inputConfig.deleteTime !== undefined)
          requestBody.deleteTime = input.event.inputConfig.deleteTime;
        if (input.event.inputConfig.parent !== undefined)
          requestBody.parent = input.event.inputConfig.parent;
        if (input.event.inputConfig.displayName !== undefined)
          requestBody.displayName = input.event.inputConfig.displayName;
        if (input.event.inputConfig.etag !== undefined)
          requestBody.etag = input.event.inputConfig.etag;
        if (input.event.inputConfig.tags !== undefined)
          requestBody.tags = input.event.inputConfig.tags;
        if (input.event.inputConfig.state !== undefined)
          requestBody.state = input.event.inputConfig.state;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;

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

export default create;
