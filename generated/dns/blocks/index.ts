import changesList from "./changes/changesList";
import changesCreate from "./changes/changesCreate";
import changesGet from "./changes/changesGet";
import managedZonesCreate from "./managed_zones/managedZonesCreate";
import managedZonesPatch from "./managed_zones/managedZonesPatch";
import managedZonesTestIamPermissions from "./managed_zones/managedZonesTestIamPermissions";
import managedZonesGetIamPolicy from "./managed_zones/managedZonesGetIamPolicy";
import managedZonesUpdate from "./managed_zones/managedZonesUpdate";
import managedZonesDelete from "./managed_zones/managedZonesDelete";
import managedZonesGet from "./managed_zones/managedZonesGet";
import managedZonesList from "./managed_zones/managedZonesList";
import managedZonesSetIamPolicy from "./managed_zones/managedZonesSetIamPolicy";
import get from "./get/get";
import policiesDelete from "./policies/policiesDelete";
import policiesCreate from "./policies/policiesCreate";
import policiesUpdate from "./policies/policiesUpdate";
import policiesPatch from "./policies/policiesPatch";
import policiesGet from "./policies/policiesGet";
import policiesList from "./policies/policiesList";
import responsePolicyRulesGet from "./response_policy_rules/responsePolicyRulesGet";
import responsePolicyRulesPatch from "./response_policy_rules/responsePolicyRulesPatch";
import responsePolicyRulesList from "./response_policy_rules/responsePolicyRulesList";
import responsePolicyRulesCreate from "./response_policy_rules/responsePolicyRulesCreate";
import responsePolicyRulesDelete from "./response_policy_rules/responsePolicyRulesDelete";
import responsePolicyRulesUpdate from "./response_policy_rules/responsePolicyRulesUpdate";
import resourceRecordSetsPatch from "./resource_record_sets/resourceRecordSetsPatch";
import resourceRecordSetsGet from "./resource_record_sets/resourceRecordSetsGet";
import resourceRecordSetsDelete from "./resource_record_sets/resourceRecordSetsDelete";
import resourceRecordSetsList from "./resource_record_sets/resourceRecordSetsList";
import resourceRecordSetsCreate from "./resource_record_sets/resourceRecordSetsCreate";
import responsePoliciesList from "./response_policies/responsePoliciesList";
import responsePoliciesGet from "./response_policies/responsePoliciesGet";
import responsePoliciesCreate from "./response_policies/responsePoliciesCreate";
import responsePoliciesUpdate from "./response_policies/responsePoliciesUpdate";
import responsePoliciesDelete from "./response_policies/responsePoliciesDelete";
import responsePoliciesPatch from "./response_policies/responsePoliciesPatch";
import managedZoneOperationsGet from "./managed_zone_operations/managedZoneOperationsGet";
import managedZoneOperationsList from "./managed_zone_operations/managedZoneOperationsList";
import dnsKeysList from "./dns_keys/dnsKeysList";
import dnsKeysGet from "./dns_keys/dnsKeysGet";

export const blocks = {
  changesList,
  changesCreate,
  changesGet,
  managedZonesCreate,
  managedZonesPatch,
  managedZonesTestIamPermissions,
  managedZonesGetIamPolicy,
  managedZonesUpdate,
  managedZonesDelete,
  managedZonesGet,
  managedZonesList,
  managedZonesSetIamPolicy,
  get,
  policiesDelete,
  policiesCreate,
  policiesUpdate,
  policiesPatch,
  policiesGet,
  policiesList,
  responsePolicyRulesGet,
  responsePolicyRulesPatch,
  responsePolicyRulesList,
  responsePolicyRulesCreate,
  responsePolicyRulesDelete,
  responsePolicyRulesUpdate,
  resourceRecordSetsPatch,
  resourceRecordSetsGet,
  resourceRecordSetsDelete,
  resourceRecordSetsList,
  resourceRecordSetsCreate,
  responsePoliciesList,
  responsePoliciesGet,
  responsePoliciesCreate,
  responsePoliciesUpdate,
  responsePoliciesDelete,
  responsePoliciesPatch,
  managedZoneOperationsGet,
  managedZoneOperationsList,
  dnsKeysList,
  dnsKeysGet,
};
