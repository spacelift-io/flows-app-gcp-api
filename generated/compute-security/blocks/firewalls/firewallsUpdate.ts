import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const firewallsUpdate: AppBlock = {
  name: "Firewalls - Update",
  description: `Updates the specified firewall rule with the data included in the request.`,
  category: "Firewalls",
  inputs: {
    default: {
      config: {
        firewall: {
          name: "Firewall",
          description: "Name of the firewall rule to update.",
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
        direction: {
          name: "Direction",
          description:
            "Direction of traffic to which this firewall applies, either 'INGRESS' or 'EGRESS'.",
          type: "string",
          required: false,
        },
        sourceServiceAccounts: {
          name: "Source Service Accounts",
          description:
            "If source service accounts are specified, the firewall rules apply only to traffic originating from an instance with a service account in this list.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
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
        sourceTags: {
          name: "Source Tags",
          description:
            "If source tags are specified, the firewall rule applies only to traffic with source IPs that match the primary network interfaces of VM instances that have the tag and are in the same VPC network.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        targetTags: {
          name: "Target Tags",
          description:
            "A list of tags that controls which instances the firewall rule applies to.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for the resource.",
          type: "string",
          required: false,
        },
        network: {
          name: "Network",
          description: "URL of the network resource for this firewall rule.",
          type: "string",
          required: false,
        },
        disabled: {
          name: "Disabled",
          description: "Denotes whether the firewall rule is disabled.",
          type: "boolean",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of the resource.",
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
        logConfig: {
          name: "Log Config",
          description:
            "This field denotes the logging options for a particular firewall rule.",
          type: {
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
          required: false,
        },
        destinationRanges: {
          name: "Destination Ranges",
          description:
            "If destination ranges are specified, the firewall rule applies only to traffic that has destination IP address in these ranges.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        sourceRanges: {
          name: "Source Ranges",
          description:
            "If source ranges are specified, the firewall rule applies only to traffic that has a source IP address in these ranges.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        denied: {
          name: "Denied",
          description: "The list of DENY rules specified by this firewall.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                ports: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                IPProtocol: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        targetServiceAccounts: {
          name: "Target Service Accounts",
          description:
            "A list of service accounts indicating sets of instances located in the network that may make network connections as specified inallowed[].",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        allowed: {
          name: "Allowed",
          description: "The list of ALLOW rules specified by this firewall.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                ports: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                IPProtocol: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        priority: {
          name: "Priority",
          description: "Priority for this rule.",
          type: "number",
          required: false,
        },
        name: {
          name: "Name",
          description:
            "Name of the resource; provided by the client when the resource is created.",
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
        let path = `projects/{project}/global/firewalls/{firewall}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.direction !== undefined)
          requestBody.direction = input.event.inputConfig.direction;
        if (input.event.inputConfig.sourceServiceAccounts !== undefined)
          requestBody.sourceServiceAccounts =
            input.event.inputConfig.sourceServiceAccounts;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.sourceTags !== undefined)
          requestBody.sourceTags = input.event.inputConfig.sourceTags;
        if (input.event.inputConfig.targetTags !== undefined)
          requestBody.targetTags = input.event.inputConfig.targetTags;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.network !== undefined)
          requestBody.network = input.event.inputConfig.network;
        if (input.event.inputConfig.disabled !== undefined)
          requestBody.disabled = input.event.inputConfig.disabled;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.params !== undefined)
          requestBody.params = input.event.inputConfig.params;
        if (input.event.inputConfig.logConfig !== undefined)
          requestBody.logConfig = input.event.inputConfig.logConfig;
        if (input.event.inputConfig.destinationRanges !== undefined)
          requestBody.destinationRanges =
            input.event.inputConfig.destinationRanges;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.sourceRanges !== undefined)
          requestBody.sourceRanges = input.event.inputConfig.sourceRanges;
        if (input.event.inputConfig.denied !== undefined)
          requestBody.denied = input.event.inputConfig.denied;
        if (input.event.inputConfig.targetServiceAccounts !== undefined)
          requestBody.targetServiceAccounts =
            input.event.inputConfig.targetServiceAccounts;
        if (input.event.inputConfig.allowed !== undefined)
          requestBody.allowed = input.event.inputConfig.allowed;
        if (input.event.inputConfig.priority !== undefined)
          requestBody.priority = input.event.inputConfig.priority;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;

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

export default firewallsUpdate;
