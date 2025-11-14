import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const schemasCommit: AppBlock = {
  name: "Schemas - Commit",
  description: `Commits a new schema revision to an existing schema.`,
  category: "Schemas",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The name of the schema we are revising. Format is `projects/{project}/schemas/{schema}`.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "Request for CommitSchema method.",
          type: {
            type: "object",
            properties: {
              schema: {
                type: "object",
                properties: {
                  definition: {
                    type: "string",
                  },
                  revisionCreateTime: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  revisionId: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                    enum: ["TYPE_UNSPECIFIED", "PROTOCOL_BUFFER", "AVRO"],
                  },
                },
                additionalProperties: true,
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
          scopes: [
            "https://www.googleapis.com/auth/cloud-platform",
            "https://www.googleapis.com/auth/pubsub",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://pubsub.googleapis.com/";
        const path = `v1/{+name}:commit`;
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
          definition: {
            type: "string",
          },
          revisionCreateTime: {
            type: "string",
          },
          name: {
            type: "string",
          },
          revisionId: {
            type: "string",
          },
          type: {
            type: "string",
            enum: ["TYPE_UNSPECIFIED", "PROTOCOL_BUFFER", "AVRO"],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default schemasCommit;
