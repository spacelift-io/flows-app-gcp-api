import monitoredResourceDescriptorsList from "./monitored_resource_descriptors/monitoredResourceDescriptorsList";
import monitoredResourceDescriptorsGet from "./monitored_resource_descriptors/monitoredResourceDescriptorsGet";
import metricDescriptorsList from "./metric_descriptors/metricDescriptorsList";
import metricDescriptorsGet from "./metric_descriptors/metricDescriptorsGet";
import metricDescriptorsCreate from "./metric_descriptors/metricDescriptorsCreate";
import metricDescriptorsDelete from "./metric_descriptors/metricDescriptorsDelete";
import timeSeriesList from "./time_series/timeSeriesList";
import timeSeriesCreate from "./time_series/timeSeriesCreate";
import timeSeriesCreateService from "./time_series/timeSeriesCreateService";
import timeSeriesQuery from "./time_series/timeSeriesQuery";
import collectdTimeSeriesCreate from "./collectd_time_series/collectdTimeSeriesCreate";
import alertPoliciesList from "./alert_policies/alertPoliciesList";
import alertPoliciesGet from "./alert_policies/alertPoliciesGet";
import alertPoliciesCreate from "./alert_policies/alertPoliciesCreate";
import alertPoliciesDelete from "./alert_policies/alertPoliciesDelete";
import alertPoliciesPatch from "./alert_policies/alertPoliciesPatch";
import groupsList from "./groups/groupsList";
import groupsGet from "./groups/groupsGet";
import groupsCreate from "./groups/groupsCreate";
import groupsUpdate from "./groups/groupsUpdate";
import groupsDelete from "./groups/groupsDelete";
import groupsMembersList from "./groups/groupsMembersList";
import alertsList from "./alerts/alertsList";
import alertsGet from "./alerts/alertsGet";
import notificationChannelDescriptorsList from "./notification_channel_descriptors/notificationChannelDescriptorsList";
import notificationChannelDescriptorsGet from "./notification_channel_descriptors/notificationChannelDescriptorsGet";
import notificationChannelsList from "./notification_channels/notificationChannelsList";
import notificationChannelsGet from "./notification_channels/notificationChannelsGet";
import notificationChannelsCreate from "./notification_channels/notificationChannelsCreate";
import notificationChannelsPatch from "./notification_channels/notificationChannelsPatch";
import notificationChannelsDelete from "./notification_channels/notificationChannelsDelete";
import notificationChannelsSendVerificationCode from "./notification_channels/notificationChannelsSendVerificationCode";
import notificationChannelsGetVerificationCode from "./notification_channels/notificationChannelsGetVerificationCode";
import notificationChannelsVerify from "./notification_channels/notificationChannelsVerify";
import snoozesCreate from "./snoozes/snoozesCreate";
import snoozesList from "./snoozes/snoozesList";
import snoozesGet from "./snoozes/snoozesGet";
import snoozesPatch from "./snoozes/snoozesPatch";
import uptimeCheckConfigsList from "./uptime_check_configs/uptimeCheckConfigsList";
import uptimeCheckConfigsGet from "./uptime_check_configs/uptimeCheckConfigsGet";
import uptimeCheckConfigsCreate from "./uptime_check_configs/uptimeCheckConfigsCreate";
import uptimeCheckConfigsPatch from "./uptime_check_configs/uptimeCheckConfigsPatch";
import uptimeCheckConfigsDelete from "./uptime_check_configs/uptimeCheckConfigsDelete";
import organizationsTimeSeriesList from "./organizations/organizationsTimeSeriesList";
import foldersTimeSeriesList from "./folders/foldersTimeSeriesList";
import servicesCreate from "./services/servicesCreate";
import servicesGet from "./services/servicesGet";
import servicesList from "./services/servicesList";
import servicesPatch from "./services/servicesPatch";
import servicesDelete from "./services/servicesDelete";
import servicesServiceLevelObjectivesCreate from "./services/servicesServiceLevelObjectivesCreate";
import servicesServiceLevelObjectivesGet from "./services/servicesServiceLevelObjectivesGet";
import servicesServiceLevelObjectivesList from "./services/servicesServiceLevelObjectivesList";
import servicesServiceLevelObjectivesPatch from "./services/servicesServiceLevelObjectivesPatch";
import servicesServiceLevelObjectivesDelete from "./services/servicesServiceLevelObjectivesDelete";
import uptimeCheckIpsList from "./uptime_check_ips/uptimeCheckIpsList";

export const blocks = {
  monitoredResourceDescriptorsList,
  monitoredResourceDescriptorsGet,
  metricDescriptorsList,
  metricDescriptorsGet,
  metricDescriptorsCreate,
  metricDescriptorsDelete,
  timeSeriesList,
  timeSeriesCreate,
  timeSeriesCreateService,
  timeSeriesQuery,
  collectdTimeSeriesCreate,
  alertPoliciesList,
  alertPoliciesGet,
  alertPoliciesCreate,
  alertPoliciesDelete,
  alertPoliciesPatch,
  groupsList,
  groupsGet,
  groupsCreate,
  groupsUpdate,
  groupsDelete,
  groupsMembersList,
  alertsList,
  alertsGet,
  notificationChannelDescriptorsList,
  notificationChannelDescriptorsGet,
  notificationChannelsList,
  notificationChannelsGet,
  notificationChannelsCreate,
  notificationChannelsPatch,
  notificationChannelsDelete,
  notificationChannelsSendVerificationCode,
  notificationChannelsGetVerificationCode,
  notificationChannelsVerify,
  snoozesCreate,
  snoozesList,
  snoozesGet,
  snoozesPatch,
  uptimeCheckConfigsList,
  uptimeCheckConfigsGet,
  uptimeCheckConfigsCreate,
  uptimeCheckConfigsPatch,
  uptimeCheckConfigsDelete,
  organizationsTimeSeriesList,
  foldersTimeSeriesList,
  servicesCreate,
  servicesGet,
  servicesList,
  servicesPatch,
  servicesDelete,
  servicesServiceLevelObjectivesCreate,
  servicesServiceLevelObjectivesGet,
  servicesServiceLevelObjectivesList,
  servicesServiceLevelObjectivesPatch,
  servicesServiceLevelObjectivesDelete,
  uptimeCheckIpsList,
};
