import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const resourcePoliciesGet: AppBlock = {
  name: "Resource Policies - Get",
  description: `Retrieves all information of the specified resource policy.`,
  category: "Resource Policies",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description: "Name of the region for this request.",
          type: "string",
          required: true,
        },
        resourcePolicy: {
          name: "Resource Policy",
          description: "Name of the resource policy to retrieve.",
          type: "string",
          required: true,
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
              "https://www.googleapis.com/auth/compute",
              "https://www.googleapis.com/auth/compute.readonly",
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
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        let path = `projects/{project}/regions/{region}/resourcePolicies/{resourcePolicy}`;

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
          groupPlacementPolicy: {
            type: "object",
            properties: {
              vmCount: {
                type: "number",
              },
              collocation: {
                type: "string",
                enum: ["COLLOCATED", "UNSPECIFIED_COLLOCATION"],
              },
              availabilityDomainCount: {
                type: "number",
              },
              gpuTopology: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          description: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          status: {
            type: "string",
            enum: ["CREATING", "DELETING", "EXPIRED", "INVALID", "READY"],
          },
          snapshotSchedulePolicy: {
            type: "object",
            properties: {
              snapshotProperties: {
                type: "object",
                additionalProperties: true,
              },
              retentionPolicy: {
                type: "object",
                additionalProperties: true,
              },
              schedule: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          name: {
            type: "string",
          },
          region: {
            type: "string",
          },
          id: {
            type: "string",
          },
          instanceSchedulePolicy: {
            type: "object",
            properties: {
              timeZone: {
                type: "string",
              },
              expirationTime: {
                type: "string",
              },
              startTime: {
                type: "string",
              },
              vmStopSchedule: {
                type: "object",
                additionalProperties: true,
              },
              vmStartSchedule: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          creationTimestamp: {
            type: "string",
          },
          diskConsistencyGroupPolicy: {
            type: "object",
            properties: {},
            additionalProperties: true,
          },
          workloadPolicy: {
            type: "object",
            properties: {
              acceleratorTopology: {
                type: "string",
              },
              type: {
                type: "string",
                enum: ["HIGH_AVAILABILITY", "HIGH_THROUGHPUT"],
              },
              maxTopologyDistance: {
                type: "string",
                enum: ["BLOCK", "CLUSTER", "SUBBLOCK"],
              },
            },
            additionalProperties: true,
          },
          resourceStatus: {
            type: "object",
            properties: {
              instanceSchedulePolicy: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          selfLink: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default resourcePoliciesGet;
