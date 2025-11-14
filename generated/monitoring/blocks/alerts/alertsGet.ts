import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const alertsGet: AppBlock = {
  name: "Alerts - Get",
  description: `Gets a single alert.`,
  category: "Alerts",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The name of the alert.The format is: projects/[PROJECT_ID_OR_NUMBER]/alerts/[ALERT_ID] The [ALERT_ID] is a system-assigned unique identifier for the alert.",
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
          state: {
            type: "string",
            enum: ["STATE_UNSPECIFIED", "OPEN", "CLOSED"],
          },
          openTime: {
            type: "string",
          },
          closeTime: {
            type: "string",
          },
          resource: {
            type: "object",
            properties: {
              type: {
                type: "string",
              },
              labels: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          metadata: {
            type: "object",
            properties: {
              systemLabels: {
                type: "object",
                additionalProperties: true,
              },
              userLabels: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          metric: {
            type: "object",
            properties: {
              type: {
                type: "string",
              },
              labels: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          log: {
            type: "object",
            properties: {
              extractedLabels: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          policy: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              displayName: {
                type: "string",
              },
              severity: {
                type: "string",
                enum: ["SEVERITY_UNSPECIFIED", "CRITICAL", "ERROR", "WARNING"],
              },
              userLabels: {
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

export default alertsGet;
