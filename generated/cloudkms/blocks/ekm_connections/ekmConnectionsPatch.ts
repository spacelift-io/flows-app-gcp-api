import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const ekmConnectionsPatch: AppBlock = {
  name: "EKM Connections - Patch",
  description: `Updates an EkmConnection's metadata.`,
  category: "EKM Connections",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Output only.",
          type: "string",
          required: false,
        },
        updateMask: {
          name: "Update Mask",
          description:
            "Required. List of fields to be updated in this request.",
          type: "string",
          required: false,
        },
        etag: {
          name: "Etag",
          description: "Optional.",
          type: "string",
          required: false,
        },
        cryptoSpacePath: {
          name: "Crypto Space Path",
          description: "Optional.",
          type: "string",
          required: false,
        },
        serviceResolvers: {
          name: "Service Resolvers",
          description: "Optional.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                hostname: {
                  type: "string",
                },
                endpointFilter: {
                  type: "string",
                },
                serverCertificates: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                serviceDirectoryService: {
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
        keyManagementMode: {
          name: "Key Management Mode",
          description: "Optional.",
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
            scopes: [
              "https://www.googleapis.com/auth/cloud-platform",
              "https://www.googleapis.com/auth/cloudkms",
            ],
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
        const baseUrl = "https://cloudkms.googleapis.com/";
        let path = `v1/{+name}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.etag !== undefined)
          requestBody.etag = input.event.inputConfig.etag;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.cryptoSpacePath !== undefined)
          requestBody.cryptoSpacePath = input.event.inputConfig.cryptoSpacePath;
        if (input.event.inputConfig.serviceResolvers !== undefined)
          requestBody.serviceResolvers =
            input.event.inputConfig.serviceResolvers;
        if (input.event.inputConfig.createTime !== undefined)
          requestBody.createTime = input.event.inputConfig.createTime;
        if (input.event.inputConfig.keyManagementMode !== undefined)
          requestBody.keyManagementMode =
            input.event.inputConfig.keyManagementMode;

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
          etag: {
            type: "string",
          },
          name: {
            type: "string",
          },
          cryptoSpacePath: {
            type: "string",
          },
          serviceResolvers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                hostname: {
                  type: "object",
                  additionalProperties: true,
                },
                endpointFilter: {
                  type: "object",
                  additionalProperties: true,
                },
                serverCertificates: {
                  type: "object",
                  additionalProperties: true,
                },
                serviceDirectoryService: {
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
          keyManagementMode: {
            type: "string",
            enum: ["KEY_MANAGEMENT_MODE_UNSPECIFIED", "MANUAL", "CLOUD_KMS"],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default ekmConnectionsPatch;
