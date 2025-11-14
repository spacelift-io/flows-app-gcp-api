import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const healthChecksGet: AppBlock = {
  name: "Health Checks - Get",
  description: `Returns the specified HealthCheck resource.`,
  category: "Health Checks",
  inputs: {
    default: {
      config: {
        healthCheck: {
          name: "Health Check",
          description: "Name of the HealthCheck resource to return.",
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
        let path = `projects/{project}/global/healthChecks/{healthCheck}`;

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
          tcpHealthCheck: {
            type: "object",
            properties: {
              request: {
                type: "string",
              },
              response: {
                type: "string",
              },
              portName: {
                type: "string",
              },
              portSpecification: {
                type: "string",
                enum: ["USE_FIXED_PORT", "USE_NAMED_PORT", "USE_SERVING_PORT"],
              },
              port: {
                type: "number",
              },
              proxyHeader: {
                type: "string",
                enum: ["NONE", "PROXY_V1"],
              },
            },
            additionalProperties: true,
          },
          selfLink: {
            type: "string",
          },
          id: {
            type: "string",
          },
          httpsHealthCheck: {
            type: "object",
            properties: {
              portName: {
                type: "string",
              },
              portSpecification: {
                type: "string",
                enum: ["USE_FIXED_PORT", "USE_NAMED_PORT", "USE_SERVING_PORT"],
              },
              response: {
                type: "string",
              },
              host: {
                type: "string",
              },
              requestPath: {
                type: "string",
              },
              proxyHeader: {
                type: "string",
                enum: ["NONE", "PROXY_V1"],
              },
              port: {
                type: "number",
              },
            },
            additionalProperties: true,
          },
          sslHealthCheck: {
            type: "object",
            properties: {
              portSpecification: {
                type: "string",
                enum: ["USE_FIXED_PORT", "USE_NAMED_PORT", "USE_SERVING_PORT"],
              },
              request: {
                type: "string",
              },
              proxyHeader: {
                type: "string",
                enum: ["NONE", "PROXY_V1"],
              },
              response: {
                type: "string",
              },
              portName: {
                type: "string",
              },
              port: {
                type: "number",
              },
            },
            additionalProperties: true,
          },
          creationTimestamp: {
            type: "string",
          },
          http2HealthCheck: {
            type: "object",
            properties: {
              requestPath: {
                type: "string",
              },
              portSpecification: {
                type: "string",
                enum: ["USE_FIXED_PORT", "USE_NAMED_PORT", "USE_SERVING_PORT"],
              },
              port: {
                type: "number",
              },
              portName: {
                type: "string",
              },
              proxyHeader: {
                type: "string",
                enum: ["NONE", "PROXY_V1"],
              },
              host: {
                type: "string",
              },
              response: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          kind: {
            type: "string",
          },
          logConfig: {
            type: "object",
            properties: {
              enable: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          httpHealthCheck: {
            type: "object",
            properties: {
              response: {
                type: "string",
              },
              requestPath: {
                type: "string",
              },
              portSpecification: {
                type: "string",
                enum: ["USE_FIXED_PORT", "USE_NAMED_PORT", "USE_SERVING_PORT"],
              },
              port: {
                type: "number",
              },
              portName: {
                type: "string",
              },
              host: {
                type: "string",
              },
              proxyHeader: {
                type: "string",
                enum: ["NONE", "PROXY_V1"],
              },
            },
            additionalProperties: true,
          },
          name: {
            type: "string",
          },
          type: {
            type: "string",
            enum: [
              "GRPC",
              "GRPC_WITH_TLS",
              "HTTP",
              "HTTP2",
              "HTTPS",
              "INVALID",
              "SSL",
              "TCP",
            ],
          },
          healthyThreshold: {
            type: "number",
          },
          description: {
            type: "string",
          },
          sourceRegions: {
            type: "array",
            items: {
              type: "string",
            },
          },
          unhealthyThreshold: {
            type: "number",
          },
          region: {
            type: "string",
          },
          checkIntervalSec: {
            type: "number",
          },
          grpcHealthCheck: {
            type: "object",
            properties: {
              port: {
                type: "number",
              },
              portName: {
                type: "string",
              },
              portSpecification: {
                type: "string",
                enum: ["USE_FIXED_PORT", "USE_NAMED_PORT", "USE_SERVING_PORT"],
              },
              grpcServiceName: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          timeoutSec: {
            type: "number",
          },
          grpcTlsHealthCheck: {
            type: "object",
            properties: {
              grpcServiceName: {
                type: "string",
              },
              portSpecification: {
                type: "string",
                enum: ["USE_FIXED_PORT", "USE_NAMED_PORT", "USE_SERVING_PORT"],
              },
              port: {
                type: "number",
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

export default healthChecksGet;
