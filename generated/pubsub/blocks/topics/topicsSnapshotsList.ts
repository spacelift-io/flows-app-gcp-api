import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const topicsSnapshotsList: AppBlock = {
  name: "Topics - List",
  description: `Lists the names of the snapshots on this topic.`,
  category: "Topics",
  inputs: {
    default: {
      config: {
        pageToken: {
          name: "PageToken",
          description:
            "Optional. The value returned by the last `ListTopicSnapshotsResponse`; indicates that this is a continuation of a prior `ListTopicSnapshots` call, and that the system should return the next page of data.",
          type: "string",
          required: false,
        },
        topic: {
          name: "Topic",
          description:
            "Required. The name of the topic that snapshots are attached to. Format is `projects/{project}/topics/{topic}`.",
          type: "string",
          required: true,
        },
        pageSize: {
          name: "PageSize",
          description: "Optional. Maximum number of snapshot names to return.",
          type: "number",
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
        const path = `v1/{+topic}/snapshots`;
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
          nextPageToken: {
            type: "string",
          },
          snapshots: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default topicsSnapshotsList;
