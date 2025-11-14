import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsSecretsList: AppBlock = {
  name: "Locations - List",
  description: `Lists Secrets.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        pageSize: {
          name: "PageSize",
          description:
            "Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000.",
          type: "number",
          required: false,
        },
        filter: {
          name: "Filter",
          description:
            "Optional. Filter string, adhering to the rules in [List-operation filtering](https://cloud.google.com/secret-manager/docs/filtering). List only secrets matching the filter. If filter is empty, all secrets are listed.",
          type: "string",
          required: false,
        },
        parent: {
          name: "Parent",
          description:
            "Required. The resource name of the project associated with the Secrets, in the format `projects/*` or `projects/*/locations/*`",
          type: "string",
          required: true,
        },
        pageToken: {
          name: "PageToken",
          description:
            "Optional. Pagination token, returned earlier via ListSecretsResponse.next_page_token.",
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
        const baseUrl = "https://secretmanager.googleapis.com/";
        const path = `v1/{+parent}/secrets`;
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
          secrets: {
            type: "array",
            items: {
              type: "object",
              properties: {
                annotations: {
                  type: "object",
                  additionalProperties: true,
                },
                tags: {
                  type: "object",
                  additionalProperties: true,
                },
                topics: {
                  type: "object",
                  additionalProperties: true,
                },
                createTime: {
                  type: "object",
                  additionalProperties: true,
                },
                versionAliases: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                etag: {
                  type: "object",
                  additionalProperties: true,
                },
                customerManagedEncryption: {
                  type: "object",
                  additionalProperties: true,
                },
                expireTime: {
                  type: "object",
                  additionalProperties: true,
                },
                versionDestroyTtl: {
                  type: "object",
                  additionalProperties: true,
                },
                rotation: {
                  type: "object",
                  additionalProperties: true,
                },
                replication: {
                  type: "object",
                  additionalProperties: true,
                },
                ttl: {
                  type: "object",
                  additionalProperties: true,
                },
                labels: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          totalSize: {
            type: "number",
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

export default locationsSecretsList;
