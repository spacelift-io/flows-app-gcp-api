import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const tagValuesGet: AppBlock = {
  name: "Tag Values - Get",
  description: `Retrieves a TagValue.`,
  category: "Tag Values",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. Resource name for TagValue to be fetched in the format `tagValues/456`.",
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
          shortName: {
            type: "string",
          },
          updateTime: {
            type: "string",
          },
          name: {
            type: "string",
          },
          parent: {
            type: "string",
          },
          namespacedName: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          createTime: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default tagValuesGet;
