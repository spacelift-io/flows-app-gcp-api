import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const forwardingRulesPatch: AppBlock = {
  name: "Forwarding Rules - Patch",
  description: `Updates the specified forwarding rule with the data included in the request.`,
  category: "Forwarding Rules",
  inputs: {
    default: {
      config: {
        forwardingRule: {
          name: "Forwarding Rule",
          description: "Name of the ForwardingRule resource to patch.",
          type: "string",
          required: true,
        },
        region: {
          name: "Region",
          description:
            "[Output Only] URL of the region where the regional forwarding rule resides.",
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
        ports: {
          name: "Ports",
          description:
            "The ports, portRange, and allPorts fields are mutually exclusive.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        target: {
          name: "Target",
          description:
            "The URL of the target resource to receive the matched traffic.",
          type: "string",
          required: false,
        },
        externalManagedBackendBucketMigrationTestingPercentage: {
          name: "External Managed Backend Bucket Migration Testing Percentage",
          description:
            "Determines the fraction of requests to backend buckets that should be processed by the global external Application Load Balancer.",
          type: "number",
          required: false,
        },
        allPorts: {
          name: "All Ports",
          description:
            "The ports, portRange, and allPorts fields are mutually exclusive.",
          type: "boolean",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        IPProtocol: {
          name: "IP Protocol",
          description: "The IP protocol to which this rule applies.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of the resource.",
          type: "string",
          required: false,
        },
        network: {
          name: "Network",
          description:
            "This field is not used for global external load balancing.",
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
        serviceLabel: {
          name: "Service Label",
          description:
            "An optional prefix to the service name for this forwarding rule.",
          type: "string",
          required: false,
        },
        backendService: {
          name: "Backend Service",
          description:
            "Identifies the backend service to which the forwarding rule sends traffic.",
          type: "string",
          required: false,
        },
        sourceIpRanges: {
          name: "Source IP Ranges",
          description:
            "If not empty, this forwarding rule will only forward the traffic when the source IP address matches one of the IP addresses or CIDR ranges set here.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        serviceDirectoryRegistrations: {
          name: "Service Directory Registrations",
          description:
            "Service Directory resources to register this forwarding rule with.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                namespace: {
                  type: "string",
                },
                service: {
                  type: "string",
                },
                serviceDirectoryRegion: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        baseForwardingRule: {
          name: "Base Forwarding Rule",
          description:
            "[Output Only] The URL for the corresponding base forwarding rule.",
          type: "string",
          required: false,
        },
        allowGlobalAccess: {
          name: "Allow Global Access",
          description:
            "If set to true, clients can access the internal passthrough Network Load Balancers, the regional internal Application Load Balancer, and the regional internal proxy Network Load Balancer from all regions.",
          type: "boolean",
          required: false,
        },
        noAutomateDnsZone: {
          name: "No Automate DNS Zone",
          description:
            "This is used in PSC consumer ForwardingRule to control whether it should try to auto-generate a DNS zone or not.",
          type: "boolean",
          required: false,
        },
        isMirroringCollector: {
          name: "Is Mirroring Collector",
          description:
            "Indicates whether or not this load balancer can be used as a collector for packet mirroring.",
          type: "boolean",
          required: false,
        },
        subnetwork: {
          name: "Subnetwork",
          description:
            "This field identifies the subnetwork that the load balanced IP should belong to for this forwarding rule, used with internal load balancers and external passthrough Network Load Balancers with IPv6.",
          type: "string",
          required: false,
        },
        pscConnectionStatus: {
          name: "Psc Connection Status",
          description: "Request body field: pscConnectionStatus",
          type: "string",
          required: false,
        },
        networkTier: {
          name: "Network Tier",
          description:
            "This signifies the networking tier used for configuring this load balancer and can only take the following values:PREMIUM, STANDARD.",
          type: "string",
          required: false,
        },
        allowPscGlobalAccess: {
          name: "Allow Psc Global Access",
          description:
            "This is used in PSC consumer ForwardingRule to control whether the PSC endpoint can be accessed from another region.",
          type: "boolean",
          required: false,
        },
        portRange: {
          name: "Port Range",
          description:
            "The ports, portRange, and allPorts fields are mutually exclusive.",
          type: "string",
          required: false,
        },
        labelFingerprint: {
          name: "Label Fingerprint",
          description:
            "A fingerprint for the labels being applied to this resource, which is essentially a hash of the labels set used for optimistic locking.",
          type: "string",
          required: false,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] Creation timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
          type: "string",
          required: false,
        },
        loadBalancingScheme: {
          name: "Load Balancing Scheme",
          description: "Specifies the forwarding rule type.",
          type: "string",
          required: false,
        },
        selfLinkWithId: {
          name: "Self Link With ID",
          description:
            "[Output Only] Server-defined URL for this resource with the resource id.",
          type: "string",
          required: false,
        },
        IPAddress: {
          name: "IP Address",
          description:
            "IP address for which this forwarding rule accepts traffic.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for the resource.",
          type: "string",
          required: false,
        },
        serviceName: {
          name: "Service Name",
          description:
            "[Output Only] The internal fully qualified service name for this forwarding rule.",
          type: "string",
          required: false,
        },
        fingerprint: {
          name: "Fingerprint",
          description: "Fingerprint of this resource.",
          type: "string",
          required: false,
        },
        metadataFilters: {
          name: "Metadata Filters",
          description:
            "Opaque filter criteria used by load balancer to restrict routing configuration to a limited set of xDS compliant clients.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                filterMatchCriteria: {
                  type: "string",
                  enum: ["MATCH_ALL", "MATCH_ANY", "NOT_SET"],
                },
                filterLabels: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        name: {
          name: "Name",
          description:
            "Name of the resource; provided by the client when the resource is created.",
          type: "string",
          required: false,
        },
        ipCollection: {
          name: "IP Collection",
          description: "Resource reference of a PublicDelegatedPrefix.",
          type: "string",
          required: false,
        },
        pscConnectionId: {
          name: "Psc Connection ID",
          description:
            "[Output Only] The PSC connection id of the PSC forwarding rule.",
          type: "string",
          required: false,
        },
        ipVersion: {
          name: "IP Version",
          description:
            "The IP Version that will be used by this forwarding rule.",
          type: "string",
          required: false,
        },
        externalManagedBackendBucketMigrationState: {
          name: "External Managed Backend Bucket Migration State",
          description:
            "Specifies the canary migration state for the backend buckets attached to this forwarding rule.",
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
        let path = `projects/{project}/regions/{region}/forwardingRules/{forwardingRule}`;

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

        if (input.event.inputConfig.ports !== undefined)
          requestBody.ports = input.event.inputConfig.ports;
        if (input.event.inputConfig.target !== undefined)
          requestBody.target = input.event.inputConfig.target;
        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (
          input.event.inputConfig
            .externalManagedBackendBucketMigrationTestingPercentage !==
          undefined
        )
          requestBody.externalManagedBackendBucketMigrationTestingPercentage =
            input.event.inputConfig.externalManagedBackendBucketMigrationTestingPercentage;
        if (input.event.inputConfig.allPorts !== undefined)
          requestBody.allPorts = input.event.inputConfig.allPorts;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.IPProtocol !== undefined)
          requestBody.IPProtocol = input.event.inputConfig.IPProtocol;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.network !== undefined)
          requestBody.network = input.event.inputConfig.network;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.serviceLabel !== undefined)
          requestBody.serviceLabel = input.event.inputConfig.serviceLabel;
        if (input.event.inputConfig.backendService !== undefined)
          requestBody.backendService = input.event.inputConfig.backendService;
        if (input.event.inputConfig.sourceIpRanges !== undefined)
          requestBody.sourceIpRanges = input.event.inputConfig.sourceIpRanges;
        if (input.event.inputConfig.serviceDirectoryRegistrations !== undefined)
          requestBody.serviceDirectoryRegistrations =
            input.event.inputConfig.serviceDirectoryRegistrations;
        if (input.event.inputConfig.baseForwardingRule !== undefined)
          requestBody.baseForwardingRule =
            input.event.inputConfig.baseForwardingRule;
        if (input.event.inputConfig.allowGlobalAccess !== undefined)
          requestBody.allowGlobalAccess =
            input.event.inputConfig.allowGlobalAccess;
        if (input.event.inputConfig.noAutomateDnsZone !== undefined)
          requestBody.noAutomateDnsZone =
            input.event.inputConfig.noAutomateDnsZone;
        if (input.event.inputConfig.isMirroringCollector !== undefined)
          requestBody.isMirroringCollector =
            input.event.inputConfig.isMirroringCollector;
        if (input.event.inputConfig.subnetwork !== undefined)
          requestBody.subnetwork = input.event.inputConfig.subnetwork;
        if (input.event.inputConfig.pscConnectionStatus !== undefined)
          requestBody.pscConnectionStatus =
            input.event.inputConfig.pscConnectionStatus;
        if (input.event.inputConfig.networkTier !== undefined)
          requestBody.networkTier = input.event.inputConfig.networkTier;
        if (input.event.inputConfig.allowPscGlobalAccess !== undefined)
          requestBody.allowPscGlobalAccess =
            input.event.inputConfig.allowPscGlobalAccess;
        if (input.event.inputConfig.portRange !== undefined)
          requestBody.portRange = input.event.inputConfig.portRange;
        if (input.event.inputConfig.labelFingerprint !== undefined)
          requestBody.labelFingerprint =
            input.event.inputConfig.labelFingerprint;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.loadBalancingScheme !== undefined)
          requestBody.loadBalancingScheme =
            input.event.inputConfig.loadBalancingScheme;
        if (input.event.inputConfig.selfLinkWithId !== undefined)
          requestBody.selfLinkWithId = input.event.inputConfig.selfLinkWithId;
        if (input.event.inputConfig.IPAddress !== undefined)
          requestBody.IPAddress = input.event.inputConfig.IPAddress;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.serviceName !== undefined)
          requestBody.serviceName = input.event.inputConfig.serviceName;
        if (input.event.inputConfig.fingerprint !== undefined)
          requestBody.fingerprint = input.event.inputConfig.fingerprint;
        if (input.event.inputConfig.metadataFilters !== undefined)
          requestBody.metadataFilters = input.event.inputConfig.metadataFilters;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.ipCollection !== undefined)
          requestBody.ipCollection = input.event.inputConfig.ipCollection;
        if (input.event.inputConfig.pscConnectionId !== undefined)
          requestBody.pscConnectionId = input.event.inputConfig.pscConnectionId;
        if (input.event.inputConfig.ipVersion !== undefined)
          requestBody.ipVersion = input.event.inputConfig.ipVersion;
        if (
          input.event.inputConfig.externalManagedBackendBucketMigrationState !==
          undefined
        )
          requestBody.externalManagedBackendBucketMigrationState =
            input.event.inputConfig.externalManagedBackendBucketMigrationState;

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

export default forwardingRulesPatch;
