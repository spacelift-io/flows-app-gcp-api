import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsClustersCheckAutopilotCompatibility: AppBlock = {
  name: "Locations - Check Autopilot Compatibility",
  description: `Checks the cluster compatibility with Autopilot mode, and returns a list of compatibility issues.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "The name (project, location, cluster) of the cluster to retrieve. Specified in the format `projects/*/locations/*/clusters/*`.",
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
        const path = `v1/{+name}:checkAutopilotCompatibility`;
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
          summary: {
            type: "string",
          },
          issues: {
            type: "array",
            items: {
              type: "object",
              properties: {
                lastObservation: {
                  type: "object",
                  additionalProperties: true,
                },
                incompatibilityType: {
                  type: "object",
                  additionalProperties: true,
                },
                subjects: {
                  type: "object",
                  additionalProperties: true,
                },
                documentationUrl: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
                constraintType: {
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

export default locationsClustersCheckAutopilotCompatibility;
