import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsClustersGetJwks: AppBlock = {
  name: "Locations - Get Jwks",
  description: `Gets the public component of the cluster signing keys in JSON Web Key format.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "The cluster (project, location, cluster name) to get keys for. Specified in the format `projects/*/locations/*/clusters/*`.",
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
        const path = `v1/{+parent}/jwks`;
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
          keys: {
            type: "array",
            items: {
              type: "object",
              properties: {
                crv: {
                  type: "object",
                  additionalProperties: true,
                },
                y: {
                  type: "object",
                  additionalProperties: true,
                },
                e: {
                  type: "object",
                  additionalProperties: true,
                },
                kty: {
                  type: "object",
                  additionalProperties: true,
                },
                alg: {
                  type: "object",
                  additionalProperties: true,
                },
                n: {
                  type: "object",
                  additionalProperties: true,
                },
                kid: {
                  type: "object",
                  additionalProperties: true,
                },
                use: {
                  type: "object",
                  additionalProperties: true,
                },
                x: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsClustersGetJwks;
