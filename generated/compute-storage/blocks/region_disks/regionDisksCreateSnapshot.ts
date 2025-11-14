import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const regionDisksCreateSnapshot: AppBlock = {
  name: "Region Disks - Create Snapshot",
  description: `Creates a snapshot of a specified persistent disk.`,
  category: "Region Disks",
  inputs: {
    default: {
      config: {
        disk: {
          name: "Disk",
          description: "Name of the regional persistent disk to snapshot.",
          type: "string",
          required: true,
        },
        region: {
          name: "Region",
          description: "Name of the region for this request.",
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
        labels: {
          name: "Labels",
          description: "Labels to apply to this snapshot.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        diskSizeGb: {
          name: "Disk Size Gb",
          description:
            "[Output Only] Size of the source disk, specified in GB.",
          type: "string",
          required: false,
        },
        architecture: {
          name: "Architecture",
          description: "[Output Only] The architecture of the snapshot.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
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
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for the resource.",
          type: "string",
          required: false,
        },
        autoCreated: {
          name: "Auto Created",
          description:
            "[Output Only] Set to true if snapshots are automatically created by applying resource policy on the target disk.",
          type: "boolean",
          required: false,
        },
        snapshotEncryptionKey: {
          name: "Snapshot Encryption Key",
          description:
            "Encrypts the snapshot using acustomer-supplied encryption key.",
          type: {
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
          required: false,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] Creation timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        sourceInstantSnapshotId: {
          name: "Source Instant Snapshot ID",
          description:
            "[Output Only] The unique ID of the instant snapshot used to create this snapshot.",
          type: "string",
          required: false,
        },
        creationSizeBytes: {
          name: "Creation Size Bytes",
          description:
            "[Output Only] Size in bytes of the snapshot at creation time.",
          type: "string",
          required: false,
        },
        licenseCodes: {
          name: "License Codes",
          description:
            "[Output Only] Integer license codes indicating which licenses are attached to this snapshot.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        sourceDiskEncryptionKey: {
          name: "Source Disk Encryption Key",
          description:
            "The customer-supplied encryption key of the source disk.",
          type: {
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
          required: false,
        },
        sourceSnapshotSchedulePolicyId: {
          name: "Source Snapshot Schedule Policy ID",
          description:
            "[Output Only] ID of the resource policy which created this scheduled snapshot.",
          type: "string",
          required: false,
        },
        sourceDiskId: {
          name: "Source Disk ID",
          description:
            "[Output Only] The ID value of the disk used to create this snapshot.",
          type: "string",
          required: false,
        },
        guestFlush: {
          name: "Guest Flush",
          description:
            "[Input Only] Whether to attempt an application consistent snapshot by informing the OS to prepare for the snapshot process.",
          type: "boolean",
          required: false,
        },
        downloadBytes: {
          name: "Download Bytes",
          description:
            "[Output Only] Number of bytes downloaded to restore a snapshot to a disk.",
          type: "string",
          required: false,
        },
        sourceInstantSnapshot: {
          name: "Source Instant Snapshot",
          description:
            "The source instant snapshot used to create this snapshot.",
          type: "string",
          required: false,
        },
        status: {
          name: "Status",
          description: "[Output Only] The status of the snapshot.",
          type: "string",
          required: false,
        },
        locationHint: {
          name: "Location Hint",
          description:
            "An opaque location hint used to place the snapshot close to other resources.",
          type: "string",
          required: false,
        },
        chainName: {
          name: "Chain Name",
          description:
            "Creates the new snapshot in the snapshot chain labeled with the specified name.",
          type: "string",
          required: false,
        },
        sourceSnapshotSchedulePolicy: {
          name: "Source Snapshot Schedule Policy",
          description:
            "[Output Only] URL of the resource policy which created this scheduled snapshot.",
          type: "string",
          required: false,
        },
        licenses: {
          name: "Licenses",
          description:
            "[Output Only] A list of public visible licenses that apply to this snapshot.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        storageBytesStatus: {
          name: "Storage Bytes Status",
          description:
            "[Output Only] An indicator whether storageBytes is in a stable state or it is being adjusted as a result of shared storage reallocation.",
          type: "string",
          required: false,
        },
        sourceInstantSnapshotEncryptionKey: {
          name: "Source Instant Snapshot Encryption Key",
          description:
            "Customer provided encryption key when creating Snapshot from Instant Snapshot.",
          type: {
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
          required: false,
        },
        storageBytes: {
          name: "Storage Bytes",
          description:
            "[Output Only] A size of the storage used by the snapshot.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        snapshotType: {
          name: "Snapshot Type",
          description: "Indicates the type of the snapshot.",
          type: "string",
          required: false,
        },
        sourceDiskForRecoveryCheckpoint: {
          name: "Source Disk For Recovery Checkpoint",
          description:
            "The source disk whose recovery checkpoint will be used to create this snapshot.",
          type: "string",
          required: false,
        },
        satisfiesPzs: {
          name: "Satisfies Pzs",
          description: "[Output Only] Reserved for future use.",
          type: "boolean",
          required: false,
        },
        storageLocations: {
          name: "Storage Locations",
          description:
            "Cloud Storage bucket storage location of the snapshot (regional or multi-regional).",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        sourceDisk: {
          name: "Source Disk",
          description: "The source disk used to create this snapshot.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of the resource.",
          type: "string",
          required: false,
        },
        satisfiesPzi: {
          name: "Satisfies Pzi",
          description: "Output only.",
          type: "boolean",
          required: false,
        },
        guestOsFeatures: {
          name: "Guest Os Features",
          description:
            "[Output Only] A list of features to enable on the guest operating system.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: [
                    "BARE_METAL_LINUX_COMPATIBLE",
                    "FEATURE_TYPE_UNSPECIFIED",
                    "GVNIC",
                    "IDPF",
                    "MULTI_IP_SUBNET",
                    "SECURE_BOOT",
                    "SEV_CAPABLE",
                    "SEV_LIVE_MIGRATABLE",
                    "SEV_LIVE_MIGRATABLE_V2",
                    "SEV_SNP_CAPABLE",
                    "SNP_SVSM_CAPABLE",
                    "TDX_CAPABLE",
                    "UEFI_COMPATIBLE",
                    "VIRTIO_SCSI_MULTIQUEUE",
                    "WINDOWS",
                  ],
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        enableConfidentialCompute: {
          name: "Enable Confidential Compute",
          description:
            "Whether this snapshot is created from a confidential compute mode disk.",
          type: "boolean",
          required: false,
        },
        labelFingerprint: {
          name: "Label Fingerprint",
          description:
            "A fingerprint for the labels being applied to this snapshot, which is essentially a hash of the labels set used for optimistic locking.",
          type: "string",
          required: false,
        },
        params: {
          name: "Params",
          description: "Input only.",
          type: {
            type: "object",
            properties: {
              resourceManagerTags: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
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
        let path = `projects/{project}/regions/{region}/disks/{disk}/createSnapshot`;

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

        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.diskSizeGb !== undefined)
          requestBody.diskSizeGb = input.event.inputConfig.diskSizeGb;
        if (input.event.inputConfig.architecture !== undefined)
          requestBody.architecture = input.event.inputConfig.architecture;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.autoCreated !== undefined)
          requestBody.autoCreated = input.event.inputConfig.autoCreated;
        if (input.event.inputConfig.snapshotEncryptionKey !== undefined)
          requestBody.snapshotEncryptionKey =
            input.event.inputConfig.snapshotEncryptionKey;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.sourceInstantSnapshotId !== undefined)
          requestBody.sourceInstantSnapshotId =
            input.event.inputConfig.sourceInstantSnapshotId;
        if (input.event.inputConfig.creationSizeBytes !== undefined)
          requestBody.creationSizeBytes =
            input.event.inputConfig.creationSizeBytes;
        if (input.event.inputConfig.licenseCodes !== undefined)
          requestBody.licenseCodes = input.event.inputConfig.licenseCodes;
        if (input.event.inputConfig.sourceDiskEncryptionKey !== undefined)
          requestBody.sourceDiskEncryptionKey =
            input.event.inputConfig.sourceDiskEncryptionKey;
        if (
          input.event.inputConfig.sourceSnapshotSchedulePolicyId !== undefined
        )
          requestBody.sourceSnapshotSchedulePolicyId =
            input.event.inputConfig.sourceSnapshotSchedulePolicyId;
        if (input.event.inputConfig.sourceDiskId !== undefined)
          requestBody.sourceDiskId = input.event.inputConfig.sourceDiskId;
        if (input.event.inputConfig.guestFlush !== undefined)
          requestBody.guestFlush = input.event.inputConfig.guestFlush;
        if (input.event.inputConfig.downloadBytes !== undefined)
          requestBody.downloadBytes = input.event.inputConfig.downloadBytes;
        if (input.event.inputConfig.sourceInstantSnapshot !== undefined)
          requestBody.sourceInstantSnapshot =
            input.event.inputConfig.sourceInstantSnapshot;
        if (input.event.inputConfig.status !== undefined)
          requestBody.status = input.event.inputConfig.status;
        if (input.event.inputConfig.locationHint !== undefined)
          requestBody.locationHint = input.event.inputConfig.locationHint;
        if (input.event.inputConfig.chainName !== undefined)
          requestBody.chainName = input.event.inputConfig.chainName;
        if (input.event.inputConfig.sourceSnapshotSchedulePolicy !== undefined)
          requestBody.sourceSnapshotSchedulePolicy =
            input.event.inputConfig.sourceSnapshotSchedulePolicy;
        if (input.event.inputConfig.licenses !== undefined)
          requestBody.licenses = input.event.inputConfig.licenses;
        if (input.event.inputConfig.storageBytesStatus !== undefined)
          requestBody.storageBytesStatus =
            input.event.inputConfig.storageBytesStatus;
        if (
          input.event.inputConfig.sourceInstantSnapshotEncryptionKey !==
          undefined
        )
          requestBody.sourceInstantSnapshotEncryptionKey =
            input.event.inputConfig.sourceInstantSnapshotEncryptionKey;
        if (input.event.inputConfig.storageBytes !== undefined)
          requestBody.storageBytes = input.event.inputConfig.storageBytes;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.snapshotType !== undefined)
          requestBody.snapshotType = input.event.inputConfig.snapshotType;
        if (
          input.event.inputConfig.sourceDiskForRecoveryCheckpoint !== undefined
        )
          requestBody.sourceDiskForRecoveryCheckpoint =
            input.event.inputConfig.sourceDiskForRecoveryCheckpoint;
        if (input.event.inputConfig.satisfiesPzs !== undefined)
          requestBody.satisfiesPzs = input.event.inputConfig.satisfiesPzs;
        if (input.event.inputConfig.storageLocations !== undefined)
          requestBody.storageLocations =
            input.event.inputConfig.storageLocations;
        if (input.event.inputConfig.sourceDisk !== undefined)
          requestBody.sourceDisk = input.event.inputConfig.sourceDisk;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.satisfiesPzi !== undefined)
          requestBody.satisfiesPzi = input.event.inputConfig.satisfiesPzi;
        if (input.event.inputConfig.guestOsFeatures !== undefined)
          requestBody.guestOsFeatures = input.event.inputConfig.guestOsFeatures;
        if (input.event.inputConfig.enableConfidentialCompute !== undefined)
          requestBody.enableConfidentialCompute =
            input.event.inputConfig.enableConfidentialCompute;
        if (input.event.inputConfig.labelFingerprint !== undefined)
          requestBody.labelFingerprint =
            input.event.inputConfig.labelFingerprint;
        if (input.event.inputConfig.params !== undefined)
          requestBody.params = input.event.inputConfig.params;

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

export default regionDisksCreateSnapshot;
