import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsServicesList: AppBlock = {
  name: "Locations - List",
  description: `Lists Services.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            'Required. The location and project to list resources on. Location must be a valid Google Cloud region, and cannot be the "-" wildcard. Format: projects/{project}/locations/{location}, where {project} can be project id or number.',
          type: "string",
          required: true,
        },
        pageSize: {
          name: "PageSize",
          description: "Maximum number of Services to return in this call.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description:
            "A page token received from a previous call to ListServices. All other parameters must match.",
          type: "string",
          required: false,
        },
        showDeleted: {
          name: "ShowDeleted",
          description:
            "If true, returns deleted (but unexpired) resources along with active ones.",
          type: "boolean",
          required: false,
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
        const baseUrl = "https://run.googleapis.com/";
        const path = `v2/{+parent}/services`;
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
          services: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
                uid: {
                  type: "object",
                  additionalProperties: true,
                },
                generation: {
                  type: "object",
                  additionalProperties: true,
                },
                labels: {
                  type: "object",
                  additionalProperties: true,
                },
                annotations: {
                  type: "object",
                  additionalProperties: true,
                },
                createTime: {
                  type: "object",
                  additionalProperties: true,
                },
                updateTime: {
                  type: "object",
                  additionalProperties: true,
                },
                deleteTime: {
                  type: "object",
                  additionalProperties: true,
                },
                expireTime: {
                  type: "object",
                  additionalProperties: true,
                },
                creator: {
                  type: "object",
                  additionalProperties: true,
                },
                lastModifier: {
                  type: "object",
                  additionalProperties: true,
                },
                client: {
                  type: "object",
                  additionalProperties: true,
                },
                clientVersion: {
                  type: "object",
                  additionalProperties: true,
                },
                ingress: {
                  type: "object",
                  additionalProperties: true,
                },
                launchStage: {
                  type: "object",
                  additionalProperties: true,
                },
                binaryAuthorization: {
                  type: "object",
                  additionalProperties: true,
                },
                template: {
                  type: "object",
                  additionalProperties: true,
                },
                traffic: {
                  type: "object",
                  additionalProperties: true,
                },
                scaling: {
                  type: "object",
                  additionalProperties: true,
                },
                invokerIamDisabled: {
                  type: "object",
                  additionalProperties: true,
                },
                defaultUriDisabled: {
                  type: "object",
                  additionalProperties: true,
                },
                urls: {
                  type: "object",
                  additionalProperties: true,
                },
                iapEnabled: {
                  type: "object",
                  additionalProperties: true,
                },
                multiRegionSettings: {
                  type: "object",
                  additionalProperties: true,
                },
                customAudiences: {
                  type: "object",
                  additionalProperties: true,
                },
                observedGeneration: {
                  type: "object",
                  additionalProperties: true,
                },
                terminalCondition: {
                  type: "object",
                  additionalProperties: true,
                },
                conditions: {
                  type: "object",
                  additionalProperties: true,
                },
                latestReadyRevision: {
                  type: "object",
                  additionalProperties: true,
                },
                latestCreatedRevision: {
                  type: "object",
                  additionalProperties: true,
                },
                trafficStatuses: {
                  type: "object",
                  additionalProperties: true,
                },
                uri: {
                  type: "object",
                  additionalProperties: true,
                },
                satisfiesPzs: {
                  type: "object",
                  additionalProperties: true,
                },
                threatDetectionEnabled: {
                  type: "object",
                  additionalProperties: true,
                },
                buildConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                reconciling: {
                  type: "object",
                  additionalProperties: true,
                },
                etag: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          nextPageToken: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsServicesList;
