import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const aggregatedUsableSubnetworksList: AppBlock = {
  name: "Aggregated - List",
  description: `Lists subnetworks that are usable for creating clusters in a project.`,
  category: "Aggregated",
  inputs: {
    default: {
      config: {
        filter: {
          name: "Filter",
          description:
            'Filtering currently only supports equality on the networkProjectId and must be in the form: "networkProjectId=[PROJECTID]", where `networkProjectId` is the project which owns the listed subnetworks. This defaults to the parent project ID.',
          type: "string",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description:
            "Specifies a page token to use. Set this to the nextPageToken returned by previous list requests to get the next page of results.",
          type: "string",
          required: false,
        },
        parent: {
          name: "Parent",
          description:
            "The parent project where subnetworks are usable. Specified in the format `projects/*`.",
          type: "string",
          required: true,
        },
        pageSize: {
          name: "PageSize",
          description:
            "The max number of results per page that should be returned. If the number of available results is larger than `page_size`, a `next_page_token` is returned which can be used to get the next page of results in subsequent requests. Acceptable values are 0 to 500, inclusive. (Default: 500)",
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
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://container.googleapis.com/";
        const path = `v1/{+parent}/aggregated/usableSubnetworks`;
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
          subnetworks: {
            type: "array",
            items: {
              type: "object",
              properties: {
                ipCidrRange: {
                  type: "object",
                  additionalProperties: true,
                },
                statusMessage: {
                  type: "object",
                  additionalProperties: true,
                },
                network: {
                  type: "object",
                  additionalProperties: true,
                },
                secondaryIpRanges: {
                  type: "object",
                  additionalProperties: true,
                },
                subnetwork: {
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

export default aggregatedUsableSubnetworksList;
