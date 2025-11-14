import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const cryptoKeyVersionsAsymmetricSign: AppBlock = {
  name: "Crypto Key Versions - Asymmetric Sign",
  description: `Signs data using a CryptoKeyVersion with CryptoKey.`,
  category: "Crypto Key Versions",
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
        data: {
          name: "Data",
          description: "Optional.",
          type: "string",
          required: false,
        },
        digest: {
          name: "Digest",
          description: "Optional.",
          type: {
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
          required: false,
        },
        dataCrc32c: {
          name: "Data Crc32c",
          description: "Optional.",
          type: "string",
          required: false,
        },
        digestCrc32c: {
          name: "Digest Crc32c",
          description: "Optional.",
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
        let path = `v1/{+name}:asymmetricSign`;

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

        if (input.event.inputConfig.data !== undefined)
          requestBody.data = input.event.inputConfig.data;
        if (input.event.inputConfig.digest !== undefined)
          requestBody.digest = input.event.inputConfig.digest;
        if (input.event.inputConfig.dataCrc32c !== undefined)
          requestBody.dataCrc32c = input.event.inputConfig.dataCrc32c;
        if (input.event.inputConfig.digestCrc32c !== undefined)
          requestBody.digestCrc32c = input.event.inputConfig.digestCrc32c;

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

export default cryptoKeyVersionsAsymmetricSign;
