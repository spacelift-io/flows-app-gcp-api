import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const anywhereCachesUpdate: AppBlock = {
  name: "Anywhere Caches - Update",
  description: `Updates the config(ttl and admissionPolicy) of an Anywhere Cache instance.`,
  category: "Anywhere Caches",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "The name of the bucket containing this cache instance.",
          type: "string",
          required: false,
        },
        anywhereCacheId: {
          name: "Anywhere Cache ID",
          description: "The ID of the Anywhere cache instance.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "The kind of item this is.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description:
            "The ID of the resource, including the project number, bucket name and anywhere cache ID.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "The link to this cache instance.",
          type: "string",
          required: false,
        },
        zone: {
          name: "Zone",
          description: "The zone in which the cache instance is running.",
          type: "string",
          required: false,
        },
        state: {
          name: "State",
          description: "The current state of the cache instance.",
          type: "string",
          required: false,
        },
        createTime: {
          name: "Create Time",
          description:
            "The creation time of the cache instance in RFC 3339 format.",
          type: "string",
          required: false,
        },
        updateTime: {
          name: "Update Time",
          description:
            "The modification time of the cache instance metadata in RFC 3339 format.",
          type: "string",
          required: false,
        },
        ttl: {
          name: "Ttl",
          description: "The TTL of all cache entries in whole seconds.",
          type: "string",
          required: false,
        },
        admissionPolicy: {
          name: "Admission Policy",
          description: "The cache-level entry admission policy.",
          type: "string",
          required: false,
        },
        pendingUpdate: {
          name: "Pending Update",
          description:
            "True if the cache instance has an active Update long-running operation.",
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
        let path = `b/{bucket}/anywhereCaches/{anywhereCacheId}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.bucket !== undefined)
          requestBody.bucket = input.event.inputConfig.bucket;
        if (input.event.inputConfig.anywhereCacheId !== undefined)
          requestBody.anywhereCacheId = input.event.inputConfig.anywhereCacheId;
        if (input.event.inputConfig.zone !== undefined)
          requestBody.zone = input.event.inputConfig.zone;
        if (input.event.inputConfig.state !== undefined)
          requestBody.state = input.event.inputConfig.state;
        if (input.event.inputConfig.createTime !== undefined)
          requestBody.createTime = input.event.inputConfig.createTime;
        if (input.event.inputConfig.updateTime !== undefined)
          requestBody.updateTime = input.event.inputConfig.updateTime;
        if (input.event.inputConfig.ttl !== undefined)
          requestBody.ttl = input.event.inputConfig.ttl;
        if (input.event.inputConfig.admissionPolicy !== undefined)
          requestBody.admissionPolicy = input.event.inputConfig.admissionPolicy;
        if (input.event.inputConfig.pendingUpdate !== undefined)
          requestBody.pendingUpdate = input.event.inputConfig.pendingUpdate;

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

export default anywhereCachesUpdate;
