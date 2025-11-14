import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const managedZoneOperationsGet: AppBlock = {
  name: "Managed Zone Operations - Get",
  description: `Fetches the representation of an existing Operation.`,
  category: "Managed Zone Operations",
  inputs: {
    default: {
      config: {
        managedZone: {
          name: "Managed Zone",
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
        clientOperationId: {
          name: "Client Operation ID",
          description:
            "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
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
              "https://www.googleapis.com/auth/cloud-platform.read-only",
              "https://www.googleapis.com/auth/ndev.clouddns.readonly",
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
        let path = `dns/v1/projects/{project}/managedZones/{managedZone}/operations/{operation}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
