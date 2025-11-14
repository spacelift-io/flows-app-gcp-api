import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const dnsKeysList: AppBlock = {
  name: "Dns Keys - List",
  description: `Enumerates DnsKeys to a ResourceRecordSet collection.`,
  category: "Dns Keys",
  inputs: {
    default: {
      config: {
        maxResults: {
          name: "MaxResults",
          description:
            "Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return.",
          type: "number",
          required: false,
        },
        project: {
          name: "Project",
          description: "Identifies the project addressed by this request.",
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
        pageToken: {
          name: "PageToken",
          description:
            "Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request.",
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
        const path = `dns/v1/projects/{project}/managedZones/{managedZone}/dnsKeys`;
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
          dnsKeys: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "object",
                  additionalProperties: true,
                },
                publicKey: {
                  type: "object",
                  additionalProperties: true,
                },
                keyLength: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                creationTime: {
                  type: "object",
                  additionalProperties: true,
                },
                algorithm: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
                digests: {
                  type: "object",
                  additionalProperties: true,
                },
                keyTag: {
                  type: "object",
                  additionalProperties: true,
                },
                isActive: {
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
          nextPageToken: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default dnsKeysList;
