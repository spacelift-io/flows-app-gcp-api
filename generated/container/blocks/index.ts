import locationsGetServerConfig from "./locations/locationsGetServerConfig";
import locationsClustersSetMonitoring from "./locations/locationsClustersSetMonitoring";
import locationsClustersSetLogging from "./locations/locationsClustersSetLogging";
import locationsClustersFetchClusterUpgradeInfo from "./locations/locationsClustersFetchClusterUpgradeInfo";
import locationsClustersGet from "./locations/locationsClustersGet";
import locationsClustersSetLegacyAbac from "./locations/locationsClustersSetLegacyAbac";
import locationsClustersCreate from "./locations/locationsClustersCreate";
import locationsClustersUpdate from "./locations/locationsClustersUpdate";
import locationsClustersList from "./locations/locationsClustersList";
import locationsClustersUpdateMaster from "./locations/locationsClustersUpdateMaster";
import locationsClustersGetJwks from "./locations/locationsClustersGetJwks";
import locationsClustersSetMaintenancePolicy from "./locations/locationsClustersSetMaintenancePolicy";
import locationsClustersSetMasterAuth from "./locations/locationsClustersSetMasterAuth";
import locationsClustersCompleteIpRotation from "./locations/locationsClustersCompleteIpRotation";
import locationsClustersSetNetworkPolicy from "./locations/locationsClustersSetNetworkPolicy";
import locationsClustersCheckAutopilotCompatibility from "./locations/locationsClustersCheckAutopilotCompatibility";
import locationsClustersSetLocations from "./locations/locationsClustersSetLocations";
import locationsClustersDelete from "./locations/locationsClustersDelete";
import locationsClustersStartIpRotation from "./locations/locationsClustersStartIpRotation";
import locationsClustersSetResourceLabels from "./locations/locationsClustersSetResourceLabels";
import locationsClustersSetAddons from "./locations/locationsClustersSetAddons";
import locationsClustersNodePoolsCompleteUpgrade from "./locations/locationsClustersNodePoolsCompleteUpgrade";
import locationsClustersNodePoolsList from "./locations/locationsClustersNodePoolsList";
import locationsClustersNodePoolsGet from "./locations/locationsClustersNodePoolsGet";
import locationsClustersNodePoolsSetManagement from "./locations/locationsClustersNodePoolsSetManagement";
import locationsClustersNodePoolsFetchNodePoolUpgradeInfo from "./locations/locationsClustersNodePoolsFetchNodePoolUpgradeInfo";
import locationsClustersNodePoolsUpdate from "./locations/locationsClustersNodePoolsUpdate";
import locationsClustersNodePoolsRollback from "./locations/locationsClustersNodePoolsRollback";
import locationsClustersNodePoolsSetSize from "./locations/locationsClustersNodePoolsSetSize";
import locationsClustersNodePoolsDelete from "./locations/locationsClustersNodePoolsDelete";
import locationsClustersNodePoolsCreate from "./locations/locationsClustersNodePoolsCreate";
import locationsClustersNodePoolsSetAutoscaling from "./locations/locationsClustersNodePoolsSetAutoscaling";
import locationsClustersWellKnownGetOpenidConfiguration from "./locations/locationsClustersWellKnownGetOpenidConfiguration";
import locationsOperationsGet from "./locations/locationsOperationsGet";
import locationsOperationsCancel from "./locations/locationsOperationsCancel";
import locationsOperationsList from "./locations/locationsOperationsList";
import aggregatedUsableSubnetworksList from "./aggregated/aggregatedUsableSubnetworksList";
import zonesGetServerconfig from "./zones/zonesGetServerconfig";
import zonesClustersMonitoring from "./zones/zonesClustersMonitoring";
import zonesClustersSetMaintenancePolicy from "./zones/zonesClustersSetMaintenancePolicy";
import zonesClustersCompleteIpRotation from "./zones/zonesClustersCompleteIpRotation";
import zonesClustersLogging from "./zones/zonesClustersLogging";
import zonesClustersAddons from "./zones/zonesClustersAddons";
import zonesClustersResourceLabels from "./zones/zonesClustersResourceLabels";
import zonesClustersSetNetworkPolicy from "./zones/zonesClustersSetNetworkPolicy";
import zonesClustersFetchClusterUpgradeInfo from "./zones/zonesClustersFetchClusterUpgradeInfo";
import zonesClustersCreate from "./zones/zonesClustersCreate";
import zonesClustersSetMasterAuth from "./zones/zonesClustersSetMasterAuth";
import zonesClustersLocations from "./zones/zonesClustersLocations";
import zonesClustersList from "./zones/zonesClustersList";
import zonesClustersUpdate from "./zones/zonesClustersUpdate";
import zonesClustersDelete from "./zones/zonesClustersDelete";
import zonesClustersLegacyAbac from "./zones/zonesClustersLegacyAbac";
import zonesClustersStartIpRotation from "./zones/zonesClustersStartIpRotation";
import zonesClustersMaster from "./zones/zonesClustersMaster";
import zonesClustersGet from "./zones/zonesClustersGet";
import zonesClustersNodePoolsSetSize from "./zones/zonesClustersNodePoolsSetSize";
import zonesClustersNodePoolsFetchNodePoolUpgradeInfo from "./zones/zonesClustersNodePoolsFetchNodePoolUpgradeInfo";
import zonesClustersNodePoolsAutoscaling from "./zones/zonesClustersNodePoolsAutoscaling";
import zonesClustersNodePoolsSetManagement from "./zones/zonesClustersNodePoolsSetManagement";
import zonesClustersNodePoolsUpdate from "./zones/zonesClustersNodePoolsUpdate";
import zonesClustersNodePoolsList from "./zones/zonesClustersNodePoolsList";
import zonesClustersNodePoolsCreate from "./zones/zonesClustersNodePoolsCreate";
import zonesClustersNodePoolsRollback from "./zones/zonesClustersNodePoolsRollback";
import zonesClustersNodePoolsDelete from "./zones/zonesClustersNodePoolsDelete";
import zonesClustersNodePoolsGet from "./zones/zonesClustersNodePoolsGet";
import zonesOperationsCancel from "./zones/zonesOperationsCancel";
import zonesOperationsList from "./zones/zonesOperationsList";
import zonesOperationsGet from "./zones/zonesOperationsGet";

export const blocks = {
  locationsGetServerConfig,
  locationsClustersSetMonitoring,
  locationsClustersSetLogging,
  locationsClustersFetchClusterUpgradeInfo,
  locationsClustersGet,
  locationsClustersSetLegacyAbac,
  locationsClustersCreate,
  locationsClustersUpdate,
  locationsClustersList,
  locationsClustersUpdateMaster,
  locationsClustersGetJwks,
  locationsClustersSetMaintenancePolicy,
  locationsClustersSetMasterAuth,
  locationsClustersCompleteIpRotation,
  locationsClustersSetNetworkPolicy,
  locationsClustersCheckAutopilotCompatibility,
  locationsClustersSetLocations,
  locationsClustersDelete,
  locationsClustersStartIpRotation,
  locationsClustersSetResourceLabels,
  locationsClustersSetAddons,
  locationsClustersNodePoolsCompleteUpgrade,
  locationsClustersNodePoolsList,
  locationsClustersNodePoolsGet,
  locationsClustersNodePoolsSetManagement,
  locationsClustersNodePoolsFetchNodePoolUpgradeInfo,
  locationsClustersNodePoolsUpdate,
  locationsClustersNodePoolsRollback,
  locationsClustersNodePoolsSetSize,
  locationsClustersNodePoolsDelete,
  locationsClustersNodePoolsCreate,
  locationsClustersNodePoolsSetAutoscaling,
  locationsClustersWellKnownGetOpenidConfiguration,
  locationsOperationsGet,
  locationsOperationsCancel,
  locationsOperationsList,
  aggregatedUsableSubnetworksList,
  zonesGetServerconfig,
  zonesClustersMonitoring,
  zonesClustersSetMaintenancePolicy,
  zonesClustersCompleteIpRotation,
  zonesClustersLogging,
  zonesClustersAddons,
  zonesClustersResourceLabels,
  zonesClustersSetNetworkPolicy,
  zonesClustersFetchClusterUpgradeInfo,
  zonesClustersCreate,
  zonesClustersSetMasterAuth,
  zonesClustersLocations,
  zonesClustersList,
  zonesClustersUpdate,
  zonesClustersDelete,
  zonesClustersLegacyAbac,
  zonesClustersStartIpRotation,
  zonesClustersMaster,
  zonesClustersGet,
  zonesClustersNodePoolsSetSize,
  zonesClustersNodePoolsFetchNodePoolUpgradeInfo,
  zonesClustersNodePoolsAutoscaling,
  zonesClustersNodePoolsSetManagement,
  zonesClustersNodePoolsUpdate,
  zonesClustersNodePoolsList,
  zonesClustersNodePoolsCreate,
  zonesClustersNodePoolsRollback,
  zonesClustersNodePoolsDelete,
  zonesClustersNodePoolsGet,
  zonesOperationsCancel,
  zonesOperationsList,
  zonesOperationsGet,
};
