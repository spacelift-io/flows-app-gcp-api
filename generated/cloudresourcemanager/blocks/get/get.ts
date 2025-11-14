import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const get: AppBlock = {
  name: "Get - Get",
  description: `Retrieves the project identified by the specified 'name' (for example, 'projects/415104041262').`,
  category: "Get",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The name of the project (for example, `projects/415104041262`).",
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
          updateTime: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          createTime: {
            type: "string",
          },
          configuredCapabilities: {
            type: "array",
            items: {
              type: "string",
            },
          },
          deleteTime: {
            type: "string",
          },
          parent: {
            type: "string",
          },
          projectId: {
            type: "string",
          },
          displayName: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          tags: {
            type: "object",
            additionalProperties: true,
          },
          state: {
            type: "string",
            enum: ["STATE_UNSPECIFIED", "ACTIVE", "DELETE_REQUESTED"],
          },
          name: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default get;
