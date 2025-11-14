import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const backendBucketsGet: AppBlock = {
  name: "Backend Buckets - Get",
  description: `Returns the specified BackendBucket resource.`,
  category: "Backend Buckets",
  inputs: {
    default: {
      config: {
        backendBucket: {
          name: "BackendBucket",
          description: "Name of the BackendBucket resource to return.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
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
            "https://www.googleapis.com/auth/compute",
            "https://www.googleapis.com/auth/compute.readonly",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        const path = `projects/{project}/global/backendBuckets/{backendBucket}`;
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
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          id: {
            type: "string",
          },
          enableCdn: {
            type: "boolean",
          },
          edgeSecurityPolicy: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          customResponseHeaders: {
            type: "array",
            items: {
              type: "string",
            },
          },
          kind: {
            type: "string",
          },
          compressionMode: {
            type: "string",
            enum: ["AUTOMATIC", "DISABLED"],
          },
          cdnPolicy: {
            type: "object",
            properties: {
              requestCoalescing: {
                type: "boolean",
              },
              negativeCaching: {
                type: "boolean",
              },
              cacheMode: {
                type: "string",
                enum: [
                  "CACHE_ALL_STATIC",
                  "FORCE_CACHE_ALL",
                  "INVALID_CACHE_MODE",
                  "USE_ORIGIN_HEADERS",
                ],
              },
              clientTtl: {
                type: "number",
              },
              cacheKeyPolicy: {
                type: "object",
                additionalProperties: true,
              },
              maxTtl: {
                type: "number",
              },
              defaultTtl: {
                type: "number",
              },
              signedUrlCacheMaxAgeSec: {
                type: "string",
              },
              negativeCachingPolicy: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              serveWhileStale: {
                type: "number",
              },
              bypassCacheOnRequestHeaders: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              signedUrlKeyNames: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          bucketName: {
            type: "string",
          },
          loadBalancingScheme: {
            type: "string",
            enum: ["INTERNAL_MANAGED"],
          },
          usedBy: {
            type: "array",
            items: {
              type: "object",
              properties: {
                reference: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          params: {
            type: "object",
            properties: {
              resourceManagerTags: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default backendBucketsGet;
