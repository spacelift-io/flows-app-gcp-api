import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const subnetworksGet: AppBlock = {
  name: "Subnetworks - Get",
  description: `Returns the specified subnetwork.`,
  category: "Subnetworks",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description: "Name of the region scoping this request.",
          type: "string",
          required: true,
        },
        subnetwork: {
          name: "Subnetwork",
          description: "Name of the Subnetwork resource to return.",
          type: "string",
          required: true,
        },
        views: {
          name: "Views",
          description:
            "Defines the extra views returned back in the subnetwork resource.\nSupported values:\n   \n   - WITH_UTILIZATION: Utilization data is included in the\n   response. Valid values: DEFAULT, WITH_UTILIZATION",
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
        let path = `projects/{project}/regions/{region}/subnetworks/{subnetwork}`;

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
          fingerprint: {
            type: "string",
          },
          gatewayAddress: {
            type: "string",
          },
          secondaryIpRanges: {
            type: "array",
            items: {
              type: "object",
              properties: {
                rangeName: {
                  type: "object",
                  additionalProperties: true,
                },
                reservedInternalRange: {
                  type: "object",
                  additionalProperties: true,
                },
                ipCidrRange: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          region: {
            type: "string",
          },
          reservedInternalRange: {
            type: "string",
          },
          ipv6GceEndpoint: {
            type: "string",
            enum: ["VM_AND_FR", "VM_ONLY"],
          },
          systemReservedInternalIpv6Ranges: {
            type: "array",
            items: {
              type: "string",
            },
          },
          purpose: {
            type: "string",
            enum: [
              "GLOBAL_MANAGED_PROXY",
              "INTERNAL_HTTPS_LOAD_BALANCER",
              "PEER_MIGRATION",
              "PRIVATE",
              "PRIVATE_NAT",
              "PRIVATE_RFC_1918",
              "PRIVATE_SERVICE_CONNECT",
              "REGIONAL_MANAGED_PROXY",
            ],
          },
          creationTimestamp: {
            type: "string",
          },
          state: {
            type: "string",
            enum: ["DRAINING", "READY"],
          },
          internalIpv6Prefix: {
            type: "string",
          },
          privateIpGoogleAccess: {
            type: "boolean",
          },
          ipv6CidrRange: {
            type: "string",
          },
          network: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          utilizationDetails: {
            type: "object",
            properties: {
              externalIpv6LbUtilization: {
                type: "object",
                additionalProperties: true,
              },
              externalIpv6InstanceUtilization: {
                type: "object",
                additionalProperties: true,
              },
              internalIpv6Utilization: {
                type: "object",
                additionalProperties: true,
              },
              ipv4Utilizations: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          externalIpv6Prefix: {
            type: "string",
          },
          stackType: {
            type: "string",
            enum: ["IPV4_IPV6", "IPV4_ONLY", "IPV6_ONLY"],
          },
          systemReservedExternalIpv6Ranges: {
            type: "array",
            items: {
              type: "string",
            },
          },
          privateIpv6GoogleAccess: {
            type: "string",
            enum: [
              "DISABLE_GOOGLE_ACCESS",
              "ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE",
              "ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE",
            ],
          },
          description: {
            type: "string",
          },
          ipCidrRange: {
            type: "string",
          },
          logConfig: {
            type: "object",
            properties: {
              flowSampling: {
                type: "number",
              },
              metadataFields: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              metadata: {
                type: "string",
                enum: [
                  "CUSTOM_METADATA",
                  "EXCLUDE_ALL_METADATA",
                  "INCLUDE_ALL_METADATA",
                ],
              },
              aggregationInterval: {
                type: "string",
                enum: [
                  "INTERVAL_10_MIN",
                  "INTERVAL_15_MIN",
                  "INTERVAL_1_MIN",
                  "INTERVAL_30_SEC",
                  "INTERVAL_5_MIN",
                  "INTERVAL_5_SEC",
                ],
              },
              enable: {
                type: "boolean",
              },
              filterExpr: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          ipv6AccessType: {
            type: "string",
            enum: ["EXTERNAL", "INTERNAL"],
          },
          role: {
            type: "string",
            enum: ["ACTIVE", "BACKUP"],
          },
          enableFlowLogs: {
            type: "boolean",
          },
          ipCollection: {
            type: "string",
          },
          id: {
            type: "string",
          },
          name: {
            type: "string",
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
        },
        additionalProperties: true,
      },
    },
  },
};

export default subnetworksGet;
