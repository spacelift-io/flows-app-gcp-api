import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const secretsGet: AppBlock = {
  name: "Secrets - Get",
  description: `Gets metadata for a given Secret.`,
  category: "Secrets",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The resource name of the Secret, in the format `projects/*/secrets/*` or `projects/*/locations/*/secrets/*`.",
          type: "string",
          required: true,
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
            scopes: ["https://www.googleapis.com/auth/cloud-platform"],
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
        const baseUrl = "https://secretmanager.googleapis.com/";
        let path = `v1/{+name}`;

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
          annotations: {
            type: "object",
            additionalProperties: true,
          },
          tags: {
            type: "object",
            additionalProperties: true,
          },
          topics: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          createTime: {
            type: "string",
          },
          versionAliases: {
            type: "object",
            additionalProperties: true,
          },
          name: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          customerManagedEncryption: {
            type: "object",
            properties: {
              kmsKeyName: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          expireTime: {
            type: "string",
          },
          versionDestroyTtl: {
            type: "string",
          },
          rotation: {
            type: "object",
            properties: {
              rotationPeriod: {
                type: "string",
              },
              nextRotationTime: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          replication: {
            type: "object",
            properties: {
              automatic: {
                type: "object",
                additionalProperties: true,
              },
              userManaged: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          ttl: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default secretsGet;
