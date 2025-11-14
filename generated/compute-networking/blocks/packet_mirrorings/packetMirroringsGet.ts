import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const packetMirroringsGet: AppBlock = {
  name: "Packet Mirrorings - Get",
  description: `Returns the specified PacketMirroring resource.`,
  category: "Packet Mirrorings",
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
        packetMirroring: {
          name: "PacketMirroring",
          description: "Name of the PacketMirroring resource to return.",
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
        const path = `projects/{project}/regions/{region}/packetMirrorings/{packetMirroring}`;
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
          region: {
            type: "string",
          },
          name: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          priority: {
            type: "number",
          },
          selfLink: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          description: {
            type: "string",
          },
          enable: {
            type: "string",
            enum: ["FALSE", "TRUE"],
          },
          filter: {
            type: "object",
            properties: {
              direction: {
                type: "string",
                enum: ["BOTH", "EGRESS", "INGRESS"],
              },
              IPProtocols: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              cidrRanges: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          collectorIlb: {
            type: "object",
            properties: {
              url: {
                type: "string",
              },
              canonicalUrl: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          mirroredResources: {
            type: "object",
            properties: {
              subnetworks: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              instances: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              tags: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          network: {
            type: "object",
            properties: {
              url: {
                type: "string",
              },
              canonicalUrl: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          id: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default packetMirroringsGet;
