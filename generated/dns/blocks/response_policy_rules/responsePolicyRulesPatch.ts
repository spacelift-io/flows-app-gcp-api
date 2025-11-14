import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const responsePolicyRulesPatch: AppBlock = {
  name: "Response Policy Rules - Patch",
  description: `Applies a partial update to an existing Response Policy Rule.`,
  category: "Response Policy Rules",
  inputs: {
    default: {
      config: {
        responsePolicyRule: {
          name: "ResponsePolicyRule",
          description:
            "User assigned name of the Response Policy Rule addressed by this request.",
          type: "string",
          required: true,
        },
        responsePolicy: {
          name: "ResponsePolicy",
          description:
            "User assigned name of the Response Policy containing the Response Policy Rule.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Identifies the project addressed by this request.",
          type: "string",
          required: true,
        },
        clientOperationId: {
          name: "ClientOperationId",
          description:
            "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "A Response Policy Rule is a selector that applies its behavior to queries that match the selector. Selectors are DNS names, which may be wildcards or exact matches. Each DNS query subject to a Response Policy matches at most one ResponsePolicyRule, as identified by the dns_name field with the longest matching suffix.",
          type: {
            type: "object",
            properties: {
              behavior: {
                type: "string",
                enum: ["behaviorUnspecified", "bypassResponsePolicy"],
              },
              dnsName: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              ruleName: {
                type: "string",
              },
              localData: {
                type: "object",
                properties: {
                  localDatas: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
                additionalProperties: true,
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
            "https://www.googleapis.com/auth/ndev.clouddns.readwrite",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://dns.googleapis.com/";
        const path = `dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules/{responsePolicyRule}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
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
          responsePolicyRule: {
            type: "object",
            properties: {
              behavior: {
                type: "string",
                enum: ["behaviorUnspecified", "bypassResponsePolicy"],
              },
              dnsName: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              ruleName: {
                type: "string",
              },
              localData: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default responsePolicyRulesPatch;
