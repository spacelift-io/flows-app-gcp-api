import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const schemasGet: AppBlock = {
  name: "Schemas - Get",
  description: `Gets a schema.`,
  category: "Schemas",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. The name of the schema to get. Format is `projects/{project}/schemas/{schema}`.",
          type: "string",
          required: true,
        },
        view: {
          name: "View",
          description:
            "The set of fields to return in the response. If not set, returns a Schema with all fields filled out. Set to `BASIC` to omit the `definition`. Valid values: SCHEMA_VIEW_UNSPECIFIED, BASIC, FULL",
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
            "https://www.googleapis.com/auth/pubsub",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://pubsub.googleapis.com/";
        const path = `v1/{+name}`;
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
          definition: {
            type: "string",
          },
          revisionCreateTime: {
            type: "string",
          },
          name: {
            type: "string",
          },
          revisionId: {
            type: "string",
          },
          type: {
            type: "string",
            enum: ["TYPE_UNSPECIFIED", "PROTOCOL_BUFFER", "AVRO"],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default schemasGet;
