import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesVerifyExternalSyncSettings: AppBlock = {
  name: "Instances - Verify External Sync Settings",
  description: `Verify External primary instance external sync settings.`,
  category: "Instances",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID of the project that contains the instance.",
          type: "string",
          required: true,
        },
        instance: {
          name: "Instance",
          description:
            "Cloud SQL instance ID. This does not include the project ID.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "Instance verify external sync settings request.",
          type: {
            type: "object",
            properties: {
              verifyConnectionOnly: {
                type: "boolean",
              },
              syncMode: {
                type: "string",
                enum: ["EXTERNAL_SYNC_MODE_UNSPECIFIED", "ONLINE", "OFFLINE"],
              },
              verifyReplicationOnly: {
                type: "boolean",
              },
              mysqlSyncConfig: {
                type: "object",
                properties: {
                  initialSyncFlags: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
                additionalProperties: true,
              },
              migrationType: {
                type: "string",
                enum: ["MIGRATION_TYPE_UNSPECIFIED", "LOGICAL", "PHYSICAL"],
              },
              syncParallelLevel: {
                type: "string",
                enum: [
                  "EXTERNAL_SYNC_PARALLEL_LEVEL_UNSPECIFIED",
                  "MIN",
                  "OPTIMAL",
                  "MAX",
                ],
              },
              selectedObjects: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    database: {
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
          scopes: [
            "https://www.googleapis.com/auth/cloud-platform",
            "https://www.googleapis.com/auth/sqlservice.admin",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://sqladmin.googleapis.com/";
        const path = `v1/projects/{project}/instances/{instance}/verifyExternalSyncSettings`;
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
          kind: {
            type: "string",
          },
          errors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                type: {
                  type: "object",
                  additionalProperties: true,
                },
                detail: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          warnings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                type: {
                  type: "object",
                  additionalProperties: true,
                },
                detail: {
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

export default instancesVerifyExternalSyncSettings;
