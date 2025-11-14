import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const regionUrlMapsUpdate: AppBlock = {
  name: "Region URL Maps - Update",
  description: `Updates the specified UrlMap resource with the data included in the request.`,
  category: "Region URL Maps",
  inputs: {
    default: {
      config: {
        urlMap: {
          name: "URL Map",
          description: "Name of the UrlMap resource to update.",
          type: "string",
          required: true,
        },
        region: {
          name: "Region",
          description:
            "[Output Only] URL of the region where the regional URL map resides.",
          type: "string",
          required: false,
        },
        requestId: {
          name: "Request ID",
          description:
            "begin_interface: MixerMutationRequestBuilder\nRequest ID to support idempotency.",
          type: "string",
          required: false,
        },
        fingerprint: {
          name: "Fingerprint",
          description: "Fingerprint of this resource.",
          type: "string",
          required: false,
        },
        hostRules: {
          name: "Host Rules",
          description: "The list of host rules to use against the URL.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                hosts: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                description: {
                  type: "string",
                },
                pathMatcher: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        headerAction: {
          name: "Header Action",
          description:
            "Specifies changes to request and response headers that need to take effect for the selected backendService.",
          type: {
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
                  type: "string",
                },
              },
              requestHeadersToRemove: {
                type: "array",
                items: {
                  type: "string",
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
          required: false,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] Creation timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        defaultCustomErrorResponsePolicy: {
          name: "Default Custom Error Response Policy",
          description:
            "defaultCustomErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error.",
          type: {
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
          required: false,
        },
        defaultService: {
          name: "Default Service",
          description:
            "The full or partial URL of the defaultService resource to which traffic is directed if none of the hostRules match.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for the resource.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output Only] Type of the resource.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "Name of the resource.",
          type: "string",
          required: false,
        },
        pathMatchers: {
          name: "Path Matchers",
          description: "The list of named PathMatchers to use against the URL.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                defaultCustomErrorResponsePolicy: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "string",
                },
                description: {
                  type: "string",
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
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                defaultService: {
                  type: "string",
                },
                pathRules: {
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
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        tests: {
          name: "Tests",
          description: "The list of expected URL mapping tests.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                headers: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                host: {
                  type: "string",
                },
                expectedRedirectResponseCode: {
                  type: "number",
                },
                description: {
                  type: "string",
                },
                expectedOutputUrl: {
                  type: "string",
                },
                path: {
                  type: "string",
                },
                service: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        defaultUrlRedirect: {
          name: "Default URL Redirect",
          description:
            "When none of the specified hostRules match, the request is redirected to a URL specified by defaultUrlRedirect.",
          type: {
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
          required: false,
        },
        defaultRouteAction: {
          name: "Default Route Action",
          description:
            "defaultRouteAction takes effect when none of the hostRules match.",
          type: {
            type: "object",
            properties: {
              retryPolicy: {
                type: "object",
                properties: {
                  perTryTimeout: {
                    type: "object",
                    additionalProperties: true,
                  },
                  numRetries: {
                    type: "object",
                    additionalProperties: true,
                  },
                  retryConditions: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              timeout: {
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
              urlRewrite: {
                type: "object",
                properties: {
                  pathTemplateRewrite: {
                    type: "object",
                    additionalProperties: true,
                  },
                  hostRewrite: {
                    type: "object",
                    additionalProperties: true,
                  },
                  pathPrefixRewrite: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              requestMirrorPolicy: {
                type: "object",
                properties: {
                  backendService: {
                    type: "object",
                    additionalProperties: true,
                  },
                  mirrorPercent: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              maxStreamDuration: {
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
              corsPolicy: {
                type: "object",
                properties: {
                  allowHeaders: {
                    type: "object",
                    additionalProperties: true,
                  },
                  disabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  allowCredentials: {
                    type: "object",
                    additionalProperties: true,
                  },
                  allowOrigins: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxAge: {
                    type: "object",
                    additionalProperties: true,
                  },
                  allowOriginRegexes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  allowMethods: {
                    type: "object",
                    additionalProperties: true,
                  },
                  exposeHeaders: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              faultInjectionPolicy: {
                type: "object",
                properties: {
                  abort: {
                    type: "object",
                    additionalProperties: true,
                  },
                  delay: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
        let path = `projects/{project}/regions/{region}/urlMaps/{urlMap}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (input.event.inputConfig.fingerprint !== undefined)
          requestBody.fingerprint = input.event.inputConfig.fingerprint;
        if (input.event.inputConfig.hostRules !== undefined)
          requestBody.hostRules = input.event.inputConfig.hostRules;
        if (input.event.inputConfig.headerAction !== undefined)
          requestBody.headerAction = input.event.inputConfig.headerAction;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (
          input.event.inputConfig.defaultCustomErrorResponsePolicy !== undefined
        )
          requestBody.defaultCustomErrorResponsePolicy =
            input.event.inputConfig.defaultCustomErrorResponsePolicy;
        if (input.event.inputConfig.defaultService !== undefined)
          requestBody.defaultService = input.event.inputConfig.defaultService;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.pathMatchers !== undefined)
          requestBody.pathMatchers = input.event.inputConfig.pathMatchers;
        if (input.event.inputConfig.tests !== undefined)
          requestBody.tests = input.event.inputConfig.tests;
        if (input.event.inputConfig.defaultUrlRedirect !== undefined)
          requestBody.defaultUrlRedirect =
            input.event.inputConfig.defaultUrlRedirect;
        if (input.event.inputConfig.defaultRouteAction !== undefined)
          requestBody.defaultRouteAction =
            input.event.inputConfig.defaultRouteAction;

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

export default regionUrlMapsUpdate;
