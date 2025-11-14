import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsClustersWellKnownGetOpenidConfiguration: AppBlock = {
  name: "Locations - Get Openid-configuration",
  description: `Gets the OIDC discovery document for the cluster.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "The cluster (project, location, cluster name) to get the discovery document for. Specified in the format `projects/*/locations/*/clusters/*`.",
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
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://container.googleapis.com/";
        const path = `v1/{+parent}/.well-known/openid-configuration`;
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
          response_types_supported: {
            type: "array",
            items: {
              type: "string",
            },
          },
          cacheHeader: {
            type: "object",
            properties: {
              expires: {
                type: "string",
              },
              directive: {
                type: "string",
              },
              age: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          jwks_uri: {
            type: "string",
          },
          issuer: {
            type: "string",
          },
          grant_types: {
            type: "array",
            items: {
              type: "string",
            },
          },
          subject_types_supported: {
            type: "array",
            items: {
              type: "string",
            },
          },
          claims_supported: {
            type: "array",
            items: {
              type: "string",
            },
          },
          id_token_signing_alg_values_supported: {
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

export default locationsClustersWellKnownGetOpenidConfiguration;
