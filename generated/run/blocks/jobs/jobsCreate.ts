import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const jobsCreate: AppBlock = {
  name: "Jobs - Create",
  description: `Creates a Job.`,
  category: "Jobs",
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
          name: "Job ID",
          description:
            "Required. The unique identifier for the Job. The name of the job becomes {parent}/jobs/{job_id}.",
          type: "string",
          required: false,
        },
        validateOnly: {
          name: "Validate Only",
          description:
            "Indicates that the request should be validated and default values populated, without persisting the request or creating any resources.",
          type: "boolean",
          required: false,
        },
        name: {
          name: "Name",
          description: "The fully qualified name of this Job.",
          type: "string",
          required: false,
        },
        uid: {
          name: "Uid",
          description: "Output only.",
          type: "string",
          required: false,
        },
        generation: {
          name: "Generation",
          description: "Output only.",
          type: "string",
          required: false,
        },
        labels: {
          name: "Labels",
          description:
            "Unstructured key value map that can be used to organize and categorize objects.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        annotations: {
          name: "Annotations",
          description:
            "Unstructured key value map that may be set by external tools to store and arbitrary metadata.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        createTime: {
          name: "Create Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        updateTime: {
          name: "Update Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        deleteTime: {
          name: "Delete Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        expireTime: {
          name: "Expire Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        creator: {
          name: "Creator",
          description: "Output only.",
          type: "string",
          required: false,
        },
        lastModifier: {
          name: "Last Modifier",
          description: "Output only.",
          type: "string",
          required: false,
        },
        client: {
          name: "Client",
          description: "Arbitrary identifier for the API client.",
          type: "string",
          required: false,
        },
        clientVersion: {
          name: "Client Version",
          description: "Arbitrary version identifier for the API client.",
          type: "string",
          required: false,
        },
        launchStage: {
          name: "Launch Stage",
          description:
            "The launch stage as defined by [Google Cloud Platform Launch Stages](https://cloud.",
          type: "string",
          required: false,
        },
        binaryAuthorization: {
          name: "Binary Authorization",
          description: "Settings for the Binary Authorization feature.",
          type: {
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
          required: false,
        },
        template: {
          name: "Template",
          description: "Required.",
          type: {
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
                properties: {
                  containers: {
                    type: "object",
                    additionalProperties: true,
                  },
                  volumes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxRetries: {
                    type: "object",
                    additionalProperties: true,
                  },
                  timeout: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serviceAccount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  executionEnvironment: {
                    type: "object",
                    additionalProperties: true,
                  },
                  encryptionKey: {
                    type: "object",
                    additionalProperties: true,
                  },
                  vpcAccess: {
                    type: "object",
                    additionalProperties: true,
                  },
                  nodeSelector: {
                    type: "object",
                    additionalProperties: true,
                  },
                  gpuZonalRedundancyDisabled: {
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
        observedGeneration: {
          name: "Observed Generation",
          description: "Output only.",
          type: "string",
          required: false,
        },
        terminalCondition: {
          name: "Terminal Condition",
          description: "Output only.",
          type: {
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
          required: false,
        },
        conditions: {
          name: "Conditions",
          description: "Output only.",
          type: {
            type: "array",
            items: {
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
          },
          required: false,
        },
        executionCount: {
          name: "Execution Count",
          description: "Output only.",
          type: "number",
          required: false,
        },
        latestCreatedExecution: {
          name: "Latest Created Execution",
          description: "Output only.",
          type: {
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
          required: false,
        },
        reconciling: {
          name: "Reconciling",
          description: "Output only.",
          type: "boolean",
          required: false,
        },
        satisfiesPzs: {
          name: "Satisfies Pzs",
          description: "Output only.",
          type: "boolean",
          required: false,
        },
        startExecutionToken: {
          name: "Start Execution Token",
          description:
            "A unique string used as a suffix creating a new execution.",
          type: "string",
          required: false,
        },
        runExecutionToken: {
          name: "Run Execution Token",
          description:
            "A unique string used as a suffix for creating a new execution.",
          type: "string",
          required: false,
        },
        etag: {
          name: "Etag",
          description: "Optional.",
          type: "string",
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
            scopes: ["https://www.googleapis.com/auth/cloud-platform"],
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
        const baseUrl = "https://run.googleapis.com/";
        let path = `v2/{+parent}/jobs`;

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
        if (input.event.inputConfig.uid !== undefined)
          requestBody.uid = input.event.inputConfig.uid;
        if (input.event.inputConfig.generation !== undefined)
          requestBody.generation = input.event.inputConfig.generation;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.annotations !== undefined)
          requestBody.annotations = input.event.inputConfig.annotations;
        if (input.event.inputConfig.createTime !== undefined)
          requestBody.createTime = input.event.inputConfig.createTime;
        if (input.event.inputConfig.updateTime !== undefined)
          requestBody.updateTime = input.event.inputConfig.updateTime;
        if (input.event.inputConfig.deleteTime !== undefined)
          requestBody.deleteTime = input.event.inputConfig.deleteTime;
        if (input.event.inputConfig.expireTime !== undefined)
          requestBody.expireTime = input.event.inputConfig.expireTime;
        if (input.event.inputConfig.creator !== undefined)
          requestBody.creator = input.event.inputConfig.creator;
        if (input.event.inputConfig.lastModifier !== undefined)
          requestBody.lastModifier = input.event.inputConfig.lastModifier;
        if (input.event.inputConfig.client !== undefined)
          requestBody.client = input.event.inputConfig.client;
        if (input.event.inputConfig.clientVersion !== undefined)
          requestBody.clientVersion = input.event.inputConfig.clientVersion;
        if (input.event.inputConfig.launchStage !== undefined)
          requestBody.launchStage = input.event.inputConfig.launchStage;
        if (input.event.inputConfig.binaryAuthorization !== undefined)
          requestBody.binaryAuthorization =
            input.event.inputConfig.binaryAuthorization;
        if (input.event.inputConfig.template !== undefined)
          requestBody.template = input.event.inputConfig.template;
        if (input.event.inputConfig.observedGeneration !== undefined)
          requestBody.observedGeneration =
            input.event.inputConfig.observedGeneration;
        if (input.event.inputConfig.terminalCondition !== undefined)
          requestBody.terminalCondition =
            input.event.inputConfig.terminalCondition;
        if (input.event.inputConfig.conditions !== undefined)
          requestBody.conditions = input.event.inputConfig.conditions;
        if (input.event.inputConfig.executionCount !== undefined)
          requestBody.executionCount = input.event.inputConfig.executionCount;
        if (input.event.inputConfig.latestCreatedExecution !== undefined)
          requestBody.latestCreatedExecution =
            input.event.inputConfig.latestCreatedExecution;
        if (input.event.inputConfig.reconciling !== undefined)
          requestBody.reconciling = input.event.inputConfig.reconciling;
        if (input.event.inputConfig.satisfiesPzs !== undefined)
          requestBody.satisfiesPzs = input.event.inputConfig.satisfiesPzs;
        if (input.event.inputConfig.startExecutionToken !== undefined)
          requestBody.startExecutionToken =
            input.event.inputConfig.startExecutionToken;
        if (input.event.inputConfig.runExecutionToken !== undefined)
          requestBody.runExecutionToken =
            input.event.inputConfig.runExecutionToken;
        if (input.event.inputConfig.etag !== undefined)
          requestBody.etag = input.event.inputConfig.etag;

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

export default jobsCreate;
