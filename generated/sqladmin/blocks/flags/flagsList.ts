import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const flagsList: AppBlock = {
  name: "Flags - List",
  description: `Lists all available database flags for Cloud SQL instances.`,
  category: "Flags",
  inputs: {
    default: {
      config: {
        databaseVersion: {
          name: "Database Version",
          description:
            "Database type and version you want to retrieve flags for. By default, this method returns flags for all database types and versions.",
          type: "string",
          required: false,
        },
        flagScope: {
          name: "Flag Scope",
          description:
            "Optional. Specify the scope of flags to be returned by SqlFlagsListService. Return list of database flags if unspecified. Valid values: SQL_FLAG_SCOPE_UNSPECIFIED, SQL_FLAG_SCOPE_DATABASE, SQL_FLAG_SCOPE_CONNECTION_POOL",
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
        let path = `v1/flags`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

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
          kind: {
            type: "string",
          },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                type: {
                  type: "object",
                  additionalProperties: true,
                },
                appliesTo: {
                  type: "object",
                  additionalProperties: true,
                },
                allowedStringValues: {
                  type: "object",
                  additionalProperties: true,
                },
                minValue: {
                  type: "object",
                  additionalProperties: true,
                },
                maxValue: {
                  type: "object",
                  additionalProperties: true,
                },
                requiresRestart: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                inBeta: {
                  type: "object",
                  additionalProperties: true,
                },
                allowedIntValues: {
                  type: "object",
                  additionalProperties: true,
                },
                flagScope: {
                  type: "object",
                  additionalProperties: true,
                },
                recommendedStringValue: {
                  type: "object",
                  additionalProperties: true,
                },
                recommendedIntValue: {
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
    },
  },
};

export default flagsList;
