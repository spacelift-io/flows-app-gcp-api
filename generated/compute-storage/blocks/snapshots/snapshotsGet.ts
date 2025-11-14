import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const snapshotsGet: AppBlock = {
  name: "Snapshots - Get",
  description: `Returns the specified Snapshot resource.`,
  category: "Snapshots",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        snapshot: {
          name: "Snapshot",
          description: "Name of the Snapshot resource to return.",
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
        const path = `projects/{project}/global/snapshots/{snapshot}`;
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
    },
  },
};

export default snapshotsGet;
