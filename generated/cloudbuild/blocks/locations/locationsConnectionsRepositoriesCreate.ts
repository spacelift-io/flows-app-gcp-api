import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsConnectionsRepositoriesCreate: AppBlock = {
  name: "Locations - Create",
  description: `Creates a Repository.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The connection to contain the repository. If the request is part of a BatchCreateRepositoriesRequest, this field should be empty or match the parent specified there.",
          type: "string",
          required: true,
        },
        repositoryId: {
          name: "RepositoryId",
          description:
            "Required. The ID to use for the repository, which will become the final component of the repository's resource name. This ID should be unique in the connection. Allows alphanumeric characters and any of -._~%!$&'()*+,;=@.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description: "A repository associated to a parent connection.",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              remoteUri: {
                type: "string",
              },
              createTime: {
                type: "string",
              },
              updateTime: {
                type: "string",
              },
              annotations: {
                type: "object",
                additionalProperties: true,
              },
              etag: {
                type: "string",
              },
              webhookId: {
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
        const baseUrl = "https://cloudbuild.googleapis.com/";
        const path = `v2/{+parent}/repositories`;
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

export default locationsConnectionsRepositoriesCreate;
