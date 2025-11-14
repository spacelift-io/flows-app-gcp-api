import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const regionInstanceGroupManagersGet: AppBlock = {
  name: "Region Instance Group Managers - Get",
  description: `Returns all of the details about the specified managed instance group.`,
  category: "Region Instance Group Managers",
  inputs: {
    default: {
      config: {
        instanceGroupManager: {
          name: "InstanceGroupManager",
          description: "Name of the managed instance group to return.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        region: {
          name: "Region",
          description: "Name of the region scoping this request.",
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
          scopes: [
            "https://www.googleapis.com/auth/cloud-platform",
            "https://www.googleapis.com/auth/compute",
            "https://www.googleapis.com/auth/compute.readonly",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        const path = `projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}`;
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
          updatePolicy: {
            type: "object",
            properties: {
              maxSurge: {
                type: "object",
                additionalProperties: true,
              },
              maxUnavailable: {
                type: "object",
                additionalProperties: true,
              },
              replacementMethod: {
                type: "string",
                enum: ["RECREATE", "SUBSTITUTE"],
              },
              minimalAction: {
                type: "string",
                enum: ["NONE", "REFRESH", "REPLACE", "RESTART"],
              },
              mostDisruptiveAllowedAction: {
                type: "string",
                enum: ["NONE", "REFRESH", "REPLACE", "RESTART"],
              },
              type: {
                type: "string",
                enum: ["OPPORTUNISTIC", "PROACTIVE"],
              },
              instanceRedistributionType: {
                type: "string",
                enum: ["NONE", "PROACTIVE"],
              },
            },
            additionalProperties: true,
          },
          allInstancesConfig: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          instanceLifecyclePolicy: {
            type: "object",
            properties: {
              defaultActionOnFailure: {
                type: "string",
                enum: ["DO_NOTHING", "REPAIR"],
              },
              forceUpdateOnRepair: {
                type: "string",
                enum: ["NO", "YES"],
              },
            },
            additionalProperties: true,
          },
          kind: {
            type: "string",
          },
          description: {
            type: "string",
          },
          targetSize: {
            type: "number",
          },
          autoHealingPolicies: {
            type: "array",
            items: {
              type: "object",
              properties: {
                healthCheck: {
                  type: "object",
                  additionalProperties: true,
                },
                initialDelaySec: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          targetSuspendedSize: {
            type: "number",
          },
          region: {
            type: "string",
          },
          currentActions: {
            type: "object",
            properties: {
              deleting: {
                type: "number",
              },
              starting: {
                type: "number",
              },
              refreshing: {
                type: "number",
              },
              creating: {
                type: "number",
              },
              suspending: {
                type: "number",
              },
              stopping: {
                type: "number",
              },
              none: {
                type: "number",
              },
              verifying: {
                type: "number",
              },
              restarting: {
                type: "number",
              },
              resuming: {
                type: "number",
              },
              recreating: {
                type: "number",
              },
              abandoning: {
                type: "number",
              },
              creatingWithoutRetries: {
                type: "number",
              },
            },
            additionalProperties: true,
          },
          zone: {
            type: "string",
          },
          standbyPolicy: {
            type: "object",
            properties: {
              mode: {
                type: "string",
                enum: ["MANUAL", "SCALE_OUT_POOL"],
              },
              initialDelaySec: {
                type: "number",
              },
            },
            additionalProperties: true,
          },
          resourcePolicies: {
            type: "object",
            properties: {
              workloadPolicy: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          instanceFlexibilityPolicy: {
            type: "object",
            properties: {
              instanceSelections: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          baseInstanceName: {
            type: "string",
          },
          targetPools: {
            type: "array",
            items: {
              type: "string",
            },
          },
          statefulPolicy: {
            type: "object",
            properties: {
              preservedState: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          selfLink: {
            type: "string",
          },
          instanceGroup: {
            type: "string",
          },
          distributionPolicy: {
            type: "object",
            properties: {
              zones: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              targetShape: {
                type: "string",
                enum: ["ANY", "ANY_SINGLE_ZONE", "BALANCED", "EVEN"],
              },
            },
            additionalProperties: true,
          },
          instanceTemplate: {
            type: "string",
          },
          listManagedInstancesResults: {
            type: "string",
            enum: ["PAGELESS", "PAGINATED"],
          },
          status: {
            type: "object",
            properties: {
              isStable: {
                type: "boolean",
              },
              stateful: {
                type: "object",
                additionalProperties: true,
              },
              versionTarget: {
                type: "object",
                additionalProperties: true,
              },
              allInstancesConfig: {
                type: "object",
                additionalProperties: true,
              },
              autoscaler: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          satisfiesPzi: {
            type: "boolean",
          },
          satisfiesPzs: {
            type: "boolean",
          },
          targetStoppedSize: {
            type: "number",
          },
          name: {
            type: "string",
          },
          fingerprint: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          namedPorts: {
            type: "array",
            items: {
              type: "object",
              properties: {
                port: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          id: {
            type: "string",
          },
          versions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                instanceTemplate: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                targetSize: {
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
    },
  },
};

export default regionInstanceGroupManagersGet;
