import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const globalPublicDelegatedPrefixesGet: AppBlock = {
  name: "Global Public Delegated Prefixes - Get",
  description: `Returns the specified global PublicDelegatedPrefix resource.`,
  category: "Global Public Delegated Prefixes",
  inputs: {
    default: {
      config: {
        publicDelegatedPrefix: {
          name: "Public Delegated Prefix",
          description: "Name of the PublicDelegatedPrefix resource to return.",
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
              "https://www.googleapis.com/auth/compute",
              "https://www.googleapis.com/auth/compute.readonly",
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
        let path = `projects/{project}/global/publicDelegatedPrefixes/{publicDelegatedPrefix}`;

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
          isLiveMigration: {
            type: "boolean",
          },
          byoipApiVersion: {
            type: "string",
            enum: ["V1", "V2"],
          },
          mode: {
            type: "string",
            enum: [
              "DELEGATION",
              "EXTERNAL_IPV6_FORWARDING_RULE_CREATION",
              "EXTERNAL_IPV6_SUBNETWORK_CREATION",
              "INTERNAL_IPV6_SUBNETWORK_CREATION",
            ],
          },
          selfLink: {
            type: "string",
          },
          publicDelegatedSubPrefixs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                delegateeProject: {
                  type: "object",
                  additionalProperties: true,
                },
                ipCidrRange: {
                  type: "object",
                  additionalProperties: true,
                },
                status: {
                  type: "object",
                  additionalProperties: true,
                },
                region: {
                  type: "object",
                  additionalProperties: true,
                },
                allocatablePrefixLength: {
                  type: "object",
                  additionalProperties: true,
                },
                isAddress: {
                  type: "object",
                  additionalProperties: true,
                },
                mode: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
                ipv6AccessType: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          status: {
            type: "string",
            enum: [
              "ACTIVE",
              "ANNOUNCED",
              "ANNOUNCED_TO_GOOGLE",
              "ANNOUNCED_TO_INTERNET",
              "DELETING",
              "INITIALIZING",
              "READY_TO_ANNOUNCE",
            ],
          },
          ipCidrRange: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          name: {
            type: "string",
          },
          fingerprint: {
            type: "string",
          },
          region: {
            type: "string",
          },
          description: {
            type: "string",
          },
          parentPrefix: {
            type: "string",
          },
          id: {
            type: "string",
          },
          allocatablePrefixLength: {
            type: "number",
          },
          ipv6AccessType: {
            type: "string",
            enum: ["EXTERNAL", "INTERNAL"],
          },
          creationTimestamp: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default globalPublicDelegatedPrefixesGet;
