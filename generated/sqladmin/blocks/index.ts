import instancesAddServerCa_0 from "./instances/instancesAddServerCa";
import instancesAddServerCertificate_1 from "./instances/instancesAddServerCertificate";
import instancesClone_2 from "./instances/instancesClone";
import instancesDelete_3 from "./instances/instancesDelete";
import instancesDemoteMaster_4 from "./instances/instancesDemoteMaster";
import instancesDemote_5 from "./instances/instancesDemote";
import instancesExport_6 from "./instances/instancesExport";
import instancesFailover_7 from "./instances/instancesFailover";
import instancesReencrypt_8 from "./instances/instancesReencrypt";
import instancesGet_9 from "./instances/instancesGet";
import instancesImport_10 from "./instances/instancesImport";
import instancesInsert_11 from "./instances/instancesInsert";
import instancesList_12 from "./instances/instancesList";
import instancesListServerCas_13 from "./instances/instancesListServerCas";
import instancesListServerCertificates_14 from "./instances/instancesListServerCertificates";
import instancesListEntraIdCertificates_15 from "./instances/instancesListEntraIdCertificates";
import instancesPatch_16 from "./instances/instancesPatch";
import instancesPromoteReplica_17 from "./instances/instancesPromoteReplica";
import instancesSwitchover_18 from "./instances/instancesSwitchover";
import instancesResetSslConfig_19 from "./instances/instancesResetSslConfig";
import instancesRestart_20 from "./instances/instancesRestart";
import instancesRestoreBackup_21 from "./instances/instancesRestoreBackup";
import instancesRotateServerCa_22 from "./instances/instancesRotateServerCa";
import instancesRotateServerCertificate_23 from "./instances/instancesRotateServerCertificate";
import instancesRotateEntraIdCertificate_24 from "./instances/instancesRotateEntraIdCertificate";
import instancesStartReplica_25 from "./instances/instancesStartReplica";
import instancesStopReplica_26 from "./instances/instancesStopReplica";
import instancesTruncateLog_27 from "./instances/instancesTruncateLog";
import instancesUpdate_28 from "./instances/instancesUpdate";
import instancesExecuteSql_29 from "./instances/instancesExecuteSql";
import instancesAcquireSsrsLease_30 from "./instances/instancesAcquireSsrsLease";
import instancesReleaseSsrsLease_31 from "./instances/instancesReleaseSsrsLease";
import instancesPreCheckMajorVersionUpgrade_32 from "./instances/instancesPreCheckMajorVersionUpgrade";
import instancesPointInTimeRestore_33 from "./instances/instancesPointInTimeRestore";
import instancesRescheduleMaintenance_34 from "./instances/instancesRescheduleMaintenance";
import instancesVerifyExternalSyncSettings_35 from "./instances/instancesVerifyExternalSyncSettings";
import instancesStartExternalSync_36 from "./instances/instancesStartExternalSync";
import instancesPerformDiskShrink_37 from "./instances/instancesPerformDiskShrink";
import instancesGetDiskShrinkConfig_38 from "./instances/instancesGetDiskShrinkConfig";
import instancesResetReplicaSize_39 from "./instances/instancesResetReplicaSize";
import instancesGetLatestRecoveryTime_40 from "./instances/instancesGetLatestRecoveryTime";
import sslCertsCreateEphemeral_41 from "./ssl_certs/sslCertsCreateEphemeral";
import sslCertsDelete_42 from "./ssl_certs/sslCertsDelete";
import sslCertsGet_43 from "./ssl_certs/sslCertsGet";
import sslCertsInsert_44 from "./ssl_certs/sslCertsInsert";
import sslCertsList_45 from "./ssl_certs/sslCertsList";
import backupRunsDelete_46 from "./backup_runs/backupRunsDelete";
import backupRunsGet_47 from "./backup_runs/backupRunsGet";
import backupRunsInsert_48 from "./backup_runs/backupRunsInsert";
import backupRunsList_49 from "./backup_runs/backupRunsList";
import BackupsCreateBackup_50 from "./backups/BackupsCreateBackup";
import BackupsGetBackup_51 from "./backups/BackupsGetBackup";
import BackupsListBackups_52 from "./backups/BackupsListBackups";
import BackupsUpdateBackup_53 from "./backups/BackupsUpdateBackup";
import BackupsDeleteBackup_54 from "./backups/BackupsDeleteBackup";
import connectGet_55 from "./connect/connectGet";
import connectGenerateEphemeralCert_56 from "./connect/connectGenerateEphemeralCert";
import databasesDelete_57 from "./databases/databasesDelete";
import databasesGet_58 from "./databases/databasesGet";
import databasesInsert_59 from "./databases/databasesInsert";
import databasesList_60 from "./databases/databasesList";
import databasesPatch_61 from "./databases/databasesPatch";
import databasesUpdate_62 from "./databases/databasesUpdate";
import flagsList_63 from "./flags/flagsList";
import operationsGet_64 from "./operations/operationsGet";
import operationsList_65 from "./operations/operationsList";
import operationsCancel_66 from "./operations/operationsCancel";
import tiersList_67 from "./tiers/tiersList";
import usersDelete_68 from "./users/usersDelete";
import usersGet_69 from "./users/usersGet";
import usersInsert_70 from "./users/usersInsert";
import usersList_71 from "./users/usersList";
import usersUpdate_72 from "./users/usersUpdate";

export const blocks = {
  instances_instancesAddServerCa: instancesAddServerCa_0,
  instances_instancesAddServerCertificate: instancesAddServerCertificate_1,
  instances_instancesClone: instancesClone_2,
  instances_instancesDelete: instancesDelete_3,
  instances_instancesDemoteMaster: instancesDemoteMaster_4,
  instances_instancesDemote: instancesDemote_5,
  instances_instancesExport: instancesExport_6,
  instances_instancesFailover: instancesFailover_7,
  instances_instancesReencrypt: instancesReencrypt_8,
  instances_instancesGet: instancesGet_9,
  instances_instancesImport: instancesImport_10,
  instances_instancesInsert: instancesInsert_11,
  instances_instancesList: instancesList_12,
  instances_instancesListServerCas: instancesListServerCas_13,
  instances_instancesListServerCertificates: instancesListServerCertificates_14,
  instances_instancesListEntraIdCertificates:
    instancesListEntraIdCertificates_15,
  instances_instancesPatch: instancesPatch_16,
  instances_instancesPromoteReplica: instancesPromoteReplica_17,
  instances_instancesSwitchover: instancesSwitchover_18,
  instances_instancesResetSslConfig: instancesResetSslConfig_19,
  instances_instancesRestart: instancesRestart_20,
  instances_instancesRestoreBackup: instancesRestoreBackup_21,
  instances_instancesRotateServerCa: instancesRotateServerCa_22,
  instances_instancesRotateServerCertificate:
    instancesRotateServerCertificate_23,
  instances_instancesRotateEntraIdCertificate:
    instancesRotateEntraIdCertificate_24,
  instances_instancesStartReplica: instancesStartReplica_25,
  instances_instancesStopReplica: instancesStopReplica_26,
  instances_instancesTruncateLog: instancesTruncateLog_27,
  instances_instancesUpdate: instancesUpdate_28,
  instances_instancesExecuteSql: instancesExecuteSql_29,
  instances_instancesAcquireSsrsLease: instancesAcquireSsrsLease_30,
  instances_instancesReleaseSsrsLease: instancesReleaseSsrsLease_31,
  instances_instancesPreCheckMajorVersionUpgrade:
    instancesPreCheckMajorVersionUpgrade_32,
  instances_instancesPointInTimeRestore: instancesPointInTimeRestore_33,
  instances_instancesRescheduleMaintenance: instancesRescheduleMaintenance_34,
  instances_instancesVerifyExternalSyncSettings:
    instancesVerifyExternalSyncSettings_35,
  instances_instancesStartExternalSync: instancesStartExternalSync_36,
  instances_instancesPerformDiskShrink: instancesPerformDiskShrink_37,
  instances_instancesGetDiskShrinkConfig: instancesGetDiskShrinkConfig_38,
  instances_instancesResetReplicaSize: instancesResetReplicaSize_39,
  instances_instancesGetLatestRecoveryTime: instancesGetLatestRecoveryTime_40,
  ssl_certs_sslCertsCreateEphemeral: sslCertsCreateEphemeral_41,
  ssl_certs_sslCertsDelete: sslCertsDelete_42,
  ssl_certs_sslCertsGet: sslCertsGet_43,
  ssl_certs_sslCertsInsert: sslCertsInsert_44,
  ssl_certs_sslCertsList: sslCertsList_45,
  backup_runs_backupRunsDelete: backupRunsDelete_46,
  backup_runs_backupRunsGet: backupRunsGet_47,
  backup_runs_backupRunsInsert: backupRunsInsert_48,
  backup_runs_backupRunsList: backupRunsList_49,
  backups_BackupsCreateBackup: BackupsCreateBackup_50,
  backups_BackupsGetBackup: BackupsGetBackup_51,
  backups_BackupsListBackups: BackupsListBackups_52,
  backups_BackupsUpdateBackup: BackupsUpdateBackup_53,
  backups_BackupsDeleteBackup: BackupsDeleteBackup_54,
  connect_connectGet: connectGet_55,
  connect_connectGenerateEphemeralCert: connectGenerateEphemeralCert_56,
  databases_databasesDelete: databasesDelete_57,
  databases_databasesGet: databasesGet_58,
  databases_databasesInsert: databasesInsert_59,
  databases_databasesList: databasesList_60,
  databases_databasesPatch: databasesPatch_61,
  databases_databasesUpdate: databasesUpdate_62,
  flags_flagsList: flagsList_63,
  operations_operationsGet: operationsGet_64,
  operations_operationsList: operationsList_65,
  operations_operationsCancel: operationsCancel_66,
  tiers_tiersList: tiersList_67,
  users_usersDelete: usersDelete_68,
  users_usersGet: usersGet_69,
  users_usersInsert: usersInsert_70,
  users_usersList: usersList_71,
  users_usersUpdate: usersUpdate_72,
};
