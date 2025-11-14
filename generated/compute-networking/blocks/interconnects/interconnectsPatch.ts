import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const interconnectsPatch: AppBlock = {
  name: "Interconnects - Patch",
  description: `Updates the specified Interconnect with the data included in the request.`,
  category: "Interconnects",
  inputs: {
    default: {
      config: {
        interconnect: {
          name: "Interconnect",
          description: "Name of the interconnect to update.",
          type: "string",
          required: true,
        },
        requestId: {
          name: "RequestId",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description:
            "Represents an Interconnect resource.\n\nAn Interconnect resource is a dedicated connection between the Google\nCloud network and your on-premises network. For more information, read the\nDedicated Interconnect Overview.",
          type: {
            type: "object",
            properties: {
              location: {
                type: "string",
              },
              applicationAwareInterconnect: {
                type: "object",
                properties: {
                  profileDescription: {
                    type: "string",
                  },
                  strictPriorityPolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  bandwidthPercentagePolicy: {
                    type: "object",
                    additionalProperties: true,
                  },
                  shapeAveragePercentages: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
                additionalProperties: true,
              },
              requestedFeatures: {
                type: "array",
                items: {
                  type: "string",
                  enum: [
                    "IF_CROSS_SITE_NETWORK",
                    "IF_L2_FORWARDING",
                    "IF_MACSEC",
                  ],
                },
              },
              provisionedLinkCount: {
                type: "number",
              },
              customerName: {
                type: "string",
              },
              selfLink: {
                type: "string",
              },
              peerIpAddress: {
                type: "string",
              },
              operationalStatus: {
                type: "string",
                enum: ["OS_ACTIVE", "OS_UNPROVISIONED"],
              },
              macsec: {
                type: "object",
                properties: {
                  preSharedKeys: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  failOpen: {
                    type: "boolean",
                  },
                },
                additionalProperties: true,
              },
              state: {
                type: "string",
                enum: ["ACTIVE", "UNPROVISIONED"],
              },
              availableFeatures: {
                type: "array",
                items: {
                  type: "string",
                  enum: [
                    "IF_CROSS_SITE_NETWORK",
                    "IF_L2_FORWARDING",
                    "IF_MACSEC",
                  ],
                },
              },
              googleReferenceId: {
                type: "string",
              },
              subzone: {
                type: "string",
                enum: ["SUBZONE_A", "SUBZONE_B"],
              },
              name: {
                type: "string",
              },
              satisfiesPzs: {
                type: "boolean",
              },
              remoteLocation: {
                type: "string",
              },
              requestedLinkCount: {
                type: "number",
              },
              interconnectAttachments: {
                type: "array",
                items: {
                  type: "string",
                },
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
              adminEnabled: {
                type: "boolean",
              },
              creationTimestamp: {
                type: "string",
              },
              expectedOutages: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    startTime: {
                      type: "object",
                      additionalProperties: true,
                    },
                    source: {
                      type: "object",
                      additionalProperties: true,
                    },
                    affectedCircuits: {
                      type: "object",
                      additionalProperties: true,
                    },
                    description: {
                      type: "object",
                      additionalProperties: true,
                    },
                    state: {
                      type: "object",
                      additionalProperties: true,
                    },
                    issueType: {
                      type: "object",
                      additionalProperties: true,
                    },
                    name: {
                      type: "object",
                      additionalProperties: true,
                    },
                    endTime: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              interconnectGroups: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              aaiEnabled: {
                type: "boolean",
              },
              description: {
                type: "string",
              },
              googleIpAddress: {
                type: "string",
              },
              id: {
                type: "string",
              },
              circuitInfos: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    customerDemarcId: {
                      type: "object",
                      additionalProperties: true,
                    },
                    googleDemarcId: {
                      type: "object",
                      additionalProperties: true,
                    },
                    googleCircuitId: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              labels: {
                type: "object",
                additionalProperties: true,
              },
              nocContactEmail: {
                type: "string",
              },
              wireGroups: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              macsecEnabled: {
                type: "boolean",
              },
              labelFingerprint: {
                type: "string",
              },
              interconnectType: {
                type: "string",
                enum: ["DEDICATED", "IT_PRIVATE", "PARTNER"],
              },
              kind: {
                type: "string",
              },
              linkType: {
                type: "string",
                enum: [
                  "LINK_TYPE_ETHERNET_100G_LR",
                  "LINK_TYPE_ETHERNET_10G_LR",
                  "LINK_TYPE_ETHERNET_400G_LR4",
                ],
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
            "https://www.googleapis.com/auth/compute",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        const path = `projects/{project}/global/interconnects/{interconnect}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
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
          targetId: {
            type: "string",
          },
          creationTimestamp: {
            type: "string",
          },
          httpErrorMessage: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          setCommonInstanceMetadataOperationMetadata: {
            type: "object",
            properties: {
              perLocationOperations: {
                type: "object",
                additionalProperties: true,
              },
              clientOperationId: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          id: {
            type: "string",
          },
          region: {
            type: "string",
          },
          startTime: {
            type: "string",
          },
          zone: {
            type: "string",
          },
          statusMessage: {
            type: "string",
          },
          user: {
            type: "string",
          },
          warnings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
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
          operationType: {
            type: "string",
          },
          targetLink: {
            type: "string",
          },
          instancesBulkInsertOperationMetadata: {
            type: "object",
            properties: {
              perLocationStatus: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          error: {
            type: "object",
            properties: {
              errors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: {
                      type: "object",
                      additionalProperties: true,
                    },
                    message: {
                      type: "object",
                      additionalProperties: true,
                    },
                    errorDetails: {
                      type: "object",
                      additionalProperties: true,
                    },
                    location: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          endTime: {
            type: "string",
          },
          httpErrorStatusCode: {
            type: "number",
          },
          operationGroupId: {
            type: "string",
          },
          description: {
            type: "string",
          },
          name: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          clientOperationId: {
            type: "string",
          },
          insertTime: {
            type: "string",
          },
          status: {
            type: "string",
            enum: ["DONE", "PENDING", "RUNNING"],
          },
          progress: {
            type: "number",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default interconnectsPatch;
