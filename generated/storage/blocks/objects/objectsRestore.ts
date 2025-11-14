import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const objectsRestore: AppBlock = {
  name: "Objects - Restore",
  description: `Restores a soft-deleted object.`,
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
        generation: {
          name: "Generation",
          description: "Selects a specific revision of this object.",
          type: "string",
          required: true,
        },
        object: {
          name: "Object",
          description:
            "Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding).",
          type: "string",
          required: true,
        },
        ifGenerationMatch: {
          name: "If Generation Match",
          description:
            "Makes the operation conditional on whether the object's one live generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.",
          type: "string",
          required: false,
        },
        ifGenerationNotMatch: {
          name: "If Generation Not Match",
          description:
            "Makes the operation conditional on whether none of the object's live generations match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.",
          type: "string",
          required: false,
        },
        ifMetagenerationMatch: {
          name: "If Metageneration Match",
          description:
            "Makes the operation conditional on whether the object's one live metageneration matches the given value.",
          type: "string",
          required: false,
        },
        ifMetagenerationNotMatch: {
          name: "If Metageneration Not Match",
          description:
            "Makes the operation conditional on whether none of the object's live metagenerations match the given value.",
          type: "string",
          required: false,
        },
        copySourceAcl: {
          name: "Copy Source ACL",
          description:
            "If true, copies the source object's ACL; otherwise, uses the bucket's default object ACL. The default is false.",
          type: "boolean",
          required: false,
        },
        projection: {
          name: "Projection",
          description:
            "Set of properties to return. Defaults to full. Valid values: full, noAcl",
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
        restoreToken: {
          name: "Restore Token",
          description:
            "Restore token used to differentiate sof-deleted objects with the same name and generation. Only applicable for hierarchical namespace buckets. This parameter is optional, and is only required in the rare case when there are multiple soft-deleted objects with the same name and generation.",
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
        let path = `b/{bucket}/o/{object}/restore`;

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
          acl: {
            type: "array",
            items: {
              type: "object",
              properties: {
                bucket: {
                  type: "object",
                  additionalProperties: true,
                },
                domain: {
                  type: "object",
                  additionalProperties: true,
                },
                email: {
                  type: "object",
                  additionalProperties: true,
                },
                entity: {
                  type: "object",
                  additionalProperties: true,
                },
                entityId: {
                  type: "object",
                  additionalProperties: true,
                },
                etag: {
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
                object: {
                  type: "object",
                  additionalProperties: true,
                },
                projectTeam: {
                  type: "object",
                  additionalProperties: true,
                },
                role: {
                  type: "object",
                  additionalProperties: true,
                },
                selfLink: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          bucket: {
            type: "string",
          },
          cacheControl: {
            type: "string",
          },
          componentCount: {
            type: "number",
          },
          contentDisposition: {
            type: "string",
          },
          contentEncoding: {
            type: "string",
          },
          contentLanguage: {
            type: "string",
          },
          contentType: {
            type: "string",
          },
          crc32c: {
            type: "string",
          },
          customTime: {
            type: "string",
          },
          customerEncryption: {
            type: "object",
            properties: {
              encryptionAlgorithm: {
                type: "string",
              },
              keySha256: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          etag: {
            type: "string",
          },
          eventBasedHold: {
            type: "boolean",
          },
          generation: {
            type: "string",
          },
          id: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          kmsKeyName: {
            type: "string",
          },
          md5Hash: {
            type: "string",
          },
          mediaLink: {
            type: "string",
          },
          metadata: {
            type: "object",
            additionalProperties: true,
          },
          contexts: {
            type: "object",
            properties: {
              custom: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          restoreToken: {
            type: "string",
          },
          metageneration: {
            type: "string",
          },
          name: {
            type: "string",
          },
          owner: {
            type: "object",
            properties: {
              entity: {
                type: "string",
              },
              entityId: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          retentionExpirationTime: {
            type: "string",
          },
          retention: {
            type: "object",
            properties: {
              retainUntilTime: {
                type: "string",
              },
              mode: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          selfLink: {
            type: "string",
          },
          size: {
            type: "string",
          },
          storageClass: {
            type: "string",
          },
          temporaryHold: {
            type: "boolean",
          },
          timeCreated: {
            type: "string",
          },
          timeDeleted: {
            type: "string",
          },
          timeFinalized: {
            type: "string",
          },
          softDeleteTime: {
            type: "string",
          },
          hardDeleteTime: {
            type: "string",
          },
          timeStorageClassUpdated: {
            type: "string",
          },
          updated: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default objectsRestore;
