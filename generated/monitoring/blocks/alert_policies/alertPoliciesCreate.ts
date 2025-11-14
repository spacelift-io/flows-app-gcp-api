import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const alertPoliciesCreate: AppBlock = {
  name: "Alert Policies - Create",
  description: `Creates a new alerting policy.`,
  category: "Alert Policies",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) in which to create the alerting policy. The format is: projects/[PROJECT_ID_OR_NUMBER] Note that this field names the parent container in which the alerting policy will be written, not the name of the created policy. |name| must be a host project of a Metrics Scope, otherwise INVALID_ARGUMENT error will return. The alerting policy that is returned will have a name that contains a normalized representation of this name as a prefix but adds a suffix of the form /alertPolicies/[ALERT_POLICY_ID], identifying the policy in the container.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            'A description of the conditions under which some aspect of your system is considered to be "unhealthy" and the ways to notify people or services about this state. For an overview of alerting policies, see Introduction to Alerting (https://cloud.google.com/monitoring/alerts/).',
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
        const path = `v3/{+name}/alertPolicies`;
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

export default alertPoliciesCreate;
