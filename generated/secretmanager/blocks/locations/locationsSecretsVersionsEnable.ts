import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsSecretsVersionsEnable: AppBlock = {
  name: "Locations - Enable",
  description: `Enables a SecretVersion.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The resource name of the SecretVersion to enable in the format `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*`.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Request message for SecretManagerService.EnableSecretVersion.",
          type: {
            type: "object",
            properties: {
              etag: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: true,
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
        const path = `v1/{+name}:enable`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        };

        // Add request body
        if (input.event.inputConfig.requestBody) {
          requestOptions.body = JSON.stringify(
            input.event.inputConfig.requestBody,
          );
        }

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

export default locationsSecretsVersionsEnable;
