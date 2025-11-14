import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesAttachDisk: AppBlock = {
  name: "Instances - Attach Disk",
  description: `Attaches an existing Disk resource to an instance.`,
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
          description: "The instance name for this request.",
          type: "string",
          required: true,
        },
        forceAttach: {
          name: "Force Attach",
          description:
            "[Input Only] Whether to force attach the regional disk even if it's currently attached to another instance.",
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
        savedState: {
          name: "Saved State",
          description:
            "For LocalSSD disks on VM Instances in STOPPED or SUSPENDED state, this field is set to PRESERVED if the LocalSSD data has been saved to a persistent location by customer request.",
          type: "string",
          required: false,
        },
        diskSizeGb: {
          name: "Disk Size Gb",
          description: "The size of the disk in GB.",
          type: "string",
          required: false,
        },
        architecture: {
          name: "Architecture",
          description: "[Output Only] The architecture of the attached disk.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of the resource.",
          type: "string",
          required: false,
        },
        source: {
          name: "Source",
          description:
            "Specifies a valid partial or full URL to an existing Persistent Disk resource.",
          type: "string",
          required: false,
        },
        licenses: {
          name: "Licenses",
          description: "[Output Only] Any valid publicly visible licenses.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        initializeParams: {
          name: "Initialize Params",
          description:
            "[Input Only] Specifies the parameters for a new disk that will be created alongside the new instance.",
          type: {
            type: "object",
            properties: {
              architecture: {
                type: "string",
                enum: ["ARCHITECTURE_UNSPECIFIED", "ARM64", "X86_64"],
              },
              onUpdateAction: {
                type: "string",
                enum: [
                  "RECREATE_DISK",
                  "RECREATE_DISK_IF_SOURCE_CHANGED",
                  "USE_EXISTING_DISK",
                ],
              },
              labels: {
                type: "object",
                additionalProperties: true,
              },
              replicaZones: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              diskName: {
                type: "string",
              },
              resourcePolicies: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              sourceImageEncryptionKey: {
                type: "object",
                properties: {
                  rsaEncryptedKey: {
                    type: "object",
                    additionalProperties: true,
                  },
                  rawKey: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kmsKeyServiceAccount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sha256: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kmsKeyName: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              sourceSnapshotEncryptionKey: {
                type: "object",
                properties: {
                  rsaEncryptedKey: {
                    type: "object",
                    additionalProperties: true,
                  },
                  rawKey: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kmsKeyServiceAccount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sha256: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kmsKeyName: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              provisionedThroughput: {
                type: "string",
              },
              resourceManagerTags: {
                type: "object",
                additionalProperties: true,
              },
              licenses: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              diskSizeGb: {
                type: "string",
              },
              sourceSnapshot: {
                type: "string",
              },
              storagePool: {
                type: "string",
              },
              enableConfidentialCompute: {
                type: "boolean",
              },
              diskType: {
                type: "string",
              },
              description: {
                type: "string",
              },
              provisionedIops: {
                type: "string",
              },
              sourceImage: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        autoDelete: {
          name: "Auto Delete",
          description:
            "Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance).",
          type: "boolean",
          required: false,
        },
        type: {
          name: "Type",
          description:
            "Specifies the type of the disk, either SCRATCH orPERSISTENT.",
          type: "string",
          required: false,
        },
        shieldedInstanceInitialState: {
          name: "Shielded Instance Initial State",
          description: "[Output Only] shielded vm initial state stored on disk",
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
        diskEncryptionKey: {
          name: "Disk Encryption Key",
          description:
            "Encrypts or decrypts a disk using acustomer-supplied encryption key.",
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
        index: {
          name: "Index",
          description:
            "[Output Only] A zero-based index to this disk, where 0 is reserved for the boot disk.",
          type: "number",
          required: false,
        },
        interface: {
          name: "Interface",
          description:
            "Specifies the disk interface to use for attaching this disk, which is either SCSI or NVME.",
          type: "string",
          required: false,
        },
        boot: {
          name: "Boot",
          description: "Indicates that this is a boot disk.",
          type: "boolean",
          required: false,
        },
        deviceName: {
          name: "Device Name",
          description:
            "Specifies a unique device name of your choice that is reflected into the/dev/disk/by-id/google-* tree of a Linux operating system running within the instance.",
          type: "string",
          required: false,
        },
        mode: {
          name: "Mode",
          description:
            "The mode in which to attach this disk, either READ_WRITE orREAD_ONLY.",
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
        let path = `projects/{project}/zones/{zone}/instances/{instance}/attachDisk`;

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

        if (input.event.inputConfig.savedState !== undefined)
          requestBody.savedState = input.event.inputConfig.savedState;
        if (input.event.inputConfig.diskSizeGb !== undefined)
          requestBody.diskSizeGb = input.event.inputConfig.diskSizeGb;
        if (input.event.inputConfig.architecture !== undefined)
          requestBody.architecture = input.event.inputConfig.architecture;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.source !== undefined)
          requestBody.source = input.event.inputConfig.source;
        if (input.event.inputConfig.licenses !== undefined)
          requestBody.licenses = input.event.inputConfig.licenses;
        if (input.event.inputConfig.initializeParams !== undefined)
          requestBody.initializeParams =
            input.event.inputConfig.initializeParams;
        if (input.event.inputConfig.autoDelete !== undefined)
          requestBody.autoDelete = input.event.inputConfig.autoDelete;
        if (input.event.inputConfig.type !== undefined)
          requestBody.type = input.event.inputConfig.type;
        if (input.event.inputConfig.shieldedInstanceInitialState !== undefined)
          requestBody.shieldedInstanceInitialState =
            input.event.inputConfig.shieldedInstanceInitialState;
        if (input.event.inputConfig.diskEncryptionKey !== undefined)
          requestBody.diskEncryptionKey =
            input.event.inputConfig.diskEncryptionKey;
        if (input.event.inputConfig.guestOsFeatures !== undefined)
          requestBody.guestOsFeatures = input.event.inputConfig.guestOsFeatures;
        if (input.event.inputConfig.index !== undefined)
          requestBody.index = input.event.inputConfig.index;
        if (input.event.inputConfig.interface !== undefined)
          requestBody.interface = input.event.inputConfig.interface;
        if (input.event.inputConfig.boot !== undefined)
          requestBody.boot = input.event.inputConfig.boot;
        if (input.event.inputConfig.deviceName !== undefined)
          requestBody.deviceName = input.event.inputConfig.deviceName;
        if (input.event.inputConfig.mode !== undefined)
          requestBody.mode = input.event.inputConfig.mode;
        if (input.event.inputConfig.forceAttach !== undefined)
          requestBody.forceAttach = input.event.inputConfig.forceAttach;

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

export default instancesAttachDisk;
