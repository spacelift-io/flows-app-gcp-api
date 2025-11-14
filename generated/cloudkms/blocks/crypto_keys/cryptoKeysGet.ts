import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const cryptoKeysGet: AppBlock = {
  name: "Crypto Keys - Get",
  description: `Returns metadata for a given CryptoKey, as well as its primary CryptoKeyVersion.`,
  category: "Crypto Keys",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Required. The name of the CryptoKey to get.",
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

export default cryptoKeysGet;
