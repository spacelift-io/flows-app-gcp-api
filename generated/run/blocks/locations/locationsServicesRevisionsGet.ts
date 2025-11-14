import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsServicesRevisionsGet: AppBlock = {
  name: "Locations - Get",
  description: `Gets information about a Revision.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The full name of the Revision. Format: projects/{project}/locations/{location}/services/{service}/revisions/{revision}",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        // Parse service account credentials
        const credentials = JSON.parse(input.app.config.serviceAccountKey);

        // Initialize Google Auth
        const auth = new GoogleAuth({
          credentials,
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://run.googleapis.com/";
        const path = `v2/{+name}`;
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
          name: {
            type: "string",
          },
          uid: {
            type: "string",
          },
          generation: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          annotations: {
            type: "object",
            additionalProperties: true,
          },
          createTime: {
            type: "string",
          },
          updateTime: {
            type: "string",
          },
          deleteTime: {
            type: "string",
          },
          expireTime: {
            type: "string",
          },
          launchStage: {
            type: "string",
            enum: [
              "LAUNCH_STAGE_UNSPECIFIED",
              "UNIMPLEMENTED",
              "PRELAUNCH",
              "EARLY_ACCESS",
              "ALPHA",
              "BETA",
              "GA",
              "DEPRECATED",
            ],
          },
          service: {
            type: "string",
          },
          scaling: {
            type: "object",
            properties: {
              minInstanceCount: {
                type: "number",
              },
              maxInstanceCount: {
                type: "number",
              },
            },
            additionalProperties: true,
          },
          vpcAccess: {
            type: "object",
            properties: {
              connector: {
                type: "string",
              },
              egress: {
                type: "string",
                enum: [
                  "VPC_EGRESS_UNSPECIFIED",
                  "ALL_TRAFFIC",
                  "PRIVATE_RANGES_ONLY",
                ],
              },
              networkInterfaces: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          maxInstanceRequestConcurrency: {
            type: "number",
          },
          timeout: {
            type: "string",
          },
          serviceAccount: {
            type: "string",
          },
          containers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                image: {
                  type: "object",
                  additionalProperties: true,
                },
                sourceCode: {
                  type: "object",
                  additionalProperties: true,
                },
                command: {
                  type: "object",
                  additionalProperties: true,
                },
                args: {
                  type: "object",
                  additionalProperties: true,
                },
                env: {
                  type: "object",
                  additionalProperties: true,
                },
                resources: {
                  type: "object",
                  additionalProperties: true,
                },
                ports: {
                  type: "object",
                  additionalProperties: true,
                },
                volumeMounts: {
                  type: "object",
                  additionalProperties: true,
                },
                workingDir: {
                  type: "object",
                  additionalProperties: true,
                },
                livenessProbe: {
                  type: "object",
                  additionalProperties: true,
                },
                startupProbe: {
                  type: "object",
                  additionalProperties: true,
                },
                dependsOn: {
                  type: "object",
                  additionalProperties: true,
                },
                baseImageUri: {
                  type: "object",
                  additionalProperties: true,
                },
                buildInfo: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          volumes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                secret: {
                  type: "object",
                  additionalProperties: true,
                },
                cloudSqlInstance: {
                  type: "object",
                  additionalProperties: true,
                },
                emptyDir: {
                  type: "object",
                  additionalProperties: true,
                },
                nfs: {
                  type: "object",
                  additionalProperties: true,
                },
                gcs: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          executionEnvironment: {
            type: "string",
            enum: [
              "EXECUTION_ENVIRONMENT_UNSPECIFIED",
              "EXECUTION_ENVIRONMENT_GEN1",
              "EXECUTION_ENVIRONMENT_GEN2",
            ],
          },
          encryptionKey: {
            type: "string",
          },
          serviceMesh: {
            type: "object",
            properties: {
              mesh: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          encryptionKeyRevocationAction: {
            type: "string",
            enum: [
              "ENCRYPTION_KEY_REVOCATION_ACTION_UNSPECIFIED",
              "PREVENT_NEW",
              "SHUTDOWN",
            ],
          },
          encryptionKeyShutdownDuration: {
            type: "string",
          },
          reconciling: {
            type: "boolean",
          },
          conditions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: {
                  type: "object",
                  additionalProperties: true,
                },
                state: {
                  type: "object",
                  additionalProperties: true,
                },
                message: {
                  type: "object",
                  additionalProperties: true,
                },
                lastTransitionTime: {
                  type: "object",
                  additionalProperties: true,
                },
                severity: {
                  type: "object",
                  additionalProperties: true,
                },
                reason: {
                  type: "object",
                  additionalProperties: true,
                },
                revisionReason: {
                  type: "object",
                  additionalProperties: true,
                },
                executionReason: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          observedGeneration: {
            type: "string",
          },
          logUri: {
            type: "string",
          },
          satisfiesPzs: {
            type: "boolean",
          },
          sessionAffinity: {
            type: "boolean",
          },
          scalingStatus: {
            type: "object",
            properties: {
              desiredMinInstanceCount: {
                type: "number",
              },
            },
            additionalProperties: true,
          },
          nodeSelector: {
            type: "object",
            properties: {
              accelerator: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          gpuZonalRedundancyDisabled: {
            type: "boolean",
          },
          creator: {
            type: "string",
          },
          etag: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsServicesRevisionsGet;
