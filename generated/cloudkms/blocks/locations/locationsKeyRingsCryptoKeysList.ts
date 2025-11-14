import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const locationsKeyRingsCryptoKeysList: AppBlock = {
  name: "Locations - List",
  description: `Lists CryptoKeys.`,
  category: "Locations",
  inputs: {
    default: {
      config: {
        pageSize: {
          name: "PageSize",
          description:
            "Optional. Optional limit on the number of CryptoKeys to include in the response. Further CryptoKeys can subsequently be obtained by including the ListCryptoKeysResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default.",
          type: "number",
          required: false,
        },
        parent: {
          name: "Parent",
          description:
            "Required. The resource name of the KeyRing to list, in the format `projects/*/locations/*/keyRings/*`.",
          type: "string",
          required: true,
        },
        orderBy: {
          name: "OrderBy",
          description:
            "Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).",
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
        versionView: {
          name: "VersionView",
          description:
            "The fields of the primary version to include in the response. Valid values: CRYPTO_KEY_VERSION_VIEW_UNSPECIFIED, FULL",
          type: "string",
          required: false,
        },
        pageToken: {
          name: "PageToken",
          description:
            "Optional. Optional pagination token, returned earlier via ListCryptoKeysResponse.next_page_token.",
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
            "https://www.googleapis.com/auth/cloudkms",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://cloudkms.googleapis.com/";
        const path = `v1/{+parent}/cryptoKeys`;
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
          totalSize: {
            type: "number",
          },
          cryptoKeys: {
            type: "array",
            items: {
              type: "object",
              properties: {
                createTime: {
                  type: "object",
                  additionalProperties: true,
                },
                primary: {
                  type: "object",
                  additionalProperties: true,
                },
                purpose: {
                  type: "object",
                  additionalProperties: true,
                },
                importOnly: {
                  type: "object",
                  additionalProperties: true,
                },
                nextRotationTime: {
                  type: "object",
                  additionalProperties: true,
                },
                destroyScheduledDuration: {
                  type: "object",
                  additionalProperties: true,
                },
                versionTemplate: {
                  type: "object",
                  additionalProperties: true,
                },
                rotationPeriod: {
                  type: "object",
                  additionalProperties: true,
                },
                keyAccessJustificationsPolicy: {
                  type: "object",
                  additionalProperties: true,
                },
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                cryptoKeyBackend: {
                  type: "object",
                  additionalProperties: true,
                },
                labels: {
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

export default locationsKeyRingsCryptoKeysList;
