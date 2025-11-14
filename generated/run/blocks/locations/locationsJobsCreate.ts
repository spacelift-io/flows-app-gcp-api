import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsJobsCreate: AppBlock = {
  name: "Locations - Create",
  description: `Creates a Job.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The location and project in which this Job should be created. Format: projects/{project}/locations/{location}, where {project} can be project id or number.",
          type: "string",
          required: true,
        },
        jobId: {
          name: "JobId",
          description:
            "Required. The unique identifier for the Job. The name of the job becomes {parent}/jobs/{job_id}.",
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
            "Job represents the configuration of a single job, which references a container image that is run to completion.",
          type: {
            type: "object",
            properties: {
              name: {
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
                  labels: {
                    type: "object",
                    additionalProperties: true,
                  },
                  annotations: {
                    type: "object",
                    additionalProperties: true,
                  },
                  parallelism: {
                    type: "number",
                  },
                  taskCount: {
                    type: "number",
                  },
                  template: {
                    type: "object",
                    additionalProperties: true,
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
              executionCount: {
                type: "number",
              },
              latestCreatedExecution: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  createTime: {
                    type: "string",
                  },
                  completionTime: {
                    type: "string",
                  },
                  deleteTime: {
                    type: "string",
                  },
                  completionStatus: {
                    type: "string",
                    enum: [
                      "COMPLETION_STATUS_UNSPECIFIED",
                      "EXECUTION_SUCCEEDED",
                      "EXECUTION_FAILED",
                      "EXECUTION_RUNNING",
                      "EXECUTION_PENDING",
                      "EXECUTION_CANCELLED",
                    ],
                  },
                },
                additionalProperties: true,
              },
              reconciling: {
                type: "boolean",
              },
              satisfiesPzs: {
                type: "boolean",
              },
              startExecutionToken: {
                type: "string",
              },
              runExecutionToken: {
                type: "string",
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
        const path = `v2/{+parent}/jobs`;
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

export default locationsJobsCreate;
