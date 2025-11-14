import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesGetGuestAttributes: AppBlock = {
  name: "Instances - Get Guest Attributes",
  description: `Returns the specified guest attributes entry.`,
  category: "Instances",
  inputs: {
    default: {
      config: {
        variableKey: {
          name: "VariableKey",
          description: "Specifies the key for the guest attributes entry.",
          type: "string",
          required: false,
        },
        zone: {
          name: "Zone",
          description: "The name of the zone for this request.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        instance: {
          name: "Instance",
          description: "Name of the instance scoping this request.",
          type: "string",
          required: true,
        },
        queryPath: {
          name: "QueryPath",
          description: "Specifies the guest attributes path to be queried.",
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
            "https://www.googleapis.com/auth/compute",
            "https://www.googleapis.com/auth/compute.readonly",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        const path = `projects/{project}/zones/{zone}/instances/{instance}/getGuestAttributes`;
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
          kind: {
            type: "string",
          },
          queryValue: {
            type: "object",
            properties: {
              items: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          selfLink: {
            type: "string",
          },
          queryPath: {
            type: "string",
          },
          variableValue: {
            type: "string",
          },
          variableKey: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default instancesGetGuestAttributes;
