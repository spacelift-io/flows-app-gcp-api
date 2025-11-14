import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const objectAccessControlsInsert: AppBlock = {
  name: "Object Access Controls - Insert",
  description: `Creates a new ACL entry on the specified object.`,
  category: "Object Access Controls",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "Name of a bucket.",
          type: "string",
          required: true,
        },
        generation: {
          name: "Generation",
          description:
            "If present, selects a specific revision of this object (as opposed to the latest version, the default).",
          type: "string",
          required: false,
        },
        object: {
          name: "Object",
          description:
            "Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding).",
          type: "string",
          required: true,
        },
        userProject: {
          name: "UserProject",
          description:
            "The project to be billed for this request. Required for Requester Pays buckets.",
          type: "string",
          required: false,
        },
        requestBody: {
          name: "Request Body",
          description: "An access-control entry.",
          type: {
            type: "object",
            properties: {
              bucket: {
                type: "string",
              },
              domain: {
                type: "string",
              },
              email: {
                type: "string",
              },
              entity: {
                type: "string",
              },
              entityId: {
                type: "string",
              },
              etag: {
                type: "string",
              },
              generation: {
                type: "string",
              },
              id: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              object: {
                type: "string",
              },
              projectTeam: {
                type: "object",
                properties: {
                  projectNumber: {
                    type: "string",
                  },
                  team: {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
              role: {
                type: "string",
              },
              selfLink: {
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
          scopes: [
            "https://www.googleapis.com/auth/cloud-platform",
            "https://www.googleapis.com/auth/devstorage.full_control",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        const path = `b/{bucket}/o/{object}/acl`;
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
          bucket: {
            type: "string",
          },
          domain: {
            type: "string",
          },
          email: {
            type: "string",
          },
          entity: {
            type: "string",
          },
          entityId: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          generation: {
            type: "string",
          },
          id: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          object: {
            type: "string",
          },
          projectTeam: {
            type: "object",
            properties: {
              projectNumber: {
                type: "string",
              },
              team: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          role: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default objectAccessControlsInsert;
