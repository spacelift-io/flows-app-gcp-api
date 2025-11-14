import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const servicesCreate: AppBlock = {
  name: "Services - Create",
  description: `Create a Service.`,
  category: "Services",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. Resource name (https://cloud.google.com/monitoring/api/v3#project_name) of the parent Metrics Scope. The format is: projects/[PROJECT_ID_OR_NUMBER] ",
          type: "string",
          required: true,
        },
        serviceId: {
          name: "ServiceId",
          description:
            "Optional. The Service id to use for this Service. If omitted, an id will be generated instead. Must match the pattern [a-z0-9\\-]+",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "A Service is a discrete, autonomous, and network-accessible unit, designed to solve an individual concern (Wikipedia (https://en.wikipedia.org/wiki/Service-orientation)). In Cloud Monitoring, a Service acts as the root resource under which operational aspects of the service are accessible.",
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
            "https://www.googleapis.com/auth/monitoring",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://monitoring.googleapis.com/";
        const path = `v3/{+parent}/services`;
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

export default servicesCreate;
