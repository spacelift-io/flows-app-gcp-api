import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const wellKnownGetOpenidConfiguration: AppBlock = {
  name: "Well-known - Get Openid-configuration",
  description: `Gets the OIDC discovery document for the cluster.`,
  category: "Well-known",
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
        let path = `v1/{+parent}/.well-known/openid-configuration`;

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

export default wellKnownGetOpenidConfiguration;
