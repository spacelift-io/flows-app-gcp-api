import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const subnetworksGetIamPolicy: AppBlock = {
  name: "Subnetworks - Get Iam Policy",
  description: `Gets the access control policy for a resource.`,
  category: "Subnetworks",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description: "The name of the region for this request.",
          type: "string",
          required: true,
        },
        resource: {
          name: "Resource",
          description: "Name or id of the resource for this request.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        optionsRequestedPolicyVersion: {
          name: "OptionsRequestedPolicyVersion",
          description: "Requested IAM Policy version.",
          type: "number",
          required: false,
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
        const path = `projects/{project}/regions/{region}/subnetworks/{resource}/getIamPolicy`;
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
          etag: {
            type: "string",
          },
          version: {
            type: "number",
          },
          auditConfigs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                auditLogConfigs: {
                  type: "object",
                  additionalProperties: true,
                },
                service: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          bindings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                members: {
                  type: "object",
                  additionalProperties: true,
                },
                condition: {
                  type: "object",
                  additionalProperties: true,
                },
                role: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default subnetworksGetIamPolicy;
