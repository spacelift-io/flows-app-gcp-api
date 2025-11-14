import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const bucketsPatch: AppBlock = {
  name: "Buckets - Patch",
  description: `Patches a bucket.`,
  category: "Buckets",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "Name of a bucket.",
          type: "string",
          required: true,
        },
        ifMetagenerationMatch: {
          name: "If Metageneration Match",
          description:
            "Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value.",
          type: "string",
          required: false,
        },
        ifMetagenerationNotMatch: {
          name: "If Metageneration Not Match",
          description:
            "Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value.",
          type: "string",
          required: false,
        },
        predefinedAcl: {
          name: "Predefined ACL",
          description:
            "Apply a predefined set of access controls to this bucket. Valid values: authenticatedRead, private, projectPrivate, publicRead, publicReadWrite",
          type: "string",
          required: false,
        },
        predefinedDefaultObjectAcl: {
          name: "Predefined Default Object ACL",
          description:
            "Apply a predefined set of default object access controls to this bucket. Valid values: authenticatedRead, bucketOwnerFullControl, bucketOwnerRead, private, projectPrivate, publicRead",
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
          name: "User Project",
          description:
            "The project to be billed for this request. Required for Requester Pays buckets.",
          type: "string",
          required: false,
        },
        acl: {
          name: "ACL",
          description: "Access controls on the bucket.",
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
                id: {
                  type: "string",
                },
                kind: {
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
        billing: {
          name: "Billing",
          description: "The bucket's billing configuration.",
          type: {
            type: "object",
            properties: {
              requesterPays: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        cors: {
          name: "Cors",
          description:
            "The bucket's Cross-Origin Resource Sharing (CORS) configuration.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                maxAgeSeconds: {
                  type: "number",
                },
                method: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                origin: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                responseHeader: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        customPlacementConfig: {
          name: "Custom Placement Config",
          description:
            "The bucket's custom placement configuration for Custom Dual Regions.",
          type: {
            type: "object",
            properties: {
              dataLocations: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        defaultEventBasedHold: {
          name: "Default Event Based Hold",
          description:
            "The default value for event-based hold on newly created objects in this bucket.",
          type: "boolean",
          required: false,
        },
        defaultObjectAcl: {
          name: "Default Object ACL",
          description:
            "Default access controls to apply to new objects when no ACL is provided.",
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
        encryption: {
          name: "Encryption",
          description: "Encryption configuration for a bucket.",
          type: {
            type: "object",
            properties: {
              defaultKmsKeyName: {
                type: "string",
              },
              googleManagedEncryptionEnforcementConfig: {
                type: "object",
                properties: {
                  restrictionMode: {
                    type: "string",
                    enum: ["NotRestricted", "FullyRestricted"],
                  },
                  effectiveTime: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              customerManagedEncryptionEnforcementConfig: {
                type: "object",
                properties: {
                  restrictionMode: {
                    type: "string",
                    enum: ["NotRestricted", "FullyRestricted"],
                  },
                  effectiveTime: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              customerSuppliedEncryptionEnforcementConfig: {
                type: "object",
                properties: {
                  restrictionMode: {
                    type: "string",
                    enum: ["NotRestricted", "FullyRestricted"],
                  },
                  effectiveTime: {
                    type: "string",
                  },
                },
                additionalProperties: true,
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
        hierarchicalNamespace: {
          name: "Hierarchical Namespace",
          description: "The bucket's hierarchical namespace configuration.",
          type: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        iamConfiguration: {
          name: "IAM Configuration",
          description: "The bucket's IAM configuration.",
          type: {
            type: "object",
            properties: {
              bucketPolicyOnly: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  lockedTime: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              uniformBucketLevelAccess: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  lockedTime: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              publicAccessPrevention: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        id: {
          name: "ID",
          description: "The ID of the bucket.",
          type: "string",
          required: false,
        },
        ipFilter: {
          name: "IP Filter",
          description: "The bucket's IP filter configuration.",
          type: {
            type: "object",
            properties: {
              mode: {
                type: "string",
              },
              publicNetworkSource: {
                type: "object",
                properties: {
                  allowedIpCidrRanges: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                additionalProperties: true,
              },
              vpcNetworkSources: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    network: {
                      type: "string",
                    },
                    allowedIpCidrRanges: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                  },
                  additionalProperties: true,
                },
              },
              allowCrossOrgVpcs: {
                type: "boolean",
              },
              allowAllServiceAgentAccess: {
                type: "boolean",
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
        labels: {
          name: "Labels",
          description: "User-provided labels, in key/value pairs.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        lifecycle: {
          name: "Lifecycle",
          description: "The bucket's lifecycle configuration.",
          type: {
            type: "object",
            properties: {
              rule: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    action: {
                      type: "object",
                      properties: {
                        storageClass: {
                          type: "object",
                          additionalProperties: true,
                        },
                        type: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                      additionalProperties: true,
                    },
                    condition: {
                      type: "object",
                      properties: {
                        age: {
                          type: "object",
                          additionalProperties: true,
                        },
                        createdBefore: {
                          type: "object",
                          additionalProperties: true,
                        },
                        customTimeBefore: {
                          type: "object",
                          additionalProperties: true,
                        },
                        daysSinceCustomTime: {
                          type: "object",
                          additionalProperties: true,
                        },
                        daysSinceNoncurrentTime: {
                          type: "object",
                          additionalProperties: true,
                        },
                        isLive: {
                          type: "object",
                          additionalProperties: true,
                        },
                        matchesPattern: {
                          type: "object",
                          additionalProperties: true,
                        },
                        matchesPrefix: {
                          type: "object",
                          additionalProperties: true,
                        },
                        matchesSuffix: {
                          type: "object",
                          additionalProperties: true,
                        },
                        matchesStorageClass: {
                          type: "object",
                          additionalProperties: true,
                        },
                        noncurrentTimeBefore: {
                          type: "object",
                          additionalProperties: true,
                        },
                        numNewerVersions: {
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
            additionalProperties: true,
          },
          required: false,
        },
        autoclass: {
          name: "Autoclass",
          description: "The bucket's Autoclass configuration.",
          type: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
              toggleTime: {
                type: "string",
              },
              terminalStorageClass: {
                type: "string",
              },
              terminalStorageClassUpdateTime: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        location: {
          name: "Location",
          description: "The location of the bucket.",
          type: "string",
          required: false,
        },
        locationType: {
          name: "Location Type",
          description: "The type of the bucket location.",
          type: "string",
          required: false,
        },
        logging: {
          name: "Logging",
          description:
            "The bucket's logging configuration, which defines the destination bucket and optional name prefix for the current bucket's logs.",
          type: {
            type: "object",
            properties: {
              logBucket: {
                type: "string",
              },
              logObjectPrefix: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        generation: {
          name: "Generation",
          description: "The generation of this bucket.",
          type: "string",
          required: false,
        },
        metageneration: {
          name: "Metageneration",
          description: "The metadata generation of this bucket.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "The name of the bucket.",
          type: "string",
          required: false,
        },
        owner: {
          name: "Owner",
          description: "The owner of the bucket.",
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
        projectNumber: {
          name: "Project Number",
          description:
            "The project number of the project the bucket belongs to.",
          type: "string",
          required: false,
        },
        retentionPolicy: {
          name: "Retention Policy",
          description: "The bucket's retention policy.",
          type: {
            type: "object",
            properties: {
              effectiveTime: {
                type: "string",
              },
              isLocked: {
                type: "boolean",
              },
              retentionPeriod: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        objectRetention: {
          name: "Object Retention",
          description: "The bucket's object retention config.",
          type: {
            type: "object",
            properties: {
              mode: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        rpo: {
          name: "Rpo",
          description: "The Recovery Point Objective (RPO) of this bucket.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "The URI of this bucket.",
          type: "string",
          required: false,
        },
        softDeletePolicy: {
          name: "Soft Delete Policy",
          description:
            "The bucket's soft delete policy, which defines the period of time that soft-deleted objects will be retained, and cannot be permanently deleted.",
          type: {
            type: "object",
            properties: {
              retentionDurationSeconds: {
                type: "string",
              },
              effectiveTime: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        storageClass: {
          name: "Storage Class",
          description:
            "The bucket's default storage class, used whenever no storageClass is specified for a newly-created object.",
          type: "string",
          required: false,
        },
        timeCreated: {
          name: "Time Created",
          description: "The creation time of the bucket in RFC 3339 format.",
          type: "string",
          required: false,
        },
        updated: {
          name: "Updated",
          description:
            "The modification time of the bucket in RFC 3339 format.",
          type: "string",
          required: false,
        },
        softDeleteTime: {
          name: "Soft Delete Time",
          description: "The soft delete time of the bucket in RFC 3339 format.",
          type: "string",
          required: false,
        },
        hardDeleteTime: {
          name: "Hard Delete Time",
          description: "The hard delete time of the bucket in RFC 3339 format.",
          type: "string",
          required: false,
        },
        versioning: {
          name: "Versioning",
          description: "The bucket's versioning configuration.",
          type: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        website: {
          name: "Website",
          description:
            "The bucket's website configuration, controlling how the service behaves when accessing bucket contents as a web site.",
          type: {
            type: "object",
            properties: {
              mainPageSuffix: {
                type: "string",
              },
              notFoundPage: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        satisfiesPZS: {
          name: "Satisfies Pzs",
          description: "Reserved for future use.",
          type: "boolean",
          required: false,
        },
        satisfiesPZI: {
          name: "Satisfies Pzi",
          description: "Reserved for future use.",
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
        let path = `b/{bucket}`;

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

        if (input.event.inputConfig.acl !== undefined)
          requestBody.acl = input.event.inputConfig.acl;
        if (input.event.inputConfig.billing !== undefined)
          requestBody.billing = input.event.inputConfig.billing;
        if (input.event.inputConfig.cors !== undefined)
          requestBody.cors = input.event.inputConfig.cors;
        if (input.event.inputConfig.customPlacementConfig !== undefined)
          requestBody.customPlacementConfig =
            input.event.inputConfig.customPlacementConfig;
        if (input.event.inputConfig.defaultEventBasedHold !== undefined)
          requestBody.defaultEventBasedHold =
            input.event.inputConfig.defaultEventBasedHold;
        if (input.event.inputConfig.defaultObjectAcl !== undefined)
          requestBody.defaultObjectAcl =
            input.event.inputConfig.defaultObjectAcl;
        if (input.event.inputConfig.encryption !== undefined)
          requestBody.encryption = input.event.inputConfig.encryption;
        if (input.event.inputConfig.etag !== undefined)
          requestBody.etag = input.event.inputConfig.etag;
        if (input.event.inputConfig.hierarchicalNamespace !== undefined)
          requestBody.hierarchicalNamespace =
            input.event.inputConfig.hierarchicalNamespace;
        if (input.event.inputConfig.iamConfiguration !== undefined)
          requestBody.iamConfiguration =
            input.event.inputConfig.iamConfiguration;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.ipFilter !== undefined)
          requestBody.ipFilter = input.event.inputConfig.ipFilter;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.lifecycle !== undefined)
          requestBody.lifecycle = input.event.inputConfig.lifecycle;
        if (input.event.inputConfig.autoclass !== undefined)
          requestBody.autoclass = input.event.inputConfig.autoclass;
        if (input.event.inputConfig.location !== undefined)
          requestBody.location = input.event.inputConfig.location;
        if (input.event.inputConfig.locationType !== undefined)
          requestBody.locationType = input.event.inputConfig.locationType;
        if (input.event.inputConfig.logging !== undefined)
          requestBody.logging = input.event.inputConfig.logging;
        if (input.event.inputConfig.generation !== undefined)
          requestBody.generation = input.event.inputConfig.generation;
        if (input.event.inputConfig.metageneration !== undefined)
          requestBody.metageneration = input.event.inputConfig.metageneration;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.owner !== undefined)
          requestBody.owner = input.event.inputConfig.owner;
        if (input.event.inputConfig.projectNumber !== undefined)
          requestBody.projectNumber = input.event.inputConfig.projectNumber;
        if (input.event.inputConfig.retentionPolicy !== undefined)
          requestBody.retentionPolicy = input.event.inputConfig.retentionPolicy;
        if (input.event.inputConfig.objectRetention !== undefined)
          requestBody.objectRetention = input.event.inputConfig.objectRetention;
        if (input.event.inputConfig.rpo !== undefined)
          requestBody.rpo = input.event.inputConfig.rpo;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.softDeletePolicy !== undefined)
          requestBody.softDeletePolicy =
            input.event.inputConfig.softDeletePolicy;
        if (input.event.inputConfig.storageClass !== undefined)
          requestBody.storageClass = input.event.inputConfig.storageClass;
        if (input.event.inputConfig.timeCreated !== undefined)
          requestBody.timeCreated = input.event.inputConfig.timeCreated;
        if (input.event.inputConfig.updated !== undefined)
          requestBody.updated = input.event.inputConfig.updated;
        if (input.event.inputConfig.softDeleteTime !== undefined)
          requestBody.softDeleteTime = input.event.inputConfig.softDeleteTime;
        if (input.event.inputConfig.hardDeleteTime !== undefined)
          requestBody.hardDeleteTime = input.event.inputConfig.hardDeleteTime;
        if (input.event.inputConfig.versioning !== undefined)
          requestBody.versioning = input.event.inputConfig.versioning;
        if (input.event.inputConfig.website !== undefined)
          requestBody.website = input.event.inputConfig.website;
        if (input.event.inputConfig.satisfiesPZS !== undefined)
          requestBody.satisfiesPZS = input.event.inputConfig.satisfiesPZS;
        if (input.event.inputConfig.satisfiesPZI !== undefined)
          requestBody.satisfiesPZI = input.event.inputConfig.satisfiesPZI;

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
                id: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
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
          billing: {
            type: "object",
            properties: {
              requesterPays: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          cors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                maxAgeSeconds: {
                  type: "number",
                },
                method: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                origin: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                responseHeader: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              additionalProperties: true,
            },
          },
          customPlacementConfig: {
            type: "object",
            properties: {
              dataLocations: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            additionalProperties: true,
          },
          defaultEventBasedHold: {
            type: "boolean",
          },
          defaultObjectAcl: {
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
          encryption: {
            type: "object",
            properties: {
              defaultKmsKeyName: {
                type: "string",
              },
              googleManagedEncryptionEnforcementConfig: {
                type: "object",
                properties: {
                  restrictionMode: {
                    type: "string",
                    enum: ["NotRestricted", "FullyRestricted"],
                  },
                  effectiveTime: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              customerManagedEncryptionEnforcementConfig: {
                type: "object",
                properties: {
                  restrictionMode: {
                    type: "string",
                    enum: ["NotRestricted", "FullyRestricted"],
                  },
                  effectiveTime: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              customerSuppliedEncryptionEnforcementConfig: {
                type: "object",
                properties: {
                  restrictionMode: {
                    type: "string",
                    enum: ["NotRestricted", "FullyRestricted"],
                  },
                  effectiveTime: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          etag: {
            type: "string",
          },
          hierarchicalNamespace: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          iamConfiguration: {
            type: "object",
            properties: {
              bucketPolicyOnly: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  lockedTime: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              uniformBucketLevelAccess: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  lockedTime: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              publicAccessPrevention: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          id: {
            type: "string",
          },
          ipFilter: {
            type: "object",
            properties: {
              mode: {
                type: "string",
              },
              publicNetworkSource: {
                type: "object",
                properties: {
                  allowedIpCidrRanges: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
                additionalProperties: true,
              },
              vpcNetworkSources: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    network: {
                      type: "object",
                      additionalProperties: true,
                    },
                    allowedIpCidrRanges: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              allowCrossOrgVpcs: {
                type: "boolean",
              },
              allowAllServiceAgentAccess: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          kind: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          lifecycle: {
            type: "object",
            properties: {
              rule: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    action: {
                      type: "object",
                      additionalProperties: true,
                    },
                    condition: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          autoclass: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
              toggleTime: {
                type: "string",
              },
              terminalStorageClass: {
                type: "string",
              },
              terminalStorageClassUpdateTime: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          location: {
            type: "string",
          },
          locationType: {
            type: "string",
          },
          logging: {
            type: "object",
            properties: {
              logBucket: {
                type: "string",
              },
              logObjectPrefix: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          generation: {
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
          projectNumber: {
            type: "string",
          },
          retentionPolicy: {
            type: "object",
            properties: {
              effectiveTime: {
                type: "string",
              },
              isLocked: {
                type: "boolean",
              },
              retentionPeriod: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          objectRetention: {
            type: "object",
            properties: {
              mode: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          rpo: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          softDeletePolicy: {
            type: "object",
            properties: {
              retentionDurationSeconds: {
                type: "string",
              },
              effectiveTime: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          storageClass: {
            type: "string",
          },
          timeCreated: {
            type: "string",
          },
          updated: {
            type: "string",
          },
          softDeleteTime: {
            type: "string",
          },
          hardDeleteTime: {
            type: "string",
          },
          versioning: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
          website: {
            type: "object",
            properties: {
              mainPageSuffix: {
                type: "string",
              },
              notFoundPage: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          satisfiesPZS: {
            type: "boolean",
          },
          satisfiesPZI: {
            type: "boolean",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default bucketsPatch;
