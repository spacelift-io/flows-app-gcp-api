import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const resourceRecordSetsPatch: AppBlock = {
  name: "Resource Record Sets - Patch",
  description: `Applies a partial update to an existing ResourceRecordSet.`,
  category: "Resource Record Sets",
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
        name: {
          name: "Name",
          description: "Fully qualified domain name.",
          type: "string",
          required: true,
        },
        type: {
          name: "Type",
          description: "RRSet type.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "A unit of data that is returned by the DNS servers.",
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
        const path = `dns/v1/projects/{project}/managedZones/{managedZone}/rrsets/{name}/{type}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
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
