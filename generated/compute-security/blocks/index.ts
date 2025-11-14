import firewallsList from "./firewalls/firewallsList";
import firewallsGet from "./firewalls/firewallsGet";
import firewallsInsert from "./firewalls/firewallsInsert";
import firewallsDelete from "./firewalls/firewallsDelete";
import firewallsPatch from "./firewalls/firewallsPatch";
import firewallsUpdate from "./firewalls/firewallsUpdate";
import firewallsTestIamPermissions from "./firewalls/firewallsTestIamPermissions";
import firewallPoliciesList from "./firewall_policies/firewallPoliciesList";
import firewallPoliciesGet from "./firewall_policies/firewallPoliciesGet";
import firewallPoliciesInsert from "./firewall_policies/firewallPoliciesInsert";
import firewallPoliciesDelete from "./firewall_policies/firewallPoliciesDelete";
import firewallPoliciesPatch from "./firewall_policies/firewallPoliciesPatch";
import firewallPoliciesMove from "./firewall_policies/firewallPoliciesMove";
import firewallPoliciesCloneRules from "./firewall_policies/firewallPoliciesCloneRules";
import firewallPoliciesGetAssociation from "./firewall_policies/firewallPoliciesGetAssociation";
import firewallPoliciesGetIamPolicy from "./firewall_policies/firewallPoliciesGetIamPolicy";
import firewallPoliciesSetIamPolicy from "./firewall_policies/firewallPoliciesSetIamPolicy";
import firewallPoliciesTestIamPermissions from "./firewall_policies/firewallPoliciesTestIamPermissions";
import firewallPoliciesGetRule from "./firewall_policies/firewallPoliciesGetRule";
import firewallPoliciesAddRule from "./firewall_policies/firewallPoliciesAddRule";
import firewallPoliciesPatchRule from "./firewall_policies/firewallPoliciesPatchRule";
import firewallPoliciesRemoveRule from "./firewall_policies/firewallPoliciesRemoveRule";
import firewallPoliciesAddAssociation from "./firewall_policies/firewallPoliciesAddAssociation";
import firewallPoliciesRemoveAssociation from "./firewall_policies/firewallPoliciesRemoveAssociation";
import firewallPoliciesListAssociations from "./firewall_policies/firewallPoliciesListAssociations";
import networkFirewallPoliciesList from "./network_firewall_policies/networkFirewallPoliciesList";
import networkFirewallPoliciesGet from "./network_firewall_policies/networkFirewallPoliciesGet";
import networkFirewallPoliciesInsert from "./network_firewall_policies/networkFirewallPoliciesInsert";
import networkFirewallPoliciesDelete from "./network_firewall_policies/networkFirewallPoliciesDelete";
import networkFirewallPoliciesPatch from "./network_firewall_policies/networkFirewallPoliciesPatch";
import networkFirewallPoliciesCloneRules from "./network_firewall_policies/networkFirewallPoliciesCloneRules";
import networkFirewallPoliciesGetAssociation from "./network_firewall_policies/networkFirewallPoliciesGetAssociation";
import networkFirewallPoliciesGetIamPolicy from "./network_firewall_policies/networkFirewallPoliciesGetIamPolicy";
import networkFirewallPoliciesSetIamPolicy from "./network_firewall_policies/networkFirewallPoliciesSetIamPolicy";
import networkFirewallPoliciesTestIamPermissions from "./network_firewall_policies/networkFirewallPoliciesTestIamPermissions";
import networkFirewallPoliciesGetRule from "./network_firewall_policies/networkFirewallPoliciesGetRule";
import networkFirewallPoliciesAddRule from "./network_firewall_policies/networkFirewallPoliciesAddRule";
import networkFirewallPoliciesPatchRule from "./network_firewall_policies/networkFirewallPoliciesPatchRule";
import networkFirewallPoliciesRemoveRule from "./network_firewall_policies/networkFirewallPoliciesRemoveRule";
import networkFirewallPoliciesAddAssociation from "./network_firewall_policies/networkFirewallPoliciesAddAssociation";
import networkFirewallPoliciesRemoveAssociation from "./network_firewall_policies/networkFirewallPoliciesRemoveAssociation";
import regionNetworkFirewallPoliciesList from "./region_network_firewall_policies/regionNetworkFirewallPoliciesList";
import regionNetworkFirewallPoliciesGet from "./region_network_firewall_policies/regionNetworkFirewallPoliciesGet";
import regionNetworkFirewallPoliciesInsert from "./region_network_firewall_policies/regionNetworkFirewallPoliciesInsert";
import regionNetworkFirewallPoliciesDelete from "./region_network_firewall_policies/regionNetworkFirewallPoliciesDelete";
import regionNetworkFirewallPoliciesPatch from "./region_network_firewall_policies/regionNetworkFirewallPoliciesPatch";
import regionNetworkFirewallPoliciesCloneRules from "./region_network_firewall_policies/regionNetworkFirewallPoliciesCloneRules";
import regionNetworkFirewallPoliciesGetAssociation from "./region_network_firewall_policies/regionNetworkFirewallPoliciesGetAssociation";
import regionNetworkFirewallPoliciesGetEffectiveFirewalls from "./region_network_firewall_policies/regionNetworkFirewallPoliciesGetEffectiveFirewalls";
import regionNetworkFirewallPoliciesGetIamPolicy from "./region_network_firewall_policies/regionNetworkFirewallPoliciesGetIamPolicy";
import regionNetworkFirewallPoliciesSetIamPolicy from "./region_network_firewall_policies/regionNetworkFirewallPoliciesSetIamPolicy";
import regionNetworkFirewallPoliciesTestIamPermissions from "./region_network_firewall_policies/regionNetworkFirewallPoliciesTestIamPermissions";
import regionNetworkFirewallPoliciesGetRule from "./region_network_firewall_policies/regionNetworkFirewallPoliciesGetRule";
import regionNetworkFirewallPoliciesAddRule from "./region_network_firewall_policies/regionNetworkFirewallPoliciesAddRule";
import regionNetworkFirewallPoliciesPatchRule from "./region_network_firewall_policies/regionNetworkFirewallPoliciesPatchRule";
import regionNetworkFirewallPoliciesRemoveRule from "./region_network_firewall_policies/regionNetworkFirewallPoliciesRemoveRule";
import regionNetworkFirewallPoliciesAddAssociation from "./region_network_firewall_policies/regionNetworkFirewallPoliciesAddAssociation";
import regionNetworkFirewallPoliciesRemoveAssociation from "./region_network_firewall_policies/regionNetworkFirewallPoliciesRemoveAssociation";
import securityPoliciesList from "./security_policies/securityPoliciesList";
import securityPoliciesGet from "./security_policies/securityPoliciesGet";
import securityPoliciesInsert from "./security_policies/securityPoliciesInsert";
import securityPoliciesDelete from "./security_policies/securityPoliciesDelete";
import securityPoliciesPatch from "./security_policies/securityPoliciesPatch";
import securityPoliciesAggregatedList from "./security_policies/securityPoliciesAggregatedList";
import securityPoliciesAddRule from "./security_policies/securityPoliciesAddRule";
import securityPoliciesGetRule from "./security_policies/securityPoliciesGetRule";
import securityPoliciesPatchRule from "./security_policies/securityPoliciesPatchRule";
import securityPoliciesRemoveRule from "./security_policies/securityPoliciesRemoveRule";
import securityPoliciesListPreconfiguredExpressionSets from "./security_policies/securityPoliciesListPreconfiguredExpressionSets";
import regionSecurityPoliciesList from "./region_security_policies/regionSecurityPoliciesList";
import regionSecurityPoliciesGet from "./region_security_policies/regionSecurityPoliciesGet";
import regionSecurityPoliciesInsert from "./region_security_policies/regionSecurityPoliciesInsert";
import regionSecurityPoliciesDelete from "./region_security_policies/regionSecurityPoliciesDelete";
import regionSecurityPoliciesPatch from "./region_security_policies/regionSecurityPoliciesPatch";
import regionSecurityPoliciesAddRule from "./region_security_policies/regionSecurityPoliciesAddRule";
import regionSecurityPoliciesGetRule from "./region_security_policies/regionSecurityPoliciesGetRule";
import regionSecurityPoliciesPatchRule from "./region_security_policies/regionSecurityPoliciesPatchRule";
import regionSecurityPoliciesRemoveRule from "./region_security_policies/regionSecurityPoliciesRemoveRule";
import organizationSecurityPoliciesList from "./organization_security_policies/organizationSecurityPoliciesList";
import organizationSecurityPoliciesGet from "./organization_security_policies/organizationSecurityPoliciesGet";
import organizationSecurityPoliciesInsert from "./organization_security_policies/organizationSecurityPoliciesInsert";
import organizationSecurityPoliciesDelete from "./organization_security_policies/organizationSecurityPoliciesDelete";
import organizationSecurityPoliciesPatch from "./organization_security_policies/organizationSecurityPoliciesPatch";
import organizationSecurityPoliciesMove from "./organization_security_policies/organizationSecurityPoliciesMove";
import organizationSecurityPoliciesGetAssociation from "./organization_security_policies/organizationSecurityPoliciesGetAssociation";
import organizationSecurityPoliciesAddAssociation from "./organization_security_policies/organizationSecurityPoliciesAddAssociation";
import organizationSecurityPoliciesRemoveAssociation from "./organization_security_policies/organizationSecurityPoliciesRemoveAssociation";
import organizationSecurityPoliciesListAssociations from "./organization_security_policies/organizationSecurityPoliciesListAssociations";
import organizationSecurityPoliciesCopyRules from "./organization_security_policies/organizationSecurityPoliciesCopyRules";
import organizationSecurityPoliciesGetRule from "./organization_security_policies/organizationSecurityPoliciesGetRule";
import organizationSecurityPoliciesAddRule from "./organization_security_policies/organizationSecurityPoliciesAddRule";
import organizationSecurityPoliciesPatchRule from "./organization_security_policies/organizationSecurityPoliciesPatchRule";
import organizationSecurityPoliciesRemoveRule from "./organization_security_policies/organizationSecurityPoliciesRemoveRule";
import sslCertificatesList from "./ssl_certificates/sslCertificatesList";
import sslCertificatesGet from "./ssl_certificates/sslCertificatesGet";
import sslCertificatesInsert from "./ssl_certificates/sslCertificatesInsert";
import sslCertificatesDelete from "./ssl_certificates/sslCertificatesDelete";
import sslCertificatesAggregatedList from "./ssl_certificates/sslCertificatesAggregatedList";
import regionSslCertificatesList from "./region_ssl_certificates/regionSslCertificatesList";
import regionSslCertificatesGet from "./region_ssl_certificates/regionSslCertificatesGet";
import regionSslCertificatesInsert from "./region_ssl_certificates/regionSslCertificatesInsert";
import regionSslCertificatesDelete from "./region_ssl_certificates/regionSslCertificatesDelete";
import sslPoliciesList from "./ssl_policies/sslPoliciesList";
import sslPoliciesGet from "./ssl_policies/sslPoliciesGet";
import sslPoliciesInsert from "./ssl_policies/sslPoliciesInsert";
import sslPoliciesDelete from "./ssl_policies/sslPoliciesDelete";
import sslPoliciesPatch from "./ssl_policies/sslPoliciesPatch";
import sslPoliciesListAvailableFeatures from "./ssl_policies/sslPoliciesListAvailableFeatures";
import regionSslPoliciesList from "./region_ssl_policies/regionSslPoliciesList";
import regionSslPoliciesGet from "./region_ssl_policies/regionSslPoliciesGet";
import regionSslPoliciesInsert from "./region_ssl_policies/regionSslPoliciesInsert";
import regionSslPoliciesDelete from "./region_ssl_policies/regionSslPoliciesDelete";
import regionSslPoliciesPatch from "./region_ssl_policies/regionSslPoliciesPatch";
import regionSslPoliciesListAvailableFeatures from "./region_ssl_policies/regionSslPoliciesListAvailableFeatures";

export const blocks = {
  firewallsList,
  firewallsGet,
  firewallsInsert,
  firewallsDelete,
  firewallsPatch,
  firewallsUpdate,
  firewallsTestIamPermissions,
  firewallPoliciesList,
  firewallPoliciesGet,
  firewallPoliciesInsert,
  firewallPoliciesDelete,
  firewallPoliciesPatch,
  firewallPoliciesMove,
  firewallPoliciesCloneRules,
  firewallPoliciesGetAssociation,
  firewallPoliciesGetIamPolicy,
  firewallPoliciesSetIamPolicy,
  firewallPoliciesTestIamPermissions,
  firewallPoliciesGetRule,
  firewallPoliciesAddRule,
  firewallPoliciesPatchRule,
  firewallPoliciesRemoveRule,
  firewallPoliciesAddAssociation,
  firewallPoliciesRemoveAssociation,
  firewallPoliciesListAssociations,
  networkFirewallPoliciesList,
  networkFirewallPoliciesGet,
  networkFirewallPoliciesInsert,
  networkFirewallPoliciesDelete,
  networkFirewallPoliciesPatch,
  networkFirewallPoliciesCloneRules,
  networkFirewallPoliciesGetAssociation,
  networkFirewallPoliciesGetIamPolicy,
  networkFirewallPoliciesSetIamPolicy,
  networkFirewallPoliciesTestIamPermissions,
  networkFirewallPoliciesGetRule,
  networkFirewallPoliciesAddRule,
  networkFirewallPoliciesPatchRule,
  networkFirewallPoliciesRemoveRule,
  networkFirewallPoliciesAddAssociation,
  networkFirewallPoliciesRemoveAssociation,
  regionNetworkFirewallPoliciesList,
  regionNetworkFirewallPoliciesGet,
  regionNetworkFirewallPoliciesInsert,
  regionNetworkFirewallPoliciesDelete,
  regionNetworkFirewallPoliciesPatch,
  regionNetworkFirewallPoliciesCloneRules,
  regionNetworkFirewallPoliciesGetAssociation,
  regionNetworkFirewallPoliciesGetEffectiveFirewalls,
  regionNetworkFirewallPoliciesGetIamPolicy,
  regionNetworkFirewallPoliciesSetIamPolicy,
  regionNetworkFirewallPoliciesTestIamPermissions,
  regionNetworkFirewallPoliciesGetRule,
  regionNetworkFirewallPoliciesAddRule,
  regionNetworkFirewallPoliciesPatchRule,
  regionNetworkFirewallPoliciesRemoveRule,
  regionNetworkFirewallPoliciesAddAssociation,
  regionNetworkFirewallPoliciesRemoveAssociation,
  securityPoliciesList,
  securityPoliciesGet,
  securityPoliciesInsert,
  securityPoliciesDelete,
  securityPoliciesPatch,
  securityPoliciesAggregatedList,
  securityPoliciesAddRule,
  securityPoliciesGetRule,
  securityPoliciesPatchRule,
  securityPoliciesRemoveRule,
  securityPoliciesListPreconfiguredExpressionSets,
  regionSecurityPoliciesList,
  regionSecurityPoliciesGet,
  regionSecurityPoliciesInsert,
  regionSecurityPoliciesDelete,
  regionSecurityPoliciesPatch,
  regionSecurityPoliciesAddRule,
  regionSecurityPoliciesGetRule,
  regionSecurityPoliciesPatchRule,
  regionSecurityPoliciesRemoveRule,
  organizationSecurityPoliciesList,
  organizationSecurityPoliciesGet,
  organizationSecurityPoliciesInsert,
  organizationSecurityPoliciesDelete,
  organizationSecurityPoliciesPatch,
  organizationSecurityPoliciesMove,
  organizationSecurityPoliciesGetAssociation,
  organizationSecurityPoliciesAddAssociation,
  organizationSecurityPoliciesRemoveAssociation,
  organizationSecurityPoliciesListAssociations,
  organizationSecurityPoliciesCopyRules,
  organizationSecurityPoliciesGetRule,
  organizationSecurityPoliciesAddRule,
  organizationSecurityPoliciesPatchRule,
  organizationSecurityPoliciesRemoveRule,
  sslCertificatesList,
  sslCertificatesGet,
  sslCertificatesInsert,
  sslCertificatesDelete,
  sslCertificatesAggregatedList,
  regionSslCertificatesList,
  regionSslCertificatesGet,
  regionSslCertificatesInsert,
  regionSslCertificatesDelete,
  sslPoliciesList,
  sslPoliciesGet,
  sslPoliciesInsert,
  sslPoliciesDelete,
  sslPoliciesPatch,
  sslPoliciesListAvailableFeatures,
  regionSslPoliciesList,
  regionSslPoliciesGet,
  regionSslPoliciesInsert,
  regionSslPoliciesDelete,
  regionSslPoliciesPatch,
  regionSslPoliciesListAvailableFeatures,
};
