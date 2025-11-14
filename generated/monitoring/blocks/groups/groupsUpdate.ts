import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const groupsUpdate: AppBlock = {
  name: "Groups - Update",
  description: `Updates an existing group.`,
  category: "Groups",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Output only.",
          type: "string",
          required: false,
        },
        validateOnly: {
          name: "Validate Only",
          description:
            "If true, validate this request but do not update the existing group.",
          type: "boolean",
          required: false,
        },
        displayName: {
          name: "Display Name",
          description:
            "A user-assigned name for this group, used only for display purposes.",
          type: "string",
          required: false,
        },
        parentName: {
          name: "Parent Name",
          description: "The name of the group's parent, if it has one.",
          type: "string",
          required: false,
        },
        filter: {
          name: "Filter",
          description:
            "The filter used to determine which monitored resources belong to this group.",
          type: "string",
          required: false,
        },
        isCluster: {
          name: "Is Cluster",
          description:
            "If true, the members of this group are considered to be a cluster.",
          type: "boolean",
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
              "https://www.googleapis.com/auth/monitoring",
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
        const baseUrl = "https://monitoring.googleapis.com/";
        let path = `v3/{+name}`;

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

        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.displayName !== undefined)
          requestBody.displayName = input.event.inputConfig.displayName;
        if (input.event.inputConfig.parentName !== undefined)
          requestBody.parentName = input.event.inputConfig.parentName;
        if (input.event.inputConfig.filter !== undefined)
          requestBody.filter = input.event.inputConfig.filter;
        if (input.event.inputConfig.isCluster !== undefined)
          requestBody.isCluster = input.event.inputConfig.isCluster;

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
          name: {
            type: "string",
          },
          displayName: {
            type: "string",
          },
          parentName: {
            type: "string",
          },
          filter: {
            type: "string",
          },
          isCluster: {
            type: "boolean",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default groupsUpdate;
