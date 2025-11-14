import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const routersUpdate: AppBlock = {
  name: "Routers - Update",
  description: `Updates the specified Router resource with the data included in the request.`,
  category: "Routers",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description: "Name of the region for this request.",
          type: "string",
          required: true,
        },
        router: {
          name: "Router",
          description: "Name of the Router resource to update.",
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
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Represents a Cloud Router resource.\n\nFor more information about Cloud Router, read theCloud\nRouter overview.",
          type: {
            type: "object",
            properties: {
              creationTimestamp: {
                type: "string",
              },
              encryptedInterconnectRouter: {
                type: "boolean",
              },
              description: {
                type: "string",
              },
              region: {
                type: "string",
              },
              nats: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    natIpAllocateOption: {
                      type: "object",
                      additionalProperties: true,
                    },
                    tcpTimeWaitTimeoutSec: {
                      type: "object",
                      additionalProperties: true,
                    },
                    type: {
                      type: "object",
                      additionalProperties: true,
                    },
                    autoNetworkTier: {
                      type: "object",
                      additionalProperties: true,
                    },
                    tcpEstablishedIdleTimeoutSec: {
                      type: "object",
                      additionalProperties: true,
                    },
                    sourceSubnetworkIpRangesToNat64: {
                      type: "object",
                      additionalProperties: true,
                    },
                    minPortsPerVm: {
                      type: "object",
                      additionalProperties: true,
                    },
                    subnetworks: {
                      type: "object",
                      additionalProperties: true,
                    },
                    icmpIdleTimeoutSec: {
                      type: "object",
                      additionalProperties: true,
                    },
                    enableEndpointIndependentMapping: {
                      type: "object",
                      additionalProperties: true,
                    },
                    nat64Subnetworks: {
                      type: "object",
                      additionalProperties: true,
                    },
                    tcpTransitoryIdleTimeoutSec: {
                      type: "object",
                      additionalProperties: true,
                    },
                    maxPortsPerVm: {
                      type: "object",
                      additionalProperties: true,
                    },
                    sourceSubnetworkIpRangesToNat: {
                      type: "object",
                      additionalProperties: true,
                    },
                    drainNatIps: {
                      type: "object",
                      additionalProperties: true,
                    },
                    endpointTypes: {
                      type: "object",
                      additionalProperties: true,
                    },
                    enableDynamicPortAllocation: {
                      type: "object",
                      additionalProperties: true,
                    },
                    rules: {
                      type: "object",
                      additionalProperties: true,
                    },
                    logConfig: {
                      type: "object",
                      additionalProperties: true,
                    },
                    name: {
                      type: "object",
                      additionalProperties: true,
                    },
                    udpIdleTimeoutSec: {
                      type: "object",
                      additionalProperties: true,
                    },
                    natIps: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              kind: {
                type: "string",
              },
              bgp: {
                type: "object",
                properties: {
                  advertiseMode: {
                    type: "string",
                    enum: ["CUSTOM", "DEFAULT"],
                  },
                  advertisedIpRanges: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  asn: {
                    type: "number",
                  },
                  keepaliveInterval: {
                    type: "number",
                  },
                  advertisedGroups: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  identifierRange: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              interfaces: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    privateIpAddress: {
                      type: "object",
                      additionalProperties: true,
                    },
                    linkedInterconnectAttachment: {
                      type: "object",
                      additionalProperties: true,
                    },
                    subnetwork: {
                      type: "object",
                      additionalProperties: true,
                    },
                    redundantInterface: {
                      type: "object",
                      additionalProperties: true,
                    },
                    managementType: {
                      type: "object",
                      additionalProperties: true,
                    },
                    ipRange: {
                      type: "object",
                      additionalProperties: true,
                    },
                    linkedVpnTunnel: {
                      type: "object",
                      additionalProperties: true,
                    },
                    ipVersion: {
                      type: "object",
                      additionalProperties: true,
                    },
                    name: {
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
              network: {
                type: "string",
              },
              name: {
                type: "string",
              },
              bgpPeers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    ipv4NexthopAddress: {
                      type: "object",
                      additionalProperties: true,
                    },
                    enableIpv4: {
                      type: "object",
                      additionalProperties: true,
                    },
                    peerIpv6NexthopAddress: {
                      type: "object",
                      additionalProperties: true,
                    },
                    peerAsn: {
                      type: "object",
                      additionalProperties: true,
                    },
                    md5AuthenticationKeyName: {
                      type: "object",
                      additionalProperties: true,
                    },
                    peerIpv4NexthopAddress: {
                      type: "object",
                      additionalProperties: true,
                    },
                    exportPolicies: {
                      type: "object",
                      additionalProperties: true,
                    },
                    ipAddress: {
                      type: "object",
                      additionalProperties: true,
                    },
                    routerApplianceInstance: {
                      type: "object",
                      additionalProperties: true,
                    },
                    customLearnedRoutePriority: {
                      type: "object",
                      additionalProperties: true,
                    },
                    advertiseMode: {
                      type: "object",
                      additionalProperties: true,
                    },
                    advertisedGroups: {
                      type: "object",
                      additionalProperties: true,
                    },
                    ipv6NexthopAddress: {
                      type: "object",
                      additionalProperties: true,
                    },
                    name: {
                      type: "object",
                      additionalProperties: true,
                    },
                    peerIpAddress: {
                      type: "object",
                      additionalProperties: true,
                    },
                    bfd: {
                      type: "object",
                      additionalProperties: true,
                    },
                    enable: {
                      type: "object",
                      additionalProperties: true,
                    },
                    advertisedIpRanges: {
                      type: "object",
                      additionalProperties: true,
                    },
                    customLearnedIpRanges: {
                      type: "object",
                      additionalProperties: true,
                    },
                    advertisedRoutePriority: {
                      type: "object",
                      additionalProperties: true,
                    },
                    importPolicies: {
                      type: "object",
                      additionalProperties: true,
                    },
                    managementType: {
                      type: "object",
                      additionalProperties: true,
                    },
                    enableIpv6: {
                      type: "object",
                      additionalProperties: true,
                    },
                    interfaceName: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              params: {
                type: "object",
                properties: {
                  resourceManagerTags: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              md5AuthenticationKeys: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "object",
                      additionalProperties: true,
                    },
                    key: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              selfLink: {
                type: "string",
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
        const path = `projects/{project}/regions/{region}/routers/{router}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PUT",
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

export default routersUpdate;
