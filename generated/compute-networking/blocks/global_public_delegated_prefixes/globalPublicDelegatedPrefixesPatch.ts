import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const globalPublicDelegatedPrefixesPatch: AppBlock = {
  name: "Global Public Delegated Prefixes - Patch",
  description: `Patches the specified global PublicDelegatedPrefix resource with the data included in the request.`,
  category: "Global Public Delegated Prefixes",
  inputs: {
    default: {
      config: {
        publicDelegatedPrefix: {
          name: "Public Delegated Prefix",
          description: "Name of the PublicDelegatedPrefix resource to patch.",
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
        isLiveMigration: {
          name: "Is Live Migration",
          description: "If true, the prefix will be live migrated.",
          type: "boolean",
          required: false,
        },
        byoipApiVersion: {
          name: "Byoip API Version",
          description: "[Output Only] The version of BYOIP API.",
          type: "string",
          required: false,
        },
        mode: {
          name: "Mode",
          description: "The public delegated prefix mode for IPv6 only.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for the resource.",
          type: "string",
          required: false,
        },
        publicDelegatedSubPrefixs: {
          name: "Public Delegated Sub Prefixs",
          description:
            "The list of sub public delegated prefixes that exist for this public delegated prefix.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                delegateeProject: {
                  type: "string",
                },
                ipCidrRange: {
                  type: "string",
                },
                status: {
                  type: "string",
                  enum: ["ACTIVE", "INACTIVE"],
                },
                region: {
                  type: "string",
                },
                allocatablePrefixLength: {
                  type: "number",
                },
                isAddress: {
                  type: "boolean",
                },
                mode: {
                  type: "string",
                  enum: [
                    "DELEGATION",
                    "EXTERNAL_IPV6_FORWARDING_RULE_CREATION",
                    "EXTERNAL_IPV6_SUBNETWORK_CREATION",
                    "INTERNAL_IPV6_SUBNETWORK_CREATION",
                  ],
                },
                description: {
                  type: "string",
                },
                ipv6AccessType: {
                  type: "string",
                  enum: ["EXTERNAL", "INTERNAL"],
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        status: {
          name: "Status",
          description:
            "[Output Only] The status of the public delegated prefix, which can be one of following values: - 'INITIALIZING' The public delegated prefix is being initialized and addresses cannot be created yet.",
          type: "string",
          required: false,
        },
        ipCidrRange: {
          name: "IP Cidr Range",
          description:
            "The IP address range, in CIDR format, represented by this public delegated prefix.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of the resource.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "Name of the resource.",
          type: "string",
          required: false,
        },
        fingerprint: {
          name: "Fingerprint",
          description: "Fingerprint of this resource.",
          type: "string",
          required: false,
        },
        region: {
          name: "Region",
          description:
            "[Output Only] URL of the region where the public delegated prefix resides.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        parentPrefix: {
          name: "Parent Prefix",
          description: "The URL of parent prefix.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description:
            "[Output Only] The unique identifier for the resource type.",
          type: "string",
          required: false,
        },
        allocatablePrefixLength: {
          name: "Allocatable Prefix Length",
          description:
            "The allocatable prefix length supported by this public delegated prefix.",
          type: "number",
          required: false,
        },
        ipv6AccessType: {
          name: "Ipv6 Access Type",
          description:
            "[Output Only] The internet access type for IPv6 Public Delegated Prefixes.",
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
        let path = `projects/{project}/global/publicDelegatedPrefixes/{publicDelegatedPrefix}`;

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

        if (input.event.inputConfig.isLiveMigration !== undefined)
          requestBody.isLiveMigration = input.event.inputConfig.isLiveMigration;
        if (input.event.inputConfig.byoipApiVersion !== undefined)
          requestBody.byoipApiVersion = input.event.inputConfig.byoipApiVersion;
        if (input.event.inputConfig.mode !== undefined)
          requestBody.mode = input.event.inputConfig.mode;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.publicDelegatedSubPrefixs !== undefined)
          requestBody.publicDelegatedSubPrefixs =
            input.event.inputConfig.publicDelegatedSubPrefixs;
        if (input.event.inputConfig.status !== undefined)
          requestBody.status = input.event.inputConfig.status;
        if (input.event.inputConfig.ipCidrRange !== undefined)
          requestBody.ipCidrRange = input.event.inputConfig.ipCidrRange;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.fingerprint !== undefined)
          requestBody.fingerprint = input.event.inputConfig.fingerprint;
        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.parentPrefix !== undefined)
          requestBody.parentPrefix = input.event.inputConfig.parentPrefix;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.allocatablePrefixLength !== undefined)
          requestBody.allocatablePrefixLength =
            input.event.inputConfig.allocatablePrefixLength;
        if (input.event.inputConfig.ipv6AccessType !== undefined)
          requestBody.ipv6AccessType = input.event.inputConfig.ipv6AccessType;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;

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

export default globalPublicDelegatedPrefixesPatch;
