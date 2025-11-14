import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const urlMapsValidate: AppBlock = {
  name: "URL Maps - Validate",
  description: `Runs static validation for the UrlMap.`,
  category: "URL Maps",
  inputs: {
    default: {
      config: {
        urlMap: {
          name: "URL Map",
          description: "Name of the UrlMap resource to be validated as.",
          type: "string",
          required: true,
        },
        resource: {
          name: "Resource",
          description: "Content of the UrlMap to be validated.",
          type: {
            type: "object",
            properties: {
              region: {
                type: "string",
              },
              fingerprint: {
                type: "string",
              },
              hostRules: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              headerAction: {
                type: "object",
                properties: {
                  requestHeadersToAdd: {
                    type: "object",
                    additionalProperties: true,
                  },
                  responseHeadersToRemove: {
                    type: "object",
                    additionalProperties: true,
                  },
                  requestHeadersToRemove: {
                    type: "object",
                    additionalProperties: true,
                  },
                  responseHeadersToAdd: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              creationTimestamp: {
                type: "string",
              },
              defaultCustomErrorResponsePolicy: {
                type: "object",
                properties: {
                  errorResponseRules: {
                    type: "object",
                    additionalProperties: true,
                  },
                  errorService: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              defaultService: {
                type: "string",
              },
              description: {
                type: "string",
              },
              selfLink: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              pathMatchers: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              tests: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              defaultUrlRedirect: {
                type: "object",
                properties: {
                  stripQuery: {
                    type: "object",
                    additionalProperties: true,
                  },
                  pathRedirect: {
                    type: "object",
                    additionalProperties: true,
                  },
                  redirectResponseCode: {
                    type: "object",
                    additionalProperties: true,
                  },
                  hostRedirect: {
                    type: "object",
                    additionalProperties: true,
                  },
                  prefixRedirect: {
                    type: "object",
                    additionalProperties: true,
                  },
                  httpsRedirect: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              defaultRouteAction: {
                type: "object",
                properties: {
                  retryPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  timeout: {
                    type: "object",
                    additionalProperties: true,
                  },
                  urlRewrite: {
                    type: "object",
                    additionalProperties: true,
                  },
                  requestMirrorPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxStreamDuration: {
                    type: "object",
                    additionalProperties: true,
                  },
                  corsPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  faultInjectionPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  weightedBackendServices: {
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
        loadBalancingSchemes: {
          name: "Load Balancing Schemes",
          description:
            "Specifies the load balancer type(s) this validation request is for.",
          type: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "EXTERNAL",
                "EXTERNAL_MANAGED",
                "LOAD_BALANCING_SCHEME_UNSPECIFIED",
              ],
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
              "https://www.googleapis.com/auth/compute",
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
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        let path = `projects/{project}/global/urlMaps/{urlMap}/validate`;

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
        if (input.event.inputConfig.loadBalancingSchemes !== undefined)
          requestBody.loadBalancingSchemes =
            input.event.inputConfig.loadBalancingSchemes;

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
          result: {
            type: "object",
            properties: {
              loadErrors: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              testFailures: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              loadSucceeded: {
                type: "boolean",
              },
              testPassed: {
                type: "boolean",
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

export default urlMapsValidate;
