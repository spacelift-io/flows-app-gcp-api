import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const usersGet: AppBlock = {
  name: "Users - Get",
  description: `Retrieves a resource containing information about a user.`,
  category: "Users",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID of the project that contains the instance.",
          type: "string",
          required: true,
        },
        instance: {
          name: "Instance",
          description:
            "Database instance ID. This does not include the project ID.",
          type: "string",
          required: true,
        },
        name: {
          name: "Name",
          description: "User of the instance.",
          type: "string",
          required: true,
        },
        host: {
          name: "Host",
          description: "Host of a user of the instance.",
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
            "https://www.googleapis.com/auth/sqlservice.admin",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://sqladmin.googleapis.com/";
        const path = `v1/projects/{project}/instances/{instance}/users/{name}`;
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
          password: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          name: {
            type: "string",
          },
          host: {
            type: "string",
          },
          instance: {
            type: "string",
          },
          project: {
            type: "string",
          },
          type: {
            type: "string",
            enum: [
              "BUILT_IN",
              "CLOUD_IAM_USER",
              "CLOUD_IAM_SERVICE_ACCOUNT",
              "CLOUD_IAM_GROUP",
              "CLOUD_IAM_GROUP_USER",
              "CLOUD_IAM_GROUP_SERVICE_ACCOUNT",
              "ENTRAID_USER",
            ],
          },
          sqlserverUserDetails: {
            type: "object",
            properties: {
              disabled: {
                type: "boolean",
              },
              serverRoles: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          iamEmail: {
            type: "string",
          },
          passwordPolicy: {
            type: "object",
            properties: {
              allowedFailedAttempts: {
                type: "number",
              },
              passwordExpirationDuration: {
                type: "string",
              },
              enableFailedAttemptsCheck: {
                type: "boolean",
              },
              status: {
                type: "object",
                additionalProperties: true,
              },
              enablePasswordVerification: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          dualPasswordType: {
            type: "string",
            enum: [
              "DUAL_PASSWORD_TYPE_UNSPECIFIED",
              "NO_MODIFY_DUAL_PASSWORD",
              "NO_DUAL_PASSWORD",
              "DUAL_PASSWORD",
            ],
          },
          iamStatus: {
            type: "string",
            enum: ["IAM_STATUS_UNSPECIFIED", "INACTIVE", "ACTIVE"],
          },
          databaseRoles: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default usersGet;
