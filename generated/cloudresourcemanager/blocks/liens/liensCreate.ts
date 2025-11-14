import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const liensCreate: AppBlock = {
  name: "Liens - Create",
  description: `Create a Lien which applies to the resource denoted by the 'parent' field.`,
  category: "Liens",
  inputs: {
    default: {
      config: {
        restrictions: {
          name: "Restrictions",
          description:
            "The types of operations which should be blocked as a result of this Lien.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        origin: {
          name: "Origin",
          description:
            "A stable, user-visible/meaningful string identifying the origin of the Lien, intended to be inspected programmatically.",
          type: "string",
          required: false,
        },
        createTime: {
          name: "Create Time",
          description: "The creation time of this Lien.",
          type: "string",
          required: false,
        },
        reason: {
          name: "Reason",
          description:
            "Concise user-visible strings indicating why an action cannot be performed on a resource.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "A system-generated unique identifier for this Lien.",
          type: "string",
          required: false,
        },
        parent: {
          name: "Parent",
          description: "A reference to the resource this Lien is attached to.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        // Support both service account keys and pre-generated access tokens
        let accessToken: string;

        if (input.app.config.accessToken) {
          // Use pre-generated access token (Workload Identity Federation, etc.)
          accessToken = input.app.config.accessToken;
        } else if (input.app.config.serviceAccountKey) {
          // Parse service account credentials and generate token
          const credentials = JSON.parse(input.app.config.serviceAccountKey);

          const auth = new GoogleAuth({
            credentials,
            scopes: [
              "https://www.googleapis.com/auth/cloud-platform",
              "https://www.googleapis.com/auth/cloud-platform.read-only",
            ],
          });

          const client = await auth.getClient();
          const token = await client.getAccessToken();
          accessToken = token.token!;
        } else {
          throw new Error(
            "Either serviceAccountKey or accessToken must be provided in app configuration",
          );
        }

        // Build request URL and parameters
        const baseUrl = "https://cloudresourcemanager.googleapis.com/";
        let path = `v3/liens`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.restrictions !== undefined)
          requestBody.restrictions = input.event.inputConfig.restrictions;
        if (input.event.inputConfig.origin !== undefined)
          requestBody.origin = input.event.inputConfig.origin;
        if (input.event.inputConfig.createTime !== undefined)
          requestBody.createTime = input.event.inputConfig.createTime;
        if (input.event.inputConfig.reason !== undefined)
          requestBody.reason = input.event.inputConfig.reason;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.parent !== undefined)
          requestBody.parent = input.event.inputConfig.parent;

        if (Object.keys(requestBody).length > 0) {
          requestOptions.body = JSON.stringify(requestBody);
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
          restrictions: {
            type: "array",
            items: {
              type: "string",
            },
          },
          origin: {
            type: "string",
          },
          createTime: {
            type: "string",
          },
          reason: {
            type: "string",
          },
          name: {
            type: "string",
          },
          parent: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default liensCreate;
