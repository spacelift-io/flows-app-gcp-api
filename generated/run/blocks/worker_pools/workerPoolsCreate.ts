import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const workerPoolsCreate: AppBlock = {
  name: "Worker Pools - Create",
  description: `Creates a new WorkerPool in a given project and location.`,
  category: "Worker Pools",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The location and project in which this worker pool should be created. Format: `projects/{project}/locations/{location}`, where `{project}` can be project id or number. Only lowercase characters, digits, and hyphens.",
          type: "string",
          required: true,
        },
        workerPoolId: {
          name: "Worker Pool ID",
          description:
            "Required. The unique identifier for the WorkerPool. It must begin with letter, and cannot end with hyphen; must contain fewer than 50 characters. The name of the worker pool becomes `{parent}/workerPools/{worker_pool_id}`.",
          type: "string",
          required: false,
        },
        validateOnly: {
          name: "Validate Only",
          description:
            "Optional. Indicates that the request should be validated and default values populated, without persisting the request or creating any resources.",
          type: "boolean",
          required: false,
        },
        name: {
          name: "Name",
          description: "The fully qualified name of this WorkerPool.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description: "User-provided description of the WorkerPool.",
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
          description: "Optional.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        annotations: {
          name: "Annotations",
          description: "Optional.",
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
          description: "Optional.",
          type: "string",
          required: false,
        },
        binaryAuthorization: {
          name: "Binary Authorization",
          description: "Optional.",
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
                properties: {
                  connector: {
                    type: "object",
                    additionalProperties: true,
                  },
                  egress: {
                    type: "object",
                    additionalProperties: true,
                  },
                  networkInterfaces: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  mesh: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
                properties: {
                  accelerator: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              gpuZonalRedundancyDisabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        instanceSplits: {
          name: "Instance Splits",
          description: "Optional.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: [
                    "INSTANCE_SPLIT_ALLOCATION_TYPE_UNSPECIFIED",
                    "INSTANCE_SPLIT_ALLOCATION_TYPE_LATEST",
                    "INSTANCE_SPLIT_ALLOCATION_TYPE_REVISION",
                  ],
                },
                revision: {
                  type: "string",
                },
                percent: {
                  type: "number",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        scaling: {
          name: "Scaling",
          description: "Optional.",
          type: {
            type: "object",
            properties: {
              manualInstanceCount: {
                type: "number",
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
        latestReadyRevision: {
          name: "Latest Ready Revision",
          description: "Output only.",
          type: "string",
          required: false,
        },
        latestCreatedRevision: {
          name: "Latest Created Revision",
          description: "Output only.",
          type: "string",
          required: false,
        },
        instanceSplitStatuses: {
          name: "Instance Split Statuses",
          description: "Output only.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: [
                    "INSTANCE_SPLIT_ALLOCATION_TYPE_UNSPECIFIED",
                    "INSTANCE_SPLIT_ALLOCATION_TYPE_LATEST",
                    "INSTANCE_SPLIT_ALLOCATION_TYPE_REVISION",
                  ],
                },
                revision: {
                  type: "string",
                },
                percent: {
                  type: "number",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        customAudiences: {
          name: "Custom Audiences",
          description:
            "One or more custom audiences that you want this worker pool to support.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        satisfiesPzs: {
          name: "Satisfies Pzs",
          description: "Output only.",
          type: "boolean",
          required: false,
        },
        reconciling: {
          name: "Reconciling",
          description: "Output only.",
          type: "boolean",
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
        let path = `v2/{+parent}/workerPools`;

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
        if (input.event.inputConfig.instanceSplits !== undefined)
          requestBody.instanceSplits = input.event.inputConfig.instanceSplits;
        if (input.event.inputConfig.scaling !== undefined)
          requestBody.scaling = input.event.inputConfig.scaling;
        if (input.event.inputConfig.observedGeneration !== undefined)
          requestBody.observedGeneration =
            input.event.inputConfig.observedGeneration;
        if (input.event.inputConfig.terminalCondition !== undefined)
          requestBody.terminalCondition =
            input.event.inputConfig.terminalCondition;
        if (input.event.inputConfig.conditions !== undefined)
          requestBody.conditions = input.event.inputConfig.conditions;
        if (input.event.inputConfig.latestReadyRevision !== undefined)
          requestBody.latestReadyRevision =
            input.event.inputConfig.latestReadyRevision;
        if (input.event.inputConfig.latestCreatedRevision !== undefined)
          requestBody.latestCreatedRevision =
            input.event.inputConfig.latestCreatedRevision;
        if (input.event.inputConfig.instanceSplitStatuses !== undefined)
          requestBody.instanceSplitStatuses =
            input.event.inputConfig.instanceSplitStatuses;
        if (input.event.inputConfig.customAudiences !== undefined)
          requestBody.customAudiences = input.event.inputConfig.customAudiences;
        if (input.event.inputConfig.satisfiesPzs !== undefined)
          requestBody.satisfiesPzs = input.event.inputConfig.satisfiesPzs;
        if (input.event.inputConfig.reconciling !== undefined)
          requestBody.reconciling = input.event.inputConfig.reconciling;
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

export default workerPoolsCreate;
