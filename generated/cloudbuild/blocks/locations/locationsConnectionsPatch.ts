import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsConnectionsPatch: AppBlock = {
  name: "Locations - Patch",
  description: `Updates a single connection.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Immutable. The resource name of the connection, in the format `projects/{project}/locations/{location}/connections/{connection_id}`.",
          type: "string",
          required: true,
        },
        updateMask: {
          name: "UpdateMask",
          description: "The list of fields to be updated.",
          type: "string",
          required: false,
        },
        allowMissing: {
          name: "AllowMissing",
          description:
            "If set to true, and the connection is not found a new connection will be created. In this situation `update_mask` is ignored. The creation will succeed only if the input connection has all the necessary information (e.g a github_config with both user_oauth_token and installation_id properties).",
          type: "boolean",
          required: false,
        },
        etag: {
          name: "Etag",
          description:
            "The current etag of the connection. If an etag is provided and does not match the current etag of the connection, update will be blocked and an ABORTED error will be returned.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "A connection to a SCM like GitHub, GitHub Enterprise, Bitbucket Data Center, Bitbucket Cloud or GitLab.",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              createTime: {
                type: "string",
              },
              updateTime: {
                type: "string",
              },
              githubConfig: {
                type: "object",
                properties: {
                  authorizerCredential: {
                    type: "object",
                    additionalProperties: true,
                  },
                  appInstallationId: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              githubEnterpriseConfig: {
                type: "object",
                properties: {
                  hostUri: {
                    type: "string",
                  },
                  apiKey: {
                    type: "string",
                  },
                  appId: {
                    type: "string",
                  },
                  appSlug: {
                    type: "string",
                  },
                  privateKeySecretVersion: {
                    type: "string",
                  },
                  webhookSecretSecretVersion: {
                    type: "string",
                  },
                  appInstallationId: {
                    type: "string",
                  },
                  serviceDirectoryConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sslCa: {
                    type: "string",
                  },
                  serverVersion: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              gitlabConfig: {
                type: "object",
                properties: {
                  hostUri: {
                    type: "string",
                  },
                  webhookSecretSecretVersion: {
                    type: "string",
                  },
                  readAuthorizerCredential: {
                    type: "object",
                    additionalProperties: true,
                  },
                  authorizerCredential: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serviceDirectoryConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sslCa: {
                    type: "string",
                  },
                  serverVersion: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              bitbucketDataCenterConfig: {
                type: "object",
                properties: {
                  hostUri: {
                    type: "string",
                  },
                  webhookSecretSecretVersion: {
                    type: "string",
                  },
                  readAuthorizerCredential: {
                    type: "object",
                    additionalProperties: true,
                  },
                  authorizerCredential: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serviceDirectoryConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sslCa: {
                    type: "string",
                  },
                  serverVersion: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              bitbucketCloudConfig: {
                type: "object",
                properties: {
                  workspace: {
                    type: "string",
                  },
                  webhookSecretSecretVersion: {
                    type: "string",
                  },
                  readAuthorizerCredential: {
                    type: "object",
                    additionalProperties: true,
                  },
                  authorizerCredential: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              installationState: {
                type: "object",
                properties: {
                  stage: {
                    type: "string",
                    enum: [
                      "STAGE_UNSPECIFIED",
                      "PENDING_CREATE_APP",
                      "PENDING_USER_OAUTH",
                      "PENDING_INSTALL_APP",
                      "COMPLETE",
                    ],
                  },
                  message: {
                    type: "string",
                  },
                  actionUri: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              disabled: {
                type: "boolean",
              },
              reconciling: {
                type: "boolean",
              },
              annotations: {
                type: "object",
                additionalProperties: true,
              },
              etag: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: true,
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
        const path = `v2/{+name}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        };

        // Add request body
        if (input.event.inputConfig.requestBody) {
          requestOptions.body = JSON.stringify(
            input.event.inputConfig.requestBody,
          );
        }

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
          name: {
            type: "string",
          },
          metadata: {
            type: "object",
            additionalProperties: true,
          },
          done: {
            type: "boolean",
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "number",
              },
              message: {
                type: "string",
              },
              details: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          response: {
            type: "object",
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsConnectionsPatch;
