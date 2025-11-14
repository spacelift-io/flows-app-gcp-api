import foldersGetAutokeyConfig_0 from "./folders/foldersGetAutokeyConfig";
import foldersGetKajPolicyConfig_1 from "./folders/foldersGetKajPolicyConfig";
import foldersUpdateKajPolicyConfig_2 from "./folders/foldersUpdateKajPolicyConfig";
import foldersUpdateAutokeyConfig_3 from "./folders/foldersUpdateAutokeyConfig";
import organizationsUpdateKajPolicyConfig_4 from "./organizations/organizationsUpdateKajPolicyConfig";
import organizationsGetKajPolicyConfig_5 from "./organizations/organizationsGetKajPolicyConfig";
import updateKajPolicyConfig_6 from "./configuration/updateKajPolicyConfig";
import showEffectiveAutokeyConfig_7 from "./configuration/showEffectiveAutokeyConfig";
import showEffectiveKeyAccessJustificationsPolicyConfig_8 from "./configuration/showEffectiveKeyAccessJustificationsPolicyConfig";
import showEffectiveKeyAccessJustificationsEnrollmentConfig_9 from "./configuration/showEffectiveKeyAccessJustificationsEnrollmentConfig";
import getKajPolicyConfig_10 from "./configuration/getKajPolicyConfig";
import getEkmConfig_11 from "./configuration/getEkmConfig";
import updateEkmConfig_12 from "./configuration/updateEkmConfig";
import get_13 from "./operations/get";
import generateRandomBytes_14 from "./operations/generateRandomBytes";
import list_15 from "./operations/list";
import operationsGet_16 from "./operations/operationsGet";
import ekmConnectionsGet_17 from "./ekm_connections/ekmConnectionsGet";
import ekmConnectionsGetIamPolicy_18 from "./ekm_connections/ekmConnectionsGetIamPolicy";
import ekmConnectionsTestIamPermissions_19 from "./ekm_connections/ekmConnectionsTestIamPermissions";
import ekmConnectionsPatch_20 from "./ekm_connections/ekmConnectionsPatch";
import ekmConnectionsSetIamPolicy_21 from "./ekm_connections/ekmConnectionsSetIamPolicy";
import ekmConnectionsList_22 from "./ekm_connections/ekmConnectionsList";
import ekmConnectionsVerifyConnectivity_23 from "./ekm_connections/ekmConnectionsVerifyConnectivity";
import ekmConnectionsCreate_24 from "./ekm_connections/ekmConnectionsCreate";
import keyHandlesGet_25 from "./key_handles/keyHandlesGet";
import keyHandlesList_26 from "./key_handles/keyHandlesList";
import keyHandlesCreate_27 from "./key_handles/keyHandlesCreate";
import ekmConfigGetIamPolicy_28 from "./ekm_config/ekmConfigGetIamPolicy";
import ekmConfigSetIamPolicy_29 from "./ekm_config/ekmConfigSetIamPolicy";
import ekmConfigTestIamPermissions_30 from "./ekm_config/ekmConfigTestIamPermissions";
import keyRingsGet_31 from "./key_rings/keyRingsGet";
import keyRingsGetIamPolicy_32 from "./key_rings/keyRingsGetIamPolicy";
import keyRingsTestIamPermissions_33 from "./key_rings/keyRingsTestIamPermissions";
import keyRingsList_34 from "./key_rings/keyRingsList";
import keyRingsSetIamPolicy_35 from "./key_rings/keyRingsSetIamPolicy";
import keyRingsCreate_36 from "./key_rings/keyRingsCreate";
import importJobsGetIamPolicy_37 from "./import_jobs/importJobsGetIamPolicy";
import importJobsCreate_38 from "./import_jobs/importJobsCreate";
import importJobsSetIamPolicy_39 from "./import_jobs/importJobsSetIamPolicy";
import importJobsGet_40 from "./import_jobs/importJobsGet";
import importJobsList_41 from "./import_jobs/importJobsList";
import importJobsTestIamPermissions_42 from "./import_jobs/importJobsTestIamPermissions";
import cryptoKeysGet_43 from "./crypto_keys/cryptoKeysGet";
import cryptoKeysDecrypt_44 from "./crypto_keys/cryptoKeysDecrypt";
import cryptoKeysPatch_45 from "./crypto_keys/cryptoKeysPatch";
import cryptoKeysSetIamPolicy_46 from "./crypto_keys/cryptoKeysSetIamPolicy";
import cryptoKeysUpdatePrimaryVersion_47 from "./crypto_keys/cryptoKeysUpdatePrimaryVersion";
import cryptoKeysEncrypt_48 from "./crypto_keys/cryptoKeysEncrypt";
import cryptoKeysGetIamPolicy_49 from "./crypto_keys/cryptoKeysGetIamPolicy";
import cryptoKeysCreate_50 from "./crypto_keys/cryptoKeysCreate";
import cryptoKeysList_51 from "./crypto_keys/cryptoKeysList";
import cryptoKeysTestIamPermissions_52 from "./crypto_keys/cryptoKeysTestIamPermissions";
import cryptoKeyVersionsImport_53 from "./crypto_key_versions/cryptoKeyVersionsImport";
import cryptoKeyVersionsDestroy_54 from "./crypto_key_versions/cryptoKeyVersionsDestroy";
import cryptoKeyVersionsDecapsulate_55 from "./crypto_key_versions/cryptoKeyVersionsDecapsulate";
import cryptoKeyVersionsMacSign_56 from "./crypto_key_versions/cryptoKeyVersionsMacSign";
import cryptoKeyVersionsMacVerify_57 from "./crypto_key_versions/cryptoKeyVersionsMacVerify";
import cryptoKeyVersionsRawEncrypt_58 from "./crypto_key_versions/cryptoKeyVersionsRawEncrypt";
import cryptoKeyVersionsCreate_59 from "./crypto_key_versions/cryptoKeyVersionsCreate";
import cryptoKeyVersionsGetPublicKey_60 from "./crypto_key_versions/cryptoKeyVersionsGetPublicKey";
import cryptoKeyVersionsGet_61 from "./crypto_key_versions/cryptoKeyVersionsGet";
import cryptoKeyVersionsAsymmetricDecrypt_62 from "./crypto_key_versions/cryptoKeyVersionsAsymmetricDecrypt";
import cryptoKeyVersionsList_63 from "./crypto_key_versions/cryptoKeyVersionsList";
import cryptoKeyVersionsPatch_64 from "./crypto_key_versions/cryptoKeyVersionsPatch";
import cryptoKeyVersionsRestore_65 from "./crypto_key_versions/cryptoKeyVersionsRestore";
import cryptoKeyVersionsRawDecrypt_66 from "./crypto_key_versions/cryptoKeyVersionsRawDecrypt";
import cryptoKeyVersionsAsymmetricSign_67 from "./crypto_key_versions/cryptoKeyVersionsAsymmetricSign";

export const blocks = {
  folders_foldersGetAutokeyConfig: foldersGetAutokeyConfig_0,
  folders_foldersGetKajPolicyConfig: foldersGetKajPolicyConfig_1,
  folders_foldersUpdateKajPolicyConfig: foldersUpdateKajPolicyConfig_2,
  folders_foldersUpdateAutokeyConfig: foldersUpdateAutokeyConfig_3,
  organizations_organizationsUpdateKajPolicyConfig:
    organizationsUpdateKajPolicyConfig_4,
  organizations_organizationsGetKajPolicyConfig:
    organizationsGetKajPolicyConfig_5,
  configuration_updateKajPolicyConfig: updateKajPolicyConfig_6,
  configuration_showEffectiveAutokeyConfig: showEffectiveAutokeyConfig_7,
  configuration_showEffectiveKeyAccessJustificationsPolicyConfig:
    showEffectiveKeyAccessJustificationsPolicyConfig_8,
  configuration_showEffectiveKeyAccessJustificationsEnrollmentConfig:
    showEffectiveKeyAccessJustificationsEnrollmentConfig_9,
  configuration_getKajPolicyConfig: getKajPolicyConfig_10,
  configuration_getEkmConfig: getEkmConfig_11,
  configuration_updateEkmConfig: updateEkmConfig_12,
  operations_get: get_13,
  operations_generateRandomBytes: generateRandomBytes_14,
  operations_list: list_15,
  operations_operationsGet: operationsGet_16,
  ekm_connections_ekmConnectionsGet: ekmConnectionsGet_17,
  ekm_connections_ekmConnectionsGetIamPolicy: ekmConnectionsGetIamPolicy_18,
  ekm_connections_ekmConnectionsTestIamPermissions:
    ekmConnectionsTestIamPermissions_19,
  ekm_connections_ekmConnectionsPatch: ekmConnectionsPatch_20,
  ekm_connections_ekmConnectionsSetIamPolicy: ekmConnectionsSetIamPolicy_21,
  ekm_connections_ekmConnectionsList: ekmConnectionsList_22,
  ekm_connections_ekmConnectionsVerifyConnectivity:
    ekmConnectionsVerifyConnectivity_23,
  ekm_connections_ekmConnectionsCreate: ekmConnectionsCreate_24,
  key_handles_keyHandlesGet: keyHandlesGet_25,
  key_handles_keyHandlesList: keyHandlesList_26,
  key_handles_keyHandlesCreate: keyHandlesCreate_27,
  ekm_config_ekmConfigGetIamPolicy: ekmConfigGetIamPolicy_28,
  ekm_config_ekmConfigSetIamPolicy: ekmConfigSetIamPolicy_29,
  ekm_config_ekmConfigTestIamPermissions: ekmConfigTestIamPermissions_30,
  key_rings_keyRingsGet: keyRingsGet_31,
  key_rings_keyRingsGetIamPolicy: keyRingsGetIamPolicy_32,
  key_rings_keyRingsTestIamPermissions: keyRingsTestIamPermissions_33,
  key_rings_keyRingsList: keyRingsList_34,
  key_rings_keyRingsSetIamPolicy: keyRingsSetIamPolicy_35,
  key_rings_keyRingsCreate: keyRingsCreate_36,
  import_jobs_importJobsGetIamPolicy: importJobsGetIamPolicy_37,
  import_jobs_importJobsCreate: importJobsCreate_38,
  import_jobs_importJobsSetIamPolicy: importJobsSetIamPolicy_39,
  import_jobs_importJobsGet: importJobsGet_40,
  import_jobs_importJobsList: importJobsList_41,
  import_jobs_importJobsTestIamPermissions: importJobsTestIamPermissions_42,
  crypto_keys_cryptoKeysGet: cryptoKeysGet_43,
  crypto_keys_cryptoKeysDecrypt: cryptoKeysDecrypt_44,
  crypto_keys_cryptoKeysPatch: cryptoKeysPatch_45,
  crypto_keys_cryptoKeysSetIamPolicy: cryptoKeysSetIamPolicy_46,
  crypto_keys_cryptoKeysUpdatePrimaryVersion: cryptoKeysUpdatePrimaryVersion_47,
  crypto_keys_cryptoKeysEncrypt: cryptoKeysEncrypt_48,
  crypto_keys_cryptoKeysGetIamPolicy: cryptoKeysGetIamPolicy_49,
  crypto_keys_cryptoKeysCreate: cryptoKeysCreate_50,
  crypto_keys_cryptoKeysList: cryptoKeysList_51,
  crypto_keys_cryptoKeysTestIamPermissions: cryptoKeysTestIamPermissions_52,
  crypto_key_versions_cryptoKeyVersionsImport: cryptoKeyVersionsImport_53,
  crypto_key_versions_cryptoKeyVersionsDestroy: cryptoKeyVersionsDestroy_54,
  crypto_key_versions_cryptoKeyVersionsDecapsulate:
    cryptoKeyVersionsDecapsulate_55,
  crypto_key_versions_cryptoKeyVersionsMacSign: cryptoKeyVersionsMacSign_56,
  crypto_key_versions_cryptoKeyVersionsMacVerify: cryptoKeyVersionsMacVerify_57,
  crypto_key_versions_cryptoKeyVersionsRawEncrypt:
    cryptoKeyVersionsRawEncrypt_58,
  crypto_key_versions_cryptoKeyVersionsCreate: cryptoKeyVersionsCreate_59,
  crypto_key_versions_cryptoKeyVersionsGetPublicKey:
    cryptoKeyVersionsGetPublicKey_60,
  crypto_key_versions_cryptoKeyVersionsGet: cryptoKeyVersionsGet_61,
  crypto_key_versions_cryptoKeyVersionsAsymmetricDecrypt:
    cryptoKeyVersionsAsymmetricDecrypt_62,
  crypto_key_versions_cryptoKeyVersionsList: cryptoKeyVersionsList_63,
  crypto_key_versions_cryptoKeyVersionsPatch: cryptoKeyVersionsPatch_64,
  crypto_key_versions_cryptoKeyVersionsRestore: cryptoKeyVersionsRestore_65,
  crypto_key_versions_cryptoKeyVersionsRawDecrypt:
    cryptoKeyVersionsRawDecrypt_66,
  crypto_key_versions_cryptoKeyVersionsAsymmetricSign:
    cryptoKeyVersionsAsymmetricSign_67,
};
