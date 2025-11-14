import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const tagKeysPatch: AppBlock = {
  name: "Tag Keys - Patch",
  description: `Updates the attributes of the TagKey resource.`,
  category: "Tag Keys",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Immutable.",
          type: "string",
          required: false,
        },
        validateOnly: {
          name: "Validate Only",
          description:
            "Set as true to perform validations necessary for updating the resource, but not actually perform the action.",
          type: "boolean",
          required: false,
        },
        updateMask: {
          name: "Update Mask",
          description:
            "Fields to be updated. The mask may only contain `description` or `etag`. If omitted entirely, both `description` and `etag` are assumed to be significant.",
          type: "string",
          required: false,
        },
        parent: {
          name: "Parent",
          description: "Immutable.",
          type: "string",
          required: false,
        },
        allowedValuesRegex: {
          name: "Allowed Values Regex",
          description: "Optional.",
          type: "string",
          required: false,
        },
        namespacedName: {
          name: "Namespaced Name",
          description: "Output only.",
          type: "string",
          required: false,
        },
        purpose: {
          name: "Purpose",
          description: "Optional.",
          type: "string",
          required: false,
        },
        shortName: {
          name: "Short Name",
          description: "Required.",
          type: "string",
          required: false,
        },
        purposeData: {
          name: "Purpose Data",
          description: "Optional.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        description: {
          name: "Description",
          description: "Optional.",
          type: "string",
          required: false,
        },
        updateTime: {
          name: "Update Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        createTime: {
          name: "Create Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        etag: {
          name: "Etag",
          description: "Optional.",
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
        let path = `v3/{+name}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.parent !== undefined)
          requestBody.parent = input.event.inputConfig.parent;
        if (input.event.inputConfig.allowedValuesRegex !== undefined)
          requestBody.allowedValuesRegex =
            input.event.inputConfig.allowedValuesRegex;
        if (input.event.inputConfig.namespacedName !== undefined)
          requestBody.namespacedName = input.event.inputConfig.namespacedName;
        if (input.event.inputConfig.purpose !== undefined)
          requestBody.purpose = input.event.inputConfig.purpose;
        if (input.event.inputConfig.shortName !== undefined)
          requestBody.shortName = input.event.inputConfig.shortName;
        if (input.event.inputConfig.purposeData !== undefined)
          requestBody.purposeData = input.event.inputConfig.purposeData;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.updateTime !== undefined)
          requestBody.updateTime = input.event.inputConfig.updateTime;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.createTime !== undefined)
          requestBody.createTime = input.event.inputConfig.createTime;
        if (input.event.inputConfig.etag !== undefined)
          requestBody.etag = input.event.inputConfig.etag;

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

export default tagKeysPatch;
