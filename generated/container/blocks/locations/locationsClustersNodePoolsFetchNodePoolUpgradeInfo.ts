import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsClustersNodePoolsFetchNodePoolUpgradeInfo: AppBlock = {
  name: "Locations - Fetch Node Pool Upgrade Info",
  description: `Fetch upgrade information of a specific nodepool.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The name (project, location, cluster, nodepool) of the nodepool to get. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*` or `projects/*/zones/*/clusters/*/nodePools/*`.",
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
        const baseUrl = "https://container.googleapis.com/";
        const path = `v1/{+name}:fetchNodePoolUpgradeInfo`;
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
          endOfStandardSupportTimestamp: {
            type: "string",
          },
          patchTargetVersion: {
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
                "SYSTEM_CONFIG",
              ],
            },
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
          minorTargetVersion: {
            type: "string",
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

export default locationsClustersNodePoolsFetchNodePoolUpgradeInfo;
