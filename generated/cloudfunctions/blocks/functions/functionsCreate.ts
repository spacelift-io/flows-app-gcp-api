import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const functionsCreate: AppBlock = {
  name: "Functions - Create",
  description: `Creates a new function.`,
  category: "Functions",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The project and location in which the function should be created, specified in the format `projects/*/locations/*`",
          type: "string",
          required: true,
        },
        functionId: {
          name: "Function ID",
          description:
            "The ID to use for the function, which will become the final component of the function's resource name. This value should be 4-63 characters, and valid characters are /a-z-/.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "A user-defined name of the function.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description: "User-provided description of a function.",
          type: "string",
          required: false,
        },
        buildConfig: {
          name: "Build Config",
          description:
            "Describes the Build step of the function that builds a container from the given source.",
          type: {
            type: "object",
            properties: {
              automaticUpdatePolicy: {
                type: "object",
                properties: {},
                additionalProperties: true,
              },
              onDeployUpdatePolicy: {
                type: "object",
                properties: {
                  runtimeVersion: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              build: {
                type: "string",
              },
              runtime: {
                type: "string",
              },
              entryPoint: {
                type: "string",
              },
              source: {
                type: "object",
                properties: {
                  storageSource: {
                    type: "object",
                    additionalProperties: true,
                  },
                  repoSource: {
                    type: "object",
                    additionalProperties: true,
                  },
                  gitUri: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              sourceProvenance: {
                type: "object",
                properties: {
                  resolvedStorageSource: {
                    type: "object",
                    additionalProperties: true,
                  },
                  resolvedRepoSource: {
                    type: "object",
                    additionalProperties: true,
                  },
                  gitUri: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              workerPool: {
                type: "string",
              },
              environmentVariables: {
                type: "object",
                additionalProperties: true,
              },
              dockerRegistry: {
                type: "string",
                enum: [
                  "DOCKER_REGISTRY_UNSPECIFIED",
                  "CONTAINER_REGISTRY",
                  "ARTIFACT_REGISTRY",
                ],
              },
              dockerRepository: {
                type: "string",
              },
              serviceAccount: {
                type: "string",
              },
              sourceToken: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        serviceConfig: {
          name: "Service Config",
          description: "Describes the Service being deployed.",
          type: {
            type: "object",
            properties: {
              service: {
                type: "string",
              },
              timeoutSeconds: {
                type: "number",
              },
              availableMemory: {
                type: "string",
              },
              availableCpu: {
                type: "string",
              },
              environmentVariables: {
                type: "object",
                additionalProperties: true,
              },
              maxInstanceCount: {
                type: "number",
              },
              minInstanceCount: {
                type: "number",
              },
              vpcConnector: {
                type: "string",
              },
              vpcConnectorEgressSettings: {
                type: "string",
                enum: [
                  "VPC_CONNECTOR_EGRESS_SETTINGS_UNSPECIFIED",
                  "PRIVATE_RANGES_ONLY",
                  "ALL_TRAFFIC",
                ],
              },
              ingressSettings: {
                type: "string",
                enum: [
                  "INGRESS_SETTINGS_UNSPECIFIED",
                  "ALLOW_ALL",
                  "ALLOW_INTERNAL_ONLY",
                  "ALLOW_INTERNAL_AND_GCLB",
                ],
              },
              uri: {
                type: "string",
              },
              serviceAccountEmail: {
                type: "string",
              },
              allTrafficOnLatestRevision: {
                type: "boolean",
              },
              secretEnvironmentVariables: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              secretVolumes: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              revision: {
                type: "string",
              },
              maxInstanceRequestConcurrency: {
                type: "number",
              },
              securityLevel: {
                type: "string",
                enum: [
                  "SECURITY_LEVEL_UNSPECIFIED",
                  "SECURE_ALWAYS",
                  "SECURE_OPTIONAL",
                ],
              },
              binaryAuthorizationPolicy: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        eventTrigger: {
          name: "Event Trigger",
          description:
            "An Eventarc trigger managed by Google Cloud Functions that fires events in response to a condition in another service.",
          type: {
            type: "object",
            properties: {
              trigger: {
                type: "string",
              },
              triggerRegion: {
                type: "string",
              },
              eventType: {
                type: "string",
              },
              eventFilters: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              pubsubTopic: {
                type: "string",
              },
              serviceAccountEmail: {
                type: "string",
              },
              retryPolicy: {
                type: "string",
                enum: [
                  "RETRY_POLICY_UNSPECIFIED",
                  "RETRY_POLICY_DO_NOT_RETRY",
                  "RETRY_POLICY_RETRY",
                ],
              },
              channel: {
                type: "string",
              },
              service: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        state: {
          name: "State",
          description: "Output only.",
          type: "string",
          required: false,
        },
        updateTime: {
          name: "Update Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        labels: {
          name: "Labels",
          description: "Labels associated with this Cloud Function.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        stateMessages: {
          name: "State Messages",
          description: "Output only.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                severity: {
                  type: "string",
                  enum: ["SEVERITY_UNSPECIFIED", "ERROR", "WARNING", "INFO"],
                },
                type: {
                  type: "string",
                },
                message: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        environment: {
          name: "Environment",
          description: "Describe whether the function is 1st Gen or 2nd Gen.",
          type: "string",
          required: false,
        },
        upgradeInfo: {
          name: "Upgrade Info",
          description: "Output only.",
          type: {
            type: "object",
            properties: {
              upgradeState: {
                type: "string",
                enum: [
                  "UPGRADE_STATE_UNSPECIFIED",
                  "ELIGIBLE_FOR_2ND_GEN_UPGRADE",
                  "INELIGIBLE_FOR_UPGRADE_UNTIL_REDEPLOYMENT",
                  "UPGRADE_OPERATION_IN_PROGRESS",
                  "SETUP_FUNCTION_UPGRADE_CONFIG_SUCCESSFUL",
                  "SETUP_FUNCTION_UPGRADE_CONFIG_ERROR",
                  "ABORT_FUNCTION_UPGRADE_ERROR",
                  "REDIRECT_FUNCTION_UPGRADE_TRAFFIC_SUCCESSFUL",
                  "REDIRECT_FUNCTION_UPGRADE_TRAFFIC_ERROR",
                  "ROLLBACK_FUNCTION_UPGRADE_TRAFFIC_ERROR",
                  "COMMIT_FUNCTION_UPGRADE_ERROR",
                  "COMMIT_FUNCTION_UPGRADE_ERROR_ROLLBACK_SAFE",
                ],
              },
              serviceConfig: {
                type: "object",
                properties: {
                  service: {
                    type: "object",
                    additionalProperties: true,
                  },
                  timeoutSeconds: {
                    type: "object",
                    additionalProperties: true,
                  },
                  availableMemory: {
                    type: "object",
                    additionalProperties: true,
                  },
                  availableCpu: {
                    type: "object",
                    additionalProperties: true,
                  },
                  environmentVariables: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxInstanceCount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  minInstanceCount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  vpcConnector: {
                    type: "object",
                    additionalProperties: true,
                  },
                  vpcConnectorEgressSettings: {
                    type: "object",
                    additionalProperties: true,
                  },
                  ingressSettings: {
                    type: "object",
                    additionalProperties: true,
                  },
                  uri: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serviceAccountEmail: {
                    type: "object",
                    additionalProperties: true,
                  },
                  allTrafficOnLatestRevision: {
                    type: "object",
                    additionalProperties: true,
                  },
                  secretEnvironmentVariables: {
                    type: "object",
                    additionalProperties: true,
                  },
                  secretVolumes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  revision: {
                    type: "object",
                    additionalProperties: true,
                  },
                  maxInstanceRequestConcurrency: {
                    type: "object",
                    additionalProperties: true,
                  },
                  securityLevel: {
                    type: "object",
                    additionalProperties: true,
                  },
                  binaryAuthorizationPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              eventTrigger: {
                type: "object",
                properties: {
                  trigger: {
                    type: "object",
                    additionalProperties: true,
                  },
                  triggerRegion: {
                    type: "object",
                    additionalProperties: true,
                  },
                  eventType: {
                    type: "object",
                    additionalProperties: true,
                  },
                  eventFilters: {
                    type: "object",
                    additionalProperties: true,
                  },
                  pubsubTopic: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serviceAccountEmail: {
                    type: "object",
                    additionalProperties: true,
                  },
                  retryPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  channel: {
                    type: "object",
                    additionalProperties: true,
                  },
                  service: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              buildConfig: {
                type: "object",
                properties: {
                  automaticUpdatePolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  onDeployUpdatePolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  build: {
                    type: "object",
                    additionalProperties: true,
                  },
                  runtime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  entryPoint: {
                    type: "object",
                    additionalProperties: true,
                  },
                  source: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sourceProvenance: {
                    type: "object",
                    additionalProperties: true,
                  },
                  workerPool: {
                    type: "object",
                    additionalProperties: true,
                  },
                  environmentVariables: {
                    type: "object",
                    additionalProperties: true,
                  },
                  dockerRegistry: {
                    type: "object",
                    additionalProperties: true,
                  },
                  dockerRepository: {
                    type: "object",
                    additionalProperties: true,
                  },
                  serviceAccount: {
                    type: "object",
                    additionalProperties: true,
                  },
                  sourceToken: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        url: {
          name: "URL",
          description: "Output only.",
          type: "string",
          required: false,
        },
        kmsKeyName: {
          name: "KMS Key Name",
          description:
            "Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt function resources.",
          type: "string",
          required: false,
        },
        satisfiesPzs: {
          name: "Satisfies Pzs",
          description: "Output only.",
          type: "boolean",
          required: false,
        },
        createTime: {
          name: "Create Time",
          description: "Output only.",
          type: "string",
          required: false,
        },
        satisfiesPzi: {
          name: "Satisfies Pzi",
          description: "Output only.",
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
            scopes: ["https://www.googleapis.com/auth/cloud-platform"],
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
        const baseUrl = "https://cloudfunctions.googleapis.com/";
        let path = `v2/{+parent}/functions`;

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

        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.buildConfig !== undefined)
          requestBody.buildConfig = input.event.inputConfig.buildConfig;
        if (input.event.inputConfig.serviceConfig !== undefined)
          requestBody.serviceConfig = input.event.inputConfig.serviceConfig;
        if (input.event.inputConfig.eventTrigger !== undefined)
          requestBody.eventTrigger = input.event.inputConfig.eventTrigger;
        if (input.event.inputConfig.state !== undefined)
          requestBody.state = input.event.inputConfig.state;
        if (input.event.inputConfig.updateTime !== undefined)
          requestBody.updateTime = input.event.inputConfig.updateTime;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.stateMessages !== undefined)
          requestBody.stateMessages = input.event.inputConfig.stateMessages;
        if (input.event.inputConfig.environment !== undefined)
          requestBody.environment = input.event.inputConfig.environment;
        if (input.event.inputConfig.upgradeInfo !== undefined)
          requestBody.upgradeInfo = input.event.inputConfig.upgradeInfo;
        if (input.event.inputConfig.url !== undefined)
          requestBody.url = input.event.inputConfig.url;
        if (input.event.inputConfig.kmsKeyName !== undefined)
          requestBody.kmsKeyName = input.event.inputConfig.kmsKeyName;
        if (input.event.inputConfig.satisfiesPzs !== undefined)
          requestBody.satisfiesPzs = input.event.inputConfig.satisfiesPzs;
        if (input.event.inputConfig.createTime !== undefined)
          requestBody.createTime = input.event.inputConfig.createTime;
        if (input.event.inputConfig.satisfiesPzi !== undefined)
          requestBody.satisfiesPzi = input.event.inputConfig.satisfiesPzi;

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
          name: {
            type: "string",
          },
          metadata: {
            type: "object",
            additionalProperties: true,
          },
          done: {
            type: "boolean",
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "number",
              },
              message: {
                type: "string",
              },
              details: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          response: {
            type: "object",
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default functionsCreate;
