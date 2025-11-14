import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instanceGroupManagersPatch: AppBlock = {
  name: "Instance Group Managers - Patch",
  description: `Updates a managed instance group using the information that you specify in the request.`,
  category: "Instance Group Managers",
  inputs: {
    default: {
      config: {
        instanceGroupManager: {
          name: "Instance Group Manager",
          description: "The name of the instance group manager.",
          type: "string",
          required: true,
        },
        zone: {
          name: "Zone",
          description:
            "[Output Only] The URL of azone where the managed instance group is located (for zonal resources).",
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
        updatePolicy: {
          name: "Update Policy",
          description: "The update policy for this managed instance group.",
          type: {
            type: "object",
            properties: {
              maxSurge: {
                type: "object",
                properties: {
                  fixed: {
                    type: "object",
                    additionalProperties: true,
                  },
                  calculated: {
                    type: "object",
                    additionalProperties: true,
                  },
                  percent: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              maxUnavailable: {
                type: "object",
                properties: {
                  fixed: {
                    type: "object",
                    additionalProperties: true,
                  },
                  calculated: {
                    type: "object",
                    additionalProperties: true,
                  },
                  percent: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
          required: false,
        },
        allInstancesConfig: {
          name: "All Instances Config",
          description:
            "Specifies configuration that overrides the instance template configuration for the group.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  metadata: {
                    type: "object",
                    additionalProperties: true,
                  },
                  labels: {
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
        instanceLifecyclePolicy: {
          name: "Instance Lifecycle Policy",
          description: "The repair policy for this managed instance group.",
          type: {
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
          required: false,
        },
        kind: {
          name: "Kind",
          description:
            "[Output Only] The resource type, which is alwayscompute#instanceGroupManager for managed instance groups.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        targetSize: {
          name: "Target Size",
          description:
            "The target number of running instances for this managed instance group.",
          type: "number",
          required: false,
        },
        autoHealingPolicies: {
          name: "Auto Healing Policies",
          description:
            "The autohealing policy for this managed instance group.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                healthCheck: {
                  type: "string",
                },
                initialDelaySec: {
                  type: "number",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        targetSuspendedSize: {
          name: "Target Suspended Size",
          description:
            "The target number of suspended instances for this managed instance group.",
          type: "number",
          required: false,
        },
        region: {
          name: "Region",
          description:
            "[Output Only] The URL of theregion where the managed instance group resides (for regional resources).",
          type: "string",
          required: false,
        },
        currentActions: {
          name: "Current Actions",
          description:
            "[Output Only] The list of instance actions and the number of instances in this managed instance group that are scheduled for each of those actions.",
          type: {
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
          required: false,
        },
        standbyPolicy: {
          name: "Standby Policy",
          description: "Standby policy for stopped and suspended instances.",
          type: {
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
          required: false,
        },
        resourcePolicies: {
          name: "Resource Policies",
          description: "Resource policies for this managed instance group.",
          type: {
            type: "object",
            properties: {
              workloadPolicy: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        instanceFlexibilityPolicy: {
          name: "Instance Flexibility Policy",
          description:
            "Instance flexibility allowing MIG to create VMs from multiple types of machines.",
          type: {
            type: "object",
            properties: {
              instanceSelections: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        baseInstanceName: {
          name: "Base Instance Name",
          description:
            "The base instance name is a prefix that you want to attach to the names of all VMs in a MIG.",
          type: "string",
          required: false,
        },
        targetPools: {
          name: "Target Pools",
          description:
            "The URLs for all TargetPool resources to which instances in theinstanceGroup field are added.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        statefulPolicy: {
          name: "Stateful Policy",
          description:
            "Stateful configuration for this Instanced Group Manager",
          type: {
            type: "object",
            properties: {
              preservedState: {
                type: "object",
                properties: {
                  internalIPs: {
                    type: "object",
                    additionalProperties: true,
                  },
                  disks: {
                    type: "object",
                    additionalProperties: true,
                  },
                  externalIPs: {
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
        selfLink: {
          name: "Self Link",
          description: "[Output Only] The URL for this managed instance group.",
          type: "string",
          required: false,
        },
        instanceGroup: {
          name: "Instance Group",
          description: "[Output Only] The URL of the Instance Group resource.",
          type: "string",
          required: false,
        },
        distributionPolicy: {
          name: "Distribution Policy",
          description:
            "Policy specifying the intended distribution of managed instances across zones in a regional managed instance group.",
          type: {
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
          required: false,
        },
        instanceTemplate: {
          name: "Instance Template",
          description:
            "The URL of the instance template that is specified for this managed instance group.",
          type: "string",
          required: false,
        },
        listManagedInstancesResults: {
          name: "List Managed Instances Results",
          description:
            "Pagination behavior of the listManagedInstances API method for this managed instance group.",
          type: "string",
          required: false,
        },
        status: {
          name: "Status",
          description:
            "[Output Only] The status of this managed instance group.",
          type: {
            type: "object",
            properties: {
              isStable: {
                type: "boolean",
              },
              stateful: {
                type: "object",
                properties: {
                  perInstanceConfigs: {
                    type: "object",
                    additionalProperties: true,
                  },
                  hasStatefulConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              versionTarget: {
                type: "object",
                properties: {
                  isReached: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              allInstancesConfig: {
                type: "object",
                properties: {
                  effective: {
                    type: "object",
                    additionalProperties: true,
                  },
                  currentRevision: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              autoscaler: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        satisfiesPzi: {
          name: "Satisfies Pzi",
          description: "[Output Only] Reserved for future use.",
          type: "boolean",
          required: false,
        },
        satisfiesPzs: {
          name: "Satisfies Pzs",
          description: "[Output Only] Reserved for future use.",
          type: "boolean",
          required: false,
        },
        targetStoppedSize: {
          name: "Target Stopped Size",
          description:
            "The target number of stopped instances for this managed instance group.",
          type: "number",
          required: false,
        },
        name: {
          name: "Name",
          description: "The name of the managed instance group.",
          type: "string",
          required: false,
        },
        fingerprint: {
          name: "Fingerprint",
          description: "Fingerprint of this resource.",
          type: "string",
          required: false,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] The creation timestamp for this managed instance group inRFC3339 text format.",
          type: "string",
          required: false,
        },
        namedPorts: {
          name: "Named Ports",
          description:
            "[Output Only] Named ports configured on the Instance Groups complementary to this Instance Group Manager.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                port: {
                  type: "number",
                },
                name: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        id: {
          name: "ID",
          description:
            "[Output Only] A unique identifier for this resource type.",
          type: "string",
          required: false,
        },
        versions: {
          name: "Versions",
          description:
            "Specifies the instance templates used by this managed instance group to create instances.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                instanceTemplate: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                targetSize: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
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
        let path = `projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}`;

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

        if (input.event.inputConfig.updatePolicy !== undefined)
          requestBody.updatePolicy = input.event.inputConfig.updatePolicy;
        if (input.event.inputConfig.allInstancesConfig !== undefined)
          requestBody.allInstancesConfig =
            input.event.inputConfig.allInstancesConfig;
        if (input.event.inputConfig.instanceLifecyclePolicy !== undefined)
          requestBody.instanceLifecyclePolicy =
            input.event.inputConfig.instanceLifecyclePolicy;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.targetSize !== undefined)
          requestBody.targetSize = input.event.inputConfig.targetSize;
        if (input.event.inputConfig.autoHealingPolicies !== undefined)
          requestBody.autoHealingPolicies =
            input.event.inputConfig.autoHealingPolicies;
        if (input.event.inputConfig.targetSuspendedSize !== undefined)
          requestBody.targetSuspendedSize =
            input.event.inputConfig.targetSuspendedSize;
        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (input.event.inputConfig.currentActions !== undefined)
          requestBody.currentActions = input.event.inputConfig.currentActions;
        if (input.event.inputConfig.zone !== undefined)
          requestBody.zone = input.event.inputConfig.zone;
        if (input.event.inputConfig.standbyPolicy !== undefined)
          requestBody.standbyPolicy = input.event.inputConfig.standbyPolicy;
        if (input.event.inputConfig.resourcePolicies !== undefined)
          requestBody.resourcePolicies =
            input.event.inputConfig.resourcePolicies;
        if (input.event.inputConfig.instanceFlexibilityPolicy !== undefined)
          requestBody.instanceFlexibilityPolicy =
            input.event.inputConfig.instanceFlexibilityPolicy;
        if (input.event.inputConfig.baseInstanceName !== undefined)
          requestBody.baseInstanceName =
            input.event.inputConfig.baseInstanceName;
        if (input.event.inputConfig.targetPools !== undefined)
          requestBody.targetPools = input.event.inputConfig.targetPools;
        if (input.event.inputConfig.statefulPolicy !== undefined)
          requestBody.statefulPolicy = input.event.inputConfig.statefulPolicy;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.instanceGroup !== undefined)
          requestBody.instanceGroup = input.event.inputConfig.instanceGroup;
        if (input.event.inputConfig.distributionPolicy !== undefined)
          requestBody.distributionPolicy =
            input.event.inputConfig.distributionPolicy;
        if (input.event.inputConfig.instanceTemplate !== undefined)
          requestBody.instanceTemplate =
            input.event.inputConfig.instanceTemplate;
        if (input.event.inputConfig.listManagedInstancesResults !== undefined)
          requestBody.listManagedInstancesResults =
            input.event.inputConfig.listManagedInstancesResults;
        if (input.event.inputConfig.status !== undefined)
          requestBody.status = input.event.inputConfig.status;
        if (input.event.inputConfig.satisfiesPzi !== undefined)
          requestBody.satisfiesPzi = input.event.inputConfig.satisfiesPzi;
        if (input.event.inputConfig.satisfiesPzs !== undefined)
          requestBody.satisfiesPzs = input.event.inputConfig.satisfiesPzs;
        if (input.event.inputConfig.targetStoppedSize !== undefined)
          requestBody.targetStoppedSize =
            input.event.inputConfig.targetStoppedSize;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.fingerprint !== undefined)
          requestBody.fingerprint = input.event.inputConfig.fingerprint;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.namedPorts !== undefined)
          requestBody.namedPorts = input.event.inputConfig.namedPorts;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.versions !== undefined)
          requestBody.versions = input.event.inputConfig.versions;

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

export default instanceGroupManagersPatch;
