import disksList from "./disks/disksList";
import disksGet from "./disks/disksGet";
import disksInsert from "./disks/disksInsert";
import disksDelete from "./disks/disksDelete";
import disksResize from "./disks/disksResize";
import disksAggregatedList from "./disks/disksAggregatedList";
import disksCreateSnapshot from "./disks/disksCreateSnapshot";
import disksSetLabels from "./disks/disksSetLabels";
import disksAddResourcePolicies from "./disks/disksAddResourcePolicies";
import disksRemoveResourcePolicies from "./disks/disksRemoveResourcePolicies";
import disksGetIamPolicy from "./disks/disksGetIamPolicy";
import disksSetIamPolicy from "./disks/disksSetIamPolicy";
import disksTestIamPermissions from "./disks/disksTestIamPermissions";
import disksStartAsyncReplication from "./disks/disksStartAsyncReplication";
import disksStopAsyncReplication from "./disks/disksStopAsyncReplication";
import disksStopGroupAsyncReplication from "./disks/disksStopGroupAsyncReplication";
import disksUpdate from "./disks/disksUpdate";
import disksBulkInsert from "./disks/disksBulkInsert";
import disksBulkSetLabels from "./disks/disksBulkSetLabels";
import regionDisksList from "./region_disks/regionDisksList";
import regionDisksGet from "./region_disks/regionDisksGet";
import regionDisksInsert from "./region_disks/regionDisksInsert";
import regionDisksDelete from "./region_disks/regionDisksDelete";
import regionDisksResize from "./region_disks/regionDisksResize";
import regionDisksCreateSnapshot from "./region_disks/regionDisksCreateSnapshot";
import regionDisksSetLabels from "./region_disks/regionDisksSetLabels";
import regionDisksAddResourcePolicies from "./region_disks/regionDisksAddResourcePolicies";
import regionDisksRemoveResourcePolicies from "./region_disks/regionDisksRemoveResourcePolicies";
import regionDisksGetIamPolicy from "./region_disks/regionDisksGetIamPolicy";
import regionDisksSetIamPolicy from "./region_disks/regionDisksSetIamPolicy";
import regionDisksTestIamPermissions from "./region_disks/regionDisksTestIamPermissions";
import regionDisksStartAsyncReplication from "./region_disks/regionDisksStartAsyncReplication";
import regionDisksStopAsyncReplication from "./region_disks/regionDisksStopAsyncReplication";
import regionDisksStopGroupAsyncReplication from "./region_disks/regionDisksStopGroupAsyncReplication";
import regionDisksUpdate from "./region_disks/regionDisksUpdate";
import regionDisksBulkInsert from "./region_disks/regionDisksBulkInsert";
import diskTypesList from "./disk_types/diskTypesList";
import diskTypesGet from "./disk_types/diskTypesGet";
import diskTypesAggregatedList from "./disk_types/diskTypesAggregatedList";
import regionDiskTypesList from "./region_disk_types/regionDiskTypesList";
import regionDiskTypesGet from "./region_disk_types/regionDiskTypesGet";
import snapshotsList from "./snapshots/snapshotsList";
import snapshotsGet from "./snapshots/snapshotsGet";
import snapshotsInsert from "./snapshots/snapshotsInsert";
import snapshotsDelete from "./snapshots/snapshotsDelete";
import snapshotsSetLabels from "./snapshots/snapshotsSetLabels";
import snapshotsGetIamPolicy from "./snapshots/snapshotsGetIamPolicy";
import snapshotsSetIamPolicy from "./snapshots/snapshotsSetIamPolicy";
import snapshotsTestIamPermissions from "./snapshots/snapshotsTestIamPermissions";
import imagesList from "./images/imagesList";
import imagesGet from "./images/imagesGet";
import imagesInsert from "./images/imagesInsert";
import imagesDelete from "./images/imagesDelete";
import imagesDeprecate from "./images/imagesDeprecate";
import imagesSetLabels from "./images/imagesSetLabels";
import imagesPatch from "./images/imagesPatch";
import imagesGetFromFamily from "./images/imagesGetFromFamily";
import imagesGetIamPolicy from "./images/imagesGetIamPolicy";
import imagesSetIamPolicy from "./images/imagesSetIamPolicy";
import imagesTestIamPermissions from "./images/imagesTestIamPermissions";
import storagePoolsList from "./storage_pools/storagePoolsList";
import storagePoolsGet from "./storage_pools/storagePoolsGet";
import storagePoolsInsert from "./storage_pools/storagePoolsInsert";
import storagePoolsDelete from "./storage_pools/storagePoolsDelete";
import storagePoolsUpdate from "./storage_pools/storagePoolsUpdate";
import storagePoolsAggregatedList from "./storage_pools/storagePoolsAggregatedList";
import storagePoolsGetIamPolicy from "./storage_pools/storagePoolsGetIamPolicy";
import storagePoolsSetIamPolicy from "./storage_pools/storagePoolsSetIamPolicy";
import storagePoolsTestIamPermissions from "./storage_pools/storagePoolsTestIamPermissions";
import storagePoolsListDisks from "./storage_pools/storagePoolsListDisks";
import resourcePoliciesList from "./resource_policies/resourcePoliciesList";
import resourcePoliciesGet from "./resource_policies/resourcePoliciesGet";
import resourcePoliciesInsert from "./resource_policies/resourcePoliciesInsert";
import resourcePoliciesDelete from "./resource_policies/resourcePoliciesDelete";
import resourcePoliciesPatch from "./resource_policies/resourcePoliciesPatch";
import resourcePoliciesAggregatedList from "./resource_policies/resourcePoliciesAggregatedList";
import resourcePoliciesGetIamPolicy from "./resource_policies/resourcePoliciesGetIamPolicy";
import resourcePoliciesSetIamPolicy from "./resource_policies/resourcePoliciesSetIamPolicy";
import resourcePoliciesTestIamPermissions from "./resource_policies/resourcePoliciesTestIamPermissions";
import regionOperationsList from "./region_operations/regionOperationsList";
import regionOperationsGet from "./region_operations/regionOperationsGet";
import regionOperationsDelete from "./region_operations/regionOperationsDelete";
import regionOperationsWait from "./region_operations/regionOperationsWait";

export const blocks = {
  disksList,
  disksGet,
  disksInsert,
  disksDelete,
  disksResize,
  disksAggregatedList,
  disksCreateSnapshot,
  disksSetLabels,
  disksAddResourcePolicies,
  disksRemoveResourcePolicies,
  disksGetIamPolicy,
  disksSetIamPolicy,
  disksTestIamPermissions,
  disksStartAsyncReplication,
  disksStopAsyncReplication,
  disksStopGroupAsyncReplication,
  disksUpdate,
  disksBulkInsert,
  disksBulkSetLabels,
  regionDisksList,
  regionDisksGet,
  regionDisksInsert,
  regionDisksDelete,
  regionDisksResize,
  regionDisksCreateSnapshot,
  regionDisksSetLabels,
  regionDisksAddResourcePolicies,
  regionDisksRemoveResourcePolicies,
  regionDisksGetIamPolicy,
  regionDisksSetIamPolicy,
  regionDisksTestIamPermissions,
  regionDisksStartAsyncReplication,
  regionDisksStopAsyncReplication,
  regionDisksStopGroupAsyncReplication,
  regionDisksUpdate,
  regionDisksBulkInsert,
  diskTypesList,
  diskTypesGet,
  diskTypesAggregatedList,
  regionDiskTypesList,
  regionDiskTypesGet,
  snapshotsList,
  snapshotsGet,
  snapshotsInsert,
  snapshotsDelete,
  snapshotsSetLabels,
  snapshotsGetIamPolicy,
  snapshotsSetIamPolicy,
  snapshotsTestIamPermissions,
  imagesList,
  imagesGet,
  imagesInsert,
  imagesDelete,
  imagesDeprecate,
  imagesSetLabels,
  imagesPatch,
  imagesGetFromFamily,
  imagesGetIamPolicy,
  imagesSetIamPolicy,
  imagesTestIamPermissions,
  storagePoolsList,
  storagePoolsGet,
  storagePoolsInsert,
  storagePoolsDelete,
  storagePoolsUpdate,
  storagePoolsAggregatedList,
  storagePoolsGetIamPolicy,
  storagePoolsSetIamPolicy,
  storagePoolsTestIamPermissions,
  storagePoolsListDisks,
  resourcePoliciesList,
  resourcePoliciesGet,
  resourcePoliciesInsert,
  resourcePoliciesDelete,
  resourcePoliciesPatch,
  resourcePoliciesAggregatedList,
  resourcePoliciesGetIamPolicy,
  resourcePoliciesSetIamPolicy,
  resourcePoliciesTestIamPermissions,
  regionOperationsList,
  regionOperationsGet,
  regionOperationsDelete,
  regionOperationsWait,
};
