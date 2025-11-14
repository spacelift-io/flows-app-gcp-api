import locationsList from "./locations/locationsList";
import locationsGet from "./locations/locationsGet";
import locationsOperationsGet from "./locations/locationsOperationsGet";
import locationsOperationsCancel from "./locations/locationsOperationsCancel";
import locationsConnectionsCreate from "./locations/locationsConnectionsCreate";
import locationsConnectionsGet from "./locations/locationsConnectionsGet";
import locationsConnectionsList from "./locations/locationsConnectionsList";
import locationsConnectionsPatch from "./locations/locationsConnectionsPatch";
import locationsConnectionsDelete from "./locations/locationsConnectionsDelete";
import locationsConnectionsProcessWebhook from "./locations/locationsConnectionsProcessWebhook";
import locationsConnectionsFetchLinkableRepositories from "./locations/locationsConnectionsFetchLinkableRepositories";
import locationsConnectionsSetIamPolicy from "./locations/locationsConnectionsSetIamPolicy";
import locationsConnectionsGetIamPolicy from "./locations/locationsConnectionsGetIamPolicy";
import locationsConnectionsTestIamPermissions from "./locations/locationsConnectionsTestIamPermissions";
import locationsConnectionsRepositoriesCreate from "./locations/locationsConnectionsRepositoriesCreate";
import locationsConnectionsRepositoriesBatchCreate from "./locations/locationsConnectionsRepositoriesBatchCreate";
import locationsConnectionsRepositoriesGet from "./locations/locationsConnectionsRepositoriesGet";
import locationsConnectionsRepositoriesList from "./locations/locationsConnectionsRepositoriesList";
import locationsConnectionsRepositoriesDelete from "./locations/locationsConnectionsRepositoriesDelete";
import locationsConnectionsRepositoriesAccessReadWriteToken from "./locations/locationsConnectionsRepositoriesAccessReadWriteToken";
import locationsConnectionsRepositoriesAccessReadToken from "./locations/locationsConnectionsRepositoriesAccessReadToken";
import locationsConnectionsRepositoriesFetchGitRefs from "./locations/locationsConnectionsRepositoriesFetchGitRefs";

export const blocks = {
  locationsList,
  locationsGet,
  locationsOperationsGet,
  locationsOperationsCancel,
  locationsConnectionsCreate,
  locationsConnectionsGet,
  locationsConnectionsList,
  locationsConnectionsPatch,
  locationsConnectionsDelete,
  locationsConnectionsProcessWebhook,
  locationsConnectionsFetchLinkableRepositories,
  locationsConnectionsSetIamPolicy,
  locationsConnectionsGetIamPolicy,
  locationsConnectionsTestIamPermissions,
  locationsConnectionsRepositoriesCreate,
  locationsConnectionsRepositoriesBatchCreate,
  locationsConnectionsRepositoriesGet,
  locationsConnectionsRepositoriesList,
  locationsConnectionsRepositoriesDelete,
  locationsConnectionsRepositoriesAccessReadWriteToken,
  locationsConnectionsRepositoriesAccessReadToken,
  locationsConnectionsRepositoriesFetchGitRefs,
};
