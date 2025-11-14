import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const regionNetworkFirewallPoliciesGetEffectiveFirewalls: AppBlock = {
  name: "Region Network Firewall Policies - Get Effective Firewalls",
  description: `Returns the effective firewalls on a given network.`,
  category: "Region Network Firewall Policies",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        region: {
          name: "Region",
          description: "Name of the region scoping this request.",
          type: "string",
          required: true,
        },
        network: {
          name: "Network",
          description: "Network reference",
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
        const path = `projects/{project}/regions/{region}/firewallPolicies/getEffectiveFirewalls`;
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
          firewallPolicys: {
            type: "array",
            items: {
              type: "object",
              properties: {
                displayName: {
                  type: "object",
                  additionalProperties: true,
                },
                rules: {
                  type: "object",
                  additionalProperties: true,
                },
                priority: {
                  type: "object",
                  additionalProperties: true,
                },
                type: {
                  type: "object",
                  additionalProperties: true,
                },
                packetMirroringRules: {
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
        },
        additionalProperties: true,
      },
    },
  },
};

export default regionNetworkFirewallPoliciesGetEffectiveFirewalls;
