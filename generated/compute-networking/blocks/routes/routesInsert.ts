import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const routesInsert: AppBlock = {
  name: "Routes - Insert",
  description: `Creates a Route resource in the specified project using the data included in the request.`,
  category: "Routes",
  inputs: {
    default: {
      config: {
        requestId: {
          name: "Request ID",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of this resource.",
          type: "string",
          required: false,
        },
        tags: {
          name: "Tags",
          description: "A list of instance tags to which this route applies.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        nextHopMed: {
          name: "Next Hop Med",
          description:
            "[Output Only] Multi-Exit Discriminator, a BGP route metric that indicates the desirability of a particular route in a network.",
          type: "number",
          required: false,
        },
        routeType: {
          name: "Route Type",
          description:
            "[Output Only] The type of this route, which can be one of the following values: - 'TRANSIT' for a tr...",
          type: "string",
          required: false,
        },
        routeStatus: {
          name: "Route Status",
          description: "[Output only] The status of the route.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        nextHopHub: {
          name: "Next Hop Hub",
          description:
            "[Output Only] The full resource name of the Network Connectivity Center hub that will handle matching packets.",
          type: "string",
          required: false,
        },
        asPaths: {
          name: "As Paths",
          description: "[Output Only] AS path.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                pathSegmentType: {
                  type: "string",
                  enum: [
                    "AS_CONFED_SEQUENCE",
                    "AS_CONFED_SET",
                    "AS_SEQUENCE",
                    "AS_SET",
                  ],
                },
                asLists: {
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
        warnings: {
          name: "Warnings",
          description:
            "[Output Only] If potential misconfigurations are detected for this route, this field will be populated with warning messages.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      value: {
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
                message: {
                  type: "string",
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
          required: false,
        },
        nextHopGateway: {
          name: "Next Hop Gateway",
          description:
            "The URL to a gateway that should handle matching packets.",
          type: "string",
          required: false,
        },
        nextHopIp: {
          name: "Next Hop IP",
          description:
            "The network IP address of an instance that should handle matching packets.",
          type: "string",
          required: false,
        },
        nextHopInterRegionCost: {
          name: "Next Hop Inter Region Cost",
          description:
            "[Output only] Internal fixed region-to-region cost that Google Cloud calculates based on factors such as network performance, distance, and available bandwidth between regions.",
          type: "number",
          required: false,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] Creation timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
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
        nextHopVpnTunnel: {
          name: "Next Hop VPN Tunnel",
          description:
            "The URL to a VpnTunnel that should handle matching packets.",
          type: "string",
          required: false,
        },
        destRange: {
          name: "Dest Range",
          description:
            "The destination range of outgoing packets that this route applies to.",
          type: "string",
          required: false,
        },
        nextHopOrigin: {
          name: "Next Hop Origin",
          description: "[Output Only] Indicates the origin of the route.",
          type: "string",
          required: false,
        },
        network: {
          name: "Network",
          description:
            "Fully-qualified URL of the network that this route applies to.",
          type: "string",
          required: false,
        },
        nextHopNetwork: {
          name: "Next Hop Network",
          description:
            "The URL of the local network if it should handle matching packets.",
          type: "string",
          required: false,
        },
        nextHopInstance: {
          name: "Next Hop Instance",
          description:
            "The URL to an instance that should handle matching packets.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "Name of the resource.",
          type: "string",
          required: false,
        },
        nextHopIlb: {
          name: "Next Hop Ilb",
          description:
            "The URL to a forwarding rule of typeloadBalancingScheme=INTERNAL that should handle matching packets or the IP address of the forwarding Rule.",
          type: "string",
          required: false,
        },
        nextHopPeering: {
          name: "Next Hop Peering",
          description:
            "[Output Only] The network peering name that should handle matching packets, which should conform to RFC1035.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description:
            "[Output Only] Server-defined fully-qualified URL for this resource.",
          type: "string",
          required: false,
        },
        priority: {
          name: "Priority",
          description: "The priority of this route.",
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
        let path = `projects/{project}/global/routes`;

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
        if (input.event.inputConfig.tags !== undefined)
          requestBody.tags = input.event.inputConfig.tags;
        if (input.event.inputConfig.nextHopMed !== undefined)
          requestBody.nextHopMed = input.event.inputConfig.nextHopMed;
        if (input.event.inputConfig.routeType !== undefined)
          requestBody.routeType = input.event.inputConfig.routeType;
        if (input.event.inputConfig.routeStatus !== undefined)
          requestBody.routeStatus = input.event.inputConfig.routeStatus;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.nextHopHub !== undefined)
          requestBody.nextHopHub = input.event.inputConfig.nextHopHub;
        if (input.event.inputConfig.asPaths !== undefined)
          requestBody.asPaths = input.event.inputConfig.asPaths;
        if (input.event.inputConfig.warnings !== undefined)
          requestBody.warnings = input.event.inputConfig.warnings;
        if (input.event.inputConfig.nextHopGateway !== undefined)
          requestBody.nextHopGateway = input.event.inputConfig.nextHopGateway;
        if (input.event.inputConfig.nextHopIp !== undefined)
          requestBody.nextHopIp = input.event.inputConfig.nextHopIp;
        if (input.event.inputConfig.nextHopInterRegionCost !== undefined)
          requestBody.nextHopInterRegionCost =
            input.event.inputConfig.nextHopInterRegionCost;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.params !== undefined)
          requestBody.params = input.event.inputConfig.params;
        if (input.event.inputConfig.nextHopVpnTunnel !== undefined)
          requestBody.nextHopVpnTunnel =
            input.event.inputConfig.nextHopVpnTunnel;
        if (input.event.inputConfig.destRange !== undefined)
          requestBody.destRange = input.event.inputConfig.destRange;
        if (input.event.inputConfig.nextHopOrigin !== undefined)
          requestBody.nextHopOrigin = input.event.inputConfig.nextHopOrigin;
        if (input.event.inputConfig.network !== undefined)
          requestBody.network = input.event.inputConfig.network;
        if (input.event.inputConfig.nextHopNetwork !== undefined)
          requestBody.nextHopNetwork = input.event.inputConfig.nextHopNetwork;
        if (input.event.inputConfig.nextHopInstance !== undefined)
          requestBody.nextHopInstance = input.event.inputConfig.nextHopInstance;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.nextHopIlb !== undefined)
          requestBody.nextHopIlb = input.event.inputConfig.nextHopIlb;
        if (input.event.inputConfig.nextHopPeering !== undefined)
          requestBody.nextHopPeering = input.event.inputConfig.nextHopPeering;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
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

export default routesInsert;
