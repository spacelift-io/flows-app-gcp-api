import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const urlMapsGet: AppBlock = {
  name: "URL Maps - Get",
  description: `Returns the specified UrlMap resource.`,
  category: "URL Maps",
  inputs: {
    default: {
      config: {
        urlMap: {
          name: "URL Map",
          description: "Name of the UrlMap resource to return.",
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
              "https://www.googleapis.com/auth/compute",
              "https://www.googleapis.com/auth/compute.readonly",
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
        let path = `projects/{project}/global/urlMaps/{urlMap}`;

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
              properties: {
                hosts: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
                pathMatcher: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          headerAction: {
            type: "object",
            properties: {
              requestHeadersToAdd: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              responseHeadersToRemove: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              requestHeadersToRemove: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              responseHeadersToAdd: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
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
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              errorService: {
                type: "string",
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
              properties: {
                defaultCustomErrorResponsePolicy: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
                defaultUrlRedirect: {
                  type: "object",
                  additionalProperties: true,
                },
                defaultRouteAction: {
                  type: "object",
                  additionalProperties: true,
                },
                routeRules: {
                  type: "object",
                  additionalProperties: true,
                },
                defaultService: {
                  type: "object",
                  additionalProperties: true,
                },
                pathRules: {
                  type: "object",
                  additionalProperties: true,
                },
                headerAction: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          tests: {
            type: "array",
            items: {
              type: "object",
              properties: {
                headers: {
                  type: "object",
                  additionalProperties: true,
                },
                host: {
                  type: "object",
                  additionalProperties: true,
                },
                expectedRedirectResponseCode: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
                expectedOutputUrl: {
                  type: "object",
                  additionalProperties: true,
                },
                path: {
                  type: "object",
                  additionalProperties: true,
                },
                service: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          defaultUrlRedirect: {
            type: "object",
            properties: {
              stripQuery: {
                type: "boolean",
              },
              pathRedirect: {
                type: "string",
              },
              redirectResponseCode: {
                type: "string",
                enum: [
                  "FOUND",
                  "MOVED_PERMANENTLY_DEFAULT",
                  "PERMANENT_REDIRECT",
                  "SEE_OTHER",
                  "TEMPORARY_REDIRECT",
                ],
              },
              hostRedirect: {
                type: "string",
              },
              prefixRedirect: {
                type: "string",
              },
              httpsRedirect: {
                type: "boolean",
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
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
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

export default urlMapsGet;
