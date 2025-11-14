import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const zonesClustersNodePoolsUpdate: AppBlock = {
  name: "Zones - Update",
  description: `Updates the version and/or image type for the specified node pool.`,
  category: "Zones",
  inputs: {
    default: {
      config: {
        requestBody: {
          name: "Request Body",
          description:
            "UpdateNodePoolRequests update a node pool's image and/or version.",
          type: {
            type: "object",
            properties: {
              clusterId: {
                type: "string",
              },
              etag: {
                type: "string",
              },
              kubeletConfig: {
                type: "object",
                properties: {
                  imageGcLowThresholdPercent: {
                    type: "number",
                  },
                  containerLogMaxSize: {
                    type: "string",
                  },
                  cpuCfsQuotaPeriod: {
                    type: "string",
                  },
                  containerLogMaxFiles: {
                    type: "number",
                  },
                  insecureKubeletReadonlyPortEnabled: {
                    type: "boolean",
                  },
                  topologyManager: {
                    type: "object",
                    additionalProperties: true,
                  },
                  evictionMaxPodGracePeriodSeconds: {
                    type: "number",
                  },
                  maxParallelImagePulls: {
                    type: "number",
                  },
                  evictionMinimumReclaim: {
                    type: "object",
                    additionalProperties: true,
                  },
                  allowedUnsafeSysctls: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  evictionSoftGracePeriod: {
                    type: "object",
                    additionalProperties: true,
                  },
                  podPidsLimit: {
                    type: "string",
                  },
                  imageMaximumGcAge: {
                    type: "string",
                  },
                  imageGcHighThresholdPercent: {
                    type: "number",
                  },
                  cpuCfsQuota: {
                    type: "boolean",
                  },
                  evictionSoft: {
                    type: "object",
                    additionalProperties: true,
                  },
                  singleProcessOomKill: {
                    type: "boolean",
                  },
                  imageMinimumGcAge: {
                    type: "string",
                  },
                  cpuManagerPolicy: {
                    type: "string",
                  },
                  memoryManager: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              zone: {
                type: "string",
              },
              projectId: {
                type: "string",
              },
              resourceManagerTags: {
                type: "object",
                properties: {
                  tags: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              labels: {
                type: "object",
                properties: {
                  labels: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              linuxNodeConfig: {
                type: "object",
                properties: {
                  transparentHugepageDefrag: {
                    type: "string",
                    enum: [
                      "TRANSPARENT_HUGEPAGE_DEFRAG_UNSPECIFIED",
                      "TRANSPARENT_HUGEPAGE_DEFRAG_ALWAYS",
                      "TRANSPARENT_HUGEPAGE_DEFRAG_DEFER",
                      "TRANSPARENT_HUGEPAGE_DEFRAG_DEFER_WITH_MADVISE",
                      "TRANSPARENT_HUGEPAGE_DEFRAG_MADVISE",
                      "TRANSPARENT_HUGEPAGE_DEFRAG_NEVER",
                    ],
                  },
                  hugepages: {
                    type: "object",
                    additionalProperties: true,
                  },
                  cgroupMode: {
                    type: "string",
                    enum: [
                      "CGROUP_MODE_UNSPECIFIED",
                      "CGROUP_MODE_V1",
                      "CGROUP_MODE_V2",
                    ],
                  },
                  nodeKernelModuleLoading: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sysctls: {
                    type: "object",
                    additionalProperties: true,
                  },
                  transparentHugepageEnabled: {
                    type: "string",
                    enum: [
                      "TRANSPARENT_HUGEPAGE_ENABLED_UNSPECIFIED",
                      "TRANSPARENT_HUGEPAGE_ENABLED_ALWAYS",
                      "TRANSPARENT_HUGEPAGE_ENABLED_MADVISE",
                      "TRANSPARENT_HUGEPAGE_ENABLED_NEVER",
                    ],
                  },
                },
                additionalProperties: true,
              },
              maxRunDuration: {
                type: "string",
              },
              name: {
                type: "string",
              },
              diskSizeGb: {
                type: "string",
              },
              queuedProvisioning: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                },
                additionalProperties: true,
              },
              fastSocket: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                },
                additionalProperties: true,
              },
              accelerators: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    acceleratorType: {
                      type: "object",
                      additionalProperties: true,
                    },
                    gpuSharingConfig: {
                      type: "object",
                      additionalProperties: true,
                    },
                    acceleratorCount: {
                      type: "object",
                      additionalProperties: true,
                    },
                    gpuDriverInstallationConfig: {
                      type: "object",
                      additionalProperties: true,
                    },
                    gpuPartitionSize: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              windowsNodeConfig: {
                type: "object",
                properties: {
                  osVersion: {
                    type: "string",
                    enum: [
                      "OS_VERSION_UNSPECIFIED",
                      "OS_VERSION_LTSC2019",
                      "OS_VERSION_LTSC2022",
                    ],
                  },
                },
                additionalProperties: true,
              },
              machineType: {
                type: "string",
              },
              upgradeSettings: {
                type: "object",
                properties: {
                  maxSurge: {
                    type: "number",
                  },
                  strategy: {
                    type: "string",
                    enum: [
                      "NODE_POOL_UPDATE_STRATEGY_UNSPECIFIED",
                      "BLUE_GREEN",
                      "SURGE",
                    ],
                  },
                  blueGreenSettings: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxUnavailable: {
                    type: "number",
                  },
                },
                additionalProperties: true,
              },
              containerdConfig: {
                type: "object",
                properties: {
                  privateRegistryAccessConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  writableCgroups: {
                    type: "object",
                    additionalProperties: true,
                  },
                  registryHosts: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
                additionalProperties: true,
              },
              diskType: {
                type: "string",
              },
              nodePoolId: {
                type: "string",
              },
              imageType: {
                type: "string",
              },
              flexStart: {
                type: "boolean",
              },
              bootDisk: {
                type: "object",
                properties: {
                  provisionedIops: {
                    type: "string",
                  },
                  diskType: {
                    type: "string",
                  },
                  sizeGb: {
                    type: "string",
                  },
                  provisionedThroughput: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              taints: {
                type: "object",
                properties: {
                  taints: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
                additionalProperties: true,
              },
              nodeNetworkConfig: {
                type: "object",
                properties: {
                  additionalPodNetworkConfigs: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  createPodRange: {
                    type: "boolean",
                  },
                  podCidrOverprovisionConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  podRange: {
                    type: "string",
                  },
                  networkPerformanceConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  subnetwork: {
                    type: "string",
                  },
                  podIpv4CidrBlock: {
                    type: "string",
                  },
                  additionalNodeNetworkConfigs: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  enablePrivateNodes: {
                    type: "boolean",
                  },
                  networkTierConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  podIpv4RangeUtilization: {
                    type: "number",
                  },
                },
                additionalProperties: true,
              },
              nodeVersion: {
                type: "string",
              },
              storagePools: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              resourceLabels: {
                type: "object",
                properties: {
                  labels: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              gcfsConfig: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                },
                additionalProperties: true,
              },
              gvnic: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                },
                additionalProperties: true,
              },
              tags: {
                type: "object",
                properties: {
                  tags: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
                additionalProperties: true,
              },
              locations: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              confidentialNodes: {
                type: "object",
                properties: {
                  enabled: {
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
              loggingConfig: {
                type: "object",
                properties: {
                  variantConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              workloadMetadataConfig: {
                type: "object",
                properties: {
                  mode: {
                    type: "string",
                    enum: ["MODE_UNSPECIFIED", "GCE_METADATA", "GKE_METADATA"],
                  },
                },
                additionalProperties: true,
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
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://container.googleapis.com/";
        const path = `v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}/update`;
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
          startTime: {
            type: "string",
          },
          clusterConditions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                message: {
                  type: "object",
                  additionalProperties: true,
                },
                code: {
                  type: "object",
                  additionalProperties: true,
                },
                canonicalCode: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          location: {
            type: "string",
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "number",
              },
              message: {
                type: "string",
              },
              details: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          name: {
            type: "string",
          },
          progress: {
            type: "object",
            properties: {
              stages: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              name: {
                type: "string",
              },
              status: {
                type: "string",
                enum: [
                  "STATUS_UNSPECIFIED",
                  "PENDING",
                  "RUNNING",
                  "DONE",
                  "ABORTING",
                ],
              },
              metrics: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          statusMessage: {
            type: "string",
          },
          nodepoolConditions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                message: {
                  type: "object",
                  additionalProperties: true,
                },
                code: {
                  type: "object",
                  additionalProperties: true,
                },
                canonicalCode: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          selfLink: {
            type: "string",
          },
          status: {
            type: "string",
            enum: [
              "STATUS_UNSPECIFIED",
              "PENDING",
              "RUNNING",
              "DONE",
              "ABORTING",
            ],
          },
          zone: {
            type: "string",
          },
          endTime: {
            type: "string",
          },
          operationType: {
            type: "string",
            enum: [
              "TYPE_UNSPECIFIED",
              "CREATE_CLUSTER",
              "DELETE_CLUSTER",
              "UPGRADE_MASTER",
              "UPGRADE_NODES",
              "REPAIR_CLUSTER",
              "UPDATE_CLUSTER",
              "CREATE_NODE_POOL",
              "DELETE_NODE_POOL",
              "SET_NODE_POOL_MANAGEMENT",
              "AUTO_REPAIR_NODES",
              "AUTO_UPGRADE_NODES",
              "SET_LABELS",
              "SET_MASTER_AUTH",
              "SET_NODE_POOL_SIZE",
              "SET_NETWORK_POLICY",
              "SET_MAINTENANCE_POLICY",
              "RESIZE_CLUSTER",
              "FLEET_FEATURE_UPGRADE",
            ],
          },
          targetLink: {
            type: "string",
          },
          detail: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default zonesClustersNodePoolsUpdate;
