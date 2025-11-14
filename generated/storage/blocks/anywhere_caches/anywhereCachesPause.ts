import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const anywhereCachesPause: AppBlock = {
  name: "Anywhere Caches - Pause",
  description: `Pauses an Anywhere Cache instance.`,
  category: "Anywhere Caches",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "Name of the parent bucket.",
          type: "string",
          required: true,
        },
        anywhereCacheId: {
          name: "AnywhereCacheId",
          description: "The ID of requested Anywhere Cache instance.",
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
            "https://www.googleapis.com/auth/devstorage.full_control",
            "https://www.googleapis.com/auth/devstorage.read_write",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        const path = `b/{bucket}/anywhereCaches/{anywhereCacheId}/pause`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
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
          kind: {
            type: "string",
          },
          id: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          bucket: {
            type: "string",
          },
          anywhereCacheId: {
            type: "string",
          },
          zone: {
            type: "string",
          },
          state: {
            type: "string",
          },
          createTime: {
            type: "string",
          },
          updateTime: {
            type: "string",
          },
          ttl: {
            type: "string",
          },
          admissionPolicy: {
            type: "string",
          },
          pendingUpdate: {
            type: "boolean",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default anywhereCachesPause;
