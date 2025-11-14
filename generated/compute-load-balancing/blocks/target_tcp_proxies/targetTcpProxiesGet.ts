import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const targetTcpProxiesGet: AppBlock = {
  name: "Target Tcp Proxies - Get",
  description: `Returns the specified TargetTcpProxy resource.`,
  category: "Target Tcp Proxies",
  inputs: {
    default: {
      config: {
        targetTcpProxy: {
          name: "TargetTcpProxy",
          description: "Name of the TargetTcpProxy resource to return.",
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
        const path = `projects/{project}/global/targetTcpProxies/{targetTcpProxy}`;
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
          id: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          description: {
            type: "string",
          },
          region: {
            type: "string",
          },
          proxyHeader: {
            type: "string",
            enum: ["NONE", "PROXY_V1"],
          },
          creationTimestamp: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          service: {
            type: "string",
          },
          proxyBind: {
            type: "boolean",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default targetTcpProxiesGet;
