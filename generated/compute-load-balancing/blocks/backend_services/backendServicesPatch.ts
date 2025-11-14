import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const backendServicesPatch: AppBlock = {
  name: "Backend Services - Patch",
  description: `Patches the specified BackendService resource with the data included in the request.`,
  category: "Backend Services",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        requestId: {
          name: "RequestId",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        backendService: {
          name: "BackendService",
          description: "Name of the BackendService resource to patch.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Represents a Backend Service resource.\n\nA backend service defines how Google Cloud load balancers distribute traffic.\nThe backend service configuration contains a set of values, such as the\nprotocol used to connect to backends, various distribution and session\nsettings, health checks, and timeouts. These settings provide fine-grained\ncontrol over how your load balancer behaves. Most of the settings have\ndefault values that allow for easy configuration if you need to get started\nquickly.\n\nBackend services in Google Compute Engine can be either regionally or\nglobally scoped.\n\n* [Global](https://cloud.google.com/compute/docs/reference/rest/v1/backendServices)\n* [Regional](https://cloud.google.com/compute/docs/reference/rest/v1/regionBackendServices)\n\nFor more information, seeBackend\nServices.",
          type: {
            type: "object",
            properties: {
              params: {
                type: "object",
                properties: {
                  resourceManagerTags: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              affinityCookieTtlSec: {
                type: "number",
              },
              customMetrics: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    dryRun: {
                      type: "object",
                      additionalProperties: true,
                    },
                    name: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              name: {
                type: "string",
              },
              iap: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  oauth2ClientId: {
                    type: "string",
                  },
                  oauth2ClientSecretSha256: {
                    type: "string",
                  },
                  oauth2ClientSecret: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              compressionMode: {
                type: "string",
                enum: ["AUTOMATIC", "DISABLED"],
              },
              customRequestHeaders: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              usedBy: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    reference: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              edgeSecurityPolicy: {
                type: "string",
              },
              tlsSettings: {
                type: "object",
                properties: {
                  subjectAltNames: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  authenticationConfig: {
                    type: "string",
                  },
                  sni: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              consistentHash: {
                type: "object",
                properties: {
                  minimumRingSize: {
                    type: "string",
                  },
                  httpCookie: {
                    type: "object",
                    additionalProperties: true,
                  },
                  httpHeaderName: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              serviceLbPolicy: {
                type: "string",
              },
              ipAddressSelectionPolicy: {
                type: "string",
                enum: [
                  "IPV4_ONLY",
                  "IPV6_ONLY",
                  "IP_ADDRESS_SELECTION_POLICY_UNSPECIFIED",
                  "PREFER_IPV6",
                ],
              },
              externalManagedMigrationState: {
                type: "string",
                enum: ["PREPARE", "TEST_ALL_TRAFFIC", "TEST_BY_PERCENTAGE"],
              },
              customResponseHeaders: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              creationTimestamp: {
                type: "string",
              },
              connectionDraining: {
                type: "object",
                properties: {
                  drainingTimeoutSec: {
                    type: "number",
                  },
                },
                additionalProperties: true,
              },
              backends: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    maxConnectionsPerEndpoint: {
                      type: "object",
                      additionalProperties: true,
                    },
                    balancingMode: {
                      type: "object",
                      additionalProperties: true,
                    },
                    group: {
                      type: "object",
                      additionalProperties: true,
                    },
                    maxRatePerInstance: {
                      type: "object",
                      additionalProperties: true,
                    },
                    maxRate: {
                      type: "object",
                      additionalProperties: true,
                    },
                    maxConnections: {
                      type: "object",
                      additionalProperties: true,
                    },
                    preference: {
                      type: "object",
                      additionalProperties: true,
                    },
                    failover: {
                      type: "object",
                      additionalProperties: true,
                    },
                    description: {
                      type: "object",
                      additionalProperties: true,
                    },
                    maxConnectionsPerInstance: {
                      type: "object",
                      additionalProperties: true,
                    },
                    customMetrics: {
                      type: "object",
                      additionalProperties: true,
                    },
                    maxUtilization: {
                      type: "object",
                      additionalProperties: true,
                    },
                    capacityScaler: {
                      type: "object",
                      additionalProperties: true,
                    },
                    maxRatePerEndpoint: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              port: {
                type: "number",
              },
              externalManagedMigrationTestingPercentage: {
                type: "number",
              },
              metadatas: {
                type: "object",
                additionalProperties: true,
              },
              kind: {
                type: "string",
              },
              haPolicy: {
                type: "object",
                properties: {
                  leader: {
                    type: "object",
                    additionalProperties: true,
                  },
                  fastIPMove: {
                    type: "string",
                    enum: ["DISABLED", "GARP_RA"],
                  },
                },
                additionalProperties: true,
              },
              selfLink: {
                type: "string",
              },
              cdnPolicy: {
                type: "object",
                properties: {
                  negativeCachingPolicy: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  signedUrlKeyNames: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  defaultTtl: {
                    type: "number",
                  },
                  serveWhileStale: {
                    type: "number",
                  },
                  signedUrlCacheMaxAgeSec: {
                    type: "string",
                  },
                  bypassCacheOnRequestHeaders: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  cacheKeyPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  requestCoalescing: {
                    type: "boolean",
                  },
                  negativeCaching: {
                    type: "boolean",
                  },
                  maxTtl: {
                    type: "number",
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
                },
                additionalProperties: true,
              },
              maxStreamDuration: {
                type: "object",
                properties: {
                  nanos: {
                    type: "number",
                  },
                  seconds: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              loadBalancingScheme: {
                type: "string",
                enum: [
                  "EXTERNAL",
                  "EXTERNAL_MANAGED",
                  "INTERNAL",
                  "INTERNAL_MANAGED",
                  "INTERNAL_SELF_MANAGED",
                  "INVALID_LOAD_BALANCING_SCHEME",
                ],
              },
              outlierDetection: {
                type: "object",
                properties: {
                  maxEjectionPercent: {
                    type: "number",
                  },
                  successRateRequestVolume: {
                    type: "number",
                  },
                  baseEjectionTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  successRateMinimumHosts: {
                    type: "number",
                  },
                  successRateStdevFactor: {
                    type: "number",
                  },
                  interval: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enforcingConsecutiveGatewayFailure: {
                    type: "number",
                  },
                  consecutiveErrors: {
                    type: "number",
                  },
                  consecutiveGatewayFailure: {
                    type: "number",
                  },
                  enforcingSuccessRate: {
                    type: "number",
                  },
                  enforcingConsecutiveErrors: {
                    type: "number",
                  },
                },
                additionalProperties: true,
              },
              serviceBindings: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              portName: {
                type: "string",
              },
              connectionTrackingPolicy: {
                type: "object",
                properties: {
                  idleTimeoutSec: {
                    type: "number",
                  },
                  connectionPersistenceOnUnhealthyBackends: {
                    type: "string",
                    enum: [
                      "ALWAYS_PERSIST",
                      "DEFAULT_FOR_PROTOCOL",
                      "NEVER_PERSIST",
                    ],
                  },
                  trackingMode: {
                    type: "string",
                    enum: [
                      "INVALID_TRACKING_MODE",
                      "PER_CONNECTION",
                      "PER_SESSION",
                    ],
                  },
                  enableStrongAffinity: {
                    type: "boolean",
                  },
                },
                additionalProperties: true,
              },
              healthChecks: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              region: {
                type: "string",
              },
              localityLbPolicy: {
                type: "string",
                enum: [
                  "INVALID_LB_POLICY",
                  "LEAST_REQUEST",
                  "MAGLEV",
                  "ORIGINAL_DESTINATION",
                  "RANDOM",
                  "RING_HASH",
                  "ROUND_ROBIN",
                  "WEIGHTED_GCP_RENDEZVOUS",
                  "WEIGHTED_MAGLEV",
                  "WEIGHTED_ROUND_ROBIN",
                ],
              },
              securityPolicy: {
                type: "string",
              },
              subsetting: {
                type: "object",
                properties: {
                  policy: {
                    type: "string",
                    enum: ["CONSISTENT_HASH_SUBSETTING", "NONE"],
                  },
                },
                additionalProperties: true,
              },
              localityLbPolicies: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    policy: {
                      type: "object",
                      additionalProperties: true,
                    },
                    customPolicy: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              circuitBreakers: {
                type: "object",
                properties: {
                  maxRetries: {
                    type: "number",
                  },
                  maxRequestsPerConnection: {
                    type: "number",
                  },
                  maxConnections: {
                    type: "number",
                  },
                  maxRequests: {
                    type: "number",
                  },
                  maxPendingRequests: {
                    type: "number",
                  },
                },
                additionalProperties: true,
              },
              failoverPolicy: {
                type: "object",
                properties: {
                  disableConnectionDrainOnFailover: {
                    type: "boolean",
                  },
                  failoverRatio: {
                    type: "number",
                  },
                  dropTrafficIfUnhealthy: {
                    type: "boolean",
                  },
                },
                additionalProperties: true,
              },
              strongSessionAffinityCookie: {
                type: "object",
                properties: {
                  ttl: {
                    type: "object",
                    additionalProperties: true,
                  },
                  path: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              description: {
                type: "string",
              },
              enableCDN: {
                type: "boolean",
              },
              securitySettings: {
                type: "object",
                properties: {
                  clientTlsPolicy: {
                    type: "string",
                  },
                  subjectAltNames: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  awsV4Authentication: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              sessionAffinity: {
                type: "string",
                enum: [
                  "CLIENT_IP",
                  "CLIENT_IP_NO_DESTINATION",
                  "CLIENT_IP_PORT_PROTO",
                  "CLIENT_IP_PROTO",
                  "GENERATED_COOKIE",
                  "HEADER_FIELD",
                  "HTTP_COOKIE",
                  "NONE",
                  "STRONG_COOKIE_AFFINITY",
                ],
              },
              fingerprint: {
                type: "string",
              },
              network: {
                type: "string",
              },
              id: {
                type: "string",
              },
              protocol: {
                type: "string",
                enum: [
                  "GRPC",
                  "H2C",
                  "HTTP",
                  "HTTP2",
                  "HTTPS",
                  "SSL",
                  "TCP",
                  "UDP",
                  "UNSPECIFIED",
                ],
              },
              timeoutSec: {
                type: "number",
              },
              logConfig: {
                type: "object",
                properties: {
                  sampleRate: {
                    type: "number",
                  },
                  optionalFields: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  optionalMode: {
                    type: "string",
                    enum: [
                      "CUSTOM",
                      "EXCLUDE_ALL_OPTIONAL",
                      "INCLUDE_ALL_OPTIONAL",
                    ],
                  },
                  enable: {
                    type: "boolean",
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
        const path = `projects/{project}/global/backendServices/{backendService}`;
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

export default backendServicesPatch;
