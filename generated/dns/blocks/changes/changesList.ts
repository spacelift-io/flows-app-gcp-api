import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const changesList: AppBlock = {
  name: "Changes - List",
  description: `Enumerates Changes to a ResourceRecordSet collection.`,
  category: "Changes",
  inputs: {
    default: {
      config: {
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
        pageToken: {
          name: "PageToken",
          description:
            "Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request.",
          type: "string",
          required: false,
        },
        sortOrder: {
          name: "SortOrder",
          description: "Sorting order direction: 'ascending' or 'descending'.",
          type: "string",
          required: false,
        },
        sortBy: {
          name: "SortBy",
          description:
            "Sorting criterion. The only supported value is change sequence. Valid values: changeSequence",
          type: "string",
          required: false,
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
        const path = `dns/v1/projects/{project}/managedZones/{managedZone}/changes`;
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
          changes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                id: {
                  type: "object",
                  additionalProperties: true,
                },
                status: {
                  type: "object",
                  additionalProperties: true,
                },
                additions: {
                  type: "object",
                  additionalProperties: true,
                },
                startTime: {
                  type: "object",
                  additionalProperties: true,
                },
                isServing: {
                  type: "object",
                  additionalProperties: true,
                },
                deletions: {
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

export default changesList;
