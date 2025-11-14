import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsClustersNodePoolsList: AppBlock = {
  name: "Locations - List",
  description: `Lists the node pools for a cluster.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "The parent (project, location, cluster name) where the node pools will be listed. Specified in the format `projects/*/locations/*/clusters/*`.",
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
        const path = `v1/{+parent}/nodePools`;
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
          nodePools: {
            type: "array",
            items: {
              type: "object",
              properties: {
                conditions: {
                  type: "object",
                  additionalProperties: true,
                },
                etag: {
                  type: "object",
                  additionalProperties: true,
                },
                maxPodsConstraint: {
                  type: "object",
                  additionalProperties: true,
                },
                placementPolicy: {
                  type: "object",
                  additionalProperties: true,
                },
                networkConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                status: {
                  type: "object",
                  additionalProperties: true,
                },
                version: {
                  type: "object",
                  additionalProperties: true,
                },
                podIpv4CidrSize: {
                  type: "object",
                  additionalProperties: true,
                },
                config: {
                  type: "object",
                  additionalProperties: true,
                },
                statusMessage: {
                  type: "object",
                  additionalProperties: true,
                },
                instanceGroupUrls: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                updateInfo: {
                  type: "object",
                  additionalProperties: true,
                },
                management: {
                  type: "object",
                  additionalProperties: true,
                },
                autoscaling: {
                  type: "object",
                  additionalProperties: true,
                },
                locations: {
                  type: "object",
                  additionalProperties: true,
                },
                initialNodeCount: {
                  type: "object",
                  additionalProperties: true,
                },
                autopilotConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                selfLink: {
                  type: "object",
                  additionalProperties: true,
                },
                queuedProvisioning: {
                  type: "object",
                  additionalProperties: true,
                },
                bestEffortProvisioning: {
                  type: "object",
                  additionalProperties: true,
                },
                upgradeSettings: {
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

export default locationsClustersNodePoolsList;
