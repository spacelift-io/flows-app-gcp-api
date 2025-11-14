import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const managedZoneOperationsGet: AppBlock = {
  name: "Managed Zone Operations - Get",
  description: `Fetches the representation of an existing Operation.`,
  category: "Managed Zone Operations",
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
        project: {
          name: "Project",
          description: "Identifies the project addressed by this request.",
          type: "string",
          required: true,
        },
        managedZone: {
          name: "ManagedZone",
          description: "Identifies the managed zone addressed by this request.",
          type: "string",
          required: true,
        },
        operation: {
          name: "Operation",
          description:
            "Identifies the operation addressed by this request (ID of the operation).",
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
        const path = `dns/v1/projects/{project}/managedZones/{managedZone}/operations/{operation}`;
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
          dnsKeyContext: {
            type: "object",
            properties: {
              newValue: {
                type: "object",
                additionalProperties: true,
              },
              oldValue: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          zoneContext: {
            type: "object",
            properties: {
              oldValue: {
                type: "object",
                additionalProperties: true,
              },
              newValue: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          kind: {
            type: "string",
          },
          startTime: {
            type: "string",
          },
          type: {
            type: "string",
          },
          id: {
            type: "string",
          },
          user: {
            type: "string",
          },
          status: {
            type: "string",
            enum: ["pending", "done"],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default managedZoneOperationsGet;
