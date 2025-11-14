import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const versionsGet: AppBlock = {
  name: "Versions - Get",
  description: `Gets metadata for a SecretVersion.`,
  category: "Versions",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The resource name of the SecretVersion in the format `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*`. `projects/*/secrets/*/versions/latest` or `projects/*/locations/*/secrets/*/versions/latest` is an alias to the most recently created SecretVersion.",
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
          scheduledDestroyTime: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          destroyTime: {
            type: "string",
          },
          name: {
            type: "string",
          },
          createTime: {
            type: "string",
          },
          state: {
            type: "string",
            enum: ["STATE_UNSPECIFIED", "ENABLED", "DISABLED", "DESTROYED"],
          },
          replicationStatus: {
            type: "object",
            properties: {
              userManaged: {
                type: "object",
                additionalProperties: true,
              },
              automatic: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          clientSpecifiedPayloadChecksum: {
            type: "boolean",
          },
          customerManagedEncryption: {
            type: "object",
            properties: {
              kmsKeyVersionName: {
                type: "string",
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

export default versionsGet;
