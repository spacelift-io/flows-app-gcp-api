import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const backendServicesInsert: AppBlock = {
  name: "Backend Services - Insert",
  description: `Creates a BackendService resource in the specified project using the data included in the request.`,
  category: "Backend Services",
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
        affinityCookieTtlSec: {
          name: "Affinity Cookie Ttl Sec",
          description: "Lifetime of cookies in seconds.",
          type: "number",
          required: false,
        },
        customMetrics: {
          name: "Custom Metrics",
          description:
            "List of custom metrics that are used for theWEIGHTED_ROUND_ROBIN locality_lb_policy.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                dryRun: {
                  type: "boolean",
                },
                name: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        name: {
          name: "Name",
          description: "Name of the resource.",
          type: "string",
          required: false,
        },
        iap: {
          name: "Iap",
          description:
            "The configurations for Identity-Aware Proxy on this resource.",
          type: {
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
          required: false,
        },
        compressionMode: {
          name: "Compression Mode",
          description:
            "Compress text responses using Brotli or gzip compression, based on the client's Accept-Encoding header.",
          type: "string",
          required: false,
        },
        customRequestHeaders: {
          name: "Custom Request Headers",
          description:
            "Headers that the load balancer adds to proxied requests.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        usedBy: {
          name: "Used By",
          description:
            "[Output Only] List of resources referencing given backend service.",
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
        edgeSecurityPolicy: {
          name: "Edge Security Policy",
          description:
            "[Output Only] The resource URL for the edge security policy associated with this backend service.",
          type: "string",
          required: false,
        },
        tlsSettings: {
          name: "TLS Settings",
          description: "Configuration for Backend Authenticated TLS and mTLS.",
          type: {
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
          required: false,
        },
        consistentHash: {
          name: "Consistent Hash",
          description:
            "Consistent Hash-based load balancing can be used to provide soft session affinity based on HTTP headers, cookies or other properties.",
          type: {
            type: "object",
            properties: {
              minimumRingSize: {
                type: "string",
              },
              httpCookie: {
                type: "object",
                properties: {
                  path: {
                    type: "object",
                    additionalProperties: true,
                  },
                  ttl: {
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
              httpHeaderName: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        serviceLbPolicy: {
          name: "Service LB Policy",
          description: "URL to networkservices.",
          type: "string",
          required: false,
        },
        ipAddressSelectionPolicy: {
          name: "IP Address Selection Policy",
          description:
            "Specifies a preference for traffic sent from the proxy to the backend (or from the client to the backend for proxyless gRPC).",
          type: "string",
          required: false,
        },
        externalManagedMigrationState: {
          name: "External Managed Migration State",
          description: "Specifies the canary migration state.",
          type: "string",
          required: false,
        },
        customResponseHeaders: {
          name: "Custom Response Headers",
          description:
            "Headers that the load balancer adds to proxied responses.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] Creation timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        connectionDraining: {
          name: "Connection Draining",
          description: "connectionDraining cannot be specified with haPolicy.",
          type: {
            type: "object",
            properties: {
              drainingTimeoutSec: {
                type: "number",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        backends: {
          name: "Backends",
          description: "The list of backends that serve this BackendService.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                maxConnectionsPerEndpoint: {
                  type: "number",
                },
                balancingMode: {
                  type: "string",
                  enum: ["CONNECTION", "CUSTOM_METRICS", "RATE", "UTILIZATION"],
                },
                group: {
                  type: "string",
                },
                maxRatePerInstance: {
                  type: "number",
                },
                maxRate: {
                  type: "number",
                },
                maxConnections: {
                  type: "number",
                },
                preference: {
                  type: "string",
                  enum: ["DEFAULT", "PREFERENCE_UNSPECIFIED", "PREFERRED"],
                },
                failover: {
                  type: "boolean",
                },
                description: {
                  type: "string",
                },
                maxConnectionsPerInstance: {
                  type: "number",
                },
                customMetrics: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                maxUtilization: {
                  type: "number",
                },
                capacityScaler: {
                  type: "number",
                },
                maxRatePerEndpoint: {
                  type: "number",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        externalManagedMigrationTestingPercentage: {
          name: "External Managed Migration Testing Percentage",
          description:
            "Determines the fraction of requests that should be processed by the Global external Application Load Balancer.",
          type: "number",
          required: false,
        },
        metadatas: {
          name: "Metadatas",
          description:
            "Deployment metadata associated with the resource to be set by a GKE hub controller and read by the b...",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of resource.",
          type: "string",
          required: false,
        },
        haPolicy: {
          name: "Ha Policy",
          description:
            "Configures self-managed High Availability (HA) for External and Internal Protocol Forwarding.",
          type: {
            type: "object",
            properties: {
              leader: {
                type: "object",
                properties: {
                  networkEndpoint: {
                    type: "object",
                    additionalProperties: true,
                  },
                  backendGroup: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              fastIPMove: {
                type: "string",
                enum: ["DISABLED", "GARP_RA"],
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
        cdnPolicy: {
          name: "CDN Policy",
          description: "Cloud CDN configuration for this BackendService.",
          type: {
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
                  type: "string",
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
                properties: {
                  queryStringWhitelist: {
                    type: "object",
                    additionalProperties: true,
                  },
                  includeHost: {
                    type: "object",
                    additionalProperties: true,
                  },
                  includeProtocol: {
                    type: "object",
                    additionalProperties: true,
                  },
                  includeHttpHeaders: {
                    type: "object",
                    additionalProperties: true,
                  },
                  queryStringBlacklist: {
                    type: "object",
                    additionalProperties: true,
                  },
                  includeQueryString: {
                    type: "object",
                    additionalProperties: true,
                  },
                  includeNamedCookies: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
          required: false,
        },
        maxStreamDuration: {
          name: "Max Stream Duration",
          description:
            "Specifies the default maximum duration (timeout) for streams to this service.",
          type: {
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
          required: false,
        },
        loadBalancingScheme: {
          name: "Load Balancing Scheme",
          description: "Specifies the load balancer type.",
          type: "string",
          required: false,
        },
        outlierDetection: {
          name: "Outlier Detection",
          description:
            "Settings controlling the ejection of unhealthy backend endpoints from the load balancing pool of each individual proxy instance that processes the traffic for the given backend service.",
          type: {
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
                properties: {
                  nanos: {
                    type: "object",
                    additionalProperties: true,
                  },
                  seconds: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  nanos: {
                    type: "object",
                    additionalProperties: true,
                  },
                  seconds: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
          required: false,
        },
        serviceBindings: {
          name: "Service Bindings",
          description: "URLs of networkservices.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        portName: {
          name: "Port Name",
          description:
            "A named port on a backend instance group representing the port for communication to the backend VMs in that group.",
          type: "string",
          required: false,
        },
        connectionTrackingPolicy: {
          name: "Connection Tracking Policy",
          description:
            "Connection Tracking configuration for this BackendService.",
          type: {
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
          required: false,
        },
        healthChecks: {
          name: "Health Checks",
          description:
            "The list of URLs to the healthChecks, httpHealthChecks (legacy), or httpsHealthChecks (legacy) resource for health checking this backend service.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        region: {
          name: "Region",
          description:
            "[Output Only] URL of the region where the regional backend service resides.",
          type: "string",
          required: false,
        },
        localityLbPolicy: {
          name: "Locality LB Policy",
          description:
            "The load balancing algorithm used within the scope of the locality.",
          type: "string",
          required: false,
        },
        securityPolicy: {
          name: "Security Policy",
          description:
            "[Output Only] The resource URL for the security policy associated with this backend service.",
          type: "string",
          required: false,
        },
        subsetting: {
          name: "Subsetting",
          description: "subsetting cannot be specified with haPolicy.",
          type: {
            type: "object",
            properties: {
              policy: {
                type: "string",
                enum: ["CONSISTENT_HASH_SUBSETTING", "NONE"],
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        localityLbPolicies: {
          name: "Locality LB Policies",
          description:
            "A list of locality load-balancing policies to be used in order of preference.",
          type: {
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
          required: false,
        },
        circuitBreakers: {
          name: "Circuit Breakers",
          description: "Request body field: circuitBreakers",
          type: {
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
          required: false,
        },
        failoverPolicy: {
          name: "Failover Policy",
          description:
            "Requires at least one backend instance group to be defined as a backup (failover) backend.",
          type: {
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
          required: false,
        },
        strongSessionAffinityCookie: {
          name: "Strong Session Affinity Cookie",
          description:
            "Describes the HTTP cookie used for stateful session affinity.",
          type: {
            type: "object",
            properties: {
              ttl: {
                type: "object",
                properties: {
                  nanos: {
                    type: "object",
                    additionalProperties: true,
                  },
                  seconds: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        enableCDN: {
          name: "Enable CDN",
          description:
            "If true, enables Cloud CDN for the backend service of a global external Application Load Balancer.",
          type: "boolean",
          required: false,
        },
        securitySettings: {
          name: "Security Settings",
          description:
            "This field specifies the security settings that apply to this backend service.",
          type: {
            type: "object",
            properties: {
              clientTlsPolicy: {
                type: "string",
              },
              subjectAltNames: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              awsV4Authentication: {
                type: "object",
                properties: {
                  accessKeyVersion: {
                    type: "object",
                    additionalProperties: true,
                  },
                  originRegion: {
                    type: "object",
                    additionalProperties: true,
                  },
                  accessKey: {
                    type: "object",
                    additionalProperties: true,
                  },
                  accessKeyId: {
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
        sessionAffinity: {
          name: "Session Affinity",
          description: "Type of session affinity to use.",
          type: "string",
          required: false,
        },
        fingerprint: {
          name: "Fingerprint",
          description: "Fingerprint of this resource.",
          type: "string",
          required: false,
        },
        network: {
          name: "Network",
          description:
            "The URL of the network to which this backend service belongs.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
          type: "string",
          required: false,
        },
        protocol: {
          name: "Protocol",
          description:
            "The protocol this BackendService uses to communicate with backends.",
          type: "string",
          required: false,
        },
        timeoutSec: {
          name: "Timeout Sec",
          description:
            "The backend service timeout has a different meaning depending on the type of load balancer.",
          type: "number",
          required: false,
        },
        logConfig: {
          name: "Log Config",
          description:
            "This field denotes the logging options for the load balancer traffic served by this backend service.",
          type: {
            type: "object",
            properties: {
              sampleRate: {
                type: "number",
              },
              optionalFields: {
                type: "array",
                items: {
                  type: "string",
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
        let path = `projects/{project}/global/backendServices`;

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

        if (input.event.inputConfig.params !== undefined)
          requestBody.params = input.event.inputConfig.params;
        if (input.event.inputConfig.affinityCookieTtlSec !== undefined)
          requestBody.affinityCookieTtlSec =
            input.event.inputConfig.affinityCookieTtlSec;
        if (input.event.inputConfig.customMetrics !== undefined)
          requestBody.customMetrics = input.event.inputConfig.customMetrics;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.iap !== undefined)
          requestBody.iap = input.event.inputConfig.iap;
        if (input.event.inputConfig.compressionMode !== undefined)
          requestBody.compressionMode = input.event.inputConfig.compressionMode;
        if (input.event.inputConfig.customRequestHeaders !== undefined)
          requestBody.customRequestHeaders =
            input.event.inputConfig.customRequestHeaders;
        if (input.event.inputConfig.usedBy !== undefined)
          requestBody.usedBy = input.event.inputConfig.usedBy;
        if (input.event.inputConfig.edgeSecurityPolicy !== undefined)
          requestBody.edgeSecurityPolicy =
            input.event.inputConfig.edgeSecurityPolicy;
        if (input.event.inputConfig.tlsSettings !== undefined)
          requestBody.tlsSettings = input.event.inputConfig.tlsSettings;
        if (input.event.inputConfig.consistentHash !== undefined)
          requestBody.consistentHash = input.event.inputConfig.consistentHash;
        if (input.event.inputConfig.serviceLbPolicy !== undefined)
          requestBody.serviceLbPolicy = input.event.inputConfig.serviceLbPolicy;
        if (input.event.inputConfig.ipAddressSelectionPolicy !== undefined)
          requestBody.ipAddressSelectionPolicy =
            input.event.inputConfig.ipAddressSelectionPolicy;
        if (input.event.inputConfig.externalManagedMigrationState !== undefined)
          requestBody.externalManagedMigrationState =
            input.event.inputConfig.externalManagedMigrationState;
        if (input.event.inputConfig.customResponseHeaders !== undefined)
          requestBody.customResponseHeaders =
            input.event.inputConfig.customResponseHeaders;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.connectionDraining !== undefined)
          requestBody.connectionDraining =
            input.event.inputConfig.connectionDraining;
        if (input.event.inputConfig.backends !== undefined)
          requestBody.backends = input.event.inputConfig.backends;
        if (
          input.event.inputConfig.externalManagedMigrationTestingPercentage !==
          undefined
        )
          requestBody.externalManagedMigrationTestingPercentage =
            input.event.inputConfig.externalManagedMigrationTestingPercentage;
        if (input.event.inputConfig.metadatas !== undefined)
          requestBody.metadatas = input.event.inputConfig.metadatas;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.haPolicy !== undefined)
          requestBody.haPolicy = input.event.inputConfig.haPolicy;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.cdnPolicy !== undefined)
          requestBody.cdnPolicy = input.event.inputConfig.cdnPolicy;
        if (input.event.inputConfig.maxStreamDuration !== undefined)
          requestBody.maxStreamDuration =
            input.event.inputConfig.maxStreamDuration;
        if (input.event.inputConfig.loadBalancingScheme !== undefined)
          requestBody.loadBalancingScheme =
            input.event.inputConfig.loadBalancingScheme;
        if (input.event.inputConfig.outlierDetection !== undefined)
          requestBody.outlierDetection =
            input.event.inputConfig.outlierDetection;
        if (input.event.inputConfig.serviceBindings !== undefined)
          requestBody.serviceBindings = input.event.inputConfig.serviceBindings;
        if (input.event.inputConfig.portName !== undefined)
          requestBody.portName = input.event.inputConfig.portName;
        if (input.event.inputConfig.connectionTrackingPolicy !== undefined)
          requestBody.connectionTrackingPolicy =
            input.event.inputConfig.connectionTrackingPolicy;
        if (input.event.inputConfig.healthChecks !== undefined)
          requestBody.healthChecks = input.event.inputConfig.healthChecks;
        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (input.event.inputConfig.localityLbPolicy !== undefined)
          requestBody.localityLbPolicy =
            input.event.inputConfig.localityLbPolicy;
        if (input.event.inputConfig.securityPolicy !== undefined)
          requestBody.securityPolicy = input.event.inputConfig.securityPolicy;
        if (input.event.inputConfig.subsetting !== undefined)
          requestBody.subsetting = input.event.inputConfig.subsetting;
        if (input.event.inputConfig.localityLbPolicies !== undefined)
          requestBody.localityLbPolicies =
            input.event.inputConfig.localityLbPolicies;
        if (input.event.inputConfig.circuitBreakers !== undefined)
          requestBody.circuitBreakers = input.event.inputConfig.circuitBreakers;
        if (input.event.inputConfig.failoverPolicy !== undefined)
          requestBody.failoverPolicy = input.event.inputConfig.failoverPolicy;
        if (input.event.inputConfig.strongSessionAffinityCookie !== undefined)
          requestBody.strongSessionAffinityCookie =
            input.event.inputConfig.strongSessionAffinityCookie;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.enableCDN !== undefined)
          requestBody.enableCDN = input.event.inputConfig.enableCDN;
        if (input.event.inputConfig.securitySettings !== undefined)
          requestBody.securitySettings =
            input.event.inputConfig.securitySettings;
        if (input.event.inputConfig.sessionAffinity !== undefined)
          requestBody.sessionAffinity = input.event.inputConfig.sessionAffinity;
        if (input.event.inputConfig.fingerprint !== undefined)
          requestBody.fingerprint = input.event.inputConfig.fingerprint;
        if (input.event.inputConfig.network !== undefined)
          requestBody.network = input.event.inputConfig.network;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.protocol !== undefined)
          requestBody.protocol = input.event.inputConfig.protocol;
        if (input.event.inputConfig.timeoutSec !== undefined)
          requestBody.timeoutSec = input.event.inputConfig.timeoutSec;
        if (input.event.inputConfig.logConfig !== undefined)
          requestBody.logConfig = input.event.inputConfig.logConfig;

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

export default backendServicesInsert;
