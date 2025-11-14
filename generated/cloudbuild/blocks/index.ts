import list_0 from "./operations/list";
import get_1 from "./operations/get";
import operationsGet_2 from "./operations/operationsGet";
import operationsCancel_3 from "./operations/operationsCancel";
import connectionsCreate_4 from "./connections/connectionsCreate";
import connectionsGet_5 from "./connections/connectionsGet";
import connectionsList_6 from "./connections/connectionsList";
import connectionsPatch_7 from "./connections/connectionsPatch";
import connectionsDelete_8 from "./connections/connectionsDelete";
import connectionsProcessWebhook_9 from "./connections/connectionsProcessWebhook";
import connectionsFetchLinkableRepositories_10 from "./connections/connectionsFetchLinkableRepositories";
import connectionsSetIamPolicy_11 from "./connections/connectionsSetIamPolicy";
import connectionsGetIamPolicy_12 from "./connections/connectionsGetIamPolicy";
import connectionsTestIamPermissions_13 from "./connections/connectionsTestIamPermissions";
import repositoriesCreate_14 from "./repositories/repositoriesCreate";
import repositoriesBatchCreate_15 from "./repositories/repositoriesBatchCreate";
import repositoriesGet_16 from "./repositories/repositoriesGet";
import repositoriesList_17 from "./repositories/repositoriesList";
import repositoriesDelete_18 from "./repositories/repositoriesDelete";
import repositoriesAccessReadWriteToken_19 from "./repositories/repositoriesAccessReadWriteToken";
import repositoriesAccessReadToken_20 from "./repositories/repositoriesAccessReadToken";
import repositoriesFetchGitRefs_21 from "./repositories/repositoriesFetchGitRefs";

export const blocks = {
  operations_list: list_0,
  operations_get: get_1,
  operations_operationsGet: operationsGet_2,
  operations_operationsCancel: operationsCancel_3,
  connections_connectionsCreate: connectionsCreate_4,
  connections_connectionsGet: connectionsGet_5,
  connections_connectionsList: connectionsList_6,
  connections_connectionsPatch: connectionsPatch_7,
  connections_connectionsDelete: connectionsDelete_8,
  connections_connectionsProcessWebhook: connectionsProcessWebhook_9,
  connections_connectionsFetchLinkableRepositories:
    connectionsFetchLinkableRepositories_10,
  connections_connectionsSetIamPolicy: connectionsSetIamPolicy_11,
  connections_connectionsGetIamPolicy: connectionsGetIamPolicy_12,
  connections_connectionsTestIamPermissions: connectionsTestIamPermissions_13,
  repositories_repositoriesCreate: repositoriesCreate_14,
  repositories_repositoriesBatchCreate: repositoriesBatchCreate_15,
  repositories_repositoriesGet: repositoriesGet_16,
  repositories_repositoriesList: repositoriesList_17,
  repositories_repositoriesDelete: repositoriesDelete_18,
  repositories_repositoriesAccessReadWriteToken:
    repositoriesAccessReadWriteToken_19,
  repositories_repositoriesAccessReadToken: repositoriesAccessReadToken_20,
  repositories_repositoriesFetchGitRefs: repositoriesFetchGitRefs_21,
};
