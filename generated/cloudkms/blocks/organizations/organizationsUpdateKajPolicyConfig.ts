import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const organizationsUpdateKajPolicyConfig: AppBlock = {
  name: "Organizations - Update Kaj Policy Config",
  description: `Updates the KeyAccessJustificationsPolicyConfig for a given organization, folder, or project.`,
  category: "Organizations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            'Identifier. The resource name for this KeyAccessJustificationsPolicyConfig in the format of "{organizations|folders|projects}/*/kajPolicyConfig".',
          type: "string",
          required: true,
        },
        updateMask: {
          name: "UpdateMask",
          description: "Optional. The list of fields to update.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "A singleton configuration for Key Access Justifications policies.",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              defaultKeyAccessJustificationPolicy: {
                type: "object",
                properties: {
                  allowedAccessReasons: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
                additionalProperties: true,
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
        const path = `v1/{+name}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
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
          name: {
            type: "string",
          },
          defaultKeyAccessJustificationPolicy: {
            type: "object",
            properties: {
              allowedAccessReasons: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
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

export default organizationsUpdateKajPolicyConfig;
