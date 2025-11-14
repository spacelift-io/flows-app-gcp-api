import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const dnsKeysGet: AppBlock = {
  name: "Dns Keys - Get",
  description: `Fetches the representation of an existing DnsKey.`,
  category: "Dns Keys",
  inputs: {
    default: {
      config: {
        dnsKeyId: {
          name: "DnsKeyId",
          description: "The identifier of the requested DnsKey.",
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
        project: {
          name: "Project",
          description: "Identifies the project addressed by this request.",
          type: "string",
          required: true,
        },
        managedZone: {
          name: "ManagedZone",
          description:
            "Identifies the managed zone addressed by this request. Can be the managed zone name or ID.",
          type: "string",
          required: true,
        },
        digestType: {
          name: "DigestType",
          description:
            "An optional comma-separated list of digest types to compute and display for key signing keys. If omitted, the recommended digest type is computed and displayed.",
          type: "string",
          required: false,
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
        const path = `dns/v1/projects/{project}/managedZones/{managedZone}/dnsKeys/{dnsKeyId}`;
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
