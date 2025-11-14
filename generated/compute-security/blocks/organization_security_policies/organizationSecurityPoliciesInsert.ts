import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const organizationSecurityPoliciesInsert: AppBlock = {
  name: "Organization Security Policies - Insert",
  description: `Creates a new policy in the specified organization using the data included in the request.`,
  category: "Organization Security Policies",
  inputs: {
    default: {
      config: {
        requestId: {
          name: "Request ID",
          description:
            "An optional request ID to identify requests. Specify a unique request ID so\nthat if you must retry your request, the server will know to ignore the\nrequest if it has already been completed.\n\nFor example, consider a situation where you make an initial request and\nthe request times out. If you make the request again with the same\nrequest ID, the server can check if original operation with the same\nrequest ID was received, and if so, will ignore the second request. This\nprevents clients from accidentally creating duplicate commitments.\n\nThe request ID must be\na valid UUID with the exception that zero UUID is not supported\n(00000000-0000-0000-0000-000000000000).",
          type: "string",
          required: false,
        },
        parentId: {
          name: "Parent ID",
          description:
            'Parent ID for this request. The ID can be either be "folders/[FOLDER_ID]"\nif the parent is a folder or "organizations/[ORGANIZATION_ID]" if the\nparent is an organization.',
          type: "string",
          required: false,
        },
        labelFingerprint: {
          name: "Label Fingerprint",
          description:
            "A fingerprint for the labels being applied to this security policy, which is essentially a hash of the labels set used for optimistic locking.",
          type: "string",
          required: false,
        },
        associations: {
          name: "Associations",
          description: "A list of associations that belong to this policy.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                securityPolicyId: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                attachmentId: {
                  type: "string",
                },
                shortName: {
                  type: "string",
                },
                excludedProjects: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                excludedFolders: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                displayName: {
                  type: "string",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        labels: {
          name: "Labels",
          description: "Labels for this resource.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        adaptiveProtectionConfig: {
          name: "Adaptive Protection Config",
          description: "Request body field: adaptiveProtectionConfig",
          type: {
            type: "object",
            properties: {
              layer7DdosDefenseConfig: {
                type: "object",
                properties: {
                  enable: {
                    type: "object",
                    additionalProperties: true,
                  },
                  thresholdConfigs: {
                    type: "object",
                    additionalProperties: true,
                  },
                  ruleVisibility: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        parent: {
          name: "Parent",
          description: "[Output Only] The parent of the security policy.",
          type: "string",
          required: false,
        },
        recaptchaOptionsConfig: {
          name: "Recaptcha Options Config",
          description: "Request body field: recaptchaOptionsConfig",
          type: {
            type: "object",
            properties: {
              redirectSiteKey: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        region: {
          name: "Region",
          description:
            "[Output Only] URL of the region where the regional security policy resides.",
          type: "string",
          required: false,
        },
        advancedOptionsConfig: {
          name: "Advanced Options Config",
          description: "Request body field: advancedOptionsConfig",
          type: {
            type: "object",
            properties: {
              userIpRequestHeaders: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              logLevel: {
                type: "string",
                enum: ["NORMAL", "VERBOSE"],
              },
              jsonParsing: {
                type: "string",
                enum: ["DISABLED", "STANDARD", "STANDARD_WITH_GRAPHQL"],
              },
              jsonCustomConfig: {
                type: "object",
                properties: {
                  contentTypes: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        type: {
          name: "Type",
          description:
            "The type indicates the intended use of the security policy.",
          type: "string",
          required: false,
        },
        rules: {
          name: "Rules",
          description: "A list of rules that belong to this policy.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                preconfiguredWafConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                networkMatch: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
                  type: "string",
                },
                rateLimitOptions: {
                  type: "object",
                  additionalProperties: true,
                },
                redirectOptions: {
                  type: "object",
                  additionalProperties: true,
                },
                action: {
                  type: "string",
                },
                headerAction: {
                  type: "object",
                  additionalProperties: true,
                },
                preview: {
                  type: "boolean",
                },
                match: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "string",
                },
                priority: {
                  type: "number",
                },
              },
              additionalProperties: true,
            },
          },
          required: false,
        },
        name: {
          name: "Name",
          description: "Name of the resource.",
          type: "string",
          required: false,
        },
        kind: {
          name: "Kind",
          description: "[Output only] Type of the resource.",
          type: "string",
          required: false,
        },
        description: {
          name: "Description",
          description: "An optional description of this resource.",
          type: "string",
          required: false,
        },
        selfLink: {
          name: "Self Link",
          description: "[Output Only] Server-defined URL for the resource.",
          type: "string",
          required: false,
        },
        ddosProtectionConfig: {
          name: "DDoS Protection Config",
          description: "Request body field: ddosProtectionConfig",
          type: {
            type: "object",
            properties: {
              ddosProtection: {
                type: "string",
                enum: ["ADVANCED", "ADVANCED_PREVIEW", "STANDARD"],
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        creationTimestamp: {
          name: "Creation Timestamp",
          description:
            "[Output Only] Creation timestamp inRFC3339 text format.",
          type: "string",
          required: false,
        },
        fingerprint: {
          name: "Fingerprint",
          description:
            "Specifies a fingerprint for this resource, which is essentially a hash of the metadata's contents and used for optimistic locking.",
          type: "string",
          required: false,
        },
        shortName: {
          name: "Short Name",
          description:
            "User-provided name of the organization security policy.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description: "[Output Only] The unique identifier for the resource.",
          type: "string",
          required: false,
        },
        userDefinedFields: {
          name: "User Defined Fields",
          description:
            "Definitions of user-defined fields for CLOUD_ARMOR_NETWORK policies.",
          type: {
            type: "array",
            items: {
              type: "object",
              properties: {
                offset: {
                  type: "number",
                },
                mask: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                size: {
                  type: "number",
                },
                base: {
                  type: "string",
                  enum: ["IPV4", "IPV6", "TCP", "UDP"],
                },
              },
              additionalProperties: true,
            },
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
              "https://www.googleapis.com/auth/compute",
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
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        let path = `locations/global/securityPolicies`;

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

        if (input.event.inputConfig.labelFingerprint !== undefined)
          requestBody.labelFingerprint =
            input.event.inputConfig.labelFingerprint;
        if (input.event.inputConfig.associations !== undefined)
          requestBody.associations = input.event.inputConfig.associations;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.adaptiveProtectionConfig !== undefined)
          requestBody.adaptiveProtectionConfig =
            input.event.inputConfig.adaptiveProtectionConfig;
        if (input.event.inputConfig.parent !== undefined)
          requestBody.parent = input.event.inputConfig.parent;
        if (input.event.inputConfig.recaptchaOptionsConfig !== undefined)
          requestBody.recaptchaOptionsConfig =
            input.event.inputConfig.recaptchaOptionsConfig;
        if (input.event.inputConfig.region !== undefined)
          requestBody.region = input.event.inputConfig.region;
        if (input.event.inputConfig.advancedOptionsConfig !== undefined)
          requestBody.advancedOptionsConfig =
            input.event.inputConfig.advancedOptionsConfig;
        if (input.event.inputConfig.type !== undefined)
          requestBody.type = input.event.inputConfig.type;
        if (input.event.inputConfig.rules !== undefined)
          requestBody.rules = input.event.inputConfig.rules;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.selfLink !== undefined)
          requestBody.selfLink = input.event.inputConfig.selfLink;
        if (input.event.inputConfig.ddosProtectionConfig !== undefined)
          requestBody.ddosProtectionConfig =
            input.event.inputConfig.ddosProtectionConfig;
        if (input.event.inputConfig.creationTimestamp !== undefined)
          requestBody.creationTimestamp =
            input.event.inputConfig.creationTimestamp;
        if (input.event.inputConfig.fingerprint !== undefined)
          requestBody.fingerprint = input.event.inputConfig.fingerprint;
        if (input.event.inputConfig.shortName !== undefined)
          requestBody.shortName = input.event.inputConfig.shortName;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.userDefinedFields !== undefined)
          requestBody.userDefinedFields =
            input.event.inputConfig.userDefinedFields;

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

export default organizationSecurityPoliciesInsert;
