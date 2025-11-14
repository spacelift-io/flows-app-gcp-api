import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const interconnectAttachmentsGet: AppBlock = {
  name: "Interconnect Attachments - Get",
  description: `Returns the specified interconnect attachment.`,
  category: "Interconnect Attachments",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description: "Name of the region for this request.",
          type: "string",
          required: true,
        },
        interconnectAttachment: {
          name: "Interconnect Attachment",
          description: "Name of the interconnect attachment to return.",
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
        let path = `projects/{project}/regions/{region}/interconnectAttachments/{interconnectAttachment}`;

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
          stackType: {
            type: "string",
            enum: ["IPV4_IPV6", "IPV4_ONLY"],
          },
          kind: {
            type: "string",
          },
          mtu: {
            type: "number",
          },
          state: {
            type: "string",
            enum: [
              "ACTIVE",
              "DEFUNCT",
              "PARTNER_REQUEST_RECEIVED",
              "PENDING_CUSTOMER",
              "PENDING_PARTNER",
              "STATE_UNSPECIFIED",
              "UNPROVISIONED",
            ],
          },
          customerRouterIpAddress: {
            type: "string",
          },
          vlanTag8021q: {
            type: "number",
          },
          edgeAvailabilityDomain: {
            type: "string",
            enum: [
              "AVAILABILITY_DOMAIN_1",
              "AVAILABILITY_DOMAIN_2",
              "AVAILABILITY_DOMAIN_ANY",
            ],
          },
          ipsecInternalAddresses: {
            type: "array",
            items: {
              type: "string",
            },
          },
          pairingKey: {
            type: "string",
          },
          cloudRouterIpAddress: {
            type: "string",
          },
          dataplaneVersion: {
            type: "number",
          },
          l2Forwarding: {
            type: "object",
            properties: {
              tunnelEndpointIpAddress: {
                type: "string",
              },
              defaultApplianceIpAddress: {
                type: "string",
              },
              geneveHeader: {
                type: "object",
                additionalProperties: true,
              },
              network: {
                type: "string",
              },
              applianceMappings: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          customerRouterIpv6InterfaceId: {
            type: "string",
          },
          configurationConstraints: {
            type: "object",
            properties: {
              bgpMd5: {
                type: "string",
                enum: ["MD5_OPTIONAL", "MD5_REQUIRED", "MD5_UNSUPPORTED"],
              },
              bgpPeerAsnRanges: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          remoteService: {
            type: "string",
          },
          adminEnabled: {
            type: "boolean",
          },
          name: {
            type: "string",
          },
          region: {
            type: "string",
          },
          privateInterconnectInfo: {
            type: "object",
            properties: {
              tag8021q: {
                type: "number",
              },
            },
            additionalProperties: true,
          },
          googleReferenceId: {
            type: "string",
          },
          description: {
            type: "string",
          },
          id: {
            type: "string",
          },
          labelFingerprint: {
            type: "string",
          },
          customerRouterIpv6Address: {
            type: "string",
          },
          attachmentGroup: {
            type: "string",
          },
          interconnect: {
            type: "string",
          },
          bandwidth: {
            type: "string",
            enum: [
              "BPS_100G",
              "BPS_100M",
              "BPS_10G",
              "BPS_1G",
              "BPS_200M",
              "BPS_20G",
              "BPS_2G",
              "BPS_300M",
              "BPS_400M",
              "BPS_500M",
              "BPS_50G",
              "BPS_50M",
              "BPS_5G",
            ],
          },
          subnetLength: {
            type: "number",
          },
          partnerMetadata: {
            type: "object",
            properties: {
              interconnectName: {
                type: "string",
              },
              partnerName: {
                type: "string",
              },
              portalUrl: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          satisfiesPzs: {
            type: "boolean",
          },
          operationalStatus: {
            type: "string",
            enum: ["OS_ACTIVE", "OS_UNPROVISIONED"],
          },
          selfLink: {
            type: "string",
          },
          cloudRouterIpv6Address: {
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
          type: {
            type: "string",
            enum: ["DEDICATED", "L2_DEDICATED", "PARTNER", "PARTNER_PROVIDER"],
          },
          candidateSubnets: {
            type: "array",
            items: {
              type: "string",
            },
          },
          encryption: {
            type: "string",
            enum: ["IPSEC", "NONE"],
          },
          candidateIpv6Subnets: {
            type: "array",
            items: {
              type: "string",
            },
          },
          creationTimestamp: {
            type: "string",
          },
          router: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          partnerAsn: {
            type: "string",
          },
          cloudRouterIpv6InterfaceId: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default interconnectAttachmentsGet;
