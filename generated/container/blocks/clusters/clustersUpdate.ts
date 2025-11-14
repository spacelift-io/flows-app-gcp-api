import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const clustersUpdate: AppBlock = {
  name: "Clusters - Update",
  description: `Updates the settings of a specific cluster.`,
  category: "Clusters",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "The name (project, location, cluster) of the cluster to update.",
          type: "string",
          required: false,
        },
        update: {
          name: "Update",
          description: "Required.",
          type: {
            type: "object",
            properties: {
              desiredParentProductConfig: {
                type: "object",
                properties: {
                  productName: {
                    type: "object",
                    additionalProperties: true,
                  },
                  labels: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredK8sBetaApis: {
                type: "object",
                properties: {
                  enabledApis: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredSecretManagerConfig: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  rotationConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredLoggingConfig: {
                type: "object",
                properties: {
                  componentConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredNetworkTierConfig: {
                type: "object",
                properties: {
                  networkTier: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredAdditionalIpRangesConfig: {
                type: "object",
                properties: {
                  additionalIpRangesConfigs: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredIdentityServiceConfig: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredDefaultSnatStatus: {
                type: "object",
                properties: {
                  disabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredContainerdConfig: {
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
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredMeshCertificates: {
                type: "object",
                properties: {
                  enableCertificates: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredNodePoolId: {
                type: "string",
              },
              desiredWorkloadIdentityConfig: {
                type: "object",
                properties: {
                  workloadPool: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  patchMode: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredNodePoolAutoConfigKubeletConfig: {
                type: "object",
                properties: {
                  imageGcLowThresholdPercent: {
                    type: "object",
                    additionalProperties: true,
                  },
                  containerLogMaxSize: {
                    type: "object",
                    additionalProperties: true,
                  },
                  cpuCfsQuotaPeriod: {
                    type: "object",
                    additionalProperties: true,
                  },
                  containerLogMaxFiles: {
                    type: "object",
                    additionalProperties: true,
                  },
                  insecureKubeletReadonlyPortEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  topologyManager: {
                    type: "object",
                    additionalProperties: true,
                  },
                  evictionMaxPodGracePeriodSeconds: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxParallelImagePulls: {
                    type: "object",
                    additionalProperties: true,
                  },
                  evictionMinimumReclaim: {
                    type: "object",
                    additionalProperties: true,
                  },
                  allowedUnsafeSysctls: {
                    type: "object",
                    additionalProperties: true,
                  },
                  evictionSoftGracePeriod: {
                    type: "object",
                    additionalProperties: true,
                  },
                  podPidsLimit: {
                    type: "object",
                    additionalProperties: true,
                  },
                  imageMaximumGcAge: {
                    type: "object",
                    additionalProperties: true,
                  },
                  imageGcHighThresholdPercent: {
                    type: "object",
                    additionalProperties: true,
                  },
                  cpuCfsQuota: {
                    type: "object",
                    additionalProperties: true,
                  },
                  evictionSoft: {
                    type: "object",
                    additionalProperties: true,
                  },
                  singleProcessOomKill: {
                    type: "object",
                    additionalProperties: true,
                  },
                  imageMinimumGcAge: {
                    type: "object",
                    additionalProperties: true,
                  },
                  cpuManagerPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  memoryManager: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredLocations: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              desiredRbacBindingConfig: {
                type: "object",
                properties: {
                  enableInsecureBindingSystemAuthenticated: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableInsecureBindingSystemUnauthenticated: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredMonitoringConfig: {
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
              desiredClusterAutoscaling: {
                type: "object",
                properties: {
                  autoscalingProfile: {
                    type: "object",
                    additionalProperties: true,
                  },
                  autoprovisioningLocations: {
                    type: "object",
                    additionalProperties: true,
                  },
                  defaultComputeClassConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  resourceLimits: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableNodeAutoprovisioning: {
                    type: "object",
                    additionalProperties: true,
                  },
                  autoprovisioningNodePoolDefaults: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredNodeVersion: {
                type: "string",
              },
              desiredFleet: {
                type: "object",
                properties: {
                  membershipType: {
                    type: "object",
                    additionalProperties: true,
                  },
                  preRegistered: {
                    type: "object",
                    additionalProperties: true,
                  },
                  membership: {
                    type: "object",
                    additionalProperties: true,
                  },
                  project: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredUserManagedKeysConfig: {
                type: "object",
                properties: {
                  serviceAccountSigningKeys: {
                    type: "object",
                    additionalProperties: true,
                  },
                  controlPlaneDiskEncryptionKeyVersions: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serviceAccountVerificationKeys: {
                    type: "object",
                    additionalProperties: true,
                  },
                  etcdPeerCa: {
                    type: "object",
                    additionalProperties: true,
                  },
                  clusterCa: {
                    type: "object",
                    additionalProperties: true,
                  },
                  gkeopsEtcdBackupEncryptionKey: {
                    type: "object",
                    additionalProperties: true,
                  },
                  aggregationCa: {
                    type: "object",
                    additionalProperties: true,
                  },
                  etcdApiCa: {
                    type: "object",
                    additionalProperties: true,
                  },
                  controlPlaneDiskEncryptionKey: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredIntraNodeVisibilityConfig: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredPrivilegedAdmissionConfig: {
                type: "object",
                properties: {
                  allowlistPaths: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredDefaultEnablePrivateNodes: {
                type: "boolean",
              },
              desiredPrivateClusterConfig: {
                type: "object",
                properties: {
                  publicEndpoint: {
                    type: "object",
                    additionalProperties: true,
                  },
                  privateEndpointSubnetwork: {
                    type: "object",
                    additionalProperties: true,
                  },
                  peeringName: {
                    type: "object",
                    additionalProperties: true,
                  },
                  masterGlobalAccessConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enablePrivateNodes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  privateEndpoint: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enablePrivateEndpoint: {
                    type: "object",
                    additionalProperties: true,
                  },
                  masterIpv4CidrBlock: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredNodePoolAutoConfigNetworkTags: {
                type: "object",
                properties: {
                  tags: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredControlPlaneEndpointsConfig: {
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
              desiredAutopilotWorkloadPolicyConfig: {
                type: "object",
                properties: {
                  allowNetAdmin: {
                    type: "object",
                    additionalProperties: true,
                  },
                  autopilotCompatibilityAuditingEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredResourceUsageExportConfig: {
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
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredNodePoolAutoConfigResourceManagerTags: {
                type: "object",
                properties: {
                  tags: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              enableK8sBetaApis: {
                type: "object",
                properties: {
                  enabledApis: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredShieldedNodes: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredNotificationConfig: {
                type: "object",
                properties: {
                  pubsub: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredGatewayApiConfig: {
                type: "object",
                properties: {
                  channel: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  clusterDnsDomain: {
                    type: "object",
                    additionalProperties: true,
                  },
                  additiveVpcScopeDnsDomain: {
                    type: "object",
                    additionalProperties: true,
                  },
                  clusterDns: {
                    type: "object",
                    additionalProperties: true,
                  },
                  clusterDnsScope: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredServiceExternalIpsConfig: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredNodePoolLoggingConfig: {
                type: "object",
                properties: {
                  variantConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredL4ilbSubsettingConfig: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredCompliancePostureConfig: {
                type: "object",
                properties: {
                  mode: {
                    type: "object",
                    additionalProperties: true,
                  },
                  complianceStandards: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredStackType: {
                type: "string",
                enum: ["STACK_TYPE_UNSPECIFIED", "IPV4", "IPV4_IPV6"],
              },
              desiredVerticalPodAutoscaling: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredNodePoolAutoConfigLinuxNodeConfig: {
                type: "object",
                properties: {
                  transparentHugepageDefrag: {
                    type: "object",
                    additionalProperties: true,
                  },
                  hugepages: {
                    type: "object",
                    additionalProperties: true,
                  },
                  cgroupMode: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredPodAutoscaling: {
                type: "object",
                properties: {
                  hpaProfile: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredAuthenticatorGroupsConfig: {
                type: "object",
                properties: {
                  securityGroup: {
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
              userManagedKeysConfig: {
                type: "object",
                properties: {
                  serviceAccountSigningKeys: {
                    type: "object",
                    additionalProperties: true,
                  },
                  controlPlaneDiskEncryptionKeyVersions: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serviceAccountVerificationKeys: {
                    type: "object",
                    additionalProperties: true,
                  },
                  etcdPeerCa: {
                    type: "object",
                    additionalProperties: true,
                  },
                  clusterCa: {
                    type: "object",
                    additionalProperties: true,
                  },
                  gkeopsEtcdBackupEncryptionKey: {
                    type: "object",
                    additionalProperties: true,
                  },
                  aggregationCa: {
                    type: "object",
                    additionalProperties: true,
                  },
                  etcdApiCa: {
                    type: "object",
                    additionalProperties: true,
                  },
                  controlPlaneDiskEncryptionKey: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredEnterpriseConfig: {
                type: "object",
                properties: {
                  desiredTier: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredNodeKubeletConfig: {
                type: "object",
                properties: {
                  imageGcLowThresholdPercent: {
                    type: "object",
                    additionalProperties: true,
                  },
                  containerLogMaxSize: {
                    type: "object",
                    additionalProperties: true,
                  },
                  cpuCfsQuotaPeriod: {
                    type: "object",
                    additionalProperties: true,
                  },
                  containerLogMaxFiles: {
                    type: "object",
                    additionalProperties: true,
                  },
                  insecureKubeletReadonlyPortEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  topologyManager: {
                    type: "object",
                    additionalProperties: true,
                  },
                  evictionMaxPodGracePeriodSeconds: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxParallelImagePulls: {
                    type: "object",
                    additionalProperties: true,
                  },
                  evictionMinimumReclaim: {
                    type: "object",
                    additionalProperties: true,
                  },
                  allowedUnsafeSysctls: {
                    type: "object",
                    additionalProperties: true,
                  },
                  evictionSoftGracePeriod: {
                    type: "object",
                    additionalProperties: true,
                  },
                  podPidsLimit: {
                    type: "object",
                    additionalProperties: true,
                  },
                  imageMaximumGcAge: {
                    type: "object",
                    additionalProperties: true,
                  },
                  imageGcHighThresholdPercent: {
                    type: "object",
                    additionalProperties: true,
                  },
                  cpuCfsQuota: {
                    type: "object",
                    additionalProperties: true,
                  },
                  evictionSoft: {
                    type: "object",
                    additionalProperties: true,
                  },
                  singleProcessOomKill: {
                    type: "object",
                    additionalProperties: true,
                  },
                  imageMinimumGcAge: {
                    type: "object",
                    additionalProperties: true,
                  },
                  cpuManagerPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  memoryManager: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredBinaryAuthorization: {
                type: "object",
                properties: {
                  evaluationMode: {
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
              desiredReleaseChannel: {
                type: "object",
                properties: {
                  channel: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              additionalPodRangesConfig: {
                type: "object",
                properties: {
                  podRangeNames: {
                    type: "object",
                    additionalProperties: true,
                  },
                  podRangeInfo: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              removedAdditionalPodRangesConfig: {
                type: "object",
                properties: {
                  podRangeNames: {
                    type: "object",
                    additionalProperties: true,
                  },
                  podRangeInfo: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredMonitoringService: {
                type: "string",
              },
              desiredNodePoolAutoscaling: {
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
              desiredAddonsConfig: {
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
              desiredMasterAuthorizedNetworksConfig: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  privateEndpointEnforcementEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  cidrBlocks: {
                    type: "object",
                    additionalProperties: true,
                  },
                  gcpPublicCidrsAccessEnabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  totalEgressBandwidthTier: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredLoggingService: {
                type: "string",
              },
              desiredGcfsConfig: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredAnonymousAuthenticationConfig: {
                type: "object",
                properties: {
                  mode: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  keyName: {
                    type: "object",
                    additionalProperties: true,
                  },
                  currentState: {
                    type: "object",
                    additionalProperties: true,
                  },
                  decryptionKeys: {
                    type: "object",
                    additionalProperties: true,
                  },
                  lastOperationErrors: {
                    type: "object",
                    additionalProperties: true,
                  },
                  state: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              desiredSecurityPostureConfig: {
                type: "object",
                properties: {
                  vulnerabilityMode: {
                    type: "object",
                    additionalProperties: true,
                  },
                  mode: {
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
        let path = `v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};
        requestBody.projectId = input.app.config.projectId;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.update !== undefined)
          requestBody.update = input.event.inputConfig.update;

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

export default clustersUpdate;
