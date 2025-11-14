import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const changesCreate: AppBlock = {
  name: "Changes - Create",
  description: `Atomically updates the ResourceRecordSet collection.`,
  category: "Changes",
  inputs: {
    default: {
      config: {
        managedZone: {
          name: "Managed Zone",
          description:
            "Identifies the managed zone addressed by this request. Can be the managed zone name or ID.",
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
        kind: {
          name: "Kind",
          description: "Request body field: kind",
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
        status: {
          name: "Status",
          description: "Status of the operation (output only).",
          type: "string",
          required: false,
        },
        additions: {
          name: "Additions",
          description: "Which ResourceRecordSets to add?",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                rrdatas: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                name: {
                  type: "string",
                },
                ttl: {
                  type: "number",
                },
                signatureRrdatas: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                routingPolicy: {
                  type: "object",
                  additionalProperties: true,
                },
                type: {
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
        startTime: {
          name: "Start Time",
          description:
            "The time that this operation was started by the server (output only).",
          type: "string",
          required: false,
        },
        isServing: {
          name: "Is Serving",
          description: "If the DNS queries for the zone will be served.",
          type: "boolean",
          required: false,
        },
        deletions: {
          name: "Deletions",
          description:
            "Which ResourceRecordSets to remove? Must match existing data exactly.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                rrdatas: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                name: {
                  type: "string",
                },
                ttl: {
                  type: "number",
                },
                signatureRrdatas: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                routingPolicy: {
                  type: "object",
                  additionalProperties: true,
                },
                type: {
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
        let path = `dns/v1/projects/{project}/managedZones/{managedZone}/changes`;

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

        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.status !== undefined)
          requestBody.status = input.event.inputConfig.status;
        if (input.event.inputConfig.additions !== undefined)
          requestBody.additions = input.event.inputConfig.additions;
        if (input.event.inputConfig.startTime !== undefined)
          requestBody.startTime = input.event.inputConfig.startTime;
        if (input.event.inputConfig.isServing !== undefined)
          requestBody.isServing = input.event.inputConfig.isServing;
        if (input.event.inputConfig.deletions !== undefined)
          requestBody.deletions = input.event.inputConfig.deletions;

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
          kind: {
            type: "string",
          },
          id: {
            type: "string",
          },
          status: {
            type: "string",
            enum: ["pending", "done"],
          },
          additions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                rrdatas: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                ttl: {
                  type: "object",
                  additionalProperties: true,
                },
                signatureRrdatas: {
                  type: "object",
                  additionalProperties: true,
                },
                routingPolicy: {
                  type: "object",
                  additionalProperties: true,
                },
                type: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          startTime: {
            type: "string",
          },
          isServing: {
            type: "boolean",
          },
          deletions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                rrdatas: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                ttl: {
                  type: "object",
                  additionalProperties: true,
                },
                signatureRrdatas: {
                  type: "object",
                  additionalProperties: true,
                },
                routingPolicy: {
                  type: "object",
                  additionalProperties: true,
                },
                type: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
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

export default changesCreate;
