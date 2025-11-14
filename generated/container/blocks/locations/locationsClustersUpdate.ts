import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsClustersUpdate: AppBlock = {
  name: "Locations - Update",
  description: `Updates the settings of a specific cluster.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "The name (project, location, cluster) of the cluster to update. Specified in the format `projects/*/locations/*/clusters/*`.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "UpdateClusterRequest updates the settings of a cluster.",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              update: {
                type: "object",
                properties: {
                  desiredParentProductConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredK8sBetaApis: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredSecretManagerConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredDatapathProvider: {
                    type: "string",
                    enum: [
                      "DATAPATH_PROVIDER_UNSPECIFIED",
                      "LEGACY_DATAPATH",
                      "ADVANCED_DATAPATH",
                    ],
                  },
                  desiredCostManagementConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredLoggingConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredNetworkTierConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredAdditionalIpRangesConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredIdentityServiceConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredDefaultSnatStatus: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredContainerdConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredMeshCertificates: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredNodePoolId: {
                    type: "string",
                  },
                  desiredWorkloadIdentityConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredPrivateIpv6GoogleAccess: {
                    type: "string",
                    enum: [
                      "PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED",
                      "PRIVATE_IPV6_GOOGLE_ACCESS_DISABLED",
                      "PRIVATE_IPV6_GOOGLE_ACCESS_TO_GOOGLE",
                      "PRIVATE_IPV6_GOOGLE_ACCESS_BIDIRECTIONAL",
                    ],
                  },
                  desiredImageType: {
                    type: "string",
                  },
                  gkeAutoUpgradeConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredNodePoolAutoConfigKubeletConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredLocations: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  desiredRbacBindingConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredMonitoringConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredClusterAutoscaling: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredNodeVersion: {
                    type: "string",
                  },
                  desiredFleet: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredUserManagedKeysConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredIntraNodeVisibilityConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredPrivilegedAdmissionConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredDefaultEnablePrivateNodes: {
                    type: "boolean",
                  },
                  desiredPrivateClusterConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredNodePoolAutoConfigNetworkTags: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredControlPlaneEndpointsConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredAutopilotWorkloadPolicyConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredResourceUsageExportConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredNodePoolAutoConfigResourceManagerTags: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableK8sBetaApis: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredShieldedNodes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredNotificationConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredGatewayApiConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredInTransitEncryptionConfig: {
                    type: "string",
                    enum: [
                      "IN_TRANSIT_ENCRYPTION_CONFIG_UNSPECIFIED",
                      "IN_TRANSIT_ENCRYPTION_DISABLED",
                      "IN_TRANSIT_ENCRYPTION_INTER_NODE_TRANSPARENT",
                    ],
                  },
                  desiredDnsConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredServiceExternalIpsConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredNodePoolLoggingConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredL4ilbSubsettingConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredCompliancePostureConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredEnableFqdnNetworkPolicy: {
                    type: "boolean",
                  },
                  desiredMasterVersion: {
                    type: "string",
                  },
                  desiredAutoIpamConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredStackType: {
                    type: "string",
                    enum: ["STACK_TYPE_UNSPECIFIED", "IPV4", "IPV4_IPV6"],
                  },
                  desiredVerticalPodAutoscaling: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredNodePoolAutoConfigLinuxNodeConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredPodAutoscaling: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredAuthenticatorGroupsConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  userManagedKeysConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredEnterpriseConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredNodeKubeletConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredBinaryAuthorization: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredReleaseChannel: {
                    type: "object",
                    additionalProperties: true,
                  },
                  additionalPodRangesConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  removedAdditionalPodRangesConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredMonitoringService: {
                    type: "string",
                  },
                  desiredNodePoolAutoscaling: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredAddonsConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredMasterAuthorizedNetworksConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  etag: {
                    type: "string",
                  },
                  desiredDisableL4LbFirewallReconciliation: {
                    type: "boolean",
                  },
                  desiredNetworkPerformanceConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredLoggingService: {
                    type: "string",
                  },
                  desiredGcfsConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredAnonymousAuthenticationConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredEnablePrivateEndpoint: {
                    type: "boolean",
                  },
                  desiredEnableCiliumClusterwideNetworkPolicy: {
                    type: "boolean",
                  },
                  desiredEnableMultiNetworking: {
                    type: "boolean",
                  },
                  desiredDatabaseEncryption: {
                    type: "object",
                    additionalProperties: true,
                  },
                  desiredSecurityPostureConfig: {
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
              clusterId: {
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
        const path = `v1/{+name}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PUT",
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

export default locationsClustersUpdate;
