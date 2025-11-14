import instancesList from "./instances/instancesList";
import instancesGet from "./instances/instancesGet";
import instancesInsert from "./instances/instancesInsert";
import instancesDelete from "./instances/instancesDelete";
import instancesStart from "./instances/instancesStart";
import instancesStop from "./instances/instancesStop";
import instancesReset from "./instances/instancesReset";
import instancesSuspend from "./instances/instancesSuspend";
import instancesResume from "./instances/instancesResume";
import instancesAggregatedList from "./instances/instancesAggregatedList";
import instancesAttachDisk from "./instances/instancesAttachDisk";
import instancesDetachDisk from "./instances/instancesDetachDisk";
import instancesSetDiskAutoDelete from "./instances/instancesSetDiskAutoDelete";
import instancesSetLabels from "./instances/instancesSetLabels";
import instancesSetMachineType from "./instances/instancesSetMachineType";
import instancesSetMetadata from "./instances/instancesSetMetadata";
import instancesSetScheduling from "./instances/instancesSetScheduling";
import instancesSetServiceAccount from "./instances/instancesSetServiceAccount";
import instancesSetTags from "./instances/instancesSetTags";
import instancesUpdateAccessConfig from "./instances/instancesUpdateAccessConfig";
import instancesUpdateNetworkInterface from "./instances/instancesUpdateNetworkInterface";
import instancesAddAccessConfig from "./instances/instancesAddAccessConfig";
import instancesDeleteAccessConfig from "./instances/instancesDeleteAccessConfig";
import instancesAddNetworkInterface from "./instances/instancesAddNetworkInterface";
import instancesDeleteNetworkInterface from "./instances/instancesDeleteNetworkInterface";
import instancesUpdateShieldedInstanceConfig from "./instances/instancesUpdateShieldedInstanceConfig";
import instancesSetShieldedInstanceIntegrityPolicy from "./instances/instancesSetShieldedInstanceIntegrityPolicy";
import instancesGetShieldedInstanceIdentity from "./instances/instancesGetShieldedInstanceIdentity";
import instancesGetSerialPortOutput from "./instances/instancesGetSerialPortOutput";
import instancesGetScreenshot from "./instances/instancesGetScreenshot";
import instancesGetGuestAttributes from "./instances/instancesGetGuestAttributes";
import instancesSetDeletionProtection from "./instances/instancesSetDeletionProtection";
import instancesSetMachineResources from "./instances/instancesSetMachineResources";
import instancesSetMinCpuPlatform from "./instances/instancesSetMinCpuPlatform";
import instancesSetName from "./instances/instancesSetName";
import instancesSetSecurityPolicy from "./instances/instancesSetSecurityPolicy";
import instancesPerformMaintenance from "./instances/instancesPerformMaintenance";
import instancesRemoveResourcePolicies from "./instances/instancesRemoveResourcePolicies";
import instancesAddResourcePolicies from "./instances/instancesAddResourcePolicies";
import instancesGetIamPolicy from "./instances/instancesGetIamPolicy";
import instancesSetIamPolicy from "./instances/instancesSetIamPolicy";
import instancesTestIamPermissions from "./instances/instancesTestIamPermissions";
import instancesGetEffectiveFirewalls from "./instances/instancesGetEffectiveFirewalls";
import instancesBulkInsert from "./instances/instancesBulkInsert";
import instancesSendDiagnosticInterrupt from "./instances/instancesSendDiagnosticInterrupt";
import instancesSimulateMaintenanceEvent from "./instances/instancesSimulateMaintenanceEvent";
import instancesUpdateDisplayDevice from "./instances/instancesUpdateDisplayDevice";
import instanceGroupsList from "./instance_groups/instanceGroupsList";
import instanceGroupsGet from "./instance_groups/instanceGroupsGet";
import instanceGroupsInsert from "./instance_groups/instanceGroupsInsert";
import instanceGroupsDelete from "./instance_groups/instanceGroupsDelete";
import instanceGroupsAggregatedList from "./instance_groups/instanceGroupsAggregatedList";
import instanceGroupsAddInstances from "./instance_groups/instanceGroupsAddInstances";
import instanceGroupsRemoveInstances from "./instance_groups/instanceGroupsRemoveInstances";
import instanceGroupsListInstances from "./instance_groups/instanceGroupsListInstances";
import instanceGroupsSetNamedPorts from "./instance_groups/instanceGroupsSetNamedPorts";
import instanceGroupManagersList from "./instance_group_managers/instanceGroupManagersList";
import instanceGroupManagersGet from "./instance_group_managers/instanceGroupManagersGet";
import instanceGroupManagersInsert from "./instance_group_managers/instanceGroupManagersInsert";
import instanceGroupManagersDelete from "./instance_group_managers/instanceGroupManagersDelete";
import instanceGroupManagersPatch from "./instance_group_managers/instanceGroupManagersPatch";
import instanceGroupManagersAggregatedList from "./instance_group_managers/instanceGroupManagersAggregatedList";
import instanceGroupManagersAbandonInstances from "./instance_group_managers/instanceGroupManagersAbandonInstances";
import instanceGroupManagersApplyUpdatesToInstances from "./instance_group_managers/instanceGroupManagersApplyUpdatesToInstances";
import instanceGroupManagersCreateInstances from "./instance_group_managers/instanceGroupManagersCreateInstances";
import instanceGroupManagersDeleteInstances from "./instance_group_managers/instanceGroupManagersDeleteInstances";
import instanceGroupManagersDeletePerInstanceConfigs from "./instance_group_managers/instanceGroupManagersDeletePerInstanceConfigs";
import instanceGroupManagersListErrors from "./instance_group_managers/instanceGroupManagersListErrors";
import instanceGroupManagersListManagedInstances from "./instance_group_managers/instanceGroupManagersListManagedInstances";
import instanceGroupManagersListPerInstanceConfigs from "./instance_group_managers/instanceGroupManagersListPerInstanceConfigs";
import instanceGroupManagersPatchPerInstanceConfigs from "./instance_group_managers/instanceGroupManagersPatchPerInstanceConfigs";
import instanceGroupManagersRecreateInstances from "./instance_group_managers/instanceGroupManagersRecreateInstances";
import instanceGroupManagersResize from "./instance_group_managers/instanceGroupManagersResize";
import instanceGroupManagersSetInstanceTemplate from "./instance_group_managers/instanceGroupManagersSetInstanceTemplate";
import instanceGroupManagersSetTargetPools from "./instance_group_managers/instanceGroupManagersSetTargetPools";
import instanceGroupManagersUpdatePerInstanceConfigs from "./instance_group_managers/instanceGroupManagersUpdatePerInstanceConfigs";
import instanceTemplatesList from "./instance_templates/instanceTemplatesList";
import instanceTemplatesGet from "./instance_templates/instanceTemplatesGet";
import instanceTemplatesInsert from "./instance_templates/instanceTemplatesInsert";
import instanceTemplatesDelete from "./instance_templates/instanceTemplatesDelete";
import instanceTemplatesAggregatedList from "./instance_templates/instanceTemplatesAggregatedList";
import instanceTemplatesGetIamPolicy from "./instance_templates/instanceTemplatesGetIamPolicy";
import instanceTemplatesSetIamPolicy from "./instance_templates/instanceTemplatesSetIamPolicy";
import instanceTemplatesTestIamPermissions from "./instance_templates/instanceTemplatesTestIamPermissions";
import machineTypesList from "./machine_types/machineTypesList";
import machineTypesGet from "./machine_types/machineTypesGet";
import machineTypesAggregatedList from "./machine_types/machineTypesAggregatedList";
import machineImagesList from "./machine_images/machineImagesList";
import machineImagesGet from "./machine_images/machineImagesGet";
import machineImagesInsert from "./machine_images/machineImagesInsert";
import machineImagesDelete from "./machine_images/machineImagesDelete";
import machineImagesGetIamPolicy from "./machine_images/machineImagesGetIamPolicy";
import machineImagesSetIamPolicy from "./machine_images/machineImagesSetIamPolicy";
import machineImagesTestIamPermissions from "./machine_images/machineImagesTestIamPermissions";
import zoneOperationsList from "./zone_operations/zoneOperationsList";
import zoneOperationsGet from "./zone_operations/zoneOperationsGet";
import zoneOperationsDelete from "./zone_operations/zoneOperationsDelete";
import zoneOperationsWait from "./zone_operations/zoneOperationsWait";
import regionInstanceGroupsList from "./region_instance_groups/regionInstanceGroupsList";
import regionInstanceGroupsGet from "./region_instance_groups/regionInstanceGroupsGet";
import regionInstanceGroupsSetNamedPorts from "./region_instance_groups/regionInstanceGroupsSetNamedPorts";
import regionInstanceGroupsListInstances from "./region_instance_groups/regionInstanceGroupsListInstances";
import regionInstanceGroupManagersList from "./region_instance_group_managers/regionInstanceGroupManagersList";
import regionInstanceGroupManagersGet from "./region_instance_group_managers/regionInstanceGroupManagersGet";
import regionInstanceGroupManagersInsert from "./region_instance_group_managers/regionInstanceGroupManagersInsert";
import regionInstanceGroupManagersDelete from "./region_instance_group_managers/regionInstanceGroupManagersDelete";
import regionInstanceGroupManagersPatch from "./region_instance_group_managers/regionInstanceGroupManagersPatch";
import regionInstanceGroupManagersAbandonInstances from "./region_instance_group_managers/regionInstanceGroupManagersAbandonInstances";
import regionInstanceGroupManagersApplyUpdatesToInstances from "./region_instance_group_managers/regionInstanceGroupManagersApplyUpdatesToInstances";
import regionInstanceGroupManagersCreateInstances from "./region_instance_group_managers/regionInstanceGroupManagersCreateInstances";
import regionInstanceGroupManagersDeleteInstances from "./region_instance_group_managers/regionInstanceGroupManagersDeleteInstances";
import regionInstanceGroupManagersDeletePerInstanceConfigs from "./region_instance_group_managers/regionInstanceGroupManagersDeletePerInstanceConfigs";
import regionInstanceGroupManagersListErrors from "./region_instance_group_managers/regionInstanceGroupManagersListErrors";
import regionInstanceGroupManagersListManagedInstances from "./region_instance_group_managers/regionInstanceGroupManagersListManagedInstances";
import regionInstanceGroupManagersListPerInstanceConfigs from "./region_instance_group_managers/regionInstanceGroupManagersListPerInstanceConfigs";
import regionInstanceGroupManagersPatchPerInstanceConfigs from "./region_instance_group_managers/regionInstanceGroupManagersPatchPerInstanceConfigs";
import regionInstanceGroupManagersRecreateInstances from "./region_instance_group_managers/regionInstanceGroupManagersRecreateInstances";
import regionInstanceGroupManagersResize from "./region_instance_group_managers/regionInstanceGroupManagersResize";
import regionInstanceGroupManagersSetInstanceTemplate from "./region_instance_group_managers/regionInstanceGroupManagersSetInstanceTemplate";
import regionInstanceGroupManagersSetTargetPools from "./region_instance_group_managers/regionInstanceGroupManagersSetTargetPools";
import regionInstanceGroupManagersUpdatePerInstanceConfigs from "./region_instance_group_managers/regionInstanceGroupManagersUpdatePerInstanceConfigs";

export const blocks = {
  instancesList,
  instancesGet,
  instancesInsert,
  instancesDelete,
  instancesStart,
  instancesStop,
  instancesReset,
  instancesSuspend,
  instancesResume,
  instancesAggregatedList,
  instancesAttachDisk,
  instancesDetachDisk,
  instancesSetDiskAutoDelete,
  instancesSetLabels,
  instancesSetMachineType,
  instancesSetMetadata,
  instancesSetScheduling,
  instancesSetServiceAccount,
  instancesSetTags,
  instancesUpdateAccessConfig,
  instancesUpdateNetworkInterface,
  instancesAddAccessConfig,
  instancesDeleteAccessConfig,
  instancesAddNetworkInterface,
  instancesDeleteNetworkInterface,
  instancesUpdateShieldedInstanceConfig,
  instancesSetShieldedInstanceIntegrityPolicy,
  instancesGetShieldedInstanceIdentity,
  instancesGetSerialPortOutput,
  instancesGetScreenshot,
  instancesGetGuestAttributes,
  instancesSetDeletionProtection,
  instancesSetMachineResources,
  instancesSetMinCpuPlatform,
  instancesSetName,
  instancesSetSecurityPolicy,
  instancesPerformMaintenance,
  instancesRemoveResourcePolicies,
  instancesAddResourcePolicies,
  instancesGetIamPolicy,
  instancesSetIamPolicy,
  instancesTestIamPermissions,
  instancesGetEffectiveFirewalls,
  instancesBulkInsert,
  instancesSendDiagnosticInterrupt,
  instancesSimulateMaintenanceEvent,
  instancesUpdateDisplayDevice,
  instanceGroupsList,
  instanceGroupsGet,
  instanceGroupsInsert,
  instanceGroupsDelete,
  instanceGroupsAggregatedList,
  instanceGroupsAddInstances,
  instanceGroupsRemoveInstances,
  instanceGroupsListInstances,
  instanceGroupsSetNamedPorts,
  instanceGroupManagersList,
  instanceGroupManagersGet,
  instanceGroupManagersInsert,
  instanceGroupManagersDelete,
  instanceGroupManagersPatch,
  instanceGroupManagersAggregatedList,
  instanceGroupManagersAbandonInstances,
  instanceGroupManagersApplyUpdatesToInstances,
  instanceGroupManagersCreateInstances,
  instanceGroupManagersDeleteInstances,
  instanceGroupManagersDeletePerInstanceConfigs,
  instanceGroupManagersListErrors,
  instanceGroupManagersListManagedInstances,
  instanceGroupManagersListPerInstanceConfigs,
  instanceGroupManagersPatchPerInstanceConfigs,
  instanceGroupManagersRecreateInstances,
  instanceGroupManagersResize,
  instanceGroupManagersSetInstanceTemplate,
  instanceGroupManagersSetTargetPools,
  instanceGroupManagersUpdatePerInstanceConfigs,
  instanceTemplatesList,
  instanceTemplatesGet,
  instanceTemplatesInsert,
  instanceTemplatesDelete,
  instanceTemplatesAggregatedList,
  instanceTemplatesGetIamPolicy,
  instanceTemplatesSetIamPolicy,
  instanceTemplatesTestIamPermissions,
  machineTypesList,
  machineTypesGet,
  machineTypesAggregatedList,
  machineImagesList,
  machineImagesGet,
  machineImagesInsert,
  machineImagesDelete,
  machineImagesGetIamPolicy,
  machineImagesSetIamPolicy,
  machineImagesTestIamPermissions,
  zoneOperationsList,
  zoneOperationsGet,
  zoneOperationsDelete,
  zoneOperationsWait,
  regionInstanceGroupsList,
  regionInstanceGroupsGet,
  regionInstanceGroupsSetNamedPorts,
  regionInstanceGroupsListInstances,
  regionInstanceGroupManagersList,
  regionInstanceGroupManagersGet,
  regionInstanceGroupManagersInsert,
  regionInstanceGroupManagersDelete,
  regionInstanceGroupManagersPatch,
  regionInstanceGroupManagersAbandonInstances,
  regionInstanceGroupManagersApplyUpdatesToInstances,
  regionInstanceGroupManagersCreateInstances,
  regionInstanceGroupManagersDeleteInstances,
  regionInstanceGroupManagersDeletePerInstanceConfigs,
  regionInstanceGroupManagersListErrors,
  regionInstanceGroupManagersListManagedInstances,
  regionInstanceGroupManagersListPerInstanceConfigs,
  regionInstanceGroupManagersPatchPerInstanceConfigs,
  regionInstanceGroupManagersRecreateInstances,
  regionInstanceGroupManagersResize,
  regionInstanceGroupManagersSetInstanceTemplate,
  regionInstanceGroupManagersSetTargetPools,
  regionInstanceGroupManagersUpdatePerInstanceConfigs,
};
