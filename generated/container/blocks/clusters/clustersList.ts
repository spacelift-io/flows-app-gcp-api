import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const clustersList: AppBlock = {
  name: "Clusters - List",
  description: `Lists all clusters owned by a project in either the specified zone or all zones.`,
  category: "Clusters",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            'The parent (project and location) where the clusters will be listed. Specified in the format `projects/*/locations/*`. Location "-" matches all zones and all regions.',
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
        let path = `v1/projects/{projectId}/zones/{zone}/clusters`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
          clusters: {
            type: "array",
            items: {
              type: "object",
              properties: {
                enableK8sBetaApis: {
                  type: "object",
                  additionalProperties: true,
                },
                expireTime: {
                  type: "object",
                  additionalProperties: true,
                },
                databaseEncryption: {
                  type: "object",
                  additionalProperties: true,
                },
                subnetwork: {
                  type: "object",
                  additionalProperties: true,
                },
                nodePoolDefaults: {
                  type: "object",
                  additionalProperties: true,
                },
                status: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
                },
                tpuIpv4CidrBlock: {
                  type: "object",
                  additionalProperties: true,
                },
                labelFingerprint: {
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
                },
                enableKubernetesAlpha: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
                nodePoolAutoConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                initialNodeCount: {
                  type: "object",
                  additionalProperties: true,
                },
                rbacBindingConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                network: {
                  type: "object",
                  additionalProperties: true,
                },
                fleet: {
                  type: "object",
                  additionalProperties: true,
                },
                etag: {
                  type: "object",
                  additionalProperties: true,
                },
                podAutoscaling: {
                  type: "object",
                  additionalProperties: true,
                },
                monitoringService: {
                  type: "object",
                  additionalProperties: true,
                },
                ipAllocationPolicy: {
                  type: "object",
                  additionalProperties: true,
                },
                currentNodeCount: {
                  type: "object",
                  additionalProperties: true,
                },
                endpoint: {
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
                },
                servicesIpv4Cidr: {
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
                },
                instanceGroupUrls: {
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
                },
                zone: {
                  type: "object",
                  additionalProperties: true,
                },
                clusterIpv4Cidr: {
                  type: "object",
                  additionalProperties: true,
                },
                location: {
                  type: "object",
                  additionalProperties: true,
                },
                monitoringConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                createTime: {
                  type: "object",
                  additionalProperties: true,
                },
                notificationConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                enableTpu: {
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
                },
                currentNodeVersion: {
                  type: "object",
                  additionalProperties: true,
                },
                loggingService: {
                  type: "object",
                  additionalProperties: true,
                },
                confidentialNodes: {
                  type: "object",
                  additionalProperties: true,
                },
                selfLink: {
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
                },
                securityPostureConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                currentMasterVersion: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          missingZones: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default clustersList;
