import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const uptimeCheckConfigsPatch: AppBlock = {
  name: "Uptime Check Configs - Patch",
  description: `Updates an Uptime check configuration.`,
  category: "Uptime Check Configs",
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
            "Optional. If present, only the listed fields in the current Uptime check configuration are updated with values from the new configuration. If this field is empty, then the current configuration is completely replaced with the new configuration.",
          type: "string",
          required: false,
        },
        displayName: {
          name: "Display Name",
          description:
            "A human-friendly name for the Uptime check configuration.",
          type: "string",
          required: false,
        },
        monitoredResource: {
          name: "Monitored Resource",
          description: "The monitored resource (https://cloud.",
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
        resourceGroup: {
          name: "Resource Group",
          description: "The group resource associated with the configuration.",
          type: {
            type: "object",
            properties: {
              groupId: {
                type: "string",
              },
              resourceType: {
                type: "string",
                enum: [
                  "RESOURCE_TYPE_UNSPECIFIED",
                  "INSTANCE",
                  "AWS_ELB_LOAD_BALANCER",
                ],
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        syntheticMonitor: {
          name: "Synthetic Monitor",
          description: "Specifies a Synthetic Monitor to invoke.",
          type: {
            type: "object",
            properties: {
              cloudFunctionV2: {
                type: "object",
                properties: {
                  name: {
                    type: "object",
                    additionalProperties: true,
                  },
                  cloudRunRevision: {
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
        httpCheck: {
          name: "HTTP Check",
          description:
            "Contains information needed to make an HTTP or HTTPS check.",
          type: {
            type: "object",
            properties: {
              requestMethod: {
                type: "string",
                enum: ["METHOD_UNSPECIFIED", "GET", "POST"],
              },
              useSsl: {
                type: "boolean",
              },
              path: {
                type: "string",
              },
              port: {
                type: "number",
              },
              authInfo: {
                type: "object",
                properties: {
                  username: {
                    type: "object",
                    additionalProperties: true,
                  },
                  password: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              maskHeaders: {
                type: "boolean",
              },
              headers: {
                type: "object",
                additionalProperties: true,
              },
              contentType: {
                type: "string",
                enum: ["TYPE_UNSPECIFIED", "URL_ENCODED", "USER_PROVIDED"],
              },
              customContentType: {
                type: "string",
              },
              validateSsl: {
                type: "boolean",
              },
              body: {
                type: "string",
              },
              acceptedResponseStatusCodes: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              pingConfig: {
                type: "object",
                properties: {
                  pingsCount: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              serviceAgentAuthentication: {
                type: "object",
                properties: {
                  type: {
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
        tcpCheck: {
          name: "TCP Check",
          description: "Contains information needed to make a TCP check.",
          type: {
            type: "object",
            properties: {
              port: {
                type: "number",
              },
              pingConfig: {
                type: "object",
                properties: {
                  pingsCount: {
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
        period: {
          name: "Period",
          description: "How often, in seconds, the Uptime check is performed.",
          type: "string",
          required: false,
        },
        timeout: {
          name: "Timeout",
          description:
            "The maximum amount of time to wait for the request to complete (must be between 1 and 60 seconds).",
          type: "string",
          required: false,
        },
        contentMatchers: {
          name: "Content Matchers",
          description:
            "The content that is expected to appear in the data returned by the target server against which the check is run.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                },
                matcher: {
                  type: "string",
                  enum: [
                    "CONTENT_MATCHER_OPTION_UNSPECIFIED",
                    "CONTAINS_STRING",
                    "NOT_CONTAINS_STRING",
                    "MATCHES_REGEX",
                    "NOT_MATCHES_REGEX",
                    "MATCHES_JSON_PATH",
                    "NOT_MATCHES_JSON_PATH",
                  ],
                },
                jsonPathMatcher: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        checkerType: {
          name: "Checker Type",
          description:
            "The type of checkers to use to execute the Uptime check.",
          type: "string",
          required: false,
        },
        disabled: {
          name: "Disabled",
          description: "Whether the check is disabled or not.",
          type: "boolean",
          required: false,
        },
        selectedRegions: {
          name: "Selected Regions",
          description: "The list of regions from which the check will be run.",
          type: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "REGION_UNSPECIFIED",
                "USA",
                "EUROPE",
                "SOUTH_AMERICA",
                "ASIA_PACIFIC",
                "USA_OREGON",
                "USA_IOWA",
                "USA_VIRGINIA",
              ],
            },
          },
          required: false,
        },
        logCheckFailures: {
          name: "Log Check Failures",
          description:
            "To specify whether to log the results of failed probes to Cloud Logging.",
          type: "boolean",
          required: false,
        },
        isInternal: {
          name: "Is Internal",
          description:
            "If this is true, then checks are made only from the 'internal_checkers'.",
          type: "boolean",
          required: false,
        },
        internalCheckers: {
          name: "Internal Checkers",
          description:
            "The internal checkers that this check will egress from.",
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
                network: {
                  type: "string",
                },
                gcpZone: {
                  type: "string",
                },
                peerProjectId: {
                  type: "string",
                },
                state: {
                  type: "string",
                  enum: ["UNSPECIFIED", "CREATING", "RUNNING"],
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        userLabels: {
          name: "User Labels",
          description:
            "User-supplied key/value data to be used for organizing and identifying the UptimeCheckConfig objects.",
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
        if (input.event.inputConfig.monitoredResource !== undefined)
          requestBody.monitoredResource =
            input.event.inputConfig.monitoredResource;
        if (input.event.inputConfig.resourceGroup !== undefined)
          requestBody.resourceGroup = input.event.inputConfig.resourceGroup;
        if (input.event.inputConfig.syntheticMonitor !== undefined)
          requestBody.syntheticMonitor =
            input.event.inputConfig.syntheticMonitor;
        if (input.event.inputConfig.httpCheck !== undefined)
          requestBody.httpCheck = input.event.inputConfig.httpCheck;
        if (input.event.inputConfig.tcpCheck !== undefined)
          requestBody.tcpCheck = input.event.inputConfig.tcpCheck;
        if (input.event.inputConfig.period !== undefined)
          requestBody.period = input.event.inputConfig.period;
        if (input.event.inputConfig.timeout !== undefined)
          requestBody.timeout = input.event.inputConfig.timeout;
        if (input.event.inputConfig.contentMatchers !== undefined)
          requestBody.contentMatchers = input.event.inputConfig.contentMatchers;
        if (input.event.inputConfig.checkerType !== undefined)
          requestBody.checkerType = input.event.inputConfig.checkerType;
        if (input.event.inputConfig.disabled !== undefined)
          requestBody.disabled = input.event.inputConfig.disabled;
        if (input.event.inputConfig.selectedRegions !== undefined)
          requestBody.selectedRegions = input.event.inputConfig.selectedRegions;
        if (input.event.inputConfig.logCheckFailures !== undefined)
          requestBody.logCheckFailures =
            input.event.inputConfig.logCheckFailures;
        if (input.event.inputConfig.isInternal !== undefined)
          requestBody.isInternal = input.event.inputConfig.isInternal;
        if (input.event.inputConfig.internalCheckers !== undefined)
          requestBody.internalCheckers =
            input.event.inputConfig.internalCheckers;
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
          monitoredResource: {
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
          resourceGroup: {
            type: "object",
            properties: {
              groupId: {
                type: "string",
              },
              resourceType: {
                type: "string",
                enum: [
                  "RESOURCE_TYPE_UNSPECIFIED",
                  "INSTANCE",
                  "AWS_ELB_LOAD_BALANCER",
                ],
              },
            },
            additionalProperties: true,
          },
          syntheticMonitor: {
            type: "object",
            properties: {
              cloudFunctionV2: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          httpCheck: {
            type: "object",
            properties: {
              requestMethod: {
                type: "string",
                enum: ["METHOD_UNSPECIFIED", "GET", "POST"],
              },
              useSsl: {
                type: "boolean",
              },
              path: {
                type: "string",
              },
              port: {
                type: "number",
              },
              authInfo: {
                type: "object",
                additionalProperties: true,
              },
              maskHeaders: {
                type: "boolean",
              },
              headers: {
                type: "object",
                additionalProperties: true,
              },
              contentType: {
                type: "string",
                enum: ["TYPE_UNSPECIFIED", "URL_ENCODED", "USER_PROVIDED"],
              },
              customContentType: {
                type: "string",
              },
              validateSsl: {
                type: "boolean",
              },
              body: {
                type: "string",
              },
              acceptedResponseStatusCodes: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              pingConfig: {
                type: "object",
                additionalProperties: true,
              },
              serviceAgentAuthentication: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          tcpCheck: {
            type: "object",
            properties: {
              port: {
                type: "number",
              },
              pingConfig: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          period: {
            type: "string",
          },
          timeout: {
            type: "string",
          },
          contentMatchers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                content: {
                  type: "object",
                  additionalProperties: true,
                },
                matcher: {
                  type: "object",
                  additionalProperties: true,
                },
                jsonPathMatcher: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          checkerType: {
            type: "string",
            enum: [
              "CHECKER_TYPE_UNSPECIFIED",
              "STATIC_IP_CHECKERS",
              "VPC_CHECKERS",
            ],
          },
          disabled: {
            type: "boolean",
          },
          selectedRegions: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "REGION_UNSPECIFIED",
                "USA",
                "EUROPE",
                "SOUTH_AMERICA",
                "ASIA_PACIFIC",
                "USA_OREGON",
                "USA_IOWA",
                "USA_VIRGINIA",
              ],
            },
          },
          logCheckFailures: {
            type: "boolean",
          },
          isInternal: {
            type: "boolean",
          },
          internalCheckers: {
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
                network: {
                  type: "object",
                  additionalProperties: true,
                },
                gcpZone: {
                  type: "object",
                  additionalProperties: true,
                },
                peerProjectId: {
                  type: "object",
                  additionalProperties: true,
                },
                state: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
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

export default uptimeCheckConfigsPatch;
