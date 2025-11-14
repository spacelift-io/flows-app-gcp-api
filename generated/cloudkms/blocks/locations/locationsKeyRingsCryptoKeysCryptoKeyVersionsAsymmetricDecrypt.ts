import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsKeyRingsCryptoKeysCryptoKeyVersionsAsymmetricDecrypt: AppBlock =
  {
    name: "Locations - Asymmetric Decrypt",
    description: `Decrypts data that was encrypted with a public key retrieved from GetPublicKey corresponding to a CryptoKeyVersion with CryptoKey.`,
    category: "Locations",
    inputs: {
      default: {
        config: {
          name: {
            name: "Name",
            description:
              "Required. The resource name of the CryptoKeyVersion to use for decryption.",
            type: "string",
            required: true,
          },
          requestBody: {
            name: "Request Body",
            description:
              "Request message for KeyManagementService.AsymmetricDecrypt.",
            type: {
              type: "object",
              properties: {
                ciphertextCrc32c: {
                  type: "string",
                },
                ciphertext: {
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
          const path = `v1/{+name}:asymmetricDecrypt`;
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
            verifiedCiphertextCrc32c: {
              type: "boolean",
            },
            plaintext: {
              type: "string",
            },
            plaintextCrc32c: {
              type: "string",
            },
          },
          additionalProperties: true,
        },
      },
    },
  };

export default locationsKeyRingsCryptoKeysCryptoKeyVersionsAsymmetricDecrypt;
