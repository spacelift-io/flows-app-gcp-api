import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const regionDiskTypesGet: AppBlock = {
  name: "Region Disk Types - Get",
  description: `Returns the specified regional disk type.`,
  category: "Region Disk Types",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description: "The name of the region for this request.",
          type: "string",
          required: true,
        },
        diskType: {
          name: "DiskType",
          description: "Name of the disk type to return.",
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
        const path = `projects/{project}/regions/{region}/diskTypes/{diskType}`;
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
          zone: {
            type: "string",
          },
          defaultDiskSizeGb: {
            type: "string",
          },
          region: {
            type: "string",
          },
          validDiskSize: {
            type: "string",
          },
          kind: {
            type: "string",
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
          creationTimestamp: {
            type: "string",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          id: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default regionDiskTypesGet;
