import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const externalVpnGatewaysGet: AppBlock = {
  name: "External Vpn Gateways - Get",
  description: `Returns the specified externalVpnGateway.`,
  category: "External Vpn Gateways",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        externalVpnGateway: {
          name: "ExternalVpnGateway",
          description: "Name of the externalVpnGateway to return.",
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
        const path = `projects/{project}/global/externalVpnGateways/{externalVpnGateway}`;
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
          kind: {
            type: "string",
          },
          redundancyType: {
            type: "string",
            enum: [
              "FOUR_IPS_REDUNDANCY",
              "SINGLE_IP_INTERNALLY_REDUNDANT",
              "TWO_IPS_REDUNDANCY",
            ],
          },
          description: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          name: {
            type: "string",
          },
          interfaces: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "object",
                  additionalProperties: true,
                },
                ipv6Address: {
                  type: "object",
                  additionalProperties: true,
                },
                ipAddress: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          id: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          labelFingerprint: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default externalVpnGatewaysGet;
