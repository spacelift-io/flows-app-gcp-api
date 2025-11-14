import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const get: AppBlock = {
  name: "Get - Get",
  description: `Fetches the representation of an existing Project.`,
  category: "Get",
  inputs: {
    default: {
      config: {
        project: {
          name: "Project",
          description: "Identifies the project addressed by this request.",
          type: "string",
          required: true,
        },
        clientOperationId: {
          name: "ClientOperationId",
          description:
            "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
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
            "https://www.googleapis.com/auth/cloud-platform.read-only",
            "https://www.googleapis.com/auth/ndev.clouddns.readonly",
            "https://www.googleapis.com/auth/ndev.clouddns.readwrite",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://dns.googleapis.com/";
        const path = `dns/v1/projects/{project}`;
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
          quota: {
            type: "object",
            properties: {
              gkeClustersPerManagedZone: {
                type: "number",
              },
              rrsetsPerManagedZone: {
                type: "number",
              },
              networksPerManagedZone: {
                type: "number",
              },
              rrsetDeletionsPerChange: {
                type: "number",
              },
              gkeClustersPerResponsePolicy: {
                type: "number",
              },
              managedZones: {
                type: "number",
              },
              responsePolicyRulesPerResponsePolicy: {
                type: "number",
              },
              targetNameServersPerManagedZone: {
                type: "number",
              },
              rrsetAdditionsPerChange: {
                type: "number",
              },
              managedZonesPerGkeCluster: {
                type: "number",
              },
              dnsKeysPerManagedZone: {
                type: "number",
              },
              nameserversPerDelegation: {
                type: "number",
              },
              peeringZonesPerTargetNetwork: {
                type: "number",
              },
              resourceRecordsPerRrset: {
                type: "number",
              },
              responsePolicies: {
                type: "number",
              },
              networksPerPolicy: {
                type: "number",
              },
              whitelistedKeySpecs: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              gkeClustersPerPolicy: {
                type: "number",
              },
              totalRrdataSizePerChange: {
                type: "number",
              },
              itemsPerRoutingPolicy: {
                type: "number",
              },
              networksPerResponsePolicy: {
                type: "number",
              },
              targetNameServersPerPolicy: {
                type: "number",
              },
              policies: {
                type: "number",
              },
              managedZonesPerNetwork: {
                type: "number",
              },
              internetHealthChecksPerManagedZone: {
                type: "number",
              },
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          id: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          number: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default get;
