import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const connectGenerateEphemeralCert: AppBlock = {
  name: "Connect - Generate Ephemeral Cert",
  description: `Generates a short-lived X509 certificate containing the provided public key and signed by a private key specific to the target instance.`,
  category: "Connect",
  inputs: {
    default: {
      config: {
        instance: {
          name: "Instance",
          description:
            "Cloud SQL instance ID. This does not include the project ID.",
          type: "string",
          required: true,
        },
        public_key: {
          name: "Public_key",
          description:
            "PEM encoded public key to include in the signed certificate.",
          type: "string",
          required: false,
        },
        access_token: {
          name: "Access_token",
          description: "Optional.",
          type: "string",
          required: false,
        },
        readTime: {
          name: "Read Time",
          description: "Optional.",
          type: "string",
          required: false,
        },
        validDuration: {
          name: "Valid Duration",
          description: "Optional.",
          type: "string",
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
              "https://www.googleapis.com/auth/sqlservice.admin",
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
        const baseUrl = "https://sqladmin.googleapis.com/";
        let path = `v1/projects/{project}/instances/{instance}:generateEphemeralCert`;

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

        if (input.event.inputConfig.public_key !== undefined)
          requestBody.public_key = input.event.inputConfig.public_key;
        if (input.event.inputConfig.access_token !== undefined)
          requestBody.access_token = input.event.inputConfig.access_token;
        if (input.event.inputConfig.readTime !== undefined)
          requestBody.readTime = input.event.inputConfig.readTime;
        if (input.event.inputConfig.validDuration !== undefined)
          requestBody.validDuration = input.event.inputConfig.validDuration;

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
          ephemeralCert: {
            type: "object",
            properties: {
              kind: {
                type: "string",
              },
              certSerialNumber: {
                type: "string",
              },
              cert: {
                type: "string",
              },
              createTime: {
                type: "string",
              },
              commonName: {
                type: "string",
              },
              expirationTime: {
                type: "string",
              },
              sha1Fingerprint: {
                type: "string",
              },
              instance: {
                type: "string",
              },
              selfLink: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default connectGenerateEphemeralCert;
