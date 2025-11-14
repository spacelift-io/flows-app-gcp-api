import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const alertPoliciesPatch: AppBlock = {
  name: "Alert Policies - Patch",
  description: `Updates an alerting policy.`,
  category: "Alert Policies",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Identifier. Required if the policy exists. The resource name for this policy. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID] [ALERT_POLICY_ID] is assigned by Cloud Monitoring when the policy is created. When calling the alertPolicies.create method, do not include the name field in the alerting policy passed as part of the request.",
          type: "string",
          required: true,
        },
        updateMask: {
          name: "UpdateMask",
          description:
            "Optional. A list of alerting policy field names. If this field is not empty, each listed field in the existing alerting policy is set to the value of the corresponding field in the supplied policy (alert_policy), or to the field's default value if the field is not in the supplied alerting policy. Fields not listed retain their previous value.Examples of valid field masks include display_name, documentation, documentation.content, documentation.mime_type, user_labels, user_label.nameofkey, enabled, conditions, combiner, etc.If this field is empty, then the supplied alerting policy replaces the existing policy. It is the same as deleting the existing policy and adding the supplied policy, except for the following: The new policy will have the same [ALERT_POLICY_ID] as the former policy. This gives you continuity with the former policy in your notifications and incidents. Conditions in the new policy will keep their former [CONDITION_ID] if the supplied condition includes the name field with that [CONDITION_ID]. If the supplied condition omits the name field, then a new [CONDITION_ID] is created.",
          type: "string",
          required: false,
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

export default alertPoliciesPatch;
