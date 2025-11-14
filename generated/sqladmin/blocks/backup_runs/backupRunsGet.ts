import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const backupRunsGet: AppBlock = {
  name: "Backup Runs - Get",
  description: `Retrieves a resource containing information about a backup run.`,
  category: "Backup Runs",
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
        id: {
          name: "ID",
          description: "The ID of this backup run.",
          type: "string",
          required: true,
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
        let path = `v1/projects/{project}/instances/{instance}/backupRuns/{id}`;

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
          status: {
            type: "string",
            enum: [
              "SQL_BACKUP_RUN_STATUS_UNSPECIFIED",
              "ENQUEUED",
              "OVERDUE",
              "RUNNING",
              "FAILED",
              "SUCCESSFUL",
              "SKIPPED",
              "DELETION_PENDING",
              "DELETION_FAILED",
              "DELETED",
            ],
          },
          enqueuedTime: {
            type: "string",
          },
          id: {
            type: "string",
          },
          startTime: {
            type: "string",
          },
          endTime: {
            type: "string",
          },
          error: {
            type: "object",
            properties: {
              kind: {
                type: "string",
              },
              code: {
                type: "string",
              },
              message: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          type: {
            type: "string",
            enum: ["SQL_BACKUP_RUN_TYPE_UNSPECIFIED", "AUTOMATED", "ON_DEMAND"],
          },
          description: {
            type: "string",
          },
          windowStartTime: {
            type: "string",
          },
          instance: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          location: {
            type: "string",
          },
          databaseVersion: {
            type: "string",
            enum: [
              "SQL_DATABASE_VERSION_UNSPECIFIED",
              "MYSQL_5_1",
              "MYSQL_5_5",
              "MYSQL_5_6",
              "MYSQL_5_7",
              "MYSQL_8_0",
              "MYSQL_8_0_18",
              "MYSQL_8_0_26",
              "MYSQL_8_0_27",
              "MYSQL_8_0_28",
              "MYSQL_8_0_29",
              "MYSQL_8_0_30",
              "MYSQL_8_0_31",
              "MYSQL_8_0_32",
              "MYSQL_8_0_33",
              "MYSQL_8_0_34",
              "MYSQL_8_0_35",
              "MYSQL_8_0_36",
              "MYSQL_8_0_37",
              "MYSQL_8_0_39",
              "MYSQL_8_0_40",
              "MYSQL_8_0_41",
              "MYSQL_8_0_42",
              "MYSQL_8_0_43",
              "MYSQL_8_0_44",
              "MYSQL_8_0_45",
              "MYSQL_8_0_46",
              "MYSQL_8_4",
              "SQLSERVER_2017_STANDARD",
              "SQLSERVER_2017_ENTERPRISE",
              "SQLSERVER_2017_EXPRESS",
              "SQLSERVER_2017_WEB",
              "POSTGRES_9_6",
              "POSTGRES_10",
              "POSTGRES_11",
              "POSTGRES_12",
              "POSTGRES_13",
              "POSTGRES_14",
              "POSTGRES_15",
              "POSTGRES_16",
              "POSTGRES_17",
              "POSTGRES_18",
              "SQLSERVER_2019_STANDARD",
              "SQLSERVER_2019_ENTERPRISE",
              "SQLSERVER_2019_EXPRESS",
              "SQLSERVER_2019_WEB",
              "SQLSERVER_2022_STANDARD",
              "SQLSERVER_2022_ENTERPRISE",
              "SQLSERVER_2022_EXPRESS",
              "SQLSERVER_2022_WEB",
            ],
          },
          diskEncryptionConfiguration: {
            type: "object",
            properties: {
              kmsKeyName: {
                type: "string",
              },
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          diskEncryptionStatus: {
            type: "object",
            properties: {
              kmsKeyVersionName: {
                type: "string",
              },
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          backupKind: {
            type: "string",
            enum: ["SQL_BACKUP_KIND_UNSPECIFIED", "SNAPSHOT", "PHYSICAL"],
          },
          timeZone: {
            type: "string",
          },
          maxChargeableBytes: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default backupRunsGet;
