import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const nodePoolsUpdate: AppBlock = {
  name: "Node Pools - Update",
  description: `Updates the version and/or image type for the specified node pool.`,
  category: "Node Pools",
  inputs: {
    default: {
      config: {
        etag: {
          name: "Etag",
          description: "The current etag of the node pool.",
          type: "string",
          required: false,
        },
        kubeletConfig: {
          name: "Kubelet Config",
          description: "Node kubelet configs.",
          type: {
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
                properties: {
                  policy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  scope: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  nodefsAvailable: {
                    type: "object",
                    additionalProperties: true,
                  },
                  imagefsAvailable: {
                    type: "object",
                    additionalProperties: true,
                  },
                  pidAvailable: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nodefsInodesFree: {
                    type: "object",
                    additionalProperties: true,
                  },
                  imagefsInodesFree: {
                    type: "object",
                    additionalProperties: true,
                  },
                  memoryAvailable: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              allowedUnsafeSysctls: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              evictionSoftGracePeriod: {
                type: "object",
                properties: {
                  imagefsAvailable: {
                    type: "object",
                    additionalProperties: true,
                  },
                  pidAvailable: {
                    type: "object",
                    additionalProperties: true,
                  },
                  memoryAvailable: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nodefsAvailable: {
                    type: "object",
                    additionalProperties: true,
                  },
                  imagefsInodesFree: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nodefsInodesFree: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  imagefsAvailable: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nodefsAvailable: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nodefsInodesFree: {
                    type: "object",
                    additionalProperties: true,
                  },
                  pidAvailable: {
                    type: "object",
                    additionalProperties: true,
                  },
                  memoryAvailable: {
                    type: "object",
                    additionalProperties: true,
                  },
                  imagefsInodesFree: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  policy: {
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
        resourceManagerTags: {
          name: "Resource Manager Tags",
          description:
            "Desired resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies.",
          type: {
            type: "object",
            properties: {
              tags: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        labels: {
          name: "Labels",
          description:
            "The desired node labels to be applied to all nodes in the node pool.",
          type: {
            type: "object",
            properties: {
              labels: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        linuxNodeConfig: {
          name: "Linux Node Config",
          description: "Parameters that can be configured on Linux nodes.",
          type: {
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
                properties: {
                  hugepageSize2m: {
                    type: "object",
                    additionalProperties: true,
                  },
                  hugepageSize1g: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  policy: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
          required: false,
        },
        maxRunDuration: {
          name: "Max Run Duration",
          description: "The maximum duration for the nodes to exist.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description:
            "The name (project, location, cluster, node pool) of the node pool to update.",
          type: "string",
          required: false,
        },
        diskSizeGb: {
          name: "Disk Size Gb",
          description: "Optional.",
          type: "string",
          required: false,
        },
        queuedProvisioning: {
          name: "Queued Provisioning",
          description: "Specifies the configuration of queued provisioning.",
          type: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        fastSocket: {
          name: "Fast Socket",
          description: "Enable or disable NCCL fast socket for the node pool.",
          type: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        accelerators: {
          name: "Accelerators",
          description:
            "A list of hardware accelerators to be attached to each node.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                acceleratorType: {
                  type: "string",
                },
                gpuSharingConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                acceleratorCount: {
                  type: "string",
                },
                gpuDriverInstallationConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                gpuPartitionSize: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        windowsNodeConfig: {
          name: "Windows Node Config",
          description: "Parameters that can be configured on Windows nodes.",
          type: {
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
          required: false,
        },
        machineType: {
          name: "Machine Type",
          description: "Optional.",
          type: "string",
          required: false,
        },
        upgradeSettings: {
          name: "Upgrade Settings",
          description:
            "Upgrade settings control disruption and speed of the upgrade.",
          type: {
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
                properties: {
                  nodePoolSoakDuration: {
                    type: "object",
                    additionalProperties: true,
                  },
                  standardRolloutPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  autoscaledRolloutPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              maxUnavailable: {
                type: "number",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        containerdConfig: {
          name: "Containerd Config",
          description:
            "The desired containerd config for nodes in the node pool.",
          type: {
            type: "object",
            properties: {
              privateRegistryAccessConfig: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  certificateAuthorityDomainConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              writableCgroups: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
          required: false,
        },
        diskType: {
          name: "Disk Type",
          description: "Optional.",
          type: "string",
          required: false,
        },
        imageType: {
          name: "Image Type",
          description: "Required.",
          type: "string",
          required: false,
        },
        flexStart: {
          name: "Flex Start",
          description: "Flex Start flag for enabling Flex Start VM.",
          type: "boolean",
          required: false,
        },
        bootDisk: {
          name: "Boot Disk",
          description:
            "The desired boot disk config for nodes in the node pool.",
          type: {
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
          required: false,
        },
        taints: {
          name: "Taints",
          description:
            "The desired node taints to be applied to all nodes in the node pool.",
          type: {
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
          required: false,
        },
        nodeNetworkConfig: {
          name: "Node Network Config",
          description: "Node network config.",
          type: {
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
                properties: {
                  disable: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              podRange: {
                type: "string",
              },
              networkPerformanceConfig: {
                type: "object",
                properties: {
                  totalEgressBandwidthTier: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  networkTier: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              podIpv4RangeUtilization: {
                type: "number",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        nodeVersion: {
          name: "Node Version",
          description: "Required.",
          type: "string",
          required: false,
        },
        storagePools: {
          name: "Storage Pools",
          description:
            "List of Storage Pools where boot disks are provisioned.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        resourceLabels: {
          name: "Resource Labels",
          description:
            "The resource labels for the node pool to use to annotate any related Google Compute Engine resources.",
          type: {
            type: "object",
            properties: {
              labels: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        gcfsConfig: {
          name: "Gcfs Config",
          description: "GCFS config.",
          type: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        gvnic: {
          name: "Gvnic",
          description: "Enable or disable gvnic on the node pool.",
          type: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        tags: {
          name: "Tags",
          description:
            "The desired network tags to be applied to all nodes in the node pool.",
          type: {
            type: "object",
            properties: {
              tags: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        locations: {
          name: "Locations",
          description:
            "The desired list of Google Compute Engine [zones](https://cloud.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        confidentialNodes: {
          name: "Confidential Nodes",
          description: "Confidential nodes config.",
          type: {
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
          required: false,
        },
        loggingConfig: {
          name: "Logging Config",
          description: "Logging configuration.",
          type: {
            type: "object",
            properties: {
              variantConfig: {
                type: "object",
                properties: {
                  variant: {
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
        workloadMetadataConfig: {
          name: "Workload Metadata Config",
          description:
            "The desired workload metadata config for the node pool.",
          type: {
            type: "object",
            properties: {
              mode: {
                type: "string",
                enum: ["MODE_UNSPECIFIED", "GCE_METADATA", "GKE_METADATA"],
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
        const baseUrl = "https://container.googleapis.com/";
        let path = `v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}/update`;

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
        requestBody.projectId = input.app.config.projectId;
        if (input.event.inputConfig.etag !== undefined)
          requestBody.etag = input.event.inputConfig.etag;
        if (input.event.inputConfig.kubeletConfig !== undefined)
          requestBody.kubeletConfig = input.event.inputConfig.kubeletConfig;
        if (input.event.inputConfig.resourceManagerTags !== undefined)
          requestBody.resourceManagerTags =
            input.event.inputConfig.resourceManagerTags;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.linuxNodeConfig !== undefined)
          requestBody.linuxNodeConfig = input.event.inputConfig.linuxNodeConfig;
        if (input.event.inputConfig.maxRunDuration !== undefined)
          requestBody.maxRunDuration = input.event.inputConfig.maxRunDuration;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.diskSizeGb !== undefined)
          requestBody.diskSizeGb = input.event.inputConfig.diskSizeGb;
        if (input.event.inputConfig.queuedProvisioning !== undefined)
          requestBody.queuedProvisioning =
            input.event.inputConfig.queuedProvisioning;
        if (input.event.inputConfig.fastSocket !== undefined)
          requestBody.fastSocket = input.event.inputConfig.fastSocket;
        if (input.event.inputConfig.accelerators !== undefined)
          requestBody.accelerators = input.event.inputConfig.accelerators;
        if (input.event.inputConfig.windowsNodeConfig !== undefined)
          requestBody.windowsNodeConfig =
            input.event.inputConfig.windowsNodeConfig;
        if (input.event.inputConfig.machineType !== undefined)
          requestBody.machineType = input.event.inputConfig.machineType;
        if (input.event.inputConfig.upgradeSettings !== undefined)
          requestBody.upgradeSettings = input.event.inputConfig.upgradeSettings;
        if (input.event.inputConfig.containerdConfig !== undefined)
          requestBody.containerdConfig =
            input.event.inputConfig.containerdConfig;
        if (input.event.inputConfig.diskType !== undefined)
          requestBody.diskType = input.event.inputConfig.diskType;
        if (input.event.inputConfig.imageType !== undefined)
          requestBody.imageType = input.event.inputConfig.imageType;
        if (input.event.inputConfig.flexStart !== undefined)
          requestBody.flexStart = input.event.inputConfig.flexStart;
        if (input.event.inputConfig.bootDisk !== undefined)
          requestBody.bootDisk = input.event.inputConfig.bootDisk;
        if (input.event.inputConfig.taints !== undefined)
          requestBody.taints = input.event.inputConfig.taints;
        if (input.event.inputConfig.nodeNetworkConfig !== undefined)
          requestBody.nodeNetworkConfig =
            input.event.inputConfig.nodeNetworkConfig;
        if (input.event.inputConfig.nodeVersion !== undefined)
          requestBody.nodeVersion = input.event.inputConfig.nodeVersion;
        if (input.event.inputConfig.storagePools !== undefined)
          requestBody.storagePools = input.event.inputConfig.storagePools;
        if (input.event.inputConfig.resourceLabels !== undefined)
          requestBody.resourceLabels = input.event.inputConfig.resourceLabels;
        if (input.event.inputConfig.gcfsConfig !== undefined)
          requestBody.gcfsConfig = input.event.inputConfig.gcfsConfig;
        if (input.event.inputConfig.gvnic !== undefined)
          requestBody.gvnic = input.event.inputConfig.gvnic;
        if (input.event.inputConfig.tags !== undefined)
          requestBody.tags = input.event.inputConfig.tags;
        if (input.event.inputConfig.locations !== undefined)
          requestBody.locations = input.event.inputConfig.locations;
        if (input.event.inputConfig.confidentialNodes !== undefined)
          requestBody.confidentialNodes =
            input.event.inputConfig.confidentialNodes;
        if (input.event.inputConfig.loggingConfig !== undefined)
          requestBody.loggingConfig = input.event.inputConfig.loggingConfig;
        if (input.event.inputConfig.workloadMetadataConfig !== undefined)
          requestBody.workloadMetadataConfig =
            input.event.inputConfig.workloadMetadataConfig;

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

export default nodePoolsUpdate;
