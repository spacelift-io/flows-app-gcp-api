import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const organizationSecurityPoliciesGetRule: AppBlock = {
  name: "Organization Security Policies - Get Rule",
  description: `Gets a rule at the specified priority.`,
  category: "Organization Security Policies",
  inputs: {
    default: {
      config: {
        securityPolicy: {
          name: "SecurityPolicy",
          description:
            "Name of the security policy to which the queried rule belongs.",
          type: "string",
          required: true,
        },
        priority: {
          name: "Priority",
          description:
            "The priority of the rule to get from the security policy.",
          type: "number",
          required: false,
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
        const path = `locations/global/securityPolicies/{securityPolicy}/getRule`;
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
          preconfiguredWafConfig: {
            type: "object",
            properties: {
              exclusions: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          networkMatch: {
            type: "object",
            properties: {
              destIpRanges: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              srcAsns: {
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
              ipProtocols: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              userDefinedFields: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              destPorts: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              srcPorts: {
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
            },
            additionalProperties: true,
          },
          kind: {
            type: "string",
          },
          rateLimitOptions: {
            type: "object",
            properties: {
              banDurationSec: {
                type: "number",
              },
              exceedAction: {
                type: "string",
              },
              enforceOnKeyName: {
                type: "string",
              },
              enforceOnKey: {
                type: "string",
                enum: [
                  "ALL",
                  "HTTP_COOKIE",
                  "HTTP_HEADER",
                  "HTTP_PATH",
                  "IP",
                  "REGION_CODE",
                  "SNI",
                  "TLS_JA3_FINGERPRINT",
                  "TLS_JA4_FINGERPRINT",
                  "USER_IP",
                  "XFF_IP",
                ],
              },
              conformAction: {
                type: "string",
              },
              enforceOnKeyConfigs: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              exceedRedirectOptions: {
                type: "object",
                additionalProperties: true,
              },
              banThreshold: {
                type: "object",
                additionalProperties: true,
              },
              rateLimitThreshold: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          redirectOptions: {
            type: "object",
            properties: {
              type: {
                type: "string",
                enum: ["EXTERNAL_302", "GOOGLE_RECAPTCHA"],
              },
              target: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          action: {
            type: "string",
          },
          headerAction: {
            type: "object",
            properties: {
              requestHeadersToAdds: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          preview: {
            type: "boolean",
          },
          match: {
            type: "object",
            properties: {
              versionedExpr: {
                type: "string",
                enum: ["SRC_IPS_V1"],
              },
              config: {
                type: "object",
                additionalProperties: true,
              },
              exprOptions: {
                type: "object",
                additionalProperties: true,
              },
              expr: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          description: {
            type: "string",
          },
          priority: {
            type: "number",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default organizationSecurityPoliciesGetRule;
