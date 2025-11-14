import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const showEffectiveKeyAccessJustificationsPolicyConfig: AppBlock = {
  name: "Show Effective Key Access Justifications Policy Config - Show Effective Key Access Justifications Policy Config",
  description: `Returns the KeyAccessJustificationsPolicyConfig of the resource closest to the given project in hierarchy.`,
  category: "Show Effective Key Access Justifications Policy Config",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description:
            'Required. The number or id of the project to get the effective KeyAccessJustificationsPolicyConfig. In the format of "projects/{|}"',
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
        const path = `v1/{+project}:showEffectiveKeyAccessJustificationsPolicyConfig`;
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
          effectiveKajPolicy: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              defaultKeyAccessJustificationPolicy: {
                type: "object",
                additionalProperties: true,
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

export default showEffectiveKeyAccessJustificationsPolicyConfig;
