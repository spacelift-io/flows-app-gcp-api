import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const clustersFetchClusterUpgradeInfo: AppBlock = {
  name: "Clusters - Fetch Cluster Upgrade Info",
  description: `Fetch upgrade information of a specific cluster.`,
  category: "Clusters",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The name (project, location, cluster) of the cluster to get. Specified in the format `projects/*/locations/*/clusters/*` or `projects/*/zones/*/clusters/*`.",
          type: "string",
          required: true,
        },
        version: {
          name: "Version",
          description: "API request version that initiates this operation.",
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
        const baseUrl = "https://container.googleapis.com/";
        let path = `v1/{+name}:fetchClusterUpgradeInfo`;

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
          minorTargetVersion: {
            type: "string",
          },
          pausedReason: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "AUTO_UPGRADE_PAUSED_REASON_UNSPECIFIED",
                "MAINTENANCE_WINDOW",
                "MAINTENANCE_EXCLUSION_NO_UPGRADES",
                "MAINTENANCE_EXCLUSION_NO_MINOR_UPGRADES",
                "CLUSTER_DISRUPTION_BUDGET",
                "CLUSTER_DISRUPTION_BUDGET_MINOR_UPGRADE",
                "SYSTEM_CONFIG",
              ],
            },
          },
          endOfStandardSupportTimestamp: {
            type: "string",
          },
          patchTargetVersion: {
            type: "string",
          },
          endOfExtendedSupportTimestamp: {
            type: "string",
          },
          upgradeDetails: {
            type: "array",
            items: {
              type: "object",
              properties: {
                targetVersion: {
                  type: "object",
                  additionalProperties: true,
                },
                initialVersion: {
                  type: "object",
                  additionalProperties: true,
                },
                startTime: {
                  type: "object",
                  additionalProperties: true,
                },
                endTime: {
                  type: "object",
                  additionalProperties: true,
                },
                state: {
                  type: "object",
                  additionalProperties: true,
                },
                startType: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          autoUpgradeStatus: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "UNKNOWN",
                "ACTIVE",
                "MINOR_UPGRADE_PAUSED",
                "UPGRADE_PAUSED",
              ],
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default clustersFetchClusterUpgradeInfo;
