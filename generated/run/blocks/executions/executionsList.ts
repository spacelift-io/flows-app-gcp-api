import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const executionsList: AppBlock = {
  name: "Executions - List",
  description: `Lists Executions from a Job.`,
  category: "Executions",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            'Required. The Execution from which the Executions should be listed. To list all Executions across Jobs, use "-" instead of Job name. Format: `projects/{project}/locations/{location}/jobs/{job}`, where `{project}` can be project id or number.',
          type: "string",
          required: true,
        },
        pageSize: {
          name: "Page Size",
          description: "Maximum number of Executions to return in this call.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "Page Token",
          description:
            "A page token received from a previous call to ListExecutions. All other parameters must match.",
          type: "string",
          required: false,
        },
        showDeleted: {
          name: "Show Deleted",
          description:
            "If true, returns deleted (but unexpired) resources along with active ones.",
          type: "boolean",
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
        let path = `v2/{+parent}/executions`;

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
          executions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                uid: {
                  type: "object",
                  additionalProperties: true,
                },
                creator: {
                  type: "object",
                  additionalProperties: true,
                },
                generation: {
                  type: "object",
                  additionalProperties: true,
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
                  type: "object",
                  additionalProperties: true,
                },
                startTime: {
                  type: "object",
                  additionalProperties: true,
                },
                completionTime: {
                  type: "object",
                  additionalProperties: true,
                },
                updateTime: {
                  type: "object",
                  additionalProperties: true,
                },
                deleteTime: {
                  type: "object",
                  additionalProperties: true,
                },
                expireTime: {
                  type: "object",
                  additionalProperties: true,
                },
                launchStage: {
                  type: "object",
                  additionalProperties: true,
                },
                job: {
                  type: "object",
                  additionalProperties: true,
                },
                parallelism: {
                  type: "object",
                  additionalProperties: true,
                },
                taskCount: {
                  type: "object",
                  additionalProperties: true,
                },
                template: {
                  type: "object",
                  additionalProperties: true,
                },
                reconciling: {
                  type: "object",
                  additionalProperties: true,
                },
                conditions: {
                  type: "object",
                  additionalProperties: true,
                },
                observedGeneration: {
                  type: "object",
                  additionalProperties: true,
                },
                runningCount: {
                  type: "object",
                  additionalProperties: true,
                },
                succeededCount: {
                  type: "object",
                  additionalProperties: true,
                },
                failedCount: {
                  type: "object",
                  additionalProperties: true,
                },
                cancelledCount: {
                  type: "object",
                  additionalProperties: true,
                },
                retriedCount: {
                  type: "object",
                  additionalProperties: true,
                },
                logUri: {
                  type: "object",
                  additionalProperties: true,
                },
                satisfiesPzs: {
                  type: "object",
                  additionalProperties: true,
                },
                etag: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          nextPageToken: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default executionsList;
