import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsKeyRingsCryptoKeysPatch: AppBlock = {
  name: "Locations - Patch",
  description: `Update a CryptoKey.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Output only. The resource name for this CryptoKey in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*`.",
          type: "string",
          required: true,
        },
        updateMask: {
          name: "UpdateMask",
          description:
            "Required. List of fields to be updated in this request.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "A CryptoKey represents a logical key that can be used for cryptographic operations. A CryptoKey is made up of zero or more versions, which represent the actual key material used in cryptographic operations.",
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
          required: true,
        },
      },
      onEvent: async (input) => {
        // Parse service account credentials
        const credentials = JSON.parse(input.app.config.serviceAccountKey);

        // Initialize Google Auth
        const auth = new GoogleAuth({
          credentials,
          scopes: [
            "https://www.googleapis.com/auth/cloud-platform",
            "https://www.googleapis.com/auth/cloudkms",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://cloudkms.googleapis.com/";
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

export default locationsKeyRingsCryptoKeysPatch;
