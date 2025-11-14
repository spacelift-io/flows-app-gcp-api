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
          description:
            "Identifier. A unique resource name for this Uptime check configuration. The format is: projects/[PROJECT_ID_OR_NUMBER]/uptimeCheckConfigs/[UPTIME_CHECK_ID] [PROJECT_ID_OR_NUMBER] is the Workspace host project associated with the Uptime check.This field should be omitted when creating the Uptime check configuration; on create, the resource name is assigned by the server and included in the response.",
          type: "string",
          required: true,
        },
        updateMask: {
          name: "UpdateMask",
          description:
            "Optional. If present, only the listed fields in the current Uptime check configuration are updated with values from the new configuration. If this field is empty, then the current configuration is completely replaced with the new configuration.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "This message configures which resources and services to monitor for availability.",
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
