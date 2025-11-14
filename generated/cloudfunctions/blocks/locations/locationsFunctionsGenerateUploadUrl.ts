import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsFunctionsGenerateUploadUrl: AppBlock = {
  name: "Locations - Generate Upload Url",
  description: `Returns a signed URL for uploading a function source code.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The project and location in which the Google Cloud Storage signed URL should be generated, specified in the format `projects/*/locations/*`.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "Request of `GenerateSourceUploadUrl` method.",
          type: {
            type: "object",
            properties: {
              kmsKeyName: {
                type: "string",
              },
              environment: {
                type: "string",
                enum: ["ENVIRONMENT_UNSPECIFIED", "GEN_1", "GEN_2"],
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
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://cloudfunctions.googleapis.com/";
        const path = `v2/{+parent}/functions:generateUploadUrl`;
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
          uploadUrl: {
            type: "string",
          },
          storageSource: {
            type: "object",
            properties: {
              bucket: {
                type: "string",
              },
              object: {
                type: "string",
              },
              generation: {
                type: "string",
              },
              sourceUploadUrl: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsFunctionsGenerateUploadUrl;
