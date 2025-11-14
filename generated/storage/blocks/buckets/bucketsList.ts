import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const bucketsList: AppBlock = {
  name: "Buckets - List",
  description: `Retrieves a list of buckets for a given project.`,
  category: "Buckets",
  inputs: {
    default: {
      config: {
        maxResults: {
          name: "MaxResults",
          description:
            "Maximum number of buckets to return in a single response. The service will use this parameter or 1,000 items, whichever is smaller.",
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
            "Filter results to buckets whose names begin with this prefix.",
          type: "string",
          required: false,
        },
        softDeleted: {
          name: "SoftDeleted",
          description:
            "If true, only soft-deleted bucket versions will be returned. The default is false. For more information, see [Soft Delete](https://cloud.google.com/storage/docs/soft-delete).",
          type: "boolean",
          required: false,
        },
        project: {
          name: "Project",
          description: "A valid API project identifier.",
          type: "string",
          required: true,
        },
        projection: {
          name: "Projection",
          description:
            "Set of properties to return. Defaults to noAcl. Valid values: full, noAcl",
          type: "string",
          required: false,
        },
        userProject: {
          name: "UserProject",
          description: "The project to be billed for this request.",
          type: "string",
          required: false,
        },
        returnPartialSuccess: {
          name: "ReturnPartialSuccess",
          description:
            "If true, return a list of bucket resource names for buckets that are in unreachable locations.",
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
        const path = `b`;
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
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                acl: {
                  type: "object",
                  additionalProperties: true,
                },
                billing: {
                  type: "object",
                  additionalProperties: true,
                },
                cors: {
                  type: "object",
                  additionalProperties: true,
                },
                customPlacementConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                defaultEventBasedHold: {
                  type: "object",
                  additionalProperties: true,
                },
                defaultObjectAcl: {
                  type: "object",
                  additionalProperties: true,
                },
                encryption: {
                  type: "object",
                  additionalProperties: true,
                },
                etag: {
                  type: "object",
                  additionalProperties: true,
                },
                hierarchicalNamespace: {
                  type: "object",
                  additionalProperties: true,
                },
                iamConfiguration: {
                  type: "object",
                  additionalProperties: true,
                },
                id: {
                  type: "object",
                  additionalProperties: true,
                },
                ipFilter: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                labels: {
                  type: "object",
                  additionalProperties: true,
                },
                lifecycle: {
                  type: "object",
                  additionalProperties: true,
                },
                autoclass: {
                  type: "object",
                  additionalProperties: true,
                },
                location: {
                  type: "object",
                  additionalProperties: true,
                },
                locationType: {
                  type: "object",
                  additionalProperties: true,
                },
                logging: {
                  type: "object",
                  additionalProperties: true,
                },
                generation: {
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
                projectNumber: {
                  type: "object",
                  additionalProperties: true,
                },
                retentionPolicy: {
                  type: "object",
                  additionalProperties: true,
                },
                objectRetention: {
                  type: "object",
                  additionalProperties: true,
                },
                rpo: {
                  type: "object",
                  additionalProperties: true,
                },
                selfLink: {
                  type: "object",
                  additionalProperties: true,
                },
                softDeletePolicy: {
                  type: "object",
                  additionalProperties: true,
                },
                storageClass: {
                  type: "object",
                  additionalProperties: true,
                },
                timeCreated: {
                  type: "object",
                  additionalProperties: true,
                },
                updated: {
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
                versioning: {
                  type: "object",
                  additionalProperties: true,
                },
                website: {
                  type: "object",
                  additionalProperties: true,
                },
                satisfiesPZS: {
                  type: "object",
                  additionalProperties: true,
                },
                satisfiesPZI: {
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
          unreachable: {
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

export default bucketsList;
