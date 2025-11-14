import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const servicesPatch: AppBlock = {
  name: "Services - Patch",
  description: `Update this Service.`,
  category: "Services",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Identifier.",
          type: "string",
          required: false,
        },
        updateMask: {
          name: "Update Mask",
          description:
            "A set of field paths defining which fields to use for the update.",
          type: "string",
          required: false,
        },
        displayName: {
          name: "Display Name",
          description: "Name used for UI elements listing this Service.",
          type: "string",
          required: false,
        },
        custom: {
          name: "Custom",
          description: "Custom service type.",
          type: {
            type: "object",
            properties: {},
            additionalProperties: true,
          },
          required: false,
        },
        appEngine: {
          name: "App Engine",
          description: "Type used for App Engine services.",
          type: {
            type: "object",
            properties: {
              moduleId: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        cloudEndpoints: {
          name: "Cloud Endpoints",
          description: "Type used for Cloud Endpoints services.",
          type: {
            type: "object",
            properties: {
              service: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        clusterIstio: {
          name: "Cluster Istio",
          description:
            "Type used for Istio services that live in a Kubernetes cluster.",
          type: {
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
          required: false,
        },
        meshIstio: {
          name: "Mesh Istio",
          description: "Type used for Istio services scoped to an Istio mesh.",
          type: {
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
          required: false,
        },
        istioCanonicalService: {
          name: "Istio Canonical Service",
          description:
            "Type used for canonical services scoped to an Istio mesh.",
          type: {
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
          required: false,
        },
        cloudRun: {
          name: "Cloud Run",
          description: "Type used for Cloud Run services.",
          type: {
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
          required: false,
        },
        gkeNamespace: {
          name: "Gke Namespace",
          description: "Type used for GKE Namespaces.",
          type: {
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
          required: false,
        },
        gkeWorkload: {
          name: "Gke Workload",
          description: "Type used for GKE Workloads.",
          type: {
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
          required: false,
        },
        gkeService: {
          name: "Gke Service",
          description:
            "Type used for GKE Services (the Kubernetes concept of a service).",
          type: {
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
          required: false,
        },
        basicService: {
          name: "Basic Service",
          description:
            "Message that contains the service type and service labels of this service if it is a basic service.",
          type: {
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
          required: false,
        },
        telemetry: {
          name: "Telemetry",
          description: "Configuration for how to query telemetry on a Service.",
          type: {
            type: "object",
            properties: {
              resourceName: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        userLabels: {
          name: "User Labels",
          description: "Labels which have been used to annotate the service.",
          type: {
            type: "object",
            additionalProperties: true,
          },
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
          method: "PATCH",
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
        if (input.event.inputConfig.custom !== undefined)
          requestBody.custom = input.event.inputConfig.custom;
        if (input.event.inputConfig.appEngine !== undefined)
          requestBody.appEngine = input.event.inputConfig.appEngine;
        if (input.event.inputConfig.cloudEndpoints !== undefined)
          requestBody.cloudEndpoints = input.event.inputConfig.cloudEndpoints;
        if (input.event.inputConfig.clusterIstio !== undefined)
          requestBody.clusterIstio = input.event.inputConfig.clusterIstio;
        if (input.event.inputConfig.meshIstio !== undefined)
          requestBody.meshIstio = input.event.inputConfig.meshIstio;
        if (input.event.inputConfig.istioCanonicalService !== undefined)
          requestBody.istioCanonicalService =
            input.event.inputConfig.istioCanonicalService;
        if (input.event.inputConfig.cloudRun !== undefined)
          requestBody.cloudRun = input.event.inputConfig.cloudRun;
        if (input.event.inputConfig.gkeNamespace !== undefined)
          requestBody.gkeNamespace = input.event.inputConfig.gkeNamespace;
        if (input.event.inputConfig.gkeWorkload !== undefined)
          requestBody.gkeWorkload = input.event.inputConfig.gkeWorkload;
        if (input.event.inputConfig.gkeService !== undefined)
          requestBody.gkeService = input.event.inputConfig.gkeService;
        if (input.event.inputConfig.basicService !== undefined)
          requestBody.basicService = input.event.inputConfig.basicService;
        if (input.event.inputConfig.telemetry !== undefined)
          requestBody.telemetry = input.event.inputConfig.telemetry;
        if (input.event.inputConfig.userLabels !== undefined)
          requestBody.userLabels = input.event.inputConfig.userLabels;

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

export default servicesPatch;
