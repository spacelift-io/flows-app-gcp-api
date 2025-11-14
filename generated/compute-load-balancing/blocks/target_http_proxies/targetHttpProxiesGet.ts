import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const targetHttpProxiesGet: AppBlock = {
  name: "Target Http Proxies - Get",
  description: `Returns the specified TargetHttpProxy resource.`,
  category: "Target Http Proxies",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        targetHttpProxy: {
          name: "TargetHttpProxy",
          description: "Name of the TargetHttpProxy resource to return.",
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
        const path = `projects/{project}/global/targetHttpProxies/{targetHttpProxy}`;
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
          description: {
            type: "string",
          },
          id: {
            type: "string",
          },
          fingerprint: {
            type: "string",
          },
          httpKeepAliveTimeoutSec: {
            type: "number",
          },
          name: {
            type: "string",
          },
          proxyBind: {
            type: "boolean",
          },
          creationTimestamp: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          region: {
            type: "string",
          },
          urlMap: {
            type: "string",
          },
          kind: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default targetHttpProxiesGet;
