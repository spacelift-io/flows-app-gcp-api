import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const firewallPoliciesGet: AppBlock = {
  name: "Firewall Policies - Get",
  description: `Returns the specified firewall policy.`,
  category: "Firewall Policies",
  inputs: {
    default: {
      config: {
        firewallPolicy: {
          name: "Firewall Policy",
          description: "Name of the firewall policy to get.",
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
        let path = `locations/global/firewallPolicies/{firewallPolicy}`;

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

export default firewallPoliciesGet;
