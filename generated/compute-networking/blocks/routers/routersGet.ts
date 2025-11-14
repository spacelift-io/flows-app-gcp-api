import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const routersGet: AppBlock = {
  name: "Routers - Get",
  description: `Returns the specified Router resource.`,
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
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        router: {
          name: "Router",
          description: "Name of the Router resource to return.",
          type: "string",
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
            "https://www.googleapis.com/auth/compute.readonly",
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
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        };

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
    },
  },
};

export default routersGet;
