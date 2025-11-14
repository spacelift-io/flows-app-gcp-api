import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const routersPreview: AppBlock = {
  name: "Routers - Preview",
  description: `Preview fields auto-generated during router create andupdate operations.`,
  category: "Routers",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description:
            "[Output Only] URI of the region where the router resides.",
          type: "string",
          required: false,
        },
        router: {
          name: "Router",
          description: "Name of the Router resource to query.",
          type: "string",
          required: true,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] Creation timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        encryptedInterconnectRouter: {
          name: "Encrypted Interconnect Router",
          description:
            "Indicates if a router is dedicated for use with encrypted VLAN attachments (interconnectAttachments).",
          type: "boolean",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        nats: {
          name: "Nats",
          description: "A list of NAT services created in this router.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                natIpAllocateOption: {
                  type: "string",
                  enum: ["AUTO_ONLY", "MANUAL_ONLY"],
                },
                tcpTimeWaitTimeoutSec: {
                  type: "number",
                },
                type: {
                  type: "string",
                  enum: ["PRIVATE", "PUBLIC"],
                },
                autoNetworkTier: {
                  type: "string",
                  enum: [
                    "FIXED_STANDARD",
                    "PREMIUM",
                    "STANDARD",
                    "STANDARD_OVERRIDES_FIXED_STANDARD",
                  ],
                },
                tcpEstablishedIdleTimeoutSec: {
                  type: "number",
                },
                sourceSubnetworkIpRangesToNat64: {
                  type: "string",
                  enum: ["ALL_IPV6_SUBNETWORKS", "LIST_OF_IPV6_SUBNETWORKS"],
                },
                minPortsPerVm: {
                  type: "number",
                },
                subnetworks: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                icmpIdleTimeoutSec: {
                  type: "number",
                },
                enableEndpointIndependentMapping: {
                  type: "boolean",
                },
                nat64Subnetworks: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                tcpTransitoryIdleTimeoutSec: {
                  type: "number",
                },
                maxPortsPerVm: {
                  type: "number",
                },
                sourceSubnetworkIpRangesToNat: {
                  type: "string",
                  enum: [
                    "ALL_SUBNETWORKS_ALL_IP_RANGES",
                    "ALL_SUBNETWORKS_ALL_PRIMARY_IP_RANGES",
                    "LIST_OF_SUBNETWORKS",
                  ],
                },
                drainNatIps: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                endpointTypes: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                enableDynamicPortAllocation: {
                  type: "boolean",
                },
                rules: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                logConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "string",
                },
                udpIdleTimeoutSec: {
                  type: "number",
                },
                natIps: {
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
        kind: {
          name: "Kind",
          description: "[Output Only] Type of resource.",
          type: "string",
          required: false,
        },
        bgp: {
          name: "Bgp",
          description: "BGP information specific to this router.",
          type: {
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
                  type: "string",
                  enum: ["ALL_SUBNETS"],
                },
              },
              identifierRange: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        interfaces: {
          name: "Interfaces",
          description: "Router interfaces.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                privateIpAddress: {
                  type: "string",
                },
                linkedInterconnectAttachment: {
                  type: "string",
                },
                subnetwork: {
                  type: "string",
                },
                redundantInterface: {
                  type: "string",
                },
                managementType: {
                  type: "string",
                  enum: ["MANAGED_BY_ATTACHMENT", "MANAGED_BY_USER"],
                },
                ipRange: {
                  type: "string",
                },
                linkedVpnTunnel: {
                  type: "string",
                },
                ipVersion: {
                  type: "string",
                  enum: ["IPV4", "IPV6"],
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
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
          type: "string",
          required: false,
        },
        network: {
          name: "Network",
          description: "URI of the network to which this router belongs.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "Name of the resource.",
          type: "string",
          required: false,
        },
        bgpPeers: {
          name: "Bgp Peers",
          description:
            "BGP information that must be configured into the routing stack to establish BGP peering.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                ipv4NexthopAddress: {
                  type: "string",
                },
                enableIpv4: {
                  type: "boolean",
                },
                peerIpv6NexthopAddress: {
                  type: "string",
                },
                peerAsn: {
                  type: "number",
                },
                md5AuthenticationKeyName: {
                  type: "string",
                },
                peerIpv4NexthopAddress: {
                  type: "string",
                },
                exportPolicies: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                ipAddress: {
                  type: "string",
                },
                routerApplianceInstance: {
                  type: "string",
                },
                customLearnedRoutePriority: {
                  type: "number",
                },
                advertiseMode: {
                  type: "string",
                  enum: ["CUSTOM", "DEFAULT"],
                },
                advertisedGroups: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                ipv6NexthopAddress: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                peerIpAddress: {
                  type: "string",
                },
                bfd: {
                  type: "object",
                  additionalProperties: true,
                },
                enable: {
                  type: "string",
                  enum: ["FALSE", "TRUE"],
                },
                advertisedIpRanges: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                customLearnedIpRanges: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                advertisedRoutePriority: {
                  type: "number",
                },
                importPolicies: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                managementType: {
                  type: "string",
                  enum: ["MANAGED_BY_ATTACHMENT", "MANAGED_BY_USER"],
                },
                enableIpv6: {
                  type: "boolean",
                },
                interfaceName: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
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
        md5AuthenticationKeys: {
          name: "Md5 Authentication Keys",
          description: "Keys used for MD5 authentication.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                key: {
                  type: "string",
                },
              },
              additionalProperties: true,
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
              "https://www.googleapis.com/auth/compute.readonly",
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
        let path = `projects/{project}/regions/{region}/routers/{router}/preview`;

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

        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.encryptedInterconnectRouter !== undefined)
          requestBody.encryptedInterconnectRouter =
            input.event.inputConfig.encryptedInterconnectRouter;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (input.event.inputConfig.nats !== undefined)
          requestBody.nats = input.event.inputConfig.nats;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.bgp !== undefined)
          requestBody.bgp = input.event.inputConfig.bgp;
        if (input.event.inputConfig.interfaces !== undefined)
          requestBody.interfaces = input.event.inputConfig.interfaces;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.network !== undefined)
          requestBody.network = input.event.inputConfig.network;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.bgpPeers !== undefined)
          requestBody.bgpPeers = input.event.inputConfig.bgpPeers;
        if (input.event.inputConfig.params !== undefined)
          requestBody.params = input.event.inputConfig.params;
        if (input.event.inputConfig.md5AuthenticationKeys !== undefined)
          requestBody.md5AuthenticationKeys =
            input.event.inputConfig.md5AuthenticationKeys;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;

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
          resource: {
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
                  additionalProperties: true,
                },
              },
              kind: {
                type: "string",
              },
              bgp: {
                type: "object",
                additionalProperties: true,
              },
              interfaces: {
                type: "array",
                items: {
                  type: "object",
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
                  additionalProperties: true,
                },
              },
              params: {
                type: "object",
                additionalProperties: true,
              },
              md5AuthenticationKeys: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              selfLink: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default routersPreview;
