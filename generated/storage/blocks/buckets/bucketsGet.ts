import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const bucketsGet: AppBlock = {
  name: "Buckets - Get",
  description: `Returns metadata for the specified bucket.`,
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
        generation: {
          name: "Generation",
          description:
            "If present, specifies the generation of the bucket. This is required if softDeleted is true.",
          type: "string",
          required: false,
        },
        softDeleted: {
          name: "Soft Deleted",
          description:
            "If true, return the soft-deleted version of this bucket. The default is false. For more information, see [Soft Delete](https://cloud.google.com/storage/docs/soft-delete).",
          type: "boolean",
          required: false,
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
        projection: {
          name: "Projection",
          description:
            "Set of properties to return. Defaults to noAcl. Valid values: full, noAcl",
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
        let path = `b/{bucket}`;

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

export default bucketsGet;
