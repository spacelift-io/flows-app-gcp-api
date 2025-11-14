import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const disksGet: AppBlock = {
  name: "Disks - Get",
  description: `Returns the specified persistent disk.`,
  category: "Disks",
  inputs: {
    default: {
      config: {
        disk: {
          name: "Disk",
          description: "Name of the persistent disk to return.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        zone: {
          name: "Zone",
          description: "The name of the zone for this request.",
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
        const path = `projects/{project}/zones/{zone}/disks/{disk}`;
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
            enum: ["READ_ONLY_MANY", "READ_WRITE_MANY", "READ_WRITE_SINGLE"],
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
    },
  },
};

export default disksGet;
