import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsList: AppBlock = {
  name: "Locations - List",
  description: `Lists information about the supported locations for this service.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "The resource that owns the locations collection, if applicable.",
          type: "string",
          required: true,
        },
        filter: {
          name: "Filter",
          description:
            'A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160).',
          type: "string",
          required: false,
        },
        pageSize: {
          name: "PageSize",
          description:
            "The maximum number of results to return. If not set, the service selects a default.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description:
            "A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page.",
          type: "string",
          required: false,
        },
        extraLocationTypes: {
          name: "ExtraLocationTypes",
          description:
            "Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage.",
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
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://cloudfunctions.googleapis.com/";
        const path = `v2/{+name}/locations`;
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
          locations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                locationId: {
                  type: "object",
                  additionalProperties: true,
                },
                displayName: {
                  type: "object",
                  additionalProperties: true,
                },
                labels: {
                  type: "object",
                  additionalProperties: true,
                },
                metadata: {
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

export default locationsList;
