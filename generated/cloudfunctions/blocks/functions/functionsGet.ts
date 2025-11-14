import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const functionsGet: AppBlock = {
  name: "Functions - Get",
  description: `Returns a function with the given name from the requested project.`,
  category: "Functions",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The name of the function which details should be obtained.",
          type: "string",
          required: true,
        },
        revision: {
          name: "Revision",
          description:
            "Optional. The optional version of the 1st gen function whose details should be obtained. The version of a 1st gen function is an integer that starts from 1 and gets incremented on redeployments. GCF may keep historical configs for old versions of 1st gen function. This field can be specified to fetch the historical configs. This field is valid only for GCF 1st gen function.",
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
        let path = `v2/{+name}`;

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
          name: {
            type: "string",
          },
          description: {
            type: "string",
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
                additionalProperties: true,
              },
              sourceProvenance: {
                type: "object",
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
          serviceConfig: {
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
          eventTrigger: {
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
          state: {
            type: "string",
            enum: [
              "STATE_UNSPECIFIED",
              "ACTIVE",
              "FAILED",
              "DEPLOYING",
              "DELETING",
              "UNKNOWN",
              "DETACHING",
              "DETACH_FAILED",
            ],
          },
          updateTime: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          stateMessages: {
            type: "array",
            items: {
              type: "object",
              properties: {
                severity: {
                  type: "object",
                  additionalProperties: true,
                },
                type: {
                  type: "object",
                  additionalProperties: true,
                },
                message: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          environment: {
            type: "string",
            enum: ["ENVIRONMENT_UNSPECIFIED", "GEN_1", "GEN_2"],
          },
          upgradeInfo: {
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
                additionalProperties: true,
              },
              eventTrigger: {
                type: "object",
                additionalProperties: true,
              },
              buildConfig: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          url: {
            type: "string",
          },
          kmsKeyName: {
            type: "string",
          },
          satisfiesPzs: {
            type: "boolean",
          },
          createTime: {
            type: "string",
          },
          satisfiesPzi: {
            type: "boolean",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default functionsGet;
