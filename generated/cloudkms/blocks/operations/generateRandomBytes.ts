import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const generateRandomBytes: AppBlock = {
  name: "Operations - Generate Random Bytes",
  description: `Generate random bytes using the Cloud KMS randomness source in the provided location.`,
  category: "Operations",
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
        lengthBytes: {
          name: "Length Bytes",
          description:
            "The length in bytes of the amount of randomness to retrieve.",
          type: "number",
          required: false,
        },
        protectionLevel: {
          name: "Protection Level",
          description:
            "The ProtectionLevel to use when generating the random data.",
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
        let path = `v1/{+location}:generateRandomBytes`;

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

        if (input.event.inputConfig.lengthBytes !== undefined)
          requestBody.lengthBytes = input.event.inputConfig.lengthBytes;
        if (input.event.inputConfig.protectionLevel !== undefined)
          requestBody.protectionLevel = input.event.inputConfig.protectionLevel;

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

export default generateRandomBytes;
