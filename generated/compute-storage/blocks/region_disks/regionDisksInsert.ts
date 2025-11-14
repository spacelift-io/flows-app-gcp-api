import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const regionDisksInsert: AppBlock = {
  name: "Region Disks - Insert",
  description: `Creates a persistent regional disk in the specified project using the data included in the request.`,
  category: "Region Disks",
  inputs: {
    default: {
      config: {
        sourceImage: {
          name: "SourceImage",
          description:
            "Source image to restore onto a disk. This field is optional.",
          type: "string",
          required: false,
        },
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
        region: {
          name: "Region",
          description: "Name of the region for this request.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Represents a Persistent Disk resource.\n\nGoogle Compute Engine has two Disk resources:\n\n* [Zonal](/compute/docs/reference/rest/v1/disks)\n* [Regional](/compute/docs/reference/rest/v1/regionDisks)\n\nPersistent disks are required for running your VM instances.\nCreate both boot and non-boot (data) persistent disks. For more information,\nread Persistent Disks. For more\nstorage options, read Storage options.\n\nThe disks resource represents a zonal persistent disk.\nFor more information, readZonal persistent disks.\n\nThe regionDisks resource represents a\nregional persistent disk.  For more information, read\nRegional resources.",
          type: {
            type: "object",
            properties: {
              provisionedThroughput: {
                type: "string",
              },
              labelFingerprint: {
                type: "string",
              },
              lastAttachTimestamp: {
                type: "string",
              },
              storagePool: {
                type: "string",
              },
              sizeGb: {
                type: "string",
              },
              options: {
                type: "string",
              },
              asyncPrimaryDisk: {
                type: "object",
                properties: {
                  disk: {
                    type: "string",
                  },
                  consistencyGroupPolicyId: {
                    type: "string",
                  },
                  diskId: {
                    type: "string",
                  },
                  consistencyGroupPolicy: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              licenses: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              sourceSnapshotId: {
                type: "string",
              },
              licenseCodes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              sourceConsistencyGroupPolicy: {
                type: "string",
              },
              lastDetachTimestamp: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              type: {
                type: "string",
              },
              resourceStatus: {
                type: "object",
                properties: {
                  asyncPrimaryDisk: {
                    type: "object",
                    additionalProperties: true,
                  },
                  asyncSecondaryDisks: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              physicalBlockSizeBytes: {
                type: "string",
              },
              id: {
                type: "string",
              },
              diskEncryptionKey: {
                type: "object",
                properties: {
                  rsaEncryptedKey: {
                    type: "string",
                  },
                  rawKey: {
                    type: "string",
                  },
                  kmsKeyServiceAccount: {
                    type: "string",
                  },
                  sha256: {
                    type: "string",
                  },
                  kmsKeyName: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              region: {
                type: "string",
              },
              description: {
                type: "string",
              },
              satisfiesPzs: {
                type: "boolean",
              },
              replicaZones: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              sourceSnapshotEncryptionKey: {
                type: "object",
                properties: {
                  rsaEncryptedKey: {
                    type: "string",
                  },
                  rawKey: {
                    type: "string",
                  },
                  kmsKeyServiceAccount: {
                    type: "string",
                  },
                  sha256: {
                    type: "string",
                  },
                  kmsKeyName: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              accessMode: {
                type: "string",
                enum: [
                  "READ_ONLY_MANY",
                  "READ_WRITE_MANY",
                  "READ_WRITE_SINGLE",
                ],
              },
              sourceSnapshot: {
                type: "string",
              },
              sourceInstantSnapshot: {
                type: "string",
              },
              resourcePolicies: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              users: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              enableConfidentialCompute: {
                type: "boolean",
              },
              asyncSecondaryDisks: {
                type: "object",
                additionalProperties: true,
              },
              architecture: {
                type: "string",
                enum: ["ARCHITECTURE_UNSPECIFIED", "ARM64", "X86_64"],
              },
              params: {
                type: "object",
                properties: {
                  resourceManagerTags: {
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
              provisionedIops: {
                type: "string",
              },
              sourceConsistencyGroupPolicyId: {
                type: "string",
              },
              name: {
                type: "string",
              },
              sourceImage: {
                type: "string",
              },
              locationHint: {
                type: "string",
              },
              status: {
                type: "string",
                enum: [
                  "CREATING",
                  "DELETING",
                  "FAILED",
                  "READY",
                  "RESTORING",
                  "UNAVAILABLE",
                ],
              },
              creationTimestamp: {
                type: "string",
              },
              sourceDiskId: {
                type: "string",
              },
              zone: {
                type: "string",
              },
              sourceInstantSnapshotId: {
                type: "string",
              },
              satisfiesPzi: {
                type: "boolean",
              },
              sourceStorageObject: {
                type: "string",
              },
              selfLink: {
                type: "string",
              },
              sourceImageId: {
                type: "string",
              },
              sourceImageEncryptionKey: {
                type: "object",
                properties: {
                  rsaEncryptedKey: {
                    type: "string",
                  },
                  rawKey: {
                    type: "string",
                  },
                  kmsKeyServiceAccount: {
                    type: "string",
                  },
                  sha256: {
                    type: "string",
                  },
                  kmsKeyName: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              sourceDisk: {
                type: "string",
              },
              guestOsFeatures: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: {
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
        const path = `projects/{project}/regions/{region}/disks`;
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

export default regionDisksInsert;
