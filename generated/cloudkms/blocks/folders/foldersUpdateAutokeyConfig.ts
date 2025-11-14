import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const foldersUpdateAutokeyConfig: AppBlock = {
  name: "Folders - Update Autokey Config",
  description: `Updates the AutokeyConfig for a folder.`,
  category: "Folders",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Identifier. Name of the AutokeyConfig resource, e.g. `folders/{FOLDER_NUMBER}/autokeyConfig` `projects/{PROJECT_NUMBER}/autokeyConfig`.",
          type: "string",
          required: true,
        },
        updateMask: {
          name: "UpdateMask",
          description:
            "Required. Masks which fields of the AutokeyConfig to update, e.g. `keyProject`.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Cloud KMS Autokey configuration for a folder or project.",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              keyProject: {
                type: "string",
              },
              state: {
                type: "string",
                enum: [
                  "STATE_UNSPECIFIED",
                  "ACTIVE",
                  "KEY_PROJECT_DELETED",
                  "UNINITIALIZED",
                ],
              },
              etag: {
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
            "https://www.googleapis.com/auth/cloudkms",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://cloudkms.googleapis.com/";
        const path = `v1/{+name}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
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
          name: {
            type: "string",
          },
          keyProject: {
            type: "string",
          },
          state: {
            type: "string",
            enum: [
              "STATE_UNSPECIFIED",
              "ACTIVE",
              "KEY_PROJECT_DELETED",
              "UNINITIALIZED",
            ],
          },
          etag: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default foldersUpdateAutokeyConfig;
