import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesPatch: AppBlock = {
  name: "Instances - Patch",
  description: `Partially updates settings of a Cloud SQL instance by merging the request with the current configuration.`,
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
        kind: {
          name: "Kind",
          description: "This is always 'sql#instance'.",
          type: "string",
          required: false,
        },
        state: {
          name: "State",
          description: "The current serving state of the Cloud SQL instance.",
          type: "string",
          required: false,
        },
        databaseVersion: {
          name: "Database Version",
          description: "The database engine type and version.",
          type: "string",
          required: false,
        },
        settings: {
          name: "Settings",
          description: "The user settings.",
          type: {
            type: "object",
            properties: {
              settingsVersion: {
                type: "string",
              },
              authorizedGaeApplications: {
                type: "array",
                items: {
                  type: "string",
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
                properties: {
                  ipv4Enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  privateNetwork: {
                    type: "object",
                    additionalProperties: true,
                  },
                  requireSsl: {
                    type: "object",
                    additionalProperties: true,
                  },
                  authorizedNetworks: {
                    type: "object",
                    additionalProperties: true,
                  },
                  allocatedIpRange: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enablePrivatePathForGoogleCloudServices: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sslMode: {
                    type: "object",
                    additionalProperties: true,
                  },
                  pscConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serverCaMode: {
                    type: "object",
                    additionalProperties: true,
                  },
                  customSubjectAlternativeNames: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serverCaPool: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serverCertificateRotationMode: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              storageAutoResize: {
                type: "boolean",
              },
              locationPreference: {
                type: "object",
                properties: {
                  followGaeApplication: {
                    type: "object",
                    additionalProperties: true,
                  },
                  zone: {
                    type: "object",
                    additionalProperties: true,
                  },
                  secondaryZone: {
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
                properties: {
                  hour: {
                    type: "object",
                    additionalProperties: true,
                  },
                  day: {
                    type: "object",
                    additionalProperties: true,
                  },
                  updateTrack: {
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
              backupConfiguration: {
                type: "object",
                properties: {
                  startTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                  binaryLogEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  replicationLogArchivingEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  location: {
                    type: "object",
                    additionalProperties: true,
                  },
                  pointInTimeRecoveryEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  backupRetentionSettings: {
                    type: "object",
                    additionalProperties: true,
                  },
                  transactionLogRetentionDays: {
                    type: "object",
                    additionalProperties: true,
                  },
                  transactionalLogStorageState: {
                    type: "object",
                    additionalProperties: true,
                  },
                  backupTier: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                  domain: {
                    type: "object",
                    additionalProperties: true,
                  },
                  mode: {
                    type: "object",
                    additionalProperties: true,
                  },
                  dnsServers: {
                    type: "object",
                    additionalProperties: true,
                  },
                  adminCredentialSecretName: {
                    type: "object",
                    additionalProperties: true,
                  },
                  organizationalUnit: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  queryInsightsEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  recordClientAddress: {
                    type: "object",
                    additionalProperties: true,
                  },
                  recordApplicationTags: {
                    type: "object",
                    additionalProperties: true,
                  },
                  queryStringLength: {
                    type: "object",
                    additionalProperties: true,
                  },
                  queryPlansPerMinute: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              passwordValidationPolicy: {
                type: "object",
                properties: {
                  minLength: {
                    type: "object",
                    additionalProperties: true,
                  },
                  complexity: {
                    type: "object",
                    additionalProperties: true,
                  },
                  reuseInterval: {
                    type: "object",
                    additionalProperties: true,
                  },
                  disallowUsernameSubstring: {
                    type: "object",
                    additionalProperties: true,
                  },
                  passwordChangeInterval: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enablePasswordPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  disallowCompromisedCredentials: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              sqlServerAuditConfig: {
                type: "object",
                properties: {
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                  bucket: {
                    type: "object",
                    additionalProperties: true,
                  },
                  retentionInterval: {
                    type: "object",
                    additionalProperties: true,
                  },
                  uploadInterval: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  threadsPerCore: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              dataCacheConfig: {
                type: "object",
                properties: {
                  dataCacheEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  connectionPoolingEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  flags: {
                    type: "object",
                    additionalProperties: true,
                  },
                  poolerCount: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              finalBackupConfig: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  retentionDays: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              readPoolAutoScaleConfig: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  minNodeCount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxNodeCount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  targetMetrics: {
                    type: "object",
                    additionalProperties: true,
                  },
                  disableScaleIn: {
                    type: "object",
                    additionalProperties: true,
                  },
                  scaleInCooldownSeconds: {
                    type: "object",
                    additionalProperties: true,
                  },
                  scaleOutCooldownSeconds: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              autoUpgradeEnabled: {
                type: "boolean",
              },
              entraidConfig: {
                type: "object",
                properties: {
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                  tenantId: {
                    type: "object",
                    additionalProperties: true,
                  },
                  applicationId: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
          required: false,
        },
        failoverReplica: {
          name: "Failover Replica",
          description: "The name and status of the failover replica.",
          type: {
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
          required: false,
        },
        masterInstanceName: {
          name: "Master Instance Name",
          description:
            "The name of the instance which will act as primary in the replication setup.",
          type: "string",
          required: false,
        },
        replicaNames: {
          name: "Replica Names",
          description: "The replicas of the instance.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        maxDiskSize: {
          name: "Max Disk Size",
          description: "The maximum disk size of the instance in bytes.",
          type: "string",
          required: false,
        },
        ipAddresses: {
          name: "IP Addresses",
          description: "The assigned IP addresses for the instance.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: [
                    "SQL_IP_ADDRESS_TYPE_UNSPECIFIED",
                    "PRIMARY",
                    "OUTGOING",
                    "PRIVATE",
                    "MIGRATED_1ST_GEN",
                  ],
                },
                ipAddress: {
                  type: "string",
                },
                timeToRetire: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        serverCaCert: {
          name: "Server CA Cert",
          description: "SSL configuration.",
          type: {
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
          required: false,
        },
        instanceType: {
          name: "Instance Type",
          description: "The instance type.",
          type: "string",
          required: false,
        },
        serviceAccountEmailAddress: {
          name: "Service Account Email Address",
          description:
            "The service account email address assigned to the instance.",
          type: "string",
          required: false,
        },
        onPremisesConfiguration: {
          name: "On Premises Configuration",
          description: "Configuration specific to on-premises instances.",
          type: {
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
                properties: {
                  name: {
                    type: "object",
                    additionalProperties: true,
                  },
                  region: {
                    type: "object",
                    additionalProperties: true,
                  },
                  project: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
          required: false,
        },
        replicaConfiguration: {
          name: "Replica Configuration",
          description:
            "Configuration specific to failover replicas and read replicas.",
          type: {
            type: "object",
            properties: {
              kind: {
                type: "string",
              },
              mysqlReplicaConfiguration: {
                type: "object",
                properties: {
                  dumpFilePath: {
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
                  connectRetryInterval: {
                    type: "object",
                    additionalProperties: true,
                  },
                  masterHeartbeatPeriod: {
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
                  sslCipher: {
                    type: "object",
                    additionalProperties: true,
                  },
                  verifyServerCertificate: {
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
              failoverTarget: {
                type: "boolean",
              },
              cascadableReplica: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        backendType: {
          name: "Backend Type",
          description: "The backend type.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "The URI of this resource.",
          type: "string",
          required: false,
        },
        suspensionReason: {
          name: "Suspension Reason",
          description:
            "If the instance state is SUSPENDED, the reason for the suspension.",
          type: {
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
          required: false,
        },
        connectionName: {
          name: "Connection Name",
          description:
            "Connection name of the Cloud SQL instance used in connection strings.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "Name of the Cloud SQL instance.",
          type: "string",
          required: false,
        },
        region: {
          name: "Region",
          description: "The geographical region of the Cloud SQL instance.",
          type: "string",
          required: false,
        },
        gceZone: {
          name: "Gce Zone",
          description:
            "The Compute Engine zone that the instance is currently serving from.",
          type: "string",
          required: false,
        },
        secondaryGceZone: {
          name: "Secondary Gce Zone",
          description:
            "The Compute Engine zone that the failover instance is currently serving from for a regional instance.",
          type: "string",
          required: false,
        },
        diskEncryptionConfiguration: {
          name: "Disk Encryption Configuration",
          description: "Disk encryption configuration specific to an instance.",
          type: {
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
          required: false,
        },
        diskEncryptionStatus: {
          name: "Disk Encryption Status",
          description: "Disk encryption status specific to an instance.",
          type: {
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
          required: false,
        },
        rootPassword: {
          name: "Root Password",
          description: "Initial root password.",
          type: "string",
          required: false,
        },
        scheduledMaintenance: {
          name: "Scheduled Maintenance",
          description:
            "The start time of any upcoming scheduled maintenance for this instance.",
          type: {
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
          required: false,
        },
        satisfiesPzs: {
          name: "Satisfies Pzs",
          description:
            "This status indicates whether the instance satisfies PZS.",
          type: "boolean",
          required: false,
        },
        databaseInstalledVersion: {
          name: "Database Installed Version",
          description: "Output only.",
          type: "string",
          required: false,
        },
        outOfDiskReport: {
          name: "Out Of Disk Report",
          description:
            "This field represents the report generated by the proactive database wellness job for OutOfDisk issues.",
          type: {
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
          required: false,
        },
        createTime: {
          name: "Create Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        availableMaintenanceVersions: {
          name: "Available Maintenance Versions",
          description: "Output only.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        maintenanceVersion: {
          name: "Maintenance Version",
          description: "The current software version on the instance.",
          type: "string",
          required: false,
        },
        upgradableDatabaseVersions: {
          name: "Upgradable Database Versions",
          description: "Output only.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                majorVersion: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                displayName: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        sqlNetworkArchitecture: {
          name: "SQL Network Architecture",
          description: "Request body field: sqlNetworkArchitecture",
          type: "string",
          required: false,
        },
        pscServiceAttachmentLink: {
          name: "Psc Service Attachment Link",
          description: "Output only.",
          type: "string",
          required: false,
        },
        dnsName: {
          name: "DNS Name",
          description: "Output only.",
          type: "string",
          required: false,
        },
        writeEndpoint: {
          name: "Write Endpoint",
          description: "Output only.",
          type: "string",
          required: false,
        },
        replicationCluster: {
          name: "Replication Cluster",
          description: "Optional.",
          type: {
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
          required: false,
        },
        geminiConfig: {
          name: "Gemini Config",
          description: "Gemini instance configuration.",
          type: {
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
          required: false,
        },
        satisfiesPzi: {
          name: "Satisfies Pzi",
          description: "Output only.",
          type: "boolean",
          required: false,
        },
        switchTransactionLogsToCloudStorageEnabled: {
          name: "Switch Transaction Logs To Cloud Storage Enabled",
          description: "Input only.",
          type: "boolean",
          required: false,
        },
        includeReplicasForMajorVersionUpgrade: {
          name: "Include Replicas For Major Version Upgrade",
          description: "Input only.",
          type: "boolean",
          required: false,
        },
        tags: {
          name: "Tags",
          description: "Optional.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        nodeCount: {
          name: "Node Count",
          description: "The number of read pool nodes in a read pool.",
          type: "number",
          required: false,
        },
        nodes: {
          name: "Nodes",
          description: "Output only.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                gceZone: {
                  type: "string",
                },
                ipAddresses: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                dnsName: {
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
          },
          required: false,
        },
        dnsNames: {
          name: "DNS Names",
          description: "Output only.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                connectionType: {
                  type: "string",
                  enum: [
                    "CONNECTION_TYPE_UNSPECIFIED",
                    "PUBLIC",
                    "PRIVATE_SERVICES_ACCESS",
                    "PRIVATE_SERVICE_CONNECT",
                  ],
                },
                dnsScope: {
                  type: "string",
                  enum: ["DNS_SCOPE_UNSPECIFIED", "INSTANCE"],
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
        let path = `v1/projects/{project}/instances/{instance}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};
        requestBody.projectId = input.app.config.projectId;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.state !== undefined)
          requestBody.state = input.event.inputConfig.state;
        if (input.event.inputConfig.databaseVersion !== undefined)
          requestBody.databaseVersion = input.event.inputConfig.databaseVersion;
        if (input.event.inputConfig.settings !== undefined)
          requestBody.settings = input.event.inputConfig.settings;
        if (input.event.inputConfig.failoverReplica !== undefined)
          requestBody.failoverReplica = input.event.inputConfig.failoverReplica;
        if (input.event.inputConfig.masterInstanceName !== undefined)
          requestBody.masterInstanceName =
            input.event.inputConfig.masterInstanceName;
        if (input.event.inputConfig.replicaNames !== undefined)
          requestBody.replicaNames = input.event.inputConfig.replicaNames;
        if (input.event.inputConfig.maxDiskSize !== undefined)
          requestBody.maxDiskSize = input.event.inputConfig.maxDiskSize;
        if (input.event.inputConfig.ipAddresses !== undefined)
          requestBody.ipAddresses = input.event.inputConfig.ipAddresses;
        if (input.event.inputConfig.serverCaCert !== undefined)
          requestBody.serverCaCert = input.event.inputConfig.serverCaCert;
        if (input.event.inputConfig.instanceType !== undefined)
          requestBody.instanceType = input.event.inputConfig.instanceType;
        if (input.event.inputConfig.serviceAccountEmailAddress !== undefined)
          requestBody.serviceAccountEmailAddress =
            input.event.inputConfig.serviceAccountEmailAddress;
        if (input.event.inputConfig.onPremisesConfiguration !== undefined)
          requestBody.onPremisesConfiguration =
            input.event.inputConfig.onPremisesConfiguration;
        if (input.event.inputConfig.replicaConfiguration !== undefined)
          requestBody.replicaConfiguration =
            input.event.inputConfig.replicaConfiguration;
        if (input.event.inputConfig.backendType !== undefined)
          requestBody.backendType = input.event.inputConfig.backendType;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.suspensionReason !== undefined)
          requestBody.suspensionReason =
            input.event.inputConfig.suspensionReason;
        if (input.event.inputConfig.connectionName !== undefined)
          requestBody.connectionName = input.event.inputConfig.connectionName;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (input.event.inputConfig.gceZone !== undefined)
          requestBody.gceZone = input.event.inputConfig.gceZone;
        if (input.event.inputConfig.secondaryGceZone !== undefined)
          requestBody.secondaryGceZone =
            input.event.inputConfig.secondaryGceZone;
        if (input.event.inputConfig.diskEncryptionConfiguration !== undefined)
          requestBody.diskEncryptionConfiguration =
            input.event.inputConfig.diskEncryptionConfiguration;
        if (input.event.inputConfig.diskEncryptionStatus !== undefined)
          requestBody.diskEncryptionStatus =
            input.event.inputConfig.diskEncryptionStatus;
        if (input.event.inputConfig.rootPassword !== undefined)
          requestBody.rootPassword = input.event.inputConfig.rootPassword;
        if (input.event.inputConfig.scheduledMaintenance !== undefined)
          requestBody.scheduledMaintenance =
            input.event.inputConfig.scheduledMaintenance;
        if (input.event.inputConfig.satisfiesPzs !== undefined)
          requestBody.satisfiesPzs = input.event.inputConfig.satisfiesPzs;
        if (input.event.inputConfig.databaseInstalledVersion !== undefined)
          requestBody.databaseInstalledVersion =
            input.event.inputConfig.databaseInstalledVersion;
        if (input.event.inputConfig.outOfDiskReport !== undefined)
          requestBody.outOfDiskReport = input.event.inputConfig.outOfDiskReport;
        if (input.event.inputConfig.createTime !== undefined)
          requestBody.createTime = input.event.inputConfig.createTime;
        if (input.event.inputConfig.availableMaintenanceVersions !== undefined)
          requestBody.availableMaintenanceVersions =
            input.event.inputConfig.availableMaintenanceVersions;
        if (input.event.inputConfig.maintenanceVersion !== undefined)
          requestBody.maintenanceVersion =
            input.event.inputConfig.maintenanceVersion;
        if (input.event.inputConfig.upgradableDatabaseVersions !== undefined)
          requestBody.upgradableDatabaseVersions =
            input.event.inputConfig.upgradableDatabaseVersions;
        if (input.event.inputConfig.sqlNetworkArchitecture !== undefined)
          requestBody.sqlNetworkArchitecture =
            input.event.inputConfig.sqlNetworkArchitecture;
        if (input.event.inputConfig.pscServiceAttachmentLink !== undefined)
          requestBody.pscServiceAttachmentLink =
            input.event.inputConfig.pscServiceAttachmentLink;
        if (input.event.inputConfig.dnsName !== undefined)
          requestBody.dnsName = input.event.inputConfig.dnsName;
        if (input.event.inputConfig.writeEndpoint !== undefined)
          requestBody.writeEndpoint = input.event.inputConfig.writeEndpoint;
        if (input.event.inputConfig.replicationCluster !== undefined)
          requestBody.replicationCluster =
            input.event.inputConfig.replicationCluster;
        if (input.event.inputConfig.geminiConfig !== undefined)
          requestBody.geminiConfig = input.event.inputConfig.geminiConfig;
        if (input.event.inputConfig.satisfiesPzi !== undefined)
          requestBody.satisfiesPzi = input.event.inputConfig.satisfiesPzi;
        if (
          input.event.inputConfig.switchTransactionLogsToCloudStorageEnabled !==
          undefined
        )
          requestBody.switchTransactionLogsToCloudStorageEnabled =
            input.event.inputConfig.switchTransactionLogsToCloudStorageEnabled;
        if (
          input.event.inputConfig.includeReplicasForMajorVersionUpgrade !==
          undefined
        )
          requestBody.includeReplicasForMajorVersionUpgrade =
            input.event.inputConfig.includeReplicasForMajorVersionUpgrade;
        if (input.event.inputConfig.tags !== undefined)
          requestBody.tags = input.event.inputConfig.tags;
        if (input.event.inputConfig.nodeCount !== undefined)
          requestBody.nodeCount = input.event.inputConfig.nodeCount;
        if (input.event.inputConfig.nodes !== undefined)
          requestBody.nodes = input.event.inputConfig.nodes;
        if (input.event.inputConfig.dnsNames !== undefined)
          requestBody.dnsNames = input.event.inputConfig.dnsNames;

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

export default instancesPatch;
