import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsKeyRingsCryptoKeysCryptoKeyVersionsRawEncrypt: AppBlock = {
  name: "Locations - Raw Encrypt",
  description: `Encrypts data using portable cryptographic primitives.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The resource name of the CryptoKeyVersion to use for encryption.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "Request message for KeyManagementService.RawEncrypt.",
          type: {
            type: "object",
            properties: {
              plaintextCrc32c: {
                type: "string",
              },
              initializationVectorCrc32c: {
                type: "string",
              },
              plaintext: {
                type: "string",
              },
              additionalAuthenticatedData: {
                type: "string",
              },
              initializationVector: {
                type: "string",
              },
              additionalAuthenticatedDataCrc32c: {
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
        const path = `v1/{+name}:rawEncrypt`;
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
          initializationVectorCrc32c: {
            type: "string",
          },
          tagLength: {
            type: "number",
          },
          initializationVector: {
            type: "string",
          },
          verifiedPlaintextCrc32c: {
            type: "boolean",
          },
          ciphertext: {
            type: "string",
          },
          verifiedAdditionalAuthenticatedDataCrc32c: {
            type: "boolean",
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
          ciphertextCrc32c: {
            type: "string",
          },
          verifiedInitializationVectorCrc32c: {
            type: "boolean",
          },
          name: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsKeyRingsCryptoKeysCryptoKeyVersionsRawEncrypt;
