import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesRestoreBackup: AppBlock = {
  name: "Instances - Restore Backup",
  description: `Restores a backup of a Cloud SQL instance.`,
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
        restoreBackupContext: {
          name: "Restore Backup Context",
          description:
            "Parameters required to perform the restore backup operation.",
          type: {
            type: "object",
            properties: {
              kind: {
                type: "string",
              },
              backupRunId: {
                type: "string",
              },
              instanceId: {
                type: "string",
              },
              project: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        backup: {
          name: "Backup",
          description:
            "The name of the backup that's used to restore a Cloud SQL instance: Format: projects/{project-id}/backups/{backup-uid}.",
          type: "string",
          required: false,
        },
        backupdrBackup: {
          name: "Backupdr Backup",
          description:
            'The name of the backup that\'s used to restore a Cloud SQL instance: Format: "projects/{project-id}/locations/{location}/backupVaults/{backupvault}/dataSources/{datasource}/backups/{backup-uid}".',
          type: "string",
          required: false,
        },
        restoreInstanceSettings: {
          name: "Restore Instance Settings",
          description: "Optional.",
          type: {
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
                properties: {
                  settingsVersion: {
                    type: "object",
                    additionalProperties: true,
                  },
                  authorizedGaeApplications: {
                    type: "object",
                    additionalProperties: true,
                  },
                  tier: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                  userLabels: {
                    type: "object",
                    additionalProperties: true,
                  },
                  availabilityType: {
                    type: "object",
                    additionalProperties: true,
                  },
                  pricingPlan: {
                    type: "object",
                    additionalProperties: true,
                  },
                  replicationType: {
                    type: "object",
                    additionalProperties: true,
                  },
                  storageAutoResizeLimit: {
                    type: "object",
                    additionalProperties: true,
                  },
                  activationPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  ipConfiguration: {
                    type: "object",
                    additionalProperties: true,
                  },
                  storageAutoResize: {
                    type: "object",
                    additionalProperties: true,
                  },
                  locationPreference: {
                    type: "object",
                    additionalProperties: true,
                  },
                  databaseFlags: {
                    type: "object",
                    additionalProperties: true,
                  },
                  dataDiskType: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maintenanceWindow: {
                    type: "object",
                    additionalProperties: true,
                  },
                  backupConfiguration: {
                    type: "object",
                    additionalProperties: true,
                  },
                  databaseReplicationEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  crashSafeReplicationEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  dataDiskSizeGb: {
                    type: "object",
                    additionalProperties: true,
                  },
                  activeDirectoryConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  collation: {
                    type: "object",
                    additionalProperties: true,
                  },
                  denyMaintenancePeriods: {
                    type: "object",
                    additionalProperties: true,
                  },
                  insightsConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  passwordValidationPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sqlServerAuditConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  edition: {
                    type: "object",
                    additionalProperties: true,
                  },
                  connectorEnforcement: {
                    type: "object",
                    additionalProperties: true,
                  },
                  deletionProtectionEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  timeZone: {
                    type: "object",
                    additionalProperties: true,
                  },
                  advancedMachineFeatures: {
                    type: "object",
                    additionalProperties: true,
                  },
                  dataCacheConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  replicationLagMaxSeconds: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableGoogleMlIntegration: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableDataplexIntegration: {
                    type: "object",
                    additionalProperties: true,
                  },
                  retainBackupsOnDelete: {
                    type: "object",
                    additionalProperties: true,
                  },
                  dataDiskProvisionedIops: {
                    type: "object",
                    additionalProperties: true,
                  },
                  dataDiskProvisionedThroughput: {
                    type: "object",
                    additionalProperties: true,
                  },
                  connectionPoolConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  finalBackupConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  readPoolAutoScaleConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  autoUpgradeEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  entraidConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  dataApiAccess: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              etag: {
                type: "string",
              },
              failoverReplica: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  available: {
                    type: "boolean",
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
                  type: "string",
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
                properties: {
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                  certSerialNumber: {
                    type: "object",
                    additionalProperties: true,
                  },
                  cert: {
                    type: "object",
                    additionalProperties: true,
                  },
                  createTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  commonName: {
                    type: "object",
                    additionalProperties: true,
                  },
                  expirationTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sha1Fingerprint: {
                    type: "object",
                    additionalProperties: true,
                  },
                  instance: {
                    type: "object",
                    additionalProperties: true,
                  },
                  selfLink: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  hostPort: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                  username: {
                    type: "object",
                    additionalProperties: true,
                  },
                  password: {
                    type: "object",
                    additionalProperties: true,
                  },
                  caCertificate: {
                    type: "object",
                    additionalProperties: true,
                  },
                  clientCertificate: {
                    type: "object",
                    additionalProperties: true,
                  },
                  clientKey: {
                    type: "object",
                    additionalProperties: true,
                  },
                  dumpFilePath: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sourceInstance: {
                    type: "object",
                    additionalProperties: true,
                  },
                  selectedObjects: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sslOption: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              replicaConfiguration: {
                type: "object",
                properties: {
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                  mysqlReplicaConfiguration: {
                    type: "object",
                    additionalProperties: true,
                  },
                  failoverTarget: {
                    type: "object",
                    additionalProperties: true,
                  },
                  cascadableReplica: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                  type: "string",
                  enum: [
                    "SQL_SUSPENSION_REASON_UNSPECIFIED",
                    "BILLING_ISSUE",
                    "LEGAL_ISSUE",
                    "OPERATIONAL_ISSUE",
                    "KMS_KEY_ISSUE",
                  ],
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
                properties: {
                  kmsKeyName: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              diskEncryptionStatus: {
                type: "object",
                properties: {
                  kmsKeyVersionName: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              rootPassword: {
                type: "string",
              },
              scheduledMaintenance: {
                type: "object",
                properties: {
                  startTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  canDefer: {
                    type: "object",
                    additionalProperties: true,
                  },
                  canReschedule: {
                    type: "object",
                    additionalProperties: true,
                  },
                  scheduleDeadlineTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  sqlOutOfDiskState: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sqlMinRecommendedIncreaseSizeGb: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              createTime: {
                type: "string",
              },
              availableMaintenanceVersions: {
                type: "array",
                items: {
                  type: "string",
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
                properties: {
                  psaWriteEndpoint: {
                    type: "object",
                    additionalProperties: true,
                  },
                  failoverDrReplicaName: {
                    type: "object",
                    additionalProperties: true,
                  },
                  drReplica: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              geminiConfig: {
                type: "object",
                properties: {
                  entitled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  googleVacuumMgmtEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  oomSessionCancelEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  activeQueryEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  indexAdvisorEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  flagRecommenderEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
          required: false,
        },
        restoreInstanceClearOverridesFieldNames: {
          name: "Restore Instance Clear Overrides Field Names",
          description: "Optional.",
          type: {
            type: "array",
            items: {
              type: "string",
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
        let path = `v1/projects/{project}/instances/{instance}/restoreBackup`;

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

        if (input.event.inputConfig.restoreBackupContext !== undefined)
          requestBody.restoreBackupContext =
            input.event.inputConfig.restoreBackupContext;
        if (input.event.inputConfig.backup !== undefined)
          requestBody.backup = input.event.inputConfig.backup;
        if (input.event.inputConfig.backupdrBackup !== undefined)
          requestBody.backupdrBackup = input.event.inputConfig.backupdrBackup;
        if (input.event.inputConfig.restoreInstanceSettings !== undefined)
          requestBody.restoreInstanceSettings =
            input.event.inputConfig.restoreInstanceSettings;
        if (
          input.event.inputConfig.restoreInstanceClearOverridesFieldNames !==
          undefined
        )
          requestBody.restoreInstanceClearOverridesFieldNames =
            input.event.inputConfig.restoreInstanceClearOverridesFieldNames;

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

export default instancesRestoreBackup;
