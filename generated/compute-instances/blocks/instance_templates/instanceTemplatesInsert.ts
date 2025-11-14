import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instanceTemplatesInsert: AppBlock = {
  name: "Instance Templates - Insert",
  description: `Creates an instance template in the specified project using the data that is included in the request.`,
  category: "Instance Templates",
  inputs: {
    default: {
      config: {
        requestId: {
          name: "Request ID",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        sourceInstanceParams: {
          name: "Source Instance Params",
          description:
            "The source instance params to use to create this instance template.",
          type: {
            type: "object",
            properties: {
              diskConfigs: {
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
        selfLink: {
          name: "Self Link",
          description: "[Output Only] The URL for this instance template.",
          type: "string",
          required: false,
        },
        properties: {
          name: "Properties",
          description: "The instance properties for this instance template.",
          type: {
            type: "object",
            properties: {
              networkInterfaces: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              canIpForward: {
                type: "boolean",
              },
              networkPerformanceConfig: {
                type: "object",
                properties: {
                  totalEgressBandwidthTier: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              labels: {
                type: "object",
                additionalProperties: true,
              },
              description: {
                type: "string",
              },
              privateIpv6GoogleAccess: {
                type: "string",
                enum: [
                  "ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE",
                  "ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE",
                  "INHERIT_FROM_SUBNETWORK",
                ],
              },
              guestAccelerators: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              serviceAccounts: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              machineType: {
                type: "string",
              },
              resourcePolicies: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              disks: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              confidentialInstanceConfig: {
                type: "object",
                properties: {
                  enableConfidentialCompute: {
                    type: "object",
                    additionalProperties: true,
                  },
                  confidentialInstanceType: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              advancedMachineFeatures: {
                type: "object",
                properties: {
                  performanceMonitoringUnit: {
                    type: "object",
                    additionalProperties: true,
                  },
                  visibleCoreCount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  threadsPerCore: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableNestedVirtualization: {
                    type: "object",
                    additionalProperties: true,
                  },
                  turboMode: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableUefiNetworking: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              resourceManagerTags: {
                type: "object",
                additionalProperties: true,
              },
              keyRevocationActionType: {
                type: "string",
                enum: [
                  "KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED",
                  "NONE",
                  "STOP",
                ],
              },
              reservationAffinity: {
                type: "object",
                properties: {
                  consumeReservationType: {
                    type: "object",
                    additionalProperties: true,
                  },
                  values: {
                    type: "object",
                    additionalProperties: true,
                  },
                  key: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              metadata: {
                type: "object",
                properties: {
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                  fingerprint: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              shieldedInstanceConfig: {
                type: "object",
                properties: {
                  enableSecureBoot: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableIntegrityMonitoring: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableVtpm: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              minCpuPlatform: {
                type: "string",
              },
              scheduling: {
                type: "object",
                properties: {
                  terminationTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  locationHint: {
                    type: "object",
                    additionalProperties: true,
                  },
                  onHostMaintenance: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxRunDuration: {
                    type: "object",
                    additionalProperties: true,
                  },
                  hostErrorTimeoutSeconds: {
                    type: "object",
                    additionalProperties: true,
                  },
                  instanceTerminationAction: {
                    type: "object",
                    additionalProperties: true,
                  },
                  onInstanceStopAction: {
                    type: "object",
                    additionalProperties: true,
                  },
                  provisioningModel: {
                    type: "object",
                    additionalProperties: true,
                  },
                  skipGuestOsShutdown: {
                    type: "object",
                    additionalProperties: true,
                  },
                  preemptible: {
                    type: "object",
                    additionalProperties: true,
                  },
                  availabilityDomain: {
                    type: "object",
                    additionalProperties: true,
                  },
                  localSsdRecoveryTimeout: {
                    type: "object",
                    additionalProperties: true,
                  },
                  minNodeCpus: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nodeAffinities: {
                    type: "object",
                    additionalProperties: true,
                  },
                  automaticRestart: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              tags: {
                type: "object",
                properties: {
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                  fingerprint: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        region: {
          name: "Region",
          description:
            "[Output Only] URL of the region where the instance template resides.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description:
            "[Output Only] A unique identifier for this instance template.",
          type: "string",
          required: false,
        },
        sourceInstance: {
          name: "Source Instance",
          description: "The source instance used to create the template.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description:
            "[Output Only] The resource type, which is alwayscompute#instanceTemplate for instance templates.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description:
            "Name of the resource; provided by the client when the resource is created.",
          type: "string",
          required: false,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] The creation timestamp for this instance template inRFC3339 text format.",
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
        let path = `projects/{project}/global/instanceTemplates`;

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

        if (input.event.inputConfig.sourceInstanceParams !== undefined)
          requestBody.sourceInstanceParams =
            input.event.inputConfig.sourceInstanceParams;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.properties !== undefined)
          requestBody.properties = input.event.inputConfig.properties;
        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.sourceInstance !== undefined)
          requestBody.sourceInstance = input.event.inputConfig.sourceInstance;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
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

export default instanceTemplatesInsert;
