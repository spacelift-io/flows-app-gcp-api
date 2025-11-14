import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const get: AppBlock = {
  name: "Operations - Get",
  description: `Fetches the representation of an existing Project.`,
  category: "Operations",
  inputs: {
    default: {
      config: {
        clientOperationId: {
          name: "Client Operation ID",
          description:
            "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
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
              "https://www.googleapis.com/auth/cloud-platform.read-only",
              "https://www.googleapis.com/auth/ndev.clouddns.readonly",
              "https://www.googleapis.com/auth/ndev.clouddns.readwrite",
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
        const baseUrl = "https://dns.googleapis.com/";
        let path = `dns/v1/projects/{project}`;

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
