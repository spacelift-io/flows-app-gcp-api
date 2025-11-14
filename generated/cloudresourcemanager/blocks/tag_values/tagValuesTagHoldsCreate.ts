import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const tagValuesTagHoldsCreate: AppBlock = {
  name: "Tag Values - Create",
  description: `Creates a TagHold.`,
  category: "Tag Values",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The resource name of the TagHold's parent TagValue. Must be of the form: `tagValues/{tag-value-id}`.",
          type: "string",
          required: true,
        },
        validateOnly: {
          name: "ValidateOnly",
          description:
            "Optional. Set to true to perform the validations necessary for creating the resource, but not actually perform the action.",
          type: "boolean",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "A TagHold represents the use of a TagValue that is not captured by TagBindings. If a TagValue has any TagHolds, deletion will be blocked. This resource is intended to be created in the same cloud location as the `holder`.",
          type: {
            type: "object",
            properties: {
              holder: {
                type: "string",
              },
              name: {
                type: "string",
              },
              origin: {
                type: "string",
              },
              createTime: {
                type: "string",
              },
              helpLink: {
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
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://cloudresourcemanager.googleapis.com/";
        const path = `v3/{+parent}/tagHolds`;
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
          response: {
            type: "object",
            additionalProperties: true,
          },
          metadata: {
            type: "object",
            additionalProperties: true,
          },
          name: {
            type: "string",
          },
          error: {
            type: "object",
            properties: {
              details: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              message: {
                type: "string",
              },
              code: {
                type: "number",
              },
            },
            additionalProperties: true,
          },
          done: {
            type: "boolean",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default tagValuesTagHoldsCreate;
