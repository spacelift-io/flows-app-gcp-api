import getServerConfig_0 from "./configuration/getServerConfig";
import clustersSetMonitoring_1 from "./clusters/clustersSetMonitoring";
import clustersSetLogging_2 from "./clusters/clustersSetLogging";
import clustersFetchClusterUpgradeInfo_3 from "./clusters/clustersFetchClusterUpgradeInfo";
import clustersGet_4 from "./clusters/clustersGet";
import clustersSetLegacyAbac_5 from "./clusters/clustersSetLegacyAbac";
import clustersCreate_6 from "./clusters/clustersCreate";
import clustersUpdate_7 from "./clusters/clustersUpdate";
import clustersList_8 from "./clusters/clustersList";
import clustersUpdateMaster_9 from "./clusters/clustersUpdateMaster";
import clustersGetJwks_10 from "./clusters/clustersGetJwks";
import clustersSetMaintenancePolicy_11 from "./clusters/clustersSetMaintenancePolicy";
import clustersSetMasterAuth_12 from "./clusters/clustersSetMasterAuth";
import clustersCompleteIpRotation_13 from "./clusters/clustersCompleteIpRotation";
import clustersSetNetworkPolicy_14 from "./clusters/clustersSetNetworkPolicy";
import clustersCheckAutopilotCompatibility_15 from "./clusters/clustersCheckAutopilotCompatibility";
import clustersSetLocations_16 from "./clusters/clustersSetLocations";
import clustersDelete_17 from "./clusters/clustersDelete";
import clustersStartIpRotation_18 from "./clusters/clustersStartIpRotation";
import clustersSetResourceLabels_19 from "./clusters/clustersSetResourceLabels";
import clustersSetAddons_20 from "./clusters/clustersSetAddons";
import clustersMonitoring_21 from "./clusters/clustersMonitoring";
import clustersSetMaintenancePolicy_22 from "./clusters/clustersSetMaintenancePolicy";
import clustersCompleteIpRotation_23 from "./clusters/clustersCompleteIpRotation";
import clustersLogging_24 from "./clusters/clustersLogging";
import clustersAddons_25 from "./clusters/clustersAddons";
import clustersResourceLabels_26 from "./clusters/clustersResourceLabels";
import clustersSetNetworkPolicy_27 from "./clusters/clustersSetNetworkPolicy";
import clustersFetchClusterUpgradeInfo_28 from "./clusters/clustersFetchClusterUpgradeInfo";
import clustersCreate_29 from "./clusters/clustersCreate";
import clustersSetMasterAuth_30 from "./clusters/clustersSetMasterAuth";
import clustersList_31 from "./clusters/clustersList";
import clustersUpdate_32 from "./clusters/clustersUpdate";
import clustersDelete_33 from "./clusters/clustersDelete";
import clustersLegacyAbac_34 from "./clusters/clustersLegacyAbac";
import clustersStartIpRotation_35 from "./clusters/clustersStartIpRotation";
import clustersMaster_36 from "./clusters/clustersMaster";
import clustersGet_37 from "./clusters/clustersGet";
import nodePoolsCompleteUpgrade_38 from "./node_pools/nodePoolsCompleteUpgrade";
import nodePoolsList_39 from "./node_pools/nodePoolsList";
import nodePoolsGet_40 from "./node_pools/nodePoolsGet";
import nodePoolsSetManagement_41 from "./node_pools/nodePoolsSetManagement";
import nodePoolsFetchNodePoolUpgradeInfo_42 from "./node_pools/nodePoolsFetchNodePoolUpgradeInfo";
import nodePoolsUpdate_43 from "./node_pools/nodePoolsUpdate";
import nodePoolsRollback_44 from "./node_pools/nodePoolsRollback";
import nodePoolsSetSize_45 from "./node_pools/nodePoolsSetSize";
import nodePoolsDelete_46 from "./node_pools/nodePoolsDelete";
import nodePoolsCreate_47 from "./node_pools/nodePoolsCreate";
import nodePoolsSetAutoscaling_48 from "./node_pools/nodePoolsSetAutoscaling";
import nodePoolsSetSize_49 from "./node_pools/nodePoolsSetSize";
import nodePoolsFetchNodePoolUpgradeInfo_50 from "./node_pools/nodePoolsFetchNodePoolUpgradeInfo";
import nodePoolsAutoscaling_51 from "./node_pools/nodePoolsAutoscaling";
import nodePoolsSetManagement_52 from "./node_pools/nodePoolsSetManagement";
import nodePoolsUpdate_53 from "./node_pools/nodePoolsUpdate";
import nodePoolsList_54 from "./node_pools/nodePoolsList";
import nodePoolsCreate_55 from "./node_pools/nodePoolsCreate";
import nodePoolsRollback_56 from "./node_pools/nodePoolsRollback";
import nodePoolsDelete_57 from "./node_pools/nodePoolsDelete";
import nodePoolsGet_58 from "./node_pools/nodePoolsGet";
import wellKnownGetOpenidConfiguration_59 from "./wellknown/wellKnownGetOpenidConfiguration";
import operationsGet_60 from "./operations/operationsGet";
import operationsCancel_61 from "./operations/operationsCancel";
import operationsList_62 from "./operations/operationsList";
import operationsCancel_63 from "./operations/operationsCancel";
import operationsList_64 from "./operations/operationsList";
import operationsGet_65 from "./operations/operationsGet";
import usableSubnetworksList_66 from "./usable_subnetworks/usableSubnetworksList";
import zonesGetServerconfig_67 from "./zones/zonesGetServerconfig";
import zonesClusters_68 from "./zones/zonesClusters";

export const blocks = {
  configuration_getServerConfig: getServerConfig_0,
  clusters_clustersSetMonitoring: clustersSetMonitoring_1,
  clusters_clustersSetLogging: clustersSetLogging_2,
  clusters_clustersFetchClusterUpgradeInfo: clustersFetchClusterUpgradeInfo_3,
  clusters_clustersGet: clustersGet_4,
  clusters_clustersSetLegacyAbac: clustersSetLegacyAbac_5,
  clusters_clustersCreate: clustersCreate_6,
  clusters_clustersUpdate: clustersUpdate_7,
  clusters_clustersList: clustersList_8,
  clusters_clustersUpdateMaster: clustersUpdateMaster_9,
  clusters_clustersGetJwks: clustersGetJwks_10,
  clusters_clustersSetMaintenancePolicy: clustersSetMaintenancePolicy_11,
  clusters_clustersSetMasterAuth: clustersSetMasterAuth_12,
  clusters_clustersCompleteIpRotation: clustersCompleteIpRotation_13,
  clusters_clustersSetNetworkPolicy: clustersSetNetworkPolicy_14,
  clusters_clustersCheckAutopilotCompatibility:
    clustersCheckAutopilotCompatibility_15,
  clusters_clustersSetLocations: clustersSetLocations_16,
  clusters_clustersDelete: clustersDelete_17,
  clusters_clustersStartIpRotation: clustersStartIpRotation_18,
  clusters_clustersSetResourceLabels: clustersSetResourceLabels_19,
  clusters_clustersSetAddons: clustersSetAddons_20,
  clusters_clustersMonitoring: clustersMonitoring_21,
  clusters_clustersSetMaintenancePolicy_1: clustersSetMaintenancePolicy_22,
  clusters_clustersCompleteIpRotation_1: clustersCompleteIpRotation_23,
  clusters_clustersLogging: clustersLogging_24,
  clusters_clustersAddons: clustersAddons_25,
  clusters_clustersResourceLabels: clustersResourceLabels_26,
  clusters_clustersSetNetworkPolicy_1: clustersSetNetworkPolicy_27,
  clusters_clustersFetchClusterUpgradeInfo_1:
    clustersFetchClusterUpgradeInfo_28,
  clusters_clustersCreate_1: clustersCreate_29,
  clusters_clustersSetMasterAuth_1: clustersSetMasterAuth_30,
  clusters_clustersList_1: clustersList_31,
  clusters_clustersUpdate_1: clustersUpdate_32,
  clusters_clustersDelete_1: clustersDelete_33,
  clusters_clustersLegacyAbac: clustersLegacyAbac_34,
  clusters_clustersStartIpRotation_1: clustersStartIpRotation_35,
  clusters_clustersMaster: clustersMaster_36,
  clusters_clustersGet_1: clustersGet_37,
  node_pools_nodePoolsCompleteUpgrade: nodePoolsCompleteUpgrade_38,
  node_pools_nodePoolsList: nodePoolsList_39,
  node_pools_nodePoolsGet: nodePoolsGet_40,
  node_pools_nodePoolsSetManagement: nodePoolsSetManagement_41,
  node_pools_nodePoolsFetchNodePoolUpgradeInfo:
    nodePoolsFetchNodePoolUpgradeInfo_42,
  node_pools_nodePoolsUpdate: nodePoolsUpdate_43,
  node_pools_nodePoolsRollback: nodePoolsRollback_44,
  node_pools_nodePoolsSetSize: nodePoolsSetSize_45,
  node_pools_nodePoolsDelete: nodePoolsDelete_46,
  node_pools_nodePoolsCreate: nodePoolsCreate_47,
  node_pools_nodePoolsSetAutoscaling: nodePoolsSetAutoscaling_48,
  node_pools_nodePoolsSetSize_1: nodePoolsSetSize_49,
  node_pools_nodePoolsFetchNodePoolUpgradeInfo_1:
    nodePoolsFetchNodePoolUpgradeInfo_50,
  node_pools_nodePoolsAutoscaling: nodePoolsAutoscaling_51,
  node_pools_nodePoolsSetManagement_1: nodePoolsSetManagement_52,
  node_pools_nodePoolsUpdate_1: nodePoolsUpdate_53,
  node_pools_nodePoolsList_1: nodePoolsList_54,
  node_pools_nodePoolsCreate_1: nodePoolsCreate_55,
  node_pools_nodePoolsRollback_1: nodePoolsRollback_56,
  node_pools_nodePoolsDelete_1: nodePoolsDelete_57,
  node_pools_nodePoolsGet_1: nodePoolsGet_58,
  wellknown_wellKnownGetOpenidConfiguration: wellKnownGetOpenidConfiguration_59,
  operations_operationsGet: operationsGet_60,
  operations_operationsCancel: operationsCancel_61,
  operations_operationsList: operationsList_62,
  operations_operationsCancel_1: operationsCancel_63,
  operations_operationsList_1: operationsList_64,
  operations_operationsGet_1: operationsGet_65,
  usable_subnetworks_usableSubnetworksList: usableSubnetworksList_66,
  zones_zonesGetServerconfig: zonesGetServerconfig_67,
  zones_zonesClusters: zonesClusters_68,
};
