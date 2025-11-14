import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instanceGroupsGet: AppBlock = {
  name: "Instance Groups - Get",
  description: `Returns the specified zonal instance group.`,
  category: "Instance Groups",
  inputs: {
    default: {
      config: {
        zone: {
          name: "Zone",
          description:
            "The name of the zone\nwhere the instance group is located.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        instanceGroup: {
          name: "InstanceGroup",
          description: "The name of the instance group.",
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
            "https://www.googleapis.com/auth/compute",
            "https://www.googleapis.com/auth/compute.readonly",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        const path = `projects/{project}/zones/{zone}/instanceGroups/{instanceGroup}`;
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
          id: {
            type: "string",
          },
          region: {
            type: "string",
          },
          network: {
            type: "string",
          },
          fingerprint: {
            type: "string",
          },
          namedPorts: {
            type: "array",
            items: {
              type: "object",
              properties: {
                port: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          creationTimestamp: {
            type: "string",
          },
          zone: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          size: {
            type: "number",
          },
          subnetwork: {
            type: "string",
          },
          name: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default instanceGroupsGet;
