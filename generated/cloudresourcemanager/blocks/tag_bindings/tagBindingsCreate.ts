import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const tagBindingsCreate: AppBlock = {
  name: "Tag Bindings - Create",
  description: `Creates a TagBinding between a TagValue and a Google Cloud resource.`,
  category: "Tag Bindings",
  inputs: {
    default: {
      config: {
        validateOnly: {
          name: "Validate Only",
          description:
            "Optional. Set to true to perform the validations necessary for creating the resource, but not actually perform the action.",
          type: "boolean",
          required: false,
        },
        name: {
          name: "Name",
          description: "Output only.",
          type: "string",
          required: false,
        },
        parent: {
          name: "Parent",
          description:
            "The full resource name of the resource the TagValue is bound to.",
          type: "string",
          required: false,
        },
        tagValue: {
          name: "Tag Value",
          description: "The TagValue of the TagBinding.",
          type: "string",
          required: false,
        },
        tagValueNamespacedName: {
          name: "Tag Value Namespaced Name",
          description:
            "The namespaced name for the TagValue of the TagBinding.",
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
        let path = `v3/tagBindings`;

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

        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.parent !== undefined)
          requestBody.parent = input.event.inputConfig.parent;
        if (input.event.inputConfig.tagValue !== undefined)
          requestBody.tagValue = input.event.inputConfig.tagValue;
        if (input.event.inputConfig.tagValueNamespacedName !== undefined)
          requestBody.tagValueNamespacedName =
            input.event.inputConfig.tagValueNamespacedName;

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

export default tagBindingsCreate;
