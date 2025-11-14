import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const importJobsCreate: AppBlock = {
  name: "Import Jobs - Create",
  description: `Create a new ImportJob within a KeyRing.`,
  category: "Import Jobs",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The name of the KeyRing associated with the ImportJobs.",
          type: "string",
          required: true,
        },
        importJobId: {
          name: "Import Job ID",
          description:
            "Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}`",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "Output only.",
          type: "string",
          required: false,
        },
        state: {
          name: "State",
          description: "Output only.",
          type: "string",
          required: false,
        },
        importMethod: {
          name: "Import Method",
          description: "Required.",
          type: "string",
          required: false,
        },
        protectionLevel: {
          name: "Protection Level",
          description: "Required.",
          type: "string",
          required: false,
        },
        expireEventTime: {
          name: "Expire Event Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        expireTime: {
          name: "Expire Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        attestation: {
          name: "Attestation",
          description: "Output only.",
          type: {
            type: "object",
            properties: {
              content: {
                type: "string",
              },
              certChains: {
                type: "object",
                properties: {
                  googlePartitionCerts: {
                    type: "object",
                    additionalProperties: true,
                  },
                  caviumCerts: {
                    type: "object",
                    additionalProperties: true,
                  },
                  googleCardCerts: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              format: {
                type: "string",
                enum: [
                  "ATTESTATION_FORMAT_UNSPECIFIED",
                  "CAVIUM_V1_COMPRESSED",
                  "CAVIUM_V2_COMPRESSED",
                ],
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        publicKey: {
          name: "Public Key",
          description: "Output only.",
          type: {
            type: "object",
            properties: {
              pem: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        generateTime: {
          name: "Generate Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        createTime: {
          name: "Create Time",
          description: "Output only.",
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
        let path = `v1/{+parent}/importJobs`;

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
        if (input.event.inputConfig.state !== undefined)
          requestBody.state = input.event.inputConfig.state;
        if (input.event.inputConfig.importMethod !== undefined)
          requestBody.importMethod = input.event.inputConfig.importMethod;
        if (input.event.inputConfig.protectionLevel !== undefined)
          requestBody.protectionLevel = input.event.inputConfig.protectionLevel;
        if (input.event.inputConfig.expireEventTime !== undefined)
          requestBody.expireEventTime = input.event.inputConfig.expireEventTime;
        if (input.event.inputConfig.expireTime !== undefined)
          requestBody.expireTime = input.event.inputConfig.expireTime;
        if (input.event.inputConfig.attestation !== undefined)
          requestBody.attestation = input.event.inputConfig.attestation;
        if (input.event.inputConfig.publicKey !== undefined)
          requestBody.publicKey = input.event.inputConfig.publicKey;
        if (input.event.inputConfig.generateTime !== undefined)
          requestBody.generateTime = input.event.inputConfig.generateTime;
        if (input.event.inputConfig.createTime !== undefined)
          requestBody.createTime = input.event.inputConfig.createTime;

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
          state: {
            type: "string",
            enum: [
              "IMPORT_JOB_STATE_UNSPECIFIED",
              "PENDING_GENERATION",
              "ACTIVE",
              "EXPIRED",
            ],
          },
          importMethod: {
            type: "string",
            enum: [
              "IMPORT_METHOD_UNSPECIFIED",
              "RSA_OAEP_3072_SHA1_AES_256",
              "RSA_OAEP_4096_SHA1_AES_256",
              "RSA_OAEP_3072_SHA256_AES_256",
              "RSA_OAEP_4096_SHA256_AES_256",
              "RSA_OAEP_3072_SHA256",
              "RSA_OAEP_4096_SHA256",
            ],
          },
          protectionLevel: {
            type: "string",
            enum: [
              "PROTECTION_LEVEL_UNSPECIFIED",
              "SOFTWARE",
              "HSM",
              "EXTERNAL",
              "EXTERNAL_VPC",
            ],
          },
          expireEventTime: {
            type: "string",
          },
          expireTime: {
            type: "string",
          },
          attestation: {
            type: "object",
            properties: {
              content: {
                type: "string",
              },
              certChains: {
                type: "object",
                additionalProperties: true,
              },
              format: {
                type: "string",
                enum: [
                  "ATTESTATION_FORMAT_UNSPECIFIED",
                  "CAVIUM_V1_COMPRESSED",
                  "CAVIUM_V2_COMPRESSED",
                ],
              },
            },
            additionalProperties: true,
          },
          publicKey: {
            type: "object",
            properties: {
              pem: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          generateTime: {
            type: "string",
          },
          createTime: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default importJobsCreate;
