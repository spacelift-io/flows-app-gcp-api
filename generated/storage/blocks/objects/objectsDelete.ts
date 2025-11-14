import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const objectsDelete: AppBlock = {
  name: "Objects - Delete",
  description: `Deletes an object and its metadata.`,
  category: "Objects",
  inputs: {
    default: {
      config: {
        bucket: {
          name: "Bucket",
          description: "Name of the bucket in which the object resides.",
          type: "string",
          required: true,
        },
        generation: {
          name: "Generation",
          description:
            "If present, permanently deletes a specific revision of this object (as opposed to the latest version, the default).",
          type: "string",
          required: false,
        },
        ifGenerationMatch: {
          name: "IfGenerationMatch",
          description:
            "Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.",
          type: "string",
          required: false,
        },
        ifGenerationNotMatch: {
          name: "IfGenerationNotMatch",
          description:
            "Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.",
          type: "string",
          required: false,
        },
        ifMetagenerationMatch: {
          name: "IfMetagenerationMatch",
          description:
            "Makes the operation conditional on whether the object's current metageneration matches the given value.",
          type: "string",
          required: false,
        },
        ifMetagenerationNotMatch: {
          name: "IfMetagenerationNotMatch",
          description:
            "Makes the operation conditional on whether the object's current metageneration does not match the given value.",
          type: "string",
          required: false,
        },
        object: {
          name: "Object",
          description:
            "Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding).",
          type: "string",
          required: true,
        },
        userProject: {
          name: "UserProject",
          description:
            "The project to be billed for this request. Required for Requester Pays buckets.",
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
            "https://www.googleapis.com/auth/devstorage.full_control",
            "https://www.googleapis.com/auth/devstorage.read_write",
          ],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "https://storage.googleapis.com/storage/v1/";
        const path = `b/{bucket}/o/{object}`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "DELETE",
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
        additionalProperties: true,
      },
    },
  },
};

export default objectsDelete;
