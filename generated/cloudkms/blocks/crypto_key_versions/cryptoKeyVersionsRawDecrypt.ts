import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const cryptoKeyVersionsRawDecrypt: AppBlock = {
  name: "Crypto Key Versions - Raw Decrypt",
  description: `Decrypts data that was originally encrypted using a raw cryptographic mechanism.`,
  category: "Crypto Key Versions",
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
        ciphertextCrc32c: {
          name: "Ciphertext Crc32c",
          description: "Optional.",
          type: "string",
          required: false,
        },
        additionalAuthenticatedData: {
          name: "Additional Authenticated Data",
          description: "Optional.",
          type: "string",
          required: false,
        },
        tagLength: {
          name: "Tag Length",
          description:
            "The length of the authentication tag that is appended to the end of the ciphertext.",
          type: "number",
          required: false,
        },
        initializationVector: {
          name: "Initialization Vector",
          description: "Required.",
          type: "string",
          required: false,
        },
        initializationVectorCrc32c: {
          name: "Initialization Vector Crc32c",
          description: "Optional.",
          type: "string",
          required: false,
        },
        ciphertext: {
          name: "Ciphertext",
          description: "Required.",
          type: "string",
          required: false,
        },
        additionalAuthenticatedDataCrc32c: {
          name: "Additional Authenticated Data Crc32c",
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
        let path = `v1/{+name}:rawDecrypt`;

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

        if (input.event.inputConfig.ciphertextCrc32c !== undefined)
          requestBody.ciphertextCrc32c =
            input.event.inputConfig.ciphertextCrc32c;
        if (input.event.inputConfig.additionalAuthenticatedData !== undefined)
          requestBody.additionalAuthenticatedData =
            input.event.inputConfig.additionalAuthenticatedData;
        if (input.event.inputConfig.tagLength !== undefined)
          requestBody.tagLength = input.event.inputConfig.tagLength;
        if (input.event.inputConfig.initializationVector !== undefined)
          requestBody.initializationVector =
            input.event.inputConfig.initializationVector;
        if (input.event.inputConfig.initializationVectorCrc32c !== undefined)
          requestBody.initializationVectorCrc32c =
            input.event.inputConfig.initializationVectorCrc32c;
        if (input.event.inputConfig.ciphertext !== undefined)
          requestBody.ciphertext = input.event.inputConfig.ciphertext;
        if (
          input.event.inputConfig.additionalAuthenticatedDataCrc32c !==
          undefined
        )
          requestBody.additionalAuthenticatedDataCrc32c =
            input.event.inputConfig.additionalAuthenticatedDataCrc32c;

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
          plaintext: {
            type: "string",
          },
          verifiedInitializationVectorCrc32c: {
            type: "boolean",
          },
          verifiedCiphertextCrc32c: {
            type: "boolean",
          },
          verifiedAdditionalAuthenticatedDataCrc32c: {
            type: "boolean",
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

export default cryptoKeyVersionsRawDecrypt;
