import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const responsePolicyRulesUpdate: AppBlock = {
  name: "Response Policy Rules - Update",
  description: `Updates an existing Response Policy Rule.`,
  category: "Response Policy Rules",
  inputs: {
    default: {
      config: {
        responsePolicy: {
          name: "Response Policy",
          description:
            "User assigned name of the Response Policy containing the Response Policy Rule.",
          type: "string",
          required: true,
        },
        responsePolicyRule: {
          name: "Response Policy Rule",
          description:
            "User assigned name of the Response Policy Rule addressed by this request.",
          type: "string",
          required: true,
        },
        clientOperationId: {
          name: "Client Operation ID",
          description:
            "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
          type: "string",
          required: false,
        },
        behavior: {
          name: "Behavior",
          description:
            "Answer this query with a behavior rather than DNS data.",
          type: "string",
          required: false,
        },
        dnsName: {
          name: "DNS Name",
          description:
            "The DNS name (wildcard or exact) to apply this rule to.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "Request body field: kind",
          type: "string",
          required: false,
        },
        ruleName: {
          name: "Rule Name",
          description: "An identifier for this rule.",
          type: "string",
          required: false,
        },
        localData: {
          name: "Local Data",
          description: "Answer this query directly with DNS data.",
          type: {
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
              "https://www.googleapis.com/auth/ndev.clouddns.readwrite",
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
        const baseUrl = "https://dns.googleapis.com/";
        let path = `dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules/{responsePolicyRule}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.behavior !== undefined)
          requestBody.behavior = input.event.inputConfig.behavior;
        if (input.event.inputConfig.dnsName !== undefined)
          requestBody.dnsName = input.event.inputConfig.dnsName;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.ruleName !== undefined)
          requestBody.ruleName = input.event.inputConfig.ruleName;
        if (input.event.inputConfig.localData !== undefined)
          requestBody.localData = input.event.inputConfig.localData;

        if (Object.keys(requestBody).length > 0) {
          requestOptions.body = JSON.stringify(requestBody);
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

export default responsePolicyRulesUpdate;
