import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsJobsExecutionsTasksList: AppBlock = {
  name: "Locations - List",
  description: `Lists Tasks from an Execution of a Job.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            'Required. The Execution from which the Tasks should be listed. To list all Tasks across Executions of a Job, use "-" instead of Execution name. To list all Tasks across Jobs, use "-" instead of Job name. Format: projects/{project}/locations/{location}/jobs/{job}/executions/{execution}',
          type: "string",
          required: true,
        },
        pageSize: {
          name: "PageSize",
          description: "Maximum number of Tasks to return in this call.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description:
            "A page token received from a previous call to ListTasks. All other parameters must match.",
          type: "string",
          required: false,
        },
        showDeleted: {
          name: "ShowDeleted",
          description:
            "If true, returns deleted (but unexpired) resources along with active ones.",
          type: "boolean",
          required: false,
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
        const path = `v2/{+parent}/tasks`;
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
          tasks: {
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
                scheduledTime: {
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
                job: {
                  type: "object",
                  additionalProperties: true,
                },
                execution: {
                  type: "object",
                  additionalProperties: true,
                },
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
                index: {
                  type: "object",
                  additionalProperties: true,
                },
                retried: {
                  type: "object",
                  additionalProperties: true,
                },
                lastAttemptResult: {
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
                logUri: {
                  type: "object",
                  additionalProperties: true,
                },
                satisfiesPzs: {
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

export default locationsJobsExecutionsTasksList;
