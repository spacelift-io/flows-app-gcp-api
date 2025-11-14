import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const regionNetworkFirewallPoliciesGetRule: AppBlock = {
  name: "Region Network Firewall Policies - Get Rule",
  description: `Gets a rule of the specified priority.`,
  category: "Region Network Firewall Policies",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description: "Name of the region scoping this request.",
          type: "string",
          required: true,
        },
        firewallPolicy: {
          name: "Firewall Policy",
          description:
            "Name of the firewall policy to which the queried rule belongs.",
          type: "string",
          required: true,
        },
        priority: {
          name: "Priority",
          description:
            "The priority of the rule to get from the firewall policy.",
          type: "number",
          required: false,
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
        let path = `projects/{project}/regions/{region}/firewallPolicies/{firewallPolicy}/getRule`;

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
          securityProfileGroup: {
            type: "string",
          },
          ruleTupleCount: {
            type: "number",
          },
          disabled: {
            type: "boolean",
          },
          tlsInspect: {
            type: "boolean",
          },
          priority: {
            type: "number",
          },
          action: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          targetServiceAccounts: {
            type: "array",
            items: {
              type: "string",
            },
          },
          match: {
            type: "object",
            properties: {
              destIpRanges: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              srcAddressGroups: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              srcSecureTags: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              srcRegionCodes: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              destRegionCodes: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              srcIpRanges: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              destAddressGroups: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              srcFqdns: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              destNetworkType: {
                type: "string",
                enum: [
                  "INTERNET",
                  "INTRA_VPC",
                  "NON_INTERNET",
                  "UNSPECIFIED",
                  "VPC_NETWORKS",
                ],
              },
              destThreatIntelligences: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              srcThreatIntelligences: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              srcNetworks: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              layer4Configs: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              srcNetworkType: {
                type: "string",
                enum: [
                  "INTERNET",
                  "INTRA_VPC",
                  "NON_INTERNET",
                  "UNSPECIFIED",
                  "VPC_NETWORKS",
                ],
              },
              destFqdns: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          enableLogging: {
            type: "boolean",
          },
          ruleName: {
            type: "string",
          },
          direction: {
            type: "string",
            enum: ["EGRESS", "INGRESS"],
          },
          description: {
            type: "string",
          },
          targetSecureTags: {
            type: "array",
            items: {
              type: "object",
              properties: {
                state: {
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
          targetResources: {
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

export default regionNetworkFirewallPoliciesGetRule;
