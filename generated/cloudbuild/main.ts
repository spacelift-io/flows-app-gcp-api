import { defineApp } from "@slflows/sdk/v1";
import { blocks } from "./blocks";

export const app = defineApp({
  name: "Cloud Build API",
  config: {
    serviceAccountKey: {
      name: "Service Account Key",
      description: "GCP Service Account JSON key",
      type: "string",
      required: true,
      sensitive: true,
    },
    projectId: {
      name: "Project ID",
      description: "GCP Project ID",
      type: "string",
      required: true,
    },
  },
  blocks,
});
