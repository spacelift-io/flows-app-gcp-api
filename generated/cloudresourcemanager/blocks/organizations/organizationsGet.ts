import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const organizationsGet: AppBlock = {
  name: "Organizations - Get",
  description: `Fetches an organization resource identified by the specified resource name.`,
  category: "Organizations",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            'Required. The resource name of the Organization to fetch. This is the organization\'s relative path in the API, formatted as "organizations/[organizationId]". For example, "organizations/1234".',
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
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://cloudresourcemanager.googleapis.com/";
        const path = `v3/{+name}`;
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
          displayName: {
            type: "string",
          },
          createTime: {
            type: "string",
          },
          deleteTime: {
            type: "string",
          },
          name: {
            type: "string",
          },
          updateTime: {
            type: "string",
          },
          directoryCustomerId: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          state: {
            type: "string",
            enum: ["STATE_UNSPECIFIED", "ACTIVE", "DELETE_REQUESTED"],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default organizationsGet;
