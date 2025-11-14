import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const forwardingRulesGet: AppBlock = {
  name: "Forwarding Rules - Get",
  description: `Returns the specified ForwardingRule resource.`,
  category: "Forwarding Rules",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        region: {
          name: "Region",
          description: "Name of the region scoping this request.",
          type: "string",
          required: true,
        },
        forwardingRule: {
          name: "ForwardingRule",
          description: "Name of the ForwardingRule resource to return.",
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
        const path = `projects/{project}/regions/{region}/forwardingRules/{forwardingRule}`;
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
          ports: {
            type: "array",
            items: {
              type: "string",
            },
          },
          target: {
            type: "string",
          },
          region: {
            type: "string",
          },
          externalManagedBackendBucketMigrationTestingPercentage: {
            type: "number",
          },
          allPorts: {
            type: "boolean",
          },
          description: {
            type: "string",
          },
          IPProtocol: {
            type: "string",
            enum: ["AH", "ESP", "ICMP", "L3_DEFAULT", "SCTP", "TCP", "UDP"],
          },
          kind: {
            type: "string",
          },
          network: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          serviceLabel: {
            type: "string",
          },
          backendService: {
            type: "string",
          },
          sourceIpRanges: {
            type: "array",
            items: {
              type: "string",
            },
          },
          serviceDirectoryRegistrations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                namespace: {
                  type: "object",
                  additionalProperties: true,
                },
                service: {
                  type: "object",
                  additionalProperties: true,
                },
                serviceDirectoryRegion: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          baseForwardingRule: {
            type: "string",
          },
          allowGlobalAccess: {
            type: "boolean",
          },
          noAutomateDnsZone: {
            type: "boolean",
          },
          isMirroringCollector: {
            type: "boolean",
          },
          subnetwork: {
            type: "string",
          },
          pscConnectionStatus: {
            type: "string",
            enum: [
              "ACCEPTED",
              "CLOSED",
              "NEEDS_ATTENTION",
              "PENDING",
              "REJECTED",
              "STATUS_UNSPECIFIED",
            ],
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
          allowPscGlobalAccess: {
            type: "boolean",
          },
          portRange: {
            type: "string",
          },
          labelFingerprint: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          id: {
            type: "string",
          },
          loadBalancingScheme: {
            type: "string",
            enum: [
              "EXTERNAL",
              "EXTERNAL_MANAGED",
              "INTERNAL",
              "INTERNAL_MANAGED",
              "INTERNAL_SELF_MANAGED",
              "INVALID",
            ],
          },
          selfLinkWithId: {
            type: "string",
          },
          IPAddress: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          serviceName: {
            type: "string",
          },
          fingerprint: {
            type: "string",
          },
          metadataFilters: {
            type: "array",
            items: {
              type: "object",
              properties: {
                filterMatchCriteria: {
                  type: "object",
                  additionalProperties: true,
                },
                filterLabels: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          name: {
            type: "string",
          },
          ipCollection: {
            type: "string",
          },
          pscConnectionId: {
            type: "string",
          },
          ipVersion: {
            type: "string",
            enum: ["IPV4", "IPV6", "UNSPECIFIED_VERSION"],
          },
          externalManagedBackendBucketMigrationState: {
            type: "string",
            enum: ["PREPARE", "TEST_ALL_TRAFFIC", "TEST_BY_PERCENTAGE"],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default forwardingRulesGet;
