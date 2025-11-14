import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const objectsBulkRestore: AppBlock = {
  name: "Objects - Bulk Restore",
  description: `Initiates a long-running bulk restore operation on the specified bucket.`,
  category: "Objects",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "Name of the bucket in which the object resides.",
          type: "string",
          required: true,
        },
        allowOverwrite: {
          name: "Allow Overwrite",
          description:
            "If false (default), the restore will not overwrite live objects with the same name at the destination.",
          type: "boolean",
          required: false,
        },
        softDeletedAfterTime: {
          name: "Soft Deleted After Time",
          description:
            "Restores only the objects that were soft-deleted after this time.",
          type: "string",
          required: false,
        },
        softDeletedBeforeTime: {
          name: "Soft Deleted Before Time",
          description:
            "Restores only the objects that were soft-deleted before this time.",
          type: "string",
          required: false,
        },
        matchGlobs: {
          name: "Match Globs",
          description:
            "Restores only the objects matching any of the specified glob(s).",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        copySourceAcl: {
          name: "Copy Source ACL",
          description:
            "If true, copies the source object's ACL; otherwise, uses the bucket's default object ACL.",
          type: "boolean",
          required: false,
        },
        createdAfterTime: {
          name: "Created After Time",
          description:
            "Restores only the objects that were created after this time.",
          type: "string",
          required: false,
        },
        createdBeforeTime: {
          name: "Created Before Time",
          description:
            "Restores only the objects that were created before this time.",
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
            scopes: [
              "https://www.googleapis.com/auth/cloud-platform",
              "https://www.googleapis.com/auth/devstorage.full_control",
              "https://www.googleapis.com/auth/devstorage.read_write",
            ],
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
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        let path = `b/{bucket}/o/bulkRestore`;

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

        if (input.event.inputConfig.allowOverwrite !== undefined)
          requestBody.allowOverwrite = input.event.inputConfig.allowOverwrite;
        if (input.event.inputConfig.softDeletedAfterTime !== undefined)
          requestBody.softDeletedAfterTime =
            input.event.inputConfig.softDeletedAfterTime;
        if (input.event.inputConfig.softDeletedBeforeTime !== undefined)
          requestBody.softDeletedBeforeTime =
            input.event.inputConfig.softDeletedBeforeTime;
        if (input.event.inputConfig.matchGlobs !== undefined)
          requestBody.matchGlobs = input.event.inputConfig.matchGlobs;
        if (input.event.inputConfig.copySourceAcl !== undefined)
          requestBody.copySourceAcl = input.event.inputConfig.copySourceAcl;
        if (input.event.inputConfig.createdAfterTime !== undefined)
          requestBody.createdAfterTime =
            input.event.inputConfig.createdAfterTime;
        if (input.event.inputConfig.createdBeforeTime !== undefined)
          requestBody.createdBeforeTime =
            input.event.inputConfig.createdBeforeTime;

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
          done: {
            type: "boolean",
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "number",
              },
              details: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              message: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          metadata: {
            type: "object",
            additionalProperties: true,
          },
          name: {
            type: "string",
          },
          response: {
            type: "object",
            additionalProperties: true,
          },
          selfLink: {
            type: "string",
          },
          kind: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default objectsBulkRestore;
