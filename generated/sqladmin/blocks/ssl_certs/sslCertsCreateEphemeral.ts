import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const sslCertsCreateEphemeral: AppBlock = {
  name: "Ssl Certs - Create Ephemeral",
  description: `Generates a short-lived X509 certificate containing the provided public key and signed by a private key specific to the target instance.`,
  category: "Ssl Certs",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Project ID of the Cloud SQL project.",
          type: "string",
          required: true,
        },
        instance: {
          name: "Instance",
          description:
            "Cloud SQL instance ID. This does not include the project ID.",
          type: "string",
          required: true,
        },
        requestBody: {
          name: "Request Body",
          description: "SslCerts create ephemeral certificate request.",
          type: {
            type: "object",
            properties: {
              public_key: {
                type: "string",
              },
              access_token: {
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
            "https://www.googleapis.com/auth/sqlservice.admin",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://sqladmin.googleapis.com/";
        const path = `v1/projects/{project}/instances/{instance}/createEphemeral`;
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
  },
};

export default sslCertsCreateEphemeral;
