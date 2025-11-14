import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsSecretsDelete: AppBlock = {
  name: "Locations - Delete",
  description: `Deletes a Secret.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The resource name of the Secret to delete in the format `projects/*/secrets/*`.",
          type: "string",
          required: true,
        },
        etag: {
          name: "Etag",
          description:
            "Optional. Etag of the Secret. The request succeeds if it matches the etag of the currently stored secret object. If the etag is omitted, the request succeeds.",
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
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://secretmanager.googleapis.com/";
        const path = `v1/{+name}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "DELETE",
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
        properties: {},
        additionalProperties: true,
      },
    },
  },
};

export default locationsSecretsDelete;
