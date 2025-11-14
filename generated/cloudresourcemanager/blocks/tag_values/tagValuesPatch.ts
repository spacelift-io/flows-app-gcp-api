import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const tagValuesPatch: AppBlock = {
  name: "Tag Values - Patch",
  description: `Updates the attributes of the TagValue resource.`,
  category: "Tag Values",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Immutable. Resource name for TagValue in the format `tagValues/456`.",
          type: "string",
          required: true,
        },
        updateMask: {
          name: "UpdateMask",
          description: "Optional. Fields to be updated.",
          type: "string",
          required: false,
        },
        validateOnly: {
          name: "ValidateOnly",
          description:
            "Optional. True to perform validations necessary for updating the resource, but not actually perform the action.",
          type: "boolean",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "A TagValue is a child of a particular TagKey. This is used to group cloud resources for the purpose of controlling them using policies.",
          type: {
            type: "object",
            properties: {
              shortName: {
                type: "string",
              },
              updateTime: {
                type: "string",
              },
              name: {
                type: "string",
              },
              parent: {
                type: "string",
              },
              namespacedName: {
                type: "string",
              },
              etag: {
                type: "string",
              },
              createTime: {
                type: "string",
              },
              description: {
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

export default tagValuesPatch;
