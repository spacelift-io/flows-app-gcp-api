import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const imagesGetFromFamily: AppBlock = {
  name: "Images - Get From Family",
  description: `Returns the latest image that is part of an image family and is not deprecated.`,
  category: "Images",
  inputs: {
    default: {
      config: {
        family: {
          name: "Family",
          description: "Name of the image family to search for.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description:
            "The image project that the image belongs to. For example, to get a CentOS\nimage, specify centos-cloud as the image project.",
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
        const path = `projects/{project}/global/images/family/{family}`;
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
          storageLocations: {
            type: "array",
            items: {
              type: "string",
            },
          },
          satisfiesPzi: {
            type: "boolean",
          },
          shieldedInstanceInitialState: {
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
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          deprecated: {
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
          sourceDisk: {
            type: "string",
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
          sourceImage: {
            type: "string",
          },
          status: {
            type: "string",
            enum: ["DELETING", "FAILED", "PENDING", "READY"],
          },
          licenseCodes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          labelFingerprint: {
            type: "string",
          },
          sourceSnapshot: {
            type: "string",
          },
          archiveSizeBytes: {
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
          enableConfidentialCompute: {
            type: "boolean",
          },
          sourceType: {
            type: "string",
            enum: ["RAW"],
          },
          rawDisk: {
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
          id: {
            type: "string",
          },
          description: {
            type: "string",
          },
          imageEncryptionKey: {
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
          licenses: {
            type: "array",
            items: {
              type: "string",
            },
          },
          name: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
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
          diskSizeGb: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          kind: {
            type: "string",
          },
          sourceDiskId: {
            type: "string",
          },
          satisfiesPzs: {
            type: "boolean",
          },
          architecture: {
            type: "string",
            enum: ["ARCHITECTURE_UNSPECIFIED", "ARM64", "X86_64"],
          },
          sourceSnapshotId: {
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
          family: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default imagesGetFromFamily;
