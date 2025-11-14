import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const snoozesGet: AppBlock = {
  name: "Snoozes - Get",
  description: `Retrieves a Snooze by name.`,
  category: "Snoozes",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The ID of the Snooze to retrieve. The format is: projects/[PROJECT_ID_OR_NUMBER]/snoozes/[SNOOZE_ID] ",
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
            "https://www.googleapis.com/auth/monitoring",
            "https://www.googleapis.com/auth/monitoring.read",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://monitoring.googleapis.com/";
        const path = `v3/{+name}`;
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
          name: {
            type: "string",
          },
          criteria: {
            type: "object",
            properties: {
              policies: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              filter: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          interval: {
            type: "object",
            properties: {
              endTime: {
                type: "string",
              },
              startTime: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          displayName: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default snoozesGet;
