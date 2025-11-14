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
          description: "The resource name of the metric descriptor.",
          type: "string",
          required: false,
        },
        type: {
          name: "Type",
          description: "The metric type, including its DNS name prefix.",
          type: "string",
          required: false,
        },
        labels: {
          name: "Labels",
          description:
            "The set of labels that can be used to describe a specific instance of this metric type.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                key: {
                  type: "string",
                },
                valueType: {
                  type: "string",
                  enum: ["STRING", "BOOL", "INT64"],
                },
                description: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        metricKind: {
          name: "Metric Kind",
          description:
            "Whether the metric records instantaneous values, changes to a value, etc.",
          type: "string",
          required: false,
        },
        valueType: {
          name: "Value Type",
          description:
            "Whether the measurement is an integer, a floating-point number, etc.",
          type: "string",
          required: false,
        },
        unit: {
          name: "Unit",
          description: "The units in which the metric value is reported.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description:
            "A detailed description of the metric, which can be used in documentation.",
          type: "string",
          required: false,
        },
        displayName: {
          name: "Display Name",
          description:
            "A concise name for the metric, which can be displayed in user interfaces.",
          type: "string",
          required: false,
        },
        metadata: {
          name: "Metadata",
          description: "Optional.",
          type: {
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
                  type: "string",
                  enum: [
                    "TIME_SERIES_RESOURCE_HIERARCHY_LEVEL_UNSPECIFIED",
                    "PROJECT",
                    "ORGANIZATION",
                    "FOLDER",
                  ],
                },
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        launchStage: {
          name: "Launch Stage",
          description: "Optional.",
          type: "string",
          required: false,
        },
        monitoredResourceTypes: {
          name: "Monitored Resource Types",
          description: "Read-only.",
          type: {
            type: "array",
            items: {
              type: "string",
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
        let path = `v3/{+name}/metricDescriptors`;

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

        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.type !== undefined)
          requestBody.type = input.event.inputConfig.type;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.metricKind !== undefined)
          requestBody.metricKind = input.event.inputConfig.metricKind;
        if (input.event.inputConfig.valueType !== undefined)
          requestBody.valueType = input.event.inputConfig.valueType;
        if (input.event.inputConfig.unit !== undefined)
          requestBody.unit = input.event.inputConfig.unit;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.displayName !== undefined)
          requestBody.displayName = input.event.inputConfig.displayName;
        if (input.event.inputConfig.metadata !== undefined)
          requestBody.metadata = input.event.inputConfig.metadata;
        if (input.event.inputConfig.launchStage !== undefined)
          requestBody.launchStage = input.event.inputConfig.launchStage;
        if (input.event.inputConfig.monitoredResourceTypes !== undefined)
          requestBody.monitoredResourceTypes =
            input.event.inputConfig.monitoredResourceTypes;

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
