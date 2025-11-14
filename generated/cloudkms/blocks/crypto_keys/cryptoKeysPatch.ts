import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const cryptoKeysPatch: AppBlock = {
  name: "Crypto Keys - Patch",
  description: `Update a CryptoKey.`,
  category: "Crypto Keys",
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
        createTime: {
          name: "Create Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        primary: {
          name: "Primary",
          description: "Output only.",
          type: {
            type: "object",
            properties: {
              attestation: {
                type: "object",
                properties: {
                  content: {
                    type: "object",
                    additionalProperties: true,
                  },
                  certChains: {
                    type: "object",
                    additionalProperties: true,
                  },
                  format: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                  externalKeyUri: {
                    type: "object",
                    additionalProperties: true,
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
          required: false,
        },
        purpose: {
          name: "Purpose",
          description: "Immutable.",
          type: "string",
          required: false,
        },
        importOnly: {
          name: "Import Only",
          description: "Immutable.",
          type: "boolean",
          required: false,
        },
        nextRotationTime: {
          name: "Next Rotation Time",
          description:
            "At next_rotation_time, the Key Management Service will automatically: 1.",
          type: "string",
          required: false,
        },
        destroyScheduledDuration: {
          name: "Destroy Scheduled Duration",
          description: "Immutable.",
          type: "string",
          required: false,
        },
        versionTemplate: {
          name: "Version Template",
          description:
            "A template describing settings for new CryptoKeyVersion instances.",
          type: {
            type: "object",
            properties: {
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
            },
            additionalProperties: true,
          },
          required: false,
        },
        rotationPeriod: {
          name: "Rotation Period",
          description:
            "next_rotation_time will be advanced by this period when the service automatically rotates a key.",
          type: "string",
          required: false,
        },
        keyAccessJustificationsPolicy: {
          name: "Key Access Justifications Policy",
          description: "Optional.",
          type: {
            type: "object",
            properties: {
              allowedAccessReasons: {
                type: "array",
                items: {
                  type: "string",
                  enum: [
                    "REASON_UNSPECIFIED",
                    "CUSTOMER_INITIATED_SUPPORT",
                    "GOOGLE_INITIATED_SERVICE",
                    "THIRD_PARTY_DATA_REQUEST",
                    "GOOGLE_INITIATED_REVIEW",
                    "CUSTOMER_INITIATED_ACCESS",
                    "GOOGLE_INITIATED_SYSTEM_OPERATION",
                    "REASON_NOT_EXPECTED",
                    "MODIFIED_CUSTOMER_INITIATED_ACCESS",
                    "MODIFIED_GOOGLE_INITIATED_SYSTEM_OPERATION",
                    "GOOGLE_RESPONSE_TO_PRODUCTION_ALERT",
                    "CUSTOMER_AUTHORIZED_WORKFLOW_SERVICING",
                  ],
                },
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        cryptoKeyBackend: {
          name: "Crypto Key Backend",
          description: "Immutable.",
          type: "string",
          required: false,
        },
        labels: {
          name: "Labels",
          description: "Labels with user-defined metadata.",
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

        if (input.event.inputConfig.createTime !== undefined)
          requestBody.createTime = input.event.inputConfig.createTime;
        if (input.event.inputConfig.primary !== undefined)
          requestBody.primary = input.event.inputConfig.primary;
        if (input.event.inputConfig.purpose !== undefined)
          requestBody.purpose = input.event.inputConfig.purpose;
        if (input.event.inputConfig.importOnly !== undefined)
          requestBody.importOnly = input.event.inputConfig.importOnly;
        if (input.event.inputConfig.nextRotationTime !== undefined)
          requestBody.nextRotationTime =
            input.event.inputConfig.nextRotationTime;
        if (input.event.inputConfig.destroyScheduledDuration !== undefined)
          requestBody.destroyScheduledDuration =
            input.event.inputConfig.destroyScheduledDuration;
        if (input.event.inputConfig.versionTemplate !== undefined)
          requestBody.versionTemplate = input.event.inputConfig.versionTemplate;
        if (input.event.inputConfig.rotationPeriod !== undefined)
          requestBody.rotationPeriod = input.event.inputConfig.rotationPeriod;
        if (input.event.inputConfig.keyAccessJustificationsPolicy !== undefined)
          requestBody.keyAccessJustificationsPolicy =
            input.event.inputConfig.keyAccessJustificationsPolicy;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.cryptoKeyBackend !== undefined)
          requestBody.cryptoKeyBackend =
            input.event.inputConfig.cryptoKeyBackend;
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
          createTime: {
            type: "string",
          },
          primary: {
            type: "object",
            properties: {
              attestation: {
                type: "object",
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
          purpose: {
            type: "string",
            enum: [
              "CRYPTO_KEY_PURPOSE_UNSPECIFIED",
              "ENCRYPT_DECRYPT",
              "ASYMMETRIC_SIGN",
              "ASYMMETRIC_DECRYPT",
              "RAW_ENCRYPT_DECRYPT",
              "MAC",
              "KEY_ENCAPSULATION",
            ],
          },
          importOnly: {
            type: "boolean",
          },
          nextRotationTime: {
            type: "string",
          },
          destroyScheduledDuration: {
            type: "string",
          },
          versionTemplate: {
            type: "object",
            properties: {
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
            },
            additionalProperties: true,
          },
          rotationPeriod: {
            type: "string",
          },
          keyAccessJustificationsPolicy: {
            type: "object",
            properties: {
              allowedAccessReasons: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          name: {
            type: "string",
          },
          cryptoKeyBackend: {
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

export default cryptoKeysPatch;
