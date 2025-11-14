import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const tagKeysGetNamespaced: AppBlock = {
  name: "Tag Keys - Get Namespaced",
  description: `Retrieves a TagKey by its namespaced name.`,
  category: "Tag Keys",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            'Required. A namespaced tag key name in the format `{parentId}/{tagKeyShort}`, such as `42/foo` for a key with short name "foo" under the organization with ID 42 or `r2-d2/bar` for a key with short name "bar" under the project `r2-d2`.',
          type: "string",
          required: false,
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
        const path = `v3/tagKeys/namespaced`;
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

export default tagKeysGetNamespaced;
