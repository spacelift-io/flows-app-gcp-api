import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const sslCertificatesGet: AppBlock = {
  name: "Ssl Certificates - Get",
  description: `Returns the specified SslCertificate resource.`,
  category: "Ssl Certificates",
  inputs: {
    default: {
      config: {
        sslCertificate: {
          name: "SslCertificate",
          description: "Name of the SslCertificate resource to return.",
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
        const path = `projects/{project}/global/sslCertificates/{sslCertificate}`;
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
          creationTimestamp: {
            type: "string",
          },
          type: {
            type: "string",
            enum: ["MANAGED", "SELF_MANAGED", "TYPE_UNSPECIFIED"],
          },
          managed: {
            type: "object",
            properties: {
              status: {
                type: "string",
                enum: [
                  "ACTIVE",
                  "MANAGED_CERTIFICATE_STATUS_UNSPECIFIED",
                  "PROVISIONING",
                  "PROVISIONING_FAILED",
                  "PROVISIONING_FAILED_PERMANENTLY",
                  "RENEWAL_FAILED",
                ],
              },
              domains: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              domainStatus: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          name: {
            type: "string",
          },
          subjectAlternativeNames: {
            type: "array",
            items: {
              type: "string",
            },
          },
          expireTime: {
            type: "string",
          },
          selfManaged: {
            type: "object",
            properties: {
              privateKey: {
                type: "string",
              },
              certificate: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          kind: {
            type: "string",
          },
          privateKey: {
            type: "string",
          },
          region: {
            type: "string",
          },
          id: {
            type: "string",
          },
          description: {
            type: "string",
          },
          selfLink: {
            type: "string",
          },
          certificate: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default sslCertificatesGet;
