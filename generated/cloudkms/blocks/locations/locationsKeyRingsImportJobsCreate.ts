import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsKeyRingsImportJobsCreate: AppBlock = {
  name: "Locations - Create",
  description: `Create a new ImportJob within a KeyRing.`,
  category: "Locations",
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
          name: "ImportJobId",
          description:
            "Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}`",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            'An ImportJob can be used to create CryptoKeys and CryptoKeyVersions using pre-existing key material, generated outside of Cloud KMS. When an ImportJob is created, Cloud KMS will generate a "wrapping key", which is a public/private key pair. You use the wrapping key to encrypt (also known as wrap) the pre-existing key material to protect it during the import process. The nature of the wrapping key depends on the choice of import_method. When the wrapping key generation is complete, the state will be set to ACTIVE and the public_key can be fetched. The fetched public key can then be used to wrap your pre-existing key material. Once the key material is wrapped, it can be imported into a new CryptoKeyVersion in an existing CryptoKey by calling ImportCryptoKeyVersion. Multiple CryptoKeyVersions can be imported with a single ImportJob. Cloud KMS uses the private key portion of the wrapping key to unwrap the key material. Only Cloud KMS has access to the private key. An ImportJob expires 3 days after it is created. Once expired, Cloud KMS will no longer be able to import or unwrap any key material that was wrapped with the ImportJob\'s public key. For more information, see [Importing a key](https://cloud.google.com/kms/docs/importing-a-key).',
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
        const path = `v1/{+parent}/importJobs`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
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

export default locationsKeyRingsImportJobsCreate;
