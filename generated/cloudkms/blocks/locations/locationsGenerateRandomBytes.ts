import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsGenerateRandomBytes: AppBlock = {
  name: "Locations - Generate Random Bytes",
  description: `Generate random bytes using the Cloud KMS randomness source in the provided location.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          description:
            'The project-specific location in which to generate random bytes. For example, "projects/my-project/locations/us-central1".',
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Request message for KeyManagementService.GenerateRandomBytes.",
          type: {
            type: "object",
            properties: {
              lengthBytes: {
                type: "number",
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
        const path = `v1/{+location}:generateRandomBytes`;
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
          data: {
            type: "string",
          },
          dataCrc32c: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsGenerateRandomBytes;
