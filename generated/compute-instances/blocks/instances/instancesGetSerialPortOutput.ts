import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesGetSerialPortOutput: AppBlock = {
  name: "Instances - Get Serial Port Output",
  description: `Returns the last 1 MB of serial port output from the specified instance.`,
  category: "Instances",
  inputs: {
    default: {
      config: {
        zone: {
          name: "Zone",
          description: "The name of the zone for this request.",
          type: "string",
          required: true,
        },
        instance: {
          name: "Instance",
          description: "Name of the instance for this request.",
          type: "string",
          required: true,
        },
        start: {
          name: "Start",
          description:
            "Specifies the starting byte position of the output to return. To start with\nthe first byte of output to the specified port, omit this field or set it\nto `0`.\n\nIf the output for that byte position is available, this field matches the\n`start` parameter sent with the request. If the amount of serial console\noutput exceeds the size of the buffer (1 MB), the oldest output is\ndiscarded and is no longer available. If the requested start position\nrefers to discarded output, the start position is adjusted to the oldest\noutput still available, and the adjusted start position is returned as the\n`start` property value.\n\nYou can also provide a negative start position, which translates to the\nmost recent number of bytes written to the serial port. For example, -3 is\ninterpreted as the most recent 3 bytes written to the serial console. Note\nthat the negative start is bounded by the retained buffer size, and the\nreturned serial console output will not exceed the max buffer size.",
          type: "string",
          required: false,
        },
        port: {
          name: "Port",
          description:
            "Specifies which COM or serial port to retrieve data from.",
          type: "number",
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
              "https://www.googleapis.com/auth/compute",
              "https://www.googleapis.com/auth/compute.readonly",
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
        const baseUrl = "https://compute.googleapis.com/compute/v1/";
        let path = `projects/{project}/zones/{zone}/instances/{instance}/serialPort`;

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
          selfLink: {
            type: "string",
          },
          contents: {
            type: "string",
          },
          next: {
            type: "string",
          },
          start: {
            type: "string",
          },
        },
        additionalProperties: true,
      },
    },
  },
};

export default instancesGetSerialPortOutput;
