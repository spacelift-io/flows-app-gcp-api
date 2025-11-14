import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const cryptoKeyVersionsPatch: AppBlock = {
  name: "Crypto Key Versions - Patch",
  description: `Update a CryptoKeyVersion's metadata.`,
  category: "Crypto Key Versions",
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
        reimportEligible: {
          name: "Reimport Eligible",
          description: "Output only.",
          type: "boolean",
          required: false,
        },
        externalDestructionFailureReason: {
          name: "External Destruction Failure Reason",
          description: "Output only.",
          type: "string",
          required: false,
        },
        algorithm: {
          name: "Algorithm",
          description: "Output only.",
          type: "string",
          required: false,
        },
        protectionLevel: {
          name: "Protection Level",
          description: "Output only.",
          type: "string",
          required: false,
        },
        generateTime: {
          name: "Generate Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        importTime: {
          name: "Import Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        externalProtectionLevelOptions: {
          name: "External Protection Level Options",
          description:
            "ExternalProtectionLevelOptions stores a group of additional fields for configuring a CryptoKeyVersion that are specific to the EXTERNAL protection level and EXTERNAL_VPC protection levels.",
          type: {
            type: "object",
            properties: {
              ekmConnectionKeyPath: {
                type: "string",
              },
              externalKeyUri: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        importFailureReason: {
          name: "Import Failure Reason",
          description: "Output only.",
          type: "string",
          required: false,
        },
        generationFailureReason: {
          name: "Generation Failure Reason",
          description: "Output only.",
          type: "string",
          required: false,
        },
        importJob: {
          name: "Import Job",
          description: "Output only.",
          type: "string",
          required: false,
        },
        state: {
          name: "State",
          description: "The current state of the CryptoKeyVersion.",
          type: "string",
          required: false,
        },
        destroyTime: {
          name: "Destroy Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        destroyEventTime: {
          name: "Destroy Event Time",
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

        if (input.event.inputConfig.attestation !== undefined)
          requestBody.attestation = input.event.inputConfig.attestation;
        if (input.event.inputConfig.reimportEligible !== undefined)
          requestBody.reimportEligible =
            input.event.inputConfig.reimportEligible;
        if (
          input.event.inputConfig.externalDestructionFailureReason !== undefined
        )
          requestBody.externalDestructionFailureReason =
            input.event.inputConfig.externalDestructionFailureReason;
        if (input.event.inputConfig.algorithm !== undefined)
          requestBody.algorithm = input.event.inputConfig.algorithm;
        if (input.event.inputConfig.protectionLevel !== undefined)
          requestBody.protectionLevel = input.event.inputConfig.protectionLevel;
        if (input.event.inputConfig.generateTime !== undefined)
          requestBody.generateTime = input.event.inputConfig.generateTime;
        if (input.event.inputConfig.importTime !== undefined)
          requestBody.importTime = input.event.inputConfig.importTime;
        if (
          input.event.inputConfig.externalProtectionLevelOptions !== undefined
        )
          requestBody.externalProtectionLevelOptions =
            input.event.inputConfig.externalProtectionLevelOptions;
        if (input.event.inputConfig.importFailureReason !== undefined)
          requestBody.importFailureReason =
            input.event.inputConfig.importFailureReason;
        if (input.event.inputConfig.generationFailureReason !== undefined)
          requestBody.generationFailureReason =
            input.event.inputConfig.generationFailureReason;
        if (input.event.inputConfig.importJob !== undefined)
          requestBody.importJob = input.event.inputConfig.importJob;
        if (input.event.inputConfig.state !== undefined)
          requestBody.state = input.event.inputConfig.state;
        if (input.event.inputConfig.destroyTime !== undefined)
          requestBody.destroyTime = input.event.inputConfig.destroyTime;
        if (input.event.inputConfig.destroyEventTime !== undefined)
          requestBody.destroyEventTime =
            input.event.inputConfig.destroyEventTime;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
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
          reimportEligible: {
            type: "boolean",
          },
          externalDestructionFailureReason: {
            type: "string",
          },
          algorithm: {
            type: "string",
            enum: [
              "CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED",
              "GOOGLE_SYMMETRIC_ENCRYPTION",
              "AES_128_GCM",
              "AES_256_GCM",
              "AES_128_CBC",
              "AES_256_CBC",
              "AES_128_CTR",
              "AES_256_CTR",
              "RSA_SIGN_PSS_2048_SHA256",
              "RSA_SIGN_PSS_3072_SHA256",
              "RSA_SIGN_PSS_4096_SHA256",
              "RSA_SIGN_PSS_4096_SHA512",
              "RSA_SIGN_PKCS1_2048_SHA256",
              "RSA_SIGN_PKCS1_3072_SHA256",
              "RSA_SIGN_PKCS1_4096_SHA256",
              "RSA_SIGN_PKCS1_4096_SHA512",
              "RSA_SIGN_RAW_PKCS1_2048",
              "RSA_SIGN_RAW_PKCS1_3072",
              "RSA_SIGN_RAW_PKCS1_4096",
              "RSA_DECRYPT_OAEP_2048_SHA256",
              "RSA_DECRYPT_OAEP_3072_SHA256",
              "RSA_DECRYPT_OAEP_4096_SHA256",
              "RSA_DECRYPT_OAEP_4096_SHA512",
              "RSA_DECRYPT_OAEP_2048_SHA1",
              "RSA_DECRYPT_OAEP_3072_SHA1",
              "RSA_DECRYPT_OAEP_4096_SHA1",
              "EC_SIGN_P256_SHA256",
              "EC_SIGN_P384_SHA384",
              "EC_SIGN_SECP256K1_SHA256",
              "EC_SIGN_ED25519",
              "HMAC_SHA256",
              "HMAC_SHA1",
              "HMAC_SHA384",
              "HMAC_SHA512",
              "HMAC_SHA224",
              "EXTERNAL_SYMMETRIC_ENCRYPTION",
              "ML_KEM_768",
              "ML_KEM_1024",
              "KEM_XWING",
              "PQ_SIGN_ML_DSA_44",
              "PQ_SIGN_ML_DSA_65",
              "PQ_SIGN_ML_DSA_87",
              "PQ_SIGN_SLH_DSA_SHA2_128S",
              "PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256",
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
          generateTime: {
            type: "string",
          },
          importTime: {
            type: "string",
          },
          externalProtectionLevelOptions: {
            type: "object",
            properties: {
              ekmConnectionKeyPath: {
                type: "string",
              },
              externalKeyUri: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          importFailureReason: {
            type: "string",
          },
          generationFailureReason: {
            type: "string",
          },
          importJob: {
            type: "string",
          },
          state: {
            type: "string",
            enum: [
              "CRYPTO_KEY_VERSION_STATE_UNSPECIFIED",
              "PENDING_GENERATION",
              "ENABLED",
              "DISABLED",
              "DESTROYED",
              "DESTROY_SCHEDULED",
              "PENDING_IMPORT",
              "IMPORT_FAILED",
              "GENERATION_FAILED",
              "PENDING_EXTERNAL_DESTRUCTION",
              "EXTERNAL_DESTRUCTION_FAILED",
            ],
          },
          destroyTime: {
            type: "string",
          },
          destroyEventTime: {
            type: "string",
          },
          name: {
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

export default cryptoKeyVersionsPatch;
