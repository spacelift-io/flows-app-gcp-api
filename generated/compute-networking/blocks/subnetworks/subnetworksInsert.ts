import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const subnetworksInsert: AppBlock = {
  name: "Subnetworks - Insert",
  description: `Creates a subnetwork in the specified project using the data included in the request.`,
  category: "Subnetworks",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description: "URL of the region where the Subnetwork resides.",
          type: "string",
          required: false,
        },
        requestId: {
          name: "Request ID",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        fingerprint: {
          name: "Fingerprint",
          description: "Fingerprint of this resource.",
          type: "string",
          required: false,
        },
        gatewayAddress: {
          name: "Gateway Address",
          description:
            "[Output Only] The gateway address for default routes to reach destination addresses outside this subnetwork.",
          type: "string",
          required: false,
        },
        secondaryIpRanges: {
          name: "Secondary IP Ranges",
          description:
            "An array of configurations for secondary IP ranges for VM instances contained in this subnetwork.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                rangeName: {
                  type: "string",
                },
                reservedInternalRange: {
                  type: "string",
                },
                ipCidrRange: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        reservedInternalRange: {
          name: "Reserved Internal Range",
          description: "The URL of the reserved internal range.",
          type: "string",
          required: false,
        },
        ipv6GceEndpoint: {
          name: "Ipv6 Gce Endpoint",
          description: "[Output Only] Possible endpoints of this subnetwork.",
          type: "string",
          required: false,
        },
        systemReservedInternalIpv6Ranges: {
          name: "System Reserved Internal Ipv6 Ranges",
          description: "Output only.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        purpose: {
          name: "Purpose",
          description: "Request body field: purpose",
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
        state: {
          name: "State",
          description:
            "[Output Only] The state of the subnetwork, which can be one of the following values:READY: Subnetwork is created and ready to useDRAINING: only applicable to subnetworks that have the purpose set to INTERNAL_HTTPS_LOAD_BALANCER and indicates that connections to the load balancer are being drained.",
          type: "string",
          required: false,
        },
        internalIpv6Prefix: {
          name: "Internal Ipv6 Prefix",
          description:
            "The internal IPv6 address range that is owned by this subnetwork.",
          type: "string",
          required: false,
        },
        privateIpGoogleAccess: {
          name: "Private IP Google Access",
          description:
            "Whether the VMs in this subnet can access Google services without assigned external IP addresses.",
          type: "boolean",
          required: false,
        },
        ipv6CidrRange: {
          name: "Ipv6 Cidr Range",
          description: "[Output Only] This field is for internal use.",
          type: "string",
          required: false,
        },
        network: {
          name: "Network",
          description:
            "The URL of the network to which this subnetwork belongs, provided by the client when initially creating the subnetwork.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for the resource.",
          type: "string",
          required: false,
        },
        utilizationDetails: {
          name: "Utilization Details",
          description: "Output only.",
          type: {
            type: "object",
            properties: {
              externalIpv6LbUtilization: {
                type: "object",
                properties: {
                  totalFreeIp: {
                    type: "object",
                    additionalProperties: true,
                  },
                  totalAllocatedIp: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              externalIpv6InstanceUtilization: {
                type: "object",
                properties: {
                  totalFreeIp: {
                    type: "object",
                    additionalProperties: true,
                  },
                  totalAllocatedIp: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              internalIpv6Utilization: {
                type: "object",
                properties: {
                  totalFreeIp: {
                    type: "object",
                    additionalProperties: true,
                  },
                  totalAllocatedIp: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              ipv4Utilizations: {
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
        externalIpv6Prefix: {
          name: "External Ipv6 Prefix",
          description:
            "The external IPv6 address range that is owned by this subnetwork.",
          type: "string",
          required: false,
        },
        stackType: {
          name: "Stack Type",
          description: "The stack type for the subnet.",
          type: "string",
          required: false,
        },
        systemReservedExternalIpv6Ranges: {
          name: "System Reserved External Ipv6 Ranges",
          description: "Output only.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        privateIpv6GoogleAccess: {
          name: "Private Ipv6 Google Access",
          description: "This field is for internal use.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        ipCidrRange: {
          name: "IP Cidr Range",
          description:
            "The range of internal addresses that are owned by this subnetwork.",
          type: "string",
          required: false,
        },
        logConfig: {
          name: "Log Config",
          description:
            "This field denotes the VPC flow logging options for this subnetwork.",
          type: {
            type: "object",
            properties: {
              flowSampling: {
                type: "number",
              },
              metadataFields: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              metadata: {
                type: "string",
                enum: [
                  "CUSTOM_METADATA",
                  "EXCLUDE_ALL_METADATA",
                  "INCLUDE_ALL_METADATA",
                ],
              },
              aggregationInterval: {
                type: "string",
                enum: [
                  "INTERVAL_10_MIN",
                  "INTERVAL_15_MIN",
                  "INTERVAL_1_MIN",
                  "INTERVAL_30_SEC",
                  "INTERVAL_5_MIN",
                  "INTERVAL_5_SEC",
                ],
              },
              enable: {
                type: "boolean",
              },
              filterExpr: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        ipv6AccessType: {
          name: "Ipv6 Access Type",
          description: "The access type of IPv6 address this subnet holds.",
          type: "string",
          required: false,
        },
        role: {
          name: "Role",
          description: "The role of subnetwork.",
          type: "string",
          required: false,
        },
        enableFlowLogs: {
          name: "Enable Flow Logs",
          description: "Whether to enable flow logging for this subnetwork.",
          type: "boolean",
          required: false,
        },
        ipCollection: {
          name: "IP Collection",
          description:
            "Reference to the source of IP, like a PublicDelegatedPrefix (PDP) for BYOIP.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description:
            "The name of the resource, provided by the client when initially creating the resource.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of the resource.",
          type: "string",
          required: false,
        },
        params: {
          name: "Params",
          description: "Input only.",
          type: {
            type: "object",
            properties: {
              resourceManagerTags: {
                type: "object",
                additionalProperties: true,
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
        let path = `projects/{project}/regions/{region}/subnetworks`;

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

        if (input.event.inputConfig.fingerprint !== undefined)
          requestBody.fingerprint = input.event.inputConfig.fingerprint;
        if (input.event.inputConfig.gatewayAddress !== undefined)
          requestBody.gatewayAddress = input.event.inputConfig.gatewayAddress;
        if (input.event.inputConfig.secondaryIpRanges !== undefined)
          requestBody.secondaryIpRanges =
            input.event.inputConfig.secondaryIpRanges;
        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (input.event.inputConfig.reservedInternalRange !== undefined)
          requestBody.reservedInternalRange =
            input.event.inputConfig.reservedInternalRange;
        if (input.event.inputConfig.ipv6GceEndpoint !== undefined)
          requestBody.ipv6GceEndpoint = input.event.inputConfig.ipv6GceEndpoint;
        if (
          input.event.inputConfig.systemReservedInternalIpv6Ranges !== undefined
        )
          requestBody.systemReservedInternalIpv6Ranges =
            input.event.inputConfig.systemReservedInternalIpv6Ranges;
        if (input.event.inputConfig.purpose !== undefined)
          requestBody.purpose = input.event.inputConfig.purpose;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.state !== undefined)
          requestBody.state = input.event.inputConfig.state;
        if (input.event.inputConfig.internalIpv6Prefix !== undefined)
          requestBody.internalIpv6Prefix =
            input.event.inputConfig.internalIpv6Prefix;
        if (input.event.inputConfig.privateIpGoogleAccess !== undefined)
          requestBody.privateIpGoogleAccess =
            input.event.inputConfig.privateIpGoogleAccess;
        if (input.event.inputConfig.ipv6CidrRange !== undefined)
          requestBody.ipv6CidrRange = input.event.inputConfig.ipv6CidrRange;
        if (input.event.inputConfig.network !== undefined)
          requestBody.network = input.event.inputConfig.network;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.utilizationDetails !== undefined)
          requestBody.utilizationDetails =
            input.event.inputConfig.utilizationDetails;
        if (input.event.inputConfig.externalIpv6Prefix !== undefined)
          requestBody.externalIpv6Prefix =
            input.event.inputConfig.externalIpv6Prefix;
        if (input.event.inputConfig.stackType !== undefined)
          requestBody.stackType = input.event.inputConfig.stackType;
        if (
          input.event.inputConfig.systemReservedExternalIpv6Ranges !== undefined
        )
          requestBody.systemReservedExternalIpv6Ranges =
            input.event.inputConfig.systemReservedExternalIpv6Ranges;
        if (input.event.inputConfig.privateIpv6GoogleAccess !== undefined)
          requestBody.privateIpv6GoogleAccess =
            input.event.inputConfig.privateIpv6GoogleAccess;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.ipCidrRange !== undefined)
          requestBody.ipCidrRange = input.event.inputConfig.ipCidrRange;
        if (input.event.inputConfig.logConfig !== undefined)
          requestBody.logConfig = input.event.inputConfig.logConfig;
        if (input.event.inputConfig.ipv6AccessType !== undefined)
          requestBody.ipv6AccessType = input.event.inputConfig.ipv6AccessType;
        if (input.event.inputConfig.role !== undefined)
          requestBody.role = input.event.inputConfig.role;
        if (input.event.inputConfig.enableFlowLogs !== undefined)
          requestBody.enableFlowLogs = input.event.inputConfig.enableFlowLogs;
        if (input.event.inputConfig.ipCollection !== undefined)
          requestBody.ipCollection = input.event.inputConfig.ipCollection;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.params !== undefined)
          requestBody.params = input.event.inputConfig.params;

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

export default subnetworksInsert;
