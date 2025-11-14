import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const connectionsGet: AppBlock = {
  name: "Connections - Get",
  description: `Gets details of a single connection.`,
  category: "Connections",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The name of the Connection to retrieve. Format: `projects/*/locations/*/connections/*`.",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        // Support both service account keys and pre-generated access tokens
        let accessToken: string;

        if (input.app.config.accessToken) {
          // Use pre-generated access token (Workload Identity Federation, etc.)
          accessToken = input.app.config.accessToken;
        } else if (input.app.config.serviceAccountKey) {
          // Parse service account credentials and generate token
          const credentials = JSON.parse(input.app.config.serviceAccountKey);

          const auth = new GoogleAuth({
            credentials,
            scopes: ["https://www.googleapis.com/auth/cloud-platform"],
          });

          const client = await auth.getClient();
          const token = await client.getAccessToken();
          accessToken = token.token!;
        } else {
          throw new Error(
            "Either serviceAccountKey or accessToken must be provided in app configuration",
          );
        }

        // Build request URL and parameters
        const baseUrl = "https://cloudbuild.googleapis.com/";
        let path = `v2/{+name}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
    },
  },
};

export default connectionsGet;
