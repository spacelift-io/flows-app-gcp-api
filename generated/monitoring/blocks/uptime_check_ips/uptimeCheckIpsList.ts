import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const uptimeCheckIpsList: AppBlock = {
  name: "Uptime Check Ips - List",
  description: `Returns the list of IP addresses that checkers run from.`,
  category: "Uptime Check Ips",
  inputs: {
    default: {
      config: {
        pageSize: {
          name: "PageSize",
          description:
            "The maximum number of results to return in a single response. The server may further constrain the maximum number of results returned in a single page. If the page_size is <=0, the server will decide the number of results to be returned. NOTE: this field is not yet implemented",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description:
            "If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return more results from the previous method call. NOTE: this field is not yet implemented",
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
            "https://www.googleapis.com/auth/monitoring",
            "https://www.googleapis.com/auth/monitoring.read",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://monitoring.googleapis.com/";
        const path = `v3/uptimeCheckIps`;
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
          uptimeCheckIps: {
            type: "array",
            items: {
              type: "object",
              properties: {
                region: {
                  type: "object",
                  additionalProperties: true,
                },
                location: {
                  type: "object",
                  additionalProperties: true,
                },
                ipAddress: {
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

export default uptimeCheckIpsList;
