import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const securityPoliciesPatchRule: AppBlock = {
  name: "Security Policies - Patch Rule",
  description: `Patches a rule at the specified priority.`,
  category: "Security Policies",
  inputs: {
    default: {
      config: {
        securityPolicy: {
          name: "SecurityPolicy",
          description: "Name of the security policy to update.",
          type: "string",
          required: true,
        },
        validateOnly: {
          name: "ValidateOnly",
          description: "If true, the request will not be committed.",
          type: "boolean",
          required: false,
        },
        updateMask: {
          name: "UpdateMask",
          description:
            "Indicates fields to be cleared as part of this request.",
          type: "string",
          required: false,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        priority: {
          name: "Priority",
          description: "The priority of the rule to patch.",
          type: "number",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Represents a rule that describes one or more match conditions along with\nthe action to be taken when traffic matches this condition (allow or deny).",
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
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        const path = `projects/{project}/global/securityPolicies/{securityPolicy}/patchRule`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
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

export default securityPoliciesPatchRule;
