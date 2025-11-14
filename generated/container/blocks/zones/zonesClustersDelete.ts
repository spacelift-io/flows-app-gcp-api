import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const zonesClustersDelete: AppBlock = {
  name: "Zones - Delete",
  description: `Deletes the cluster, including the Kubernetes endpoint and all worker nodes.`,
  category: "Zones",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "The name (project, location, cluster) of the cluster to delete. Specified in the format `projects/*/locations/*/clusters/*`.",
          type: "string",
          required: false,
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
        const path = `v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "DELETE",
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

export default zonesClustersDelete;
