import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const collectdTimeSeriesCreate: AppBlock = {
  name: "Collectd Time Series - Create",
  description: `Cloud Monitoring Agent only: Creates a new time series.`,
  category: "Collectd Time Series",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "The project (https://cloud.google.com/monitoring/api/v3#project_name) in which to create the time series. The format is: projects/[PROJECT_ID_OR_NUMBER] ",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "The CreateCollectdTimeSeries request.",
          type: {
            type: "object",
            properties: {
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
              collectdVersion: {
                type: "string",
              },
              collectdPayloads: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    values: {
                      type: "object",
                      additionalProperties: true,
                    },
                    startTime: {
                      type: "object",
                      additionalProperties: true,
                    },
                    endTime: {
                      type: "object",
                      additionalProperties: true,
                    },
                    plugin: {
                      type: "object",
                      additionalProperties: true,
                    },
                    pluginInstance: {
                      type: "object",
                      additionalProperties: true,
                    },
                    type: {
                      type: "object",
                      additionalProperties: true,
                    },
                    typeInstance: {
                      type: "object",
                      additionalProperties: true,
                    },
                    metadata: {
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
            "https://www.googleapis.com/auth/monitoring.write",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://monitoring.googleapis.com/";
        const path = `v3/{+name}/collectdTimeSeries`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
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
          payloadErrors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                index: {
                  type: "object",
                  additionalProperties: true,
                },
                error: {
                  type: "object",
                  additionalProperties: true,
                },
                valueErrors: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          summary: {
            type: "object",
            properties: {
              totalPointCount: {
                type: "number",
              },
              successPointCount: {
                type: "number",
              },
              errors: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
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

export default collectdTimeSeriesCreate;
