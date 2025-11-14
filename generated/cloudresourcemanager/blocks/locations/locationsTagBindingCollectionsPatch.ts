import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsTagBindingCollectionsPatch: AppBlock = {
  name: "Locations - Patch",
  description: `Updates tag bindings directly attached to a GCP resource.`,
  category: "Locations",
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
            'Identifier. The name of the TagBindingCollection, following the convention: `locations/{location}/tagBindingCollections/{encoded-full-resource-name}` where the encoded-full-resource-name is the UTF-8 encoded name of the GCP resource the TagBindings are bound to. "locations/global/tagBindingCollections/%2f%2fcloudresourcemanager.googleapis.com%2fprojects%2f123"',
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Represents a collection of tags directly bound to a GCP resource.",
          type: {
            type: "object",
            properties: {
              etag: {
                type: "string",
              },
              tags: {
                type: "object",
                additionalProperties: true,
              },
              fullResourceName: {
                type: "string",
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

export default locationsTagBindingCollectionsPatch;
