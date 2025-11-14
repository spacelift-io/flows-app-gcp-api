import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsBuildsSubmit: AppBlock = {
  name: "Locations - Submit",
  description: `Submits a build in a given project.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The project and location to build in. Location must be a region, e.g., 'us-central1' or 'global' if the global builder is to be used. Format: `projects/{project}/locations/{location}`",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "Request message for submitting a Build.",
          type: {
            type: "object",
            properties: {
              storageSource: {
                type: "object",
                properties: {
                  bucket: {
                    type: "string",
                  },
                  object: {
                    type: "string",
                  },
                  generation: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              imageUri: {
                type: "string",
              },
              buildpackBuild: {
                type: "object",
                properties: {
                  runtime: {
                    type: "string",
                  },
                  functionTarget: {
                    type: "string",
                  },
                  cacheImageUri: {
                    type: "string",
                  },
                  baseImage: {
                    type: "string",
                  },
                  environmentVariables: {
                    type: "object",
                    additionalProperties: true,
                  },
                  enableAutomaticUpdates: {
                    type: "boolean",
                  },
                  projectDescriptor: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              dockerBuild: {
                type: "object",
                properties: {},
                additionalProperties: true,
              },
              serviceAccount: {
                type: "string",
              },
              workerPool: {
                type: "string",
              },
              tags: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              machineType: {
                type: "string",
              },
              releaseTrack: {
                type: "string",
                enum: [
                  "LAUNCH_STAGE_UNSPECIFIED",
                  "UNIMPLEMENTED",
                  "PRELAUNCH",
                  "EARLY_ACCESS",
                  "ALPHA",
                  "BETA",
                  "GA",
                  "DEPRECATED",
                ],
              },
              client: {
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
        const baseUrl = "https://run.googleapis.com/";
        const path = `v2/{+parent}/builds:submit`;
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
          buildOperation: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              metadata: {
                type: "object",
                additionalProperties: true,
              },
              done: {
                type: "boolean",
              },
              error: {
                type: "object",
                additionalProperties: true,
              },
              response: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          baseImageUri: {
            type: "string",
          },
          baseImageWarning: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsBuildsSubmit;
