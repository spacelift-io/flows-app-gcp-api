import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const machineImagesGet: AppBlock = {
  name: "Machine Images - Get",
  description: `Returns the specified machine image.`,
  category: "Machine Images",
  inputs: {
    default: {
      config: {
        machineImage: {
          name: "MachineImage",
          description: "The name of the machine image.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
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
            "https://www.googleapis.com/auth/compute.readonly",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        const path = `projects/{project}/global/machineImages/{machineImage}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        };

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
    },
  },
};

export default machineImagesGet;
