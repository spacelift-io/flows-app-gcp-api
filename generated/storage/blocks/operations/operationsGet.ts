import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const operationsGet: AppBlock = {
  name: "Operations - Get",
  description: `Gets the latest state of a long-running operation.`,
  category: "Operations",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "The parent bucket of the operation resource.",
          type: "string",
          required: true,
        },
        operationId: {
          name: "OperationId",
          description: "The ID of the operation resource.",
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
            "https://www.googleapis.com/auth/cloud-platform.read-only",
            "https://www.googleapis.com/auth/devstorage.full_control",
            "https://www.googleapis.com/auth/devstorage.read_only",
            "https://www.googleapis.com/auth/devstorage.read_write",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        const path = `b/{bucket}/operations/{operationId}`;
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
          done: {
            type: "boolean",
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "number",
              },
              details: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              message: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          metadata: {
            type: "object",
            additionalProperties: true,
          },
          name: {
            type: "string",
          },
          response: {
            type: "object",
            additionalProperties: true,
          },
          selfLink: {
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

export default operationsGet;
