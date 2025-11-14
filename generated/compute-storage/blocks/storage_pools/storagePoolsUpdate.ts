import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const storagePoolsUpdate: AppBlock = {
  name: "Storage Pools - Update",
  description: `Updates the specified storagePool with the data included in the request.`,
  category: "Storage Pools",
  inputs: {
    default: {
      config: {
        zone: {
          name: "Zone",
          description:
            "[Output Only] URL of the zone where the storage pool resides.",
          type: "string",
          required: false,
        },
        storagePool: {
          name: "Storage Pool",
          description: "The storagePool name for this request.",
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
        updateMask: {
          name: "Update Mask",
          description:
            "update_mask indicates fields to be updated as part of this request.",
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
        state: {
          name: "State",
          description: "[Output Only] The status of storage pool creation.",
          type: "string",
          required: false,
        },
        storagePoolType: {
          name: "Storage Pool Type",
          description: "Type of the storage pool.",
          type: "string",
          required: false,
        },
        poolProvisionedIops: {
          name: "Pool Provisioned Iops",
          description: "Provisioned IOPS of the storage pool.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        performanceProvisioningType: {
          name: "Performance Provisioning Type",
          description:
            "Provisioning type of the performance-related parameters of the pool, such as throughput and IOPS.",
          type: "string",
          required: false,
        },
        poolProvisionedThroughput: {
          name: "Pool Provisioned Throughput",
          description: "Provisioned throughput of the storage pool in MiB/s.",
          type: "string",
          required: false,
        },
        capacityProvisioningType: {
          name: "Capacity Provisioning Type",
          description: "Provisioning type of the byte capacity of the pool.",
          type: "string",
          required: false,
        },
        status: {
          name: "Status",
          description:
            "[Output Only] Status information for the storage pool resource.",
          type: {
            type: "object",
            properties: {
              poolUsedIops: {
                type: "string",
              },
              diskCount: {
                type: "string",
              },
              poolUsedThroughput: {
                type: "string",
              },
              poolUserWrittenBytes: {
                type: "string",
              },
              poolUsedCapacityBytes: {
                type: "string",
              },
              totalProvisionedDiskIops: {
                type: "string",
              },
              lastResizeTimestamp: {
                type: "string",
              },
              totalProvisionedDiskThroughput: {
                type: "string",
              },
              totalProvisionedDiskCapacityGb: {
                type: "string",
              },
              maxTotalProvisionedDiskCapacityGb: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        selfLinkWithId: {
          name: "Self Link With ID",
          description:
            "[Output Only] Server-defined URL for this resource's resource id.",
          type: "string",
          required: false,
        },
        resourceStatus: {
          name: "Resource Status",
          description:
            "[Output Only] Status information for the storage pool resource.",
          type: {
            type: "object",
            properties: {
              poolUsedIops: {
                type: "string",
              },
              diskCount: {
                type: "string",
              },
              poolUsedThroughput: {
                type: "string",
              },
              poolUserWrittenBytes: {
                type: "string",
              },
              poolUsedCapacityBytes: {
                type: "string",
              },
              totalProvisionedDiskIops: {
                type: "string",
              },
              lastResizeTimestamp: {
                type: "string",
              },
              totalProvisionedDiskThroughput: {
                type: "string",
              },
              totalProvisionedDiskCapacityGb: {
                type: "string",
              },
              maxTotalProvisionedDiskCapacityGb: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description:
            "[Output Only] Server-defined fully-qualified URL for this resource.",
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
        labelFingerprint: {
          name: "Label Fingerprint",
          description:
            "A fingerprint for the labels being applied to this storage pool, which is essentially a hash of the labels set used for optimistic locking.",
          type: "string",
          required: false,
        },
        labels: {
          name: "Labels",
          description: "Labels to apply to this storage pool.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        poolProvisionedCapacityGb: {
          name: "Pool Provisioned Capacity Gb",
          description: "Size of the storage pool in GiB.",
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
        let path = `projects/{project}/zones/{zone}/storagePools/{storagePool}`;

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

        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.state !== undefined)
          requestBody.state = input.event.inputConfig.state;
        if (input.event.inputConfig.storagePoolType !== undefined)
          requestBody.storagePoolType = input.event.inputConfig.storagePoolType;
        if (input.event.inputConfig.poolProvisionedIops !== undefined)
          requestBody.poolProvisionedIops =
            input.event.inputConfig.poolProvisionedIops;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.performanceProvisioningType !== undefined)
          requestBody.performanceProvisioningType =
            input.event.inputConfig.performanceProvisioningType;
        if (input.event.inputConfig.poolProvisionedThroughput !== undefined)
          requestBody.poolProvisionedThroughput =
            input.event.inputConfig.poolProvisionedThroughput;
        if (input.event.inputConfig.capacityProvisioningType !== undefined)
          requestBody.capacityProvisioningType =
            input.event.inputConfig.capacityProvisioningType;
        if (input.event.inputConfig.status !== undefined)
          requestBody.status = input.event.inputConfig.status;
        if (input.event.inputConfig.selfLinkWithId !== undefined)
          requestBody.selfLinkWithId = input.event.inputConfig.selfLinkWithId;
        if (input.event.inputConfig.resourceStatus !== undefined)
          requestBody.resourceStatus = input.event.inputConfig.resourceStatus;
        if (input.event.inputConfig.zone !== undefined)
          requestBody.zone = input.event.inputConfig.zone;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.labelFingerprint !== undefined)
          requestBody.labelFingerprint =
            input.event.inputConfig.labelFingerprint;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.poolProvisionedCapacityGb !== undefined)
          requestBody.poolProvisionedCapacityGb =
            input.event.inputConfig.poolProvisionedCapacityGb;

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

export default storagePoolsUpdate;
