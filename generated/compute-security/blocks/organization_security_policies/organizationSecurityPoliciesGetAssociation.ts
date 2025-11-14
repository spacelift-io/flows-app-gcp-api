import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const organizationSecurityPoliciesGetAssociation: AppBlock = {
  name: "Organization Security Policies - Get Association",
  description: `Gets an association with the specified name.`,
  category: "Organization Security Policies",
  inputs: {
    default: {
      config: {
        securityPolicy: {
          name: "SecurityPolicy",
          description:
            "Name of the security policy to which the queried rule belongs.",
          type: "string",
          required: true,
        },
        name: {
          name: "Name",
          description:
            "The name of the association to get from the security policy.",
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
            "https://www.googleapis.com/auth/compute",
            "https://www.googleapis.com/auth/compute.readonly",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        const path = `locations/global/securityPolicies/{securityPolicy}/getAssociation`;
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
              type: "string",
            },
          },
          excludedFolders: {
            type: "array",
            items: {
              type: "string",
            },
          },
          displayName: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default organizationSecurityPoliciesGetAssociation;
