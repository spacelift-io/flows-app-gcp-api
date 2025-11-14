import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const tagKeysPatch: AppBlock = {
  name: "Tag Keys - Patch",
  description: `Updates the attributes of the TagKey resource.`,
  category: "Tag Keys",
  inputs: {
    default: {
      config: {
        validateOnly: {
          name: "ValidateOnly",
          description:
            "Set as true to perform validations necessary for updating the resource, but not actually perform the action.",
          type: "boolean",
          required: false,
        },
        updateMask: {
          name: "UpdateMask",
          description:
            "Fields to be updated. The mask may only contain `description` or `etag`. If omitted entirely, both `description` and `etag` are assumed to be significant.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description:
            "Immutable. The resource name for a TagKey. Must be in the format `tagKeys/{tag_key_id}`, where `tag_key_id` is the generated numeric id for the TagKey.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "A TagKey, used to group a set of TagValues.",
          type: {
            type: "object",
            properties: {
              parent: {
                type: "string",
              },
              allowedValuesRegex: {
                type: "string",
              },
              namespacedName: {
                type: "string",
              },
              purpose: {
                type: "string",
                enum: [
                  "PURPOSE_UNSPECIFIED",
                  "GCE_FIREWALL",
                  "DATA_GOVERNANCE",
                ],
              },
              shortName: {
                type: "string",
              },
              purposeData: {
                type: "object",
                additionalProperties: true,
              },
              description: {
                type: "string",
              },
              updateTime: {
                type: "string",
              },
              name: {
                type: "string",
              },
              createTime: {
                type: "string",
              },
              etag: {
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

export default tagKeysPatch;
