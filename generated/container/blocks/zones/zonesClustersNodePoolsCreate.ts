import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const zonesClustersNodePoolsCreate: AppBlock = {
  name: "Zones - Create",
  description: `Creates a node pool for a cluster.`,
  category: "Zones",
  inputs: {
    default: {
      config: {
        requestBody: {
          name: "Request Body",
          description:
            "CreateNodePoolRequest creates a node pool for a cluster.",
          type: {
            type: "object",
            properties: {
              parent: {
                type: "string",
              },
              clusterId: {
                type: "string",
              },
              nodePool: {
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
                    additionalProperties: true,
                  },
                  placementPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  networkConfig: {
                    type: "object",
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
                    additionalProperties: true,
                  },
                  statusMessage: {
                    type: "string",
                  },
                  instanceGroupUrls: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  name: {
                    type: "string",
                  },
                  updateInfo: {
                    type: "object",
                    additionalProperties: true,
                  },
                  management: {
                    type: "object",
                    additionalProperties: true,
                  },
                  autoscaling: {
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
                  initialNodeCount: {
                    type: "number",
                  },
                  autopilotConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  selfLink: {
                    type: "string",
                  },
                  queuedProvisioning: {
                    type: "object",
                    additionalProperties: true,
                  },
                  bestEffortProvisioning: {
                    type: "object",
                    additionalProperties: true,
                  },
                  upgradeSettings: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              projectId: {
                type: "string",
              },
              zone: {
                type: "string",
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
        const path = `v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools`;
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

export default zonesClustersNodePoolsCreate;
