import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const objectsWatchAll: AppBlock = {
  name: "Objects - Watch All",
  description: `Watch for changes on all objects in a bucket.`,
  category: "Objects",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "Name of the bucket in which to look for objects.",
          type: "string",
          required: true,
        },
        delimiter: {
          name: "Delimiter",
          description:
            "Returns results in a directory-like mode. items will contain only objects whose names, aside from the prefix, do not contain delimiter. Objects whose names, aside from the prefix, contain delimiter will have their name, truncated after the delimiter, returned in prefixes. Duplicate prefixes are omitted.",
          type: "string",
          required: false,
        },
        endOffset: {
          name: "EndOffset",
          description:
            "Filter results to objects whose names are lexicographically before endOffset. If startOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).",
          type: "string",
          required: false,
        },
        includeTrailingDelimiter: {
          name: "IncludeTrailingDelimiter",
          description:
            "If true, objects that end in exactly one instance of delimiter will have their metadata included in items in addition to prefixes.",
          type: "boolean",
          required: false,
        },
        maxResults: {
          name: "MaxResults",
          description:
            "Maximum number of items plus prefixes to return in a single page of responses. As duplicate prefixes are omitted, fewer total results may be returned than requested. The service will use this parameter or 1,000 items, whichever is smaller.",
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
        prefix: {
          name: "Prefix",
          description:
            "Filter results to objects whose names begin with this prefix.",
          type: "string",
          required: false,
        },
        projection: {
          name: "Projection",
          description:
            "Set of properties to return. Defaults to noAcl. Valid values: full, noAcl",
          type: "string",
          required: false,
        },
        startOffset: {
          name: "StartOffset",
          description:
            "Filter results to objects whose names are lexicographically equal to or after startOffset. If endOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).",
          type: "string",
          required: false,
        },
        userProject: {
          name: "UserProject",
          description:
            "The project to be billed for this request. Required for Requester Pays buckets.",
          type: "string",
          required: false,
        },
        versions: {
          name: "Versions",
          description:
            "If true, lists all versions of an object as distinct results. The default is false. For more information, see [Object Versioning](https://cloud.google.com/storage/docs/object-versioning).",
          type: "boolean",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "An notification channel used to watch for resource changes.",
          type: {
            type: "object",
            properties: {
              address: {
                type: "string",
              },
              expiration: {
                type: "string",
              },
              id: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              params: {
                type: "object",
                additionalProperties: true,
              },
              payload: {
                type: "boolean",
              },
              resourceId: {
                type: "string",
              },
              resourceUri: {
                type: "string",
              },
              token: {
                type: "string",
              },
              type: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
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
            "https://www.googleapis.com/auth/cloud-platform.read-only",
            "https://www.googleapis.com/auth/devstorage.full_control",
            "https://www.googleapis.com/auth/devstorage.read_only",
            "https://www.googleapis.com/auth/devstorage.read_write",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        const path = `b/{bucket}/o/watch`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        };

        // Add request body
        if (input.event.inputConfig.requestBody) {
          requestOptions.body = JSON.stringify(
            input.event.inputConfig.requestBody,
          );
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
          address: {
            type: "string",
          },
          expiration: {
            type: "string",
          },
          id: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          params: {
            type: "object",
            additionalProperties: true,
          },
          payload: {
            type: "boolean",
          },
          resourceId: {
            type: "string",
          },
          resourceUri: {
            type: "string",
          },
          token: {
            type: "string",
          },
          type: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default objectsWatchAll;
