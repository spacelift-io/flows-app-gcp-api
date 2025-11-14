import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const organizationSecurityPoliciesGet: AppBlock = {
  name: "Organization Security Policies - Get",
  description: `List all of the ordered rules present in a single specified policy.`,
  category: "Organization Security Policies",
  inputs: {
    default: {
      config: {
        securityPolicy: {
          name: "SecurityPolicy",
          description: "Name of the security policy to get.",
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
        const path = `locations/global/securityPolicies/{securityPolicy}`;
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
          labelFingerprint: {
            type: "string",
          },
          associations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                securityPolicyId: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                attachmentId: {
                  type: "object",
                  additionalProperties: true,
                },
                shortName: {
                  type: "object",
                  additionalProperties: true,
                },
                excludedProjects: {
                  type: "object",
                  additionalProperties: true,
                },
                excludedFolders: {
                  type: "object",
                  additionalProperties: true,
                },
                displayName: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          adaptiveProtectionConfig: {
            type: "object",
            properties: {
              layer7DdosDefenseConfig: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          parent: {
            type: "string",
          },
          recaptchaOptionsConfig: {
            type: "object",
            properties: {
              redirectSiteKey: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          region: {
            type: "string",
          },
          advancedOptionsConfig: {
            type: "object",
            properties: {
              userIpRequestHeaders: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              logLevel: {
                type: "string",
                enum: ["NORMAL", "VERBOSE"],
              },
              jsonParsing: {
                type: "string",
                enum: ["DISABLED", "STANDARD", "STANDARD_WITH_GRAPHQL"],
              },
              jsonCustomConfig: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          type: {
            type: "string",
            enum: ["CLOUD_ARMOR", "CLOUD_ARMOR_EDGE", "CLOUD_ARMOR_NETWORK"],
          },
          rules: {
            type: "array",
            items: {
              type: "object",
              properties: {
                preconfiguredWafConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                networkMatch: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                rateLimitOptions: {
                  type: "object",
                  additionalProperties: true,
                },
                redirectOptions: {
                  type: "object",
                  additionalProperties: true,
                },
                action: {
                  type: "object",
                  additionalProperties: true,
                },
                headerAction: {
                  type: "object",
                  additionalProperties: true,
                },
                preview: {
                  type: "object",
                  additionalProperties: true,
                },
                match: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
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
          name: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          description: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          ddosProtectionConfig: {
            type: "object",
            properties: {
              ddosProtection: {
                type: "string",
                enum: ["ADVANCED", "ADVANCED_PREVIEW", "STANDARD"],
              },
            },
            additionalProperties: true,
          },
          creationTimestamp: {
            type: "string",
          },
          fingerprint: {
            type: "string",
          },
          shortName: {
            type: "string",
          },
          id: {
            type: "string",
          },
          userDefinedFields: {
            type: "array",
            items: {
              type: "object",
              properties: {
                offset: {
                  type: "object",
                  additionalProperties: true,
                },
                mask: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                size: {
                  type: "object",
                  additionalProperties: true,
                },
                base: {
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

export default organizationSecurityPoliciesGet;
