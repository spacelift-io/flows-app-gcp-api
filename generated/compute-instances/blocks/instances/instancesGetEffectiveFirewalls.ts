import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesGetEffectiveFirewalls: AppBlock = {
  name: "Instances - Get Effective Firewalls",
  description: `Returns effective firewalls applied to an interface of the instance.`,
  category: "Instances",
  inputs: {
    default: {
      config: {
        instance: {
          name: "Instance",
          description: "Name of the instance scoping this request.",
          type: "string",
          required: true,
        },
        networkInterface: {
          name: "Network Interface",
          description:
            "The name of the network interface to get the effective firewalls.",
          type: "string",
          required: true,
        },
        zone: {
          name: "Zone",
          description: "The name of the zone for this request.",
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
            scopes: [
              "https://www.googleapis.com/auth/cloud-platform",
              "https://www.googleapis.com/auth/compute",
              "https://www.googleapis.com/auth/compute.readonly",
            ],
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
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        let path = `projects/{project}/zones/{zone}/instances/{instance}/getEffectiveFirewalls`;

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
          firewalls: {
            type: "array",
            items: {
              type: "object",
              properties: {
                direction: {
                  type: "object",
                  additionalProperties: true,
                },
                sourceServiceAccounts: {
                  type: "object",
                  additionalProperties: true,
                },
                id: {
                  type: "object",
                  additionalProperties: true,
                },
                creationTimestamp: {
                  type: "object",
                  additionalProperties: true,
                },
                sourceTags: {
                  type: "object",
                  additionalProperties: true,
                },
                targetTags: {
                  type: "object",
                  additionalProperties: true,
                },
                selfLink: {
                  type: "object",
                  additionalProperties: true,
                },
                network: {
                  type: "object",
                  additionalProperties: true,
                },
                disabled: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                params: {
                  type: "object",
                  additionalProperties: true,
                },
                logConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                destinationRanges: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
                sourceRanges: {
                  type: "object",
                  additionalProperties: true,
                },
                denied: {
                  type: "object",
                  additionalProperties: true,
                },
                targetServiceAccounts: {
                  type: "object",
                  additionalProperties: true,
                },
                allowed: {
                  type: "object",
                  additionalProperties: true,
                },
                priority: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          firewallPolicys: {
            type: "array",
            items: {
              type: "object",
              properties: {
                rules: {
                  type: "object",
                  additionalProperties: true,
                },
                type: {
                  type: "object",
                  additionalProperties: true,
                },
                shortName: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                displayName: {
                  type: "object",
                  additionalProperties: true,
                },
                packetMirroringRules: {
                  type: "object",
                  additionalProperties: true,
                },
                priority: {
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

export default instancesGetEffectiveFirewalls;
