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
          description: "Identifier.",
          type: "string",
          required: false,
        },
        updateMask: {
          name: "Update Mask",
          description:
            "Optional. A list of alerting policy field names. If this field is not empty, each listed field in the existing alerting policy is set to the value of the corresponding field in the supplied policy (alert_policy), or to the field's default value if the field is not in the supplied alerting policy. Fields not listed retain their previous value.Examples of valid field masks include display_name, documentation, documentation.content, documentation.mime_type, user_labels, user_label.nameofkey, enabled, conditions, combiner, etc.If this field is empty, then the supplied alerting policy replaces the existing policy. It is the same as deleting the existing policy and adding the supplied policy, except for the following: The new policy will have the same [ALERT_POLICY_ID] as the former policy. This gives you continuity with the former policy in your notifications and incidents. Conditions in the new policy will keep their former [CONDITION_ID] if the supplied condition includes the name field with that [CONDITION_ID]. If the supplied condition omits the name field, then a new [CONDITION_ID] is created.",
          type: "string",
          required: false,
        },
        displayName: {
          name: "Display Name",
          description:
            "A short name or phrase used to identify the policy in dashboards, notifications, and incidents.",
          type: "string",
          required: false,
        },
        documentation: {
          name: "Documentation",
          description:
            "Documentation that is included with notifications and incidents related to this policy.",
          type: {
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
          required: false,
        },
        userLabels: {
          name: "User Labels",
          description:
            "User-supplied key/value data to be used for organizing and identifying the AlertPolicy objects.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        conditions: {
          name: "Conditions",
          description: "A list of conditions for the policy.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                displayName: {
                  type: "string",
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
          required: false,
        },
        combiner: {
          name: "Combiner",
          description:
            "How to combine the results of multiple conditions to determine if an incident should be opened.",
          type: "string",
          required: false,
        },
        enabled: {
          name: "Enabled",
          description: "Whether or not the policy is enabled.",
          type: "boolean",
          required: false,
        },
        validity: {
          name: "Validity",
          description:
            "Read-only description of how the alerting policy is invalid.",
          type: {
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
          required: false,
        },
        notificationChannels: {
          name: "Notification Channels",
          description:
            "Identifies the notification channels to which notifications should be sent when incidents are opened or closed or when new violations occur on an already opened incident.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        creationRecord: {
          name: "Creation Record",
          description:
            "A read-only record of the creation of the alerting policy.",
          type: {
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
          required: false,
        },
        mutationRecord: {
          name: "Mutation Record",
          description:
            "A read-only record of the most recent change to the alerting policy.",
          type: {
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
          required: false,
        },
        alertStrategy: {
          name: "Alert Strategy",
          description:
            "Control over how this alerting policy's notification channels are notified.",
          type: {
            type: "object",
            properties: {
              notificationRateLimit: {
                type: "object",
                properties: {
                  period: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              notificationPrompts: {
                type: "array",
                items: {
                  type: "string",
                  enum: ["NOTIFICATION_PROMPT_UNSPECIFIED", "OPENED", "CLOSED"],
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
          required: false,
        },
        severity: {
          name: "Severity",
          description: "Optional.",
          type: "string",
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
        if (input.event.inputConfig.documentation !== undefined)
          requestBody.documentation = input.event.inputConfig.documentation;
        if (input.event.inputConfig.userLabels !== undefined)
          requestBody.userLabels = input.event.inputConfig.userLabels;
        if (input.event.inputConfig.conditions !== undefined)
          requestBody.conditions = input.event.inputConfig.conditions;
        if (input.event.inputConfig.combiner !== undefined)
          requestBody.combiner = input.event.inputConfig.combiner;
        if (input.event.inputConfig.enabled !== undefined)
          requestBody.enabled = input.event.inputConfig.enabled;
        if (input.event.inputConfig.validity !== undefined)
          requestBody.validity = input.event.inputConfig.validity;
        if (input.event.inputConfig.notificationChannels !== undefined)
          requestBody.notificationChannels =
            input.event.inputConfig.notificationChannels;
        if (input.event.inputConfig.creationRecord !== undefined)
          requestBody.creationRecord = input.event.inputConfig.creationRecord;
        if (input.event.inputConfig.mutationRecord !== undefined)
          requestBody.mutationRecord = input.event.inputConfig.mutationRecord;
        if (input.event.inputConfig.alertStrategy !== undefined)
          requestBody.alertStrategy = input.event.inputConfig.alertStrategy;
        if (input.event.inputConfig.severity !== undefined)
          requestBody.severity = input.event.inputConfig.severity;

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
