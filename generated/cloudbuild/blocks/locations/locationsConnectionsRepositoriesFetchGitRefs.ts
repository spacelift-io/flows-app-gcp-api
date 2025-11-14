import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsConnectionsRepositoriesFetchGitRefs: AppBlock = {
  name: "Locations - Fetch Git Refs",
  description: `Fetch the list of branches or tags for a given repository.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        repository: {
          name: "Repository",
          description:
            "Required. The resource name of the repository in the format `projects/*/locations/*/connections/*/repositories/*`.",
          type: "string",
          required: true,
        },
        refType: {
          name: "RefType",
          description:
            "Type of refs to fetch Valid values: REF_TYPE_UNSPECIFIED, TAG, BRANCH",
          type: "string",
          required: false,
        },
        pageSize: {
          name: "PageSize",
          description:
            "Optional. Number of results to return in the list. Default to 20.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description: "Optional. Page start.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        // Parse service account credentials
        const credentials = JSON.parse(input.app.config.serviceAccountKey);

        // Initialize Google Auth
        const auth = new GoogleAuth({
          credentials,
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://cloudbuild.googleapis.com/";
        const path = `v2/{+repository}:fetchGitRefs`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error(
            `GCP API error: ${response.status} ${response.statusText}`,
          );
        }

        const result = await response.json();
        await events.emit(result || {});
      },
    },
  },
  outputs: {
    default: {
      possiblePrimaryParents: ["default"],
      type: {
        type: "object",
        properties: {
          refNames: {
            type: "array",
            items: {
              type: "string",
            },
          },
          nextPageToken: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsConnectionsRepositoriesFetchGitRefs;
