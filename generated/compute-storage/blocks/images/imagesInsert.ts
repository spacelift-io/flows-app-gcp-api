import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const imagesInsert: AppBlock = {
  name: "Images - Insert",
  description: `Creates an image in the specified project using the data included in the request.`,
  category: "Images",
  inputs: {
    default: {
      config: {
        forceCreate: {
          name: "Force Create",
          description: "Force image creation if true.",
          type: "boolean",
          required: false,
        },
        requestId: {
          name: "Request ID",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        storageLocations: {
          name: "Storage Locations",
          description:
            "Cloud Storage bucket storage location of the image (regional or multi-regional).",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        satisfiesPzi: {
          name: "Satisfies Pzi",
          description: "Output only.",
          type: "boolean",
          required: false,
        },
        shieldedInstanceInitialState: {
          name: "Shielded Instance Initial State",
          description: "Set the secure boot keys of shielded instance.",
          type: {
            type: "object",
            properties: {
              dbxs: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              keks: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              dbs: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              pk: {
                type: "object",
                properties: {
                  content: {
                    type: "object",
                    additionalProperties: true,
                  },
                  fileType: {
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
        deprecated: {
          name: "Deprecated",
          description: "The deprecation status associated with this image.",
          type: {
            type: "object",
            properties: {
              state: {
                type: "string",
                enum: ["ACTIVE", "DELETED", "DEPRECATED", "OBSOLETE"],
              },
              deprecated: {
                type: "string",
              },
              replacement: {
                type: "string",
              },
              obsolete: {
                type: "string",
              },
              deleted: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        sourceDisk: {
          name: "Source Disk",
          description: "URL of the source disk used to create this image.",
          type: "string",
          required: false,
        },
        sourceDiskEncryptionKey: {
          name: "Source Disk Encryption Key",
          description:
            "Thecustomer-supplied encryption key of the source disk.",
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
        sourceImage: {
          name: "Source Image",
          description: "URL of the source image used to create this image.",
          type: "string",
          required: false,
        },
        status: {
          name: "Status",
          description: "[Output Only] The status of the image.",
          type: "string",
          required: false,
        },
        licenseCodes: {
          name: "License Codes",
          description:
            "Integer license codes indicating which licenses are attached to this image.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        labelFingerprint: {
          name: "Label Fingerprint",
          description:
            "A fingerprint for the labels being applied to this image, which is essentially a hash of the labels used for optimistic locking.",
          type: "string",
          required: false,
        },
        sourceSnapshot: {
          name: "Source Snapshot",
          description: "URL of the source snapshot used to create this image.",
          type: "string",
          required: false,
        },
        archiveSizeBytes: {
          name: "Archive Size Bytes",
          description: "Size of the image tar.",
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
        enableConfidentialCompute: {
          name: "Enable Confidential Compute",
          description:
            "Whether this image is created from a confidential compute mode disk.",
          type: "boolean",
          required: false,
        },
        sourceType: {
          name: "Source Type",
          description: "The type of the image used to create this disk.",
          type: "string",
          required: false,
        },
        rawDisk: {
          name: "Raw Disk",
          description: "The parameters of the raw disk image.",
          type: {
            type: "object",
            properties: {
              containerType: {
                type: "string",
                enum: ["TAR"],
              },
              sha1Checksum: {
                type: "string",
              },
              source: {
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
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        imageEncryptionKey: {
          name: "Image Encryption Key",
          description:
            "Encrypts the image using acustomer-supplied encryption key.",
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
        sourceImageId: {
          name: "Source Image ID",
          description:
            "[Output Only] The ID value of the image used to create this image.",
          type: "string",
          required: false,
        },
        sourceImageEncryptionKey: {
          name: "Source Image Encryption Key",
          description:
            "The customer-supplied encryption key of the source image.",
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
        licenses: {
          name: "Licenses",
          description: "Any applicable license URI.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
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
            "[Output Only] Creation timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        sourceSnapshotEncryptionKey: {
          name: "Source Snapshot Encryption Key",
          description:
            "The customer-supplied encryption key of the source snapshot.",
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
        diskSizeGb: {
          name: "Disk Size Gb",
          description:
            "Size of the image when restored onto a persistent disk (in GB).",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for the resource.",
          type: "string",
          required: false,
        },
        labels: {
          name: "Labels",
          description: "Labels to apply to this image.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of the resource.",
          type: "string",
          required: false,
        },
        sourceDiskId: {
          name: "Source Disk ID",
          description:
            "[Output Only] The ID value of the disk used to create this image.",
          type: "string",
          required: false,
        },
        satisfiesPzs: {
          name: "Satisfies Pzs",
          description: "[Output Only] Reserved for future use.",
          type: "boolean",
          required: false,
        },
        architecture: {
          name: "Architecture",
          description: "The architecture of the image.",
          type: "string",
          required: false,
        },
        sourceSnapshotId: {
          name: "Source Snapshot ID",
          description:
            "[Output Only] The ID value of the snapshot used to create this image.",
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
        let path = `projects/{project}/global/images`;

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

        if (input.event.inputConfig.storageLocations !== undefined)
          requestBody.storageLocations =
            input.event.inputConfig.storageLocations;
        if (input.event.inputConfig.satisfiesPzi !== undefined)
          requestBody.satisfiesPzi = input.event.inputConfig.satisfiesPzi;
        if (input.event.inputConfig.shieldedInstanceInitialState !== undefined)
          requestBody.shieldedInstanceInitialState =
            input.event.inputConfig.shieldedInstanceInitialState;
        if (input.event.inputConfig.deprecated !== undefined)
          requestBody.deprecated = input.event.inputConfig.deprecated;
        if (input.event.inputConfig.sourceDisk !== undefined)
          requestBody.sourceDisk = input.event.inputConfig.sourceDisk;
        if (input.event.inputConfig.sourceDiskEncryptionKey !== undefined)
          requestBody.sourceDiskEncryptionKey =
            input.event.inputConfig.sourceDiskEncryptionKey;
        if (input.event.inputConfig.sourceImage !== undefined)
          requestBody.sourceImage = input.event.inputConfig.sourceImage;
        if (input.event.inputConfig.status !== undefined)
          requestBody.status = input.event.inputConfig.status;
        if (input.event.inputConfig.licenseCodes !== undefined)
          requestBody.licenseCodes = input.event.inputConfig.licenseCodes;
        if (input.event.inputConfig.labelFingerprint !== undefined)
          requestBody.labelFingerprint =
            input.event.inputConfig.labelFingerprint;
        if (input.event.inputConfig.sourceSnapshot !== undefined)
          requestBody.sourceSnapshot = input.event.inputConfig.sourceSnapshot;
        if (input.event.inputConfig.archiveSizeBytes !== undefined)
          requestBody.archiveSizeBytes =
            input.event.inputConfig.archiveSizeBytes;
        if (input.event.inputConfig.params !== undefined)
          requestBody.params = input.event.inputConfig.params;
        if (input.event.inputConfig.enableConfidentialCompute !== undefined)
          requestBody.enableConfidentialCompute =
            input.event.inputConfig.enableConfidentialCompute;
        if (input.event.inputConfig.sourceType !== undefined)
          requestBody.sourceType = input.event.inputConfig.sourceType;
        if (input.event.inputConfig.rawDisk !== undefined)
          requestBody.rawDisk = input.event.inputConfig.rawDisk;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.imageEncryptionKey !== undefined)
          requestBody.imageEncryptionKey =
            input.event.inputConfig.imageEncryptionKey;
        if (input.event.inputConfig.sourceImageId !== undefined)
          requestBody.sourceImageId = input.event.inputConfig.sourceImageId;
        if (input.event.inputConfig.sourceImageEncryptionKey !== undefined)
          requestBody.sourceImageEncryptionKey =
            input.event.inputConfig.sourceImageEncryptionKey;
        if (input.event.inputConfig.licenses !== undefined)
          requestBody.licenses = input.event.inputConfig.licenses;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.sourceSnapshotEncryptionKey !== undefined)
          requestBody.sourceSnapshotEncryptionKey =
            input.event.inputConfig.sourceSnapshotEncryptionKey;
        if (input.event.inputConfig.diskSizeGb !== undefined)
          requestBody.diskSizeGb = input.event.inputConfig.diskSizeGb;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.sourceDiskId !== undefined)
          requestBody.sourceDiskId = input.event.inputConfig.sourceDiskId;
        if (input.event.inputConfig.satisfiesPzs !== undefined)
          requestBody.satisfiesPzs = input.event.inputConfig.satisfiesPzs;
        if (input.event.inputConfig.architecture !== undefined)
          requestBody.architecture = input.event.inputConfig.architecture;
        if (input.event.inputConfig.sourceSnapshotId !== undefined)
          requestBody.sourceSnapshotId =
            input.event.inputConfig.sourceSnapshotId;
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

export default imagesInsert;
