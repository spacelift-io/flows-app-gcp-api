import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const usersList: AppBlock = {
  name: "Users - List",
  description: `Lists users in the specified Cloud SQL instance.`,
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
        const path = `v1/projects/{project}/instances/{instance}/users`;
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
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                password: {
                  type: "object",
                  additionalProperties: true,
                },
                etag: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                host: {
                  type: "object",
                  additionalProperties: true,
                },
                instance: {
                  type: "object",
                  additionalProperties: true,
                },
                project: {
                  type: "object",
                  additionalProperties: true,
                },
                type: {
                  type: "object",
                  additionalProperties: true,
                },
                sqlserverUserDetails: {
                  type: "object",
                  additionalProperties: true,
                },
                iamEmail: {
                  type: "object",
                  additionalProperties: true,
                },
                passwordPolicy: {
                  type: "object",
                  additionalProperties: true,
                },
                dualPasswordType: {
                  type: "object",
                  additionalProperties: true,
                },
                iamStatus: {
                  type: "object",
                  additionalProperties: true,
                },
                databaseRoles: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          nextPageToken: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default usersList;
