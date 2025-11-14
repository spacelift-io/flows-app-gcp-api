import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsKeyRingsImportJobsGet: AppBlock = {
  name: "Locations - Get",
  description: `Returns metadata for a given ImportJob.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Required. The name of the ImportJob to get.",
          type: "string",
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
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
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

export default locationsKeyRingsImportJobsGet;
