import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesGet: AppBlock = {
  name: "Instances - Get",
  description: `Returns the specified Instance resource.`,
  category: "Instances",
  inputs: {
    default: {
      config: {
        instance: {
          name: "Instance",
          description: "Name of the instance resource to return.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        zone: {
          name: "Zone",
          description: "The name of the zone for this request.",
          type: "string",
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
            "https://www.googleapis.com/auth/compute",
            "https://www.googleapis.com/auth/compute.readonly",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        const path = `projects/{project}/zones/{zone}/instances/{instance}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
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
          id: {
            type: "string",
          },
          displayDevice: {
            type: "object",
            properties: {
              enableDisplay: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          satisfiesPzi: {
            type: "boolean",
          },
          hostname: {
            type: "string",
          },
          lastStopTimestamp: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          confidentialInstanceConfig: {
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
          sourceMachineImageEncryptionKey: {
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
          selfLink: {
            type: "string",
          },
          scheduling: {
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
          lastStartTimestamp: {
            type: "string",
          },
          instanceEncryptionKey: {
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
          params: {
            type: "object",
            properties: {
              resourceManagerTags: {
                type: "object",
                additionalProperties: true,
              },
              requestValidForDuration: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          status: {
            type: "string",
            enum: [
              "DEPROVISIONING",
              "PENDING",
              "PROVISIONING",
              "REPAIRING",
              "RUNNING",
              "STAGING",
              "STOPPED",
              "STOPPING",
              "SUSPENDED",
              "SUSPENDING",
              "TERMINATED",
            ],
          },
          metadata: {
            type: "object",
            properties: {
              items: {
                type: "array",
                items: {
                  type: "object",
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
          networkPerformanceConfig: {
            type: "object",
            properties: {
              totalEgressBandwidthTier: {
                type: "string",
                enum: ["DEFAULT", "TIER_1"],
              },
            },
            additionalProperties: true,
          },
          startRestricted: {
            type: "boolean",
          },
          zone: {
            type: "string",
          },
          fingerprint: {
            type: "string",
          },
          privateIpv6GoogleAccess: {
            type: "string",
            enum: [
              "ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE",
              "ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE",
              "INHERIT_FROM_SUBNETWORK",
            ],
          },
          disks: {
            type: "array",
            items: {
              type: "object",
              properties: {
                savedState: {
                  type: "object",
                  additionalProperties: true,
                },
                diskSizeGb: {
                  type: "object",
                  additionalProperties: true,
                },
                architecture: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                source: {
                  type: "object",
                  additionalProperties: true,
                },
                licenses: {
                  type: "object",
                  additionalProperties: true,
                },
                initializeParams: {
                  type: "object",
                  additionalProperties: true,
                },
                autoDelete: {
                  type: "object",
                  additionalProperties: true,
                },
                type: {
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
                },
                index: {
                  type: "object",
                  additionalProperties: true,
                },
                interface: {
                  type: "object",
                  additionalProperties: true,
                },
                boot: {
                  type: "object",
                  additionalProperties: true,
                },
                deviceName: {
                  type: "object",
                  additionalProperties: true,
                },
                mode: {
                  type: "object",
                  additionalProperties: true,
                },
                forceAttach: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          keyRevocationActionType: {
            type: "string",
            enum: ["KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED", "NONE", "STOP"],
          },
          minCpuPlatform: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          statusMessage: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          shieldedInstanceIntegrityPolicy: {
            type: "object",
            properties: {
              updateAutoLearnPolicy: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          lastSuspendedTimestamp: {
            type: "string",
          },
          deletionProtection: {
            type: "boolean",
          },
          machineType: {
            type: "string",
          },
          canIpForward: {
            type: "boolean",
          },
          sourceMachineImage: {
            type: "string",
          },
          cpuPlatform: {
            type: "string",
          },
          reservationAffinity: {
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
                  type: "object",
                  additionalProperties: true,
                },
              },
              key: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          serviceAccounts: {
            type: "array",
            items: {
              type: "object",
              properties: {
                scopes: {
                  type: "object",
                  additionalProperties: true,
                },
                email: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          description: {
            type: "string",
          },
          resourcePolicies: {
            type: "array",
            items: {
              type: "string",
            },
          },
          name: {
            type: "string",
          },
          guestAccelerators: {
            type: "array",
            items: {
              type: "object",
              properties: {
                acceleratorCount: {
                  type: "object",
                  additionalProperties: true,
                },
                acceleratorType: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          satisfiesPzs: {
            type: "boolean",
          },
          tags: {
            type: "object",
            properties: {
              items: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              fingerprint: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          resourceStatus: {
            type: "object",
            properties: {
              physicalHost: {
                type: "string",
              },
              physicalHostTopology: {
                type: "object",
                additionalProperties: true,
              },
              scheduling: {
                type: "object",
                additionalProperties: true,
              },
              upcomingMaintenance: {
                type: "object",
                additionalProperties: true,
              },
              effectiveInstanceMetadata: {
                type: "object",
                additionalProperties: true,
              },
              reservationConsumptionInfo: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          shieldedInstanceConfig: {
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
          advancedMachineFeatures: {
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
          networkInterfaces: {
            type: "array",
            items: {
              type: "object",
              properties: {
                network: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                ipv6AccessType: {
                  type: "object",
                  additionalProperties: true,
                },
                networkIP: {
                  type: "object",
                  additionalProperties: true,
                },
                nicType: {
                  type: "object",
                  additionalProperties: true,
                },
                igmpQuery: {
                  type: "object",
                  additionalProperties: true,
                },
                aliasIpRanges: {
                  type: "object",
                  additionalProperties: true,
                },
                networkAttachment: {
                  type: "object",
                  additionalProperties: true,
                },
                vlan: {
                  type: "object",
                  additionalProperties: true,
                },
                ipv6Address: {
                  type: "object",
                  additionalProperties: true,
                },
                queueCount: {
                  type: "object",
                  additionalProperties: true,
                },
                ipv6AccessConfigs: {
                  type: "object",
                  additionalProperties: true,
                },
                subnetwork: {
                  type: "object",
                  additionalProperties: true,
                },
                fingerprint: {
                  type: "object",
                  additionalProperties: true,
                },
                parentNicName: {
                  type: "object",
                  additionalProperties: true,
                },
                stackType: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                accessConfigs: {
                  type: "object",
                  additionalProperties: true,
                },
                internalIpv6PrefixLength: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          labelFingerprint: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default instancesGet;
