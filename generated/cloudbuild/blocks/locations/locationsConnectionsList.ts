import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsConnectionsList: AppBlock = {
  name: "Locations - List",
  description: `Lists Connections in a given project and location.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The parent, which owns this collection of Connections. Format: `projects/*/locations/*`.",
          type: "string",
          required: true,
        },
        pageSize: {
          name: "PageSize",
          description: "Number of results to return in the list.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description: "Page start.",
          type: "string",
          required: false,
        },
        returnPartialSuccess: {
          name: "ReturnPartialSuccess",
          description:
            "Optional. If set to true, the response will return partial results when some regions are unreachable. If set to false, the response will fail if any region is unreachable.",
          type: "boolean",
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
        const path = `v2/{+parent}/connections`;
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
          connections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
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
                githubConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                githubEnterpriseConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                gitlabConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                bitbucketDataCenterConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                bitbucketCloudConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                installationState: {
                  type: "object",
                  additionalProperties: true,
                },
                disabled: {
                  type: "object",
                  additionalProperties: true,
                },
                reconciling: {
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
              },
              additionalProperties: true,
            },
          },
          nextPageToken: {
            type: "string",
          },
          unreachable: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsConnectionsList;
