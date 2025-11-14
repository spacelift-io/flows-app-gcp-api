import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const secretsPatch: AppBlock = {
  name: "Secrets - Patch",
  description: `Updates metadata of an existing Secret.`,
  category: "Secrets",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Output only. The resource name of the Secret in the format `projects/*/secrets/*`.",
          type: "string",
          required: true,
        },
        updateMask: {
          name: "UpdateMask",
          description: "Required. Specifies the fields to be updated.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "A Secret is a logical secret whose value and versions can be accessed. A Secret is made up of zero or more SecretVersions that represent the secret data.",
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
        const baseUrl = "https://secretmanager.googleapis.com/";
        const path = `v1/{+name}`;
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

export default secretsPatch;
