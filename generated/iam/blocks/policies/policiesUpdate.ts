import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const policiesUpdate: AppBlock = {
  name: "Policies - Update",
  description: `Updates the specified policy.`,
  category: "Policies",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Immutable.",
          type: "string",
          required: false,
        },
        uid: {
          name: "Uid",
          description: "Immutable.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "Output only.",
          type: "string",
          required: false,
        },
        displayName: {
          name: "Display Name",
          description: "A user-specified description of the 'Policy'.",
          type: "string",
          required: false,
        },
        annotations: {
          name: "Annotations",
          description:
            "A key-value map to store arbitrary metadata for the 'Policy'.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        etag: {
          name: "Etag",
          description:
            "An opaque tag that identifies the current version of the 'Policy'.",
          type: "string",
          required: false,
        },
        createTime: {
          name: "Create Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        updateTime: {
          name: "Update Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        deleteTime: {
          name: "Delete Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        rules: {
          name: "Rules",
          description:
            "A list of rules that specify the behavior of the 'Policy'.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                denyRule: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
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
        const baseUrl = "https://iam.googleapis.com/";
        let path = `v2/{+name}`;

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

        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.uid !== undefined)
          requestBody.uid = input.event.inputConfig.uid;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.displayName !== undefined)
          requestBody.displayName = input.event.inputConfig.displayName;
        if (input.event.inputConfig.annotations !== undefined)
          requestBody.annotations = input.event.inputConfig.annotations;
        if (input.event.inputConfig.etag !== undefined)
          requestBody.etag = input.event.inputConfig.etag;
        if (input.event.inputConfig.createTime !== undefined)
          requestBody.createTime = input.event.inputConfig.createTime;
        if (input.event.inputConfig.updateTime !== undefined)
          requestBody.updateTime = input.event.inputConfig.updateTime;
        if (input.event.inputConfig.deleteTime !== undefined)
          requestBody.deleteTime = input.event.inputConfig.deleteTime;
        if (input.event.inputConfig.rules !== undefined)
          requestBody.rules = input.event.inputConfig.rules;

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
          name: {
            type: "string",
          },
          metadata: {
            type: "object",
            additionalProperties: true,
          },
          done: {
            type: "boolean",
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "number",
              },
              message: {
                type: "string",
              },
              details: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          response: {
            type: "object",
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default policiesUpdate;
