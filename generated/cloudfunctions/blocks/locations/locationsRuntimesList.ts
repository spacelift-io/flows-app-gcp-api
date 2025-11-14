import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsRuntimesList: AppBlock = {
  name: "Locations - List",
  description: `Returns a list of runtimes that are supported for the requested project.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The project and location from which the runtimes should be listed, specified in the format `projects/*/locations/*`",
          type: "string",
          required: true,
        },
        filter: {
          name: "Filter",
          description:
            "The filter for Runtimes that match the filter expression, following the syntax outlined in https://google.aip.dev/160.",
          type: "string",
          required: false,
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
        const baseUrl = "https://cloudfunctions.googleapis.com/";
        const path = `v2/{+parent}/runtimes`;
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
          runtimes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                displayName: {
                  type: "object",
                  additionalProperties: true,
                },
                stage: {
                  type: "object",
                  additionalProperties: true,
                },
                warnings: {
                  type: "object",
                  additionalProperties: true,
                },
                environment: {
                  type: "object",
                  additionalProperties: true,
                },
                deprecationDate: {
                  type: "object",
                  additionalProperties: true,
                },
                decommissionDate: {
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

export default locationsRuntimesList;
