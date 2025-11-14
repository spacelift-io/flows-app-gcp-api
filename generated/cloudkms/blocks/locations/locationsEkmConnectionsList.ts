import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsEkmConnectionsList: AppBlock = {
  name: "Locations - List",
  description: `Lists EkmConnections.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        filter: {
          name: "Filter",
          description:
            "Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).",
          type: "string",
          required: false,
        },
        orderBy: {
          name: "OrderBy",
          description:
            "Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).",
          type: "string",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description:
            "Optional. Optional pagination token, returned earlier via ListEkmConnectionsResponse.next_page_token.",
          type: "string",
          required: false,
        },
        pageSize: {
          name: "PageSize",
          description:
            "Optional. Optional limit on the number of EkmConnections to include in the response. Further EkmConnections can subsequently be obtained by including the ListEkmConnectionsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default.",
          type: "number",
          required: false,
        },
        parent: {
          name: "Parent",
          description:
            "Required. The resource name of the location associated with the EkmConnections to list, in the format `projects/*/locations/*`.",
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
            "https://www.googleapis.com/auth/cloudkms",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://cloudkms.googleapis.com/";
        const path = `v1/{+parent}/ekmConnections`;
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
          ekmConnections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                etag: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                cryptoSpacePath: {
                  type: "object",
                  additionalProperties: true,
                },
                serviceResolvers: {
                  type: "object",
                  additionalProperties: true,
                },
                createTime: {
                  type: "object",
                  additionalProperties: true,
                },
                keyManagementMode: {
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
          totalSize: {
            type: "number",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsEkmConnectionsList;
