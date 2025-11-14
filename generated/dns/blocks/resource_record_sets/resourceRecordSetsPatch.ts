import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const resourceRecordSetsPatch: AppBlock = {
  name: "Resource Record Sets - Patch",
  description: `Applies a partial update to an existing ResourceRecordSet.`,
  category: "Resource Record Sets",
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
        name: {
          name: "Name",
          description: "For example, www.",
          type: "string",
          required: false,
        },
        type: {
          name: "Type",
          description: "The identifier of a supported record type.",
          type: "string",
          required: false,
        },
        clientOperationId: {
          name: "Client Operation ID",
          description:
            "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
          type: "string",
          required: false,
        },
        rrdatas: {
          name: "Rrdatas",
          description:
            "As defined in RFC 1035 (section 5) and RFC 1034 (section 3.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        ttl: {
          name: "Ttl",
          description:
            "Number of seconds that this 'ResourceRecordSet' can be cached by resolvers.",
          type: "number",
          required: false,
        },
        signatureRrdatas: {
          name: "Signature Rrdatas",
          description: "As defined in RFC 4034 (section 3.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        routingPolicy: {
          name: "Routing Policy",
          description:
            "Configures dynamic query responses based on either the geo location of the querying user or a weighted round robin based routing policy.",
          type: {
            type: "object",
            properties: {
              geo: {
                type: "object",
                properties: {
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableFencing: {
                    type: "object",
                    additionalProperties: true,
                  },
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              kind: {
                type: "string",
              },
              wrr: {
                type: "object",
                properties: {
                  items: {
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
              healthCheck: {
                type: "string",
              },
              primaryBackup: {
                type: "object",
                properties: {
                  primaryTargets: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                  backupGeoTargets: {
                    type: "object",
                    additionalProperties: true,
                  },
                  trickleTraffic: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
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
        let path = `dns/v1/projects/{project}/managedZones/{managedZone}/rrsets/{name}/{type}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.rrdatas !== undefined)
          requestBody.rrdatas = input.event.inputConfig.rrdatas;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.ttl !== undefined)
          requestBody.ttl = input.event.inputConfig.ttl;
        if (input.event.inputConfig.signatureRrdatas !== undefined)
          requestBody.signatureRrdatas =
            input.event.inputConfig.signatureRrdatas;
        if (input.event.inputConfig.routingPolicy !== undefined)
          requestBody.routingPolicy = input.event.inputConfig.routingPolicy;
        if (input.event.inputConfig.type !== undefined)
          requestBody.type = input.event.inputConfig.type;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;

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
          rrdatas: {
            type: "array",
            items: {
              type: "string",
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
              type: "string",
            },
          },
          routingPolicy: {
            type: "object",
            properties: {
              geo: {
                type: "object",
                additionalProperties: true,
              },
              kind: {
                type: "string",
              },
              wrr: {
                type: "object",
                additionalProperties: true,
              },
              healthCheck: {
                type: "string",
              },
              primaryBackup: {
                type: "object",
                additionalProperties: true,
              },
            },
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
  },
};

export default resourceRecordSetsPatch;
