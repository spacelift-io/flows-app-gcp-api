import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const responsePoliciesCreate: AppBlock = {
  name: "Response Policies - Create",
  description: `Creates a new Response Policy`,
  category: "Response Policies",
  inputs: {
    default: {
      config: {
        clientOperationId: {
          name: "Client Operation ID",
          description:
            "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
          type: "string",
          required: false,
        },
        gkeClusters: {
          name: "Gke Clusters",
          description:
            "The list of Google Kubernetes Engine clusters to which this response policy is applied.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                kind: {
                  type: "string",
                },
                gkeClusterName: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        responsePolicyName: {
          name: "Response Policy Name",
          description: "User assigned name for this Response Policy.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description:
            "Unique identifier for the resource; defined by the server (output only).",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "Request body field: kind",
          type: "string",
          required: false,
        },
        labels: {
          name: "Labels",
          description: "User labels.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        networks: {
          name: "Networks",
          description:
            "List of network names specifying networks to which this policy is applied.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                kind: {
                  type: "string",
                },
                networkUrl: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        description: {
          name: "Description",
          description: "User-provided description for this Response Policy.",
          type: "string",
          required: false,
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
              "https://www.googleapis.com/auth/ndev.clouddns.readwrite",
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
        const baseUrl = "https://dns.googleapis.com/";
        let path = `dns/v1/projects/{project}/responsePolicies`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.gkeClusters !== undefined)
          requestBody.gkeClusters = input.event.inputConfig.gkeClusters;
        if (input.event.inputConfig.responsePolicyName !== undefined)
          requestBody.responsePolicyName =
            input.event.inputConfig.responsePolicyName;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.networks !== undefined)
          requestBody.networks = input.event.inputConfig.networks;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;

        if (Object.keys(requestBody).length > 0) {
          requestOptions.body = JSON.stringify(requestBody);
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
