import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsFunctionsGenerateDownloadUrl: AppBlock = {
  name: "Locations - Generate Download Url",
  description: `Returns a signed URL for downloading deployed function source code.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The name of function for which source code Google Cloud Storage signed URL should be generated.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "Request of `GenerateDownloadUrl` method.",
          type: {
            type: "object",
            properties: {},
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
        const path = `v2/{+name}:generateDownloadUrl`;
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
          downloadUrl: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsFunctionsGenerateDownloadUrl;
