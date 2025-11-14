import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const firewallsGet: AppBlock = {
  name: "Firewalls - Get",
  description: `Returns the specified firewall.`,
  category: "Firewalls",
  inputs: {
    default: {
      config: {
        firewall: {
          name: "Firewall",
          description: "Name of the firewall rule to return.",
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
        const path = `projects/{project}/global/firewalls/{firewall}`;
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
          direction: {
            type: "string",
            enum: ["EGRESS", "INGRESS"],
          },
          sourceServiceAccounts: {
            type: "array",
            items: {
              type: "string",
            },
          },
          id: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          sourceTags: {
            type: "array",
            items: {
              type: "string",
            },
          },
          targetTags: {
            type: "array",
            items: {
              type: "string",
            },
          },
          selfLink: {
            type: "string",
          },
          network: {
            type: "string",
          },
          disabled: {
            type: "boolean",
          },
          kind: {
            type: "string",
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
          logConfig: {
            type: "object",
            properties: {
              enable: {
                type: "boolean",
              },
              metadata: {
                type: "string",
                enum: ["EXCLUDE_ALL_METADATA", "INCLUDE_ALL_METADATA"],
              },
            },
            additionalProperties: true,
          },
          destinationRanges: {
            type: "array",
            items: {
              type: "string",
            },
          },
          description: {
            type: "string",
          },
          sourceRanges: {
            type: "array",
            items: {
              type: "string",
            },
          },
          denied: {
            type: "array",
            items: {
              type: "object",
              properties: {
                ports: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                IPProtocol: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          targetServiceAccounts: {
            type: "array",
            items: {
              type: "string",
            },
          },
          allowed: {
            type: "array",
            items: {
              type: "object",
              properties: {
                ports: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                IPProtocol: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          priority: {
            type: "number",
          },
          name: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default firewallsGet;
