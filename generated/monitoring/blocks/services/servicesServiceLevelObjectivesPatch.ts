import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const servicesServiceLevelObjectivesPatch: AppBlock = {
  name: "Services - Patch",
  description: `Update the given ServiceLevelObjective.`,
  category: "Services",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Identifier. Resource name for this ServiceLevelObjective. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]/serviceLevelObjectives/[SLO_NAME] ",
          type: "string",
          required: true,
        },
        updateMask: {
          name: "UpdateMask",
          description:
            "A set of field paths defining which fields to use for the update.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            'A Service-Level Objective (SLO) describes a level of desired good service. It consists of a service-level indicator (SLI), a performance goal, and a period over which the objective is to be evaluated against that goal. The SLO can use SLIs defined in a number of different manners. Typical SLOs might include "99% of requests in each rolling week have latency below 200 milliseconds" or "99.5% of requests in each calendar month return successfully."',
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
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        };

        // Add request body
        if (input.event.inputConfig.requestBody) {
          requestOptions.body = JSON.stringify(
            input.event.inputConfig.requestBody,
          );
        }

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

export default servicesServiceLevelObjectivesPatch;
