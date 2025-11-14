import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const tagKeysGet: AppBlock = {
  name: "Tag Keys - Get",
  description: `Retrieves a TagKey.`,
  category: "Tag Keys",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. A resource name in the format `tagKeys/{id}`, such as `tagKeys/123`.",
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
            "https://www.googleapis.com/auth/cloud-platform.read-only",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://cloudresourcemanager.googleapis.com/";
        const path = `v3/{+name}`;
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
          parent: {
            type: "string",
          },
          allowedValuesRegex: {
            type: "string",
          },
          namespacedName: {
            type: "string",
          },
          purpose: {
            type: "string",
            enum: ["PURPOSE_UNSPECIFIED", "GCE_FIREWALL", "DATA_GOVERNANCE"],
          },
          shortName: {
            type: "string",
          },
          purposeData: {
            type: "object",
            additionalProperties: true,
          },
          description: {
            type: "string",
          },
          updateTime: {
            type: "string",
          },
          name: {
            type: "string",
          },
          createTime: {
            type: "string",
          },
          etag: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default tagKeysGet;
