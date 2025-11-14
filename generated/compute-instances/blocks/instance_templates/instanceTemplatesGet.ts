import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instanceTemplatesGet: AppBlock = {
  name: "Instance Templates - Get",
  description: `Returns the specified instance template.`,
  category: "Instance Templates",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        instanceTemplate: {
          name: "InstanceTemplate",
          description: "The name of the instance template.",
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
        const path = `projects/{project}/global/instanceTemplates/{instanceTemplate}`;
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
          sourceInstanceParams: {
            type: "object",
            properties: {
              diskConfigs: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          selfLink: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              networkInterfaces: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              canIpForward: {
                type: "boolean",
              },
              networkPerformanceConfig: {
                type: "object",
                additionalProperties: true,
              },
              labels: {
                type: "object",
                additionalProperties: true,
              },
              description: {
                type: "string",
              },
              privateIpv6GoogleAccess: {
                type: "string",
                enum: [
                  "ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE",
                  "ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE",
                  "INHERIT_FROM_SUBNETWORK",
                ],
              },
              guestAccelerators: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              serviceAccounts: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              machineType: {
                type: "string",
              },
              resourcePolicies: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              disks: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              confidentialInstanceConfig: {
                type: "object",
                additionalProperties: true,
              },
              advancedMachineFeatures: {
                type: "object",
                additionalProperties: true,
              },
              resourceManagerTags: {
                type: "object",
                additionalProperties: true,
              },
              keyRevocationActionType: {
                type: "string",
                enum: [
                  "KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED",
                  "NONE",
                  "STOP",
                ],
              },
              reservationAffinity: {
                type: "object",
                additionalProperties: true,
              },
              metadata: {
                type: "object",
                additionalProperties: true,
              },
              shieldedInstanceConfig: {
                type: "object",
                additionalProperties: true,
              },
              minCpuPlatform: {
                type: "string",
              },
              scheduling: {
                type: "object",
                additionalProperties: true,
              },
              tags: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          region: {
            type: "string",
          },
          id: {
            type: "string",
          },
          sourceInstance: {
            type: "string",
          },
          description: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          name: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default instanceTemplatesGet;
