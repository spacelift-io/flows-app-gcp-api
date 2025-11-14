import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesVerifyExternalSyncSettings: AppBlock = {
  name: "Instances - Verify External Sync Settings",
  description: `Verify External primary instance external sync settings.`,
  category: "Instances",
  inputs: {
    default: {
      config: {
        instance: {
          name: "Instance",
          description:
            "Cloud SQL instance ID. This does not include the project ID.",
          type: "string",
          required: true,
        },
        verifyConnectionOnly: {
          name: "Verify Connection Only",
          description: "Flag to enable verifying connection only",
          type: "boolean",
          required: false,
        },
        syncMode: {
          name: "Sync Mode",
          description: "External sync mode",
          type: "string",
          required: false,
        },
        verifyReplicationOnly: {
          name: "Verify Replication Only",
          description: "Optional.",
          type: "boolean",
          required: false,
        },
        mysqlSyncConfig: {
          name: "Mysql Sync Config",
          description: "Optional.",
          type: {
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
          required: false,
        },
        migrationType: {
          name: "Migration Type",
          description: "Optional.",
          type: "string",
          required: false,
        },
        syncParallelLevel: {
          name: "Sync Parallel Level",
          description: "Optional.",
          type: "string",
          required: false,
        },
        selectedObjects: {
          name: "Selected Objects",
          description: "Optional.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                database: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
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
        let path = `v1/projects/{project}/instances/{instance}/verifyExternalSyncSettings`;

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

        if (input.event.inputConfig.verifyConnectionOnly !== undefined)
          requestBody.verifyConnectionOnly =
            input.event.inputConfig.verifyConnectionOnly;
        if (input.event.inputConfig.syncMode !== undefined)
          requestBody.syncMode = input.event.inputConfig.syncMode;
        if (input.event.inputConfig.verifyReplicationOnly !== undefined)
          requestBody.verifyReplicationOnly =
            input.event.inputConfig.verifyReplicationOnly;
        if (input.event.inputConfig.mysqlSyncConfig !== undefined)
          requestBody.mysqlSyncConfig = input.event.inputConfig.mysqlSyncConfig;
        if (input.event.inputConfig.migrationType !== undefined)
          requestBody.migrationType = input.event.inputConfig.migrationType;
        if (input.event.inputConfig.syncParallelLevel !== undefined)
          requestBody.syncParallelLevel =
            input.event.inputConfig.syncParallelLevel;
        if (input.event.inputConfig.selectedObjects !== undefined)
          requestBody.selectedObjects = input.event.inputConfig.selectedObjects;

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
