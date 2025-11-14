import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const disksCreateSnapshot: AppBlock = {
  name: "Disks - Create Snapshot",
  description: `Creates a snapshot of a specified persistent disk.`,
  category: "Disks",
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
          name: "RequestId",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        disk: {
          name: "Disk",
          description: "Name of the persistent disk to snapshot.",
          type: "string",
          required: true,
        },
        guestFlush: {
          name: "GuestFlush",
          description:
            "[Input Only] Whether to attempt an application consistent snapshot by\ninforming the OS to prepare for the snapshot process.",
          type: "boolean",
          required: false,
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
            "Represents a Persistent Disk Snapshot resource.\n\nYou can use snapshots to back up data on a regular interval. For more\ninformation, read  Creating\npersistent disk snapshots.",
          type: {
            type: "object",
            properties: {
              labels: {
                type: "object",
                additionalProperties: true,
              },
              diskSizeGb: {
                type: "string",
              },
              architecture: {
                type: "string",
                enum: ["ARCHITECTURE_UNSPECIFIED", "ARM64", "X86_64"],
              },
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              selfLink: {
                type: "string",
              },
              autoCreated: {
                type: "boolean",
              },
              snapshotEncryptionKey: {
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
              creationTimestamp: {
                type: "string",
              },
              sourceInstantSnapshotId: {
                type: "string",
              },
              creationSizeBytes: {
                type: "string",
              },
              licenseCodes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              sourceDiskEncryptionKey: {
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
              sourceSnapshotSchedulePolicyId: {
                type: "string",
              },
              sourceDiskId: {
                type: "string",
              },
              guestFlush: {
                type: "boolean",
              },
              downloadBytes: {
                type: "string",
              },
              sourceInstantSnapshot: {
                type: "string",
              },
              status: {
                type: "string",
                enum: ["CREATING", "DELETING", "FAILED", "READY", "UPLOADING"],
              },
              locationHint: {
                type: "string",
              },
              chainName: {
                type: "string",
              },
              sourceSnapshotSchedulePolicy: {
                type: "string",
              },
              licenses: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              storageBytesStatus: {
                type: "string",
                enum: ["UPDATING", "UP_TO_DATE"],
              },
              sourceInstantSnapshotEncryptionKey: {
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
              storageBytes: {
                type: "string",
              },
              description: {
                type: "string",
              },
              snapshotType: {
                type: "string",
                enum: ["ARCHIVE", "STANDARD"],
              },
              sourceDiskForRecoveryCheckpoint: {
                type: "string",
              },
              satisfiesPzs: {
                type: "boolean",
              },
              storageLocations: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              sourceDisk: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              satisfiesPzi: {
                type: "boolean",
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
              enableConfidentialCompute: {
                type: "boolean",
              },
              labelFingerprint: {
                type: "string",
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
        const path = `projects/{project}/zones/{zone}/disks/{disk}/createSnapshot`;
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

export default disksCreateSnapshot;
