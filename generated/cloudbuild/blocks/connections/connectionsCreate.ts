import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const connectionsCreate: AppBlock = {
  name: "Connections - Create",
  description: `Creates a Connection.`,
  category: "Connections",
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
          name: "Connection ID",
          description:
            "Required. The ID to use for the Connection, which will become the final component of the Connection's resource name. Names must be unique per-project per-location. Allows alphanumeric characters and any of -._~%!$&'()*+,;=@.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "Immutable.",
          type: "string",
          required: false,
        },
        createTime: {
          name: "Create Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        updateTime: {
          name: "Update Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        githubConfig: {
          name: "Github Config",
          description: "Configuration for connections to github.",
          type: {
            type: "object",
            properties: {
              authorizerCredential: {
                type: "object",
                properties: {
                  oauthTokenSecretVersion: {
                    type: "object",
                    additionalProperties: true,
                  },
                  username: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              appInstallationId: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        githubEnterpriseConfig: {
          name: "Github Enterprise Config",
          description:
            "Configuration for connections to an instance of GitHub Enterprise.",
          type: {
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
                properties: {
                  service: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
          required: false,
        },
        gitlabConfig: {
          name: "Gitlab Config",
          description: "Configuration for connections to gitlab.",
          type: {
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
                properties: {
                  userTokenSecretVersion: {
                    type: "object",
                    additionalProperties: true,
                  },
                  username: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              authorizerCredential: {
                type: "object",
                properties: {
                  userTokenSecretVersion: {
                    type: "object",
                    additionalProperties: true,
                  },
                  username: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              serviceDirectoryConfig: {
                type: "object",
                properties: {
                  service: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
          required: false,
        },
        bitbucketDataCenterConfig: {
          name: "Bitbucket Data Center Config",
          description:
            "Configuration for connections to Bitbucket Data Center.",
          type: {
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
                properties: {
                  userTokenSecretVersion: {
                    type: "object",
                    additionalProperties: true,
                  },
                  username: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              authorizerCredential: {
                type: "object",
                properties: {
                  userTokenSecretVersion: {
                    type: "object",
                    additionalProperties: true,
                  },
                  username: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              serviceDirectoryConfig: {
                type: "object",
                properties: {
                  service: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
          required: false,
        },
        bitbucketCloudConfig: {
          name: "Bitbucket Cloud Config",
          description: "Configuration for connections to Bitbucket Cloud.",
          type: {
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
                properties: {
                  userTokenSecretVersion: {
                    type: "object",
                    additionalProperties: true,
                  },
                  username: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              authorizerCredential: {
                type: "object",
                properties: {
                  userTokenSecretVersion: {
                    type: "object",
                    additionalProperties: true,
                  },
                  username: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        installationState: {
          name: "Installation State",
          description: "Output only.",
          type: {
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
          required: false,
        },
        disabled: {
          name: "Disabled",
          description: "Optional.",
          type: "boolean",
          required: false,
        },
        reconciling: {
          name: "Reconciling",
          description: "Output only.",
          type: "boolean",
          required: false,
        },
        annotations: {
          name: "Annotations",
          description: "Optional.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        etag: {
          name: "Etag",
          description:
            "This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding.",
          type: "string",
          required: false,
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
        let path = `v2/{+parent}/connections`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.createTime !== undefined)
          requestBody.createTime = input.event.inputConfig.createTime;
        if (input.event.inputConfig.updateTime !== undefined)
          requestBody.updateTime = input.event.inputConfig.updateTime;
        if (input.event.inputConfig.githubConfig !== undefined)
          requestBody.githubConfig = input.event.inputConfig.githubConfig;
        if (input.event.inputConfig.githubEnterpriseConfig !== undefined)
          requestBody.githubEnterpriseConfig =
            input.event.inputConfig.githubEnterpriseConfig;
        if (input.event.inputConfig.gitlabConfig !== undefined)
          requestBody.gitlabConfig = input.event.inputConfig.gitlabConfig;
        if (input.event.inputConfig.bitbucketDataCenterConfig !== undefined)
          requestBody.bitbucketDataCenterConfig =
            input.event.inputConfig.bitbucketDataCenterConfig;
        if (input.event.inputConfig.bitbucketCloudConfig !== undefined)
          requestBody.bitbucketCloudConfig =
            input.event.inputConfig.bitbucketCloudConfig;
        if (input.event.inputConfig.installationState !== undefined)
          requestBody.installationState =
            input.event.inputConfig.installationState;
        if (input.event.inputConfig.disabled !== undefined)
          requestBody.disabled = input.event.inputConfig.disabled;
        if (input.event.inputConfig.reconciling !== undefined)
          requestBody.reconciling = input.event.inputConfig.reconciling;
        if (input.event.inputConfig.annotations !== undefined)
          requestBody.annotations = input.event.inputConfig.annotations;
        if (input.event.inputConfig.etag !== undefined)
          requestBody.etag = input.event.inputConfig.etag;

        if (Object.keys(requestBody).length > 0) {
          requestOptions.body = JSON.stringify(requestBody);
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

export default connectionsCreate;
