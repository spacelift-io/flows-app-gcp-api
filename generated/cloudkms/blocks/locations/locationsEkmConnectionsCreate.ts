import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsEkmConnectionsCreate: AppBlock = {
  name: "Locations - Create",
  description: `Creates a new EkmConnection in a given Project and Location.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The resource name of the location associated with the EkmConnection, in the format `projects/*/locations/*`.",
          type: "string",
          required: true,
        },
        ekmConnectionId: {
          name: "EkmConnectionId",
          description:
            "Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description:
            "An EkmConnection represents an individual EKM connection. It can be used for creating CryptoKeys and CryptoKeyVersions with a ProtectionLevel of EXTERNAL_VPC, as well as performing cryptographic operations using keys created within the EkmConnection.",
          type: {
            type: "object",
            properties: {
              etag: {
                type: "string",
              },
              name: {
                type: "string",
              },
              cryptoSpacePath: {
                type: "string",
              },
              serviceResolvers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    hostname: {
                      type: "object",
                      additionalProperties: true,
                    },
                    endpointFilter: {
                      type: "object",
                      additionalProperties: true,
                    },
                    serverCertificates: {
                      type: "object",
                      additionalProperties: true,
                    },
                    serviceDirectoryService: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  additionalProperties: true,
                },
              },
              createTime: {
                type: "string",
              },
              keyManagementMode: {
                type: "string",
                enum: [
                  "KEY_MANAGEMENT_MODE_UNSPECIFIED",
                  "MANUAL",
                  "CLOUD_KMS",
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
            "https://www.googleapis.com/auth/cloudkms",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://cloudkms.googleapis.com/";
        const path = `v1/{+parent}/ekmConnections`;
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
          etag: {
            type: "string",
          },
          name: {
            type: "string",
          },
          cryptoSpacePath: {
            type: "string",
          },
          serviceResolvers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                hostname: {
                  type: "object",
                  additionalProperties: true,
                },
                endpointFilter: {
                  type: "object",
                  additionalProperties: true,
                },
                serverCertificates: {
                  type: "object",
                  additionalProperties: true,
                },
                serviceDirectoryService: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          createTime: {
            type: "string",
          },
          keyManagementMode: {
            type: "string",
            enum: ["KEY_MANAGEMENT_MODE_UNSPECIFIED", "MANUAL", "CLOUD_KMS"],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default locationsEkmConnectionsCreate;
