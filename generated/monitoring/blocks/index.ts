import monitoredResourceDescriptorsList_0 from "./monitored_resource_descriptors/monitoredResourceDescriptorsList";
import monitoredResourceDescriptorsGet_1 from "./monitored_resource_descriptors/monitoredResourceDescriptorsGet";
import metricDescriptorsList_2 from "./metric_descriptors/metricDescriptorsList";
import metricDescriptorsGet_3 from "./metric_descriptors/metricDescriptorsGet";
import metricDescriptorsCreate_4 from "./metric_descriptors/metricDescriptorsCreate";
import metricDescriptorsDelete_5 from "./metric_descriptors/metricDescriptorsDelete";
import timeSeriesList_6 from "./time_series/timeSeriesList";
import timeSeriesCreate_7 from "./time_series/timeSeriesCreate";
import timeSeriesCreateService_8 from "./time_series/timeSeriesCreateService";
import timeSeriesQuery_9 from "./time_series/timeSeriesQuery";
import timeSeriesList_10 from "./time_series/timeSeriesList";
import timeSeriesList_11 from "./time_series/timeSeriesList";
import collectdTimeSeriesCreate_12 from "./collectd_time_series/collectdTimeSeriesCreate";
import alertPoliciesList_13 from "./alert_policies/alertPoliciesList";
import alertPoliciesGet_14 from "./alert_policies/alertPoliciesGet";
import alertPoliciesCreate_15 from "./alert_policies/alertPoliciesCreate";
import alertPoliciesDelete_16 from "./alert_policies/alertPoliciesDelete";
import alertPoliciesPatch_17 from "./alert_policies/alertPoliciesPatch";
import groupsList_18 from "./groups/groupsList";
import groupsGet_19 from "./groups/groupsGet";
import groupsCreate_20 from "./groups/groupsCreate";
import groupsUpdate_21 from "./groups/groupsUpdate";
import groupsDelete_22 from "./groups/groupsDelete";
import membersList_23 from "./members/membersList";
import alertsList_24 from "./alerts/alertsList";
import alertsGet_25 from "./alerts/alertsGet";
import notificationChannelDescriptorsList_26 from "./notification_channel_descriptors/notificationChannelDescriptorsList";
import notificationChannelDescriptorsGet_27 from "./notification_channel_descriptors/notificationChannelDescriptorsGet";
import notificationChannelsList_28 from "./notification_channels/notificationChannelsList";
import notificationChannelsGet_29 from "./notification_channels/notificationChannelsGet";
import notificationChannelsCreate_30 from "./notification_channels/notificationChannelsCreate";
import notificationChannelsPatch_31 from "./notification_channels/notificationChannelsPatch";
import notificationChannelsDelete_32 from "./notification_channels/notificationChannelsDelete";
import notificationChannelsSendVerificationCode_33 from "./notification_channels/notificationChannelsSendVerificationCode";
import notificationChannelsGetVerificationCode_34 from "./notification_channels/notificationChannelsGetVerificationCode";
import notificationChannelsVerify_35 from "./notification_channels/notificationChannelsVerify";
import snoozesCreate_36 from "./snoozes/snoozesCreate";
import snoozesList_37 from "./snoozes/snoozesList";
import snoozesGet_38 from "./snoozes/snoozesGet";
import snoozesPatch_39 from "./snoozes/snoozesPatch";
import uptimeCheckConfigsList_40 from "./uptime_check_configs/uptimeCheckConfigsList";
import uptimeCheckConfigsGet_41 from "./uptime_check_configs/uptimeCheckConfigsGet";
import uptimeCheckConfigsCreate_42 from "./uptime_check_configs/uptimeCheckConfigsCreate";
import uptimeCheckConfigsPatch_43 from "./uptime_check_configs/uptimeCheckConfigsPatch";
import uptimeCheckConfigsDelete_44 from "./uptime_check_configs/uptimeCheckConfigsDelete";
import servicesCreate_45 from "./services/servicesCreate";
import servicesGet_46 from "./services/servicesGet";
import servicesList_47 from "./services/servicesList";
import servicesPatch_48 from "./services/servicesPatch";
import servicesDelete_49 from "./services/servicesDelete";
import serviceLevelObjectivesCreate_50 from "./service_level_objectives/serviceLevelObjectivesCreate";
import serviceLevelObjectivesGet_51 from "./service_level_objectives/serviceLevelObjectivesGet";
import serviceLevelObjectivesList_52 from "./service_level_objectives/serviceLevelObjectivesList";
import serviceLevelObjectivesPatch_53 from "./service_level_objectives/serviceLevelObjectivesPatch";
import serviceLevelObjectivesDelete_54 from "./service_level_objectives/serviceLevelObjectivesDelete";
import uptimeCheckIpsList_55 from "./uptime_check_ips/uptimeCheckIpsList";

export const blocks = {
  monitored_resource_descriptors_monitoredResourceDescriptorsList:
    monitoredResourceDescriptorsList_0,
  monitored_resource_descriptors_monitoredResourceDescriptorsGet:
    monitoredResourceDescriptorsGet_1,
  metric_descriptors_metricDescriptorsList: metricDescriptorsList_2,
  metric_descriptors_metricDescriptorsGet: metricDescriptorsGet_3,
  metric_descriptors_metricDescriptorsCreate: metricDescriptorsCreate_4,
  metric_descriptors_metricDescriptorsDelete: metricDescriptorsDelete_5,
  time_series_timeSeriesList: timeSeriesList_6,
  time_series_timeSeriesCreate: timeSeriesCreate_7,
  time_series_timeSeriesCreateService: timeSeriesCreateService_8,
  time_series_timeSeriesQuery: timeSeriesQuery_9,
  time_series_timeSeriesList_1: timeSeriesList_10,
  time_series_timeSeriesList_2: timeSeriesList_11,
  collectd_time_series_collectdTimeSeriesCreate: collectdTimeSeriesCreate_12,
  alert_policies_alertPoliciesList: alertPoliciesList_13,
  alert_policies_alertPoliciesGet: alertPoliciesGet_14,
  alert_policies_alertPoliciesCreate: alertPoliciesCreate_15,
  alert_policies_alertPoliciesDelete: alertPoliciesDelete_16,
  alert_policies_alertPoliciesPatch: alertPoliciesPatch_17,
  groups_groupsList: groupsList_18,
  groups_groupsGet: groupsGet_19,
  groups_groupsCreate: groupsCreate_20,
  groups_groupsUpdate: groupsUpdate_21,
  groups_groupsDelete: groupsDelete_22,
  members_membersList: membersList_23,
  alerts_alertsList: alertsList_24,
  alerts_alertsGet: alertsGet_25,
  notification_channel_descriptors_notificationChannelDescriptorsList:
    notificationChannelDescriptorsList_26,
  notification_channel_descriptors_notificationChannelDescriptorsGet:
    notificationChannelDescriptorsGet_27,
  notification_channels_notificationChannelsList: notificationChannelsList_28,
  notification_channels_notificationChannelsGet: notificationChannelsGet_29,
  notification_channels_notificationChannelsCreate:
    notificationChannelsCreate_30,
  notification_channels_notificationChannelsPatch: notificationChannelsPatch_31,
  notification_channels_notificationChannelsDelete:
    notificationChannelsDelete_32,
  notification_channels_notificationChannelsSendVerificationCode:
    notificationChannelsSendVerificationCode_33,
  notification_channels_notificationChannelsGetVerificationCode:
    notificationChannelsGetVerificationCode_34,
  notification_channels_notificationChannelsVerify:
    notificationChannelsVerify_35,
  snoozes_snoozesCreate: snoozesCreate_36,
  snoozes_snoozesList: snoozesList_37,
  snoozes_snoozesGet: snoozesGet_38,
  snoozes_snoozesPatch: snoozesPatch_39,
  uptime_check_configs_uptimeCheckConfigsList: uptimeCheckConfigsList_40,
  uptime_check_configs_uptimeCheckConfigsGet: uptimeCheckConfigsGet_41,
  uptime_check_configs_uptimeCheckConfigsCreate: uptimeCheckConfigsCreate_42,
  uptime_check_configs_uptimeCheckConfigsPatch: uptimeCheckConfigsPatch_43,
  uptime_check_configs_uptimeCheckConfigsDelete: uptimeCheckConfigsDelete_44,
  services_servicesCreate: servicesCreate_45,
  services_servicesGet: servicesGet_46,
  services_servicesList: servicesList_47,
  services_servicesPatch: servicesPatch_48,
  services_servicesDelete: servicesDelete_49,
  service_level_objectives_serviceLevelObjectivesCreate:
    serviceLevelObjectivesCreate_50,
  service_level_objectives_serviceLevelObjectivesGet:
    serviceLevelObjectivesGet_51,
  service_level_objectives_serviceLevelObjectivesList:
    serviceLevelObjectivesList_52,
  service_level_objectives_serviceLevelObjectivesPatch:
    serviceLevelObjectivesPatch_53,
  service_level_objectives_serviceLevelObjectivesDelete:
    serviceLevelObjectivesDelete_54,
  uptime_check_ips_uptimeCheckIpsList: uptimeCheckIpsList_55,
};
