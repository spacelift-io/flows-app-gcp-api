import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsKeyRingsCryptoKeysCryptoKeyVersionsAsymmetricSign: AppBlock = {
  name: "Locations - Asymmetric Sign",
  description: `Signs data using a CryptoKeyVersion with CryptoKey.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The resource name of the CryptoKeyVersion to use for signing.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Request message for KeyManagementService.AsymmetricSign.",
          type: {
            type: "object",
            properties: {
              data: {
                type: "string",
              },
              digest: {
                type: "object",
                properties: {
                  sha512: {
                    type: "string",
                  },
                  sha256: {
                    type: "string",
                  },
                  sha384: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              dataCrc32c: {
                type: "string",
              },
              digestCrc32c: {
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
        const path = `v1/{+name}:asymmetricSign`;
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
          verifiedDigestCrc32c: {
            type: "boolean",
          },
          signature: {
            type: "string",
          },
          verifiedDataCrc32c: {
            type: "boolean",
          },
          name: {
            type: "string",
          },
          signatureCrc32c: {
            type: "string",
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
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsKeyRingsCryptoKeysCryptoKeyVersionsAsymmetricSign;
