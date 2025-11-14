import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsConnectionsRepositoriesBatchCreate: AppBlock = {
  name: "Locations - Batch Create",
  description: `Creates multiple repositories inside a connection.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The connection to contain all the repositories being created. Format: projects/*/locations/*/connections/* The parent field in the CreateRepositoryRequest messages must either be empty or match this field.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "Message for creating repositoritories in batch.",
          type: {
            type: "object",
            properties: {
              requests: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    parent: {
                      type: "object",
                      additionalProperties: true,
                    },
                    repository: {
                      type: "object",
                      additionalProperties: true,
                    },
                    repositoryId: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
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
        const baseUrl = "https://cloudbuild.googleapis.com/";
        const path = `v2/{+parent}/repositories:batchCreate`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
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

export default locationsConnectionsRepositoriesBatchCreate;
