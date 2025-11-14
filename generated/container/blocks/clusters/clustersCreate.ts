import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const clustersCreate: AppBlock = {
  name: "Clusters - Create",
  description: `Creates a cluster, consisting of the specified number and type of Google Compute Engine instances.`,
  category: "Clusters",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "The parent (project and location) where the cluster will be created.",
          type: "string",
          required: false,
        },
        cluster: {
          name: "Cluster",
          description: "Required.",
          type: {
            type: "object",
            properties: {
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
              expireTime: {
                type: "string",
              },
              databaseEncryption: {
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
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              shieldedNodes: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  enableCertificates: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                  clusterTier: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              masterAuth: {
                type: "object",
                properties: {
                  clientKey: {
                    type: "object",
                    additionalProperties: true,
                  },
                  clusterCaCertificate: {
                    type: "object",
                    additionalProperties: true,
                  },
                  clientCertificateConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  username: {
                    type: "object",
                    additionalProperties: true,
                  },
                  password: {
                    type: "object",
                    additionalProperties: true,
                  },
                  clientCertificate: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              releaseChannel: {
                type: "object",
                properties: {
                  channel: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              costManagementConfig: {
                type: "object",
                properties: {
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
              network: {
                type: "string",
              },
              fleet: {
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
              etag: {
                type: "string",
              },
              podAutoscaling: {
                type: "object",
                properties: {
                  hpaProfile: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                  podCidrOverprovisionConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  tpuIpv4CidrBlock: {
                    type: "object",
                    additionalProperties: true,
                  },
                  subnetIpv6CidrBlock: {
                    type: "object",
                    additionalProperties: true,
                  },
                  clusterSecondaryRangeName: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nodeIpv4Cidr: {
                    type: "object",
                    additionalProperties: true,
                  },
                  servicesIpv4CidrBlock: {
                    type: "object",
                    additionalProperties: true,
                  },
                  servicesSecondaryRangeName: {
                    type: "object",
                    additionalProperties: true,
                  },
                  defaultPodIpv4RangeUtilization: {
                    type: "object",
                    additionalProperties: true,
                  },
                  createSubnetwork: {
                    type: "object",
                    additionalProperties: true,
                  },
                  clusterIpv4Cidr: {
                    type: "object",
                    additionalProperties: true,
                  },
                  ipv6AccessType: {
                    type: "object",
                    additionalProperties: true,
                  },
                  additionalPodRangesConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  useIpAliases: {
                    type: "object",
                    additionalProperties: true,
                  },
                  servicesIpv6CidrBlock: {
                    type: "object",
                    additionalProperties: true,
                  },
                  additionalIpRangesConfigs: {
                    type: "object",
                    additionalProperties: true,
                  },
                  clusterIpv4CidrBlock: {
                    type: "object",
                    additionalProperties: true,
                  },
                  networkTierConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  useRoutes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  autoIpamConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nodeIpv4CidrBlock: {
                    type: "object",
                    additionalProperties: true,
                  },
                  stackType: {
                    type: "object",
                    additionalProperties: true,
                  },
                  subnetworkName: {
                    type: "object",
                    additionalProperties: true,
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
              workloadIdentityConfig: {
                type: "object",
                properties: {
                  workloadPool: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              parentProductConfig: {
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
                    type: "object",
                    additionalProperties: true,
                  },
                  privateIpv6GoogleAccess: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableFqdnNetworkPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  subnetwork: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableMultiNetworking: {
                    type: "object",
                    additionalProperties: true,
                  },
                  network: {
                    type: "object",
                    additionalProperties: true,
                  },
                  defaultEnablePrivateNodes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  datapathProvider: {
                    type: "object",
                    additionalProperties: true,
                  },
                  defaultSnatStatus: {
                    type: "object",
                    additionalProperties: true,
                  },
                  inTransitEncryptionConfig: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                  enableCiliumClusterwideNetworkPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  networkPerformanceConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableIntraNodeVisibility: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              masterAuthorizedNetworksConfig: {
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
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              autopilot: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                  provider: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              authenticatorGroupsConfig: {
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
              binaryAuthorization: {
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
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              privateClusterConfig: {
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
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              autoscaling: {
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
              compliancePostureConfig: {
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
                    type: "object",
                    additionalProperties: true,
                  },
                  confidentialInstanceType: {
                    type: "object",
                    additionalProperties: true,
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
                  additionalProperties: true,
                },
              },
              securityPostureConfig: {
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
              currentMasterVersion: {
                type: "string",
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
        let path = `v1/projects/{projectId}/zones/{zone}/clusters`;

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
        if (input.event.inputConfig.cluster !== undefined)
          requestBody.cluster = input.event.inputConfig.cluster;

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

export default clustersCreate;
