import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const BackupsCreateBackup: AppBlock = {
  name: "Backups - Create Backup",
  description: `Creates a backup for a Cloud SQL instance.`,
  category: "Backups",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The parent resource where this backup is created. Format: projects/{project}",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "A backup resource.",
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
        const path = `v1/{+parent}/backups`;
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
          targetLink: {
            type: "string",
          },
          status: {
            type: "string",
            enum: [
              "SQL_OPERATION_STATUS_UNSPECIFIED",
              "PENDING",
              "RUNNING",
              "DONE",
            ],
          },
          user: {
            type: "string",
          },
          insertTime: {
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
              errors: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          apiWarning: {
            type: "object",
            properties: {
              code: {
                type: "string",
                enum: [
                  "SQL_API_WARNING_CODE_UNSPECIFIED",
                  "REGION_UNREACHABLE",
                  "MAX_RESULTS_EXCEEDS_LIMIT",
                  "COMPROMISED_CREDENTIALS",
                  "INTERNAL_STATE_FAILURE",
                ],
              },
              message: {
                type: "string",
              },
              region: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          operationType: {
            type: "string",
            enum: [
              "SQL_OPERATION_TYPE_UNSPECIFIED",
              "IMPORT",
              "EXPORT",
              "CREATE",
              "UPDATE",
              "DELETE",
              "RESTART",
              "BACKUP",
              "SNAPSHOT",
              "BACKUP_VOLUME",
              "DELETE_VOLUME",
              "RESTORE_VOLUME",
              "INJECT_USER",
              "CLONE",
              "STOP_REPLICA",
              "START_REPLICA",
              "PROMOTE_REPLICA",
              "CREATE_REPLICA",
              "CREATE_USER",
              "DELETE_USER",
              "UPDATE_USER",
              "CREATE_DATABASE",
              "DELETE_DATABASE",
              "UPDATE_DATABASE",
              "FAILOVER",
              "DELETE_BACKUP",
              "RECREATE_REPLICA",
              "TRUNCATE_LOG",
              "DEMOTE_MASTER",
              "MAINTENANCE",
              "ENABLE_PRIVATE_IP",
              "DEFER_MAINTENANCE",
              "CREATE_CLONE",
              "RESCHEDULE_MAINTENANCE",
              "START_EXTERNAL_SYNC",
              "LOG_CLEANUP",
              "AUTO_RESTART",
              "REENCRYPT",
              "SWITCHOVER",
              "UPDATE_BACKUP",
              "ACQUIRE_SSRS_LEASE",
              "RELEASE_SSRS_LEASE",
              "RECONFIGURE_OLD_PRIMARY",
              "CLUSTER_MAINTENANCE",
              "SELF_SERVICE_MAINTENANCE",
              "SWITCHOVER_TO_REPLICA",
              "MAJOR_VERSION_UPGRADE",
              "ADVANCED_BACKUP",
              "MANAGE_BACKUP",
              "ENHANCED_BACKUP",
              "REPAIR_READ_POOL",
              "CREATE_READ_POOL",
            ],
          },
          importContext: {
            type: "object",
            properties: {
              uri: {
                type: "string",
              },
              database: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              fileType: {
                type: "string",
                enum: ["SQL_FILE_TYPE_UNSPECIFIED", "SQL", "CSV", "BAK", "TDE"],
              },
              csvImportOptions: {
                type: "object",
                properties: {
                  table: {
                    type: "object",
                    additionalProperties: true,
                  },
                  columns: {
                    type: "object",
                    additionalProperties: true,
                  },
                  escapeCharacter: {
                    type: "object",
                    additionalProperties: true,
                  },
                  quoteCharacter: {
                    type: "object",
                    additionalProperties: true,
                  },
                  fieldsTerminatedBy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  linesTerminatedBy: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              importUser: {
                type: "string",
              },
              bakImportOptions: {
                type: "object",
                properties: {
                  encryptionOptions: {
                    type: "object",
                    additionalProperties: true,
                  },
                  striped: {
                    type: "object",
                    additionalProperties: true,
                  },
                  noRecovery: {
                    type: "object",
                    additionalProperties: true,
                  },
                  recoveryOnly: {
                    type: "object",
                    additionalProperties: true,
                  },
                  bakType: {
                    type: "object",
                    additionalProperties: true,
                  },
                  stopAt: {
                    type: "object",
                    additionalProperties: true,
                  },
                  stopAtMark: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              sqlImportOptions: {
                type: "object",
                properties: {
                  threads: {
                    type: "object",
                    additionalProperties: true,
                  },
                  parallel: {
                    type: "object",
                    additionalProperties: true,
                  },
                  postgresImportOptions: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              tdeImportOptions: {
                type: "object",
                properties: {
                  certificatePath: {
                    type: "object",
                    additionalProperties: true,
                  },
                  privateKeyPath: {
                    type: "object",
                    additionalProperties: true,
                  },
                  privateKeyPassword: {
                    type: "object",
                    additionalProperties: true,
                  },
                  name: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          exportContext: {
            type: "object",
            properties: {
              uri: {
                type: "string",
              },
              databases: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              kind: {
                type: "string",
              },
              sqlExportOptions: {
                type: "object",
                properties: {
                  tables: {
                    type: "object",
                    additionalProperties: true,
                  },
                  schemaOnly: {
                    type: "object",
                    additionalProperties: true,
                  },
                  mysqlExportOptions: {
                    type: "object",
                    additionalProperties: true,
                  },
                  threads: {
                    type: "object",
                    additionalProperties: true,
                  },
                  parallel: {
                    type: "object",
                    additionalProperties: true,
                  },
                  postgresExportOptions: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              csvExportOptions: {
                type: "object",
                properties: {
                  selectQuery: {
                    type: "object",
                    additionalProperties: true,
                  },
                  escapeCharacter: {
                    type: "object",
                    additionalProperties: true,
                  },
                  quoteCharacter: {
                    type: "object",
                    additionalProperties: true,
                  },
                  fieldsTerminatedBy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  linesTerminatedBy: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              fileType: {
                type: "string",
                enum: ["SQL_FILE_TYPE_UNSPECIFIED", "SQL", "CSV", "BAK", "TDE"],
              },
              offload: {
                type: "boolean",
              },
              bakExportOptions: {
                type: "object",
                properties: {
                  striped: {
                    type: "object",
                    additionalProperties: true,
                  },
                  stripeCount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  bakType: {
                    type: "object",
                    additionalProperties: true,
                  },
                  copyOnly: {
                    type: "object",
                    additionalProperties: true,
                  },
                  differentialBase: {
                    type: "object",
                    additionalProperties: true,
                  },
                  exportLogStartTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  exportLogEndTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              tdeExportOptions: {
                type: "object",
                properties: {
                  certificatePath: {
                    type: "object",
                    additionalProperties: true,
                  },
                  privateKeyPath: {
                    type: "object",
                    additionalProperties: true,
                  },
                  privateKeyPassword: {
                    type: "object",
                    additionalProperties: true,
                  },
                  name: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          backupContext: {
            type: "object",
            properties: {
              backupId: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              name: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          preCheckMajorVersionUpgradeContext: {
            type: "object",
            properties: {
              targetDatabaseVersion: {
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
              preCheckResponse: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          name: {
            type: "string",
          },
          targetId: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          targetProject: {
            type: "string",
          },
          acquireSsrsLeaseContext: {
            type: "object",
            properties: {
              setupLogin: {
                type: "string",
              },
              serviceLogin: {
                type: "string",
              },
              reportDatabase: {
                type: "string",
              },
              duration: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          subOperationType: {
            type: "object",
            properties: {
              maintenanceType: {
                type: "string",
                enum: [
                  "SQL_MAINTENANCE_TYPE_UNSPECIFIED",
                  "INSTANCE_MAINTENANCE",
                  "REPLICA_INCLUDED_MAINTENANCE",
                  "INSTANCE_SELF_SERVICE_MAINTENANCE",
                  "REPLICA_INCLUDED_SELF_SERVICE_MAINTENANCE",
                ],
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

export default BackupsCreateBackup;
