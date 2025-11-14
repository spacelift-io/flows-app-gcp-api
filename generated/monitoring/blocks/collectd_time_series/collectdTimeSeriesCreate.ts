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
        resource: {
          name: "Resource",
          description:
            "The monitored resource associated with the time series.",
          type: {
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
          required: false,
        },
        collectdVersion: {
          name: "Collectd Version",
          description: "The version of collectd that collected the data.",
          type: "string",
          required: false,
        },
        collectdPayloads: {
          name: "Collectd Payloads",
          description:
            "The collectd payloads representing the time series data.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                values: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                startTime: {
                  type: "string",
                },
                endTime: {
                  type: "string",
                },
                plugin: {
                  type: "string",
                },
                pluginInstance: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                typeInstance: {
                  type: "string",
                },
                metadata: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
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
              "https://www.googleapis.com/auth/monitoring.write",
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
        let path = `v3/{+name}/collectdTimeSeries`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.resource !== undefined)
          requestBody.resource = input.event.inputConfig.resource;
        if (input.event.inputConfig.collectdVersion !== undefined)
          requestBody.collectdVersion = input.event.inputConfig.collectdVersion;
        if (input.event.inputConfig.collectdPayloads !== undefined)
          requestBody.collectdPayloads =
            input.event.inputConfig.collectdPayloads;

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
