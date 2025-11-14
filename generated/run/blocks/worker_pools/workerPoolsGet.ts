import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const workerPoolsGet: AppBlock = {
  name: "Worker Pools - Get",
  description: `Gets information about a WorkerPool.`,
  category: "Worker Pools",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The full name of the WorkerPool. Format: `projects/{project}/locations/{location}/workerPools/{worker_pool}`, where `{project}` can be project id or number.",
          type: "string",
          required: true,
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
        let path = `v2/{+name}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
    },
  },
};

export default workerPoolsGet;
