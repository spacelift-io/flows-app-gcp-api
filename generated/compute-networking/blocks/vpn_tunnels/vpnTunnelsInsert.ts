import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const vpnTunnelsInsert: AppBlock = {
  name: "VPN Tunnels - Insert",
  description: `Creates a VpnTunnel resource in the specified project and region using the data included in the request.`,
  category: "VPN Tunnels",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description:
            "[Output Only] URL of the region where the VPN tunnel resides.",
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
        sharedSecretHash: {
          name: "Shared Secret Hash",
          description: "Hash of the shared secret.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of resource.",
          type: "string",
          required: false,
        },
        ikeVersion: {
          name: "Ike Version",
          description:
            "IKE protocol version to use when establishing the VPN tunnel with the peer VPN gateway.",
          type: "number",
          required: false,
        },
        name: {
          name: "Name",
          description: "Name of the resource.",
          type: "string",
          required: false,
        },
        peerIp: {
          name: "Peer IP",
          description: "IP address of the peer VPN gateway.",
          type: "string",
          required: false,
        },
        labelFingerprint: {
          name: "Label Fingerprint",
          description:
            "A fingerprint for the labels being applied to this VpnTunnel, which is essentially a hash of the labels set used for optimistic locking.",
          type: "string",
          required: false,
        },
        router: {
          name: "Router",
          description:
            "URL of the router resource to be used for dynamic routing.",
          type: "string",
          required: false,
        },
        vpnGateway: {
          name: "VPN Gateway",
          description:
            "URL of the VPN gateway with which this VPN tunnel is associated.",
          type: "string",
          required: false,
        },
        peerGcpGateway: {
          name: "Peer GCP Gateway",
          description:
            "URL of the peer side HA VPN gateway to which this VPN tunnel is connected.",
          type: "string",
          required: false,
        },
        cipherSuite: {
          name: "Cipher Suite",
          description:
            "User specified list of ciphers to use for the phase 1 and phase 2 of the IKE protocol.",
          type: {
            type: "object",
            properties: {
              phase2: {
                type: "object",
                properties: {
                  integrity: {
                    type: "object",
                    additionalProperties: true,
                  },
                  encryption: {
                    type: "object",
                    additionalProperties: true,
                  },
                  pfs: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              phase1: {
                type: "object",
                properties: {
                  integrity: {
                    type: "object",
                    additionalProperties: true,
                  },
                  prf: {
                    type: "object",
                    additionalProperties: true,
                  },
                  dh: {
                    type: "object",
                    additionalProperties: true,
                  },
                  encryption: {
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
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
          type: "string",
          required: false,
        },
        remoteTrafficSelector: {
          name: "Remote Traffic Selector",
          description:
            "Remote traffic selectors to use when establishing the VPN tunnel with the peer VPN gateway.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for the resource.",
          type: "string",
          required: false,
        },
        sharedSecret: {
          name: "Shared Secret",
          description:
            "Shared secret used to set the secure session between the Cloud VPN gateway and the peer VPN gateway.",
          type: "string",
          required: false,
        },
        labels: {
          name: "Labels",
          description: "Labels for this resource.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        detailedStatus: {
          name: "Detailed Status",
          description:
            "[Output Only] Detailed status message for the VPN tunnel.",
          type: "string",
          required: false,
        },
        vpnGatewayInterface: {
          name: "VPN Gateway Interface",
          description:
            "The interface ID of the VPN gateway with which this VPN tunnel is associated.",
          type: "number",
          required: false,
        },
        targetVpnGateway: {
          name: "Target VPN Gateway",
          description:
            "URL of the Target VPN gateway with which this VPN tunnel is associated.",
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
        peerExternalGateway: {
          name: "Peer External Gateway",
          description:
            "URL of the peer side external VPN gateway to which this VPN tunnel is connected.",
          type: "string",
          required: false,
        },
        localTrafficSelector: {
          name: "Local Traffic Selector",
          description:
            "Local traffic selector to use when establishing the VPN tunnel with the peer VPN gateway.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        peerExternalGatewayInterface: {
          name: "Peer External Gateway Interface",
          description:
            "The interface ID of the external VPN gateway to which this VPN tunnel is connected.",
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
        let path = `projects/{project}/regions/{region}/vpnTunnels`;

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

        if (input.event.inputConfig.sharedSecretHash !== undefined)
          requestBody.sharedSecretHash =
            input.event.inputConfig.sharedSecretHash;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.ikeVersion !== undefined)
          requestBody.ikeVersion = input.event.inputConfig.ikeVersion;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.peerIp !== undefined)
          requestBody.peerIp = input.event.inputConfig.peerIp;
        if (input.event.inputConfig.labelFingerprint !== undefined)
          requestBody.labelFingerprint =
            input.event.inputConfig.labelFingerprint;
        if (input.event.inputConfig.router !== undefined)
          requestBody.router = input.event.inputConfig.router;
        if (input.event.inputConfig.vpnGateway !== undefined)
          requestBody.vpnGateway = input.event.inputConfig.vpnGateway;
        if (input.event.inputConfig.peerGcpGateway !== undefined)
          requestBody.peerGcpGateway = input.event.inputConfig.peerGcpGateway;
        if (input.event.inputConfig.cipherSuite !== undefined)
          requestBody.cipherSuite = input.event.inputConfig.cipherSuite;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.remoteTrafficSelector !== undefined)
          requestBody.remoteTrafficSelector =
            input.event.inputConfig.remoteTrafficSelector;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.sharedSecret !== undefined)
          requestBody.sharedSecret = input.event.inputConfig.sharedSecret;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.detailedStatus !== undefined)
          requestBody.detailedStatus = input.event.inputConfig.detailedStatus;
        if (input.event.inputConfig.vpnGatewayInterface !== undefined)
          requestBody.vpnGatewayInterface =
            input.event.inputConfig.vpnGatewayInterface;
        if (input.event.inputConfig.targetVpnGateway !== undefined)
          requestBody.targetVpnGateway =
            input.event.inputConfig.targetVpnGateway;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.peerExternalGateway !== undefined)
          requestBody.peerExternalGateway =
            input.event.inputConfig.peerExternalGateway;
        if (input.event.inputConfig.localTrafficSelector !== undefined)
          requestBody.localTrafficSelector =
            input.event.inputConfig.localTrafficSelector;
        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (input.event.inputConfig.peerExternalGatewayInterface !== undefined)
          requestBody.peerExternalGatewayInterface =
            input.event.inputConfig.peerExternalGatewayInterface;

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

export default vpnTunnelsInsert;
