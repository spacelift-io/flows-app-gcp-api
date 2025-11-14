import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesExecuteSql: AppBlock = {
  name: "Instances - Execute SQL",
  description: `Execute SQL statements.`,
  category: "Instances",
  inputs: {
    default: {
      config: {
        instance: {
          name: "Instance",
          description:
            "Required. Database instance ID. This does not include the project ID.",
          type: "string",
          required: true,
        },
        user: {
          name: "User",
          description: "Optional.",
          type: "string",
          required: false,
        },
        sqlStatement: {
          name: "SQL Statement",
          description: "Required.",
          type: "string",
          required: false,
        },
        database: {
          name: "Database",
          description: "Optional.",
          type: "string",
          required: false,
        },
        autoIamAuthn: {
          name: "Auto IAM Authn",
          description: "Optional.",
          type: "boolean",
          required: false,
        },
        rowLimit: {
          name: "Row Limit",
          description: "Optional.",
          type: "string",
          required: false,
        },
        partialResultMode: {
          name: "Partial Result Mode",
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
            scopes: [
              "https://www.googleapis.com/auth/cloud-platform",
              "https://www.googleapis.com/auth/sqlservice.admin",
            ],
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
        const baseUrl = "https://sqladmin.googleapis.com/";
        let path = `v1/projects/{project}/instances/{instance}/executeSql`;

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

        if (input.event.inputConfig.user !== undefined)
          requestBody.user = input.event.inputConfig.user;
        if (input.event.inputConfig.sqlStatement !== undefined)
          requestBody.sqlStatement = input.event.inputConfig.sqlStatement;
        if (input.event.inputConfig.database !== undefined)
          requestBody.database = input.event.inputConfig.database;
        if (input.event.inputConfig.autoIamAuthn !== undefined)
          requestBody.autoIamAuthn = input.event.inputConfig.autoIamAuthn;
        if (input.event.inputConfig.rowLimit !== undefined)
          requestBody.rowLimit = input.event.inputConfig.rowLimit;
        if (input.event.inputConfig.partialResultMode !== undefined)
          requestBody.partialResultMode =
            input.event.inputConfig.partialResultMode;

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
