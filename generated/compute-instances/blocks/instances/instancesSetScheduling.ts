import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesSetScheduling: AppBlock = {
  name: "Instances - Set Scheduling",
  description: `Sets an instance's scheduling options.`,
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
        instance: {
          name: "Instance",
          description: "Instance name for this request.",
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
        terminationTime: {
          name: "Termination Time",
          description:
            "Specifies the timestamp, when the instance will be terminated, inRFC3339 text format.",
          type: "string",
          required: false,
        },
        locationHint: {
          name: "Location Hint",
          description:
            "An opaque location hint used to place the instance close to other resources.",
          type: "string",
          required: false,
        },
        onHostMaintenance: {
          name: "On Host Maintenance",
          description: "Defines the maintenance behavior for this instance.",
          type: "string",
          required: false,
        },
        maxRunDuration: {
          name: "Max Run Duration",
          description: "Specifies the max run duration for the given instance.",
          type: {
            type: "object",
            properties: {
              nanos: {
                type: "number",
              },
              seconds: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        hostErrorTimeoutSeconds: {
          name: "Host Error Timeout Seconds",
          description:
            "Specify the time in seconds for host error detection, the value must be within the range of [90, 330] with the increment of 30, if unset, the default behavior of host error recovery will be used.",
          type: "number",
          required: false,
        },
        instanceTerminationAction: {
          name: "Instance Termination Action",
          description: "Specifies the termination action for the instance.",
          type: "string",
          required: false,
        },
        onInstanceStopAction: {
          name: "On Instance Stop Action",
          description: "Request body field: onInstanceStopAction",
          type: {
            type: "object",
            properties: {
              discardLocalSsd: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        provisioningModel: {
          name: "Provisioning Model",
          description: "Specifies the provisioning model of the instance.",
          type: "string",
          required: false,
        },
        skipGuestOsShutdown: {
          name: "Skip Guest Os Shutdown",
          description:
            "Default is false and there will be 120 seconds between GCE ACPI G2 Soft Off and ACPI G3 Mechanical Off for Standard VMs and 30 seconds for Spot VMs.",
          type: "boolean",
          required: false,
        },
        preemptible: {
          name: "Preemptible",
          description: "Defines whether the instance is preemptible.",
          type: "boolean",
          required: false,
        },
        availabilityDomain: {
          name: "Availability Domain",
          description:
            "Specifies the availability domain to place the instance in.",
          type: "number",
          required: false,
        },
        localSsdRecoveryTimeout: {
          name: "Local Ssd Recovery Timeout",
          description:
            "Specifies the maximum amount of time a Local Ssd Vm should wait while recovery of the Local Ssd state is attempted.",
          type: {
            type: "object",
            properties: {
              nanos: {
                type: "number",
              },
              seconds: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        minNodeCpus: {
          name: "Min Node Cpus",
          description:
            "The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node.",
          type: "number",
          required: false,
        },
        nodeAffinities: {
          name: "Node Affinities",
          description:
            "A set of node affinity and anti-affinity configurations.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                values: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                operator: {
                  type: "string",
                  enum: ["IN", "NOT_IN", "OPERATOR_UNSPECIFIED"],
                },
                key: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        automaticRestart: {
          name: "Automatic Restart",
          description:
            "Specifies whether the instance should be automatically restarted if it is terminated by Compute Engine (not terminated by a user).",
          type: "boolean",
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
        let path = `projects/{project}/zones/{zone}/instances/{instance}/setScheduling`;

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

        if (input.event.inputConfig.terminationTime !== undefined)
          requestBody.terminationTime = input.event.inputConfig.terminationTime;
        if (input.event.inputConfig.locationHint !== undefined)
          requestBody.locationHint = input.event.inputConfig.locationHint;
        if (input.event.inputConfig.onHostMaintenance !== undefined)
          requestBody.onHostMaintenance =
            input.event.inputConfig.onHostMaintenance;
        if (input.event.inputConfig.maxRunDuration !== undefined)
          requestBody.maxRunDuration = input.event.inputConfig.maxRunDuration;
        if (input.event.inputConfig.hostErrorTimeoutSeconds !== undefined)
          requestBody.hostErrorTimeoutSeconds =
            input.event.inputConfig.hostErrorTimeoutSeconds;
        if (input.event.inputConfig.instanceTerminationAction !== undefined)
          requestBody.instanceTerminationAction =
            input.event.inputConfig.instanceTerminationAction;
        if (input.event.inputConfig.onInstanceStopAction !== undefined)
          requestBody.onInstanceStopAction =
            input.event.inputConfig.onInstanceStopAction;
        if (input.event.inputConfig.provisioningModel !== undefined)
          requestBody.provisioningModel =
            input.event.inputConfig.provisioningModel;
        if (input.event.inputConfig.skipGuestOsShutdown !== undefined)
          requestBody.skipGuestOsShutdown =
            input.event.inputConfig.skipGuestOsShutdown;
        if (input.event.inputConfig.preemptible !== undefined)
          requestBody.preemptible = input.event.inputConfig.preemptible;
        if (input.event.inputConfig.availabilityDomain !== undefined)
          requestBody.availabilityDomain =
            input.event.inputConfig.availabilityDomain;
        if (input.event.inputConfig.localSsdRecoveryTimeout !== undefined)
          requestBody.localSsdRecoveryTimeout =
            input.event.inputConfig.localSsdRecoveryTimeout;
        if (input.event.inputConfig.minNodeCpus !== undefined)
          requestBody.minNodeCpus = input.event.inputConfig.minNodeCpus;
        if (input.event.inputConfig.nodeAffinities !== undefined)
          requestBody.nodeAffinities = input.event.inputConfig.nodeAffinities;
        if (input.event.inputConfig.automaticRestart !== undefined)
          requestBody.automaticRestart =
            input.event.inputConfig.automaticRestart;

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

export default instancesSetScheduling;
