import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const machineTypesGet: AppBlock = {
  name: "Machine Types - Get",
  description: `Returns the specified machine type.`,
  category: "Machine Types",
  inputs: {
    default: {
      config: {
        zone: {
          name: "Zone",
          description: "The name of the zone for this request.",
          type: "string",
          required: true,
        },
        machineType: {
          name: "Machine Type",
          description: "Name of the machine type to return.",
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
        let path = `projects/{project}/zones/{zone}/machineTypes/{machineType}`;

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
          selfLink: {
            type: "string",
          },
          description: {
            type: "string",
          },
          imageSpaceGb: {
            type: "number",
          },
          maximumPersistentDisks: {
            type: "number",
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
          isSharedCpu: {
            type: "boolean",
          },
          id: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          zone: {
            type: "string",
          },
          name: {
            type: "string",
          },
          guestCpus: {
            type: "number",
          },
          maximumPersistentDisksSizeGb: {
            type: "string",
          },
          memoryMb: {
            type: "number",
          },
          accelerators: {
            type: "array",
            items: {
              type: "object",
              properties: {
                guestAcceleratorCount: {
                  type: "number",
                },
                guestAcceleratorType: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          creationTimestamp: {
            type: "string",
          },
          architecture: {
            type: "string",
            enum: ["ARCHITECTURE_UNSPECIFIED", "ARM64", "X86_64"],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default machineTypesGet;
