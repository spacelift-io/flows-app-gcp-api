import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesInsert: AppBlock = {
  name: "Instances - Insert",
  description: `Creates an instance resource in the specified project using the data included in the request.`,
  category: "Instances",
  inputs: {
    default: {
      config: {
        zone: {
          name: "Zone",
          description:
            "[Output Only] URL of the zone where the instance resides.",
          type: "string",
          required: false,
        },
        sourceMachineImage: {
          name: "Source Machine Image",
          description: "Source machine image",
          type: "string",
          required: false,
        },
        sourceInstanceTemplate: {
          name: "Source Instance Template",
          description:
            "Specifies instance template to create the instance.\n\nThis field is optional. It can be a full or partial URL. For example, the\nfollowing are all valid URLs to an instance template:\n   \n   \n      - https://www.googleapis.com/compute/v1/projects/project/global/instanceTemplates/instanceTemplate\n      - projects/project/global/instanceTemplates/instanceTemplate\n      - global/instanceTemplates/instanceTemplate",
          type: "string",
          required: false,
        },
        requestId: {
          name: "Request ID",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
          type: "string",
          required: false,
        },
        displayDevice: {
          name: "Display Device",
          description: "Enables display device for the instance.",
          type: {
            type: "object",
            properties: {
              enableDisplay: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        satisfiesPzi: {
          name: "Satisfies Pzi",
          description: "[Output Only] Reserved for future use.",
          type: "boolean",
          required: false,
        },
        hostname: {
          name: "Hostname",
          description: "Specifies the hostname of the instance.",
          type: "string",
          required: false,
        },
        lastStopTimestamp: {
          name: "Last Stop Timestamp",
          description:
            "[Output Only] Last stop timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        labels: {
          name: "Labels",
          description: "Labels to apply to this instance.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        confidentialInstanceConfig: {
          name: "Confidential Instance Config",
          description: "Request body field: confidentialInstanceConfig",
          type: {
            type: "object",
            properties: {
              enableConfidentialCompute: {
                type: "boolean",
              },
              confidentialInstanceType: {
                type: "string",
                enum: [
                  "CONFIDENTIAL_INSTANCE_TYPE_UNSPECIFIED",
                  "SEV",
                  "SEV_SNP",
                  "TDX",
                ],
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        sourceMachineImageEncryptionKey: {
          name: "Source Machine Image Encryption Key",
          description:
            "Source machine image encryption key when creating an instance from a machine image.",
          type: {
            type: "object",
            properties: {
              rsaEncryptedKey: {
                type: "string",
              },
              rawKey: {
                type: "string",
              },
              kmsKeyServiceAccount: {
                type: "string",
              },
              sha256: {
                type: "string",
              },
              kmsKeyName: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for this resource.",
          type: "string",
          required: false,
        },
        scheduling: {
          name: "Scheduling",
          description: "Sets the scheduling options for this instance.",
          type: {
            type: "object",
            properties: {
              terminationTime: {
                type: "string",
              },
              locationHint: {
                type: "string",
              },
              onHostMaintenance: {
                type: "string",
                enum: ["MIGRATE", "TERMINATE"],
              },
              maxRunDuration: {
                type: "object",
                properties: {
                  nanos: {
                    type: "object",
                    additionalProperties: true,
                  },
                  seconds: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              hostErrorTimeoutSeconds: {
                type: "number",
              },
              instanceTerminationAction: {
                type: "string",
                enum: [
                  "DELETE",
                  "INSTANCE_TERMINATION_ACTION_UNSPECIFIED",
                  "STOP",
                ],
              },
              onInstanceStopAction: {
                type: "object",
                properties: {
                  discardLocalSsd: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              provisioningModel: {
                type: "string",
                enum: ["FLEX_START", "RESERVATION_BOUND", "SPOT", "STANDARD"],
              },
              skipGuestOsShutdown: {
                type: "boolean",
              },
              preemptible: {
                type: "boolean",
              },
              availabilityDomain: {
                type: "number",
              },
              localSsdRecoveryTimeout: {
                type: "object",
                properties: {
                  nanos: {
                    type: "object",
                    additionalProperties: true,
                  },
                  seconds: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              minNodeCpus: {
                type: "number",
              },
              nodeAffinities: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              automaticRestart: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        lastStartTimestamp: {
          name: "Last Start Timestamp",
          description:
            "[Output Only] Last start timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        instanceEncryptionKey: {
          name: "Instance Encryption Key",
          description:
            "Encrypts suspended data for an instance with acustomer-managed encryption key.",
          type: {
            type: "object",
            properties: {
              rsaEncryptedKey: {
                type: "string",
              },
              rawKey: {
                type: "string",
              },
              kmsKeyServiceAccount: {
                type: "string",
              },
              sha256: {
                type: "string",
              },
              kmsKeyName: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        params: {
          name: "Params",
          description: "Input only.",
          type: {
            type: "object",
            properties: {
              resourceManagerTags: {
                type: "object",
                additionalProperties: true,
              },
              requestValidForDuration: {
                type: "object",
                properties: {
                  nanos: {
                    type: "object",
                    additionalProperties: true,
                  },
                  seconds: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        status: {
          name: "Status",
          description: "[Output Only] The status of the instance.",
          type: "string",
          required: false,
        },
        metadata: {
          name: "Metadata",
          description:
            "The metadata key/value pairs assigned to this instance.",
          type: {
            type: "object",
            properties: {
              items: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    key: {
                      type: "object",
                      additionalProperties: true,
                    },
                    value: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              fingerprint: {
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
        networkPerformanceConfig: {
          name: "Network Performance Config",
          description: "Request body field: networkPerformanceConfig",
          type: {
            type: "object",
            properties: {
              totalEgressBandwidthTier: {
                type: "string",
                enum: ["DEFAULT", "TIER_1"],
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        startRestricted: {
          name: "Start Restricted",
          description:
            "[Output Only] Whether a VM has been restricted for start because Compute Engine has detected suspicious activity.",
          type: "boolean",
          required: false,
        },
        fingerprint: {
          name: "Fingerprint",
          description:
            "Specifies a fingerprint for this resource, which is essentially a hash of the instance's contents and used for optimistic locking.",
          type: "string",
          required: false,
        },
        privateIpv6GoogleAccess: {
          name: "Private Ipv6 Google Access",
          description: "The private IPv6 google access type for the VM.",
          type: "string",
          required: false,
        },
        disks: {
          name: "Disks",
          description: "Array of disks associated with this instance.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                savedState: {
                  type: "string",
                  enum: ["DISK_SAVED_STATE_UNSPECIFIED", "PRESERVED"],
                },
                diskSizeGb: {
                  type: "string",
                },
                architecture: {
                  type: "string",
                  enum: ["ARCHITECTURE_UNSPECIFIED", "ARM64", "X86_64"],
                },
                kind: {
                  type: "string",
                },
                source: {
                  type: "string",
                },
                licenses: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                initializeParams: {
                  type: "object",
                  additionalProperties: true,
                },
                autoDelete: {
                  type: "boolean",
                },
                type: {
                  type: "string",
                  enum: ["PERSISTENT", "SCRATCH"],
                },
                shieldedInstanceInitialState: {
                  type: "object",
                  additionalProperties: true,
                },
                diskEncryptionKey: {
                  type: "object",
                  additionalProperties: true,
                },
                guestOsFeatures: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                index: {
                  type: "number",
                },
                interface: {
                  type: "string",
                  enum: ["NVME", "SCSI"],
                },
                boot: {
                  type: "boolean",
                },
                deviceName: {
                  type: "string",
                },
                mode: {
                  type: "string",
                  enum: ["READ_ONLY", "READ_WRITE"],
                },
                forceAttach: {
                  type: "boolean",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        keyRevocationActionType: {
          name: "Key Revocation Action Type",
          description: "KeyRevocationActionType of the instance.",
          type: "string",
          required: false,
        },
        minCpuPlatform: {
          name: "Min Cpu Platform",
          description: "Specifies aminimum CPU platform for the VM instance.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of the resource.",
          type: "string",
          required: false,
        },
        statusMessage: {
          name: "Status Message",
          description:
            "[Output Only] An optional, human-readable explanation of the status.",
          type: "string",
          required: false,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] Creation timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        shieldedInstanceIntegrityPolicy: {
          name: "Shielded Instance Integrity Policy",
          description: "Request body field: shieldedInstanceIntegrityPolicy",
          type: {
            type: "object",
            properties: {
              updateAutoLearnPolicy: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        lastSuspendedTimestamp: {
          name: "Last Suspended Timestamp",
          description:
            "[Output Only] Last suspended timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        deletionProtection: {
          name: "Deletion Protection",
          description:
            "Whether the resource should be protected against deletion.",
          type: "boolean",
          required: false,
        },
        machineType: {
          name: "Machine Type",
          description:
            "Full or partial URL of the machine type resource to use for this instance, in the format:zones/zone/machineTypes/machine-type.",
          type: "string",
          required: false,
        },
        canIpForward: {
          name: "Can IP Forward",
          description:
            "Allows this instance to send and receive packets with non-matching destination or source IPs.",
          type: "boolean",
          required: false,
        },
        cpuPlatform: {
          name: "Cpu Platform",
          description: "[Output Only] The CPU platform used by this instance.",
          type: "string",
          required: false,
        },
        reservationAffinity: {
          name: "Reservation Affinity",
          description:
            "Specifies the reservations that this instance can consume from.",
          type: {
            type: "object",
            properties: {
              consumeReservationType: {
                type: "string",
                enum: [
                  "ANY_RESERVATION",
                  "NO_RESERVATION",
                  "SPECIFIC_RESERVATION",
                  "UNSPECIFIED",
                ],
              },
              values: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              key: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        serviceAccounts: {
          name: "Service Accounts",
          description:
            "A list of service accounts, with their specified scopes, authorized for this instance.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                scopes: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                email: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        resourcePolicies: {
          name: "Resource Policies",
          description: "Resource policies applied to this instance.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        name: {
          name: "Name",
          description:
            "The name of the resource, provided by the client when initially creating the resource.",
          type: "string",
          required: false,
        },
        guestAccelerators: {
          name: "Guest Accelerators",
          description:
            "A list of the type and count of accelerator cards attached to the instance.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                acceleratorCount: {
                  type: "number",
                },
                acceleratorType: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        satisfiesPzs: {
          name: "Satisfies Pzs",
          description: "[Output Only] Reserved for future use.",
          type: "boolean",
          required: false,
        },
        tags: {
          name: "Tags",
          description: "Tags to apply to this instance.",
          type: {
            type: "object",
            properties: {
              items: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              fingerprint: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        resourceStatus: {
          name: "Resource Status",
          description:
            "[Output Only] Specifies values set for instance attributes as compared to the values requested by user in the corresponding input only field.",
          type: {
            type: "object",
            properties: {
              physicalHost: {
                type: "string",
              },
              physicalHostTopology: {
                type: "object",
                properties: {
                  host: {
                    type: "object",
                    additionalProperties: true,
                  },
                  cluster: {
                    type: "object",
                    additionalProperties: true,
                  },
                  subblock: {
                    type: "object",
                    additionalProperties: true,
                  },
                  block: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              scheduling: {
                type: "object",
                properties: {
                  availabilityDomain: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              upcomingMaintenance: {
                type: "object",
                properties: {
                  latestWindowStartTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maintenanceReasons: {
                    type: "object",
                    additionalProperties: true,
                  },
                  windowEndTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maintenanceOnShutdown: {
                    type: "object",
                    additionalProperties: true,
                  },
                  canReschedule: {
                    type: "object",
                    additionalProperties: true,
                  },
                  type: {
                    type: "object",
                    additionalProperties: true,
                  },
                  windowStartTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maintenanceStatus: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              effectiveInstanceMetadata: {
                type: "object",
                properties: {
                  enableGuestAttributesMetadataValue: {
                    type: "object",
                    additionalProperties: true,
                  },
                  blockProjectSshKeysMetadataValue: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableOsloginMetadataValue: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serialPortLoggingEnableMetadataValue: {
                    type: "object",
                    additionalProperties: true,
                  },
                  vmDnsSettingMetadataValue: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableOsInventoryMetadataValue: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableOsconfigMetadataValue: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serialPortEnableMetadataValue: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              reservationConsumptionInfo: {
                type: "object",
                properties: {
                  consumedReservation: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        shieldedInstanceConfig: {
          name: "Shielded Instance Config",
          description: "Request body field: shieldedInstanceConfig",
          type: {
            type: "object",
            properties: {
              enableSecureBoot: {
                type: "boolean",
              },
              enableIntegrityMonitoring: {
                type: "boolean",
              },
              enableVtpm: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        advancedMachineFeatures: {
          name: "Advanced Machine Features",
          description:
            "Controls for advanced machine-related behavior features.",
          type: {
            type: "object",
            properties: {
              performanceMonitoringUnit: {
                type: "string",
                enum: [
                  "ARCHITECTURAL",
                  "ENHANCED",
                  "PERFORMANCE_MONITORING_UNIT_UNSPECIFIED",
                  "STANDARD",
                ],
              },
              visibleCoreCount: {
                type: "number",
              },
              threadsPerCore: {
                type: "number",
              },
              enableNestedVirtualization: {
                type: "boolean",
              },
              turboMode: {
                type: "string",
              },
              enableUefiNetworking: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        networkInterfaces: {
          name: "Network Interfaces",
          description: "An array of network configurations for this instance.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                network: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                ipv6AccessType: {
                  type: "string",
                  enum: ["EXTERNAL", "INTERNAL"],
                },
                networkIP: {
                  type: "string",
                },
                nicType: {
                  type: "string",
                  enum: [
                    "GVNIC",
                    "IDPF",
                    "IRDMA",
                    "MRDMA",
                    "UNSPECIFIED_NIC_TYPE",
                    "VIRTIO_NET",
                  ],
                },
                igmpQuery: {
                  type: "string",
                  enum: ["IGMP_QUERY_DISABLED", "IGMP_QUERY_V2"],
                },
                aliasIpRanges: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                networkAttachment: {
                  type: "string",
                },
                vlan: {
                  type: "number",
                },
                ipv6Address: {
                  type: "string",
                },
                queueCount: {
                  type: "number",
                },
                ipv6AccessConfigs: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                subnetwork: {
                  type: "string",
                },
                fingerprint: {
                  type: "string",
                },
                parentNicName: {
                  type: "string",
                },
                stackType: {
                  type: "string",
                  enum: ["IPV4_IPV6", "IPV4_ONLY", "IPV6_ONLY"],
                },
                kind: {
                  type: "string",
                },
                accessConfigs: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                internalIpv6PrefixLength: {
                  type: "number",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        labelFingerprint: {
          name: "Label Fingerprint",
          description:
            "A fingerprint for this request, which is essentially a hash of the label's contents and used for optimistic locking.",
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
              "https://www.googleapis.com/auth/compute",
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
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        let path = `projects/{project}/zones/{zone}/instances`;

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

        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.displayDevice !== undefined)
          requestBody.displayDevice = input.event.inputConfig.displayDevice;
        if (input.event.inputConfig.satisfiesPzi !== undefined)
          requestBody.satisfiesPzi = input.event.inputConfig.satisfiesPzi;
        if (input.event.inputConfig.hostname !== undefined)
          requestBody.hostname = input.event.inputConfig.hostname;
        if (input.event.inputConfig.lastStopTimestamp !== undefined)
          requestBody.lastStopTimestamp =
            input.event.inputConfig.lastStopTimestamp;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.confidentialInstanceConfig !== undefined)
          requestBody.confidentialInstanceConfig =
            input.event.inputConfig.confidentialInstanceConfig;
        if (
          input.event.inputConfig.sourceMachineImageEncryptionKey !== undefined
        )
          requestBody.sourceMachineImageEncryptionKey =
            input.event.inputConfig.sourceMachineImageEncryptionKey;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.scheduling !== undefined)
          requestBody.scheduling = input.event.inputConfig.scheduling;
        if (input.event.inputConfig.lastStartTimestamp !== undefined)
          requestBody.lastStartTimestamp =
            input.event.inputConfig.lastStartTimestamp;
        if (input.event.inputConfig.instanceEncryptionKey !== undefined)
          requestBody.instanceEncryptionKey =
            input.event.inputConfig.instanceEncryptionKey;
        if (input.event.inputConfig.params !== undefined)
          requestBody.params = input.event.inputConfig.params;
        if (input.event.inputConfig.status !== undefined)
          requestBody.status = input.event.inputConfig.status;
        if (input.event.inputConfig.metadata !== undefined)
          requestBody.metadata = input.event.inputConfig.metadata;
        if (input.event.inputConfig.networkPerformanceConfig !== undefined)
          requestBody.networkPerformanceConfig =
            input.event.inputConfig.networkPerformanceConfig;
        if (input.event.inputConfig.startRestricted !== undefined)
          requestBody.startRestricted = input.event.inputConfig.startRestricted;
        if (input.event.inputConfig.zone !== undefined)
          requestBody.zone = input.event.inputConfig.zone;
        if (input.event.inputConfig.fingerprint !== undefined)
          requestBody.fingerprint = input.event.inputConfig.fingerprint;
        if (input.event.inputConfig.privateIpv6GoogleAccess !== undefined)
          requestBody.privateIpv6GoogleAccess =
            input.event.inputConfig.privateIpv6GoogleAccess;
        if (input.event.inputConfig.disks !== undefined)
          requestBody.disks = input.event.inputConfig.disks;
        if (input.event.inputConfig.keyRevocationActionType !== undefined)
          requestBody.keyRevocationActionType =
            input.event.inputConfig.keyRevocationActionType;
        if (input.event.inputConfig.minCpuPlatform !== undefined)
          requestBody.minCpuPlatform = input.event.inputConfig.minCpuPlatform;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.statusMessage !== undefined)
          requestBody.statusMessage = input.event.inputConfig.statusMessage;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (
          input.event.inputConfig.shieldedInstanceIntegrityPolicy !== undefined
        )
          requestBody.shieldedInstanceIntegrityPolicy =
            input.event.inputConfig.shieldedInstanceIntegrityPolicy;
        if (input.event.inputConfig.lastSuspendedTimestamp !== undefined)
          requestBody.lastSuspendedTimestamp =
            input.event.inputConfig.lastSuspendedTimestamp;
        if (input.event.inputConfig.deletionProtection !== undefined)
          requestBody.deletionProtection =
            input.event.inputConfig.deletionProtection;
        if (input.event.inputConfig.machineType !== undefined)
          requestBody.machineType = input.event.inputConfig.machineType;
        if (input.event.inputConfig.canIpForward !== undefined)
          requestBody.canIpForward = input.event.inputConfig.canIpForward;
        if (input.event.inputConfig.sourceMachineImage !== undefined)
          requestBody.sourceMachineImage =
            input.event.inputConfig.sourceMachineImage;
        if (input.event.inputConfig.cpuPlatform !== undefined)
          requestBody.cpuPlatform = input.event.inputConfig.cpuPlatform;
        if (input.event.inputConfig.reservationAffinity !== undefined)
          requestBody.reservationAffinity =
            input.event.inputConfig.reservationAffinity;
        if (input.event.inputConfig.serviceAccounts !== undefined)
          requestBody.serviceAccounts = input.event.inputConfig.serviceAccounts;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.resourcePolicies !== undefined)
          requestBody.resourcePolicies =
            input.event.inputConfig.resourcePolicies;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.guestAccelerators !== undefined)
          requestBody.guestAccelerators =
            input.event.inputConfig.guestAccelerators;
        if (input.event.inputConfig.satisfiesPzs !== undefined)
          requestBody.satisfiesPzs = input.event.inputConfig.satisfiesPzs;
        if (input.event.inputConfig.tags !== undefined)
          requestBody.tags = input.event.inputConfig.tags;
        if (input.event.inputConfig.resourceStatus !== undefined)
          requestBody.resourceStatus = input.event.inputConfig.resourceStatus;
        if (input.event.inputConfig.shieldedInstanceConfig !== undefined)
          requestBody.shieldedInstanceConfig =
            input.event.inputConfig.shieldedInstanceConfig;
        if (input.event.inputConfig.advancedMachineFeatures !== undefined)
          requestBody.advancedMachineFeatures =
            input.event.inputConfig.advancedMachineFeatures;
        if (input.event.inputConfig.networkInterfaces !== undefined)
          requestBody.networkInterfaces =
            input.event.inputConfig.networkInterfaces;
        if (input.event.inputConfig.labelFingerprint !== undefined)
          requestBody.labelFingerprint =
            input.event.inputConfig.labelFingerprint;

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
          targetId: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          httpErrorMessage: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          setCommonInstanceMetadataOperationMetadata: {
            type: "object",
            properties: {
              perLocationOperations: {
                type: "object",
                additionalProperties: true,
              },
              clientOperationId: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          id: {
            type: "string",
          },
          region: {
            type: "string",
          },
          startTime: {
            type: "string",
          },
          zone: {
            type: "string",
          },
          statusMessage: {
            type: "string",
          },
          user: {
            type: "string",
          },
          warnings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                code: {
                  type: "string",
                  enum: [
                    "CLEANUP_FAILED",
                    "DEPRECATED_RESOURCE_USED",
                    "DEPRECATED_TYPE_USED",
                    "DISK_SIZE_LARGER_THAN_IMAGE_SIZE",
                    "EXPERIMENTAL_TYPE_USED",
                    "EXTERNAL_API_WARNING",
                    "FIELD_VALUE_OVERRIDEN",
                    "INJECTED_KERNELS_DEPRECATED",
                    "INVALID_HEALTH_CHECK_FOR_DYNAMIC_WIEGHTED_LB",
                    "LARGE_DEPLOYMENT_WARNING",
                    "LIST_OVERHEAD_QUOTA_EXCEED",
                    "MISSING_TYPE_DEPENDENCY",
                    "NEXT_HOP_ADDRESS_NOT_ASSIGNED",
                    "NEXT_HOP_CANNOT_IP_FORWARD",
                    "NEXT_HOP_INSTANCE_HAS_NO_IPV6_INTERFACE",
                    "NEXT_HOP_INSTANCE_NOT_FOUND",
                    "NEXT_HOP_INSTANCE_NOT_ON_NETWORK",
                    "NEXT_HOP_NOT_RUNNING",
                    "NOT_CRITICAL_ERROR",
                    "NO_RESULTS_ON_PAGE",
                    "PARTIAL_SUCCESS",
                    "QUOTA_INFO_UNAVAILABLE",
                    "REQUIRED_TOS_AGREEMENT",
                    "RESOURCE_IN_USE_BY_OTHER_RESOURCE_WARNING",
                    "RESOURCE_NOT_DELETED",
                    "SCHEMA_VALIDATION_IGNORED",
                    "SINGLE_INSTANCE_PROPERTY_TEMPLATE",
                    "UNDECLARED_PROPERTIES",
                    "UNREACHABLE",
                  ],
                },
              },
              additionalProperties: true,
            },
          },
          operationType: {
            type: "string",
          },
          targetLink: {
            type: "string",
          },
          instancesBulkInsertOperationMetadata: {
            type: "object",
            properties: {
              perLocationStatus: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          error: {
            type: "object",
            properties: {
              errors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: {
                      type: "object",
                      additionalProperties: true,
                    },
                    message: {
                      type: "object",
                      additionalProperties: true,
                    },
                    errorDetails: {
                      type: "object",
                      additionalProperties: true,
                    },
                    location: {
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
          endTime: {
            type: "string",
          },
          httpErrorStatusCode: {
            type: "number",
          },
          operationGroupId: {
            type: "string",
          },
          description: {
            type: "string",
          },
          name: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          clientOperationId: {
            type: "string",
          },
          insertTime: {
            type: "string",
          },
          status: {
            type: "string",
            enum: ["DONE", "PENDING", "RUNNING"],
          },
          progress: {
            type: "number",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default instancesInsert;
