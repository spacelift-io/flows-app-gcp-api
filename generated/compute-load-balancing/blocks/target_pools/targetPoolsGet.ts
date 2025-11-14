import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const targetPoolsGet: AppBlock = {
  name: "Target Pools - Get",
  description: `Returns the specified target pool.`,
  category: "Target Pools",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description: "Name of the region scoping this request.",
          type: "string",
          required: true,
        },
        targetPool: {
          name: "TargetPool",
          description: "Name of the TargetPool resource to return.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
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
        const path = `projects/{project}/regions/{region}/targetPools/{targetPool}`;
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
          kind: {
            type: "string",
          },
          securityPolicy: {
            type: "string",
          },
          instances: {
            type: "array",
            items: {
              type: "string",
            },
          },
          selfLink: {
            type: "string",
          },
          region: {
            type: "string",
          },
          id: {
            type: "string",
          },
          backupPool: {
            type: "string",
          },
          healthChecks: {
            type: "array",
            items: {
              type: "string",
            },
          },
          creationTimestamp: {
            type: "string",
          },
          description: {
            type: "string",
          },
          sessionAffinity: {
            type: "string",
            enum: [
              "CLIENT_IP",
              "CLIENT_IP_NO_DESTINATION",
              "CLIENT_IP_PORT_PROTO",
              "CLIENT_IP_PROTO",
              "GENERATED_COOKIE",
              "HEADER_FIELD",
              "HTTP_COOKIE",
              "NONE",
              "STRONG_COOKIE_AFFINITY",
            ],
          },
          name: {
            type: "string",
          },
          failoverRatio: {
            type: "number",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default targetPoolsGet;
