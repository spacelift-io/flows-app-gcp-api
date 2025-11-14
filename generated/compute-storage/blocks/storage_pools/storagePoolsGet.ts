import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const storagePoolsGet: AppBlock = {
  name: "Storage Pools - Get",
  description: `Returns a specified storage pool.`,
  category: "Storage Pools",
  inputs: {
    default: {
      config: {
        zone: {
          name: "Zone",
          description: "The name of the zone for this request.",
          type: "string",
          required: true,
        },
        storagePool: {
          name: "Storage Pool",
          description: "Name of the storage pool to return.",
          type: "string",
          required: true,
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
              "https://www.googleapis.com/auth/compute.readonly",
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
        let path = `projects/{project}/zones/{zone}/storagePools/{storagePool}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
          kind: {
            type: "string",
          },
          name: {
            type: "string",
          },
          state: {
            type: "string",
            enum: ["CREATING", "DELETING", "FAILED", "READY"],
          },
          storagePoolType: {
            type: "string",
          },
          poolProvisionedIops: {
            type: "string",
          },
          description: {
            type: "string",
          },
          performanceProvisioningType: {
            type: "string",
            enum: ["ADVANCED", "STANDARD", "UNSPECIFIED"],
          },
          poolProvisionedThroughput: {
            type: "string",
          },
          capacityProvisioningType: {
            type: "string",
            enum: ["ADVANCED", "STANDARD", "UNSPECIFIED"],
          },
          status: {
            type: "object",
            properties: {
              poolUsedIops: {
                type: "string",
              },
              diskCount: {
                type: "string",
              },
              poolUsedThroughput: {
                type: "string",
              },
              poolUserWrittenBytes: {
                type: "string",
              },
              poolUsedCapacityBytes: {
                type: "string",
              },
              totalProvisionedDiskIops: {
                type: "string",
              },
              lastResizeTimestamp: {
                type: "string",
              },
              totalProvisionedDiskThroughput: {
                type: "string",
              },
              totalProvisionedDiskCapacityGb: {
                type: "string",
              },
              maxTotalProvisionedDiskCapacityGb: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          selfLinkWithId: {
            type: "string",
          },
          resourceStatus: {
            type: "object",
            properties: {
              poolUsedIops: {
                type: "string",
              },
              diskCount: {
                type: "string",
              },
              poolUsedThroughput: {
                type: "string",
              },
              poolUserWrittenBytes: {
                type: "string",
              },
              poolUsedCapacityBytes: {
                type: "string",
              },
              totalProvisionedDiskIops: {
                type: "string",
              },
              lastResizeTimestamp: {
                type: "string",
              },
              totalProvisionedDiskThroughput: {
                type: "string",
              },
              totalProvisionedDiskCapacityGb: {
                type: "string",
              },
              maxTotalProvisionedDiskCapacityGb: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          zone: {
            type: "string",
          },
          id: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          labelFingerprint: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          poolProvisionedCapacityGb: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default storagePoolsGet;
