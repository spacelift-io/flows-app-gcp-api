import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const BackupsGetBackup: AppBlock = {
  name: "Backups - Get Backup",
  description: `Retrieves a resource containing information about a backup.`,
  category: "Backups",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The name of the backup to retrieve. Format: projects/{project}/backups/{backup}",
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
        let path = `v1/{+name}`;

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
          name: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          type: {
            type: "string",
            enum: [
              "SQL_BACKUP_TYPE_UNSPECIFIED",
              "AUTOMATED",
              "ON_DEMAND",
              "FINAL",
            ],
          },
          description: {
            type: "string",
          },
          instance: {
            type: "string",
          },
          location: {
            type: "string",
          },
          backupInterval: {
            type: "object",
            properties: {
              startTime: {
                type: "string",
              },
              endTime: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          state: {
            type: "string",
            enum: [
              "SQL_BACKUP_STATE_UNSPECIFIED",
              "ENQUEUED",
              "RUNNING",
              "FAILED",
              "SUCCESSFUL",
              "DELETING",
              "DELETION_FAILED",
            ],
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
          kmsKey: {
            type: "string",
          },
          kmsKeyVersion: {
            type: "string",
          },
          backupKind: {
            type: "string",
            enum: ["SQL_BACKUP_KIND_UNSPECIFIED", "SNAPSHOT", "PHYSICAL"],
          },
          timeZone: {
            type: "string",
          },
          ttlDays: {
            type: "string",
          },
          expiryTime: {
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
          maxChargeableBytes: {
            type: "string",
          },
          instanceDeletionTime: {
            type: "string",
          },
          instanceSettings: {
            type: "object",
            properties: {
              kind: {
                type: "string",
              },
              state: {
                type: "string",
                enum: [
                  "SQL_INSTANCE_STATE_UNSPECIFIED",
                  "RUNNABLE",
                  "SUSPENDED",
                  "PENDING_DELETE",
                  "PENDING_CREATE",
                  "MAINTENANCE",
                  "FAILED",
                  "ONLINE_MAINTENANCE",
                  "REPAIRING",
                ],
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
              settings: {
                type: "object",
                additionalProperties: true,
              },
              etag: {
                type: "string",
              },
              failoverReplica: {
                type: "object",
                properties: {
                  name: {
                    type: "object",
                    additionalProperties: true,
                  },
                  available: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              masterInstanceName: {
                type: "string",
              },
              replicaNames: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              maxDiskSize: {
                type: "string",
              },
              currentDiskSize: {
                type: "string",
              },
              ipAddresses: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              serverCaCert: {
                type: "object",
                additionalProperties: true,
              },
              instanceType: {
                type: "string",
                enum: [
                  "SQL_INSTANCE_TYPE_UNSPECIFIED",
                  "CLOUD_SQL_INSTANCE",
                  "ON_PREMISES_INSTANCE",
                  "READ_REPLICA_INSTANCE",
                  "READ_POOL_INSTANCE",
                ],
              },
              project: {
                type: "string",
              },
              ipv6Address: {
                type: "string",
              },
              serviceAccountEmailAddress: {
                type: "string",
              },
              onPremisesConfiguration: {
                type: "object",
                additionalProperties: true,
              },
              replicaConfiguration: {
                type: "object",
                additionalProperties: true,
              },
              backendType: {
                type: "string",
                enum: [
                  "SQL_BACKEND_TYPE_UNSPECIFIED",
                  "FIRST_GEN",
                  "SECOND_GEN",
                  "EXTERNAL",
                ],
              },
              selfLink: {
                type: "string",
              },
              suspensionReason: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              connectionName: {
                type: "string",
              },
              name: {
                type: "string",
              },
              region: {
                type: "string",
              },
              gceZone: {
                type: "string",
              },
              secondaryGceZone: {
                type: "string",
              },
              diskEncryptionConfiguration: {
                type: "object",
                additionalProperties: true,
              },
              diskEncryptionStatus: {
                type: "object",
                additionalProperties: true,
              },
              rootPassword: {
                type: "string",
              },
              scheduledMaintenance: {
                type: "object",
                additionalProperties: true,
              },
              satisfiesPzs: {
                type: "boolean",
              },
              databaseInstalledVersion: {
                type: "string",
              },
              outOfDiskReport: {
                type: "object",
                additionalProperties: true,
              },
              createTime: {
                type: "string",
              },
              availableMaintenanceVersions: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              maintenanceVersion: {
                type: "string",
              },
              upgradableDatabaseVersions: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              sqlNetworkArchitecture: {
                type: "string",
                enum: [
                  "SQL_NETWORK_ARCHITECTURE_UNSPECIFIED",
                  "NEW_NETWORK_ARCHITECTURE",
                  "OLD_NETWORK_ARCHITECTURE",
                ],
              },
              pscServiceAttachmentLink: {
                type: "string",
              },
              dnsName: {
                type: "string",
              },
              primaryDnsName: {
                type: "string",
              },
              writeEndpoint: {
                type: "string",
              },
              replicationCluster: {
                type: "object",
                additionalProperties: true,
              },
              geminiConfig: {
                type: "object",
                additionalProperties: true,
              },
              satisfiesPzi: {
                type: "boolean",
              },
              switchTransactionLogsToCloudStorageEnabled: {
                type: "boolean",
              },
              includeReplicasForMajorVersionUpgrade: {
                type: "boolean",
              },
              tags: {
                type: "object",
                additionalProperties: true,
              },
              nodeCount: {
                type: "number",
              },
              nodes: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              dnsNames: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          backupRun: {
            type: "string",
          },
          satisfiesPzs: {
            type: "boolean",
          },
          satisfiesPzi: {
            type: "boolean",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default BackupsGetBackup;
