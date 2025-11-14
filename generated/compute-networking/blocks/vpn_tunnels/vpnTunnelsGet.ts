import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const vpnTunnelsGet: AppBlock = {
  name: "Vpn Tunnels - Get",
  description: `Returns the specified VpnTunnel resource.`,
  category: "Vpn Tunnels",
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
        vpnTunnel: {
          name: "VpnTunnel",
          description: "Name of the VpnTunnel resource to return.",
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
        const path = `projects/{project}/regions/{region}/vpnTunnels/{vpnTunnel}`;
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
          sharedSecretHash: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          ikeVersion: {
            type: "number",
          },
          name: {
            type: "string",
          },
          peerIp: {
            type: "string",
          },
          labelFingerprint: {
            type: "string",
          },
          router: {
            type: "string",
          },
          vpnGateway: {
            type: "string",
          },
          peerGcpGateway: {
            type: "string",
          },
          cipherSuite: {
            type: "object",
            properties: {
              phase2: {
                type: "object",
                additionalProperties: true,
              },
              phase1: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          description: {
            type: "string",
          },
          status: {
            type: "string",
            enum: [
              "ALLOCATING_RESOURCES",
              "AUTHORIZATION_ERROR",
              "DEPROVISIONING",
              "ESTABLISHED",
              "FAILED",
              "FIRST_HANDSHAKE",
              "NEGOTIATION_FAILURE",
              "NETWORK_ERROR",
              "NO_INCOMING_PACKETS",
              "PROVISIONING",
              "REJECTED",
              "STOPPED",
              "WAITING_FOR_FULL_CONFIG",
            ],
          },
          id: {
            type: "string",
          },
          remoteTrafficSelector: {
            type: "array",
            items: {
              type: "string",
            },
          },
          selfLink: {
            type: "string",
          },
          sharedSecret: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          detailedStatus: {
            type: "string",
          },
          vpnGatewayInterface: {
            type: "number",
          },
          targetVpnGateway: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          peerExternalGateway: {
            type: "string",
          },
          localTrafficSelector: {
            type: "array",
            items: {
              type: "string",
            },
          },
          region: {
            type: "string",
          },
          peerExternalGatewayInterface: {
            type: "number",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default vpnTunnelsGet;
