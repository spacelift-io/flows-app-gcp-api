import instancesAddServerCa from "./instances/instancesAddServerCa";
import instancesAddServerCertificate from "./instances/instancesAddServerCertificate";
import instancesClone from "./instances/instancesClone";
import instancesDelete from "./instances/instancesDelete";
import instancesDemoteMaster from "./instances/instancesDemoteMaster";
import instancesDemote from "./instances/instancesDemote";
import instancesExport from "./instances/instancesExport";
import instancesFailover from "./instances/instancesFailover";
import instancesReencrypt from "./instances/instancesReencrypt";
import instancesGet from "./instances/instancesGet";
import instancesImport from "./instances/instancesImport";
import instancesInsert from "./instances/instancesInsert";
import instancesList from "./instances/instancesList";
import instancesListServerCas from "./instances/instancesListServerCas";
import instancesListServerCertificates from "./instances/instancesListServerCertificates";
import instancesListEntraIdCertificates from "./instances/instancesListEntraIdCertificates";
import instancesPatch from "./instances/instancesPatch";
import instancesPromoteReplica from "./instances/instancesPromoteReplica";
import instancesSwitchover from "./instances/instancesSwitchover";
import instancesResetSslConfig from "./instances/instancesResetSslConfig";
import instancesRestart from "./instances/instancesRestart";
import instancesRestoreBackup from "./instances/instancesRestoreBackup";
import instancesRotateServerCa from "./instances/instancesRotateServerCa";
import instancesRotateServerCertificate from "./instances/instancesRotateServerCertificate";
import instancesRotateEntraIdCertificate from "./instances/instancesRotateEntraIdCertificate";
import instancesStartReplica from "./instances/instancesStartReplica";
import instancesStopReplica from "./instances/instancesStopReplica";
import instancesTruncateLog from "./instances/instancesTruncateLog";
import instancesUpdate from "./instances/instancesUpdate";
import instancesExecuteSql from "./instances/instancesExecuteSql";
import instancesAcquireSsrsLease from "./instances/instancesAcquireSsrsLease";
import instancesReleaseSsrsLease from "./instances/instancesReleaseSsrsLease";
import instancesPreCheckMajorVersionUpgrade from "./instances/instancesPreCheckMajorVersionUpgrade";
import instancesPointInTimeRestore from "./instances/instancesPointInTimeRestore";
import instancesRescheduleMaintenance from "./instances/instancesRescheduleMaintenance";
import instancesVerifyExternalSyncSettings from "./instances/instancesVerifyExternalSyncSettings";
import instancesStartExternalSync from "./instances/instancesStartExternalSync";
import instancesPerformDiskShrink from "./instances/instancesPerformDiskShrink";
import instancesGetDiskShrinkConfig from "./instances/instancesGetDiskShrinkConfig";
import instancesResetReplicaSize from "./instances/instancesResetReplicaSize";
import instancesGetLatestRecoveryTime from "./instances/instancesGetLatestRecoveryTime";
import sslCertsCreateEphemeral from "./ssl_certs/sslCertsCreateEphemeral";
import sslCertsDelete from "./ssl_certs/sslCertsDelete";
import sslCertsGet from "./ssl_certs/sslCertsGet";
import sslCertsInsert from "./ssl_certs/sslCertsInsert";
import sslCertsList from "./ssl_certs/sslCertsList";
import backupRunsDelete from "./backup_runs/backupRunsDelete";
import backupRunsGet from "./backup_runs/backupRunsGet";
import backupRunsInsert from "./backup_runs/backupRunsInsert";
import backupRunsList from "./backup_runs/backupRunsList";
import BackupsCreateBackup from "./backups/BackupsCreateBackup";
import BackupsGetBackup from "./backups/BackupsGetBackup";
import BackupsListBackups from "./backups/BackupsListBackups";
import BackupsUpdateBackup from "./backups/BackupsUpdateBackup";
import BackupsDeleteBackup from "./backups/BackupsDeleteBackup";
import connectGet from "./connect/connectGet";
import connectGenerateEphemeralCert from "./connect/connectGenerateEphemeralCert";
import databasesDelete from "./databases/databasesDelete";
import databasesGet from "./databases/databasesGet";
import databasesInsert from "./databases/databasesInsert";
import databasesList from "./databases/databasesList";
import databasesPatch from "./databases/databasesPatch";
import databasesUpdate from "./databases/databasesUpdate";
import flagsList from "./flags/flagsList";
import operationsGet from "./operations/operationsGet";
import operationsList from "./operations/operationsList";
import operationsCancel from "./operations/operationsCancel";
import tiersList from "./tiers/tiersList";
import usersDelete from "./users/usersDelete";
import usersGet from "./users/usersGet";
import usersInsert from "./users/usersInsert";
import usersList from "./users/usersList";
import usersUpdate from "./users/usersUpdate";

export const blocks = {
  instancesAddServerCa,
  instancesAddServerCertificate,
  instancesClone,
  instancesDelete,
  instancesDemoteMaster,
  instancesDemote,
  instancesExport,
  instancesFailover,
  instancesReencrypt,
  instancesGet,
  instancesImport,
  instancesInsert,
  instancesList,
  instancesListServerCas,
  instancesListServerCertificates,
  instancesListEntraIdCertificates,
  instancesPatch,
  instancesPromoteReplica,
  instancesSwitchover,
  instancesResetSslConfig,
  instancesRestart,
  instancesRestoreBackup,
  instancesRotateServerCa,
  instancesRotateServerCertificate,
  instancesRotateEntraIdCertificate,
  instancesStartReplica,
  instancesStopReplica,
  instancesTruncateLog,
  instancesUpdate,
  instancesExecuteSql,
  instancesAcquireSsrsLease,
  instancesReleaseSsrsLease,
  instancesPreCheckMajorVersionUpgrade,
  instancesPointInTimeRestore,
  instancesRescheduleMaintenance,
  instancesVerifyExternalSyncSettings,
  instancesStartExternalSync,
  instancesPerformDiskShrink,
  instancesGetDiskShrinkConfig,
  instancesResetReplicaSize,
  instancesGetLatestRecoveryTime,
  sslCertsCreateEphemeral,
  sslCertsDelete,
  sslCertsGet,
  sslCertsInsert,
  sslCertsList,
  backupRunsDelete,
  backupRunsGet,
  backupRunsInsert,
  backupRunsList,
  BackupsCreateBackup,
  BackupsGetBackup,
  BackupsListBackups,
  BackupsUpdateBackup,
  BackupsDeleteBackup,
  connectGet,
  connectGenerateEphemeralCert,
  databasesDelete,
  databasesGet,
  databasesInsert,
  databasesList,
  databasesPatch,
  databasesUpdate,
  flagsList,
  operationsGet,
  operationsList,
  operationsCancel,
  tiersList,
  usersDelete,
  usersGet,
  usersInsert,
  usersList,
  usersUpdate,
};
