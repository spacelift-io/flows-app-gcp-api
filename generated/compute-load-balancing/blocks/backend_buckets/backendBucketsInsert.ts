import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const backendBucketsInsert: AppBlock = {
  name: "Backend Buckets - Insert",
  description: `Creates a BackendBucket resource in the specified project using the data included in the request.`,
  category: "Backend Buckets",
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
        name: {
          name: "Name",
          description: "Name of the resource.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description:
            "An optional textual description of the resource; provided by the client when the resource is created.",
          type: "string",
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
          description:
            "[Output Only] Unique identifier for the resource; defined by the server.",
          type: "string",
          required: false,
        },
        enableCdn: {
          name: "Enable CDN",
          description: "If true, enable Cloud CDN for this BackendBucket.",
          type: "boolean",
          required: false,
        },
        edgeSecurityPolicy: {
          name: "Edge Security Policy",
          description:
            "[Output Only] The resource URL for the edge security policy associated with this backend bucket.",
          type: "string",
          required: false,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] Creation timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        customResponseHeaders: {
          name: "Custom Response Headers",
          description:
            "Headers that the Application Load Balancer should add to proxied responses.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        kind: {
          name: "Kind",
          description: "Type of the resource.",
          type: "string",
          required: false,
        },
        compressionMode: {
          name: "Compression Mode",
          description:
            "Compress text responses using Brotli or gzip compression, based on the client's Accept-Encoding header.",
          type: "string",
          required: false,
        },
        cdnPolicy: {
          name: "CDN Policy",
          description: "Cloud CDN configuration for this BackendBucket.",
          type: {
            type: "object",
            properties: {
              requestCoalescing: {
                type: "boolean",
              },
              negativeCaching: {
                type: "boolean",
              },
              cacheMode: {
                type: "string",
                enum: [
                  "CACHE_ALL_STATIC",
                  "FORCE_CACHE_ALL",
                  "INVALID_CACHE_MODE",
                  "USE_ORIGIN_HEADERS",
                ],
              },
              clientTtl: {
                type: "number",
              },
              cacheKeyPolicy: {
                type: "object",
                properties: {
                  includeHttpHeaders: {
                    type: "object",
                    additionalProperties: true,
                  },
                  queryStringWhitelist: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              maxTtl: {
                type: "number",
              },
              defaultTtl: {
                type: "number",
              },
              signedUrlCacheMaxAgeSec: {
                type: "string",
              },
              negativeCachingPolicy: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              serveWhileStale: {
                type: "number",
              },
              bypassCacheOnRequestHeaders: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              signedUrlKeyNames: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        bucketName: {
          name: "Bucket Name",
          description: "Cloud Storage bucket name.",
          type: "string",
          required: false,
        },
        loadBalancingScheme: {
          name: "Load Balancing Scheme",
          description:
            "The value can only be INTERNAL_MANAGED for cross-region internal layer 7 load balancer.",
          type: "string",
          required: false,
        },
        usedBy: {
          name: "Used By",
          description:
            "[Output Only] List of resources referencing that backend bucket.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                reference: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        params: {
          name: "Params",
          description: "Input only.",
          type: {
            type: "object",
            properties: {
              resourceManagerTags: {
                type: "object",
                additionalProperties: true,
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
        let path = `projects/{project}/global/backendBuckets`;

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

        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.enableCdn !== undefined)
          requestBody.enableCdn = input.event.inputConfig.enableCdn;
        if (input.event.inputConfig.edgeSecurityPolicy !== undefined)
          requestBody.edgeSecurityPolicy =
            input.event.inputConfig.edgeSecurityPolicy;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.customResponseHeaders !== undefined)
          requestBody.customResponseHeaders =
            input.event.inputConfig.customResponseHeaders;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.compressionMode !== undefined)
          requestBody.compressionMode = input.event.inputConfig.compressionMode;
        if (input.event.inputConfig.cdnPolicy !== undefined)
          requestBody.cdnPolicy = input.event.inputConfig.cdnPolicy;
        if (input.event.inputConfig.bucketName !== undefined)
          requestBody.bucketName = input.event.inputConfig.bucketName;
        if (input.event.inputConfig.loadBalancingScheme !== undefined)
          requestBody.loadBalancingScheme =
            input.event.inputConfig.loadBalancingScheme;
        if (input.event.inputConfig.usedBy !== undefined)
          requestBody.usedBy = input.event.inputConfig.usedBy;
        if (input.event.inputConfig.params !== undefined)
          requestBody.params = input.event.inputConfig.params;

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

export default backendBucketsInsert;
