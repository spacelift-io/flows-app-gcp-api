import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const subscriptionsGetIamPolicy: AppBlock = {
  name: "Subscriptions - Get Iam Policy",
  description: `Gets the access control policy for a resource.`,
  category: "Subscriptions",
  inputs: {
    default: {
      config: {
        resource: {
          name: "Resource",
          description:
            "REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.",
          type: "string",
          required: true,
        },
        "options.requestedPolicyVersion": {
          name: "Options RequestedPolicyVersion",
          description:
            "Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).",
          type: "number",
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
            "https://www.googleapis.com/auth/pubsub",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://pubsub.googleapis.com/";
        const path = `v1/{+resource}:getIamPolicy`;
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
          version: {
            type: "number",
          },
          bindings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                condition: {
                  type: "object",
                  additionalProperties: true,
                },
                role: {
                  type: "object",
                  additionalProperties: true,
                },
                members: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              additionalProperties: true,
            },
          },
          etag: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default subscriptionsGetIamPolicy;
