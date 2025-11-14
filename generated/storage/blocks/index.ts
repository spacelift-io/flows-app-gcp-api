import anywhereCachesInsert from "./anywhere_caches/anywhereCachesInsert";
import anywhereCachesUpdate from "./anywhere_caches/anywhereCachesUpdate";
import anywhereCachesGet from "./anywhere_caches/anywhereCachesGet";
import anywhereCachesList from "./anywhere_caches/anywhereCachesList";
import anywhereCachesPause from "./anywhere_caches/anywhereCachesPause";
import anywhereCachesResume from "./anywhere_caches/anywhereCachesResume";
import anywhereCachesDisable from "./anywhere_caches/anywhereCachesDisable";
import bucketAccessControlsDelete from "./bucket_access_controls/bucketAccessControlsDelete";
import bucketAccessControlsGet from "./bucket_access_controls/bucketAccessControlsGet";
import bucketAccessControlsInsert from "./bucket_access_controls/bucketAccessControlsInsert";
import bucketAccessControlsList from "./bucket_access_controls/bucketAccessControlsList";
import bucketAccessControlsPatch from "./bucket_access_controls/bucketAccessControlsPatch";
import bucketAccessControlsUpdate from "./bucket_access_controls/bucketAccessControlsUpdate";
import bucketsDelete from "./buckets/bucketsDelete";
import bucketsRestore from "./buckets/bucketsRestore";
import bucketsRelocate from "./buckets/bucketsRelocate";
import bucketsGet from "./buckets/bucketsGet";
import bucketsGetIamPolicy from "./buckets/bucketsGetIamPolicy";
import bucketsGetStorageLayout from "./buckets/bucketsGetStorageLayout";
import bucketsInsert from "./buckets/bucketsInsert";
import bucketsList from "./buckets/bucketsList";
import bucketsLockRetentionPolicy from "./buckets/bucketsLockRetentionPolicy";
import bucketsPatch from "./buckets/bucketsPatch";
import bucketsSetIamPolicy from "./buckets/bucketsSetIamPolicy";
import bucketsTestIamPermissions from "./buckets/bucketsTestIamPermissions";
import bucketsUpdate from "./buckets/bucketsUpdate";
import operationsCancel from "./operations/operationsCancel";
import operationsGet from "./operations/operationsGet";
import operationsAdvanceRelocateBucket from "./operations/operationsAdvanceRelocateBucket";
import operationsList from "./operations/operationsList";
import channelsStop from "./channels/channelsStop";
import defaultObjectAccessControlsDelete from "./default_object_access_controls/defaultObjectAccessControlsDelete";
import defaultObjectAccessControlsGet from "./default_object_access_controls/defaultObjectAccessControlsGet";
import defaultObjectAccessControlsInsert from "./default_object_access_controls/defaultObjectAccessControlsInsert";
import defaultObjectAccessControlsList from "./default_object_access_controls/defaultObjectAccessControlsList";
import defaultObjectAccessControlsPatch from "./default_object_access_controls/defaultObjectAccessControlsPatch";
import defaultObjectAccessControlsUpdate from "./default_object_access_controls/defaultObjectAccessControlsUpdate";
import foldersDelete from "./folders/foldersDelete";
import foldersGet from "./folders/foldersGet";
import foldersInsert from "./folders/foldersInsert";
import foldersList from "./folders/foldersList";
import foldersRename from "./folders/foldersRename";
import managedFoldersDelete from "./managed_folders/managedFoldersDelete";
import managedFoldersGet from "./managed_folders/managedFoldersGet";
import managedFoldersGetIamPolicy from "./managed_folders/managedFoldersGetIamPolicy";
import managedFoldersInsert from "./managed_folders/managedFoldersInsert";
import managedFoldersList from "./managed_folders/managedFoldersList";
import managedFoldersSetIamPolicy from "./managed_folders/managedFoldersSetIamPolicy";
import managedFoldersTestIamPermissions from "./managed_folders/managedFoldersTestIamPermissions";
import notificationsDelete from "./notifications/notificationsDelete";
import notificationsGet from "./notifications/notificationsGet";
import notificationsInsert from "./notifications/notificationsInsert";
import notificationsList from "./notifications/notificationsList";
import objectAccessControlsDelete from "./object_access_controls/objectAccessControlsDelete";
import objectAccessControlsGet from "./object_access_controls/objectAccessControlsGet";
import objectAccessControlsInsert from "./object_access_controls/objectAccessControlsInsert";
import objectAccessControlsList from "./object_access_controls/objectAccessControlsList";
import objectAccessControlsPatch from "./object_access_controls/objectAccessControlsPatch";
import objectAccessControlsUpdate from "./object_access_controls/objectAccessControlsUpdate";
import objectsCompose from "./objects/objectsCompose";
import objectsCopy from "./objects/objectsCopy";
import objectsDelete from "./objects/objectsDelete";
import objectsGet from "./objects/objectsGet";
import objectsGetIamPolicy from "./objects/objectsGetIamPolicy";
import objectsInsert from "./objects/objectsInsert";
import objectsList from "./objects/objectsList";
import objectsPatch from "./objects/objectsPatch";
import objectsRewrite from "./objects/objectsRewrite";
import objectsMove from "./objects/objectsMove";
import objectsSetIamPolicy from "./objects/objectsSetIamPolicy";
import objectsTestIamPermissions from "./objects/objectsTestIamPermissions";
import objectsUpdate from "./objects/objectsUpdate";
import objectsWatchAll from "./objects/objectsWatchAll";
import objectsRestore from "./objects/objectsRestore";
import objectsBulkRestore from "./objects/objectsBulkRestore";
import hmacKeysCreate from "./hmac_keys/hmacKeysCreate";
import hmacKeysDelete from "./hmac_keys/hmacKeysDelete";
import hmacKeysGet from "./hmac_keys/hmacKeysGet";
import hmacKeysList from "./hmac_keys/hmacKeysList";
import hmacKeysUpdate from "./hmac_keys/hmacKeysUpdate";
import serviceAccountGet from "./service_account/serviceAccountGet";

export const blocks = {
  anywhereCachesInsert,
  anywhereCachesUpdate,
  anywhereCachesGet,
  anywhereCachesList,
  anywhereCachesPause,
  anywhereCachesResume,
  anywhereCachesDisable,
  bucketAccessControlsDelete,
  bucketAccessControlsGet,
  bucketAccessControlsInsert,
  bucketAccessControlsList,
  bucketAccessControlsPatch,
  bucketAccessControlsUpdate,
  bucketsDelete,
  bucketsRestore,
  bucketsRelocate,
  bucketsGet,
  bucketsGetIamPolicy,
  bucketsGetStorageLayout,
  bucketsInsert,
  bucketsList,
  bucketsLockRetentionPolicy,
  bucketsPatch,
  bucketsSetIamPolicy,
  bucketsTestIamPermissions,
  bucketsUpdate,
  operationsCancel,
  operationsGet,
  operationsAdvanceRelocateBucket,
  operationsList,
  channelsStop,
  defaultObjectAccessControlsDelete,
  defaultObjectAccessControlsGet,
  defaultObjectAccessControlsInsert,
  defaultObjectAccessControlsList,
  defaultObjectAccessControlsPatch,
  defaultObjectAccessControlsUpdate,
  foldersDelete,
  foldersGet,
  foldersInsert,
  foldersList,
  foldersRename,
  managedFoldersDelete,
  managedFoldersGet,
  managedFoldersGetIamPolicy,
  managedFoldersInsert,
  managedFoldersList,
  managedFoldersSetIamPolicy,
  managedFoldersTestIamPermissions,
  notificationsDelete,
  notificationsGet,
  notificationsInsert,
  notificationsList,
  objectAccessControlsDelete,
  objectAccessControlsGet,
  objectAccessControlsInsert,
  objectAccessControlsList,
  objectAccessControlsPatch,
  objectAccessControlsUpdate,
  objectsCompose,
  objectsCopy,
  objectsDelete,
  objectsGet,
  objectsGetIamPolicy,
  objectsInsert,
  objectsList,
  objectsPatch,
  objectsRewrite,
  objectsMove,
  objectsSetIamPolicy,
  objectsTestIamPermissions,
  objectsUpdate,
  objectsWatchAll,
  objectsRestore,
  objectsBulkRestore,
  hmacKeysCreate,
  hmacKeysDelete,
  hmacKeysGet,
  hmacKeysList,
  hmacKeysUpdate,
  serviceAccountGet,
};
