import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const interconnectAttachmentsPatch: AppBlock = {
  name: "Interconnect Attachments - Patch",
  description: `Updates the specified interconnect attachment with the data included in the request.`,
  category: "Interconnect Attachments",
  inputs: {
    default: {
      config: {
        requestId: {
          name: "RequestId",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        interconnectAttachment: {
          name: "InterconnectAttachment",
          description: "Name of the interconnect attachment to patch.",
          type: "string",
          required: true,
        },
        region: {
          name: "Region",
          description: "Name of the region scoping this request.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Represents an Interconnect Attachment (VLAN) resource.\n\nYou can use Interconnect attachments (VLANS) to connect your Virtual Private\nCloud networks to your on-premises networks through an Interconnect.\nFor more information, read\nCreating VLAN Attachments.",
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
                enum: [
                  "DEDICATED",
                  "L2_DEDICATED",
                  "PARTNER",
                  "PARTNER_PROVIDER",
                ],
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
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        const path = `projects/{project}/regions/{region}/interconnectAttachments/{interconnectAttachment}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        };

        // Add request body
        if (input.event.inputConfig.requestBody) {
          requestOptions.body = JSON.stringify(
            input.event.inputConfig.requestBody,
          );
        }

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
          targetId: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          httpErrorMessage: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          setCommonInstanceMetadataOperationMetadata: {
            type: "object",
            properties: {
              perLocationOperations: {
                type: "object",
                additionalProperties: true,
              },
              clientOperationId: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          id: {
            type: "string",
          },
          region: {
            type: "string",
          },
          startTime: {
            type: "string",
          },
          zone: {
            type: "string",
          },
          statusMessage: {
            type: "string",
          },
          user: {
            type: "string",
          },
          warnings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                code: {
                  type: "string",
                  enum: [
                    "CLEANUP_FAILED",
                    "DEPRECATED_RESOURCE_USED",
                    "DEPRECATED_TYPE_USED",
                    "DISK_SIZE_LARGER_THAN_IMAGE_SIZE",
                    "EXPERIMENTAL_TYPE_USED",
                    "EXTERNAL_API_WARNING",
                    "FIELD_VALUE_OVERRIDEN",
                    "INJECTED_KERNELS_DEPRECATED",
                    "INVALID_HEALTH_CHECK_FOR_DYNAMIC_WIEGHTED_LB",
                    "LARGE_DEPLOYMENT_WARNING",
                    "LIST_OVERHEAD_QUOTA_EXCEED",
                    "MISSING_TYPE_DEPENDENCY",
                    "NEXT_HOP_ADDRESS_NOT_ASSIGNED",
                    "NEXT_HOP_CANNOT_IP_FORWARD",
                    "NEXT_HOP_INSTANCE_HAS_NO_IPV6_INTERFACE",
                    "NEXT_HOP_INSTANCE_NOT_FOUND",
                    "NEXT_HOP_INSTANCE_NOT_ON_NETWORK",
                    "NEXT_HOP_NOT_RUNNING",
                    "NOT_CRITICAL_ERROR",
                    "NO_RESULTS_ON_PAGE",
                    "PARTIAL_SUCCESS",
                    "QUOTA_INFO_UNAVAILABLE",
                    "REQUIRED_TOS_AGREEMENT",
                    "RESOURCE_IN_USE_BY_OTHER_RESOURCE_WARNING",
                    "RESOURCE_NOT_DELETED",
                    "SCHEMA_VALIDATION_IGNORED",
                    "SINGLE_INSTANCE_PROPERTY_TEMPLATE",
                    "UNDECLARED_PROPERTIES",
                    "UNREACHABLE",
                  ],
                },
              },
              additionalProperties: true,
            },
          },
          operationType: {
            type: "string",
          },
          targetLink: {
            type: "string",
          },
          instancesBulkInsertOperationMetadata: {
            type: "object",
            properties: {
              perLocationStatus: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          error: {
            type: "object",
            properties: {
              errors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: {
                      type: "object",
                      additionalProperties: true,
                    },
                    message: {
                      type: "object",
                      additionalProperties: true,
                    },
                    errorDetails: {
                      type: "object",
                      additionalProperties: true,
                    },
                    location: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          endTime: {
            type: "string",
          },
          httpErrorStatusCode: {
            type: "number",
          },
          operationGroupId: {
            type: "string",
          },
          description: {
            type: "string",
          },
          name: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          clientOperationId: {
            type: "string",
          },
          insertTime: {
            type: "string",
          },
          status: {
            type: "string",
            enum: ["DONE", "PENDING", "RUNNING"],
          },
          progress: {
            type: "number",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default interconnectAttachmentsPatch;
