import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const addressesGet: AppBlock = {
  name: "Addresses - Get",
  description: `Returns the specified address resource.`,
  category: "Addresses",
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
        address: {
          name: "Address",
          description: "Name of the address resource to return.",
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
        const path = `projects/{project}/regions/{region}/addresses/{address}`;
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
          prefixLength: {
            type: "number",
          },
          selfLink: {
            type: "string",
          },
          purpose: {
            type: "string",
            enum: [
              "DNS_RESOLVER",
              "GCE_ENDPOINT",
              "IPSEC_INTERCONNECT",
              "NAT_AUTO",
              "PRIVATE_SERVICE_CONNECT",
              "SERVERLESS",
              "SHARED_LOADBALANCER_VIP",
              "VPC_PEERING",
            ],
          },
          ipVersion: {
            type: "string",
            enum: ["IPV4", "IPV6", "UNSPECIFIED_VERSION"],
          },
          users: {
            type: "array",
            items: {
              type: "string",
            },
          },
          id: {
            type: "string",
          },
          address: {
            type: "string",
          },
          addressType: {
            type: "string",
            enum: ["EXTERNAL", "INTERNAL", "UNSPECIFIED_TYPE"],
          },
          ipv6EndpointType: {
            type: "string",
            enum: ["NETLB", "VM"],
          },
          region: {
            type: "string",
          },
          description: {
            type: "string",
          },
          network: {
            type: "string",
          },
          labelFingerprint: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          kind: {
            type: "string",
          },
          subnetwork: {
            type: "string",
          },
          name: {
            type: "string",
          },
          status: {
            type: "string",
            enum: ["IN_USE", "RESERVED", "RESERVING"],
          },
          creationTimestamp: {
            type: "string",
          },
          networkTier: {
            type: "string",
            enum: [
              "FIXED_STANDARD",
              "PREMIUM",
              "STANDARD",
              "STANDARD_OVERRIDES_FIXED_STANDARD",
            ],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default addressesGet;
