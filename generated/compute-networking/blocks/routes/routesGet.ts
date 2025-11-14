import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const routesGet: AppBlock = {
  name: "Routes - Get",
  description: `Returns the specified Route resource.`,
  category: "Routes",
  inputs: {
    default: {
      config: {
        route: {
          name: "Route",
          description: "Name of the Route resource to return.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
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
        const path = `projects/{project}/global/routes/{route}`;
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
          kind: {
            type: "string",
          },
          tags: {
            type: "array",
            items: {
              type: "string",
            },
          },
          nextHopMed: {
            type: "number",
          },
          routeType: {
            type: "string",
            enum: ["BGP", "STATIC", "SUBNET", "TRANSIT"],
          },
          routeStatus: {
            type: "string",
            enum: ["ACTIVE", "DROPPED", "INACTIVE", "PENDING"],
          },
          description: {
            type: "string",
          },
          nextHopHub: {
            type: "string",
          },
          asPaths: {
            type: "array",
            items: {
              type: "object",
              properties: {
                pathSegmentType: {
                  type: "object",
                  additionalProperties: true,
                },
                asLists: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          warnings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                message: {
                  type: "string",
                },
                code: {
                  type: "string",
                  enum: [
                    "CLEANUP_FAILED",
                    "DEPRECATED_RESOURCE_USED",
                    "DEPRECATED_TYPE_USED",
                    "DISK_SIZE_LARGER_THAN_IMAGE_SIZE",
                    "EXPERIMENTAL_TYPE_USED",
                    "EXTERNAL_API_WARNING",
                    "FIELD_VALUE_OVERRIDEN",
                    "INJECTED_KERNELS_DEPRECATED",
                    "INVALID_HEALTH_CHECK_FOR_DYNAMIC_WIEGHTED_LB",
                    "LARGE_DEPLOYMENT_WARNING",
                    "LIST_OVERHEAD_QUOTA_EXCEED",
                    "MISSING_TYPE_DEPENDENCY",
                    "NEXT_HOP_ADDRESS_NOT_ASSIGNED",
                    "NEXT_HOP_CANNOT_IP_FORWARD",
                    "NEXT_HOP_INSTANCE_HAS_NO_IPV6_INTERFACE",
                    "NEXT_HOP_INSTANCE_NOT_FOUND",
                    "NEXT_HOP_INSTANCE_NOT_ON_NETWORK",
                    "NEXT_HOP_NOT_RUNNING",
                    "NOT_CRITICAL_ERROR",
                    "NO_RESULTS_ON_PAGE",
                    "PARTIAL_SUCCESS",
                    "QUOTA_INFO_UNAVAILABLE",
                    "REQUIRED_TOS_AGREEMENT",
                    "RESOURCE_IN_USE_BY_OTHER_RESOURCE_WARNING",
                    "RESOURCE_NOT_DELETED",
                    "SCHEMA_VALIDATION_IGNORED",
                    "SINGLE_INSTANCE_PROPERTY_TEMPLATE",
                    "UNDECLARED_PROPERTIES",
                    "UNREACHABLE",
                  ],
                },
              },
              additionalProperties: true,
            },
          },
          nextHopGateway: {
            type: "string",
          },
          nextHopIp: {
            type: "string",
          },
          nextHopInterRegionCost: {
            type: "number",
          },
          creationTimestamp: {
            type: "string",
          },
          id: {
            type: "string",
          },
          params: {
            type: "object",
            properties: {
              resourceManagerTags: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          nextHopVpnTunnel: {
            type: "string",
          },
          destRange: {
            type: "string",
          },
          nextHopOrigin: {
            type: "string",
            enum: ["EGP", "IGP", "INCOMPLETE"],
          },
          network: {
            type: "string",
          },
          nextHopNetwork: {
            type: "string",
          },
          nextHopInstance: {
            type: "string",
          },
          name: {
            type: "string",
          },
          nextHopIlb: {
            type: "string",
          },
          nextHopPeering: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          priority: {
            type: "number",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default routesGet;
