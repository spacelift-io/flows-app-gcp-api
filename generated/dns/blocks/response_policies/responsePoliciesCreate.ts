import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const responsePoliciesCreate: AppBlock = {
  name: "Response Policies - Create",
  description: `Creates a new Response Policy`,
  category: "Response Policies",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Identifies the project addressed by this request.",
          type: "string",
          required: true,
        },
        clientOperationId: {
          name: "ClientOperationId",
          description:
            "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "A Response Policy is a collection of selectors that apply to queries made against one or more Virtual Private Cloud networks.",
          type: {
            type: "object",
            properties: {
              gkeClusters: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    kind: {
                      type: "object",
                      additionalProperties: true,
                    },
                    gkeClusterName: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              responsePolicyName: {
                type: "string",
              },
              id: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              labels: {
                type: "object",
                additionalProperties: true,
              },
              networks: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    kind: {
                      type: "object",
                      additionalProperties: true,
                    },
                    networkUrl: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              description: {
                type: "string",
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
            "https://www.googleapis.com/auth/ndev.clouddns.readwrite",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://dns.googleapis.com/";
        const path = `dns/v1/projects/{project}/responsePolicies`;
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
          gkeClusters: {
            type: "array",
            items: {
              type: "object",
              properties: {
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                gkeClusterName: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          responsePolicyName: {
            type: "string",
          },
          id: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          networks: {
            type: "array",
            items: {
              type: "object",
              properties: {
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                networkUrl: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
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

export default responsePoliciesCreate;
