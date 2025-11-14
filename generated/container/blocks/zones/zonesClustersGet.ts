import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const zonesClustersGet: AppBlock = {
  name: "Zones - Get",
  description: `Gets the details of a specific cluster.`,
  category: "Zones",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "The name (project, location, cluster) of the cluster to retrieve. Specified in the format `projects/*/locations/*/clusters/*`.",
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
          enableK8sBetaApis: {
            type: "object",
            properties: {
              enabledApis: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          expireTime: {
            type: "string",
          },
          databaseEncryption: {
            type: "object",
            properties: {
              keyName: {
                type: "string",
              },
              currentState: {
                type: "string",
                enum: [
                  "CURRENT_STATE_UNSPECIFIED",
                  "CURRENT_STATE_ENCRYPTED",
                  "CURRENT_STATE_DECRYPTED",
                  "CURRENT_STATE_ENCRYPTION_PENDING",
                  "CURRENT_STATE_ENCRYPTION_ERROR",
                  "CURRENT_STATE_DECRYPTION_PENDING",
                  "CURRENT_STATE_DECRYPTION_ERROR",
                ],
              },
              decryptionKeys: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              lastOperationErrors: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              state: {
                type: "string",
                enum: ["UNKNOWN", "ENCRYPTED", "DECRYPTED"],
              },
            },
            additionalProperties: true,
          },
          subnetwork: {
            type: "string",
          },
          nodePoolDefaults: {
            type: "object",
            properties: {
              nodeConfigDefaults: {
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
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          shieldedNodes: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          nodePools: {
            type: "array",
            items: {
              type: "object",
              properties: {
                conditions: {
                  type: "object",
                  additionalProperties: true,
                },
                etag: {
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
                },
                version: {
                  type: "object",
                  additionalProperties: true,
                },
                podIpv4CidrSize: {
                  type: "object",
                  additionalProperties: true,
                },
                config: {
                  type: "object",
                  additionalProperties: true,
                },
                statusMessage: {
                  type: "object",
                  additionalProperties: true,
                },
                instanceGroupUrls: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
                },
                initialNodeCount: {
                  type: "object",
                  additionalProperties: true,
                },
                autopilotConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                selfLink: {
                  type: "object",
                  additionalProperties: true,
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
          },
          meshCertificates: {
            type: "object",
            properties: {
              enableCertificates: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          addonsConfig: {
            type: "object",
            properties: {
              lustreCsiDriverConfig: {
                type: "object",
                additionalProperties: true,
              },
              statefulHaConfig: {
                type: "object",
                additionalProperties: true,
              },
              gcePersistentDiskCsiDriverConfig: {
                type: "object",
                additionalProperties: true,
              },
              gkeBackupAgentConfig: {
                type: "object",
                additionalProperties: true,
              },
              gcpFilestoreCsiDriverConfig: {
                type: "object",
                additionalProperties: true,
              },
              rayOperatorConfig: {
                type: "object",
                additionalProperties: true,
              },
              httpLoadBalancing: {
                type: "object",
                additionalProperties: true,
              },
              highScaleCheckpointingConfig: {
                type: "object",
                additionalProperties: true,
              },
              parallelstoreCsiDriverConfig: {
                type: "object",
                additionalProperties: true,
              },
              dnsCacheConfig: {
                type: "object",
                additionalProperties: true,
              },
              horizontalPodAutoscaling: {
                type: "object",
                additionalProperties: true,
              },
              kubernetesDashboard: {
                type: "object",
                additionalProperties: true,
              },
              gcsFuseCsiDriverConfig: {
                type: "object",
                additionalProperties: true,
              },
              cloudRunConfig: {
                type: "object",
                additionalProperties: true,
              },
              networkPolicyConfig: {
                type: "object",
                additionalProperties: true,
              },
              configConnectorConfig: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          enterpriseConfig: {
            type: "object",
            properties: {
              desiredTier: {
                type: "string",
                enum: ["CLUSTER_TIER_UNSPECIFIED", "STANDARD", "ENTERPRISE"],
              },
              clusterTier: {
                type: "string",
                enum: ["CLUSTER_TIER_UNSPECIFIED", "STANDARD", "ENTERPRISE"],
              },
            },
            additionalProperties: true,
          },
          masterAuth: {
            type: "object",
            properties: {
              clientKey: {
                type: "string",
              },
              clusterCaCertificate: {
                type: "string",
              },
              clientCertificateConfig: {
                type: "object",
                additionalProperties: true,
              },
              username: {
                type: "string",
              },
              password: {
                type: "string",
              },
              clientCertificate: {
                type: "string",
              },
            },
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
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          releaseChannel: {
            type: "object",
            properties: {
              channel: {
                type: "string",
                enum: ["UNSPECIFIED", "RAPID", "REGULAR", "STABLE", "EXTENDED"],
              },
            },
            additionalProperties: true,
          },
          costManagementConfig: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          userManagedKeysConfig: {
            type: "object",
            properties: {
              serviceAccountSigningKeys: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              controlPlaneDiskEncryptionKeyVersions: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              serviceAccountVerificationKeys: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              etcdPeerCa: {
                type: "string",
              },
              clusterCa: {
                type: "string",
              },
              gkeopsEtcdBackupEncryptionKey: {
                type: "string",
              },
              aggregationCa: {
                type: "string",
              },
              etcdApiCa: {
                type: "string",
              },
              controlPlaneDiskEncryptionKey: {
                type: "string",
              },
            },
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
            properties: {
              nodeKubeletConfig: {
                type: "object",
                additionalProperties: true,
              },
              networkTags: {
                type: "object",
                additionalProperties: true,
              },
              resourceManagerTags: {
                type: "object",
                additionalProperties: true,
              },
              linuxNodeConfig: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          initialNodeCount: {
            type: "number",
          },
          rbacBindingConfig: {
            type: "object",
            properties: {
              enableInsecureBindingSystemAuthenticated: {
                type: "boolean",
              },
              enableInsecureBindingSystemUnauthenticated: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          network: {
            type: "string",
          },
          fleet: {
            type: "object",
            properties: {
              membershipType: {
                type: "string",
                enum: ["MEMBERSHIP_TYPE_UNSPECIFIED", "LIGHTWEIGHT"],
              },
              preRegistered: {
                type: "boolean",
              },
              membership: {
                type: "string",
              },
              project: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          etag: {
            type: "string",
          },
          podAutoscaling: {
            type: "object",
            properties: {
              hpaProfile: {
                type: "string",
                enum: ["HPA_PROFILE_UNSPECIFIED", "NONE", "PERFORMANCE"],
              },
            },
            additionalProperties: true,
          },
          monitoringService: {
            type: "string",
          },
          ipAllocationPolicy: {
            type: "object",
            properties: {
              servicesIpv4Cidr: {
                type: "string",
              },
              podCidrOverprovisionConfig: {
                type: "object",
                additionalProperties: true,
              },
              tpuIpv4CidrBlock: {
                type: "string",
              },
              subnetIpv6CidrBlock: {
                type: "string",
              },
              clusterSecondaryRangeName: {
                type: "string",
              },
              nodeIpv4Cidr: {
                type: "string",
              },
              servicesIpv4CidrBlock: {
                type: "string",
              },
              servicesSecondaryRangeName: {
                type: "string",
              },
              defaultPodIpv4RangeUtilization: {
                type: "number",
              },
              createSubnetwork: {
                type: "boolean",
              },
              clusterIpv4Cidr: {
                type: "string",
              },
              ipv6AccessType: {
                type: "string",
                enum: ["IPV6_ACCESS_TYPE_UNSPECIFIED", "INTERNAL", "EXTERNAL"],
              },
              additionalPodRangesConfig: {
                type: "object",
                additionalProperties: true,
              },
              useIpAliases: {
                type: "boolean",
              },
              servicesIpv6CidrBlock: {
                type: "string",
              },
              additionalIpRangesConfigs: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              clusterIpv4CidrBlock: {
                type: "string",
              },
              networkTierConfig: {
                type: "object",
                additionalProperties: true,
              },
              useRoutes: {
                type: "boolean",
              },
              autoIpamConfig: {
                type: "object",
                additionalProperties: true,
              },
              nodeIpv4CidrBlock: {
                type: "string",
              },
              stackType: {
                type: "string",
                enum: ["STACK_TYPE_UNSPECIFIED", "IPV4", "IPV4_IPV6"],
              },
              subnetworkName: {
                type: "string",
              },
            },
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
            properties: {
              enabled: {
                type: "boolean",
              },
              rotationConfig: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          workloadIdentityConfig: {
            type: "object",
            properties: {
              workloadPool: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          controlPlaneEndpointsConfig: {
            type: "object",
            properties: {
              ipEndpointsConfig: {
                type: "object",
                additionalProperties: true,
              },
              dnsEndpointConfig: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          defaultMaxPodsConstraint: {
            type: "object",
            properties: {
              maxPodsPerNode: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          parentProductConfig: {
            type: "object",
            properties: {
              productName: {
                type: "string",
              },
              labels: {
                type: "object",
                additionalProperties: true,
              },
            },
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
            properties: {
              enableL4ilbSubsetting: {
                type: "boolean",
              },
              privateIpv6GoogleAccess: {
                type: "string",
                enum: [
                  "PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED",
                  "PRIVATE_IPV6_GOOGLE_ACCESS_DISABLED",
                  "PRIVATE_IPV6_GOOGLE_ACCESS_TO_GOOGLE",
                  "PRIVATE_IPV6_GOOGLE_ACCESS_BIDIRECTIONAL",
                ],
              },
              enableFqdnNetworkPolicy: {
                type: "boolean",
              },
              subnetwork: {
                type: "string",
              },
              enableMultiNetworking: {
                type: "boolean",
              },
              network: {
                type: "string",
              },
              defaultEnablePrivateNodes: {
                type: "boolean",
              },
              datapathProvider: {
                type: "string",
                enum: [
                  "DATAPATH_PROVIDER_UNSPECIFIED",
                  "LEGACY_DATAPATH",
                  "ADVANCED_DATAPATH",
                ],
              },
              defaultSnatStatus: {
                type: "object",
                additionalProperties: true,
              },
              inTransitEncryptionConfig: {
                type: "string",
                enum: [
                  "IN_TRANSIT_ENCRYPTION_CONFIG_UNSPECIFIED",
                  "IN_TRANSIT_ENCRYPTION_DISABLED",
                  "IN_TRANSIT_ENCRYPTION_INTER_NODE_TRANSPARENT",
                ],
              },
              dnsConfig: {
                type: "object",
                additionalProperties: true,
              },
              gatewayApiConfig: {
                type: "object",
                additionalProperties: true,
              },
              serviceExternalIpsConfig: {
                type: "object",
                additionalProperties: true,
              },
              disableL4LbFirewallReconciliation: {
                type: "boolean",
              },
              enableCiliumClusterwideNetworkPolicy: {
                type: "boolean",
              },
              networkPerformanceConfig: {
                type: "object",
                additionalProperties: true,
              },
              enableIntraNodeVisibility: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          maintenancePolicy: {
            type: "object",
            properties: {
              window: {
                type: "object",
                additionalProperties: true,
              },
              resourceVersion: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          masterAuthorizedNetworksConfig: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
              privateEndpointEnforcementEnabled: {
                type: "boolean",
              },
              cidrBlocks: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              gcpPublicCidrsAccessEnabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          nodeConfig: {
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
          locations: {
            type: "array",
            items: {
              type: "string",
            },
          },
          instanceGroupUrls: {
            type: "array",
            items: {
              type: "string",
            },
          },
          gkeAutoUpgradeConfig: {
            type: "object",
            properties: {
              patchMode: {
                type: "string",
                enum: ["PATCH_MODE_UNSPECIFIED", "ACCELERATED"],
              },
            },
            additionalProperties: true,
          },
          autopilot: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
              privilegedAdmissionConfig: {
                type: "object",
                additionalProperties: true,
              },
              workloadPolicyConfig: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          networkPolicy: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
              provider: {
                type: "string",
                enum: ["PROVIDER_UNSPECIFIED", "CALICO"],
              },
            },
            additionalProperties: true,
          },
          nodeIpv4CidrSize: {
            type: "number",
          },
          identityServiceConfig: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          authenticatorGroupsConfig: {
            type: "object",
            properties: {
              securityGroup: {
                type: "string",
              },
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          binaryAuthorization: {
            type: "object",
            properties: {
              evaluationMode: {
                type: "string",
                enum: [
                  "EVALUATION_MODE_UNSPECIFIED",
                  "DISABLED",
                  "PROJECT_SINGLETON_POLICY_ENFORCE",
                ],
              },
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          alphaClusterFeatureGates: {
            type: "array",
            items: {
              type: "string",
            },
          },
          resourceUsageExportConfig: {
            type: "object",
            properties: {
              consumptionMeteringConfig: {
                type: "object",
                additionalProperties: true,
              },
              bigqueryDestination: {
                type: "object",
                additionalProperties: true,
              },
              enableNetworkEgressMetering: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          privateClusterConfig: {
            type: "object",
            properties: {
              publicEndpoint: {
                type: "string",
              },
              privateEndpointSubnetwork: {
                type: "string",
              },
              peeringName: {
                type: "string",
              },
              masterGlobalAccessConfig: {
                type: "object",
                additionalProperties: true,
              },
              enablePrivateNodes: {
                type: "boolean",
              },
              privateEndpoint: {
                type: "string",
              },
              enablePrivateEndpoint: {
                type: "boolean",
              },
              masterIpv4CidrBlock: {
                type: "string",
              },
            },
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
            properties: {
              componentConfig: {
                type: "object",
                additionalProperties: true,
              },
              managedPrometheusConfig: {
                type: "object",
                additionalProperties: true,
              },
              advancedDatapathObservabilityConfig: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          createTime: {
            type: "string",
          },
          notificationConfig: {
            type: "object",
            properties: {
              pubsub: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          enableTpu: {
            type: "boolean",
          },
          anonymousAuthenticationConfig: {
            type: "object",
            properties: {
              mode: {
                type: "string",
                enum: ["MODE_UNSPECIFIED", "ENABLED", "LIMITED"],
              },
            },
            additionalProperties: true,
          },
          autoscaling: {
            type: "object",
            properties: {
              autoscalingProfile: {
                type: "string",
                enum: [
                  "PROFILE_UNSPECIFIED",
                  "OPTIMIZE_UTILIZATION",
                  "BALANCED",
                ],
              },
              autoprovisioningLocations: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              defaultComputeClassConfig: {
                type: "object",
                additionalProperties: true,
              },
              resourceLimits: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              enableNodeAutoprovisioning: {
                type: "boolean",
              },
              autoprovisioningNodePoolDefaults: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          compliancePostureConfig: {
            type: "object",
            properties: {
              mode: {
                type: "string",
                enum: ["MODE_UNSPECIFIED", "DISABLED", "ENABLED"],
              },
              complianceStandards: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
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
          selfLink: {
            type: "string",
          },
          resourceLabels: {
            type: "object",
            additionalProperties: true,
          },
          loggingConfig: {
            type: "object",
            properties: {
              componentConfig: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
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
          securityPostureConfig: {
            type: "object",
            properties: {
              vulnerabilityMode: {
                type: "string",
                enum: [
                  "VULNERABILITY_MODE_UNSPECIFIED",
                  "VULNERABILITY_DISABLED",
                  "VULNERABILITY_BASIC",
                  "VULNERABILITY_ENTERPRISE",
                ],
              },
              mode: {
                type: "string",
                enum: ["MODE_UNSPECIFIED", "DISABLED", "BASIC", "ENTERPRISE"],
              },
            },
            additionalProperties: true,
          },
          currentMasterVersion: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default zonesClustersGet;
