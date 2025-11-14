import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const managedZonesList: AppBlock = {
  name: "Managed Zones - List",
  description: `Enumerates ManagedZones that have been created but not yet deleted.`,
  category: "Managed Zones",
  inputs: {
    default: {
      config: {
        pageToken: {
          name: "PageToken",
          description:
            "Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request.",
          type: "string",
          required: false,
        },
        dnsName: {
          name: "DnsName",
          description:
            "Restricts the list to return only zones with this domain name.",
          type: "string",
          required: false,
        },
        project: {
          name: "Project",
          description: "Identifies the project addressed by this request.",
          type: "string",
          required: true,
        },
        maxResults: {
          name: "MaxResults",
          description:
            "Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return.",
          type: "number",
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
        const path = `dns/v1/projects/{project}/managedZones`;
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
          managedZones: {
            type: "array",
            items: {
              type: "object",
              properties: {
                privateVisibilityConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
                dnssecConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                cloudLoggingConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                creationTime: {
                  type: "object",
                  additionalProperties: true,
                },
                nameServers: {
                  type: "object",
                  additionalProperties: true,
                },
                dnsName: {
                  type: "object",
                  additionalProperties: true,
                },
                serviceDirectoryConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                visibility: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                id: {
                  type: "object",
                  additionalProperties: true,
                },
                labels: {
                  type: "object",
                  additionalProperties: true,
                },
                reverseLookupConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                nameServerSet: {
                  type: "object",
                  additionalProperties: true,
                },
                peeringConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                forwardingConfig: {
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
          kind: {
            type: "string",
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

export default managedZonesList;
