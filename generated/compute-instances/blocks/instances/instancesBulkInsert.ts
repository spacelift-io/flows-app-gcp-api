import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesBulkInsert: AppBlock = {
  name: "Instances - Bulk Insert",
  description: `Creates multiple instances.`,
  category: "Instances",
  inputs: {
    default: {
      config: {
        zone: {
          name: "Zone",
          description: "The name of the zone for this request.",
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
        count: {
          name: "Count",
          description: "The maximum number of instances to create.",
          type: "string",
          required: false,
        },
        instanceProperties: {
          name: "Instance Properties",
          description:
            "The instance properties defining the VM instances to be created.",
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
        perInstanceProperties: {
          name: "Per Instance Properties",
          description:
            "Per-instance properties to be set on individual instances.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        minCount: {
          name: "Min Count",
          description: "The minimum number of instances to create.",
          type: "string",
          required: false,
        },
        locationPolicy: {
          name: "Location Policy",
          description: "Policy for choosing target zone.",
          type: {
            type: "object",
            properties: {
              targetShape: {
                type: "string",
                enum: ["ANY", "ANY_SINGLE_ZONE", "BALANCED"],
              },
              locations: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        namePattern: {
          name: "Name Pattern",
          description: "The string pattern used for the names of the VMs.",
          type: "string",
          required: false,
        },
        sourceInstanceTemplate: {
          name: "Source Instance Template",
          description:
            "Specifies the instance template from which to create instances.",
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
        let path = `projects/{project}/zones/{zone}/instances/bulkInsert`;

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

        if (input.event.inputConfig.count !== undefined)
          requestBody.count = input.event.inputConfig.count;
        if (input.event.inputConfig.instanceProperties !== undefined)
          requestBody.instanceProperties =
            input.event.inputConfig.instanceProperties;
        if (input.event.inputConfig.perInstanceProperties !== undefined)
          requestBody.perInstanceProperties =
            input.event.inputConfig.perInstanceProperties;
        if (input.event.inputConfig.minCount !== undefined)
          requestBody.minCount = input.event.inputConfig.minCount;
        if (input.event.inputConfig.locationPolicy !== undefined)
          requestBody.locationPolicy = input.event.inputConfig.locationPolicy;
        if (input.event.inputConfig.namePattern !== undefined)
          requestBody.namePattern = input.event.inputConfig.namePattern;
        if (input.event.inputConfig.sourceInstanceTemplate !== undefined)
          requestBody.sourceInstanceTemplate =
            input.event.inputConfig.sourceInstanceTemplate;

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

export default instancesBulkInsert;
