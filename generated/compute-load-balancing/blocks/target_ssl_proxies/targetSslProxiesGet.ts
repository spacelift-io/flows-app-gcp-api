import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const targetSslProxiesGet: AppBlock = {
  name: "Target Ssl Proxies - Get",
  description: `Returns the specified TargetSslProxy resource.`,
  category: "Target Ssl Proxies",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        targetSslProxy: {
          name: "TargetSslProxy",
          description: "Name of the TargetSslProxy resource to return.",
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
        const path = `projects/{project}/global/targetSslProxies/{targetSslProxy}`;
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
          proxyHeader: {
            type: "string",
            enum: ["NONE", "PROXY_V1"],
          },
          service: {
            type: "string",
          },
          sslCertificates: {
            type: "array",
            items: {
              type: "string",
            },
          },
          name: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          sslPolicy: {
            type: "string",
          },
          certificateMap: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          id: {
            type: "string",
          },
          description: {
            type: "string",
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

export default targetSslProxiesGet;
