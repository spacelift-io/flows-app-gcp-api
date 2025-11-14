import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const globalAddressesGet: AppBlock = {
  name: "Global Addresses - Get",
  description: `Returns the specified address resource.`,
  category: "Global Addresses",
  inputs: {
    default: {
      config: {
        address: {
          name: "Address",
          description: "Name of the address resource to return.",
          type: "string",
          required: true,
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
        let path = `projects/{project}/global/addresses/{address}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
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

export default globalAddressesGet;
