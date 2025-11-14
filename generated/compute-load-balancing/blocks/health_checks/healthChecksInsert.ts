import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const healthChecksInsert: AppBlock = {
  name: "Health Checks - Insert",
  description: `Creates a HealthCheck resource in the specified project using the data included in the request.`,
  category: "Health Checks",
  inputs: {
    default: {
      config: {
        requestId: {
          name: "Request ID",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        tcpHealthCheck: {
          name: "TCP Health Check",
          description: "Request body field: tcpHealthCheck",
          type: {
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
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for the resource.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
          type: "string",
          required: false,
        },
        httpsHealthCheck: {
          name: "HTTPS Health Check",
          description: "Request body field: httpsHealthCheck",
          type: {
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
          required: false,
        },
        sslHealthCheck: {
          name: "SSL Health Check",
          description: "Request body field: sslHealthCheck",
          type: {
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
          required: false,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description: "[Output Only] Creation timestamp in3339 text format.",
          type: "string",
          required: false,
        },
        http2HealthCheck: {
          name: "Http2 Health Check",
          description: "Request body field: http2HealthCheck",
          type: {
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
          required: false,
        },
        kind: {
          name: "Kind",
          description: "Type of the resource.",
          type: "string",
          required: false,
        },
        logConfig: {
          name: "Log Config",
          description: "Configure logging on this health check.",
          type: {
            type: "object",
            properties: {
              enable: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        httpHealthCheck: {
          name: "HTTP Health Check",
          description: "Request body field: httpHealthCheck",
          type: {
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
          required: false,
        },
        name: {
          name: "Name",
          description: "Name of the resource.",
          type: "string",
          required: false,
        },
        type: {
          name: "Type",
          description:
            "Specifies the type of the healthCheck, either TCP,SSL, HTTP, HTTPS,HTTP2 or GRPC.",
          type: "string",
          required: false,
        },
        healthyThreshold: {
          name: "Healthy Threshold",
          description:
            "A so-far unhealthy instance will be marked healthy after this many consecutive successes.",
          type: "number",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        sourceRegions: {
          name: "Source Regions",
          description:
            "The list of cloud regions from which health checks are performed.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        unhealthyThreshold: {
          name: "Unhealthy Threshold",
          description:
            "A so-far healthy instance will be marked unhealthy after this many consecutive failures.",
          type: "number",
          required: false,
        },
        region: {
          name: "Region",
          description: "[Output Only] Region where the health check resides.",
          type: "string",
          required: false,
        },
        checkIntervalSec: {
          name: "Check Interval Sec",
          description: "How often (in seconds) to send a health check.",
          type: "number",
          required: false,
        },
        grpcHealthCheck: {
          name: "Grpc Health Check",
          description: "Request body field: grpcHealthCheck",
          type: {
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
          required: false,
        },
        timeoutSec: {
          name: "Timeout Sec",
          description: "How long (in seconds) to wait before claiming failure.",
          type: "number",
          required: false,
        },
        grpcTlsHealthCheck: {
          name: "Grpc TLS Health Check",
          description: "Request body field: grpcTlsHealthCheck",
          type: {
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
        let path = `projects/{project}/global/healthChecks`;

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

        if (input.event.inputConfig.tcpHealthCheck !== undefined)
          requestBody.tcpHealthCheck = input.event.inputConfig.tcpHealthCheck;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.httpsHealthCheck !== undefined)
          requestBody.httpsHealthCheck =
            input.event.inputConfig.httpsHealthCheck;
        if (input.event.inputConfig.sslHealthCheck !== undefined)
          requestBody.sslHealthCheck = input.event.inputConfig.sslHealthCheck;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.http2HealthCheck !== undefined)
          requestBody.http2HealthCheck =
            input.event.inputConfig.http2HealthCheck;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.logConfig !== undefined)
          requestBody.logConfig = input.event.inputConfig.logConfig;
        if (input.event.inputConfig.httpHealthCheck !== undefined)
          requestBody.httpHealthCheck = input.event.inputConfig.httpHealthCheck;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.type !== undefined)
          requestBody.type = input.event.inputConfig.type;
        if (input.event.inputConfig.healthyThreshold !== undefined)
          requestBody.healthyThreshold =
            input.event.inputConfig.healthyThreshold;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.sourceRegions !== undefined)
          requestBody.sourceRegions = input.event.inputConfig.sourceRegions;
        if (input.event.inputConfig.unhealthyThreshold !== undefined)
          requestBody.unhealthyThreshold =
            input.event.inputConfig.unhealthyThreshold;
        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (input.event.inputConfig.checkIntervalSec !== undefined)
          requestBody.checkIntervalSec =
            input.event.inputConfig.checkIntervalSec;
        if (input.event.inputConfig.grpcHealthCheck !== undefined)
          requestBody.grpcHealthCheck = input.event.inputConfig.grpcHealthCheck;
        if (input.event.inputConfig.timeoutSec !== undefined)
          requestBody.timeoutSec = input.event.inputConfig.timeoutSec;
        if (input.event.inputConfig.grpcTlsHealthCheck !== undefined)
          requestBody.grpcTlsHealthCheck =
            input.event.inputConfig.grpcTlsHealthCheck;

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
          targetId: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          httpErrorMessage: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          setCommonInstanceMetadataOperationMetadata: {
            type: "object",
            properties: {
              perLocationOperations: {
                type: "object",
                additionalProperties: true,
              },
              clientOperationId: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          id: {
            type: "string",
          },
          region: {
            type: "string",
          },
          startTime: {
            type: "string",
          },
          zone: {
            type: "string",
          },
          statusMessage: {
            type: "string",
          },
          user: {
            type: "string",
          },
          warnings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                code: {
                  type: "string",
                  enum: [
                    "CLEANUP_FAILED",
                    "DEPRECATED_RESOURCE_USED",
                    "DEPRECATED_TYPE_USED",
                    "DISK_SIZE_LARGER_THAN_IMAGE_SIZE",
                    "EXPERIMENTAL_TYPE_USED",
                    "EXTERNAL_API_WARNING",
                    "FIELD_VALUE_OVERRIDEN",
                    "INJECTED_KERNELS_DEPRECATED",
                    "INVALID_HEALTH_CHECK_FOR_DYNAMIC_WIEGHTED_LB",
                    "LARGE_DEPLOYMENT_WARNING",
                    "LIST_OVERHEAD_QUOTA_EXCEED",
                    "MISSING_TYPE_DEPENDENCY",
                    "NEXT_HOP_ADDRESS_NOT_ASSIGNED",
                    "NEXT_HOP_CANNOT_IP_FORWARD",
                    "NEXT_HOP_INSTANCE_HAS_NO_IPV6_INTERFACE",
                    "NEXT_HOP_INSTANCE_NOT_FOUND",
                    "NEXT_HOP_INSTANCE_NOT_ON_NETWORK",
                    "NEXT_HOP_NOT_RUNNING",
                    "NOT_CRITICAL_ERROR",
                    "NO_RESULTS_ON_PAGE",
                    "PARTIAL_SUCCESS",
                    "QUOTA_INFO_UNAVAILABLE",
                    "REQUIRED_TOS_AGREEMENT",
                    "RESOURCE_IN_USE_BY_OTHER_RESOURCE_WARNING",
                    "RESOURCE_NOT_DELETED",
                    "SCHEMA_VALIDATION_IGNORED",
                    "SINGLE_INSTANCE_PROPERTY_TEMPLATE",
                    "UNDECLARED_PROPERTIES",
                    "UNREACHABLE",
                  ],
                },
              },
              additionalProperties: true,
            },
          },
          operationType: {
            type: "string",
          },
          targetLink: {
            type: "string",
          },
          instancesBulkInsertOperationMetadata: {
            type: "object",
            properties: {
              perLocationStatus: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          error: {
            type: "object",
            properties: {
              errors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: {
                      type: "object",
                      additionalProperties: true,
                    },
                    message: {
                      type: "object",
                      additionalProperties: true,
                    },
                    errorDetails: {
                      type: "object",
                      additionalProperties: true,
                    },
                    location: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          endTime: {
            type: "string",
          },
          httpErrorStatusCode: {
            type: "number",
          },
          operationGroupId: {
            type: "string",
          },
          description: {
            type: "string",
          },
          name: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          clientOperationId: {
            type: "string",
          },
          insertTime: {
            type: "string",
          },
          status: {
            type: "string",
            enum: ["DONE", "PENDING", "RUNNING"],
          },
          progress: {
            type: "number",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default healthChecksInsert;
