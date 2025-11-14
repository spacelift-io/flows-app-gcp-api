import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const anywhereCachesList: AppBlock = {
  name: "Anywhere Caches - List",
  description: `Returns a list of Anywhere Cache instances of the bucket matching the criteria.`,
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
        pageSize: {
          name: "PageSize",
          description:
            "Maximum number of items to return in a single page of responses. Maximum 1000.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description:
            "A previously-returned page token representing part of the larger set of results to view.",
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
            "https://www.googleapis.com/auth/devstorage.full_control",
            "https://www.googleapis.com/auth/devstorage.read_only",
            "https://www.googleapis.com/auth/devstorage.read_write",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        const path = `b/{bucket}/anywhereCaches`;
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
          kind: {
            type: "string",
          },
          nextPageToken: {
            type: "string",
          },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                id: {
                  type: "object",
                  additionalProperties: true,
                },
                selfLink: {
                  type: "object",
                  additionalProperties: true,
                },
                bucket: {
                  type: "object",
                  additionalProperties: true,
                },
                anywhereCacheId: {
                  type: "object",
                  additionalProperties: true,
                },
                zone: {
                  type: "object",
                  additionalProperties: true,
                },
                state: {
                  type: "object",
                  additionalProperties: true,
                },
                createTime: {
                  type: "object",
                  additionalProperties: true,
                },
                updateTime: {
                  type: "object",
                  additionalProperties: true,
                },
                ttl: {
                  type: "object",
                  additionalProperties: true,
                },
                admissionPolicy: {
                  type: "object",
                  additionalProperties: true,
                },
                pendingUpdate: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default anywhereCachesList;
