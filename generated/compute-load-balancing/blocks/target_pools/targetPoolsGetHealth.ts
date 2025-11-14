import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const targetPoolsGetHealth: AppBlock = {
  name: "Target Pools - Get Health",
  description: `Gets the most recent health check results for each IP for the instance that is referenced by the given target pool.`,
  category: "Target Pools",
  inputs: {
    default: {
      config: {
        targetPool: {
          name: "TargetPool",
          description:
            "Name of the TargetPool resource to which the queried instance belongs.",
          type: "string",
          required: true,
        },
        region: {
          name: "Region",
          description: "Name of the region scoping this request.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "Request body",
          type: {
            type: "object",
            properties: {
              instance: {
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
        const path = `projects/{project}/regions/{region}/targetPools/{targetPool}/getHealth`;
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
          kind: {
            type: "string",
          },
          healthStatus: {
            type: "array",
            items: {
              type: "object",
              properties: {
                forwardingRule: {
                  type: "object",
                  additionalProperties: true,
                },
                instance: {
                  type: "object",
                  additionalProperties: true,
                },
                healthState: {
                  type: "object",
                  additionalProperties: true,
                },
                weight: {
                  type: "object",
                  additionalProperties: true,
                },
                ipv6HealthState: {
                  type: "object",
                  additionalProperties: true,
                },
                ipv6Address: {
                  type: "object",
                  additionalProperties: true,
                },
                weightError: {
                  type: "object",
                  additionalProperties: true,
                },
                forwardingRuleIp: {
                  type: "object",
                  additionalProperties: true,
                },
                port: {
                  type: "object",
                  additionalProperties: true,
                },
                ipAddress: {
                  type: "object",
                  additionalProperties: true,
                },
                annotations: {
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

export default targetPoolsGetHealth;
