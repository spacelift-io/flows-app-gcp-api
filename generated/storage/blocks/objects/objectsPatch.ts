import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const objectsPatch: AppBlock = {
  name: "Objects - Patch",
  description: `Patches an object's metadata.`,
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
          description:
            "If present, selects a specific revision of this object (as opposed to the latest version, the default).",
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
            "Makes the operation conditional on whether the object's current metageneration matches the given value.",
          type: "string",
          required: false,
        },
        ifMetagenerationNotMatch: {
          name: "IfMetagenerationNotMatch",
          description:
            "Makes the operation conditional on whether the object's current metageneration does not match the given value.",
          type: "string",
          required: false,
        },
        overrideUnlockedRetention: {
          name: "OverrideUnlockedRetention",
          description:
            "Must be true to remove the retention configuration, reduce its unlocked retention period, or change its mode from unlocked to locked.",
          type: "boolean",
          required: false,
        },
        object: {
          name: "Object",
          description:
            "Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding).",
          type: "string",
          required: true,
        },
        predefinedAcl: {
          name: "PredefinedAcl",
          description:
            "Apply a predefined set of access controls to this object. Valid values: authenticatedRead, bucketOwnerFullControl, bucketOwnerRead, private, projectPrivate, publicRead",
          type: "string",
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
          name: "UserProject",
          description:
            "The project to be billed for this request, for Requester Pays buckets.",
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
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        const path = `b/{bucket}/o/{object}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
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

export default objectsPatch;
