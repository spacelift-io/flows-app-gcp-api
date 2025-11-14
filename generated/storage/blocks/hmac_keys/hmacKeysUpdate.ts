import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const hmacKeysUpdate: AppBlock = {
  name: "HMAC Keys - Update",
  description: `Updates the state of an HMAC key.`,
  category: "HMAC Keys",
  inputs: {
    default: {
      config: {
        accessId: {
          name: "Access ID",
          description: "The ID of the HMAC Key.",
          type: "string",
          required: false,
        },
        userProject: {
          name: "User Project",
          description: "The project to be billed for this request.",
          type: "string",
          required: false,
        },
        etag: {
          name: "Etag",
          description: "HTTP 1.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description:
            "The ID of the HMAC key, including the Project ID and the Access ID.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "The kind of item this is.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "The link to this resource.",
          type: "string",
          required: false,
        },
        serviceAccountEmail: {
          name: "Service Account Email",
          description:
            "The email address of the key's associated service account.",
          type: "string",
          required: false,
        },
        state: {
          name: "State",
          description: "The state of the key.",
          type: "string",
          required: false,
        },
        timeCreated: {
          name: "Time Created",
          description: "The creation time of the HMAC key in RFC 3339 format.",
          type: "string",
          required: false,
        },
        updated: {
          name: "Updated",
          description:
            "The last modification time of the HMAC key metadata in RFC 3339 format.",
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
              "https://www.googleapis.com/auth/devstorage.full_control",
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
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        let path = `projects/{projectId}/hmacKeys/{accessId}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};
        requestBody.projectId = input.app.config.projectId;
        if (input.event.inputConfig.accessId !== undefined)
          requestBody.accessId = input.event.inputConfig.accessId;
        if (input.event.inputConfig.etag !== undefined)
          requestBody.etag = input.event.inputConfig.etag;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.serviceAccountEmail !== undefined)
          requestBody.serviceAccountEmail =
            input.event.inputConfig.serviceAccountEmail;
        if (input.event.inputConfig.state !== undefined)
          requestBody.state = input.event.inputConfig.state;
        if (input.event.inputConfig.timeCreated !== undefined)
          requestBody.timeCreated = input.event.inputConfig.timeCreated;
        if (input.event.inputConfig.updated !== undefined)
          requestBody.updated = input.event.inputConfig.updated;

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
          accessId: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          id: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          projectId: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          serviceAccountEmail: {
            type: "string",
          },
          state: {
            type: "string",
          },
          timeCreated: {
            type: "string",
          },
          updated: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default hmacKeysUpdate;
