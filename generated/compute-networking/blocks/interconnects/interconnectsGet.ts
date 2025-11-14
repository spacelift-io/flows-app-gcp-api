import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const interconnectsGet: AppBlock = {
  name: "Interconnects - Get",
  description: `Returns the specified Interconnect.`,
  category: "Interconnects",
  inputs: {
    default: {
      config: {
        interconnect: {
          name: "Interconnect",
          description: "Name of the interconnect to return.",
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
        let path = `projects/{project}/global/interconnects/{interconnect}`;

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
          location: {
            type: "string",
          },
          applicationAwareInterconnect: {
            type: "object",
            properties: {
              profileDescription: {
                type: "string",
              },
              strictPriorityPolicy: {
                type: "object",
                additionalProperties: true,
              },
              bandwidthPercentagePolicy: {
                type: "object",
                additionalProperties: true,
              },
              shapeAveragePercentages: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          requestedFeatures: {
            type: "array",
            items: {
              type: "string",
              enum: ["IF_CROSS_SITE_NETWORK", "IF_L2_FORWARDING", "IF_MACSEC"],
            },
          },
          provisionedLinkCount: {
            type: "number",
          },
          customerName: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          peerIpAddress: {
            type: "string",
          },
          operationalStatus: {
            type: "string",
            enum: ["OS_ACTIVE", "OS_UNPROVISIONED"],
          },
          macsec: {
            type: "object",
            properties: {
              preSharedKeys: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              failOpen: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          state: {
            type: "string",
            enum: ["ACTIVE", "UNPROVISIONED"],
          },
          availableFeatures: {
            type: "array",
            items: {
              type: "string",
              enum: ["IF_CROSS_SITE_NETWORK", "IF_L2_FORWARDING", "IF_MACSEC"],
            },
          },
          googleReferenceId: {
            type: "string",
          },
          subzone: {
            type: "string",
            enum: ["SUBZONE_A", "SUBZONE_B"],
          },
          name: {
            type: "string",
          },
          satisfiesPzs: {
            type: "boolean",
          },
          remoteLocation: {
            type: "string",
          },
          requestedLinkCount: {
            type: "number",
          },
          interconnectAttachments: {
            type: "array",
            items: {
              type: "string",
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
          adminEnabled: {
            type: "boolean",
          },
          creationTimestamp: {
            type: "string",
          },
          expectedOutages: {
            type: "array",
            items: {
              type: "object",
              properties: {
                startTime: {
                  type: "object",
                  additionalProperties: true,
                },
                source: {
                  type: "object",
                  additionalProperties: true,
                },
                affectedCircuits: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
                state: {
                  type: "object",
                  additionalProperties: true,
                },
                issueType: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                endTime: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          interconnectGroups: {
            type: "array",
            items: {
              type: "string",
            },
          },
          aaiEnabled: {
            type: "boolean",
          },
          description: {
            type: "string",
          },
          googleIpAddress: {
            type: "string",
          },
          id: {
            type: "string",
          },
          circuitInfos: {
            type: "array",
            items: {
              type: "object",
              properties: {
                customerDemarcId: {
                  type: "object",
                  additionalProperties: true,
                },
                googleDemarcId: {
                  type: "object",
                  additionalProperties: true,
                },
                googleCircuitId: {
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
          nocContactEmail: {
            type: "string",
          },
          wireGroups: {
            type: "array",
            items: {
              type: "string",
            },
          },
          macsecEnabled: {
            type: "boolean",
          },
          labelFingerprint: {
            type: "string",
          },
          interconnectType: {
            type: "string",
            enum: ["DEDICATED", "IT_PRIVATE", "PARTNER"],
          },
          kind: {
            type: "string",
          },
          linkType: {
            type: "string",
            enum: [
              "LINK_TYPE_ETHERNET_100G_LR",
              "LINK_TYPE_ETHERNET_10G_LR",
              "LINK_TYPE_ETHERNET_400G_LR4",
            ],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default interconnectsGet;
