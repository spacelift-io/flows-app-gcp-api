import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const networksPatch: AppBlock = {
  name: "Networks - Patch",
  description: `Patches the specified network with the data included in the request.`,
  category: "Networks",
  inputs: {
    default: {
      config: {
        network: {
          name: "Network",
          description: "Name of the network to update.",
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
        internalIpv6Range: {
          name: "Internal Ipv6 Range",
          description:
            "When enabling ula internal ipv6, caller optionally can specify the /48 range they want from the google defined ULA prefix fd20::/20.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of the resource.",
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
        autoCreateSubnetworks: {
          name: "Auto Create Subnetworks",
          description: "Must be set to create a VPC network.",
          type: "boolean",
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
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] Creation timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for the resource.",
          type: "string",
          required: false,
        },
        mtu: {
          name: "Mtu",
          description: "Maximum Transmission Unit in bytes.",
          type: "number",
          required: false,
        },
        subnetworks: {
          name: "Subnetworks",
          description:
            "[Output Only] Server-defined fully-qualified URLs for all subnetworks in this VPC network.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        networkFirewallPolicyEnforcementOrder: {
          name: "Network Firewall Policy Enforcement Order",
          description: "The network firewall policy enforcement order.",
          type: "string",
          required: false,
        },
        gatewayIPv4: {
          name: "Gateway I Pv4",
          description:
            "[Output Only] The gateway address for default routing out of the network, selected by Google Cloud.",
          type: "string",
          required: false,
        },
        peerings: {
          name: "Peerings",
          description:
            "[Output Only] A list of network peerings for the resource.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                updateStrategy: {
                  type: "string",
                  enum: ["CONSENSUS", "INDEPENDENT", "UNSPECIFIED"],
                },
                state: {
                  type: "string",
                  enum: ["ACTIVE", "INACTIVE"],
                },
                name: {
                  type: "string",
                },
                network: {
                  type: "string",
                },
                exportCustomRoutes: {
                  type: "boolean",
                },
                autoCreateRoutes: {
                  type: "boolean",
                },
                importSubnetRoutesWithPublicIp: {
                  type: "boolean",
                },
                importCustomRoutes: {
                  type: "boolean",
                },
                connectionStatus: {
                  type: "object",
                  additionalProperties: true,
                },
                stackType: {
                  type: "string",
                  enum: ["IPV4_IPV6", "IPV4_ONLY"],
                },
                stateDetails: {
                  type: "string",
                },
                exchangeSubnetRoutes: {
                  type: "boolean",
                },
                exportSubnetRoutesWithPublicIp: {
                  type: "boolean",
                },
                peerMtu: {
                  type: "number",
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
        firewallPolicy: {
          name: "Firewall Policy",
          description:
            "[Output Only] URL of the firewall policy the network is associated with.",
          type: "string",
          required: false,
        },
        routingConfig: {
          name: "Routing Config",
          description:
            "The network-level routing configuration for this network.",
          type: {
            type: "object",
            properties: {
              bgpBestPathSelectionMode: {
                type: "string",
                enum: ["LEGACY", "STANDARD"],
              },
              bgpInterRegionCost: {
                type: "string",
                enum: ["ADD_COST_TO_MED", "DEFAULT"],
              },
              effectiveBgpAlwaysCompareMed: {
                type: "boolean",
              },
              effectiveBgpInterRegionCost: {
                type: "string",
                enum: ["ADD_COST_TO_MED", "DEFAULT"],
              },
              routingMode: {
                type: "string",
                enum: ["GLOBAL", "REGIONAL"],
              },
              bgpAlwaysCompareMed: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        networkProfile: {
          name: "Network Profile",
          description:
            "A full or partial URL of the network profile to apply to this network.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "Name of the resource.",
          type: "string",
          required: false,
        },
        enableUlaInternalIpv6: {
          name: "Enable Ula Internal Ipv6",
          description: "Enable ULA internal ipv6 on this network.",
          type: "boolean",
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
        let path = `projects/{project}/global/networks/{network}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.internalIpv6Range !== undefined)
          requestBody.internalIpv6Range =
            input.event.inputConfig.internalIpv6Range;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.selfLinkWithId !== undefined)
          requestBody.selfLinkWithId = input.event.inputConfig.selfLinkWithId;
        if (input.event.inputConfig.autoCreateSubnetworks !== undefined)
          requestBody.autoCreateSubnetworks =
            input.event.inputConfig.autoCreateSubnetworks;
        if (input.event.inputConfig.params !== undefined)
          requestBody.params = input.event.inputConfig.params;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.mtu !== undefined)
          requestBody.mtu = input.event.inputConfig.mtu;
        if (input.event.inputConfig.subnetworks !== undefined)
          requestBody.subnetworks = input.event.inputConfig.subnetworks;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (
          input.event.inputConfig.networkFirewallPolicyEnforcementOrder !==
          undefined
        )
          requestBody.networkFirewallPolicyEnforcementOrder =
            input.event.inputConfig.networkFirewallPolicyEnforcementOrder;
        if (input.event.inputConfig.gatewayIPv4 !== undefined)
          requestBody.gatewayIPv4 = input.event.inputConfig.gatewayIPv4;
        if (input.event.inputConfig.peerings !== undefined)
          requestBody.peerings = input.event.inputConfig.peerings;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.firewallPolicy !== undefined)
          requestBody.firewallPolicy = input.event.inputConfig.firewallPolicy;
        if (input.event.inputConfig.routingConfig !== undefined)
          requestBody.routingConfig = input.event.inputConfig.routingConfig;
        if (input.event.inputConfig.networkProfile !== undefined)
          requestBody.networkProfile = input.event.inputConfig.networkProfile;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.enableUlaInternalIpv6 !== undefined)
          requestBody.enableUlaInternalIpv6 =
            input.event.inputConfig.enableUlaInternalIpv6;

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

export default networksPatch;
