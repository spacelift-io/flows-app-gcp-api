import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const routersGetRouterStatus: AppBlock = {
  name: "Routers - Get Router Status",
  description: `Retrieves runtime information of the specified router.`,
  category: "Routers",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        router: {
          name: "Router",
          description: "Name of the Router resource to query.",
          type: "string",
          required: true,
        },
        region: {
          name: "Region",
          description: "Name of the region for this request.",
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
            "https://www.googleapis.com/auth/compute",
            "https://www.googleapis.com/auth/compute.readonly",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        const path = `projects/{project}/regions/{region}/routers/{router}/getRouterStatus`;
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
          result: {
            type: "object",
            properties: {
              bestRoutes: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              bgpPeerStatus: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              network: {
                type: "string",
              },
              natStatus: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              bestRoutesForRouter: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          kind: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default routersGetRouterStatus;
