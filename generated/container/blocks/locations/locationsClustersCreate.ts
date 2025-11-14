import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsClustersCreate: AppBlock = {
  name: "Locations - Create",
  description: `Creates a cluster, consisting of the specified number and type of Google Compute Engine instances.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "The parent (project and location) where the cluster will be created. Specified in the format `projects/*/locations/*`.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "CreateClusterRequest creates a cluster.",
          type: {
            type: "object",
            properties: {
              projectId: {
                type: "string",
              },
              parent: {
                type: "string",
              },
              zone: {
                type: "string",
              },
              cluster: {
                type: "object",
                properties: {
                  enableK8sBetaApis: {
                    type: "object",
                    additionalProperties: true,
                  },
                  expireTime: {
                    type: "string",
                  },
                  databaseEncryption: {
                    type: "object",
                    additionalProperties: true,
                  },
                  subnetwork: {
                    type: "string",
                  },
                  nodePoolDefaults: {
                    type: "object",
                    additionalProperties: true,
                  },
                  status: {
                    type: "string",
                    enum: [
                      "STATUS_UNSPECIFIED",
                      "PROVISIONING",
                      "RUNNING",
                      "RECONCILING",
                      "STOPPING",
                      "ERROR",
                      "DEGRADED",
                    ],
                  },
                  name: {
                    type: "string",
                  },
                  legacyAbac: {
                    type: "object",
                    additionalProperties: true,
                  },
                  shieldedNodes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nodePools: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  meshCertificates: {
                    type: "object",
                    additionalProperties: true,
                  },
                  addonsConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enterpriseConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  masterAuth: {
                    type: "object",
                    additionalProperties: true,
                  },
                  initialClusterVersion: {
                    type: "string",
                  },
                  tpuIpv4CidrBlock: {
                    type: "string",
                  },
                  labelFingerprint: {
                    type: "string",
                  },
                  verticalPodAutoscaling: {
                    type: "object",
                    additionalProperties: true,
                  },
                  releaseChannel: {
                    type: "object",
                    additionalProperties: true,
                  },
                  costManagementConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  userManagedKeysConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  satisfiesPzs: {
                    type: "boolean",
                  },
                  enableKubernetesAlpha: {
                    type: "boolean",
                  },
                  description: {
                    type: "string",
                  },
                  nodePoolAutoConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  initialNodeCount: {
                    type: "number",
                  },
                  rbacBindingConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  network: {
                    type: "string",
                  },
                  fleet: {
                    type: "object",
                    additionalProperties: true,
                  },
                  etag: {
                    type: "string",
                  },
                  podAutoscaling: {
                    type: "object",
                    additionalProperties: true,
                  },
                  monitoringService: {
                    type: "string",
                  },
                  ipAllocationPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  currentNodeCount: {
                    type: "number",
                  },
                  endpoint: {
                    type: "string",
                  },
                  secretManagerConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  workloadIdentityConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  controlPlaneEndpointsConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  defaultMaxPodsConstraint: {
                    type: "object",
                    additionalProperties: true,
                  },
                  parentProductConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  satisfiesPzi: {
                    type: "boolean",
                  },
                  servicesIpv4Cidr: {
                    type: "string",
                  },
                  networkConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maintenancePolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  masterAuthorizedNetworksConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nodeConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  locations: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  instanceGroupUrls: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  gkeAutoUpgradeConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  autopilot: {
                    type: "object",
                    additionalProperties: true,
                  },
                  networkPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nodeIpv4CidrSize: {
                    type: "number",
                  },
                  identityServiceConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  authenticatorGroupsConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  binaryAuthorization: {
                    type: "object",
                    additionalProperties: true,
                  },
                  alphaClusterFeatureGates: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  resourceUsageExportConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  privateClusterConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  statusMessage: {
                    type: "string",
                  },
                  zone: {
                    type: "string",
                  },
                  clusterIpv4Cidr: {
                    type: "string",
                  },
                  location: {
                    type: "string",
                  },
                  monitoringConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  createTime: {
                    type: "string",
                  },
                  notificationConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableTpu: {
                    type: "boolean",
                  },
                  anonymousAuthenticationConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  autoscaling: {
                    type: "object",
                    additionalProperties: true,
                  },
                  compliancePostureConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  id: {
                    type: "string",
                  },
                  currentNodeVersion: {
                    type: "string",
                  },
                  loggingService: {
                    type: "string",
                  },
                  confidentialNodes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  selfLink: {
                    type: "string",
                  },
                  resourceLabels: {
                    type: "object",
                    additionalProperties: true,
                  },
                  loggingConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  conditions: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  securityPostureConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  currentMasterVersion: {
                    type: "string",
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
        const path = `v1/{+parent}/clusters`;
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

export default locationsClustersCreate;
