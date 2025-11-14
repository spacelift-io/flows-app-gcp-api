import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const networksGet: AppBlock = {
  name: "Networks - Get",
  description: `Returns the specified network.`,
  category: "Networks",
  inputs: {
    default: {
      config: {
        network: {
          name: "Network",
          description: "Name of the network to return.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
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
        const path = `projects/{project}/global/networks/{network}`;
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
          internalIpv6Range: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          selfLinkWithId: {
            type: "string",
          },
          autoCreateSubnetworks: {
            type: "boolean",
          },
          params: {
            type: "object",
            properties: {
              resourceManagerTags: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          creationTimestamp: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          mtu: {
            type: "number",
          },
          subnetworks: {
            type: "array",
            items: {
              type: "string",
            },
          },
          description: {
            type: "string",
          },
          networkFirewallPolicyEnforcementOrder: {
            type: "string",
            enum: ["AFTER_CLASSIC_FIREWALL", "BEFORE_CLASSIC_FIREWALL"],
          },
          gatewayIPv4: {
            type: "string",
          },
          peerings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                updateStrategy: {
                  type: "object",
                  additionalProperties: true,
                },
                state: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                network: {
                  type: "object",
                  additionalProperties: true,
                },
                exportCustomRoutes: {
                  type: "object",
                  additionalProperties: true,
                },
                autoCreateRoutes: {
                  type: "object",
                  additionalProperties: true,
                },
                importSubnetRoutesWithPublicIp: {
                  type: "object",
                  additionalProperties: true,
                },
                importCustomRoutes: {
                  type: "object",
                  additionalProperties: true,
                },
                connectionStatus: {
                  type: "object",
                  additionalProperties: true,
                },
                stackType: {
                  type: "object",
                  additionalProperties: true,
                },
                stateDetails: {
                  type: "object",
                  additionalProperties: true,
                },
                exchangeSubnetRoutes: {
                  type: "object",
                  additionalProperties: true,
                },
                exportSubnetRoutesWithPublicIp: {
                  type: "object",
                  additionalProperties: true,
                },
                peerMtu: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          id: {
            type: "string",
          },
          firewallPolicy: {
            type: "string",
          },
          routingConfig: {
            type: "object",
            properties: {
              bgpBestPathSelectionMode: {
                type: "string",
                enum: ["LEGACY", "STANDARD"],
              },
              bgpInterRegionCost: {
                type: "string",
                enum: ["ADD_COST_TO_MED", "DEFAULT"],
              },
              effectiveBgpAlwaysCompareMed: {
                type: "boolean",
              },
              effectiveBgpInterRegionCost: {
                type: "string",
                enum: ["ADD_COST_TO_MED", "DEFAULT"],
              },
              routingMode: {
                type: "string",
                enum: ["GLOBAL", "REGIONAL"],
              },
              bgpAlwaysCompareMed: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          IPv4Range: {
            type: "string",
          },
          networkProfile: {
            type: "string",
          },
          name: {
            type: "string",
          },
          enableUlaInternalIpv6: {
            type: "boolean",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default networksGet;
