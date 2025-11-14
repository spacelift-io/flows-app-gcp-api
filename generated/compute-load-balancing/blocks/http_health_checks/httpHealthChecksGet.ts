import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const httpHealthChecksGet: AppBlock = {
  name: "Http Health Checks - Get",
  description: `Returns the specified HttpHealthCheck resource.`,
  category: "Http Health Checks",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        httpHealthCheck: {
          name: "HttpHealthCheck",
          description: "Name of the HttpHealthCheck resource to return.",
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
        const path = `projects/{project}/global/httpHealthChecks/{httpHealthCheck}`;
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
          selfLink: {
            type: "string",
          },
          name: {
            type: "string",
          },
          port: {
            type: "number",
          },
          checkIntervalSec: {
            type: "number",
          },
          host: {
            type: "string",
          },
          id: {
            type: "string",
          },
          requestPath: {
            type: "string",
          },
          unhealthyThreshold: {
            type: "number",
          },
          creationTimestamp: {
            type: "string",
          },
          healthyThreshold: {
            type: "number",
          },
          timeoutSec: {
            type: "number",
          },
          kind: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default httpHealthChecksGet;
