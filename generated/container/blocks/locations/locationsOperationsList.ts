import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsOperationsList: AppBlock = {
  name: "Locations - List",
  description: `Lists all operations in a project in a specific zone or all zones.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            'The parent (project and location) where the operations will be listed. Specified in the format `projects/*/locations/*`. Location "-" matches all zones and all regions.',
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
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://container.googleapis.com/";
        const path = `v1/{+parent}/operations`;
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
          operations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                startTime: {
                  type: "object",
                  additionalProperties: true,
                },
                clusterConditions: {
                  type: "object",
                  additionalProperties: true,
                },
                location: {
                  type: "object",
                  additionalProperties: true,
                },
                error: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                progress: {
                  type: "object",
                  additionalProperties: true,
                },
                statusMessage: {
                  type: "object",
                  additionalProperties: true,
                },
                nodepoolConditions: {
                  type: "object",
                  additionalProperties: true,
                },
                selfLink: {
                  type: "object",
                  additionalProperties: true,
                },
                status: {
                  type: "object",
                  additionalProperties: true,
                },
                zone: {
                  type: "object",
                  additionalProperties: true,
                },
                endTime: {
                  type: "object",
                  additionalProperties: true,
                },
                operationType: {
                  type: "object",
                  additionalProperties: true,
                },
                targetLink: {
                  type: "object",
                  additionalProperties: true,
                },
                detail: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          missingZones: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsOperationsList;
