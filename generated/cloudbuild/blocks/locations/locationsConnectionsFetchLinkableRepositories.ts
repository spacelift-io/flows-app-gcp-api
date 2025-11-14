import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsConnectionsFetchLinkableRepositories: AppBlock = {
  name: "Locations - Fetch Linkable Repositories",
  description: `FetchLinkableRepositories get repositories from SCM that are accessible and could be added to the connection.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        connection: {
          name: "Connection",
          description:
            "Required. The name of the Connection. Format: `projects/*/locations/*/connections/*`.",
          type: "string",
          required: true,
        },
        pageSize: {
          name: "PageSize",
          description:
            "Number of results to return in the list. Default to 20.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description: "Page start.",
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
        const path = `v2/{+connection}:fetchLinkableRepositories`;
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
          repositories: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                remoteUri: {
                  type: "object",
                  additionalProperties: true,
                },
                createTime: {
                  type: "object",
                  additionalProperties: true,
                },
                updateTime: {
                  type: "object",
                  additionalProperties: true,
                },
                annotations: {
                  type: "object",
                  additionalProperties: true,
                },
                etag: {
                  type: "object",
                  additionalProperties: true,
                },
                webhookId: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
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

export default locationsConnectionsFetchLinkableRepositories;
