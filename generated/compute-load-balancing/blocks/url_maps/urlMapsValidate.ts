import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const urlMapsValidate: AppBlock = {
  name: "Url Maps - Validate",
  description: `Runs static validation for the UrlMap.`,
  category: "Url Maps",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        urlMap: {
          name: "UrlMap",
          description: "Name of the UrlMap resource to be validated as.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "Request body",
          type: {
            type: "object",
            properties: {
              resource: {
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
                    additionalProperties: true,
                  },
                  creationTimestamp: {
                    type: "string",
                  },
                  defaultCustomErrorResponsePolicy: {
                    type: "object",
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
                    additionalProperties: true,
                  },
                  defaultRouteAction: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              loadBalancingSchemes: {
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
            "https://www.googleapis.com/auth/compute",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        const path = `projects/{project}/global/urlMaps/{urlMap}/validate`;
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
