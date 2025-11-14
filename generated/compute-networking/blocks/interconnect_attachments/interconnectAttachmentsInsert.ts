import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const interconnectAttachmentsInsert: AppBlock = {
  name: "Interconnect Attachments - Insert",
  description: `Creates an InterconnectAttachment in the specified project using the data included in the request.`,
  category: "Interconnect Attachments",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description:
            "[Output Only] URL of the region where the regional interconnect attachment resides.",
          type: "string",
          required: false,
        },
        requestId: {
          name: "Request ID",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        validateOnly: {
          name: "Validate Only",
          description: "If true, the request will not be committed.",
          type: "boolean",
          required: false,
        },
        stackType: {
          name: "Stack Type",
          description:
            "The stack type for this interconnect attachment to identify whether the IPv6 feature is enabled or not.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of the resource.",
          type: "string",
          required: false,
        },
        mtu: {
          name: "Mtu",
          description:
            "Maximum Transmission Unit (MTU), in bytes, of packets passing through this interconnect attachment.",
          type: "number",
          required: false,
        },
        state: {
          name: "State",
          description:
            "[Output Only] The current state of this attachment's functionality.",
          type: "string",
          required: false,
        },
        customerRouterIpAddress: {
          name: "Customer Router IP Address",
          description:
            "[Output Only] IPv4 address + prefix length to be configured on the customer router subinterface for this interconnect attachment.",
          type: "string",
          required: false,
        },
        vlanTag8021q: {
          name: "Vlan Tag8021q",
          description: "The IEEE 802.",
          type: "number",
          required: false,
        },
        edgeAvailabilityDomain: {
          name: "Edge Availability Domain",
          description: "Input only.",
          type: "string",
          required: false,
        },
        ipsecInternalAddresses: {
          name: "Ipsec Internal Addresses",
          description:
            "A list of URLs of addresses that have been reserved for the VLAN attachment.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        pairingKey: {
          name: "Pairing Key",
          description: "[Output only for type PARTNER.",
          type: "string",
          required: false,
        },
        cloudRouterIpAddress: {
          name: "Cloud Router IP Address",
          description:
            "[Output Only] IPv4 address + prefix length to be configured on Cloud Router Interface for this interconnect attachment.",
          type: "string",
          required: false,
        },
        dataplaneVersion: {
          name: "Dataplane Version",
          description:
            "[Output Only] Dataplane version for this InterconnectAttachment.",
          type: "number",
          required: false,
        },
        l2Forwarding: {
          name: "L2 Forwarding",
          description: "L2 Interconnect Attachment related config.",
          type: {
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
                properties: {
                  vni: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
          required: false,
        },
        customerRouterIpv6InterfaceId: {
          name: "Customer Router Ipv6 Interface ID",
          description: "This field is not available.",
          type: "string",
          required: false,
        },
        configurationConstraints: {
          name: "Configuration Constraints",
          description: "[Output Only] Constraints for this attachment, if any.",
          type: {
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
          required: false,
        },
        remoteService: {
          name: "Remote Service",
          description:
            "[Output Only] If the attachment is on a Cross-Cloud Interconnect connection, this field contains the interconnect's remote location service provider.",
          type: "string",
          required: false,
        },
        adminEnabled: {
          name: "Admin Enabled",
          description: "Determines whether this Attachment will carry packets.",
          type: "boolean",
          required: false,
        },
        name: {
          name: "Name",
          description: "Name of the resource.",
          type: "string",
          required: false,
        },
        privateInterconnectInfo: {
          name: "Private Interconnect Info",
          description:
            "[Output Only] Information specific to an InterconnectAttachment.",
          type: {
            type: "object",
            properties: {
              tag8021q: {
                type: "number",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
          type: "string",
          required: false,
        },
        labelFingerprint: {
          name: "Label Fingerprint",
          description:
            "A fingerprint for the labels being applied to this InterconnectAttachment, which is essentially a hash of the labels set used for optimistic locking.",
          type: "string",
          required: false,
        },
        customerRouterIpv6Address: {
          name: "Customer Router Ipv6 Address",
          description:
            "[Output Only] IPv6 address + prefix length to be configured on the customer router subinterface for this interconnect attachment.",
          type: "string",
          required: false,
        },
        attachmentGroup: {
          name: "Attachment Group",
          description:
            "[Output Only] URL of the AttachmentGroup that includes this Attachment.",
          type: "string",
          required: false,
        },
        interconnect: {
          name: "Interconnect",
          description:
            "URL of the underlying Interconnect object that this attachment's traffic will traverse through.",
          type: "string",
          required: false,
        },
        bandwidth: {
          name: "Bandwidth",
          description:
            "Provisioned bandwidth capacity for the interconnect attachment.",
          type: "string",
          required: false,
        },
        subnetLength: {
          name: "Subnet Length",
          description: "Input only.",
          type: "number",
          required: false,
        },
        partnerMetadata: {
          name: "Partner Metadata",
          description:
            "Informational metadata about Partner attachments from Partners to display to customers.",
          type: {
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
          required: false,
        },
        satisfiesPzs: {
          name: "Satisfies Pzs",
          description: "[Output Only] Reserved for future use.",
          type: "boolean",
          required: false,
        },
        operationalStatus: {
          name: "Operational Status",
          description:
            "[Output Only] The current status of whether or not this interconnect attachment is functional, which can take one of the following values: - OS_ACTIVE: The attachment has been turned up and is ready to use.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for the resource.",
          type: "string",
          required: false,
        },
        cloudRouterIpv6Address: {
          name: "Cloud Router Ipv6 Address",
          description:
            "[Output Only] IPv6 address + prefix length to be configured on Cloud Router Interface for this interconnect attachment.",
          type: "string",
          required: false,
        },
        params: {
          name: "Params",
          description: "Input only.",
          type: {
            type: "object",
            properties: {
              resourceManagerTags: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        type: {
          name: "Type",
          description:
            "The type of interconnect attachment this is, which can take one of the following values: - DEDICATED: an attachment to a Dedicated Interconnect.",
          type: "string",
          required: false,
        },
        candidateSubnets: {
          name: "Candidate Subnets",
          description: "Input only.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        encryption: {
          name: "Encryption",
          description:
            "Indicates the user-supplied encryption option of this VLAN attachment (interconnectAttachment).",
          type: "string",
          required: false,
        },
        candidateIpv6Subnets: {
          name: "Candidate Ipv6 Subnets",
          description: "This field is not available.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] Creation timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        router: {
          name: "Router",
          description:
            "URL of the Cloud Router to be used for dynamic routing.",
          type: "string",
          required: false,
        },
        labels: {
          name: "Labels",
          description: "Labels for this resource.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        partnerAsn: {
          name: "Partner Asn",
          description:
            "Optional BGP ASN for the router supplied by a Layer 3 Partner if they configured BGP on behalf of the customer.",
          type: "string",
          required: false,
        },
        cloudRouterIpv6InterfaceId: {
          name: "Cloud Router Ipv6 Interface ID",
          description: "This field is not available.",
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
        let path = `projects/{project}/regions/{region}/interconnectAttachments`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.stackType !== undefined)
          requestBody.stackType = input.event.inputConfig.stackType;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.mtu !== undefined)
          requestBody.mtu = input.event.inputConfig.mtu;
        if (input.event.inputConfig.state !== undefined)
          requestBody.state = input.event.inputConfig.state;
        if (input.event.inputConfig.customerRouterIpAddress !== undefined)
          requestBody.customerRouterIpAddress =
            input.event.inputConfig.customerRouterIpAddress;
        if (input.event.inputConfig.vlanTag8021q !== undefined)
          requestBody.vlanTag8021q = input.event.inputConfig.vlanTag8021q;
        if (input.event.inputConfig.edgeAvailabilityDomain !== undefined)
          requestBody.edgeAvailabilityDomain =
            input.event.inputConfig.edgeAvailabilityDomain;
        if (input.event.inputConfig.ipsecInternalAddresses !== undefined)
          requestBody.ipsecInternalAddresses =
            input.event.inputConfig.ipsecInternalAddresses;
        if (input.event.inputConfig.pairingKey !== undefined)
          requestBody.pairingKey = input.event.inputConfig.pairingKey;
        if (input.event.inputConfig.cloudRouterIpAddress !== undefined)
          requestBody.cloudRouterIpAddress =
            input.event.inputConfig.cloudRouterIpAddress;
        if (input.event.inputConfig.dataplaneVersion !== undefined)
          requestBody.dataplaneVersion =
            input.event.inputConfig.dataplaneVersion;
        if (input.event.inputConfig.l2Forwarding !== undefined)
          requestBody.l2Forwarding = input.event.inputConfig.l2Forwarding;
        if (input.event.inputConfig.customerRouterIpv6InterfaceId !== undefined)
          requestBody.customerRouterIpv6InterfaceId =
            input.event.inputConfig.customerRouterIpv6InterfaceId;
        if (input.event.inputConfig.configurationConstraints !== undefined)
          requestBody.configurationConstraints =
            input.event.inputConfig.configurationConstraints;
        if (input.event.inputConfig.remoteService !== undefined)
          requestBody.remoteService = input.event.inputConfig.remoteService;
        if (input.event.inputConfig.adminEnabled !== undefined)
          requestBody.adminEnabled = input.event.inputConfig.adminEnabled;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (input.event.inputConfig.privateInterconnectInfo !== undefined)
          requestBody.privateInterconnectInfo =
            input.event.inputConfig.privateInterconnectInfo;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.labelFingerprint !== undefined)
          requestBody.labelFingerprint =
            input.event.inputConfig.labelFingerprint;
        if (input.event.inputConfig.customerRouterIpv6Address !== undefined)
          requestBody.customerRouterIpv6Address =
            input.event.inputConfig.customerRouterIpv6Address;
        if (input.event.inputConfig.attachmentGroup !== undefined)
          requestBody.attachmentGroup = input.event.inputConfig.attachmentGroup;
        if (input.event.inputConfig.interconnect !== undefined)
          requestBody.interconnect = input.event.inputConfig.interconnect;
        if (input.event.inputConfig.bandwidth !== undefined)
          requestBody.bandwidth = input.event.inputConfig.bandwidth;
        if (input.event.inputConfig.subnetLength !== undefined)
          requestBody.subnetLength = input.event.inputConfig.subnetLength;
        if (input.event.inputConfig.partnerMetadata !== undefined)
          requestBody.partnerMetadata = input.event.inputConfig.partnerMetadata;
        if (input.event.inputConfig.satisfiesPzs !== undefined)
          requestBody.satisfiesPzs = input.event.inputConfig.satisfiesPzs;
        if (input.event.inputConfig.operationalStatus !== undefined)
          requestBody.operationalStatus =
            input.event.inputConfig.operationalStatus;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.cloudRouterIpv6Address !== undefined)
          requestBody.cloudRouterIpv6Address =
            input.event.inputConfig.cloudRouterIpv6Address;
        if (input.event.inputConfig.params !== undefined)
          requestBody.params = input.event.inputConfig.params;
        if (input.event.inputConfig.type !== undefined)
          requestBody.type = input.event.inputConfig.type;
        if (input.event.inputConfig.candidateSubnets !== undefined)
          requestBody.candidateSubnets =
            input.event.inputConfig.candidateSubnets;
        if (input.event.inputConfig.encryption !== undefined)
          requestBody.encryption = input.event.inputConfig.encryption;
        if (input.event.inputConfig.candidateIpv6Subnets !== undefined)
          requestBody.candidateIpv6Subnets =
            input.event.inputConfig.candidateIpv6Subnets;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.router !== undefined)
          requestBody.router = input.event.inputConfig.router;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.partnerAsn !== undefined)
          requestBody.partnerAsn = input.event.inputConfig.partnerAsn;
        if (input.event.inputConfig.cloudRouterIpv6InterfaceId !== undefined)
          requestBody.cloudRouterIpv6InterfaceId =
            input.event.inputConfig.cloudRouterIpv6InterfaceId;

        if (Object.keys(requestBody).length > 0) {
          requestOptions.body = JSON.stringify(requestBody);
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

export default interconnectAttachmentsInsert;
