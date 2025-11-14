import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const resourcePoliciesInsert: AppBlock = {
  name: "Resource Policies - Insert",
  description: `Creates a new resource policy.`,
  category: "Resource Policies",
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
        region: {
          name: "Region",
          description: "Name of the region for this request.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Represents a Resource Policy resource. You can use resource policies to\nschedule actions for some Compute Engine resources. For example, you can\nuse them toschedule persistent disk\nsnapshots.",
          type: {
            type: "object",
            properties: {
              groupPlacementPolicy: {
                type: "object",
                properties: {
                  vmCount: {
                    type: "number",
                  },
                  collocation: {
                    type: "string",
                    enum: ["COLLOCATED", "UNSPECIFIED_COLLOCATION"],
                  },
                  availabilityDomainCount: {
                    type: "number",
                  },
                  gpuTopology: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              description: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              status: {
                type: "string",
                enum: ["CREATING", "DELETING", "EXPIRED", "INVALID", "READY"],
              },
              snapshotSchedulePolicy: {
                type: "object",
                properties: {
                  snapshotProperties: {
                    type: "object",
                    additionalProperties: true,
                  },
                  retentionPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  schedule: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              name: {
                type: "string",
              },
              region: {
                type: "string",
              },
              id: {
                type: "string",
              },
              instanceSchedulePolicy: {
                type: "object",
                properties: {
                  timeZone: {
                    type: "string",
                  },
                  expirationTime: {
                    type: "string",
                  },
                  startTime: {
                    type: "string",
                  },
                  vmStopSchedule: {
                    type: "object",
                    additionalProperties: true,
                  },
                  vmStartSchedule: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              creationTimestamp: {
                type: "string",
              },
              diskConsistencyGroupPolicy: {
                type: "object",
                properties: {},
                additionalProperties: true,
              },
              workloadPolicy: {
                type: "object",
                properties: {
                  acceleratorTopology: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                    enum: ["HIGH_AVAILABILITY", "HIGH_THROUGHPUT"],
                  },
                  maxTopologyDistance: {
                    type: "string",
                    enum: ["BLOCK", "CLUSTER", "SUBBLOCK"],
                  },
                },
                additionalProperties: true,
              },
              resourceStatus: {
                type: "object",
                properties: {
                  instanceSchedulePolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              selfLink: {
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
        const path = `projects/{project}/regions/{region}/resourcePolicies`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
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

export default resourcePoliciesInsert;
