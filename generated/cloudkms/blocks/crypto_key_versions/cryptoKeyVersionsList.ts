import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const cryptoKeyVersionsList: AppBlock = {
  name: "Crypto Key Versions - List",
  description: `Lists CryptoKeyVersions.`,
  category: "Crypto Key Versions",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            "Required. The resource name of the CryptoKey to list, in the format `projects/*/locations/*/keyRings/*/cryptoKeys/*`.",
          type: "string",
          required: true,
        },
        pageSize: {
          name: "Page Size",
          description:
            "Optional. Optional limit on the number of CryptoKeyVersions to include in the response. Further CryptoKeyVersions can subsequently be obtained by including the ListCryptoKeyVersionsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default.",
          type: "number",
          required: false,
        },
        view: {
          name: "View",
          description:
            "The fields to include in the response. Valid values: CRYPTO_KEY_VERSION_VIEW_UNSPECIFIED, FULL",
          type: "string",
          required: false,
        },
        pageToken: {
          name: "Page Token",
          description:
            "Optional. Optional pagination token, returned earlier via ListCryptoKeyVersionsResponse.next_page_token.",
          type: "string",
          required: false,
        },
        filter: {
          name: "Filter",
          description:
            "Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).",
          type: "string",
          required: false,
        },
        orderBy: {
          name: "Order By",
          description:
            "Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).",
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
              "https://www.googleapis.com/auth/cloudkms",
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
        const baseUrl = "https://cloudkms.googleapis.com/";
        let path = `v1/{+parent}/cryptoKeyVersions`;

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
          nextPageToken: {
            type: "string",
          },
          cryptoKeyVersions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                attestation: {
                  type: "object",
                  additionalProperties: true,
                },
                reimportEligible: {
                  type: "object",
                  additionalProperties: true,
                },
                externalDestructionFailureReason: {
                  type: "object",
                  additionalProperties: true,
                },
                algorithm: {
                  type: "object",
                  additionalProperties: true,
                },
                protectionLevel: {
                  type: "object",
                  additionalProperties: true,
                },
                generateTime: {
                  type: "object",
                  additionalProperties: true,
                },
                importTime: {
                  type: "object",
                  additionalProperties: true,
                },
                externalProtectionLevelOptions: {
                  type: "object",
                  additionalProperties: true,
                },
                importFailureReason: {
                  type: "object",
                  additionalProperties: true,
                },
                generationFailureReason: {
                  type: "object",
                  additionalProperties: true,
                },
                importJob: {
                  type: "object",
                  additionalProperties: true,
                },
                state: {
                  type: "object",
                  additionalProperties: true,
                },
                destroyTime: {
                  type: "object",
                  additionalProperties: true,
                },
                destroyEventTime: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                createTime: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          totalSize: {
            type: "number",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default cryptoKeyVersionsList;
