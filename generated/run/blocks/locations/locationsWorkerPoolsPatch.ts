import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsWorkerPoolsPatch: AppBlock = {
  name: "Locations - Patch",
  description: `Updates a WorkerPool.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "The fully qualified name of this WorkerPool. In CreateWorkerPoolRequest, this field is ignored, and instead composed from CreateWorkerPoolRequest.parent and CreateWorkerPoolRequest.worker_id. Format: `projects/{project}/locations/{location}/workerPools/{worker_id}`",
          type: "string",
          required: true,
        },
        updateMask: {
          name: "UpdateMask",
          description: "Optional. The list of fields to be updated.",
          type: "string",
          required: false,
        },
        validateOnly: {
          name: "ValidateOnly",
          description:
            "Optional. Indicates that the request should be validated and default values populated, without persisting the request or updating any resources.",
          type: "boolean",
          required: false,
        },
        allowMissing: {
          name: "AllowMissing",
          description:
            "Optional. If set to true, and if the WorkerPool does not exist, it will create a new one. The caller must have 'run.workerpools.create' permissions if this is set to true and the WorkerPool does not exist.",
          type: "boolean",
          required: false,
        },
        forceNewRevision: {
          name: "ForceNewRevision",
          description:
            "Optional. If set to true, a new revision will be created from the template even if the system doesn't detect any changes from the previously deployed revision. This may be useful for cases where the underlying resources need to be recreated or reinitialized. For example if the image is specified by label, but the underlying image digest has changed) or if the container performs deployment initialization work that needs to be performed again.",
          type: "boolean",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "WorkerPool acts as a top-level container that manages a set of configurations and revision templates which implement a pull-based workload. WorkerPool exists to provide a singular abstraction which can be access controlled, reasoned about, and which encapsulates software lifecycle decisions such as rollout policy and team resource ownership.",
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
                  vpcAccess: {
                    type: "object",
                    additionalProperties: true,
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
                  encryptionKey: {
                    type: "string",
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
              instanceSplits: {
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
                  },
                  additionalProperties: true,
                },
              },
              scaling: {
                type: "object",
                properties: {
                  manualInstanceCount: {
                    type: "number",
                  },
                },
                additionalProperties: true,
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
              instanceSplitStatuses: {
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
                  },
                  additionalProperties: true,
                },
              },
              customAudiences: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              satisfiesPzs: {
                type: "boolean",
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
        const path = `v2/{+name}`;
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

export default locationsWorkerPoolsPatch;
