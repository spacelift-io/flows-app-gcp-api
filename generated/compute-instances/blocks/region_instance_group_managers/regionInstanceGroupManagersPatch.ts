import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const regionInstanceGroupManagersPatch: AppBlock = {
  name: "Region Instance Group Managers - Patch",
  description: `Updates a managed instance group using the information that you specify in the request.`,
  category: "Region Instance Group Managers",
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
        instanceGroupManager: {
          name: "InstanceGroupManager",
          description: "The name of the instance group manager.",
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
            "Represents a Managed Instance Group resource.\n\nAn instance group is a collection of VM instances that you can manage as a\nsingle entity. For more information, readInstance groups.\n\nFor zonal Managed Instance Group, use the instanceGroupManagers\nresource.\n\nFor regional Managed Instance Group, use theregionInstanceGroupManagers resource.",
          type: {
            type: "object",
            properties: {
              updatePolicy: {
                type: "object",
                properties: {
                  maxSurge: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxUnavailable: {
                    type: "object",
                    additionalProperties: true,
                  },
                  replacementMethod: {
                    type: "string",
                    enum: ["RECREATE", "SUBSTITUTE"],
                  },
                  minimalAction: {
                    type: "string",
                    enum: ["NONE", "REFRESH", "REPLACE", "RESTART"],
                  },
                  mostDisruptiveAllowedAction: {
                    type: "string",
                    enum: ["NONE", "REFRESH", "REPLACE", "RESTART"],
                  },
                  type: {
                    type: "string",
                    enum: ["OPPORTUNISTIC", "PROACTIVE"],
                  },
                  instanceRedistributionType: {
                    type: "string",
                    enum: ["NONE", "PROACTIVE"],
                  },
                },
                additionalProperties: true,
              },
              allInstancesConfig: {
                type: "object",
                properties: {
                  properties: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              instanceLifecyclePolicy: {
                type: "object",
                properties: {
                  defaultActionOnFailure: {
                    type: "string",
                    enum: ["DO_NOTHING", "REPAIR"],
                  },
                  forceUpdateOnRepair: {
                    type: "string",
                    enum: ["NO", "YES"],
                  },
                },
                additionalProperties: true,
              },
              kind: {
                type: "string",
              },
              description: {
                type: "string",
              },
              targetSize: {
                type: "number",
              },
              autoHealingPolicies: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    healthCheck: {
                      type: "object",
                      additionalProperties: true,
                    },
                    initialDelaySec: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              targetSuspendedSize: {
                type: "number",
              },
              region: {
                type: "string",
              },
              currentActions: {
                type: "object",
                properties: {
                  deleting: {
                    type: "number",
                  },
                  starting: {
                    type: "number",
                  },
                  refreshing: {
                    type: "number",
                  },
                  creating: {
                    type: "number",
                  },
                  suspending: {
                    type: "number",
                  },
                  stopping: {
                    type: "number",
                  },
                  none: {
                    type: "number",
                  },
                  verifying: {
                    type: "number",
                  },
                  restarting: {
                    type: "number",
                  },
                  resuming: {
                    type: "number",
                  },
                  recreating: {
                    type: "number",
                  },
                  abandoning: {
                    type: "number",
                  },
                  creatingWithoutRetries: {
                    type: "number",
                  },
                },
                additionalProperties: true,
              },
              zone: {
                type: "string",
              },
              standbyPolicy: {
                type: "object",
                properties: {
                  mode: {
                    type: "string",
                    enum: ["MANUAL", "SCALE_OUT_POOL"],
                  },
                  initialDelaySec: {
                    type: "number",
                  },
                },
                additionalProperties: true,
              },
              resourcePolicies: {
                type: "object",
                properties: {
                  workloadPolicy: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              instanceFlexibilityPolicy: {
                type: "object",
                properties: {
                  instanceSelections: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              baseInstanceName: {
                type: "string",
              },
              targetPools: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              statefulPolicy: {
                type: "object",
                properties: {
                  preservedState: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              selfLink: {
                type: "string",
              },
              instanceGroup: {
                type: "string",
              },
              distributionPolicy: {
                type: "object",
                properties: {
                  zones: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  targetShape: {
                    type: "string",
                    enum: ["ANY", "ANY_SINGLE_ZONE", "BALANCED", "EVEN"],
                  },
                },
                additionalProperties: true,
              },
              instanceTemplate: {
                type: "string",
              },
              listManagedInstancesResults: {
                type: "string",
                enum: ["PAGELESS", "PAGINATED"],
              },
              status: {
                type: "object",
                properties: {
                  isStable: {
                    type: "boolean",
                  },
                  stateful: {
                    type: "object",
                    additionalProperties: true,
                  },
                  versionTarget: {
                    type: "object",
                    additionalProperties: true,
                  },
                  allInstancesConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  autoscaler: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              satisfiesPzi: {
                type: "boolean",
              },
              satisfiesPzs: {
                type: "boolean",
              },
              targetStoppedSize: {
                type: "number",
              },
              name: {
                type: "string",
              },
              fingerprint: {
                type: "string",
              },
              creationTimestamp: {
                type: "string",
              },
              namedPorts: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    port: {
                      type: "object",
                      additionalProperties: true,
                    },
                    name: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              id: {
                type: "string",
              },
              versions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    instanceTemplate: {
                      type: "object",
                      additionalProperties: true,
                    },
                    name: {
                      type: "object",
                      additionalProperties: true,
                    },
                    targetSize: {
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
        const path = `projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}`;
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

export default regionInstanceGroupManagersPatch;
