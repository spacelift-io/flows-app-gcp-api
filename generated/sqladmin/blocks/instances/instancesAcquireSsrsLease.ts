import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesAcquireSsrsLease: AppBlock = {
  name: "Instances - Acquire Ssrs Lease",
  description: `Acquire a lease for the setup of SQL Server Reporting Services (SSRS).`,
  category: "Instances",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description:
            "Required. Project ID of the project that contains the instance (Example: project-id).",
          type: "string",
          required: true,
        },
        instance: {
          name: "Instance",
          description:
            "Required. Cloud SQL instance ID. This doesn't include the project ID. It's composed of lowercase letters, numbers, and hyphens, and it must start with a letter. The total length must be 98 characters or less (Example: instance-id).",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "Request to acquire a lease for SSRS.",
          type: {
            type: "object",
            properties: {
              acquireSsrsLeaseContext: {
                type: "object",
                properties: {
                  setupLogin: {
                    type: "string",
                  },
                  serviceLogin: {
                    type: "string",
                  },
                  reportDatabase: {
                    type: "string",
                  },
                  duration: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
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
            "https://www.googleapis.com/auth/sqlservice.admin",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://sqladmin.googleapis.com/";
        const path = `v1/projects/{project}/instances/{instance}/acquireSsrsLease`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        };

        // Add request body
        if (input.event.inputConfig.requestBody) {
          requestOptions.body = JSON.stringify(
            input.event.inputConfig.requestBody,
          );
        }

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
          operationId: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default instancesAcquireSsrsLease;
