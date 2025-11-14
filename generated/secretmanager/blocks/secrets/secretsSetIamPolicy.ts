import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const secretsSetIamPolicy: AppBlock = {
  name: "Secrets - Set Iam Policy",
  description: `Sets the access control policy on the specified secret.`,
  category: "Secrets",
  inputs: {
    default: {
      config: {
        resource: {
          name: "Resource",
          description:
            "REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "Request message for `SetIamPolicy` method.",
          type: {
            type: "object",
            properties: {
              updateMask: {
                type: "string",
              },
              policy: {
                type: "object",
                properties: {
                  bindings: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  version: {
                    type: "number",
                  },
                  etag: {
                    type: "string",
                  },
                  auditConfigs: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
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
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://secretmanager.googleapis.com/";
        const path = `v1/{+resource}:setIamPolicy`;
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
          bindings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                members: {
                  type: "object",
                  additionalProperties: true,
                },
                role: {
                  type: "object",
                  additionalProperties: true,
                },
                condition: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          version: {
            type: "number",
          },
          etag: {
            type: "string",
          },
          auditConfigs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                service: {
                  type: "object",
                  additionalProperties: true,
                },
                auditLogConfigs: {
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

export default secretsSetIamPolicy;
