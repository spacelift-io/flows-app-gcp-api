import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const regionNetworkFirewallPoliciesInsert: AppBlock = {
  name: "Region Network Firewall Policies - Insert",
  description: `Creates a new network firewall policy in the specified project and region.`,
  category: "Region Network Firewall Policies",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description:
            "[Output Only] URL of the region where the regional firewall policy resides.",
          type: "string",
          required: false,
        },
        requestId: {
          name: "Request ID",
          description:
            "An optional request ID to identify requests. Specify a unique request ID\nso that if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output only] Type of the resource.",
          type: "string",
          required: false,
        },
        ruleTupleCount: {
          name: "Rule Tuple Count",
          description:
            "[Output Only] Total count of all firewall policy rule tuples.",
          type: "number",
          required: false,
        },
        parent: {
          name: "Parent",
          description: "[Output Only] The parent of the firewall policy.",
          type: "string",
          required: false,
        },
        associations: {
          name: "Associations",
          description:
            "A list of associations that belong to this firewall policy.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                displayName: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                firewallPolicyId: {
                  type: "string",
                },
                shortName: {
                  type: "string",
                },
                attachmentTarget: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        policyType: {
          name: "Policy Type",
          description: "The type of the firewall policy.",
          type: "string",
          required: false,
        },
        fingerprint: {
          name: "Fingerprint",
          description:
            "Specifies a fingerprint for this resource, which is essentially a hash of the metadata's contents and used for optimistic locking.",
          type: "string",
          required: false,
        },
        rules: {
          name: "Rules",
          description: "A list of rules that belong to this policy.",
          type: {
            type: "array",
            items: {
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
                    type: "object",
                    additionalProperties: true,
                  },
                },
                match: {
                  type: "object",
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
                    additionalProperties: true,
                  },
                },
                targetResources: {
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
          required: false,
        },
        packetMirroringRules: {
          name: "Packet Mirroring Rules",
          description:
            "A list of packet mirroring rules that belong to this policy.",
          type: {
            type: "array",
            items: {
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
                    type: "object",
                    additionalProperties: true,
                  },
                },
                match: {
                  type: "object",
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
                    additionalProperties: true,
                  },
                },
                targetResources: {
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
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        selfLinkWithId: {
          name: "Self Link With ID",
          description:
            "[Output Only] Server-defined URL for this resource with the resource id.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for the resource.",
          type: "string",
          required: false,
        },
        shortName: {
          name: "Short Name",
          description:
            "User-provided name of the Organization firewall policy.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "Name of the resource.",
          type: "string",
          required: false,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] Creation timestamp inRFC3339 text format.",
          type: "string",
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
        let path = `projects/{project}/regions/{region}/firewallPolicies`;

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

        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.ruleTupleCount !== undefined)
          requestBody.ruleTupleCount = input.event.inputConfig.ruleTupleCount;
        if (input.event.inputConfig.parent !== undefined)
          requestBody.parent = input.event.inputConfig.parent;
        if (input.event.inputConfig.associations !== undefined)
          requestBody.associations = input.event.inputConfig.associations;
        if (input.event.inputConfig.policyType !== undefined)
          requestBody.policyType = input.event.inputConfig.policyType;
        if (input.event.inputConfig.fingerprint !== undefined)
          requestBody.fingerprint = input.event.inputConfig.fingerprint;
        if (input.event.inputConfig.rules !== undefined)
          requestBody.rules = input.event.inputConfig.rules;
        if (input.event.inputConfig.packetMirroringRules !== undefined)
          requestBody.packetMirroringRules =
            input.event.inputConfig.packetMirroringRules;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.selfLinkWithId !== undefined)
          requestBody.selfLinkWithId = input.event.inputConfig.selfLinkWithId;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.shortName !== undefined)
          requestBody.shortName = input.event.inputConfig.shortName;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;

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

export default regionNetworkFirewallPoliciesInsert;
