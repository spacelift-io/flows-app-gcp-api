import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const managedZonesCreate: AppBlock = {
  name: "Managed Zones - Create",
  description: `Creates a new ManagedZone.`,
  category: "Managed Zones",
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
            "A zone is a subtree of the DNS namespace under one administrative responsibility. A ManagedZone is a resource that represents a DNS zone hosted by the Cloud DNS service.",
          type: {
            type: "object",
            properties: {
              privateVisibilityConfig: {
                type: "object",
                properties: {
                  gkeClusters: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  kind: {
                    type: "string",
                  },
                  networks: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
                additionalProperties: true,
              },
              description: {
                type: "string",
              },
              dnssecConfig: {
                type: "object",
                properties: {
                  state: {
                    type: "string",
                    enum: ["off", "on", "transfer"],
                  },
                  defaultKeySpecs: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  kind: {
                    type: "string",
                  },
                  nonExistence: {
                    type: "string",
                    enum: ["nsec", "nsec3"],
                  },
                },
                additionalProperties: true,
              },
              cloudLoggingConfig: {
                type: "object",
                properties: {
                  enableLogging: {
                    type: "boolean",
                  },
                  kind: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              creationTime: {
                type: "string",
              },
              nameServers: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              dnsName: {
                type: "string",
              },
              serviceDirectoryConfig: {
                type: "object",
                properties: {
                  namespace: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kind: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              visibility: {
                type: "string",
                enum: ["public", "private"],
              },
              name: {
                type: "string",
              },
              id: {
                type: "string",
              },
              labels: {
                type: "object",
                additionalProperties: true,
              },
              reverseLookupConfig: {
                type: "object",
                properties: {
                  kind: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              nameServerSet: {
                type: "string",
              },
              peeringConfig: {
                type: "object",
                properties: {
                  targetNetwork: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kind: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              forwardingConfig: {
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
              kind: {
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
        const path = `dns/v1/projects/{project}/managedZones`;
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
          privateVisibilityConfig: {
            type: "object",
            properties: {
              gkeClusters: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              kind: {
                type: "string",
              },
              networks: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          description: {
            type: "string",
          },
          dnssecConfig: {
            type: "object",
            properties: {
              state: {
                type: "string",
                enum: ["off", "on", "transfer"],
              },
              defaultKeySpecs: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              kind: {
                type: "string",
              },
              nonExistence: {
                type: "string",
                enum: ["nsec", "nsec3"],
              },
            },
            additionalProperties: true,
          },
          cloudLoggingConfig: {
            type: "object",
            properties: {
              enableLogging: {
                type: "boolean",
              },
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          creationTime: {
            type: "string",
          },
          nameServers: {
            type: "array",
            items: {
              type: "string",
            },
          },
          dnsName: {
            type: "string",
          },
          serviceDirectoryConfig: {
            type: "object",
            properties: {
              namespace: {
                type: "object",
                additionalProperties: true,
              },
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          visibility: {
            type: "string",
            enum: ["public", "private"],
          },
          name: {
            type: "string",
          },
          id: {
            type: "string",
          },
          labels: {
            type: "object",
            additionalProperties: true,
          },
          reverseLookupConfig: {
            type: "object",
            properties: {
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          nameServerSet: {
            type: "string",
          },
          peeringConfig: {
            type: "object",
            properties: {
              targetNetwork: {
                type: "object",
                additionalProperties: true,
              },
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          forwardingConfig: {
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
          kind: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default managedZonesCreate;
