import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const networkFirewallPoliciesGet: AppBlock = {
  name: "Network Firewall Policies - Get",
  description: `Returns the specified network firewall policy.`,
  category: "Network Firewall Policies",
  inputs: {
    default: {
      config: {
        firewallPolicy: {
          name: "FirewallPolicy",
          description: "Name of the firewall policy to get.",
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
        const path = `projects/{project}/global/firewallPolicies/{firewallPolicy}`;
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
          kind: {
            type: "string",
          },
          ruleTupleCount: {
            type: "number",
          },
          parent: {
            type: "string",
          },
          associations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                displayName: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                firewallPolicyId: {
                  type: "object",
                  additionalProperties: true,
                },
                shortName: {
                  type: "object",
                  additionalProperties: true,
                },
                attachmentTarget: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          policyType: {
            type: "string",
            enum: ["RDMA_ROCE_POLICY", "VPC_POLICY"],
          },
          fingerprint: {
            type: "string",
          },
          rules: {
            type: "array",
            items: {
              type: "object",
              properties: {
                securityProfileGroup: {
                  type: "object",
                  additionalProperties: true,
                },
                ruleTupleCount: {
                  type: "object",
                  additionalProperties: true,
                },
                disabled: {
                  type: "object",
                  additionalProperties: true,
                },
                tlsInspect: {
                  type: "object",
                  additionalProperties: true,
                },
                priority: {
                  type: "object",
                  additionalProperties: true,
                },
                action: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                targetServiceAccounts: {
                  type: "object",
                  additionalProperties: true,
                },
                match: {
                  type: "object",
                  additionalProperties: true,
                },
                enableLogging: {
                  type: "object",
                  additionalProperties: true,
                },
                ruleName: {
                  type: "object",
                  additionalProperties: true,
                },
                direction: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
                targetSecureTags: {
                  type: "object",
                  additionalProperties: true,
                },
                targetResources: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          packetMirroringRules: {
            type: "array",
            items: {
              type: "object",
              properties: {
                securityProfileGroup: {
                  type: "object",
                  additionalProperties: true,
                },
                ruleTupleCount: {
                  type: "object",
                  additionalProperties: true,
                },
                disabled: {
                  type: "object",
                  additionalProperties: true,
                },
                tlsInspect: {
                  type: "object",
                  additionalProperties: true,
                },
                priority: {
                  type: "object",
                  additionalProperties: true,
                },
                action: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                targetServiceAccounts: {
                  type: "object",
                  additionalProperties: true,
                },
                match: {
                  type: "object",
                  additionalProperties: true,
                },
                enableLogging: {
                  type: "object",
                  additionalProperties: true,
                },
                ruleName: {
                  type: "object",
                  additionalProperties: true,
                },
                direction: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
                targetSecureTags: {
                  type: "object",
                  additionalProperties: true,
                },
                targetResources: {
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
          description: {
            type: "string",
          },
          selfLinkWithId: {
            type: "string",
          },
          displayName: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          shortName: {
            type: "string",
          },
          name: {
            type: "string",
          },
          region: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default networkFirewallPoliciesGet;
