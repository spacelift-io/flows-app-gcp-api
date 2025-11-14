import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesGetShieldedInstanceIdentity: AppBlock = {
  name: "Instances - Get Shielded Instance Identity",
  description: `Returns the Shielded Instance Identity of an instance`,
  category: "Instances",
  inputs: {
    default: {
      config: {
        instance: {
          name: "Instance",
          description: "Name or id of the instance scoping this request.",
          type: "string",
          required: true,
        },
        zone: {
          name: "Zone",
          description: "The name of the zone for this request.",
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
        const path = `projects/{project}/zones/{zone}/instances/{instance}/getShieldedInstanceIdentity`;
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
          eccP256EncryptionKey: {
            type: "object",
            properties: {
              ekPub: {
                type: "string",
              },
              ekCert: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          kind: {
            type: "string",
          },
          eccP256SigningKey: {
            type: "object",
            properties: {
              ekPub: {
                type: "string",
              },
              ekCert: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          encryptionKey: {
            type: "object",
            properties: {
              ekPub: {
                type: "string",
              },
              ekCert: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          signingKey: {
            type: "object",
            properties: {
              ekPub: {
                type: "string",
              },
              ekCert: {
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

export default instancesGetShieldedInstanceIdentity;
