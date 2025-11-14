import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const vpnGatewaysGet: AppBlock = {
  name: "Vpn Gateways - Get",
  description: `Returns the specified VPN gateway.`,
  category: "Vpn Gateways",
  inputs: {
    default: {
      config: {
        vpnGateway: {
          name: "VpnGateway",
          description: "Name of the VPN gateway to return.",
          type: "string",
          required: true,
        },
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
        const path = `projects/{project}/regions/{region}/vpnGateways/{vpnGateway}`;
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
          gatewayIpVersion: {
            type: "string",
            enum: ["IPV4", "IPV6"],
          },
          vpnInterfaces: {
            type: "array",
            items: {
              type: "object",
              properties: {
                interconnectAttachment: {
                  type: "object",
                  additionalProperties: true,
                },
                ipAddress: {
                  type: "object",
                  additionalProperties: true,
                },
                id: {
                  type: "object",
                  additionalProperties: true,
                },
                ipv6Address: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          stackType: {
            type: "string",
            enum: ["IPV4_IPV6", "IPV4_ONLY", "IPV6_ONLY"],
          },
          selfLink: {
            type: "string",
          },
          region: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          labelFingerprint: {
            type: "string",
          },
          network: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default vpnGatewaysGet;
