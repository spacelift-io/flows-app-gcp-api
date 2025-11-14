import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsClustersNodePoolsGet: AppBlock = {
  name: "Locations - Get",
  description: `Retrieves the requested node pool.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "The name (project, location, cluster, node pool id) of the node pool to get. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*`.",
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
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://container.googleapis.com/";
        const path = `v1/{+name}`;
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
          conditions: {
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
          etag: {
            type: "string",
          },
          maxPodsConstraint: {
            type: "object",
            properties: {
              maxPodsPerNode: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          placementPolicy: {
            type: "object",
            properties: {
              tpuTopology: {
                type: "string",
              },
              policyName: {
                type: "string",
              },
              type: {
                type: "string",
                enum: ["TYPE_UNSPECIFIED", "COMPACT"],
              },
            },
            additionalProperties: true,
          },
          networkConfig: {
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
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              metadata: {
                type: "object",
                additionalProperties: true,
              },
              preemptible: {
                type: "boolean",
              },
              localSsdEncryptionMode: {
                type: "string",
                enum: [
                  "LOCAL_SSD_ENCRYPTION_MODE_UNSPECIFIED",
                  "STANDARD_ENCRYPTION",
                  "EPHEMERAL_KEY_ENCRYPTION",
                ],
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
                type: "string",
              },
              minCpuPlatform: {
                type: "string",
              },
              nodeGroup: {
                type: "string",
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
                type: "boolean",
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
                type: "string",
              },
              maxRunDuration: {
                type: "string",
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
                type: "string",
              },
              serviceAccount: {
                type: "string",
              },
              oauthScopes: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              effectiveCgroupMode: {
                type: "string",
                enum: [
                  "EFFECTIVE_CGROUP_MODE_UNSPECIFIED",
                  "EFFECTIVE_CGROUP_MODE_V1",
                  "EFFECTIVE_CGROUP_MODE_V2",
                ],
              },
              gcfsConfig: {
                type: "object",
                additionalProperties: true,
              },
              localSsdCount: {
                type: "number",
              },
              flexStart: {
                type: "boolean",
              },
              storagePools: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
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
                type: "string",
              },
              tags: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              enableConfidentialStorage: {
                type: "boolean",
              },
              containerdConfig: {
                type: "object",
                additionalProperties: true,
              },
              taints: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
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
                type: "number",
              },
              accelerators: {
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
                type: "boolean",
              },
              upgradeOptions: {
                type: "object",
                additionalProperties: true,
              },
              autoRepair: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          autoscaling: {
            type: "object",
            properties: {
              minNodeCount: {
                type: "number",
              },
              maxNodeCount: {
                type: "number",
              },
              autoprovisioned: {
                type: "boolean",
              },
              totalMinNodeCount: {
                type: "number",
              },
              locationPolicy: {
                type: "string",
                enum: ["LOCATION_POLICY_UNSPECIFIED", "BALANCED", "ANY"],
              },
              totalMaxNodeCount: {
                type: "number",
              },
              enabled: {
                type: "boolean",
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
                type: "boolean",
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
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          bestEffortProvisioning: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
              minProvisionNodes: {
                type: "number",
              },
            },
            additionalProperties: true,
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
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsClustersNodePoolsGet;
