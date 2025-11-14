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
          name: "DestinationBucket",
          description:
            "Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.",
          type: "string",
          required: true,
        },
        destinationKmsKeyName: {
          name: "DestinationKmsKeyName",
          description:
            "Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.",
          type: "string",
          required: false,
        },
        destinationObject: {
          name: "DestinationObject",
          description:
            "Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding).",
          type: "string",
          required: true,
        },
        destinationPredefinedAcl: {
          name: "DestinationPredefinedAcl",
          description:
            "Apply a predefined set of access controls to the destination object. Valid values: authenticatedRead, bucketOwnerFullControl, bucketOwnerRead, private, projectPrivate, publicRead",
          type: "string",
          required: false,
        },
        ifGenerationMatch: {
          name: "IfGenerationMatch",
          description:
            "Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.",
          type: "string",
          required: false,
        },
        ifGenerationNotMatch: {
          name: "IfGenerationNotMatch",
          description:
            "Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.",
          type: "string",
          required: false,
        },
        ifMetagenerationMatch: {
          name: "IfMetagenerationMatch",
          description:
            "Makes the operation conditional on whether the destination object's current metageneration matches the given value.",
          type: "string",
          required: false,
        },
        ifMetagenerationNotMatch: {
          name: "IfMetagenerationNotMatch",
          description:
            "Makes the operation conditional on whether the destination object's current metageneration does not match the given value.",
          type: "string",
          required: false,
        },
        ifSourceGenerationMatch: {
          name: "IfSourceGenerationMatch",
          description:
            "Makes the operation conditional on whether the source object's current generation matches the given value.",
          type: "string",
          required: false,
        },
        ifSourceGenerationNotMatch: {
          name: "IfSourceGenerationNotMatch",
          description:
            "Makes the operation conditional on whether the source object's current generation does not match the given value.",
          type: "string",
          required: false,
        },
        ifSourceMetagenerationMatch: {
          name: "IfSourceMetagenerationMatch",
          description:
            "Makes the operation conditional on whether the source object's current metageneration matches the given value.",
          type: "string",
          required: false,
        },
        ifSourceMetagenerationNotMatch: {
          name: "IfSourceMetagenerationNotMatch",
          description:
            "Makes the operation conditional on whether the source object's current metageneration does not match the given value.",
          type: "string",
          required: false,
        },
        maxBytesRewrittenPerCall: {
          name: "MaxBytesRewrittenPerCall",
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
          name: "RewriteToken",
          description:
            "Include this field (from the previous rewrite response) on each rewrite request after the first one, until the rewrite response 'done' flag is true. Calls that provide a rewriteToken can omit all other request fields, but if included those fields must match the values provided in the first rewrite request.",
          type: "string",
          required: false,
        },
        sourceBucket: {
          name: "SourceBucket",
          description: "Name of the bucket in which to find the source object.",
          type: "string",
          required: true,
        },
        sourceGeneration: {
          name: "SourceGeneration",
          description:
            "If present, selects a specific revision of the source object (as opposed to the latest version, the default).",
          type: "string",
          required: false,
        },
        sourceObject: {
          name: "SourceObject",
          description:
            "Name of the source object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding).",
          type: "string",
          required: true,
        },
        userProject: {
          name: "UserProject",
          description:
            "The project to be billed for this request. Required for Requester Pays buckets.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description: "An object.",
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
            "https://www.googleapis.com/auth/devstorage.full_control",
            "https://www.googleapis.com/auth/devstorage.read_write",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        const path = `b/{sourceBucket}/o/{sourceObject}/rewriteTo/b/{destinationBucket}/o/{destinationObject}`;
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
