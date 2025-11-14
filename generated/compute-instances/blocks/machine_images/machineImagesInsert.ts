import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const machineImagesInsert: AppBlock = {
  name: "Machine Images - Insert",
  description: `Creates a machine image in the specified project using the data that is included in the request.`,
  category: "Machine Images",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID for this request.",
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
        sourceInstance: {
          name: "SourceInstance",
          description:
            "Required. Source instance that is used to create the machine image from.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Represents a machine image resource.\n\nA machine image is a Compute Engine resource that stores all the\nconfiguration, metadata, permissions, and data from one or more disks\nrequired to create a Virtual machine (VM) instance. For more information, seeMachine images.",
          type: {
            type: "object",
            properties: {
              sourceInstance: {
                type: "string",
              },
              labelFingerprint: {
                type: "string",
              },
              guestFlush: {
                type: "boolean",
              },
              totalStorageBytes: {
                type: "string",
              },
              storageLocations: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              sourceDiskEncryptionKeys: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    diskEncryptionKey: {
                      type: "object",
                      additionalProperties: true,
                    },
                    sourceDisk: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              name: {
                type: "string",
              },
              satisfiesPzi: {
                type: "boolean",
              },
              selfLink: {
                type: "string",
              },
              status: {
                type: "string",
                enum: ["CREATING", "DELETING", "INVALID", "READY", "UPLOADING"],
              },
              satisfiesPzs: {
                type: "boolean",
              },
              description: {
                type: "string",
              },
              id: {
                type: "string",
              },
              savedDisks: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    storageBytesStatus: {
                      type: "object",
                      additionalProperties: true,
                    },
                    sourceDisk: {
                      type: "object",
                      additionalProperties: true,
                    },
                    storageBytes: {
                      type: "object",
                      additionalProperties: true,
                    },
                    kind: {
                      type: "object",
                      additionalProperties: true,
                    },
                    architecture: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              kind: {
                type: "string",
              },
              labels: {
                type: "object",
                additionalProperties: true,
              },
              instanceProperties: {
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
                      type: "object",
                      additionalProperties: true,
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
                    additionalProperties: true,
                  },
                  advancedMachineFeatures: {
                    type: "object",
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
                    additionalProperties: true,
                  },
                  metadata: {
                    type: "object",
                    additionalProperties: true,
                  },
                  shieldedInstanceConfig: {
                    type: "object",
                    additionalProperties: true,
                  },
                  minCpuPlatform: {
                    type: "string",
                  },
                  scheduling: {
                    type: "object",
                    additionalProperties: true,
                  },
                  tags: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              machineImageEncryptionKey: {
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
              sourceInstanceProperties: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  serviceAccounts: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  disks: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  minCpuPlatform: {
                    type: "string",
                  },
                  guestAccelerators: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  keyRevocationActionType: {
                    type: "string",
                    enum: [
                      "KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED",
                      "NONE",
                      "STOP",
                    ],
                  },
                  networkInterfaces: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  metadata: {
                    type: "object",
                    additionalProperties: true,
                  },
                  canIpForward: {
                    type: "boolean",
                  },
                  deletionProtection: {
                    type: "boolean",
                  },
                  labels: {
                    type: "object",
                    additionalProperties: true,
                  },
                  machineType: {
                    type: "string",
                  },
                  tags: {
                    type: "object",
                    additionalProperties: true,
                  },
                  scheduling: {
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
        const path = `projects/{project}/global/machineImages`;
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

export default machineImagesInsert;
