import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const objectsList: AppBlock = {
  name: "Objects - List",
  description: `Retrieves a list of objects matching the criteria.`,
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
          name: "End Offset",
          description:
            "Filter results to objects whose names are lexicographically before endOffset. If startOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).",
          type: "string",
          required: false,
        },
        includeTrailingDelimiter: {
          name: "Include Trailing Delimiter",
          description:
            "If true, objects that end in exactly one instance of delimiter will have their metadata included in items in addition to prefixes.",
          type: "boolean",
          required: false,
        },
        maxResults: {
          name: "Max Results",
          description:
            "Maximum number of items plus prefixes to return in a single page of responses. As duplicate prefixes are omitted, fewer total results may be returned than requested. The service will use this parameter or 1,000 items, whichever is smaller.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "Page Token",
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
          name: "Start Offset",
          description:
            "Filter results to objects whose names are lexicographically equal to or after startOffset. If endOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).",
          type: "string",
          required: false,
        },
        userProject: {
          name: "User Project",
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
        matchGlob: {
          name: "Match Glob",
          description:
            "Filter results to objects and prefixes that match this glob pattern.",
          type: "string",
          required: false,
        },
        filter: {
          name: "Filter",
          description:
            "Filter the returned objects. Currently only supported for the contexts field. If delimiter is set, the returned prefixes are exempt from this filter.",
          type: "string",
          required: false,
        },
        softDeleted: {
          name: "Soft Deleted",
          description:
            "If true, only soft-deleted object versions will be listed. The default is false. For more information, see [Soft Delete](https://cloud.google.com/storage/docs/soft-delete).",
          type: "boolean",
          required: false,
        },
        includeFoldersAsPrefixes: {
          name: "Include Folders As Prefixes",
          description:
            "Only applicable if delimiter is set to '/'. If true, will also include folders and managed folders (besides objects) in the returned prefixes.",
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
              "https://www.googleapis.com/auth/cloud-platform.read-only",
              "https://www.googleapis.com/auth/devstorage.full_control",
              "https://www.googleapis.com/auth/devstorage.read_only",
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
        let path = `b/{bucket}/o`;

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
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                acl: {
                  type: "object",
                  additionalProperties: true,
                },
                bucket: {
                  type: "object",
                  additionalProperties: true,
                },
                cacheControl: {
                  type: "object",
                  additionalProperties: true,
                },
                componentCount: {
                  type: "object",
                  additionalProperties: true,
                },
                contentDisposition: {
                  type: "object",
                  additionalProperties: true,
                },
                contentEncoding: {
                  type: "object",
                  additionalProperties: true,
                },
                contentLanguage: {
                  type: "object",
                  additionalProperties: true,
                },
                contentType: {
                  type: "object",
                  additionalProperties: true,
                },
                crc32c: {
                  type: "object",
                  additionalProperties: true,
                },
                customTime: {
                  type: "object",
                  additionalProperties: true,
                },
                customerEncryption: {
                  type: "object",
                  additionalProperties: true,
                },
                etag: {
                  type: "object",
                  additionalProperties: true,
                },
                eventBasedHold: {
                  type: "object",
                  additionalProperties: true,
                },
                generation: {
                  type: "object",
                  additionalProperties: true,
                },
                id: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                kmsKeyName: {
                  type: "object",
                  additionalProperties: true,
                },
                md5Hash: {
                  type: "object",
                  additionalProperties: true,
                },
                mediaLink: {
                  type: "object",
                  additionalProperties: true,
                },
                metadata: {
                  type: "object",
                  additionalProperties: true,
                },
                contexts: {
                  type: "object",
                  additionalProperties: true,
                },
                restoreToken: {
                  type: "object",
                  additionalProperties: true,
                },
                metageneration: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                owner: {
                  type: "object",
                  additionalProperties: true,
                },
                retentionExpirationTime: {
                  type: "object",
                  additionalProperties: true,
                },
                retention: {
                  type: "object",
                  additionalProperties: true,
                },
                selfLink: {
                  type: "object",
                  additionalProperties: true,
                },
                size: {
                  type: "object",
                  additionalProperties: true,
                },
                storageClass: {
                  type: "object",
                  additionalProperties: true,
                },
                temporaryHold: {
                  type: "object",
                  additionalProperties: true,
                },
                timeCreated: {
                  type: "object",
                  additionalProperties: true,
                },
                timeDeleted: {
                  type: "object",
                  additionalProperties: true,
                },
                timeFinalized: {
                  type: "object",
                  additionalProperties: true,
                },
                softDeleteTime: {
                  type: "object",
                  additionalProperties: true,
                },
                hardDeleteTime: {
                  type: "object",
                  additionalProperties: true,
                },
                timeStorageClassUpdated: {
                  type: "object",
                  additionalProperties: true,
                },
                updated: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          kind: {
            type: "string",
          },
          nextPageToken: {
            type: "string",
          },
          prefixes: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default objectsList;
