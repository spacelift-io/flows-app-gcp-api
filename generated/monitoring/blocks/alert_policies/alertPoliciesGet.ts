import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const alertPoliciesGet: AppBlock = {
  name: "Alert Policies - Get",
  description: `Gets a single alerting policy.`,
  category: "Alert Policies",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The alerting policy to retrieve. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID] ",
          type: "string",
          required: true,
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
              "https://www.googleapis.com/auth/monitoring.read",
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
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
          documentation: {
            type: "object",
            properties: {
              content: {
                type: "string",
              },
              mimeType: {
                type: "string",
              },
              subject: {
                type: "string",
              },
              links: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          userLabels: {
            type: "object",
            additionalProperties: true,
          },
          conditions: {
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
                conditionThreshold: {
                  type: "object",
                  additionalProperties: true,
                },
                conditionAbsent: {
                  type: "object",
                  additionalProperties: true,
                },
                conditionMatchedLog: {
                  type: "object",
                  additionalProperties: true,
                },
                conditionMonitoringQueryLanguage: {
                  type: "object",
                  additionalProperties: true,
                },
                conditionPrometheusQueryLanguage: {
                  type: "object",
                  additionalProperties: true,
                },
                conditionSql: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          combiner: {
            type: "string",
            enum: [
              "COMBINE_UNSPECIFIED",
              "AND",
              "OR",
              "AND_WITH_MATCHING_RESOURCE",
            ],
          },
          enabled: {
            type: "boolean",
          },
          validity: {
            type: "object",
            properties: {
              code: {
                type: "number",
              },
              message: {
                type: "string",
              },
              details: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          notificationChannels: {
            type: "array",
            items: {
              type: "string",
            },
          },
          creationRecord: {
            type: "object",
            properties: {
              mutateTime: {
                type: "string",
              },
              mutatedBy: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          mutationRecord: {
            type: "object",
            properties: {
              mutateTime: {
                type: "string",
              },
              mutatedBy: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          alertStrategy: {
            type: "object",
            properties: {
              notificationRateLimit: {
                type: "object",
                additionalProperties: true,
              },
              notificationPrompts: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              autoClose: {
                type: "string",
              },
              notificationChannelStrategy: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          severity: {
            type: "string",
            enum: ["SEVERITY_UNSPECIFIED", "CRITICAL", "ERROR", "WARNING"],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default alertPoliciesGet;
