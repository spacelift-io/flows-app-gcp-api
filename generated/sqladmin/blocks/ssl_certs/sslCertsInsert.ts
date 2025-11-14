import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const sslCertsInsert: AppBlock = {
  name: "SSL Certs - Insert",
  description: `Creates an SSL certificate and returns it along with the private key and server certificate authority.`,
  category: "SSL Certs",
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
        commonName: {
          name: "Common Name",
          description: "User supplied name.",
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
        let path = `v1/projects/{project}/instances/{instance}/sslCerts`;

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

        if (input.event.inputConfig.commonName !== undefined)
          requestBody.commonName = input.event.inputConfig.commonName;

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
          kind: {
            type: "string",
          },
          operation: {
            type: "object",
            properties: {
              kind: {
                type: "string",
              },
              targetLink: {
                type: "string",
              },
              status: {
                type: "string",
                enum: [
                  "SQL_OPERATION_STATUS_UNSPECIFIED",
                  "PENDING",
                  "RUNNING",
                  "DONE",
                ],
              },
              user: {
                type: "string",
              },
              insertTime: {
                type: "string",
              },
              startTime: {
                type: "string",
              },
              endTime: {
                type: "string",
              },
              error: {
                type: "object",
                additionalProperties: true,
              },
              apiWarning: {
                type: "object",
                additionalProperties: true,
              },
              operationType: {
                type: "string",
                enum: [
                  "SQL_OPERATION_TYPE_UNSPECIFIED",
                  "IMPORT",
                  "EXPORT",
                  "CREATE",
                  "UPDATE",
                  "DELETE",
                  "RESTART",
                  "BACKUP",
                  "SNAPSHOT",
                  "BACKUP_VOLUME",
                  "DELETE_VOLUME",
                  "RESTORE_VOLUME",
                  "INJECT_USER",
                  "CLONE",
                  "STOP_REPLICA",
                  "START_REPLICA",
                  "PROMOTE_REPLICA",
                  "CREATE_REPLICA",
                  "CREATE_USER",
                  "DELETE_USER",
                  "UPDATE_USER",
                  "CREATE_DATABASE",
                  "DELETE_DATABASE",
                  "UPDATE_DATABASE",
                  "FAILOVER",
                  "DELETE_BACKUP",
                  "RECREATE_REPLICA",
                  "TRUNCATE_LOG",
                  "DEMOTE_MASTER",
                  "MAINTENANCE",
                  "ENABLE_PRIVATE_IP",
                  "DEFER_MAINTENANCE",
                  "CREATE_CLONE",
                  "RESCHEDULE_MAINTENANCE",
                  "START_EXTERNAL_SYNC",
                  "LOG_CLEANUP",
                  "AUTO_RESTART",
                  "REENCRYPT",
                  "SWITCHOVER",
                  "UPDATE_BACKUP",
                  "ACQUIRE_SSRS_LEASE",
                  "RELEASE_SSRS_LEASE",
                  "RECONFIGURE_OLD_PRIMARY",
                  "CLUSTER_MAINTENANCE",
                  "SELF_SERVICE_MAINTENANCE",
                  "SWITCHOVER_TO_REPLICA",
                  "MAJOR_VERSION_UPGRADE",
                  "ADVANCED_BACKUP",
                  "MANAGE_BACKUP",
                  "ENHANCED_BACKUP",
                  "REPAIR_READ_POOL",
                  "CREATE_READ_POOL",
                ],
              },
              importContext: {
                type: "object",
                additionalProperties: true,
              },
              exportContext: {
                type: "object",
                additionalProperties: true,
              },
              backupContext: {
                type: "object",
                additionalProperties: true,
              },
              preCheckMajorVersionUpgradeContext: {
                type: "object",
                additionalProperties: true,
              },
              name: {
                type: "string",
              },
              targetId: {
                type: "string",
              },
              selfLink: {
                type: "string",
              },
              targetProject: {
                type: "string",
              },
              acquireSsrsLeaseContext: {
                type: "object",
                additionalProperties: true,
              },
              subOperationType: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          serverCaCert: {
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
          clientCert: {
            type: "object",
            properties: {
              certInfo: {
                type: "object",
                additionalProperties: true,
              },
              certPrivateKey: {
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

export default sslCertsInsert;
