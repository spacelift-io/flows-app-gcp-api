import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const timeSeriesQuery: AppBlock = {
  name: "Time Series - Query",
  description: `Queries time series by using Monitoring Query Language (MQL).`,
  category: "Time Series",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] ",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "The QueryTimeSeries request. For information about the status of Monitoring Query Language (MQL), see the MQL deprecation notice (https://cloud.google.com/stackdriver/docs/deprecations/mql).",
          type: {
            type: "object",
            properties: {
              query: {
                type: "string",
              },
              pageSize: {
                type: "number",
              },
              pageToken: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
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
            "https://www.googleapis.com/auth/monitoring",
            "https://www.googleapis.com/auth/monitoring.read",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://monitoring.googleapis.com/";
        const path = `v3/{+name}/timeSeries:query`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        };

        // Add request body
        if (input.event.inputConfig.requestBody) {
          requestOptions.body = JSON.stringify(
            input.event.inputConfig.requestBody,
          );
        }

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
          timeSeriesDescriptor: {
            type: "object",
            properties: {
              labelDescriptors: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              pointDescriptors: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          timeSeriesData: {
            type: "array",
            items: {
              type: "object",
              properties: {
                labelValues: {
                  type: "object",
                  additionalProperties: true,
                },
                pointData: {
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
          partialErrors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                code: {
                  type: "object",
                  additionalProperties: true,
                },
                message: {
                  type: "object",
                  additionalProperties: true,
                },
                details: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default timeSeriesQuery;
