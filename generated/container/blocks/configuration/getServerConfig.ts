import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const getServerConfig: AppBlock = {
  name: "Configuration - Get Server Config",
  description: `Returns configuration info about the Google Kubernetes Engine service.`,
  category: "Configuration",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "The name (project and location) of the server config to get, specified in the format `projects/*/locations/*`.",
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
        const baseUrl = "https://container.googleapis.com/";
        let path = `v1/{+name}/serverConfig`;

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
          validMasterVersions: {
            type: "array",
            items: {
              type: "string",
            },
          },
          validImageTypes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          defaultClusterVersion: {
            type: "string",
          },
          channels: {
            type: "array",
            items: {
              type: "object",
              properties: {
                channel: {
                  type: "object",
                  additionalProperties: true,
                },
                validVersions: {
                  type: "object",
                  additionalProperties: true,
                },
                defaultVersion: {
                  type: "object",
                  additionalProperties: true,
                },
                upgradeTargetVersion: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          defaultImageType: {
            type: "string",
          },
          validNodeVersions: {
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

export default getServerConfig;
