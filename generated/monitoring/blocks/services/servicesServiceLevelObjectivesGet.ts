import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const servicesServiceLevelObjectivesGet: AppBlock = {
  name: "Services - Get",
  description: `Get a ServiceLevelObjective by name.`,
  category: "Services",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. Resource name of the ServiceLevelObjective to get. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]/serviceLevelObjectives/[SLO_NAME] ",
          type: "string",
          required: true,
        },
        view: {
          name: "View",
          description:
            "View of the ServiceLevelObjective to return. If DEFAULT, return the ServiceLevelObjective as originally defined. If EXPLICIT and the ServiceLevelObjective is defined in terms of a BasicSli, replace the BasicSli with a RequestBasedSli spelling out how the SLI is computed. Valid values: VIEW_UNSPECIFIED, FULL, EXPLICIT",
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
          displayName: {
            type: "string",
          },
          serviceLevelIndicator: {
            type: "object",
            properties: {
              basicSli: {
                type: "object",
                additionalProperties: true,
              },
              requestBased: {
                type: "object",
                additionalProperties: true,
              },
              windowsBased: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          goal: {
            type: "number",
          },
          rollingPeriod: {
            type: "string",
          },
          calendarPeriod: {
            type: "string",
            enum: [
              "CALENDAR_PERIOD_UNSPECIFIED",
              "DAY",
              "WEEK",
              "FORTNIGHT",
              "MONTH",
              "QUARTER",
              "HALF",
              "YEAR",
            ],
          },
          userLabels: {
            type: "object",
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default servicesServiceLevelObjectivesGet;
