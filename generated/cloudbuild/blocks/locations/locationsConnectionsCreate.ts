import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsConnectionsCreate: AppBlock = {
  name: "Locations - Create",
  description: `Creates a Connection.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. Project and location where the connection will be created. Format: `projects/*/locations/*`.",
          type: "string",
          required: true,
        },
        connectionId: {
          name: "ConnectionId",
          description:
            "Required. The ID to use for the Connection, which will become the final component of the Connection's resource name. Names must be unique per-project per-location. Allows alphanumeric characters and any of -._~%!$&'()*+,;=@.",
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
        const path = `v2/{+parent}/connections`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
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

export default locationsConnectionsCreate;
