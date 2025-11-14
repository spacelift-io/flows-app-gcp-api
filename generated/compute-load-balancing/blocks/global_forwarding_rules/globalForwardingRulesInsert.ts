import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const globalForwardingRulesInsert: AppBlock = {
  name: "Global Forwarding Rules - Insert",
  description: `Creates a GlobalForwardingRule resource in the specified project using the data included in the request.`,
  category: "Global Forwarding Rules",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        requestId: {
          name: "RequestId",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Represents a Forwarding Rule resource.\n\nForwarding rule resources in Google Cloud can be either regional or global in\nscope:\n\n* [Global](https://cloud.google.com/compute/docs/reference/rest/v1/globalForwardingRules)\n* [Regional](https://cloud.google.com/compute/docs/reference/rest/v1/forwardingRules)\n\nA forwarding rule and its corresponding IP address represent the frontend\nconfiguration of a Google Cloud load balancer.\nForwarding rules can also reference target instances and Cloud VPN Classic\ngateways (targetVpnGateway).\n\nFor more information, read\nForwarding rule concepts and\nUsing protocol forwarding.",
          type: {
            type: "object",
            properties: {
              ports: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              target: {
                type: "string",
              },
              region: {
                type: "string",
              },
              externalManagedBackendBucketMigrationTestingPercentage: {
                type: "number",
              },
              allPorts: {
                type: "boolean",
              },
              description: {
                type: "string",
              },
              IPProtocol: {
                type: "string",
                enum: ["AH", "ESP", "ICMP", "L3_DEFAULT", "SCTP", "TCP", "UDP"],
              },
              kind: {
                type: "string",
              },
              network: {
                type: "string",
              },
              labels: {
                type: "object",
                additionalProperties: true,
              },
              serviceLabel: {
                type: "string",
              },
              backendService: {
                type: "string",
              },
              sourceIpRanges: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              serviceDirectoryRegistrations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    namespace: {
                      type: "object",
                      additionalProperties: true,
                    },
                    service: {
                      type: "object",
                      additionalProperties: true,
                    },
                    serviceDirectoryRegion: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              baseForwardingRule: {
                type: "string",
              },
              allowGlobalAccess: {
                type: "boolean",
              },
              noAutomateDnsZone: {
                type: "boolean",
              },
              isMirroringCollector: {
                type: "boolean",
              },
              subnetwork: {
                type: "string",
              },
              pscConnectionStatus: {
                type: "string",
                enum: [
                  "ACCEPTED",
                  "CLOSED",
                  "NEEDS_ATTENTION",
                  "PENDING",
                  "REJECTED",
                  "STATUS_UNSPECIFIED",
                ],
              },
              networkTier: {
                type: "string",
                enum: [
                  "FIXED_STANDARD",
                  "PREMIUM",
                  "STANDARD",
                  "STANDARD_OVERRIDES_FIXED_STANDARD",
                ],
              },
              allowPscGlobalAccess: {
                type: "boolean",
              },
              portRange: {
                type: "string",
              },
              labelFingerprint: {
                type: "string",
              },
              creationTimestamp: {
                type: "string",
              },
              id: {
                type: "string",
              },
              loadBalancingScheme: {
                type: "string",
                enum: [
                  "EXTERNAL",
                  "EXTERNAL_MANAGED",
                  "INTERNAL",
                  "INTERNAL_MANAGED",
                  "INTERNAL_SELF_MANAGED",
                  "INVALID",
                ],
              },
              selfLinkWithId: {
                type: "string",
              },
              IPAddress: {
                type: "string",
              },
              selfLink: {
                type: "string",
              },
              serviceName: {
                type: "string",
              },
              fingerprint: {
                type: "string",
              },
              metadataFilters: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    filterMatchCriteria: {
                      type: "object",
                      additionalProperties: true,
                    },
                    filterLabels: {
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
              ipCollection: {
                type: "string",
              },
              pscConnectionId: {
                type: "string",
              },
              ipVersion: {
                type: "string",
                enum: ["IPV4", "IPV6", "UNSPECIFIED_VERSION"],
              },
              externalManagedBackendBucketMigrationState: {
                type: "string",
                enum: ["PREPARE", "TEST_ALL_TRAFFIC", "TEST_BY_PERCENTAGE"],
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
        const path = `projects/{project}/global/forwardingRules`;
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

export default globalForwardingRulesInsert;
