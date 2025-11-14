import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const notificationsInsert: AppBlock = {
  name: "Notifications - Insert",
  description: `Creates a notification subscription for a given bucket.`,
  category: "Notifications",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "The parent bucket of the notification.",
          type: "string",
          required: true,
        },
        userProject: {
          name: "User Project",
          description:
            "The project to be billed for this request. Required for Requester Pays buckets.",
          type: "string",
          required: false,
        },
        custom_attributes: {
          name: "Custom_attributes",
          description:
            "An optional list of additional attributes to attach to each Cloud PubSub message published for this notification subscription.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        etag: {
          name: "Etag",
          description: "HTTP 1.",
          type: "string",
          required: false,
        },
        event_types: {
          name: "Event_types",
          description:
            "If present, only send notifications about listed event types.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        id: {
          name: "ID",
          description: "The ID of the notification.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "The kind of item this is.",
          type: "string",
          required: false,
        },
        object_name_prefix: {
          name: "Object_name_prefix",
          description:
            "If present, only apply this notification configuration to object names that begin with this prefix.",
          type: "string",
          required: false,
        },
        payload_format: {
          name: "Payload_format",
          description: "The desired content of the Payload.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "The canonical URL of this notification.",
          type: "string",
          required: false,
        },
        topic: {
          name: "Topic",
          description:
            "The Cloud PubSub topic to which this subscription publishes.",
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
              "https://www.googleapis.com/auth/devstorage.read_write",
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
        let path = `b/{bucket}/notificationConfigs`;

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

        if (input.event.inputConfig.custom_attributes !== undefined)
          requestBody.custom_attributes =
            input.event.inputConfig.custom_attributes;
        if (input.event.inputConfig.etag !== undefined)
          requestBody.etag = input.event.inputConfig.etag;
        if (input.event.inputConfig.event_types !== undefined)
          requestBody.event_types = input.event.inputConfig.event_types;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.object_name_prefix !== undefined)
          requestBody.object_name_prefix =
            input.event.inputConfig.object_name_prefix;
        if (input.event.inputConfig.payload_format !== undefined)
          requestBody.payload_format = input.event.inputConfig.payload_format;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.topic !== undefined)
          requestBody.topic = input.event.inputConfig.topic;

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
          custom_attributes: {
            type: "object",
            additionalProperties: true,
          },
          etag: {
            type: "string",
          },
          event_types: {
            type: "array",
            items: {
              type: "string",
            },
          },
          id: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          object_name_prefix: {
            type: "string",
          },
          payload_format: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          topic: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default notificationsInsert;
