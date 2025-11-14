import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const changesGet: AppBlock = {
  name: "Changes - Get",
  description: `Fetches the representation of an existing Change.`,
  category: "Changes",
  inputs: {
    default: {
      config: {
        changeId: {
          name: "ChangeId",
          description:
            "The identifier of the requested change, from a previous ResourceRecordSetsChangeResponse.",
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
      },
      onEvent: async (input) => {
        // Parse service account credentials
        const credentials = JSON.parse(input.app.config.serviceAccountKey);

        // Initialize Google Auth
        const auth = new GoogleAuth({
          credentials,
          scopes: [
            "https://www.googleapis.com/auth/cloud-platform",
            "https://www.googleapis.com/auth/cloud-platform.read-only",
            "https://www.googleapis.com/auth/ndev.clouddns.readonly",
            "https://www.googleapis.com/auth/ndev.clouddns.readwrite",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://dns.googleapis.com/";
        const path = `dns/v1/projects/{project}/managedZones/{managedZone}/changes/{changeId}`;
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

export default changesGet;
