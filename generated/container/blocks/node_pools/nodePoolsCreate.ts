import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const nodePoolsCreate: AppBlock = {
  name: "Node Pools - Create",
  description: `Creates a node pool for a cluster.`,
  category: "Node Pools",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "The parent (project, location, cluster name) where the node pool will be created.",
          type: "string",
          required: false,
        },
        nodePool: {
          name: "Node Pool",
          description: "Required.",
          type: {
            type: "object",
            properties: {
              conditions: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              etag: {
                type: "string",
              },
              maxPodsConstraint: {
                type: "object",
                properties: {
                  maxPodsPerNode: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              placementPolicy: {
                type: "object",
                properties: {
                  tpuTopology: {
                    type: "object",
                    additionalProperties: true,
                  },
                  policyName: {
                    type: "object",
                    additionalProperties: true,
                  },
                  type: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              networkConfig: {
                type: "object",
                properties: {
                  additionalPodNetworkConfigs: {
                    type: "object",
                    additionalProperties: true,
                  },
                  createPodRange: {
                    type: "object",
                    additionalProperties: true,
                  },
                  podCidrOverprovisionConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  podRange: {
                    type: "object",
                    additionalProperties: true,
                  },
                  networkPerformanceConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  subnetwork: {
                    type: "object",
                    additionalProperties: true,
                  },
                  podIpv4CidrBlock: {
                    type: "object",
                    additionalProperties: true,
                  },
                  additionalNodeNetworkConfigs: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enablePrivateNodes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  networkTierConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  podIpv4RangeUtilization: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              status: {
                type: "string",
                enum: [
                  "STATUS_UNSPECIFIED",
                  "PROVISIONING",
                  "RUNNING",
                  "RUNNING_WITH_ERROR",
                  "RECONCILING",
                  "STOPPING",
                  "ERROR",
                ],
              },
              version: {
                type: "string",
              },
              podIpv4CidrSize: {
                type: "number",
              },
              config: {
                type: "object",
                properties: {
                  ephemeralStorageLocalSsdConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  secondaryBootDiskUpdateStrategy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  secondaryBootDisks: {
                    type: "object",
                    additionalProperties: true,
                  },
                  metadata: {
                    type: "object",
                    additionalProperties: true,
                  },
                  preemptible: {
                    type: "object",
                    additionalProperties: true,
                  },
                  localSsdEncryptionMode: {
                    type: "object",
                    additionalProperties: true,
                  },
                  resourceManagerTags: {
                    type: "object",
                    additionalProperties: true,
                  },
                  soleTenantConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  bootDisk: {
                    type: "object",
                    additionalProperties: true,
                  },
                  labels: {
                    type: "object",
                    additionalProperties: true,
                  },
                  windowsNodeConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  loggingConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  imageType: {
                    type: "object",
                    additionalProperties: true,
                  },
                  minCpuPlatform: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nodeGroup: {
                    type: "object",
                    additionalProperties: true,
                  },
                  fastSocket: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kubeletConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  linuxNodeConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  spot: {
                    type: "object",
                    additionalProperties: true,
                  },
                  advancedMachineFeatures: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sandboxConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  bootDiskKmsKey: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxRunDuration: {
                    type: "object",
                    additionalProperties: true,
                  },
                  reservationAffinity: {
                    type: "object",
                    additionalProperties: true,
                  },
                  confidentialNodes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  resourceLabels: {
                    type: "object",
                    additionalProperties: true,
                  },
                  diskType: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serviceAccount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  oauthScopes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  effectiveCgroupMode: {
                    type: "object",
                    additionalProperties: true,
                  },
                  gcfsConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  localSsdCount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  flexStart: {
                    type: "object",
                    additionalProperties: true,
                  },
                  storagePools: {
                    type: "object",
                    additionalProperties: true,
                  },
                  localNvmeSsdBlockConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  workloadMetadataConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  machineType: {
                    type: "object",
                    additionalProperties: true,
                  },
                  tags: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableConfidentialStorage: {
                    type: "object",
                    additionalProperties: true,
                  },
                  containerdConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  taints: {
                    type: "object",
                    additionalProperties: true,
                  },
                  shieldedInstanceConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  gvnic: {
                    type: "object",
                    additionalProperties: true,
                  },
                  diskSizeGb: {
                    type: "object",
                    additionalProperties: true,
                  },
                  accelerators: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              statusMessage: {
                type: "string",
              },
              instanceGroupUrls: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              name: {
                type: "string",
              },
              updateInfo: {
                type: "object",
                properties: {
                  blueGreenInfo: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              management: {
                type: "object",
                properties: {
                  autoUpgrade: {
                    type: "object",
                    additionalProperties: true,
                  },
                  upgradeOptions: {
                    type: "object",
                    additionalProperties: true,
                  },
                  autoRepair: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              autoscaling: {
                type: "object",
                properties: {
                  minNodeCount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxNodeCount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  autoprovisioned: {
                    type: "object",
                    additionalProperties: true,
                  },
                  totalMinNodeCount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  locationPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  totalMaxNodeCount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enabled: {
                    type: "object",
                    additionalProperties: true,
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
              initialNodeCount: {
                type: "number",
              },
              autopilotConfig: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              selfLink: {
                type: "string",
              },
              queuedProvisioning: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              bestEffortProvisioning: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  minProvisionNodes: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              upgradeSettings: {
                type: "object",
                properties: {
                  maxSurge: {
                    type: "object",
                    additionalProperties: true,
                  },
                  strategy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  blueGreenSettings: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxUnavailable: {
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
        let path = `v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools`;

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
        if (input.event.inputConfig.parent !== undefined)
          requestBody.parent = input.event.inputConfig.parent;
        if (input.event.inputConfig.nodePool !== undefined)
          requestBody.nodePool = input.event.inputConfig.nodePool;

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

export default nodePoolsCreate;
