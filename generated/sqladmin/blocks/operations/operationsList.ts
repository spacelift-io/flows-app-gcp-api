import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const operationsList: AppBlock = {
  name: "Operations - List",
  description: `Lists all instance operations that have been performed on the given Cloud SQL instance in the reverse chronological order of the start time.`,
  category: "Operations",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID of the project that contains the instance.",
          type: "string",
          required: true,
        },
        instance: {
          name: "Instance",
          description:
            "Cloud SQL instance ID. This does not include the project ID.",
          type: "string",
          required: false,
        },
        maxResults: {
          name: "MaxResults",
          description: "Maximum number of operations per response.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description:
            "A previously-returned page token representing part of the larger set of results to view.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        // Parse service account credentials
        const credentials = JSON.parse(input.app.config.serviceAccountKey);

        // Initialize Google Auth
        const auth = new GoogleAuth({
          credentials,
          scopes: [
            "https://www.googleapis.com/auth/cloud-platform",
            "https://www.googleapis.com/auth/sqlservice.admin",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://sqladmin.googleapis.com/";
        const path = `v1/projects/{project}/operations`;
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
          kind: {
            type: "string",
          },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                targetLink: {
                  type: "object",
                  additionalProperties: true,
                },
                status: {
                  type: "object",
                  additionalProperties: true,
                },
                user: {
                  type: "object",
                  additionalProperties: true,
                },
                insertTime: {
                  type: "object",
                  additionalProperties: true,
                },
                startTime: {
                  type: "object",
                  additionalProperties: true,
                },
                endTime: {
                  type: "object",
                  additionalProperties: true,
                },
                error: {
                  type: "object",
                  additionalProperties: true,
                },
                apiWarning: {
                  type: "object",
                  additionalProperties: true,
                },
                operationType: {
                  type: "object",
                  additionalProperties: true,
                },
                importContext: {
                  type: "object",
                  additionalProperties: true,
                },
                exportContext: {
                  type: "object",
                  additionalProperties: true,
                },
                backupContext: {
                  type: "object",
                  additionalProperties: true,
                },
                preCheckMajorVersionUpgradeContext: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                targetId: {
                  type: "object",
                  additionalProperties: true,
                },
                selfLink: {
                  type: "object",
                  additionalProperties: true,
                },
                targetProject: {
                  type: "object",
                  additionalProperties: true,
                },
                acquireSsrsLeaseContext: {
                  type: "object",
                  additionalProperties: true,
                },
                subOperationType: {
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

export default operationsList;
