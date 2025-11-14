import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesExecuteSql: AppBlock = {
  name: "Instances - Execute Sql",
  description: `Execute SQL statements.`,
  category: "Instances",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description:
            "Required. Project ID of the project that contains the instance.",
          type: "string",
          required: true,
        },
        instance: {
          name: "Instance",
          description:
            "Required. Database instance ID. This does not include the project ID.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "The request payload used to execute SQL statements.",
          type: {
            type: "object",
            properties: {
              user: {
                type: "string",
              },
              sqlStatement: {
                type: "string",
              },
              database: {
                type: "string",
              },
              autoIamAuthn: {
                type: "boolean",
              },
              rowLimit: {
                type: "string",
              },
              partialResultMode: {
                type: "string",
                enum: [
                  "PARTIAL_RESULT_MODE_UNSPECIFIED",
                  "FAIL_PARTIAL_RESULT",
                  "ALLOW_PARTIAL_RESULT",
                ],
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
            "https://www.googleapis.com/auth/sqlservice.admin",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://sqladmin.googleapis.com/";
        const path = `v1/projects/{project}/instances/{instance}/executeSql`;
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
          messages: {
            type: "array",
            items: {
              type: "object",
              properties: {
                message: {
                  type: "object",
                  additionalProperties: true,
                },
                severity: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          metadata: {
            type: "object",
            properties: {
              sqlStatementExecutionTime: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          results: {
            type: "array",
            items: {
              type: "object",
              properties: {
                columns: {
                  type: "object",
                  additionalProperties: true,
                },
                rows: {
                  type: "object",
                  additionalProperties: true,
                },
                message: {
                  type: "object",
                  additionalProperties: true,
                },
                partialResult: {
                  type: "object",
                  additionalProperties: true,
                },
                status: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          status: {
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
        },
        additionalProperties: true,
      },
    },
  },
};

export default instancesExecuteSql;
