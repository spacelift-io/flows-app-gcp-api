#!/usr/bin/env node

/**
 * Fetch GCP Discovery Documents
 *
 * Downloads the latest API discovery documents from Google's Discovery API
 * and saves them to the gcp-api-discovery directory
 */

import fs from "fs";
import path from "path";

const DISCOVERY_API = "https://www.googleapis.com/discovery/v1/apis";

interface DiscoveryListItem {
  kind: string;
  id: string;
  name: string;
  version: string;
  title: string;
  description: string;
  discoveryRestUrl: string;
  preferred: boolean;
}

interface DiscoveryList {
  kind: string;
  discoveryVersion: string;
  items: DiscoveryListItem[];
}

async function fetchDiscoveryDocuments() {
  console.log("Fetching list of available GCP APIs...");

  // Fetch the list of available APIs
  const response = await fetch(DISCOVERY_API);
  if (!response.ok) {
    throw new Error(`Failed to fetch discovery list: ${response.statusText}`);
  }

  const discoveryList: DiscoveryList = await response.json();
  console.log(`Found ${discoveryList.items.length} APIs`);

  // Create output directory
  const outputDir = path.resolve("./gcp-api-discovery");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Services we're interested in for DevOps
  const targetServices = [
    "compute",
    "storage",
    "container", // GKE
    "cloudfunctions",
    "cloudresourcemanager",
    "iam",
    "logging",
    "monitoring",
    "pubsub",
    "cloudbuild",
    "run", // Cloud Run
    "secretmanager",
    "dns",
    "cloudkms",
    "sqladmin", // Cloud SQL
    "redis", // Cloud Memorystore
    "file", // Cloud Filestore
    "networkservices",
    "servicedirectory",
    "cloudscheduler",
    "cloudtasks",
  ];

  // Filter to preferred versions only and target services
  const preferredAPIs = discoveryList.items.filter(
    (item) => item.preferred && targetServices.includes(item.name)
  );

  console.log(`Downloading ${preferredAPIs.length} preferred API versions...`);

  for (const api of preferredAPIs) {
    try {
      console.log(`Fetching ${api.title} (${api.version})...`);

      const docResponse = await fetch(api.discoveryRestUrl);
      if (!docResponse.ok) {
        console.warn(`⚠ Failed to fetch ${api.name}: ${docResponse.statusText}`);
        continue;
      }

      const doc = await docResponse.json();
      const filename = `${api.name}-${api.version}.json`;
      const filepath = path.join(outputDir, filename);

      fs.writeFileSync(filepath, JSON.stringify(doc, null, 2));
      console.log(`✓ Saved ${filename}`);
    } catch (error: any) {
      console.warn(`⚠ Error fetching ${api.name}:`, error.message);
    }
  }

  console.log("\n✅ Discovery documents downloaded successfully!");
  console.log(`📁 Location: ${outputDir}`);
}

// Run the fetch
fetchDiscoveryDocuments().catch((error) => {
  console.error("❌ Failed to fetch discovery documents:", error);
  process.exit(1);
});
