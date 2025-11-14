import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const changesCreate: AppBlock = {
  name: "Changes - Create",
  description: `Atomically updates the ResourceRecordSet collection.`,
  category: "Changes",
  inputs: {
    default: {
      config: {
        clientOperationId: {
          name: "ClientOperationId",
          description:
            "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
          type: "string",
          required: false,
        },
        managedZone: {
          name: "ManagedZone",
          description:
            "Identifies the managed zone addressed by this request. Can be the managed zone name or ID.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Identifies the project addressed by this request.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "A Change represents a set of `ResourceRecordSet` additions and deletions applied atomically to a ManagedZone. ResourceRecordSets within a ManagedZone are modified by creating a new Change element in the Changes collection. In turn the Changes collection also records the past modifications to the `ResourceRecordSets` in a `ManagedZone`. The current state of the `ManagedZone` is the sum effect of applying all `Change` elements in the `Changes` collection in sequence.",
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
        const path = `dns/v1/projects/{project}/managedZones/{managedZone}/changes`;
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
