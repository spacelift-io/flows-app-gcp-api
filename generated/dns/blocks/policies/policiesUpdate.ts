import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const policiesUpdate: AppBlock = {
  name: "Policies - Update",
  description: `Updates an existing policy.`,
  category: "Policies",
  inputs: {
    default: {
      config: {
        policy: {
          name: "Policy",
          description:
            "User given friendly name of the policy addressed by this request.",
          type: "string",
          required: true,
        },
        clientOperationId: {
          name: "Client Operation ID",
          description:
            "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
          type: "string",
          required: false,
        },
        enableInboundForwarding: {
          name: "Enable Inbound Forwarding",
          description:
            "Allows networks bound to this policy to receive DNS queries sent by VMs or applications over VPN connections.",
          type: "boolean",
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
                networkUrl: {
                  type: "string",
                },
                kind: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        dns64Config: {
          name: "Dns64 Config",
          description: "Configurations related to DNS64 for this policy.",
          type: {
            type: "object",
            properties: {
              scope: {
                type: "object",
                properties: {
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                  allQueries: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        kind: {
          name: "Kind",
          description: "Request body field: kind",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "User-assigned name for this policy.",
          type: "string",
          required: false,
        },
        alternativeNameServerConfig: {
          name: "Alternative Name Server Config",
          description:
            "Sets an alternative name server for the associated networks.",
          type: {
            type: "object",
            properties: {
              targetNameServers: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        description: {
          name: "Description",
          description:
            "A mutable string of at most 1024 characters associated with this resource for the user's convenience.",
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
        enableLogging: {
          name: "Enable Logging",
          description:
            "Controls whether logging is enabled for the networks bound to this policy.",
          type: "boolean",
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
        let path = `dns/v1/projects/{project}/policies/{policy}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.enableInboundForwarding !== undefined)
          requestBody.enableInboundForwarding =
            input.event.inputConfig.enableInboundForwarding;
        if (input.event.inputConfig.networks !== undefined)
          requestBody.networks = input.event.inputConfig.networks;
        if (input.event.inputConfig.dns64Config !== undefined)
          requestBody.dns64Config = input.event.inputConfig.dns64Config;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.alternativeNameServerConfig !== undefined)
          requestBody.alternativeNameServerConfig =
            input.event.inputConfig.alternativeNameServerConfig;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.enableLogging !== undefined)
          requestBody.enableLogging = input.event.inputConfig.enableLogging;

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
          policy: {
            type: "object",
            properties: {
              enableInboundForwarding: {
                type: "boolean",
              },
              networks: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              dns64Config: {
                type: "object",
                additionalProperties: true,
              },
              kind: {
                type: "string",
              },
              name: {
                type: "string",
              },
              alternativeNameServerConfig: {
                type: "object",
                additionalProperties: true,
              },
              description: {
                type: "string",
              },
              id: {
                type: "string",
              },
              enableLogging: {
                type: "boolean",
              },
            },
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default policiesUpdate;
