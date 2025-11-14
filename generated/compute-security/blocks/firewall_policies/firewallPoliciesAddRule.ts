import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const firewallPoliciesAddRule: AppBlock = {
  name: "Firewall Policies - Add Rule",
  description: `Inserts a rule into a firewall policy.`,
  category: "Firewall Policies",
  inputs: {
    default: {
      config: {
        firewallPolicy: {
          name: "Firewall Policy",
          description: "Name of the firewall policy to update.",
          type: "string",
          required: true,
        },
        requestId: {
          name: "Request ID",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        securityProfileGroup: {
          name: "Security Profile Group",
          description:
            "A fully-qualified URL of a SecurityProfile resource instance.",
          type: "string",
          required: false,
        },
        ruleTupleCount: {
          name: "Rule Tuple Count",
          description:
            "[Output Only] Calculation of the complexity of a single firewall policy rule.",
          type: "number",
          required: false,
        },
        disabled: {
          name: "Disabled",
          description: "Denotes whether the firewall policy rule is disabled.",
          type: "boolean",
          required: false,
        },
        tlsInspect: {
          name: "TLS Inspect",
          description:
            "Boolean flag indicating if the traffic should be TLS decrypted.",
          type: "boolean",
          required: false,
        },
        priority: {
          name: "Priority",
          description:
            "An integer indicating the priority of a rule in the list.",
          type: "number",
          required: false,
        },
        action: {
          name: "Action",
          description:
            "The Action to perform when the client connection triggers the rule.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output only] Type of the resource.",
          type: "string",
          required: false,
        },
        targetServiceAccounts: {
          name: "Target Service Accounts",
          description:
            "A list of service accounts indicating the sets of instances that are applied with this rule.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        match: {
          name: "Match",
          description:
            "A match condition that incoming traffic is evaluated against.",
          type: {
            type: "object",
            properties: {
              destIpRanges: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              srcAddressGroups: {
                type: "array",
                items: {
                  type: "string",
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
                  type: "string",
                },
              },
              destRegionCodes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              srcIpRanges: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              destAddressGroups: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              srcFqdns: {
                type: "array",
                items: {
                  type: "string",
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
                  type: "string",
                },
              },
              srcThreatIntelligences: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              srcNetworks: {
                type: "array",
                items: {
                  type: "string",
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
                  type: "string",
                },
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        enableLogging: {
          name: "Enable Logging",
          description:
            "Denotes whether to enable logging for a particular rule.",
          type: "boolean",
          required: false,
        },
        ruleName: {
          name: "Rule Name",
          description: "An optional name for the rule.",
          type: "string",
          required: false,
        },
        direction: {
          name: "Direction",
          description: "The direction in which this rule applies.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description for this resource.",
          type: "string",
          required: false,
        },
        targetSecureTags: {
          name: "Target Secure Tags",
          description:
            "A list of secure tags that controls which instances the firewall rule applies to.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                state: {
                  type: "string",
                  enum: ["EFFECTIVE", "INEFFECTIVE"],
                },
                name: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        targetResources: {
          name: "Target Resources",
          description:
            "A list of network resource URLs to which this rule applies.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
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
        let path = `locations/global/firewallPolicies/{firewallPolicy}/addRule`;

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

        if (input.event.inputConfig.securityProfileGroup !== undefined)
          requestBody.securityProfileGroup =
            input.event.inputConfig.securityProfileGroup;
        if (input.event.inputConfig.ruleTupleCount !== undefined)
          requestBody.ruleTupleCount = input.event.inputConfig.ruleTupleCount;
        if (input.event.inputConfig.disabled !== undefined)
          requestBody.disabled = input.event.inputConfig.disabled;
        if (input.event.inputConfig.tlsInspect !== undefined)
          requestBody.tlsInspect = input.event.inputConfig.tlsInspect;
        if (input.event.inputConfig.priority !== undefined)
          requestBody.priority = input.event.inputConfig.priority;
        if (input.event.inputConfig.action !== undefined)
          requestBody.action = input.event.inputConfig.action;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.targetServiceAccounts !== undefined)
          requestBody.targetServiceAccounts =
            input.event.inputConfig.targetServiceAccounts;
        if (input.event.inputConfig.match !== undefined)
          requestBody.match = input.event.inputConfig.match;
        if (input.event.inputConfig.enableLogging !== undefined)
          requestBody.enableLogging = input.event.inputConfig.enableLogging;
        if (input.event.inputConfig.ruleName !== undefined)
          requestBody.ruleName = input.event.inputConfig.ruleName;
        if (input.event.inputConfig.direction !== undefined)
          requestBody.direction = input.event.inputConfig.direction;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.targetSecureTags !== undefined)
          requestBody.targetSecureTags =
            input.event.inputConfig.targetSecureTags;
        if (input.event.inputConfig.targetResources !== undefined)
          requestBody.targetResources = input.event.inputConfig.targetResources;

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

export default firewallPoliciesAddRule;
