import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const targetHttpsProxiesGet: AppBlock = {
  name: "Target Https Proxies - Get",
  description: `Returns the specified TargetHttpsProxy resource.`,
  category: "Target Https Proxies",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        targetHttpsProxy: {
          name: "TargetHttpsProxy",
          description: "Name of the TargetHttpsProxy resource to return.",
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
        const path = `projects/{project}/global/targetHttpsProxies/{targetHttpsProxy}`;
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
          creationTimestamp: {
            type: "string",
          },
          sslPolicy: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          region: {
            type: "string",
          },
          tlsEarlyData: {
            type: "string",
            enum: ["DISABLED", "PERMISSIVE", "STRICT", "UNRESTRICTED"],
          },
          authorizationPolicy: {
            type: "string",
          },
          urlMap: {
            type: "string",
          },
          fingerprint: {
            type: "string",
          },
          httpKeepAliveTimeoutSec: {
            type: "number",
          },
          description: {
            type: "string",
          },
          sslCertificates: {
            type: "array",
            items: {
              type: "string",
            },
          },
          id: {
            type: "string",
          },
          proxyBind: {
            type: "boolean",
          },
          kind: {
            type: "string",
          },
          certificateMap: {
            type: "string",
          },
          name: {
            type: "string",
          },
          serverTlsPolicy: {
            type: "string",
          },
          quicOverride: {
            type: "string",
            enum: ["DISABLE", "ENABLE", "NONE"],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default targetHttpsProxiesGet;
