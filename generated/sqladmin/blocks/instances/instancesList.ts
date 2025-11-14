import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesList: AppBlock = {
  name: "Instances - List",
  description: `Lists instances under a given project.`,
  category: "Instances",
  inputs: {
    default: {
      config: {
        filter: {
          name: "Filter",
          description:
            "A filter expression that filters resources listed in the response. The expression is in the form of field:value. For example, 'instanceType:CLOUD_SQL_INSTANCE'. Fields can be nested as needed as per their JSON representation, such as 'settings.userLabels.auto_start:true'. Multiple filter queries are space-separated. For example. 'state:RUNNABLE instanceType:CLOUD_SQL_INSTANCE'. By default, each expression is an AND expression. However, you can include AND and OR expressions explicitly.",
          type: "string",
          required: false,
        },
        maxResults: {
          name: "Max Results",
          description:
            "The maximum number of instances to return. The service may return fewer than this value. If unspecified, at most 500 instances are returned. The maximum value is 1000; values above 1000 are coerced to 1000.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "Page Token",
          description:
            "A previously-returned page token representing part of the larger set of results to view.",
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
        let path = `v1/projects/{project}/instances`;

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
          kind: {
            type: "string",
          },
          warnings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                code: {
                  type: "object",
                  additionalProperties: true,
                },
                message: {
                  type: "object",
                  additionalProperties: true,
                },
                region: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                kind: {
                  type: "object",
                  additionalProperties: true,
                },
                state: {
                  type: "object",
                  additionalProperties: true,
                },
                databaseVersion: {
                  type: "object",
                  additionalProperties: true,
                },
                settings: {
                  type: "object",
                  additionalProperties: true,
                },
                etag: {
                  type: "object",
                  additionalProperties: true,
                },
                failoverReplica: {
                  type: "object",
                  additionalProperties: true,
                },
                masterInstanceName: {
                  type: "object",
                  additionalProperties: true,
                },
                replicaNames: {
                  type: "object",
                  additionalProperties: true,
                },
                maxDiskSize: {
                  type: "object",
                  additionalProperties: true,
                },
                currentDiskSize: {
                  type: "object",
                  additionalProperties: true,
                },
                ipAddresses: {
                  type: "object",
                  additionalProperties: true,
                },
                serverCaCert: {
                  type: "object",
                  additionalProperties: true,
                },
                instanceType: {
                  type: "object",
                  additionalProperties: true,
                },
                project: {
                  type: "object",
                  additionalProperties: true,
                },
                ipv6Address: {
                  type: "object",
                  additionalProperties: true,
                },
                serviceAccountEmailAddress: {
                  type: "object",
                  additionalProperties: true,
                },
                onPremisesConfiguration: {
                  type: "object",
                  additionalProperties: true,
                },
                replicaConfiguration: {
                  type: "object",
                  additionalProperties: true,
                },
                backendType: {
                  type: "object",
                  additionalProperties: true,
                },
                selfLink: {
                  type: "object",
                  additionalProperties: true,
                },
                suspensionReason: {
                  type: "object",
                  additionalProperties: true,
                },
                connectionName: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                region: {
                  type: "object",
                  additionalProperties: true,
                },
                gceZone: {
                  type: "object",
                  additionalProperties: true,
                },
                secondaryGceZone: {
                  type: "object",
                  additionalProperties: true,
                },
                diskEncryptionConfiguration: {
                  type: "object",
                  additionalProperties: true,
                },
                diskEncryptionStatus: {
                  type: "object",
                  additionalProperties: true,
                },
                rootPassword: {
                  type: "object",
                  additionalProperties: true,
                },
                scheduledMaintenance: {
                  type: "object",
                  additionalProperties: true,
                },
                satisfiesPzs: {
                  type: "object",
                  additionalProperties: true,
                },
                databaseInstalledVersion: {
                  type: "object",
                  additionalProperties: true,
                },
                outOfDiskReport: {
                  type: "object",
                  additionalProperties: true,
                },
                createTime: {
                  type: "object",
                  additionalProperties: true,
                },
                availableMaintenanceVersions: {
                  type: "object",
                  additionalProperties: true,
                },
                maintenanceVersion: {
                  type: "object",
                  additionalProperties: true,
                },
                upgradableDatabaseVersions: {
                  type: "object",
                  additionalProperties: true,
                },
                sqlNetworkArchitecture: {
                  type: "object",
                  additionalProperties: true,
                },
                pscServiceAttachmentLink: {
                  type: "object",
                  additionalProperties: true,
                },
                dnsName: {
                  type: "object",
                  additionalProperties: true,
                },
                primaryDnsName: {
                  type: "object",
                  additionalProperties: true,
                },
                writeEndpoint: {
                  type: "object",
                  additionalProperties: true,
                },
                replicationCluster: {
                  type: "object",
                  additionalProperties: true,
                },
                geminiConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                satisfiesPzi: {
                  type: "object",
                  additionalProperties: true,
                },
                switchTransactionLogsToCloudStorageEnabled: {
                  type: "object",
                  additionalProperties: true,
                },
                includeReplicasForMajorVersionUpgrade: {
                  type: "object",
                  additionalProperties: true,
                },
                tags: {
                  type: "object",
                  additionalProperties: true,
                },
                nodeCount: {
                  type: "object",
                  additionalProperties: true,
                },
                nodes: {
                  type: "object",
                  additionalProperties: true,
                },
                dnsNames: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          nextPageToken: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default instancesList;
