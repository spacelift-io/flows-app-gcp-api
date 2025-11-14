import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const buildsSubmit: AppBlock = {
  name: "Builds - Submit",
  description: `Submits a build in a given project.`,
  category: "Builds",
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
        storageSource: {
          name: "Storage Source",
          description: "Required.",
          type: {
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
          required: false,
        },
        imageUri: {
          name: "Image Uri",
          description: "Required.",
          type: "string",
          required: false,
        },
        buildpackBuild: {
          name: "Buildpack Build",
          description: "Build the source using Buildpacks.",
          type: {
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
          required: false,
        },
        dockerBuild: {
          name: "Docker Build",
          description: "Build the source using Docker.",
          type: {
            type: "object",
            properties: {},
            additionalProperties: true,
          },
          required: false,
        },
        serviceAccount: {
          name: "Service Account",
          description: "Optional.",
          type: "string",
          required: false,
        },
        workerPool: {
          name: "Worker Pool",
          description: "Optional.",
          type: "string",
          required: false,
        },
        tags: {
          name: "Tags",
          description: "Optional.",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        machineType: {
          name: "Machine Type",
          description: "Optional.",
          type: "string",
          required: false,
        },
        releaseTrack: {
          name: "Release Track",
          description: "Optional.",
          type: "string",
          required: false,
        },
        client: {
          name: "Client",
          description: "Optional.",
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
            scopes: ["https://www.googleapis.com/auth/cloud-platform"],
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
        const baseUrl = "https://run.googleapis.com/";
        let path = `v2/{+parent}/builds:submit`;

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

        if (input.event.inputConfig.storageSource !== undefined)
          requestBody.storageSource = input.event.inputConfig.storageSource;
        if (input.event.inputConfig.imageUri !== undefined)
          requestBody.imageUri = input.event.inputConfig.imageUri;
        if (input.event.inputConfig.buildpackBuild !== undefined)
          requestBody.buildpackBuild = input.event.inputConfig.buildpackBuild;
        if (input.event.inputConfig.dockerBuild !== undefined)
          requestBody.dockerBuild = input.event.inputConfig.dockerBuild;
        if (input.event.inputConfig.serviceAccount !== undefined)
          requestBody.serviceAccount = input.event.inputConfig.serviceAccount;
        if (input.event.inputConfig.workerPool !== undefined)
          requestBody.workerPool = input.event.inputConfig.workerPool;
        if (input.event.inputConfig.tags !== undefined)
          requestBody.tags = input.event.inputConfig.tags;
        if (input.event.inputConfig.machineType !== undefined)
          requestBody.machineType = input.event.inputConfig.machineType;
        if (input.event.inputConfig.releaseTrack !== undefined)
          requestBody.releaseTrack = input.event.inputConfig.releaseTrack;
        if (input.event.inputConfig.client !== undefined)
          requestBody.client = input.event.inputConfig.client;

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

export default buildsSubmit;
