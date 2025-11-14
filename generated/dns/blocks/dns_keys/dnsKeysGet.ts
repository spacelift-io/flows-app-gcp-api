import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const dnsKeysGet: AppBlock = {
  name: "DNS Keys - Get",
  description: `Fetches the representation of an existing DnsKey.`,
  category: "DNS Keys",
  inputs: {
    default: {
      config: {
        dnsKeyId: {
          name: "DNS Key ID",
          description: "The identifier of the requested DnsKey.",
          type: "string",
          required: true,
        },
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
        digestType: {
          name: "Digest Type",
          description:
            "An optional comma-separated list of digest types to compute and display for key signing keys. If omitted, the recommended digest type is computed and displayed.",
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
        let path = `dns/v1/projects/{project}/managedZones/{managedZone}/dnsKeys/{dnsKeyId}`;

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
          id: {
            type: "string",
          },
          publicKey: {
            type: "string",
          },
          keyLength: {
            type: "number",
          },
          kind: {
            type: "string",
          },
          creationTime: {
            type: "string",
          },
          algorithm: {
            type: "string",
            enum: [
              "rsasha1",
              "rsasha256",
              "rsasha512",
              "ecdsap256sha256",
              "ecdsap384sha384",
            ],
          },
          description: {
            type: "string",
          },
          digests: {
            type: "array",
            items: {
              type: "object",
              properties: {
                digest: {
                  type: "object",
                  additionalProperties: true,
                },
                type: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          keyTag: {
            type: "number",
          },
          isActive: {
            type: "boolean",
          },
          type: {
            type: "string",
            enum: ["keySigning", "zoneSigning"],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default dnsKeysGet;
