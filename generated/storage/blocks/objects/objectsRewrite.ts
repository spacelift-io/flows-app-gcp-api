import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const objectsRewrite: AppBlock = {
  name: "Objects - Rewrite",
  description: `Rewrites a source object to a destination object.`,
  category: "Objects",
  inputs: {
    default: {
      config: {
        destinationBucket: {
          name: "Destination Bucket",
          description:
            "Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.",
          type: "string",
          required: true,
        },
        destinationObject: {
          name: "Destination Object",
          description:
            "Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding).",
          type: "string",
          required: true,
        },
        sourceBucket: {
          name: "Source Bucket",
          description: "Name of the bucket in which to find the source object.",
          type: "string",
          required: true,
        },
        sourceObject: {
          name: "Source Object",
          description:
            "Name of the source object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding).",
          type: "string",
          required: true,
        },
        destinationKmsKeyName: {
          name: "Destination KMS Key Name",
          description:
            "Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.",
          type: "string",
          required: false,
        },
        destinationPredefinedAcl: {
          name: "Destination Predefined ACL",
          description:
            "Apply a predefined set of access controls to the destination object. Valid values: authenticatedRead, bucketOwnerFullControl, bucketOwnerRead, private, projectPrivate, publicRead",
          type: "string",
          required: false,
        },
        ifGenerationMatch: {
          name: "If Generation Match",
          description:
            "Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.",
          type: "string",
          required: false,
        },
        ifGenerationNotMatch: {
          name: "If Generation Not Match",
          description:
            "Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.",
          type: "string",
          required: false,
        },
        ifMetagenerationMatch: {
          name: "If Metageneration Match",
          description:
            "Makes the operation conditional on whether the destination object's current metageneration matches the given value.",
          type: "string",
          required: false,
        },
        ifMetagenerationNotMatch: {
          name: "If Metageneration Not Match",
          description:
            "Makes the operation conditional on whether the destination object's current metageneration does not match the given value.",
          type: "string",
          required: false,
        },
        ifSourceGenerationMatch: {
          name: "If Source Generation Match",
          description:
            "Makes the operation conditional on whether the source object's current generation matches the given value.",
          type: "string",
          required: false,
        },
        ifSourceGenerationNotMatch: {
          name: "If Source Generation Not Match",
          description:
            "Makes the operation conditional on whether the source object's current generation does not match the given value.",
          type: "string",
          required: false,
        },
        ifSourceMetagenerationMatch: {
          name: "If Source Metageneration Match",
          description:
            "Makes the operation conditional on whether the source object's current metageneration matches the given value.",
          type: "string",
          required: false,
        },
        ifSourceMetagenerationNotMatch: {
          name: "If Source Metageneration Not Match",
          description:
            "Makes the operation conditional on whether the source object's current metageneration does not match the given value.",
          type: "string",
          required: false,
        },
        maxBytesRewrittenPerCall: {
          name: "Max Bytes Rewritten Per Call",
          description:
            "The maximum number of bytes that will be rewritten per rewrite request. Most callers shouldn't need to specify this parameter - it is primarily in place to support testing. If specified the value must be an integral multiple of 1 MiB (1048576). Also, this only applies to requests where the source and destination span locations and/or storage classes. Finally, this value must not change across rewrite calls else you'll get an error that the rewriteToken is invalid.",
          type: "string",
          required: false,
        },
        projection: {
          name: "Projection",
          description:
            "Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full. Valid values: full, noAcl",
          type: "string",
          required: false,
        },
        rewriteToken: {
          name: "Rewrite Token",
          description:
            "Include this field (from the previous rewrite response) on each rewrite request after the first one, until the rewrite response 'done' flag is true. Calls that provide a rewriteToken can omit all other request fields, but if included those fields must match the values provided in the first rewrite request.",
          type: "string",
          required: false,
        },
        sourceGeneration: {
          name: "Source Generation",
          description:
            "If present, selects a specific revision of the source object (as opposed to the latest version, the default).",
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
        acl: {
          name: "ACL",
          description: "Access controls on the object.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                bucket: {
                  type: "string",
                },
                domain: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                entity: {
                  type: "string",
                },
                entityId: {
                  type: "string",
                },
                etag: {
                  type: "string",
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
                object: {
                  type: "string",
                },
                projectTeam: {
                  type: "object",
                  properties: {
                    projectNumber: {
                      type: "object",
                      additionalProperties: true,
                    },
                    team: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
                role: {
                  type: "string",
                },
                selfLink: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        bucket: {
          name: "Bucket",
          description: "The name of the bucket containing this object.",
          type: "string",
          required: false,
        },
        cacheControl: {
          name: "Cache Control",
          description: "Cache-Control directive for the object data.",
          type: "string",
          required: false,
        },
        componentCount: {
          name: "Component Count",
          description:
            "Number of underlying components that make up this object.",
          type: "number",
          required: false,
        },
        contentDisposition: {
          name: "Content Disposition",
          description: "Content-Disposition of the object data.",
          type: "string",
          required: false,
        },
        contentEncoding: {
          name: "Content Encoding",
          description: "Content-Encoding of the object data.",
          type: "string",
          required: false,
        },
        contentLanguage: {
          name: "Content Language",
          description: "Content-Language of the object data.",
          type: "string",
          required: false,
        },
        contentType: {
          name: "Content Type",
          description: "Content-Type of the object data.",
          type: "string",
          required: false,
        },
        crc32c: {
          name: "Crc32c",
          description:
            "CRC32c checksum, as described in RFC 4960, Appendix B; encoded using base64 in big-endian byte order.",
          type: "string",
          required: false,
        },
        customTime: {
          name: "Custom Time",
          description:
            "A timestamp in RFC 3339 format specified by the user for an object.",
          type: "string",
          required: false,
        },
        customerEncryption: {
          name: "Customer Encryption",
          description:
            "Metadata of customer-supplied encryption key, if the object is encrypted by such a key.",
          type: {
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
          required: false,
        },
        etag: {
          name: "Etag",
          description: "HTTP 1.",
          type: "string",
          required: false,
        },
        eventBasedHold: {
          name: "Event Based Hold",
          description: "Whether an object is under event-based hold.",
          type: "boolean",
          required: false,
        },
        generation: {
          name: "Generation",
          description: "The content generation of this object.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description:
            "The ID of the object, including the bucket name, object name, and generation number.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "The kind of item this is.",
          type: "string",
          required: false,
        },
        kmsKeyName: {
          name: "KMS Key Name",
          description: "Not currently supported.",
          type: "string",
          required: false,
        },
        md5Hash: {
          name: "Md5 Hash",
          description: "MD5 hash of the data; encoded using base64.",
          type: "string",
          required: false,
        },
        mediaLink: {
          name: "Media Link",
          description: "Media download link.",
          type: "string",
          required: false,
        },
        metadata: {
          name: "Metadata",
          description: "User-provided metadata, in key/value pairs.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        contexts: {
          name: "Contexts",
          description: "User-defined or system-defined object contexts.",
          type: {
            type: "object",
            properties: {
              custom: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        restoreToken: {
          name: "Restore Token",
          description:
            "Restore token used to differentiate deleted objects with the same name and generation.",
          type: "string",
          required: false,
        },
        metageneration: {
          name: "Metageneration",
          description:
            "The version of the metadata for this object at this generation.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "The name of the object.",
          type: "string",
          required: false,
        },
        owner: {
          name: "Owner",
          description: "The owner of the object.",
          type: {
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
          required: false,
        },
        retentionExpirationTime: {
          name: "Retention Expiration Time",
          description:
            "A server-determined value that specifies the earliest time that the object's retention period expires.",
          type: "string",
          required: false,
        },
        retention: {
          name: "Retention",
          description: "A collection of object level retention parameters.",
          type: {
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
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "The link to this object.",
          type: "string",
          required: false,
        },
        size: {
          name: "Size",
          description: "Content-Length of the data in bytes.",
          type: "string",
          required: false,
        },
        storageClass: {
          name: "Storage Class",
          description: "Storage class of the object.",
          type: "string",
          required: false,
        },
        temporaryHold: {
          name: "Temporary Hold",
          description: "Whether an object is under temporary hold.",
          type: "boolean",
          required: false,
        },
        timeCreated: {
          name: "Time Created",
          description: "The creation time of the object in RFC 3339 format.",
          type: "string",
          required: false,
        },
        timeDeleted: {
          name: "Time Deleted",
          description:
            "The time at which the object became noncurrent in RFC 3339 format.",
          type: "string",
          required: false,
        },
        timeFinalized: {
          name: "Time Finalized",
          description: "The time when the object was finalized.",
          type: "string",
          required: false,
        },
        softDeleteTime: {
          name: "Soft Delete Time",
          description:
            "The time at which the object became soft-deleted in RFC 3339 format.",
          type: "string",
          required: false,
        },
        hardDeleteTime: {
          name: "Hard Delete Time",
          description:
            "This is the time (in the future) when the soft-deleted object will no longer be restorable.",
          type: "string",
          required: false,
        },
        timeStorageClassUpdated: {
          name: "Time Storage Class Updated",
          description:
            "The time at which the object's storage class was last changed.",
          type: "string",
          required: false,
        },
        updated: {
          name: "Updated",
          description:
            "The modification time of the object metadata in RFC 3339 format.",
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
        let path = `b/{sourceBucket}/o/{sourceObject}/rewriteTo/b/{destinationBucket}/o/{destinationObject}`;

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

        if (input.event.inputConfig.acl !== undefined)
          requestBody.acl = input.event.inputConfig.acl;
        if (input.event.inputConfig.bucket !== undefined)
          requestBody.bucket = input.event.inputConfig.bucket;
        if (input.event.inputConfig.cacheControl !== undefined)
          requestBody.cacheControl = input.event.inputConfig.cacheControl;
        if (input.event.inputConfig.componentCount !== undefined)
          requestBody.componentCount = input.event.inputConfig.componentCount;
        if (input.event.inputConfig.contentDisposition !== undefined)
          requestBody.contentDisposition =
            input.event.inputConfig.contentDisposition;
        if (input.event.inputConfig.contentEncoding !== undefined)
          requestBody.contentEncoding = input.event.inputConfig.contentEncoding;
        if (input.event.inputConfig.contentLanguage !== undefined)
          requestBody.contentLanguage = input.event.inputConfig.contentLanguage;
        if (input.event.inputConfig.contentType !== undefined)
          requestBody.contentType = input.event.inputConfig.contentType;
        if (input.event.inputConfig.crc32c !== undefined)
          requestBody.crc32c = input.event.inputConfig.crc32c;
        if (input.event.inputConfig.customTime !== undefined)
          requestBody.customTime = input.event.inputConfig.customTime;
        if (input.event.inputConfig.customerEncryption !== undefined)
          requestBody.customerEncryption =
            input.event.inputConfig.customerEncryption;
        if (input.event.inputConfig.etag !== undefined)
          requestBody.etag = input.event.inputConfig.etag;
        if (input.event.inputConfig.eventBasedHold !== undefined)
          requestBody.eventBasedHold = input.event.inputConfig.eventBasedHold;
        if (input.event.inputConfig.generation !== undefined)
          requestBody.generation = input.event.inputConfig.generation;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.kmsKeyName !== undefined)
          requestBody.kmsKeyName = input.event.inputConfig.kmsKeyName;
        if (input.event.inputConfig.md5Hash !== undefined)
          requestBody.md5Hash = input.event.inputConfig.md5Hash;
        if (input.event.inputConfig.mediaLink !== undefined)
          requestBody.mediaLink = input.event.inputConfig.mediaLink;
        if (input.event.inputConfig.metadata !== undefined)
          requestBody.metadata = input.event.inputConfig.metadata;
        if (input.event.inputConfig.contexts !== undefined)
          requestBody.contexts = input.event.inputConfig.contexts;
        if (input.event.inputConfig.restoreToken !== undefined)
          requestBody.restoreToken = input.event.inputConfig.restoreToken;
        if (input.event.inputConfig.metageneration !== undefined)
          requestBody.metageneration = input.event.inputConfig.metageneration;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.owner !== undefined)
          requestBody.owner = input.event.inputConfig.owner;
        if (input.event.inputConfig.retentionExpirationTime !== undefined)
          requestBody.retentionExpirationTime =
            input.event.inputConfig.retentionExpirationTime;
        if (input.event.inputConfig.retention !== undefined)
          requestBody.retention = input.event.inputConfig.retention;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.size !== undefined)
          requestBody.size = input.event.inputConfig.size;
        if (input.event.inputConfig.storageClass !== undefined)
          requestBody.storageClass = input.event.inputConfig.storageClass;
        if (input.event.inputConfig.temporaryHold !== undefined)
          requestBody.temporaryHold = input.event.inputConfig.temporaryHold;
        if (input.event.inputConfig.timeCreated !== undefined)
          requestBody.timeCreated = input.event.inputConfig.timeCreated;
        if (input.event.inputConfig.timeDeleted !== undefined)
          requestBody.timeDeleted = input.event.inputConfig.timeDeleted;
        if (input.event.inputConfig.timeFinalized !== undefined)
          requestBody.timeFinalized = input.event.inputConfig.timeFinalized;
        if (input.event.inputConfig.softDeleteTime !== undefined)
          requestBody.softDeleteTime = input.event.inputConfig.softDeleteTime;
        if (input.event.inputConfig.hardDeleteTime !== undefined)
          requestBody.hardDeleteTime = input.event.inputConfig.hardDeleteTime;
        if (input.event.inputConfig.timeStorageClassUpdated !== undefined)
          requestBody.timeStorageClassUpdated =
            input.event.inputConfig.timeStorageClassUpdated;
        if (input.event.inputConfig.updated !== undefined)
          requestBody.updated = input.event.inputConfig.updated;

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
          kind: {
            type: "string",
          },
          objectSize: {
            type: "string",
          },
          resource: {
            type: "object",
            properties: {
              acl: {
                type: "array",
                items: {
                  type: "object",
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
                    type: "object",
                    additionalProperties: true,
                  },
                  keySha256: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                  entityId: {
                    type: "object",
                    additionalProperties: true,
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
                    type: "object",
                    additionalProperties: true,
                  },
                  mode: {
                    type: "object",
                    additionalProperties: true,
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
          rewriteToken: {
            type: "string",
          },
          totalBytesRewritten: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default objectsRewrite;
