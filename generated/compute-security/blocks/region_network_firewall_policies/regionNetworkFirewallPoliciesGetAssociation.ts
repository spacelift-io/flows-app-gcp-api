import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const regionNetworkFirewallPoliciesGetAssociation: AppBlock = {
  name: "Region Network Firewall Policies - Get Association",
  description: `Gets an association with the specified name.`,
  category: "Region Network Firewall Policies",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description:
            "The name of the association to get from the firewall policy.",
          type: "string",
          required: false,
        },
        firewallPolicy: {
          name: "FirewallPolicy",
          description:
            "Name of the firewall policy to which the queried association belongs.",
          type: "string",
          required: true,
        },
        project: {
          name: "Project",
          description: "Project ID for this request.",
          type: "string",
          required: true,
        },
        region: {
          name: "Region",
          description: "Name of the region scoping this request.",
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
        const path = `projects/{project}/regions/{region}/firewallPolicies/{firewallPolicy}/getAssociation`;
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
          displayName: {
            type: "string",
          },
          name: {
            type: "string",
          },
          firewallPolicyId: {
            type: "string",
          },
          shortName: {
            type: "string",
          },
          attachmentTarget: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default regionNetworkFirewallPoliciesGetAssociation;
