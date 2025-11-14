import disksList_0 from "./disks/disksList";
import disksGet_1 from "./disks/disksGet";
import disksInsert_2 from "./disks/disksInsert";
import disksDelete_3 from "./disks/disksDelete";
import disksResize_4 from "./disks/disksResize";
import disksAggregatedList_5 from "./disks/disksAggregatedList";
import disksCreateSnapshot_6 from "./disks/disksCreateSnapshot";
import disksSetLabels_7 from "./disks/disksSetLabels";
import disksAddResourcePolicies_8 from "./disks/disksAddResourcePolicies";
import disksRemoveResourcePolicies_9 from "./disks/disksRemoveResourcePolicies";
import disksGetIamPolicy_10 from "./disks/disksGetIamPolicy";
import disksSetIamPolicy_11 from "./disks/disksSetIamPolicy";
import disksTestIamPermissions_12 from "./disks/disksTestIamPermissions";
import disksStartAsyncReplication_13 from "./disks/disksStartAsyncReplication";
import disksStopAsyncReplication_14 from "./disks/disksStopAsyncReplication";
import disksStopGroupAsyncReplication_15 from "./disks/disksStopGroupAsyncReplication";
import disksUpdate_16 from "./disks/disksUpdate";
import disksBulkInsert_17 from "./disks/disksBulkInsert";
import disksBulkSetLabels_18 from "./disks/disksBulkSetLabels";
import regionDisksList_19 from "./region_disks/regionDisksList";
import regionDisksGet_20 from "./region_disks/regionDisksGet";
import regionDisksInsert_21 from "./region_disks/regionDisksInsert";
import regionDisksDelete_22 from "./region_disks/regionDisksDelete";
import regionDisksResize_23 from "./region_disks/regionDisksResize";
import regionDisksCreateSnapshot_24 from "./region_disks/regionDisksCreateSnapshot";
import regionDisksSetLabels_25 from "./region_disks/regionDisksSetLabels";
import regionDisksAddResourcePolicies_26 from "./region_disks/regionDisksAddResourcePolicies";
import regionDisksRemoveResourcePolicies_27 from "./region_disks/regionDisksRemoveResourcePolicies";
import regionDisksGetIamPolicy_28 from "./region_disks/regionDisksGetIamPolicy";
import regionDisksSetIamPolicy_29 from "./region_disks/regionDisksSetIamPolicy";
import regionDisksTestIamPermissions_30 from "./region_disks/regionDisksTestIamPermissions";
import regionDisksStartAsyncReplication_31 from "./region_disks/regionDisksStartAsyncReplication";
import regionDisksStopAsyncReplication_32 from "./region_disks/regionDisksStopAsyncReplication";
import regionDisksStopGroupAsyncReplication_33 from "./region_disks/regionDisksStopGroupAsyncReplication";
import regionDisksUpdate_34 from "./region_disks/regionDisksUpdate";
import regionDisksBulkInsert_35 from "./region_disks/regionDisksBulkInsert";
import diskTypesList_36 from "./disk_types/diskTypesList";
import diskTypesGet_37 from "./disk_types/diskTypesGet";
import diskTypesAggregatedList_38 from "./disk_types/diskTypesAggregatedList";
import regionDiskTypesList_39 from "./region_disk_types/regionDiskTypesList";
import regionDiskTypesGet_40 from "./region_disk_types/regionDiskTypesGet";
import snapshotsList_41 from "./snapshots/snapshotsList";
import snapshotsGet_42 from "./snapshots/snapshotsGet";
import snapshotsInsert_43 from "./snapshots/snapshotsInsert";
import snapshotsDelete_44 from "./snapshots/snapshotsDelete";
import snapshotsSetLabels_45 from "./snapshots/snapshotsSetLabels";
import snapshotsGetIamPolicy_46 from "./snapshots/snapshotsGetIamPolicy";
import snapshotsSetIamPolicy_47 from "./snapshots/snapshotsSetIamPolicy";
import snapshotsTestIamPermissions_48 from "./snapshots/snapshotsTestIamPermissions";
import imagesList_49 from "./images/imagesList";
import imagesGet_50 from "./images/imagesGet";
import imagesInsert_51 from "./images/imagesInsert";
import imagesDelete_52 from "./images/imagesDelete";
import imagesDeprecate_53 from "./images/imagesDeprecate";
import imagesSetLabels_54 from "./images/imagesSetLabels";
import imagesPatch_55 from "./images/imagesPatch";
import imagesGetFromFamily_56 from "./images/imagesGetFromFamily";
import imagesGetIamPolicy_57 from "./images/imagesGetIamPolicy";
import imagesSetIamPolicy_58 from "./images/imagesSetIamPolicy";
import imagesTestIamPermissions_59 from "./images/imagesTestIamPermissions";
import storagePoolsList_60 from "./storage_pools/storagePoolsList";
import storagePoolsGet_61 from "./storage_pools/storagePoolsGet";
import storagePoolsInsert_62 from "./storage_pools/storagePoolsInsert";
import storagePoolsDelete_63 from "./storage_pools/storagePoolsDelete";
import storagePoolsUpdate_64 from "./storage_pools/storagePoolsUpdate";
import storagePoolsAggregatedList_65 from "./storage_pools/storagePoolsAggregatedList";
import storagePoolsGetIamPolicy_66 from "./storage_pools/storagePoolsGetIamPolicy";
import storagePoolsSetIamPolicy_67 from "./storage_pools/storagePoolsSetIamPolicy";
import storagePoolsTestIamPermissions_68 from "./storage_pools/storagePoolsTestIamPermissions";
import storagePoolsListDisks_69 from "./storage_pools/storagePoolsListDisks";
import resourcePoliciesList_70 from "./resource_policies/resourcePoliciesList";
import resourcePoliciesGet_71 from "./resource_policies/resourcePoliciesGet";
import resourcePoliciesInsert_72 from "./resource_policies/resourcePoliciesInsert";
import resourcePoliciesDelete_73 from "./resource_policies/resourcePoliciesDelete";
import resourcePoliciesPatch_74 from "./resource_policies/resourcePoliciesPatch";
import resourcePoliciesAggregatedList_75 from "./resource_policies/resourcePoliciesAggregatedList";
import resourcePoliciesGetIamPolicy_76 from "./resource_policies/resourcePoliciesGetIamPolicy";
import resourcePoliciesSetIamPolicy_77 from "./resource_policies/resourcePoliciesSetIamPolicy";
import resourcePoliciesTestIamPermissions_78 from "./resource_policies/resourcePoliciesTestIamPermissions";
import regionOperationsList_79 from "./region_operations/regionOperationsList";
import regionOperationsGet_80 from "./region_operations/regionOperationsGet";
import regionOperationsDelete_81 from "./region_operations/regionOperationsDelete";
import regionOperationsWait_82 from "./region_operations/regionOperationsWait";

export const blocks = {
  disks_disksList: disksList_0,
  disks_disksGet: disksGet_1,
  disks_disksInsert: disksInsert_2,
  disks_disksDelete: disksDelete_3,
  disks_disksResize: disksResize_4,
  disks_disksAggregatedList: disksAggregatedList_5,
  disks_disksCreateSnapshot: disksCreateSnapshot_6,
  disks_disksSetLabels: disksSetLabels_7,
  disks_disksAddResourcePolicies: disksAddResourcePolicies_8,
  disks_disksRemoveResourcePolicies: disksRemoveResourcePolicies_9,
  disks_disksGetIamPolicy: disksGetIamPolicy_10,
  disks_disksSetIamPolicy: disksSetIamPolicy_11,
  disks_disksTestIamPermissions: disksTestIamPermissions_12,
  disks_disksStartAsyncReplication: disksStartAsyncReplication_13,
  disks_disksStopAsyncReplication: disksStopAsyncReplication_14,
  disks_disksStopGroupAsyncReplication: disksStopGroupAsyncReplication_15,
  disks_disksUpdate: disksUpdate_16,
  disks_disksBulkInsert: disksBulkInsert_17,
  disks_disksBulkSetLabels: disksBulkSetLabels_18,
  region_disks_regionDisksList: regionDisksList_19,
  region_disks_regionDisksGet: regionDisksGet_20,
  region_disks_regionDisksInsert: regionDisksInsert_21,
  region_disks_regionDisksDelete: regionDisksDelete_22,
  region_disks_regionDisksResize: regionDisksResize_23,
  region_disks_regionDisksCreateSnapshot: regionDisksCreateSnapshot_24,
  region_disks_regionDisksSetLabels: regionDisksSetLabels_25,
  region_disks_regionDisksAddResourcePolicies:
    regionDisksAddResourcePolicies_26,
  region_disks_regionDisksRemoveResourcePolicies:
    regionDisksRemoveResourcePolicies_27,
  region_disks_regionDisksGetIamPolicy: regionDisksGetIamPolicy_28,
  region_disks_regionDisksSetIamPolicy: regionDisksSetIamPolicy_29,
  region_disks_regionDisksTestIamPermissions: regionDisksTestIamPermissions_30,
  region_disks_regionDisksStartAsyncReplication:
    regionDisksStartAsyncReplication_31,
  region_disks_regionDisksStopAsyncReplication:
    regionDisksStopAsyncReplication_32,
  region_disks_regionDisksStopGroupAsyncReplication:
    regionDisksStopGroupAsyncReplication_33,
  region_disks_regionDisksUpdate: regionDisksUpdate_34,
  region_disks_regionDisksBulkInsert: regionDisksBulkInsert_35,
  disk_types_diskTypesList: diskTypesList_36,
  disk_types_diskTypesGet: diskTypesGet_37,
  disk_types_diskTypesAggregatedList: diskTypesAggregatedList_38,
  region_disk_types_regionDiskTypesList: regionDiskTypesList_39,
  region_disk_types_regionDiskTypesGet: regionDiskTypesGet_40,
  snapshots_snapshotsList: snapshotsList_41,
  snapshots_snapshotsGet: snapshotsGet_42,
  snapshots_snapshotsInsert: snapshotsInsert_43,
  snapshots_snapshotsDelete: snapshotsDelete_44,
  snapshots_snapshotsSetLabels: snapshotsSetLabels_45,
  snapshots_snapshotsGetIamPolicy: snapshotsGetIamPolicy_46,
  snapshots_snapshotsSetIamPolicy: snapshotsSetIamPolicy_47,
  snapshots_snapshotsTestIamPermissions: snapshotsTestIamPermissions_48,
  images_imagesList: imagesList_49,
  images_imagesGet: imagesGet_50,
  images_imagesInsert: imagesInsert_51,
  images_imagesDelete: imagesDelete_52,
  images_imagesDeprecate: imagesDeprecate_53,
  images_imagesSetLabels: imagesSetLabels_54,
  images_imagesPatch: imagesPatch_55,
  images_imagesGetFromFamily: imagesGetFromFamily_56,
  images_imagesGetIamPolicy: imagesGetIamPolicy_57,
  images_imagesSetIamPolicy: imagesSetIamPolicy_58,
  images_imagesTestIamPermissions: imagesTestIamPermissions_59,
  storage_pools_storagePoolsList: storagePoolsList_60,
  storage_pools_storagePoolsGet: storagePoolsGet_61,
  storage_pools_storagePoolsInsert: storagePoolsInsert_62,
  storage_pools_storagePoolsDelete: storagePoolsDelete_63,
  storage_pools_storagePoolsUpdate: storagePoolsUpdate_64,
  storage_pools_storagePoolsAggregatedList: storagePoolsAggregatedList_65,
  storage_pools_storagePoolsGetIamPolicy: storagePoolsGetIamPolicy_66,
  storage_pools_storagePoolsSetIamPolicy: storagePoolsSetIamPolicy_67,
  storage_pools_storagePoolsTestIamPermissions:
    storagePoolsTestIamPermissions_68,
  storage_pools_storagePoolsListDisks: storagePoolsListDisks_69,
  resource_policies_resourcePoliciesList: resourcePoliciesList_70,
  resource_policies_resourcePoliciesGet: resourcePoliciesGet_71,
  resource_policies_resourcePoliciesInsert: resourcePoliciesInsert_72,
  resource_policies_resourcePoliciesDelete: resourcePoliciesDelete_73,
  resource_policies_resourcePoliciesPatch: resourcePoliciesPatch_74,
  resource_policies_resourcePoliciesAggregatedList:
    resourcePoliciesAggregatedList_75,
  resource_policies_resourcePoliciesGetIamPolicy:
    resourcePoliciesGetIamPolicy_76,
  resource_policies_resourcePoliciesSetIamPolicy:
    resourcePoliciesSetIamPolicy_77,
  resource_policies_resourcePoliciesTestIamPermissions:
    resourcePoliciesTestIamPermissions_78,
  region_operations_regionOperationsList: regionOperationsList_79,
  region_operations_regionOperationsGet: regionOperationsGet_80,
  region_operations_regionOperationsDelete: regionOperationsDelete_81,
  region_operations_regionOperationsWait: regionOperationsWait_82,
};
