import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesGet: AppBlock = {
  name: "Instances - Get",
  description: `Retrieves a resource containing information about a Cloud SQL instance.`,
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
        let path = `v1/projects/{project}/instances/{instance}`;

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
                type: "string",
              },
              authorizedGaeApplications: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              tier: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              userLabels: {
                type: "object",
                additionalProperties: true,
              },
              availabilityType: {
                type: "string",
                enum: [
                  "SQL_AVAILABILITY_TYPE_UNSPECIFIED",
                  "ZONAL",
                  "REGIONAL",
                ],
              },
              pricingPlan: {
                type: "string",
                enum: ["SQL_PRICING_PLAN_UNSPECIFIED", "PACKAGE", "PER_USE"],
              },
              replicationType: {
                type: "string",
                enum: [
                  "SQL_REPLICATION_TYPE_UNSPECIFIED",
                  "SYNCHRONOUS",
                  "ASYNCHRONOUS",
                ],
              },
              storageAutoResizeLimit: {
                type: "string",
              },
              activationPolicy: {
                type: "string",
                enum: [
                  "SQL_ACTIVATION_POLICY_UNSPECIFIED",
                  "ALWAYS",
                  "NEVER",
                  "ON_DEMAND",
                ],
              },
              ipConfiguration: {
                type: "object",
                additionalProperties: true,
              },
              storageAutoResize: {
                type: "boolean",
              },
              locationPreference: {
                type: "object",
                additionalProperties: true,
              },
              databaseFlags: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              dataDiskType: {
                type: "string",
                enum: [
                  "SQL_DATA_DISK_TYPE_UNSPECIFIED",
                  "PD_SSD",
                  "PD_HDD",
                  "OBSOLETE_LOCAL_SSD",
                  "HYPERDISK_BALANCED",
                ],
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
                type: "boolean",
              },
              crashSafeReplicationEnabled: {
                type: "boolean",
              },
              dataDiskSizeGb: {
                type: "string",
              },
              activeDirectoryConfig: {
                type: "object",
                additionalProperties: true,
              },
              collation: {
                type: "string",
              },
              denyMaintenancePeriods: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
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
                type: "string",
                enum: ["EDITION_UNSPECIFIED", "ENTERPRISE", "ENTERPRISE_PLUS"],
              },
              connectorEnforcement: {
                type: "string",
                enum: [
                  "CONNECTOR_ENFORCEMENT_UNSPECIFIED",
                  "NOT_REQUIRED",
                  "REQUIRED",
                ],
              },
              deletionProtectionEnabled: {
                type: "boolean",
              },
              timeZone: {
                type: "string",
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
                type: "number",
              },
              enableGoogleMlIntegration: {
                type: "boolean",
              },
              enableDataplexIntegration: {
                type: "boolean",
              },
              retainBackupsOnDelete: {
                type: "boolean",
              },
              dataDiskProvisionedIops: {
                type: "string",
              },
              dataDiskProvisionedThroughput: {
                type: "string",
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
                type: "boolean",
              },
              entraidConfig: {
                type: "object",
                additionalProperties: true,
              },
              dataApiAccess: {
                type: "string",
                enum: [
                  "DATA_API_ACCESS_UNSPECIFIED",
                  "DISALLOW_DATA_API",
                  "ALLOW_DATA_API",
                ],
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
              properties: {
                type: {
                  type: "object",
                  additionalProperties: true,
                },
                ipAddress: {
                  type: "object",
                  additionalProperties: true,
                },
                timeToRetire: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          serverCaCert: {
            type: "object",
            properties: {
              kind: {
                type: "string",
              },
              certSerialNumber: {
                type: "string",
              },
              cert: {
                type: "string",
              },
              createTime: {
                type: "string",
              },
              commonName: {
                type: "string",
              },
              expirationTime: {
                type: "string",
              },
              sha1Fingerprint: {
                type: "string",
              },
              instance: {
                type: "string",
              },
              selfLink: {
                type: "string",
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
                type: "string",
              },
              kind: {
                type: "string",
              },
              username: {
                type: "string",
              },
              password: {
                type: "string",
              },
              caCertificate: {
                type: "string",
              },
              clientCertificate: {
                type: "string",
              },
              clientKey: {
                type: "string",
              },
              dumpFilePath: {
                type: "string",
              },
              sourceInstance: {
                type: "object",
                additionalProperties: true,
              },
              selectedObjects: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              sslOption: {
                type: "string",
                enum: [
                  "SSL_OPTION_UNSPECIFIED",
                  "DISABLE",
                  "REQUIRE",
                  "VERIFY_CA",
                ],
              },
            },
            additionalProperties: true,
          },
          replicaConfiguration: {
            type: "object",
            properties: {
              kind: {
                type: "string",
              },
              mysqlReplicaConfiguration: {
                type: "object",
                additionalProperties: true,
              },
              failoverTarget: {
                type: "boolean",
              },
              cascadableReplica: {
                type: "boolean",
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
          rootPassword: {
            type: "string",
          },
          scheduledMaintenance: {
            type: "object",
            properties: {
              startTime: {
                type: "string",
              },
              canDefer: {
                type: "boolean",
              },
              canReschedule: {
                type: "boolean",
              },
              scheduleDeadlineTime: {
                type: "string",
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
                type: "string",
                enum: [
                  "SQL_OUT_OF_DISK_STATE_UNSPECIFIED",
                  "NORMAL",
                  "SOFT_SHUTDOWN",
                ],
              },
              sqlMinRecommendedIncreaseSizeGb: {
                type: "number",
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
              properties: {
                majorVersion: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                displayName: {
                  type: "object",
                  additionalProperties: true,
                },
              },
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
                type: "string",
              },
              failoverDrReplicaName: {
                type: "string",
              },
              drReplica: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          geminiConfig: {
            type: "object",
            properties: {
              entitled: {
                type: "boolean",
              },
              googleVacuumMgmtEnabled: {
                type: "boolean",
              },
              oomSessionCancelEnabled: {
                type: "boolean",
              },
              activeQueryEnabled: {
                type: "boolean",
              },
              indexAdvisorEnabled: {
                type: "boolean",
              },
              flagRecommenderEnabled: {
                type: "boolean",
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
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                gceZone: {
                  type: "object",
                  additionalProperties: true,
                },
                ipAddresses: {
                  type: "object",
                  additionalProperties: true,
                },
                dnsName: {
                  type: "object",
                  additionalProperties: true,
                },
                state: {
                  type: "object",
                  additionalProperties: true,
                },
                dnsNames: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          dnsNames: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                connectionType: {
                  type: "object",
                  additionalProperties: true,
                },
                dnsScope: {
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

export default instancesGet;
