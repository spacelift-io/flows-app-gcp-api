import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const serviceLevelObjectivesPatch: AppBlock = {
  name: "Service Level Objectives - Patch",
  description: `Update the given ServiceLevelObjective.`,
  category: "Service Level Objectives",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Identifier.",
          type: "string",
          required: false,
        },
        updateMask: {
          name: "Update Mask",
          description:
            "A set of field paths defining which fields to use for the update.",
          type: "string",
          required: false,
        },
        displayName: {
          name: "Display Name",
          description: "Name used for UI elements listing this SLO.",
          type: "string",
          required: false,
        },
        serviceLevelIndicator: {
          name: "Service Level Indicator",
          description:
            "The definition of good service, used to measure and calculate the quality of the Service's performance with respect to a single aspect of service quality.",
          type: {
            type: "object",
            properties: {
              basicSli: {
                type: "object",
                properties: {
                  method: {
                    type: "object",
                    additionalProperties: true,
                  },
                  location: {
                    type: "object",
                    additionalProperties: true,
                  },
                  version: {
                    type: "object",
                    additionalProperties: true,
                  },
                  availability: {
                    type: "object",
                    additionalProperties: true,
                  },
                  latency: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              requestBased: {
                type: "object",
                properties: {
                  goodTotalRatio: {
                    type: "object",
                    additionalProperties: true,
                  },
                  distributionCut: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              windowsBased: {
                type: "object",
                properties: {
                  goodBadMetricFilter: {
                    type: "object",
                    additionalProperties: true,
                  },
                  goodTotalRatioThreshold: {
                    type: "object",
                    additionalProperties: true,
                  },
                  metricMeanInRange: {
                    type: "object",
                    additionalProperties: true,
                  },
                  metricSumInRange: {
                    type: "object",
                    additionalProperties: true,
                  },
                  windowPeriod: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        goal: {
          name: "Goal",
          description:
            "The fraction of service that must be good in order for this objective to be met.",
          type: "number",
          required: false,
        },
        rollingPeriod: {
          name: "Rolling Period",
          description: 'A rolling time period, semantically "in the past ".',
          type: "string",
          required: false,
        },
        calendarPeriod: {
          name: "Calendar Period",
          description:
            'A calendar period, semantically "since the start of the current ".',
          type: "string",
          required: false,
        },
        userLabels: {
          name: "User Labels",
          description:
            "Labels which have been used to annotate the service-level objective.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
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
              "https://www.googleapis.com/auth/monitoring",
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
        const baseUrl = "https://monitoring.googleapis.com/";
        let path = `v3/{+name}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.displayName !== undefined)
          requestBody.displayName = input.event.inputConfig.displayName;
        if (input.event.inputConfig.serviceLevelIndicator !== undefined)
          requestBody.serviceLevelIndicator =
            input.event.inputConfig.serviceLevelIndicator;
        if (input.event.inputConfig.goal !== undefined)
          requestBody.goal = input.event.inputConfig.goal;
        if (input.event.inputConfig.rollingPeriod !== undefined)
          requestBody.rollingPeriod = input.event.inputConfig.rollingPeriod;
        if (input.event.inputConfig.calendarPeriod !== undefined)
          requestBody.calendarPeriod = input.event.inputConfig.calendarPeriod;
        if (input.event.inputConfig.userLabels !== undefined)
          requestBody.userLabels = input.event.inputConfig.userLabels;

        if (Object.keys(requestBody).length > 0) {
          requestOptions.body = JSON.stringify(requestBody);
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

export default serviceLevelObjectivesPatch;
