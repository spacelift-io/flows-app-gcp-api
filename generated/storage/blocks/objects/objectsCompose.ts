import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const objectsCompose: AppBlock = {
  name: "Objects - Compose",
  description: `Concatenates a list of existing objects into a new object in the same bucket.`,
  category: "Objects",
  inputs: {
    default: {
      config: {
        destinationBucket: {
          name: "Destination Bucket",
          description:
            "Name of the bucket containing the source objects. The destination object is stored in this bucket.",
          type: "string",
          required: true,
        },
        destinationObject: {
          name: "Destination Object",
          description:
            "Name of the new object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding).",
          type: "string",
          required: true,
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
        ifMetagenerationMatch: {
          name: "If Metageneration Match",
          description:
            "Makes the operation conditional on whether the object's current metageneration matches the given value.",
          type: "string",
          required: false,
        },
        kmsKeyName: {
          name: "KMS Key Name",
          description:
            "Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.",
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
        destination: {
          name: "Destination",
          description: "Properties of the resulting object.",
          type: {
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
          required: false,
        },
        kind: {
          name: "Kind",
          description: "The kind of item this is.",
          type: "string",
          required: false,
        },
        sourceObjects: {
          name: "Source Objects",
          description:
            "The list of source objects that will be concatenated into a single object.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                generation: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                objectPreconditions: {
                  type: "object",
                  properties: {
                    ifGenerationMatch: {
                      type: "string",
                    },
                  },
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
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
        let path = `b/{destinationBucket}/o/{destinationObject}/compose`;

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

        if (input.event.inputConfig.destination !== undefined)
          requestBody.destination = input.event.inputConfig.destination;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.sourceObjects !== undefined)
          requestBody.sourceObjects = input.event.inputConfig.sourceObjects;

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

export default objectsCompose;
