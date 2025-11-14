import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const interconnectsPatch: AppBlock = {
  name: "Interconnects - Patch",
  description: `Updates the specified Interconnect with the data included in the request.`,
  category: "Interconnects",
  inputs: {
    default: {
      config: {
        interconnect: {
          name: "Interconnect",
          description: "Name of the interconnect to update.",
          type: "string",
          required: true,
        },
        requestId: {
          name: "Request ID",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        location: {
          name: "Location",
          description:
            "URL of the InterconnectLocation object that represents where this connection is to be provisioned.",
          type: "string",
          required: false,
        },
        applicationAwareInterconnect: {
          name: "Application Aware Interconnect",
          description:
            "Configuration information for application awareness on this Cloud Interconnect.",
          type: {
            type: "object",
            properties: {
              profileDescription: {
                type: "string",
              },
              strictPriorityPolicy: {
                type: "object",
                properties: {},
                additionalProperties: true,
              },
              bandwidthPercentagePolicy: {
                type: "object",
                properties: {
                  bandwidthPercentages: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
          required: false,
        },
        requestedFeatures: {
          name: "Requested Features",
          description: "Optional.",
          type: {
            type: "array",
            items: {
              type: "string",
              enum: ["IF_CROSS_SITE_NETWORK", "IF_L2_FORWARDING", "IF_MACSEC"],
            },
          },
          required: false,
        },
        provisionedLinkCount: {
          name: "Provisioned Link Count",
          description:
            "[Output Only] Number of links actually provisioned in this interconnect.",
          type: "number",
          required: false,
        },
        customerName: {
          name: "Customer Name",
          description:
            "Customer name, to put in the Letter of Authorization as the party authorized to request a crossconnect.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for the resource.",
          type: "string",
          required: false,
        },
        peerIpAddress: {
          name: "Peer IP Address",
          description:
            "[Output Only] IP address configured on the customer side of the Interconnect link.",
          type: "string",
          required: false,
        },
        operationalStatus: {
          name: "Operational Status",
          description:
            "[Output Only] The current status of this Interconnect's functionality, which can take one of the following values: - OS_ACTIVE: A valid Interconnect, which is turned up and is ready to use.",
          type: "string",
          required: false,
        },
        macsec: {
          name: "Macsec",
          description:
            "Configuration that enables Media Access Control security (MACsec) on the Cloud Interconnect connection between Google and your on-premises router.",
          type: {
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
          required: false,
        },
        state: {
          name: "State",
          description:
            "[Output Only] The current state of Interconnect functionality, which can take one of the following values: - ACTIVE: The Interconnect is valid, turned up and ready to use.",
          type: "string",
          required: false,
        },
        availableFeatures: {
          name: "Available Features",
          description:
            "[Output only] List of features available for this Interconnect connection, which can take one of the following values: - IF_MACSEC: If present, then the Interconnect connection is provisioned on MACsec capable hardware ports.",
          type: {
            type: "array",
            items: {
              type: "string",
              enum: ["IF_CROSS_SITE_NETWORK", "IF_L2_FORWARDING", "IF_MACSEC"],
            },
          },
          required: false,
        },
        googleReferenceId: {
          name: "Google Reference ID",
          description:
            "[Output Only] Google reference ID to be used when raising support tickets with Google or otherwise to debug backend connectivity issues.",
          type: "string",
          required: false,
        },
        subzone: {
          name: "Subzone",
          description:
            "Specific subzone in the InterconnectLocation that represents where this connection is to be provisioned.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "Name of the resource.",
          type: "string",
          required: false,
        },
        satisfiesPzs: {
          name: "Satisfies Pzs",
          description: "[Output Only] Reserved for future use.",
          type: "boolean",
          required: false,
        },
        remoteLocation: {
          name: "Remote Location",
          description: "Indicates that this is a Cross-Cloud Interconnect.",
          type: "string",
          required: false,
        },
        requestedLinkCount: {
          name: "Requested Link Count",
          description:
            "Target number of physical links in the link bundle, as requested by the customer.",
          type: "number",
          required: false,
        },
        interconnectAttachments: {
          name: "Interconnect Attachments",
          description:
            "[Output Only] A list of the URLs of all InterconnectAttachments configured to use this Interconnect.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
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
        adminEnabled: {
          name: "Admin Enabled",
          description: "Administrative status of the interconnect.",
          type: "boolean",
          required: false,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] Creation timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        expectedOutages: {
          name: "Expected Outages",
          description:
            "[Output Only] A list of outages expected for this Interconnect.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                startTime: {
                  type: "string",
                },
                source: {
                  type: "string",
                  enum: ["GOOGLE", "NSRC_GOOGLE"],
                },
                affectedCircuits: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                description: {
                  type: "string",
                },
                state: {
                  type: "string",
                  enum: [
                    "ACTIVE",
                    "CANCELLED",
                    "COMPLETED",
                    "NS_ACTIVE",
                    "NS_CANCELED",
                  ],
                },
                issueType: {
                  type: "string",
                  enum: [
                    "IT_OUTAGE",
                    "IT_PARTIAL_OUTAGE",
                    "OUTAGE",
                    "PARTIAL_OUTAGE",
                  ],
                },
                name: {
                  type: "string",
                },
                endTime: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        interconnectGroups: {
          name: "Interconnect Groups",
          description:
            "[Output Only] URLs of InterconnectGroups that include this Interconnect.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        aaiEnabled: {
          name: "Aai Enabled",
          description:
            "Enable or disable the application awareness feature on this Cloud Interconnect.",
          type: "boolean",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        googleIpAddress: {
          name: "Google IP Address",
          description:
            "[Output Only] IP address configured on the Google side of the Interconnect link.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
          type: "string",
          required: false,
        },
        circuitInfos: {
          name: "Circuit Infos",
          description:
            "[Output Only] A list of CircuitInfo objects, that describe the individual circuits in this LAG.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                customerDemarcId: {
                  type: "string",
                },
                googleDemarcId: {
                  type: "string",
                },
                googleCircuitId: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
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
        nocContactEmail: {
          name: "Noc Contact Email",
          description:
            "Email address to contact the customer NOC for operations and maintenance notifications regarding this Interconnect.",
          type: "string",
          required: false,
        },
        wireGroups: {
          name: "Wire Groups",
          description:
            "[Output Only] A list of the URLs of all CrossSiteNetwork WireGroups configured to use this Interconnect.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        macsecEnabled: {
          name: "Macsec Enabled",
          description:
            "Enable or disable MACsec on this Interconnect connection.",
          type: "boolean",
          required: false,
        },
        labelFingerprint: {
          name: "Label Fingerprint",
          description:
            "A fingerprint for the labels being applied to this Interconnect, which is essentially a hash of the labels set used for optimistic locking.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of the resource.",
          type: "string",
          required: false,
        },
        linkType: {
          name: "Link Type",
          description:
            "Type of link requested, which can take one of the following values: - LINK_TYPE_ETHERNET_10G_LR: A 10G Ethernet with LR optics - LINK_TYPE_ETHERNET_100G_LR: A 100G Ethernet with LR optics.",
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
        let path = `projects/{project}/global/interconnects/{interconnect}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.location !== undefined)
          requestBody.location = input.event.inputConfig.location;
        if (input.event.inputConfig.applicationAwareInterconnect !== undefined)
          requestBody.applicationAwareInterconnect =
            input.event.inputConfig.applicationAwareInterconnect;
        if (input.event.inputConfig.requestedFeatures !== undefined)
          requestBody.requestedFeatures =
            input.event.inputConfig.requestedFeatures;
        if (input.event.inputConfig.provisionedLinkCount !== undefined)
          requestBody.provisionedLinkCount =
            input.event.inputConfig.provisionedLinkCount;
        if (input.event.inputConfig.customerName !== undefined)
          requestBody.customerName = input.event.inputConfig.customerName;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.peerIpAddress !== undefined)
          requestBody.peerIpAddress = input.event.inputConfig.peerIpAddress;
        if (input.event.inputConfig.operationalStatus !== undefined)
          requestBody.operationalStatus =
            input.event.inputConfig.operationalStatus;
        if (input.event.inputConfig.macsec !== undefined)
          requestBody.macsec = input.event.inputConfig.macsec;
        if (input.event.inputConfig.state !== undefined)
          requestBody.state = input.event.inputConfig.state;
        if (input.event.inputConfig.availableFeatures !== undefined)
          requestBody.availableFeatures =
            input.event.inputConfig.availableFeatures;
        if (input.event.inputConfig.googleReferenceId !== undefined)
          requestBody.googleReferenceId =
            input.event.inputConfig.googleReferenceId;
        if (input.event.inputConfig.subzone !== undefined)
          requestBody.subzone = input.event.inputConfig.subzone;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.satisfiesPzs !== undefined)
          requestBody.satisfiesPzs = input.event.inputConfig.satisfiesPzs;
        if (input.event.inputConfig.remoteLocation !== undefined)
          requestBody.remoteLocation = input.event.inputConfig.remoteLocation;
        if (input.event.inputConfig.requestedLinkCount !== undefined)
          requestBody.requestedLinkCount =
            input.event.inputConfig.requestedLinkCount;
        if (input.event.inputConfig.interconnectAttachments !== undefined)
          requestBody.interconnectAttachments =
            input.event.inputConfig.interconnectAttachments;
        if (input.event.inputConfig.params !== undefined)
          requestBody.params = input.event.inputConfig.params;
        if (input.event.inputConfig.adminEnabled !== undefined)
          requestBody.adminEnabled = input.event.inputConfig.adminEnabled;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.expectedOutages !== undefined)
          requestBody.expectedOutages = input.event.inputConfig.expectedOutages;
        if (input.event.inputConfig.interconnectGroups !== undefined)
          requestBody.interconnectGroups =
            input.event.inputConfig.interconnectGroups;
        if (input.event.inputConfig.aaiEnabled !== undefined)
          requestBody.aaiEnabled = input.event.inputConfig.aaiEnabled;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.googleIpAddress !== undefined)
          requestBody.googleIpAddress = input.event.inputConfig.googleIpAddress;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.circuitInfos !== undefined)
          requestBody.circuitInfos = input.event.inputConfig.circuitInfos;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.nocContactEmail !== undefined)
          requestBody.nocContactEmail = input.event.inputConfig.nocContactEmail;
        if (input.event.inputConfig.wireGroups !== undefined)
          requestBody.wireGroups = input.event.inputConfig.wireGroups;
        if (input.event.inputConfig.macsecEnabled !== undefined)
          requestBody.macsecEnabled = input.event.inputConfig.macsecEnabled;
        if (input.event.inputConfig.labelFingerprint !== undefined)
          requestBody.labelFingerprint =
            input.event.inputConfig.labelFingerprint;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.linkType !== undefined)
          requestBody.linkType = input.event.inputConfig.linkType;

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

export default interconnectsPatch;
