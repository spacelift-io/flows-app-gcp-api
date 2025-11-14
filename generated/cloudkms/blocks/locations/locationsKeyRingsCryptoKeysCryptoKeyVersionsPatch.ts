import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsKeyRingsCryptoKeysCryptoKeyVersionsPatch: AppBlock = {
  name: "Locations - Patch",
  description: `Update a CryptoKeyVersion's metadata.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Output only. The resource name for this CryptoKeyVersion in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*/cryptoKeyVersions/*`.",
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
            "A CryptoKeyVersion represents an individual cryptographic key, and the associated key material. An ENABLED version can be used for cryptographic operations. For security reasons, the raw cryptographic key material represented by a CryptoKeyVersion can never be viewed or exported. It can only be used to encrypt, decrypt, or sign data when an authorized user or application invokes Cloud KMS.",
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

export default locationsKeyRingsCryptoKeysCryptoKeyVersionsPatch;
