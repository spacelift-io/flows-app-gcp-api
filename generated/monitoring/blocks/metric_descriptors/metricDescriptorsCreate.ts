import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const metricDescriptorsCreate: AppBlock = {
  name: "Metric Descriptors - Create",
  description: `Creates a new metric descriptor.`,
  category: "Metric Descriptors",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: 4 projects/PROJECT_ID_OR_NUMBER",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Defines a metric type and its schema. Once a metric descriptor is created, deleting or altering it stops data collection and makes the metric type's existing data unusable.",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              type: {
                type: "string",
              },
              labels: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    key: {
                      type: "object",
                      additionalProperties: true,
                    },
                    valueType: {
                      type: "object",
                      additionalProperties: true,
                    },
                    description: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              metricKind: {
                type: "string",
                enum: [
                  "METRIC_KIND_UNSPECIFIED",
                  "GAUGE",
                  "DELTA",
                  "CUMULATIVE",
                ],
              },
              valueType: {
                type: "string",
                enum: [
                  "VALUE_TYPE_UNSPECIFIED",
                  "BOOL",
                  "INT64",
                  "DOUBLE",
                  "STRING",
                  "DISTRIBUTION",
                  "MONEY",
                ],
              },
              unit: {
                type: "string",
              },
              description: {
                type: "string",
              },
              displayName: {
                type: "string",
              },
              metadata: {
                type: "object",
                properties: {
                  launchStage: {
                    type: "string",
                    enum: [
                      "LAUNCH_STAGE_UNSPECIFIED",
                      "UNIMPLEMENTED",
                      "PRELAUNCH",
                      "EARLY_ACCESS",
                      "ALPHA",
                      "BETA",
                      "GA",
                      "DEPRECATED",
                    ],
                  },
                  samplePeriod: {
                    type: "string",
                  },
                  ingestDelay: {
                    type: "string",
                  },
                  timeSeriesResourceHierarchyLevel: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
                additionalProperties: true,
              },
              launchStage: {
                type: "string",
                enum: [
                  "LAUNCH_STAGE_UNSPECIFIED",
                  "UNIMPLEMENTED",
                  "PRELAUNCH",
                  "EARLY_ACCESS",
                  "ALPHA",
                  "BETA",
                  "GA",
                  "DEPRECATED",
                ],
              },
              monitoredResourceTypes: {
                type: "array",
                items: {
                  type: "string",
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
        const path = `v3/{+name}/metricDescriptors`;
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
          name: {
            type: "string",
          },
          type: {
            type: "string",
          },
          labels: {
            type: "array",
            items: {
              type: "object",
              properties: {
                key: {
                  type: "object",
                  additionalProperties: true,
                },
                valueType: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          metricKind: {
            type: "string",
            enum: ["METRIC_KIND_UNSPECIFIED", "GAUGE", "DELTA", "CUMULATIVE"],
          },
          valueType: {
            type: "string",
            enum: [
              "VALUE_TYPE_UNSPECIFIED",
              "BOOL",
              "INT64",
              "DOUBLE",
              "STRING",
              "DISTRIBUTION",
              "MONEY",
            ],
          },
          unit: {
            type: "string",
          },
          description: {
            type: "string",
          },
          displayName: {
            type: "string",
          },
          metadata: {
            type: "object",
            properties: {
              launchStage: {
                type: "string",
                enum: [
                  "LAUNCH_STAGE_UNSPECIFIED",
                  "UNIMPLEMENTED",
                  "PRELAUNCH",
                  "EARLY_ACCESS",
                  "ALPHA",
                  "BETA",
                  "GA",
                  "DEPRECATED",
                ],
              },
              samplePeriod: {
                type: "string",
              },
              ingestDelay: {
                type: "string",
              },
              timeSeriesResourceHierarchyLevel: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          launchStage: {
            type: "string",
            enum: [
              "LAUNCH_STAGE_UNSPECIFIED",
              "UNIMPLEMENTED",
              "PRELAUNCH",
              "EARLY_ACCESS",
              "ALPHA",
              "BETA",
              "GA",
              "DEPRECATED",
            ],
          },
          monitoredResourceTypes: {
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

export default metricDescriptorsCreate;
