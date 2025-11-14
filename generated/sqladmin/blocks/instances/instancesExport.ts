import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesExport: AppBlock = {
  name: "Instances - Export",
  description: `Exports data from a Cloud SQL instance to a Cloud Storage bucket as a SQL dump or CSV file.`,
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
        exportContext: {
          name: "Export Context",
          description: "Contains details about the export operation.",
          type: {
            type: "object",
            properties: {
              uri: {
                type: "string",
              },
              databases: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              kind: {
                type: "string",
              },
              sqlExportOptions: {
                type: "object",
                properties: {
                  tables: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  schemaOnly: {
                    type: "boolean",
                  },
                  mysqlExportOptions: {
                    type: "object",
                    properties: {
                      masterData: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    additionalProperties: true,
                  },
                  threads: {
                    type: "number",
                  },
                  parallel: {
                    type: "boolean",
                  },
                  postgresExportOptions: {
                    type: "object",
                    properties: {
                      clean: {
                        type: "object",
                        additionalProperties: true,
                      },
                      ifExists: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              csvExportOptions: {
                type: "object",
                properties: {
                  selectQuery: {
                    type: "string",
                  },
                  escapeCharacter: {
                    type: "string",
                  },
                  quoteCharacter: {
                    type: "string",
                  },
                  fieldsTerminatedBy: {
                    type: "string",
                  },
                  linesTerminatedBy: {
                    type: "string",
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
                    type: "boolean",
                  },
                  stripeCount: {
                    type: "number",
                  },
                  bakType: {
                    type: "string",
                    enum: ["BAK_TYPE_UNSPECIFIED", "FULL", "DIFF", "TLOG"],
                  },
                  copyOnly: {
                    type: "boolean",
                  },
                  differentialBase: {
                    type: "boolean",
                  },
                  exportLogStartTime: {
                    type: "string",
                  },
                  exportLogEndTime: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              tdeExportOptions: {
                type: "object",
                properties: {
                  certificatePath: {
                    type: "string",
                  },
                  privateKeyPath: {
                    type: "string",
                  },
                  privateKeyPassword: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
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
            scopes: ["https://www.googleapis.com/auth/cloud-platform"],
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
        let path = `v1/projects/{project}/instances/{instance}/export`;

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

        if (input.event.inputConfig.exportContext !== undefined)
          requestBody.exportContext = input.event.inputConfig.exportContext;

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

export default instancesExport;
