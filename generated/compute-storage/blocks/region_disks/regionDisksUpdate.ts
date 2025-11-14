import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const regionDisksUpdate: AppBlock = {
  name: "Region Disks - Update",
  description: `Update the specified disk with the data included in the request.`,
  category: "Region Disks",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description:
            "[Output Only] URL of the region where the disk resides.",
          type: "string",
          required: false,
        },
        disk: {
          name: "Disk",
          description: "The disk name for this request.",
          type: "string",
          required: true,
        },
        paths: {
          name: "Paths",
          description: "Parameter: paths",
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
        requestId: {
          name: "Request ID",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        provisionedThroughput: {
          name: "Provisioned Throughput",
          description:
            "Indicates how much throughput to provision for the disk.",
          type: "string",
          required: false,
        },
        labelFingerprint: {
          name: "Label Fingerprint",
          description:
            "A fingerprint for the labels being applied to this disk, which is essentially a hash of the labels set used for optimistic locking.",
          type: "string",
          required: false,
        },
        lastAttachTimestamp: {
          name: "Last Attach Timestamp",
          description:
            "[Output Only] Last attach timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        storagePool: {
          name: "Storage Pool",
          description: "The storage pool in which the new disk is created.",
          type: "string",
          required: false,
        },
        sizeGb: {
          name: "Size Gb",
          description: "Size, in GB, of the persistent disk.",
          type: "string",
          required: false,
        },
        options: {
          name: "Options",
          description: "Internal use only.",
          type: "string",
          required: false,
        },
        asyncPrimaryDisk: {
          name: "Async Primary Disk",
          description: "Disk asynchronously replicated into this disk.",
          type: {
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
          required: false,
        },
        licenses: {
          name: "Licenses",
          description: "A list of publicly visible licenses.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        sourceSnapshotId: {
          name: "Source Snapshot ID",
          description:
            "[Output Only] The unique ID of the snapshot used to create this disk.",
          type: "string",
          required: false,
        },
        licenseCodes: {
          name: "License Codes",
          description:
            "Integer license codes indicating which licenses are attached to this disk.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        sourceConsistencyGroupPolicy: {
          name: "Source Consistency Group Policy",
          description:
            "[Output Only] URL of the DiskConsistencyGroupPolicy for a secondary disk that was created using a consistency group.",
          type: "string",
          required: false,
        },
        lastDetachTimestamp: {
          name: "Last Detach Timestamp",
          description:
            "[Output Only] Last detach timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of the resource.",
          type: "string",
          required: false,
        },
        type: {
          name: "Type",
          description:
            "URL of the disk type resource describing which disk type to use to create the disk.",
          type: "string",
          required: false,
        },
        resourceStatus: {
          name: "Resource Status",
          description:
            "[Output Only] Status information for the disk resource.",
          type: {
            type: "object",
            properties: {
              asyncPrimaryDisk: {
                type: "object",
                properties: {
                  state: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              asyncSecondaryDisks: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        physicalBlockSizeBytes: {
          name: "Physical Block Size Bytes",
          description: "Physical block size of the persistent disk, in bytes.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
          type: "string",
          required: false,
        },
        diskEncryptionKey: {
          name: "Disk Encryption Key",
          description:
            "Encrypts the disk using a customer-supplied encryption key or a customer-managed encryption key.",
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
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        satisfiesPzs: {
          name: "Satisfies Pzs",
          description: "[Output Only] Reserved for future use.",
          type: "boolean",
          required: false,
        },
        replicaZones: {
          name: "Replica Zones",
          description:
            "URLs of the zones where the disk should be replicated to.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        sourceSnapshotEncryptionKey: {
          name: "Source Snapshot Encryption Key",
          description:
            "Thecustomer-supplied encryption key of the source snapshot.",
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
        accessMode: {
          name: "Access Mode",
          description: "The access mode of the disk.",
          type: "string",
          required: false,
        },
        sourceSnapshot: {
          name: "Source Snapshot",
          description: "The source snapshot used to create this disk.",
          type: "string",
          required: false,
        },
        sourceInstantSnapshot: {
          name: "Source Instant Snapshot",
          description: "The source instant snapshot used to create this disk.",
          type: "string",
          required: false,
        },
        resourcePolicies: {
          name: "Resource Policies",
          description:
            "Resource policies applied to this disk for automatic snapshot creations.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        users: {
          name: "Users",
          description:
            "[Output Only] Links to the users of the disk (attached instances) in form:projects/project/zones/zon...",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        enableConfidentialCompute: {
          name: "Enable Confidential Compute",
          description: "Whether this disk is using confidential compute mode.",
          type: "boolean",
          required: false,
        },
        asyncSecondaryDisks: {
          name: "Async Secondary Disks",
          description:
            "[Output Only] A list of disks this disk is asynchronously replicated to.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        architecture: {
          name: "Architecture",
          description: "The architecture of the disk.",
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
        labels: {
          name: "Labels",
          description: "Labels to apply to this disk.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        provisionedIops: {
          name: "Provisioned Iops",
          description: "Indicates how many IOPS to provision for the disk.",
          type: "string",
          required: false,
        },
        sourceConsistencyGroupPolicyId: {
          name: "Source Consistency Group Policy ID",
          description:
            "[Output Only] ID of the DiskConsistencyGroupPolicy for a secondary disk that was created using a consistency group.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "Name of the resource.",
          type: "string",
          required: false,
        },
        sourceImage: {
          name: "Source Image",
          description: "The source image used to create this disk.",
          type: "string",
          required: false,
        },
        locationHint: {
          name: "Location Hint",
          description:
            "An opaque location hint used to place the disk close to other resources.",
          type: "string",
          required: false,
        },
        status: {
          name: "Status",
          description: "[Output Only] The status of disk creation.",
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
        sourceDiskId: {
          name: "Source Disk ID",
          description:
            "[Output Only] The unique ID of the disk used to create this disk.",
          type: "string",
          required: false,
        },
        zone: {
          name: "Zone",
          description: "[Output Only] URL of the zone where the disk resides.",
          type: "string",
          required: false,
        },
        sourceInstantSnapshotId: {
          name: "Source Instant Snapshot ID",
          description:
            "[Output Only] The unique ID of the instant snapshot used to create this disk.",
          type: "string",
          required: false,
        },
        satisfiesPzi: {
          name: "Satisfies Pzi",
          description: "Output only.",
          type: "boolean",
          required: false,
        },
        sourceStorageObject: {
          name: "Source Storage Object",
          description:
            "The full Google Cloud Storage URI where the disk image is stored.",
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
        sourceImageId: {
          name: "Source Image ID",
          description:
            "[Output Only] The ID value of the image used to create this disk.",
          type: "string",
          required: false,
        },
        sourceImageEncryptionKey: {
          name: "Source Image Encryption Key",
          description:
            "Thecustomer-supplied encryption key of the source image.",
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
        sourceDisk: {
          name: "Source Disk",
          description: "The source disk used to create this disk.",
          type: "string",
          required: false,
        },
        guestOsFeatures: {
          name: "Guest Os Features",
          description:
            "A list of features to enable on the guest operating system.",
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
        let path = `projects/{project}/regions/{region}/disks/{disk}`;

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

        if (input.event.inputConfig.provisionedThroughput !== undefined)
          requestBody.provisionedThroughput =
            input.event.inputConfig.provisionedThroughput;
        if (input.event.inputConfig.labelFingerprint !== undefined)
          requestBody.labelFingerprint =
            input.event.inputConfig.labelFingerprint;
        if (input.event.inputConfig.lastAttachTimestamp !== undefined)
          requestBody.lastAttachTimestamp =
            input.event.inputConfig.lastAttachTimestamp;
        if (input.event.inputConfig.storagePool !== undefined)
          requestBody.storagePool = input.event.inputConfig.storagePool;
        if (input.event.inputConfig.sizeGb !== undefined)
          requestBody.sizeGb = input.event.inputConfig.sizeGb;
        if (input.event.inputConfig.options !== undefined)
          requestBody.options = input.event.inputConfig.options;
        if (input.event.inputConfig.asyncPrimaryDisk !== undefined)
          requestBody.asyncPrimaryDisk =
            input.event.inputConfig.asyncPrimaryDisk;
        if (input.event.inputConfig.licenses !== undefined)
          requestBody.licenses = input.event.inputConfig.licenses;
        if (input.event.inputConfig.sourceSnapshotId !== undefined)
          requestBody.sourceSnapshotId =
            input.event.inputConfig.sourceSnapshotId;
        if (input.event.inputConfig.licenseCodes !== undefined)
          requestBody.licenseCodes = input.event.inputConfig.licenseCodes;
        if (input.event.inputConfig.sourceConsistencyGroupPolicy !== undefined)
          requestBody.sourceConsistencyGroupPolicy =
            input.event.inputConfig.sourceConsistencyGroupPolicy;
        if (input.event.inputConfig.lastDetachTimestamp !== undefined)
          requestBody.lastDetachTimestamp =
            input.event.inputConfig.lastDetachTimestamp;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.type !== undefined)
          requestBody.type = input.event.inputConfig.type;
        if (input.event.inputConfig.resourceStatus !== undefined)
          requestBody.resourceStatus = input.event.inputConfig.resourceStatus;
        if (input.event.inputConfig.physicalBlockSizeBytes !== undefined)
          requestBody.physicalBlockSizeBytes =
            input.event.inputConfig.physicalBlockSizeBytes;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.diskEncryptionKey !== undefined)
          requestBody.diskEncryptionKey =
            input.event.inputConfig.diskEncryptionKey;
        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.satisfiesPzs !== undefined)
          requestBody.satisfiesPzs = input.event.inputConfig.satisfiesPzs;
        if (input.event.inputConfig.replicaZones !== undefined)
          requestBody.replicaZones = input.event.inputConfig.replicaZones;
        if (input.event.inputConfig.sourceSnapshotEncryptionKey !== undefined)
          requestBody.sourceSnapshotEncryptionKey =
            input.event.inputConfig.sourceSnapshotEncryptionKey;
        if (input.event.inputConfig.accessMode !== undefined)
          requestBody.accessMode = input.event.inputConfig.accessMode;
        if (input.event.inputConfig.sourceSnapshot !== undefined)
          requestBody.sourceSnapshot = input.event.inputConfig.sourceSnapshot;
        if (input.event.inputConfig.sourceInstantSnapshot !== undefined)
          requestBody.sourceInstantSnapshot =
            input.event.inputConfig.sourceInstantSnapshot;
        if (input.event.inputConfig.resourcePolicies !== undefined)
          requestBody.resourcePolicies =
            input.event.inputConfig.resourcePolicies;
        if (input.event.inputConfig.users !== undefined)
          requestBody.users = input.event.inputConfig.users;
        if (input.event.inputConfig.enableConfidentialCompute !== undefined)
          requestBody.enableConfidentialCompute =
            input.event.inputConfig.enableConfidentialCompute;
        if (input.event.inputConfig.asyncSecondaryDisks !== undefined)
          requestBody.asyncSecondaryDisks =
            input.event.inputConfig.asyncSecondaryDisks;
        if (input.event.inputConfig.architecture !== undefined)
          requestBody.architecture = input.event.inputConfig.architecture;
        if (input.event.inputConfig.params !== undefined)
          requestBody.params = input.event.inputConfig.params;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.provisionedIops !== undefined)
          requestBody.provisionedIops = input.event.inputConfig.provisionedIops;
        if (
          input.event.inputConfig.sourceConsistencyGroupPolicyId !== undefined
        )
          requestBody.sourceConsistencyGroupPolicyId =
            input.event.inputConfig.sourceConsistencyGroupPolicyId;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.sourceImage !== undefined)
          requestBody.sourceImage = input.event.inputConfig.sourceImage;
        if (input.event.inputConfig.locationHint !== undefined)
          requestBody.locationHint = input.event.inputConfig.locationHint;
        if (input.event.inputConfig.status !== undefined)
          requestBody.status = input.event.inputConfig.status;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.sourceDiskId !== undefined)
          requestBody.sourceDiskId = input.event.inputConfig.sourceDiskId;
        if (input.event.inputConfig.zone !== undefined)
          requestBody.zone = input.event.inputConfig.zone;
        if (input.event.inputConfig.sourceInstantSnapshotId !== undefined)
          requestBody.sourceInstantSnapshotId =
            input.event.inputConfig.sourceInstantSnapshotId;
        if (input.event.inputConfig.satisfiesPzi !== undefined)
          requestBody.satisfiesPzi = input.event.inputConfig.satisfiesPzi;
        if (input.event.inputConfig.sourceStorageObject !== undefined)
          requestBody.sourceStorageObject =
            input.event.inputConfig.sourceStorageObject;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.sourceImageId !== undefined)
          requestBody.sourceImageId = input.event.inputConfig.sourceImageId;
        if (input.event.inputConfig.sourceImageEncryptionKey !== undefined)
          requestBody.sourceImageEncryptionKey =
            input.event.inputConfig.sourceImageEncryptionKey;
        if (input.event.inputConfig.sourceDisk !== undefined)
          requestBody.sourceDisk = input.event.inputConfig.sourceDisk;
        if (input.event.inputConfig.guestOsFeatures !== undefined)
          requestBody.guestOsFeatures = input.event.inputConfig.guestOsFeatures;

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

export default regionDisksUpdate;
