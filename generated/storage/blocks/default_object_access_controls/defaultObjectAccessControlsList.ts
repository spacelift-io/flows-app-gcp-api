import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const defaultObjectAccessControlsList: AppBlock = {
  name: "Default Object Access Controls - List",
  description: `Retrieves default object ACL entries on the specified bucket.`,
  category: "Default Object Access Controls",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "Name of a bucket.",
          type: "string",
          required: true,
        },
        ifMetagenerationMatch: {
          name: "IfMetagenerationMatch",
          description:
            "If present, only return default ACL listing if the bucket's current metageneration matches this value.",
          type: "string",
          required: false,
        },
        ifMetagenerationNotMatch: {
          name: "IfMetagenerationNotMatch",
          description:
            "If present, only return default ACL listing if the bucket's current metageneration does not match the given value.",
          type: "string",
          required: false,
        },
        userProject: {
          name: "UserProject",
          description:
            "The project to be billed for this request. Required for Requester Pays buckets.",
          type: "string",
          required: false,
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
        const path = `b/{bucket}/defaultObjectAcl`;
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
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                bucket: {
                  type: "object",
                  additionalProperties: true,
                },
                domain: {
                  type: "object",
                  additionalProperties: true,
                },
                email: {
                  type: "object",
                  additionalProperties: true,
                },
                entity: {
                  type: "object",
                  additionalProperties: true,
                },
                entityId: {
                  type: "object",
                  additionalProperties: true,
                },
                etag: {
                  type: "object",
                  additionalProperties: true,
                },
                generation: {
                  type: "object",
                  additionalProperties: true,
                },
                id: {
                  type: "object",
                  additionalProperties: true,
                },
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                object: {
                  type: "object",
                  additionalProperties: true,
                },
                projectTeam: {
                  type: "object",
                  additionalProperties: true,
                },
                role: {
                  type: "object",
                  additionalProperties: true,
                },
                selfLink: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          kind: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default defaultObjectAccessControlsList;
