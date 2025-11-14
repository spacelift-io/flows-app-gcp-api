import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const zonesGetServerconfig: AppBlock = {
  name: "Zones - Get Serverconfig",
  description: `Returns configuration info about the Google Kubernetes Engine service.`,
  category: "Zones",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "The name (project and location) of the server config to get, specified in the format `projects/*/locations/*`.",
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
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://container.googleapis.com/";
        const path = `v1/projects/{projectId}/zones/{zone}/serverconfig`;
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

export default zonesGetServerconfig;
