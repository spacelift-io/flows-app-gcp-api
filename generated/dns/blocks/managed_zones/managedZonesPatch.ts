import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const managedZonesPatch: AppBlock = {
  name: "Managed Zones - Patch",
  description: `Applies a partial update to an existing ManagedZone.`,
  category: "Managed Zones",
  inputs: {
    default: {
      config: {
        managedZone: {
          name: "Managed Zone",
          description:
            "Identifies the managed zone addressed by this request. Can be the managed zone name or ID.",
          type: "string",
          required: true,
        },
        clientOperationId: {
          name: "Client Operation ID",
          description:
            "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
          type: "string",
          required: false,
        },
        privateVisibilityConfig: {
          name: "Private Visibility Config",
          description:
            "For privately visible zones, the set of Virtual Private Cloud resources that the zone is visible from.",
          type: {
            type: "object",
            properties: {
              gkeClusters: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              kind: {
                type: "string",
              },
              networks: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        description: {
          name: "Description",
          description:
            "A mutable string of at most 1024 characters associated with this resource for the user's convenience.",
          type: "string",
          required: false,
        },
        dnssecConfig: {
          name: "DNSSEC Config",
          description: "DNSSEC configuration.",
          type: {
            type: "object",
            properties: {
              state: {
                type: "string",
                enum: ["off", "on", "transfer"],
              },
              defaultKeySpecs: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              kind: {
                type: "string",
              },
              nonExistence: {
                type: "string",
                enum: ["nsec", "nsec3"],
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        cloudLoggingConfig: {
          name: "Cloud Logging Config",
          description: "Request body field: cloudLoggingConfig",
          type: {
            type: "object",
            properties: {
              enableLogging: {
                type: "boolean",
              },
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        creationTime: {
          name: "Creation Time",
          description: "The time that this resource was created on the server.",
          type: "string",
          required: false,
        },
        nameServers: {
          name: "Name Servers",
          description:
            "Delegate your managed_zone to these virtual name servers; defined by the server (output only)",
          type: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        dnsName: {
          name: "DNS Name",
          description:
            'The DNS name of this managed zone, for instance "example.',
          type: "string",
          required: false,
        },
        serviceDirectoryConfig: {
          name: "Service Directory Config",
          description:
            "This field links to the associated service directory namespace.",
          type: {
            type: "object",
            properties: {
              namespace: {
                type: "object",
                properties: {
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                  namespaceUrl: {
                    type: "object",
                    additionalProperties: true,
                  },
                  deletionTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        visibility: {
          name: "Visibility",
          description:
            "The zone's visibility: public zones are exposed to the Internet, while private zones are visible only to Virtual Private Cloud resources.",
          type: "string",
          required: false,
        },
        name: {
          name: "Name",
          description: "User assigned name for this resource.",
          type: "string",
          required: false,
        },
        id: {
          name: "ID",
          description:
            "Unique identifier for the resource; defined by the server (output only)",
          type: "string",
          required: false,
        },
        labels: {
          name: "Labels",
          description: "User labels.",
          type: {
            type: "object",
            additionalProperties: true,
          },
          required: false,
        },
        reverseLookupConfig: {
          name: "Reverse Lookup Config",
          description:
            "The presence of this field indicates that this is a managed reverse lookup zone and Cloud DNS resolves reverse lookup queries using automatically configured records for VPC resources.",
          type: {
            type: "object",
            properties: {
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        nameServerSet: {
          name: "Name Server Set",
          description:
            "Optionally specifies the NameServerSet for this ManagedZone.",
          type: "string",
          required: false,
        },
        peeringConfig: {
          name: "Peering Config",
          description:
            "The presence of this field indicates that DNS Peering is enabled for this zone.",
          type: {
            type: "object",
            properties: {
              targetNetwork: {
                type: "object",
                properties: {
                  deactivateTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  kind: {
                    type: "object",
                    additionalProperties: true,
                  },
                  networkUrl: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                additionalProperties: true,
              },
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        forwardingConfig: {
          name: "Forwarding Config",
          description:
            "The presence for this field indicates that outbound forwarding is enabled for this zone.",
          type: {
            type: "object",
            properties: {
              targetNameServers: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              kind: {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          required: false,
        },
        kind: {
          name: "Kind",
          description: "Request body field: kind",
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
        let path = `dns/v1/projects/{project}/managedZones/{managedZone}`;

        // Replace project placeholders with config value
        path = path.replace(
          /\{\+?project(s|Id)?\}/g,
          input.app.config.projectId,
        );

        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        // Assemble request body from individual inputs
        const requestBody: Record<string, any> = {};

        if (input.event.inputConfig.privateVisibilityConfig !== undefined)
          requestBody.privateVisibilityConfig =
            input.event.inputConfig.privateVisibilityConfig;
        if (input.event.inputConfig.description !== undefined)
          requestBody.description = input.event.inputConfig.description;
        if (input.event.inputConfig.dnssecConfig !== undefined)
          requestBody.dnssecConfig = input.event.inputConfig.dnssecConfig;
        if (input.event.inputConfig.cloudLoggingConfig !== undefined)
          requestBody.cloudLoggingConfig =
            input.event.inputConfig.cloudLoggingConfig;
        if (input.event.inputConfig.creationTime !== undefined)
          requestBody.creationTime = input.event.inputConfig.creationTime;
        if (input.event.inputConfig.nameServers !== undefined)
          requestBody.nameServers = input.event.inputConfig.nameServers;
        if (input.event.inputConfig.dnsName !== undefined)
          requestBody.dnsName = input.event.inputConfig.dnsName;
        if (input.event.inputConfig.serviceDirectoryConfig !== undefined)
          requestBody.serviceDirectoryConfig =
            input.event.inputConfig.serviceDirectoryConfig;
        if (input.event.inputConfig.visibility !== undefined)
          requestBody.visibility = input.event.inputConfig.visibility;
        if (input.event.inputConfig.name !== undefined)
          requestBody.name = input.event.inputConfig.name;
        if (input.event.inputConfig.id !== undefined)
          requestBody.id = input.event.inputConfig.id;
        if (input.event.inputConfig.labels !== undefined)
          requestBody.labels = input.event.inputConfig.labels;
        if (input.event.inputConfig.reverseLookupConfig !== undefined)
          requestBody.reverseLookupConfig =
            input.event.inputConfig.reverseLookupConfig;
        if (input.event.inputConfig.nameServerSet !== undefined)
          requestBody.nameServerSet = input.event.inputConfig.nameServerSet;
        if (input.event.inputConfig.peeringConfig !== undefined)
          requestBody.peeringConfig = input.event.inputConfig.peeringConfig;
        if (input.event.inputConfig.forwardingConfig !== undefined)
          requestBody.forwardingConfig =
            input.event.inputConfig.forwardingConfig;
        if (input.event.inputConfig.kind !== undefined)
          requestBody.kind = input.event.inputConfig.kind;

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
          dnsKeyContext: {
            type: "object",
            properties: {
              newValue: {
                type: "object",
                additionalProperties: true,
              },
              oldValue: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          zoneContext: {
            type: "object",
            properties: {
              oldValue: {
                type: "object",
                additionalProperties: true,
              },
              newValue: {
                type: "object",
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
          kind: {
            type: "string",
          },
          startTime: {
            type: "string",
          },
          type: {
            type: "string",
          },
          id: {
            type: "string",
          },
          user: {
            type: "string",
          },
          status: {
            type: "string",
            enum: ["pending", "done"],
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default managedZonesPatch;
