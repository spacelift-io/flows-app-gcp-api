import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const bucketsGetStorageLayout: AppBlock = {
  name: "Buckets - Get Storage Layout",
  description: `Returns the storage layout configuration for the specified bucket.`,
  category: "Buckets",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "Name of a bucket.",
          type: "string",
          required: true,
        },
        prefix: {
          name: "Prefix",
          description:
            "An optional prefix used for permission check. It is useful when the caller only has storage.objects.list permission under a specific prefix.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        // Support both service account keys and pre-generated access tokens
        let accessToken: string;

        if (input.app.config.accessToken) {
          // Use pre-generated access token (Workload Identity Federation, etc.)
          accessToken = input.app.config.accessToken;
        } else if (input.app.config.serviceAccountKey) {
          // Parse service account credentials and generate token
          const credentials = JSON.parse(input.app.config.serviceAccountKey);

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
          const token = await client.getAccessToken();
          accessToken = token.token!;
        } else {
          throw new Error(
            "Either serviceAccountKey or accessToken must be provided in app configuration",
          );
        }

        // Build request URL and parameters
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        let path = `b/{bucket}/storageLayout`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
          bucket: {
            type: "string",
          },
          customPlacementConfig: {
            type: "object",
            properties: {
              dataLocations: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            additionalProperties: true,
          },
          hierarchicalNamespace: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          kind: {
            type: "string",
          },
          location: {
            type: "string",
          },
          locationType: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default bucketsGetStorageLayout;
