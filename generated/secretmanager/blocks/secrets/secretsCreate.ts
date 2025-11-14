import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const secretsCreate: AppBlock = {
  name: "Secrets - Create",
  description: `Creates a new Secret containing no SecretVersions.`,
  category: "Secrets",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The resource name of the project to associate with the Secret, in the format `projects/*` or `projects/*/locations/*`.",
          type: "string",
          required: true,
        },
        secretId: {
          name: "Secret ID",
          description:
            "Required. This must be unique within the project. A secret ID is a string with a maximum length of 255 characters and can contain uppercase and lowercase letters, numerals, and the hyphen (`-`) and underscore (`_`) characters.",
          type: "string",
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
        tags: {
          name: "Tags",
          description: "Optional.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        topics: {
          name: "Topics",
          description: "Optional.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        createTime: {
          name: "Create Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        versionAliases: {
          name: "Version Aliases",
          description: "Optional.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        name: {
          name: "Name",
          description: "Output only.",
          type: "string",
          required: false,
        },
        etag: {
          name: "Etag",
          description: "Optional.",
          type: "string",
          required: false,
        },
        customerManagedEncryption: {
          name: "Customer Managed Encryption",
          description: "Optional.",
          type: {
            type: "object",
            properties: {
              kmsKeyName: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        expireTime: {
          name: "Expire Time",
          description: "Optional.",
          type: "string",
          required: false,
        },
        versionDestroyTtl: {
          name: "Version Destroy Ttl",
          description: "Optional.",
          type: "string",
          required: false,
        },
        rotation: {
          name: "Rotation",
          description: "Optional.",
          type: {
            type: "object",
            properties: {
              rotationPeriod: {
                type: "string",
              },
              nextRotationTime: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        replication: {
          name: "Replication",
          description: "Optional.",
          type: {
            type: "object",
            properties: {
              automatic: {
                type: "object",
                properties: {
                  customerManagedEncryption: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              userManaged: {
                type: "object",
                properties: {
                  replicas: {
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
        ttl: {
          name: "Ttl",
          description: "Input only.",
          type: "string",
          required: false,
        },
        labels: {
          name: "Labels",
          description: "The labels assigned to this Secret.",
          type: {
            type: "object",
            additionalProperties: true,
          },
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
        const baseUrl = "https://secretmanager.googleapis.com/";
        let path = `v1/{+parent}/secrets`;

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

        if (input.event.inputConfig.annotations !== undefined)
          requestBody.annotations = input.event.inputConfig.annotations;
        if (input.event.inputConfig.tags !== undefined)
          requestBody.tags = input.event.inputConfig.tags;
        if (input.event.inputConfig.topics !== undefined)
          requestBody.topics = input.event.inputConfig.topics;
        if (input.event.inputConfig.createTime !== undefined)
          requestBody.createTime = input.event.inputConfig.createTime;
        if (input.event.inputConfig.versionAliases !== undefined)
          requestBody.versionAliases = input.event.inputConfig.versionAliases;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.etag !== undefined)
          requestBody.etag = input.event.inputConfig.etag;
        if (input.event.inputConfig.customerManagedEncryption !== undefined)
          requestBody.customerManagedEncryption =
            input.event.inputConfig.customerManagedEncryption;
        if (input.event.inputConfig.expireTime !== undefined)
          requestBody.expireTime = input.event.inputConfig.expireTime;
        if (input.event.inputConfig.versionDestroyTtl !== undefined)
          requestBody.versionDestroyTtl =
            input.event.inputConfig.versionDestroyTtl;
        if (input.event.inputConfig.rotation !== undefined)
          requestBody.rotation = input.event.inputConfig.rotation;
        if (input.event.inputConfig.replication !== undefined)
          requestBody.replication = input.event.inputConfig.replication;
        if (input.event.inputConfig.ttl !== undefined)
          requestBody.ttl = input.event.inputConfig.ttl;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;

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
          annotations: {
            type: "object",
            additionalProperties: true,
          },
          tags: {
            type: "object",
            additionalProperties: true,
          },
          topics: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          createTime: {
            type: "string",
          },
          versionAliases: {
            type: "object",
            additionalProperties: true,
          },
          name: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          customerManagedEncryption: {
            type: "object",
            properties: {
              kmsKeyName: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          expireTime: {
            type: "string",
          },
          versionDestroyTtl: {
            type: "string",
          },
          rotation: {
            type: "object",
            properties: {
              rotationPeriod: {
                type: "string",
              },
              nextRotationTime: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          replication: {
            type: "object",
            properties: {
              automatic: {
                type: "object",
                additionalProperties: true,
              },
              userManaged: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          ttl: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default secretsCreate;
