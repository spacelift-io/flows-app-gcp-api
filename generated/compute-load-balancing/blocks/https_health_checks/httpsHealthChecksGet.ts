import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const httpsHealthChecksGet: AppBlock = {
  name: "HTTPS Health Checks - Get",
  description: `Returns the specified HttpsHealthCheck resource.`,
  category: "HTTPS Health Checks",
  inputs: {
    default: {
      config: {
        httpsHealthCheck: {
          name: "HTTPS Health Check",
          description: "Name of the HttpsHealthCheck resource to return.",
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
        let path = `projects/{project}/global/httpsHealthChecks/{httpsHealthCheck}`;

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
          selfLink: {
            type: "string",
          },
          port: {
            type: "number",
          },
          checkIntervalSec: {
            type: "number",
          },
          unhealthyThreshold: {
            type: "number",
          },
          creationTimestamp: {
            type: "string",
          },
          name: {
            type: "string",
          },
          requestPath: {
            type: "string",
          },
          description: {
            type: "string",
          },
          timeoutSec: {
            type: "number",
          },
          id: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          host: {
            type: "string",
          },
          healthyThreshold: {
            type: "number",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default httpsHealthChecksGet;
