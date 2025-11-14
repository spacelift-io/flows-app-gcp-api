import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const regionUrlMapsPatch: AppBlock = {
  name: "Region Url Maps - Patch",
  description: `Patches the specified UrlMap resource with the data included in the request.`,
  category: "Region Url Maps",
  inputs: {
    default: {
      config: {
        urlMap: {
          name: "UrlMap",
          description: "Name of the UrlMap resource to patch.",
          type: "string",
          required: true,
        },
        requestId: {
          name: "RequestId",
          description:
            "begin_interface: MixerMutationRequestBuilder\nRequest ID to support idempotency.",
          type: "string",
          required: false,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        region: {
          name: "Region",
          description: "Name of the region scoping this request.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Represents a URL Map resource.\n\nCompute Engine has two URL Map resources:\n\n* [Global](/compute/docs/reference/rest/v1/urlMaps)\n* [Regional](/compute/docs/reference/rest/v1/regionUrlMaps)\n\nA URL map resource is a component of certain types of cloud load balancers\nand Traffic Director:\n\n* urlMaps are used by global external Application Load\nBalancers, classic Application Load Balancers, and cross-region internal\nApplication Load Balancers.\n* regionUrlMaps are used by internal Application Load Balancers,\nregional external Application Load Balancers and regional internal\nApplication Load Balancers.\n\nFor a list of supported URL map features by the load balancer type, see the\nLoad balancing features: Routing and traffic management table.\n\nFor a list of supported URL map features for Traffic Director, see the\nTraffic Director features: Routing and traffic management table.\n\nThis resource defines mappings from hostnames and URL paths to either a\nbackend service or a backend bucket.\n\nTo use the global urlMaps resource, the backend service must\nhave a loadBalancingScheme of either EXTERNAL,EXTERNAL_MANAGED, or INTERNAL_SELF_MANAGED. To use\nthe regionUrlMaps resource, the backend service must have aloadBalancingScheme of INTERNAL_MANAGED. For more\ninformation, read URL\nMap Concepts.",
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
        const path = `projects/{project}/regions/{region}/urlMaps/{urlMap}`;
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

export default regionUrlMapsPatch;
