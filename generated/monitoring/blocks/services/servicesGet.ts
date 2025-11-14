import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const servicesGet: AppBlock = {
  name: "Services - Get",
  description: `Get the named Service.`,
  category: "Services",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "Required. Resource name of the Service. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID] ",
          type: "string",
          required: true,
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
              "https://www.googleapis.com/auth/monitoring.read",
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
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
          name: {
            type: "string",
          },
          displayName: {
            type: "string",
          },
          custom: {
            type: "object",
            properties: {},
            additionalProperties: true,
          },
          appEngine: {
            type: "object",
            properties: {
              moduleId: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          cloudEndpoints: {
            type: "object",
            properties: {
              service: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          clusterIstio: {
            type: "object",
            properties: {
              location: {
                type: "string",
              },
              clusterName: {
                type: "string",
              },
              serviceNamespace: {
                type: "string",
              },
              serviceName: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          meshIstio: {
            type: "object",
            properties: {
              meshUid: {
                type: "string",
              },
              serviceNamespace: {
                type: "string",
              },
              serviceName: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          istioCanonicalService: {
            type: "object",
            properties: {
              meshUid: {
                type: "string",
              },
              canonicalServiceNamespace: {
                type: "string",
              },
              canonicalService: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          cloudRun: {
            type: "object",
            properties: {
              serviceName: {
                type: "string",
              },
              location: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          gkeNamespace: {
            type: "object",
            properties: {
              projectId: {
                type: "string",
              },
              location: {
                type: "string",
              },
              clusterName: {
                type: "string",
              },
              namespaceName: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          gkeWorkload: {
            type: "object",
            properties: {
              projectId: {
                type: "string",
              },
              location: {
                type: "string",
              },
              clusterName: {
                type: "string",
              },
              namespaceName: {
                type: "string",
              },
              topLevelControllerType: {
                type: "string",
              },
              topLevelControllerName: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          gkeService: {
            type: "object",
            properties: {
              projectId: {
                type: "string",
              },
              location: {
                type: "string",
              },
              clusterName: {
                type: "string",
              },
              namespaceName: {
                type: "string",
              },
              serviceName: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          basicService: {
            type: "object",
            properties: {
              serviceType: {
                type: "string",
              },
              serviceLabels: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          telemetry: {
            type: "object",
            properties: {
              resourceName: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          userLabels: {
            type: "object",
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default servicesGet;
