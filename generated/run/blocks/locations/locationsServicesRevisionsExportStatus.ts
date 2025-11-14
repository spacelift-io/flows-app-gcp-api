import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsServicesRevisionsExportStatus: AppBlock = {
  name: "Locations - Export Status",
  description: `Read the status of an image export operation.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The name of the resource of which image export operation status has to be fetched. Format: `projects/{project_id_or_number}/locations/{location}/services/{service}/revisions/{revision}` for Revision `projects/{project_id_or_number}/locations/{location}/jobs/{job}/executions/{execution}` for Execution",
          type: "string",
          required: true,
        },
        operationId: {
          name: "OperationId",
          description: "Required. The operation id returned from ExportImage.",
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
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://run.googleapis.com/";
        const path = `v2/{+name}/{+operationId}:exportStatus`;
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
          operationId: {
            type: "string",
          },
          operationState: {
            type: "string",
            enum: ["OPERATION_STATE_UNSPECIFIED", "IN_PROGRESS", "FINISHED"],
          },
          imageExportStatuses: {
            type: "array",
            items: {
              type: "object",
              properties: {
                exportJobState: {
                  type: "object",
                  additionalProperties: true,
                },
                status: {
                  type: "object",
                  additionalProperties: true,
                },
                exportedImageDigest: {
                  type: "object",
                  additionalProperties: true,
                },
                tag: {
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

export default locationsServicesRevisionsExportStatus;
