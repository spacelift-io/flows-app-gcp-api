import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const backendServicesGet: AppBlock = {
  name: "Backend Services - Get",
  description: `Returns the specified BackendService resource.`,
  category: "Backend Services",
  inputs: {
    default: {
      config: {
        backendService: {
          name: "BackendService",
          description: "Name of the BackendService resource to return.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
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
            "https://www.googleapis.com/auth/compute.readonly",
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
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
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
    },
  },
};

export default backendServicesGet;
