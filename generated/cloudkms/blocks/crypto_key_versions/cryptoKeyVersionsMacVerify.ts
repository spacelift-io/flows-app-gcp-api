import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const cryptoKeyVersionsMacVerify: AppBlock = {
  name: "Crypto Key Versions - Mac Verify",
  description: `Verifies MAC tag using a CryptoKeyVersion with CryptoKey.`,
  category: "Crypto Key Versions",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The resource name of the CryptoKeyVersion to use for verification.",
          type: "string",
          required: true,
        },
        dataCrc32c: {
          name: "Data Crc32c",
          description: "Optional.",
          type: "string",
          required: false,
        },
        macCrc32c: {
          name: "Mac Crc32c",
          description: "Optional.",
          type: "string",
          required: false,
        },
        mac: {
          name: "Mac",
          description: "Required.",
          type: "string",
          required: false,
        },
        data: {
          name: "Data",
          description: "Required.",
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
        let path = `v1/{+name}:macVerify`;

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

        if (input.event.inputConfig.dataCrc32c !== undefined)
          requestBody.dataCrc32c = input.event.inputConfig.dataCrc32c;
        if (input.event.inputConfig.macCrc32c !== undefined)
          requestBody.macCrc32c = input.event.inputConfig.macCrc32c;
        if (input.event.inputConfig.mac !== undefined)
          requestBody.mac = input.event.inputConfig.mac;
        if (input.event.inputConfig.data !== undefined)
          requestBody.data = input.event.inputConfig.data;

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
          name: {
            type: "string",
          },
          verifiedMacCrc32c: {
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
          success: {
            type: "boolean",
          },
          verifiedDataCrc32c: {
            type: "boolean",
          },
          verifiedSuccessIntegrity: {
            type: "boolean",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default cryptoKeyVersionsMacVerify;
