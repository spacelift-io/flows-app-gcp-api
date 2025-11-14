import backendServicesList from "./backend_services/backendServicesList";
import backendServicesGet from "./backend_services/backendServicesGet";
import backendServicesInsert from "./backend_services/backendServicesInsert";
import backendServicesDelete from "./backend_services/backendServicesDelete";
import backendServicesPatch from "./backend_services/backendServicesPatch";
import backendServicesUpdate from "./backend_services/backendServicesUpdate";
import backendServicesAggregatedList from "./backend_services/backendServicesAggregatedList";
import backendServicesAddSignedUrlKey from "./backend_services/backendServicesAddSignedUrlKey";
import backendServicesDeleteSignedUrlKey from "./backend_services/backendServicesDeleteSignedUrlKey";
import backendServicesGetHealth from "./backend_services/backendServicesGetHealth";
import backendServicesSetSecurityPolicy from "./backend_services/backendServicesSetSecurityPolicy";
import backendServicesSetEdgeSecurityPolicy from "./backend_services/backendServicesSetEdgeSecurityPolicy";
import backendServicesGetIamPolicy from "./backend_services/backendServicesGetIamPolicy";
import backendServicesSetIamPolicy from "./backend_services/backendServicesSetIamPolicy";
import backendServicesTestIamPermissions from "./backend_services/backendServicesTestIamPermissions";
import backendServicesGetEffectiveSecurityPolicies from "./backend_services/backendServicesGetEffectiveSecurityPolicies";
import backendServicesListUsable from "./backend_services/backendServicesListUsable";
import regionBackendServicesList from "./region_backend_services/regionBackendServicesList";
import regionBackendServicesGet from "./region_backend_services/regionBackendServicesGet";
import regionBackendServicesInsert from "./region_backend_services/regionBackendServicesInsert";
import regionBackendServicesDelete from "./region_backend_services/regionBackendServicesDelete";
import regionBackendServicesPatch from "./region_backend_services/regionBackendServicesPatch";
import regionBackendServicesUpdate from "./region_backend_services/regionBackendServicesUpdate";
import regionBackendServicesGetHealth from "./region_backend_services/regionBackendServicesGetHealth";
import regionBackendServicesSetSecurityPolicy from "./region_backend_services/regionBackendServicesSetSecurityPolicy";
import regionBackendServicesGetIamPolicy from "./region_backend_services/regionBackendServicesGetIamPolicy";
import regionBackendServicesSetIamPolicy from "./region_backend_services/regionBackendServicesSetIamPolicy";
import regionBackendServicesTestIamPermissions from "./region_backend_services/regionBackendServicesTestIamPermissions";
import regionBackendServicesListUsable from "./region_backend_services/regionBackendServicesListUsable";
import backendBucketsList from "./backend_buckets/backendBucketsList";
import backendBucketsGet from "./backend_buckets/backendBucketsGet";
import backendBucketsInsert from "./backend_buckets/backendBucketsInsert";
import backendBucketsDelete from "./backend_buckets/backendBucketsDelete";
import backendBucketsPatch from "./backend_buckets/backendBucketsPatch";
import backendBucketsUpdate from "./backend_buckets/backendBucketsUpdate";
import backendBucketsAddSignedUrlKey from "./backend_buckets/backendBucketsAddSignedUrlKey";
import backendBucketsDeleteSignedUrlKey from "./backend_buckets/backendBucketsDeleteSignedUrlKey";
import backendBucketsSetEdgeSecurityPolicy from "./backend_buckets/backendBucketsSetEdgeSecurityPolicy";
import backendBucketsGetIamPolicy from "./backend_buckets/backendBucketsGetIamPolicy";
import backendBucketsSetIamPolicy from "./backend_buckets/backendBucketsSetIamPolicy";
import backendBucketsTestIamPermissions from "./backend_buckets/backendBucketsTestIamPermissions";
import forwardingRulesList from "./forwarding_rules/forwardingRulesList";
import forwardingRulesGet from "./forwarding_rules/forwardingRulesGet";
import forwardingRulesInsert from "./forwarding_rules/forwardingRulesInsert";
import forwardingRulesDelete from "./forwarding_rules/forwardingRulesDelete";
import forwardingRulesPatch from "./forwarding_rules/forwardingRulesPatch";
import forwardingRulesAggregatedList from "./forwarding_rules/forwardingRulesAggregatedList";
import forwardingRulesSetLabels from "./forwarding_rules/forwardingRulesSetLabels";
import forwardingRulesSetTarget from "./forwarding_rules/forwardingRulesSetTarget";
import globalForwardingRulesList from "./global_forwarding_rules/globalForwardingRulesList";
import globalForwardingRulesGet from "./global_forwarding_rules/globalForwardingRulesGet";
import globalForwardingRulesInsert from "./global_forwarding_rules/globalForwardingRulesInsert";
import globalForwardingRulesDelete from "./global_forwarding_rules/globalForwardingRulesDelete";
import globalForwardingRulesPatch from "./global_forwarding_rules/globalForwardingRulesPatch";
import globalForwardingRulesSetLabels from "./global_forwarding_rules/globalForwardingRulesSetLabels";
import globalForwardingRulesSetTarget from "./global_forwarding_rules/globalForwardingRulesSetTarget";
import targetPoolsList from "./target_pools/targetPoolsList";
import targetPoolsGet from "./target_pools/targetPoolsGet";
import targetPoolsInsert from "./target_pools/targetPoolsInsert";
import targetPoolsDelete from "./target_pools/targetPoolsDelete";
import targetPoolsAggregatedList from "./target_pools/targetPoolsAggregatedList";
import targetPoolsAddHealthCheck from "./target_pools/targetPoolsAddHealthCheck";
import targetPoolsRemoveHealthCheck from "./target_pools/targetPoolsRemoveHealthCheck";
import targetPoolsAddInstance from "./target_pools/targetPoolsAddInstance";
import targetPoolsRemoveInstance from "./target_pools/targetPoolsRemoveInstance";
import targetPoolsGetHealth from "./target_pools/targetPoolsGetHealth";
import targetPoolsSetBackup from "./target_pools/targetPoolsSetBackup";
import targetPoolsSetSecurityPolicy from "./target_pools/targetPoolsSetSecurityPolicy";
import targetHttpProxiesList from "./target_http_proxies/targetHttpProxiesList";
import targetHttpProxiesGet from "./target_http_proxies/targetHttpProxiesGet";
import targetHttpProxiesInsert from "./target_http_proxies/targetHttpProxiesInsert";
import targetHttpProxiesDelete from "./target_http_proxies/targetHttpProxiesDelete";
import targetHttpProxiesPatch from "./target_http_proxies/targetHttpProxiesPatch";
import targetHttpProxiesAggregatedList from "./target_http_proxies/targetHttpProxiesAggregatedList";
import targetHttpProxiesSetUrlMap from "./target_http_proxies/targetHttpProxiesSetUrlMap";
import regionTargetHttpProxiesList from "./region_target_http_proxies/regionTargetHttpProxiesList";
import regionTargetHttpProxiesGet from "./region_target_http_proxies/regionTargetHttpProxiesGet";
import regionTargetHttpProxiesInsert from "./region_target_http_proxies/regionTargetHttpProxiesInsert";
import regionTargetHttpProxiesDelete from "./region_target_http_proxies/regionTargetHttpProxiesDelete";
import regionTargetHttpProxiesSetUrlMap from "./region_target_http_proxies/regionTargetHttpProxiesSetUrlMap";
import targetHttpsProxiesList from "./target_https_proxies/targetHttpsProxiesList";
import targetHttpsProxiesGet from "./target_https_proxies/targetHttpsProxiesGet";
import targetHttpsProxiesInsert from "./target_https_proxies/targetHttpsProxiesInsert";
import targetHttpsProxiesDelete from "./target_https_proxies/targetHttpsProxiesDelete";
import targetHttpsProxiesPatch from "./target_https_proxies/targetHttpsProxiesPatch";
import targetHttpsProxiesAggregatedList from "./target_https_proxies/targetHttpsProxiesAggregatedList";
import targetHttpsProxiesSetSslCertificates from "./target_https_proxies/targetHttpsProxiesSetSslCertificates";
import targetHttpsProxiesSetUrlMap from "./target_https_proxies/targetHttpsProxiesSetUrlMap";
import targetHttpsProxiesSetSslPolicy from "./target_https_proxies/targetHttpsProxiesSetSslPolicy";
import regionTargetHttpsProxiesList from "./region_target_https_proxies/regionTargetHttpsProxiesList";
import regionTargetHttpsProxiesGet from "./region_target_https_proxies/regionTargetHttpsProxiesGet";
import regionTargetHttpsProxiesInsert from "./region_target_https_proxies/regionTargetHttpsProxiesInsert";
import regionTargetHttpsProxiesDelete from "./region_target_https_proxies/regionTargetHttpsProxiesDelete";
import regionTargetHttpsProxiesPatch from "./region_target_https_proxies/regionTargetHttpsProxiesPatch";
import regionTargetHttpsProxiesSetSslCertificates from "./region_target_https_proxies/regionTargetHttpsProxiesSetSslCertificates";
import regionTargetHttpsProxiesSetUrlMap from "./region_target_https_proxies/regionTargetHttpsProxiesSetUrlMap";
import targetSslProxiesList from "./target_ssl_proxies/targetSslProxiesList";
import targetSslProxiesGet from "./target_ssl_proxies/targetSslProxiesGet";
import targetSslProxiesInsert from "./target_ssl_proxies/targetSslProxiesInsert";
import targetSslProxiesDelete from "./target_ssl_proxies/targetSslProxiesDelete";
import targetSslProxiesSetBackendService from "./target_ssl_proxies/targetSslProxiesSetBackendService";
import targetSslProxiesSetSslCertificates from "./target_ssl_proxies/targetSslProxiesSetSslCertificates";
import targetSslProxiesSetSslPolicy from "./target_ssl_proxies/targetSslProxiesSetSslPolicy";
import targetSslProxiesSetProxyHeader from "./target_ssl_proxies/targetSslProxiesSetProxyHeader";
import targetTcpProxiesList from "./target_tcp_proxies/targetTcpProxiesList";
import targetTcpProxiesGet from "./target_tcp_proxies/targetTcpProxiesGet";
import targetTcpProxiesInsert from "./target_tcp_proxies/targetTcpProxiesInsert";
import targetTcpProxiesDelete from "./target_tcp_proxies/targetTcpProxiesDelete";
import targetTcpProxiesSetBackendService from "./target_tcp_proxies/targetTcpProxiesSetBackendService";
import targetTcpProxiesSetProxyHeader from "./target_tcp_proxies/targetTcpProxiesSetProxyHeader";
import regionTargetTcpProxiesList from "./region_target_tcp_proxies/regionTargetTcpProxiesList";
import regionTargetTcpProxiesGet from "./region_target_tcp_proxies/regionTargetTcpProxiesGet";
import regionTargetTcpProxiesInsert from "./region_target_tcp_proxies/regionTargetTcpProxiesInsert";
import regionTargetTcpProxiesDelete from "./region_target_tcp_proxies/regionTargetTcpProxiesDelete";
import urlMapsList from "./url_maps/urlMapsList";
import urlMapsGet from "./url_maps/urlMapsGet";
import urlMapsInsert from "./url_maps/urlMapsInsert";
import urlMapsDelete from "./url_maps/urlMapsDelete";
import urlMapsPatch from "./url_maps/urlMapsPatch";
import urlMapsUpdate from "./url_maps/urlMapsUpdate";
import urlMapsAggregatedList from "./url_maps/urlMapsAggregatedList";
import urlMapsValidate from "./url_maps/urlMapsValidate";
import regionUrlMapsList from "./region_url_maps/regionUrlMapsList";
import regionUrlMapsGet from "./region_url_maps/regionUrlMapsGet";
import regionUrlMapsInsert from "./region_url_maps/regionUrlMapsInsert";
import regionUrlMapsDelete from "./region_url_maps/regionUrlMapsDelete";
import regionUrlMapsPatch from "./region_url_maps/regionUrlMapsPatch";
import regionUrlMapsUpdate from "./region_url_maps/regionUrlMapsUpdate";
import regionUrlMapsValidate from "./region_url_maps/regionUrlMapsValidate";
import healthChecksList from "./health_checks/healthChecksList";
import healthChecksGet from "./health_checks/healthChecksGet";
import healthChecksInsert from "./health_checks/healthChecksInsert";
import healthChecksDelete from "./health_checks/healthChecksDelete";
import healthChecksPatch from "./health_checks/healthChecksPatch";
import healthChecksUpdate from "./health_checks/healthChecksUpdate";
import healthChecksAggregatedList from "./health_checks/healthChecksAggregatedList";
import regionHealthChecksList from "./region_health_checks/regionHealthChecksList";
import regionHealthChecksGet from "./region_health_checks/regionHealthChecksGet";
import regionHealthChecksInsert from "./region_health_checks/regionHealthChecksInsert";
import regionHealthChecksDelete from "./region_health_checks/regionHealthChecksDelete";
import regionHealthChecksPatch from "./region_health_checks/regionHealthChecksPatch";
import regionHealthChecksUpdate from "./region_health_checks/regionHealthChecksUpdate";
import httpHealthChecksList from "./http_health_checks/httpHealthChecksList";
import httpHealthChecksGet from "./http_health_checks/httpHealthChecksGet";
import httpHealthChecksInsert from "./http_health_checks/httpHealthChecksInsert";
import httpHealthChecksDelete from "./http_health_checks/httpHealthChecksDelete";
import httpHealthChecksPatch from "./http_health_checks/httpHealthChecksPatch";
import httpHealthChecksUpdate from "./http_health_checks/httpHealthChecksUpdate";
import httpsHealthChecksList from "./https_health_checks/httpsHealthChecksList";
import httpsHealthChecksGet from "./https_health_checks/httpsHealthChecksGet";
import httpsHealthChecksInsert from "./https_health_checks/httpsHealthChecksInsert";
import httpsHealthChecksDelete from "./https_health_checks/httpsHealthChecksDelete";
import httpsHealthChecksPatch from "./https_health_checks/httpsHealthChecksPatch";
import httpsHealthChecksUpdate from "./https_health_checks/httpsHealthChecksUpdate";

export const blocks = {
  backendServicesList,
  backendServicesGet,
  backendServicesInsert,
  backendServicesDelete,
  backendServicesPatch,
  backendServicesUpdate,
  backendServicesAggregatedList,
  backendServicesAddSignedUrlKey,
  backendServicesDeleteSignedUrlKey,
  backendServicesGetHealth,
  backendServicesSetSecurityPolicy,
  backendServicesSetEdgeSecurityPolicy,
  backendServicesGetIamPolicy,
  backendServicesSetIamPolicy,
  backendServicesTestIamPermissions,
  backendServicesGetEffectiveSecurityPolicies,
  backendServicesListUsable,
  regionBackendServicesList,
  regionBackendServicesGet,
  regionBackendServicesInsert,
  regionBackendServicesDelete,
  regionBackendServicesPatch,
  regionBackendServicesUpdate,
  regionBackendServicesGetHealth,
  regionBackendServicesSetSecurityPolicy,
  regionBackendServicesGetIamPolicy,
  regionBackendServicesSetIamPolicy,
  regionBackendServicesTestIamPermissions,
  regionBackendServicesListUsable,
  backendBucketsList,
  backendBucketsGet,
  backendBucketsInsert,
  backendBucketsDelete,
  backendBucketsPatch,
  backendBucketsUpdate,
  backendBucketsAddSignedUrlKey,
  backendBucketsDeleteSignedUrlKey,
  backendBucketsSetEdgeSecurityPolicy,
  backendBucketsGetIamPolicy,
  backendBucketsSetIamPolicy,
  backendBucketsTestIamPermissions,
  forwardingRulesList,
  forwardingRulesGet,
  forwardingRulesInsert,
  forwardingRulesDelete,
  forwardingRulesPatch,
  forwardingRulesAggregatedList,
  forwardingRulesSetLabels,
  forwardingRulesSetTarget,
  globalForwardingRulesList,
  globalForwardingRulesGet,
  globalForwardingRulesInsert,
  globalForwardingRulesDelete,
  globalForwardingRulesPatch,
  globalForwardingRulesSetLabels,
  globalForwardingRulesSetTarget,
  targetPoolsList,
  targetPoolsGet,
  targetPoolsInsert,
  targetPoolsDelete,
  targetPoolsAggregatedList,
  targetPoolsAddHealthCheck,
  targetPoolsRemoveHealthCheck,
  targetPoolsAddInstance,
  targetPoolsRemoveInstance,
  targetPoolsGetHealth,
  targetPoolsSetBackup,
  targetPoolsSetSecurityPolicy,
  targetHttpProxiesList,
  targetHttpProxiesGet,
  targetHttpProxiesInsert,
  targetHttpProxiesDelete,
  targetHttpProxiesPatch,
  targetHttpProxiesAggregatedList,
  targetHttpProxiesSetUrlMap,
  regionTargetHttpProxiesList,
  regionTargetHttpProxiesGet,
  regionTargetHttpProxiesInsert,
  regionTargetHttpProxiesDelete,
  regionTargetHttpProxiesSetUrlMap,
  targetHttpsProxiesList,
  targetHttpsProxiesGet,
  targetHttpsProxiesInsert,
  targetHttpsProxiesDelete,
  targetHttpsProxiesPatch,
  targetHttpsProxiesAggregatedList,
  targetHttpsProxiesSetSslCertificates,
  targetHttpsProxiesSetUrlMap,
  targetHttpsProxiesSetSslPolicy,
  regionTargetHttpsProxiesList,
  regionTargetHttpsProxiesGet,
  regionTargetHttpsProxiesInsert,
  regionTargetHttpsProxiesDelete,
  regionTargetHttpsProxiesPatch,
  regionTargetHttpsProxiesSetSslCertificates,
  regionTargetHttpsProxiesSetUrlMap,
  targetSslProxiesList,
  targetSslProxiesGet,
  targetSslProxiesInsert,
  targetSslProxiesDelete,
  targetSslProxiesSetBackendService,
  targetSslProxiesSetSslCertificates,
  targetSslProxiesSetSslPolicy,
  targetSslProxiesSetProxyHeader,
  targetTcpProxiesList,
  targetTcpProxiesGet,
  targetTcpProxiesInsert,
  targetTcpProxiesDelete,
  targetTcpProxiesSetBackendService,
  targetTcpProxiesSetProxyHeader,
  regionTargetTcpProxiesList,
  regionTargetTcpProxiesGet,
  regionTargetTcpProxiesInsert,
  regionTargetTcpProxiesDelete,
  urlMapsList,
  urlMapsGet,
  urlMapsInsert,
  urlMapsDelete,
  urlMapsPatch,
  urlMapsUpdate,
  urlMapsAggregatedList,
  urlMapsValidate,
  regionUrlMapsList,
  regionUrlMapsGet,
  regionUrlMapsInsert,
  regionUrlMapsDelete,
  regionUrlMapsPatch,
  regionUrlMapsUpdate,
  regionUrlMapsValidate,
  healthChecksList,
  healthChecksGet,
  healthChecksInsert,
  healthChecksDelete,
  healthChecksPatch,
  healthChecksUpdate,
  healthChecksAggregatedList,
  regionHealthChecksList,
  regionHealthChecksGet,
  regionHealthChecksInsert,
  regionHealthChecksDelete,
  regionHealthChecksPatch,
  regionHealthChecksUpdate,
  httpHealthChecksList,
  httpHealthChecksGet,
  httpHealthChecksInsert,
  httpHealthChecksDelete,
  httpHealthChecksPatch,
  httpHealthChecksUpdate,
  httpsHealthChecksList,
  httpsHealthChecksGet,
  httpsHealthChecksInsert,
  httpsHealthChecksDelete,
  httpsHealthChecksPatch,
  httpsHealthChecksUpdate,
};
