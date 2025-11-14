import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsServicesCreate: AppBlock = {
  name: "Locations - Create",
  description: `Creates a new Service in a given project and location.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The location and project in which this service should be created. Format: projects/{project}/locations/{location}, where {project} can be project id or number. Only lowercase characters, digits, and hyphens.",
          type: "string",
          required: true,
        },
        serviceId: {
          name: "ServiceId",
          description:
            "Required. The unique identifier for the Service. It must begin with letter, and cannot end with hyphen; must contain fewer than 50 characters. The name of the service becomes {parent}/services/{service_id}.",
          type: "string",
          required: false,
        },
        validateOnly: {
          name: "ValidateOnly",
          description:
            "Indicates that the request should be validated and default values populated, without persisting the request or creating any resources.",
          type: "boolean",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Service acts as a top-level container that manages a set of configurations and revision templates which implement a network service. Service exists to provide a singular abstraction which can be access controlled, reasoned about, and which encapsulates software lifecycle decisions such as rollout policy and team resource ownership.",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              description: {
                type: "string",
              },
              uid: {
                type: "string",
              },
              generation: {
                type: "string",
              },
              labels: {
                type: "object",
                additionalProperties: true,
              },
              annotations: {
                type: "object",
                additionalProperties: true,
              },
              createTime: {
                type: "string",
              },
              updateTime: {
                type: "string",
              },
              deleteTime: {
                type: "string",
              },
              expireTime: {
                type: "string",
              },
              creator: {
                type: "string",
              },
              lastModifier: {
                type: "string",
              },
              client: {
                type: "string",
              },
              clientVersion: {
                type: "string",
              },
              ingress: {
                type: "string",
                enum: [
                  "INGRESS_TRAFFIC_UNSPECIFIED",
                  "INGRESS_TRAFFIC_ALL",
                  "INGRESS_TRAFFIC_INTERNAL_ONLY",
                  "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER",
                  "INGRESS_TRAFFIC_NONE",
                ],
              },
              launchStage: {
                type: "string",
                enum: [
                  "LAUNCH_STAGE_UNSPECIFIED",
                  "UNIMPLEMENTED",
                  "PRELAUNCH",
                  "EARLY_ACCESS",
                  "ALPHA",
                  "BETA",
                  "GA",
                  "DEPRECATED",
                ],
              },
              binaryAuthorization: {
                type: "object",
                properties: {
                  useDefault: {
                    type: "boolean",
                  },
                  policy: {
                    type: "string",
                  },
                  breakglassJustification: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              template: {
                type: "object",
                properties: {
                  revision: {
                    type: "string",
                  },
                  labels: {
                    type: "object",
                    additionalProperties: true,
                  },
                  annotations: {
                    type: "object",
                    additionalProperties: true,
                  },
                  scaling: {
                    type: "object",
                    additionalProperties: true,
                  },
                  vpcAccess: {
                    type: "object",
                    additionalProperties: true,
                  },
                  timeout: {
                    type: "string",
                  },
                  serviceAccount: {
                    type: "string",
                  },
                  containers: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  volumes: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  executionEnvironment: {
                    type: "string",
                    enum: [
                      "EXECUTION_ENVIRONMENT_UNSPECIFIED",
                      "EXECUTION_ENVIRONMENT_GEN1",
                      "EXECUTION_ENVIRONMENT_GEN2",
                    ],
                  },
                  encryptionKey: {
                    type: "string",
                  },
                  maxInstanceRequestConcurrency: {
                    type: "number",
                  },
                  serviceMesh: {
                    type: "object",
                    additionalProperties: true,
                  },
                  encryptionKeyRevocationAction: {
                    type: "string",
                    enum: [
                      "ENCRYPTION_KEY_REVOCATION_ACTION_UNSPECIFIED",
                      "PREVENT_NEW",
                      "SHUTDOWN",
                    ],
                  },
                  encryptionKeyShutdownDuration: {
                    type: "string",
                  },
                  sessionAffinity: {
                    type: "boolean",
                  },
                  healthCheckDisabled: {
                    type: "boolean",
                  },
                  nodeSelector: {
                    type: "object",
                    additionalProperties: true,
                  },
                  gpuZonalRedundancyDisabled: {
                    type: "boolean",
                  },
                },
                additionalProperties: true,
              },
              traffic: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "object",
                      additionalProperties: true,
                    },
                    revision: {
                      type: "object",
                      additionalProperties: true,
                    },
                    percent: {
                      type: "object",
                      additionalProperties: true,
                    },
                    tag: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              scaling: {
                type: "object",
                properties: {
                  minInstanceCount: {
                    type: "number",
                  },
                  scalingMode: {
                    type: "string",
                    enum: ["SCALING_MODE_UNSPECIFIED", "AUTOMATIC", "MANUAL"],
                  },
                  maxInstanceCount: {
                    type: "number",
                  },
                  manualInstanceCount: {
                    type: "number",
                  },
                },
                additionalProperties: true,
              },
              invokerIamDisabled: {
                type: "boolean",
              },
              defaultUriDisabled: {
                type: "boolean",
              },
              urls: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              iapEnabled: {
                type: "boolean",
              },
              multiRegionSettings: {
                type: "object",
                properties: {
                  regions: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  multiRegionId: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              customAudiences: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              observedGeneration: {
                type: "string",
              },
              terminalCondition: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                  },
                  state: {
                    type: "string",
                    enum: [
                      "STATE_UNSPECIFIED",
                      "CONDITION_PENDING",
                      "CONDITION_RECONCILING",
                      "CONDITION_FAILED",
                      "CONDITION_SUCCEEDED",
                    ],
                  },
                  message: {
                    type: "string",
                  },
                  lastTransitionTime: {
                    type: "string",
                  },
                  severity: {
                    type: "string",
                    enum: ["SEVERITY_UNSPECIFIED", "ERROR", "WARNING", "INFO"],
                  },
                  reason: {
                    type: "string",
                    enum: [
                      "COMMON_REASON_UNDEFINED",
                      "UNKNOWN",
                      "REVISION_FAILED",
                      "PROGRESS_DEADLINE_EXCEEDED",
                      "CONTAINER_MISSING",
                      "CONTAINER_PERMISSION_DENIED",
                      "CONTAINER_IMAGE_UNAUTHORIZED",
                      "CONTAINER_IMAGE_AUTHORIZATION_CHECK_FAILED",
                      "ENCRYPTION_KEY_PERMISSION_DENIED",
                      "ENCRYPTION_KEY_CHECK_FAILED",
                      "SECRETS_ACCESS_CHECK_FAILED",
                      "WAITING_FOR_OPERATION",
                      "IMMEDIATE_RETRY",
                      "POSTPONED_RETRY",
                      "INTERNAL",
                      "VPC_NETWORK_NOT_FOUND",
                    ],
                  },
                  revisionReason: {
                    type: "string",
                    enum: [
                      "REVISION_REASON_UNDEFINED",
                      "PENDING",
                      "RESERVE",
                      "RETIRED",
                      "RETIRING",
                      "RECREATING",
                      "HEALTH_CHECK_CONTAINER_ERROR",
                      "CUSTOMIZED_PATH_RESPONSE_PENDING",
                      "MIN_INSTANCES_NOT_PROVISIONED",
                      "ACTIVE_REVISION_LIMIT_REACHED",
                      "NO_DEPLOYMENT",
                      "HEALTH_CHECK_SKIPPED",
                      "MIN_INSTANCES_WARMING",
                    ],
                  },
                  executionReason: {
                    type: "string",
                    enum: [
                      "EXECUTION_REASON_UNDEFINED",
                      "JOB_STATUS_SERVICE_POLLING_ERROR",
                      "NON_ZERO_EXIT_CODE",
                      "CANCELLED",
                      "CANCELLING",
                      "DELETED",
                    ],
                  },
                },
                additionalProperties: true,
              },
              conditions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "object",
                      additionalProperties: true,
                    },
                    state: {
                      type: "object",
                      additionalProperties: true,
                    },
                    message: {
                      type: "object",
                      additionalProperties: true,
                    },
                    lastTransitionTime: {
                      type: "object",
                      additionalProperties: true,
                    },
                    severity: {
                      type: "object",
                      additionalProperties: true,
                    },
                    reason: {
                      type: "object",
                      additionalProperties: true,
                    },
                    revisionReason: {
                      type: "object",
                      additionalProperties: true,
                    },
                    executionReason: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              latestReadyRevision: {
                type: "string",
              },
              latestCreatedRevision: {
                type: "string",
              },
              trafficStatuses: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "object",
                      additionalProperties: true,
                    },
                    revision: {
                      type: "object",
                      additionalProperties: true,
                    },
                    percent: {
                      type: "object",
                      additionalProperties: true,
                    },
                    tag: {
                      type: "object",
                      additionalProperties: true,
                    },
                    uri: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              uri: {
                type: "string",
              },
              satisfiesPzs: {
                type: "boolean",
              },
              threatDetectionEnabled: {
                type: "boolean",
              },
              buildConfig: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  sourceLocation: {
                    type: "string",
                  },
                  functionTarget: {
                    type: "string",
                  },
                  imageUri: {
                    type: "string",
                  },
                  baseImage: {
                    type: "string",
                  },
                  enableAutomaticUpdates: {
                    type: "boolean",
                  },
                  workerPool: {
                    type: "string",
                  },
                  environmentVariables: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serviceAccount: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              reconciling: {
                type: "boolean",
              },
              etag: {
                type: "string",
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
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://run.googleapis.com/";
        const path = `v2/{+parent}/services`;
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
          name: {
            type: "string",
          },
          metadata: {
            type: "object",
            additionalProperties: true,
          },
          done: {
            type: "boolean",
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "number",
              },
              message: {
                type: "string",
              },
              details: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          response: {
            type: "object",
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsServicesCreate;
