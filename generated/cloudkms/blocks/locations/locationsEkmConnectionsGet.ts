import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsEkmConnectionsGet: AppBlock = {
  name: "Locations - Get",
  description: `Returns metadata for a given EkmConnection.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Required. The name of the EkmConnection to get.",
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
          etag: {
            type: "string",
          },
          name: {
            type: "string",
          },
          cryptoSpacePath: {
            type: "string",
          },
          serviceResolvers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                hostname: {
                  type: "object",
                  additionalProperties: true,
                },
                endpointFilter: {
                  type: "object",
                  additionalProperties: true,
                },
                serverCertificates: {
                  type: "object",
                  additionalProperties: true,
                },
                serviceDirectoryService: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          createTime: {
            type: "string",
          },
          keyManagementMode: {
            type: "string",
            enum: ["KEY_MANAGEMENT_MODE_UNSPECIFIED", "MANUAL", "CLOUD_KMS"],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsEkmConnectionsGet;
