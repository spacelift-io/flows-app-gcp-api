import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const functionsList: AppBlock = {
  name: "Functions - List",
  description: `Returns a list of functions that belong to the requested project.`,
  category: "Functions",
  inputs: {
    default: {
      config: {
        parent: {
          name: "Parent",
          description:
            'Required. The project and location from which the function should be listed, specified in the format `projects/*/locations/*` If you want to list functions in all locations, use "-" in place of a location. When listing functions in all locations, if one or more location(s) are unreachable, the response will contain functions from all reachable locations along with the names of any unreachable locations.',
          type: "string",
          required: true,
        },
        pageSize: {
          name: "Page Size",
          description:
            "Maximum number of functions to return per call. The largest allowed page_size is 1,000, if the page_size is omitted or specified as greater than 1,000 then it will be replaced as 1,000. The size of the list response can be less than specified when used with filters.",
          type: "number",
          required: false,
        },
        pageToken: {
          name: "Page Token",
          description:
            "The value returned by the last `ListFunctionsResponse`; indicates that this is a continuation of a prior `ListFunctions` call, and that the system should return the next page of data.",
          type: "string",
          required: false,
        },
        filter: {
          name: "Filter",
          description:
            "The filter for Functions that match the filter expression, following the syntax outlined in https://google.aip.dev/160.",
          type: "string",
          required: false,
        },
        orderBy: {
          name: "Order By",
          description:
            "The sorting order of the resources returned. Value should be a comma separated list of fields. The default sorting order is ascending. See https://google.aip.dev/132#ordering.",
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
            scopes: ["https://www.googleapis.com/auth/cloud-platform"],
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
        const baseUrl = "https://cloudfunctions.googleapis.com/";
        let path = `v2/{+parent}/functions`;

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
          functions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  additionalProperties: true,
                },
                description: {
                  type: "object",
                  additionalProperties: true,
                },
                buildConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                serviceConfig: {
                  type: "object",
                  additionalProperties: true,
                },
                eventTrigger: {
                  type: "object",
                  additionalProperties: true,
                },
                state: {
                  type: "object",
                  additionalProperties: true,
                },
                updateTime: {
                  type: "object",
                  additionalProperties: true,
                },
                labels: {
                  type: "object",
                  additionalProperties: true,
                },
                stateMessages: {
                  type: "object",
                  additionalProperties: true,
                },
                environment: {
                  type: "object",
                  additionalProperties: true,
                },
                upgradeInfo: {
                  type: "object",
                  additionalProperties: true,
                },
                url: {
                  type: "object",
                  additionalProperties: true,
                },
                kmsKeyName: {
                  type: "object",
                  additionalProperties: true,
                },
                satisfiesPzs: {
                  type: "object",
                  additionalProperties: true,
                },
                createTime: {
                  type: "object",
                  additionalProperties: true,
                },
                satisfiesPzi: {
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
          unreachable: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default functionsList;
