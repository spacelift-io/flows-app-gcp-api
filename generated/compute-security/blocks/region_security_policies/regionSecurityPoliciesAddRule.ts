import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const regionSecurityPoliciesAddRule: AppBlock = {
  name: "Region Security Policies - Add Rule",
  description: `Inserts a rule into a security policy.`,
  category: "Region Security Policies",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description: "Name of the region scoping this request.",
          type: "string",
          required: true,
        },
        securityPolicy: {
          name: "Security Policy",
          description: "Name of the security policy to update.",
          type: "string",
          required: true,
        },
        validateOnly: {
          name: "Validate Only",
          description: "If true, the request will not be committed.",
          type: "boolean",
          required: false,
        },
        preconfiguredWafConfig: {
          name: "Preconfigured Waf Config",
          description:
            "Preconfigured WAF configuration to be applied for the rule.",
          type: {
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
          required: false,
        },
        networkMatch: {
          name: "Network Match",
          description:
            "A match condition that incoming packets are evaluated against for CLOUD_ARMOR_NETWORK security policies.",
          type: {
            type: "object",
            properties: {
              destIpRanges: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              srcAsns: {
                type: "array",
                items: {
                  type: "number",
                },
              },
              srcIpRanges: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              ipProtocols: {
                type: "array",
                items: {
                  type: "string",
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
                  type: "string",
                },
              },
              srcPorts: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              srcRegionCodes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output only] Type of the resource.",
          type: "string",
          required: false,
        },
        rateLimitOptions: {
          name: "Rate Limit Options",
          description:
            'Must be specified if the action is "rate_based_ban" or "throttle" or "fairshare".',
          type: {
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
                properties: {
                  type: {
                    type: "object",
                    additionalProperties: true,
                  },
                  target: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              banThreshold: {
                type: "object",
                properties: {
                  intervalSec: {
                    type: "object",
                    additionalProperties: true,
                  },
                  count: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              rateLimitThreshold: {
                type: "object",
                properties: {
                  intervalSec: {
                    type: "object",
                    additionalProperties: true,
                  },
                  count: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        redirectOptions: {
          name: "Redirect Options",
          description: "Parameters defining the redirect action.",
          type: {
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
          required: false,
        },
        action: {
          name: "Action",
          description: "The Action to perform when the rule is matched.",
          type: "string",
          required: false,
        },
        headerAction: {
          name: "Header Action",
          description:
            "Optional, additional actions that are performed on headers.",
          type: {
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
          required: false,
        },
        preview: {
          name: "Preview",
          description: "If set to true, the specified action is not enforced.",
          type: "boolean",
          required: false,
        },
        match: {
          name: "Match",
          description:
            "A match condition that incoming traffic is evaluated against.",
          type: {
            type: "object",
            properties: {
              versionedExpr: {
                type: "string",
                enum: ["SRC_IPS_V1"],
              },
              config: {
                type: "object",
                properties: {
                  srcIpRanges: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              exprOptions: {
                type: "object",
                properties: {
                  recaptchaOptions: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              expr: {
                type: "object",
                properties: {
                  title: {
                    type: "object",
                    additionalProperties: true,
                  },
                  expression: {
                    type: "object",
                    additionalProperties: true,
                  },
                  location: {
                    type: "object",
                    additionalProperties: true,
                  },
                  description: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        priority: {
          name: "Priority",
          description:
            "An integer indicating the priority of a rule in the list.",
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
        let path = `projects/{project}/regions/{region}/securityPolicies/{securityPolicy}/addRule`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.preconfiguredWafConfig !== undefined)
          requestBody.preconfiguredWafConfig =
            input.event.inputConfig.preconfiguredWafConfig;
        if (input.event.inputConfig.networkMatch !== undefined)
          requestBody.networkMatch = input.event.inputConfig.networkMatch;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.rateLimitOptions !== undefined)
          requestBody.rateLimitOptions =
            input.event.inputConfig.rateLimitOptions;
        if (input.event.inputConfig.redirectOptions !== undefined)
          requestBody.redirectOptions = input.event.inputConfig.redirectOptions;
        if (input.event.inputConfig.action !== undefined)
          requestBody.action = input.event.inputConfig.action;
        if (input.event.inputConfig.headerAction !== undefined)
          requestBody.headerAction = input.event.inputConfig.headerAction;
        if (input.event.inputConfig.preview !== undefined)
          requestBody.preview = input.event.inputConfig.preview;
        if (input.event.inputConfig.match !== undefined)
          requestBody.match = input.event.inputConfig.match;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.priority !== undefined)
          requestBody.priority = input.event.inputConfig.priority;

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
          targetId: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          httpErrorMessage: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          setCommonInstanceMetadataOperationMetadata: {
            type: "object",
            properties: {
              perLocationOperations: {
                type: "object",
                additionalProperties: true,
              },
              clientOperationId: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          id: {
            type: "string",
          },
          region: {
            type: "string",
          },
          startTime: {
            type: "string",
          },
          zone: {
            type: "string",
          },
          statusMessage: {
            type: "string",
          },
          user: {
            type: "string",
          },
          warnings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                code: {
                  type: "string",
                  enum: [
                    "CLEANUP_FAILED",
                    "DEPRECATED_RESOURCE_USED",
                    "DEPRECATED_TYPE_USED",
                    "DISK_SIZE_LARGER_THAN_IMAGE_SIZE",
                    "EXPERIMENTAL_TYPE_USED",
                    "EXTERNAL_API_WARNING",
                    "FIELD_VALUE_OVERRIDEN",
                    "INJECTED_KERNELS_DEPRECATED",
                    "INVALID_HEALTH_CHECK_FOR_DYNAMIC_WIEGHTED_LB",
                    "LARGE_DEPLOYMENT_WARNING",
                    "LIST_OVERHEAD_QUOTA_EXCEED",
                    "MISSING_TYPE_DEPENDENCY",
                    "NEXT_HOP_ADDRESS_NOT_ASSIGNED",
                    "NEXT_HOP_CANNOT_IP_FORWARD",
                    "NEXT_HOP_INSTANCE_HAS_NO_IPV6_INTERFACE",
                    "NEXT_HOP_INSTANCE_NOT_FOUND",
                    "NEXT_HOP_INSTANCE_NOT_ON_NETWORK",
                    "NEXT_HOP_NOT_RUNNING",
                    "NOT_CRITICAL_ERROR",
                    "NO_RESULTS_ON_PAGE",
                    "PARTIAL_SUCCESS",
                    "QUOTA_INFO_UNAVAILABLE",
                    "REQUIRED_TOS_AGREEMENT",
                    "RESOURCE_IN_USE_BY_OTHER_RESOURCE_WARNING",
                    "RESOURCE_NOT_DELETED",
                    "SCHEMA_VALIDATION_IGNORED",
                    "SINGLE_INSTANCE_PROPERTY_TEMPLATE",
                    "UNDECLARED_PROPERTIES",
                    "UNREACHABLE",
                  ],
                },
              },
              additionalProperties: true,
            },
          },
          operationType: {
            type: "string",
          },
          targetLink: {
            type: "string",
          },
          instancesBulkInsertOperationMetadata: {
            type: "object",
            properties: {
              perLocationStatus: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          error: {
            type: "object",
            properties: {
              errors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: {
                      type: "object",
                      additionalProperties: true,
                    },
                    message: {
                      type: "object",
                      additionalProperties: true,
                    },
                    errorDetails: {
                      type: "object",
                      additionalProperties: true,
                    },
                    location: {
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
          endTime: {
            type: "string",
          },
          httpErrorStatusCode: {
            type: "number",
          },
          operationGroupId: {
            type: "string",
          },
          description: {
            type: "string",
          },
          name: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          clientOperationId: {
            type: "string",
          },
          insertTime: {
            type: "string",
          },
          status: {
            type: "string",
            enum: ["DONE", "PENDING", "RUNNING"],
          },
          progress: {
            type: "number",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default regionSecurityPoliciesAddRule;
