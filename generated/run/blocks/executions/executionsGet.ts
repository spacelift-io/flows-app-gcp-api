import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const executionsGet: AppBlock = {
  name: "Executions - Get",
  description: `Gets information about an Execution.`,
  category: "Executions",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The full name of the Execution. Format: `projects/{project}/locations/{location}/jobs/{job}/executions/{execution}`, where `{project}` can be project id or number.",
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
          uid: {
            type: "string",
          },
          creator: {
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
          startTime: {
            type: "string",
          },
          completionTime: {
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
          job: {
            type: "string",
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
              maxRetries: {
                type: "number",
              },
              timeout: {
                type: "string",
              },
              serviceAccount: {
                type: "string",
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
              vpcAccess: {
                type: "object",
                additionalProperties: true,
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
          reconciling: {
            type: "boolean",
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
          observedGeneration: {
            type: "string",
          },
          runningCount: {
            type: "number",
          },
          succeededCount: {
            type: "number",
          },
          failedCount: {
            type: "number",
          },
          cancelledCount: {
            type: "number",
          },
          retriedCount: {
            type: "number",
          },
          logUri: {
            type: "string",
          },
          satisfiesPzs: {
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

export default executionsGet;
