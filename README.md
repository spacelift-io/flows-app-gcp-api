# GCP API Flows Apps

Automatically generated Flows apps for Google Cloud Platform APIs. This repository contains a generator that creates type-safe Flows apps from GCP Discovery Documents (OpenAPI specifications).

## Overview

This repository provides:

- **Generator**: Automatically creates Flows apps from GCP API Discovery Documents
- **17 Generated Apps**: Pre-built apps for the most common GCP services
- **Type Safety**: Full TypeScript type definitions generated from API schemas
- **CI/CD Pipeline**: Automated testing and deployment workflows

## Generated Apps

The generator creates apps for these GCP services:

| App | Service | Blocks | Description |
|-----|---------|--------|-------------|
| **compute-instances** | Compute Engine | 121 | VM instance lifecycle and management |
| **compute-storage** | Compute Engine | 83 | Disks, snapshots, and images |
| **compute-networking** | Compute Engine | 106 | Networks, VPCs, and load balancing |
| **compute-security** | Compute Engine | 114 | Firewalls and security policies |
| **compute-load-balancing** | Compute Engine | 154 | Load balancers and forwarding rules |
| **storage** | Cloud Storage | 87 | Object storage and buckets |
| **container** | GKE | 73 | Kubernetes cluster management |
| **pubsub** | Cloud Pub/Sub | 22 | Message queuing and pub/sub |
| **cloudfunctions** | Cloud Functions | 27 | Serverless function deployment |
| **cloudresourcemanager** | Resource Manager | 24 | Project and resource management |
| **iam** | IAM | 43 | Identity and access management |
| **monitoring** | Cloud Monitoring | 39 | Metrics and monitoring |
| **cloudbuild** | Cloud Build | 20 | CI/CD and build automation |
| **run** | Cloud Run | 25 | Serverless containers |
| **secretmanager** | Secret Manager | 11 | Secrets management |
| **dns** | Cloud DNS | 45 | DNS management |
| **cloudkms** | Cloud KMS | 37 | Key management service |
| **sqladmin** | Cloud SQL | 48 | Managed database service |

**Total: 1,079 blocks across 17 apps**

## Repository Structure

```text
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI pipeline for all apps
│       └── deploy-app.yml      # Manual deployment workflow
├── scripts/
│   ├── gcpAppGenerator.ts      # Main generator
│   └── fetchDiscoveryDocs.ts   # Discovery doc downloader
├── breakdowns/
│   └── compute-breakdown.json  # Service split configuration
├── gcp-api-discovery/          # Downloaded API specs (gitignored)
├── generated/                  # Generated apps (gitignored)
│   ├── storage/
│   ├── pubsub/
│   ├── container/
│   └── ...
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 20+
- npm
- GCP Service Account with appropriate permissions

### Using Generated Apps

Each generated app in `generated/` is a standalone Flows app:

```bash
# Install dependencies for a specific app
cd generated/storage
npm install

# Type check
npm run typecheck

# Create bundle
npm run bundle
```

### Configuration

All generated apps use this configuration schema:

```typescript
{
  serviceAccountKey: string;  // GCP Service Account JSON key (sensitive)
  projectId: string;          // GCP Project ID
}
```

### Generating Apps

To regenerate all apps from scratch:

```bash
# 1. Fetch latest Discovery Documents from Google
npm run fetch-discovery

# 2. Generate all apps
npx tsx scripts/gcpAppGenerator.ts

# 3. Generate a single app
npx tsx scripts/gcpAppGenerator.ts storage
```

## Generator Architecture

### How It Works

1. **Discovery Documents**: Fetches OpenAPI specs from Google's Discovery API
2. **Parsing**: Extracts methods, parameters, and schemas from specs
3. **Code Generation**: Creates TypeScript blocks with:
   - Type-safe input/output schemas
   - GCP authentication using Service Account JSON
   - Native fetch API for HTTP requests
   - Category-based organization
4. **Packaging**: Each app gets its own `package.json`, `tsconfig.json`, and `VERSION`

### Generator Features

- **Reserved Keyword Handling**: Automatically renames blocks that conflict with JS keywords (e.g., `delete` → `deleteOperation`)
- **Hyphen Normalization**: Converts kebab-case to camelCase in identifiers
- **Deprecated Field Filtering**: Skips deprecated parameters from API specs
- **Category Organization**: Groups blocks by resource type into snake_case directories
- **Human-Readable Names**: Creates "Category - Operation" format (e.g., "Topics - Publish")
- **Service Breakdowns**: Splits large APIs like Compute Engine into multiple focused apps

### Service Breakdowns

Large APIs can be split using breakdown configurations in `breakdowns/`:

```json
{
  "service": "compute",
  "description": "Split Compute Engine into manageable apps",
  "apps": {
    "compute-instances": {
      "name": "Compute Engine - Instances",
      "methods": ["instances.list", "instances.get", ...]
    }
  }
}
```

This keeps generated apps focused and maintainable.

## CI/CD Pipeline

### Continuous Integration ([ci.yml](.github/workflows/ci.yml))

Automatically builds all generated apps on every push:

- **Matrix Build**: Dynamically discovers all apps in `generated/` directory
- **Parallel Execution**: Builds all 17 apps simultaneously
- **Type Checking**: Validates TypeScript compilation for each app
- **Community Registry**: Uses shared build workflow

### Manual Deployment ([deploy-app.yml](.github/workflows/deploy-app.yml))

Deploy individual apps to Cloudflare R2:

```bash
# Trigger via GitHub UI with workflow_dispatch
# Inputs:
#   app_name: storage, pubsub, container, etc.
```

**Deployment Process:**
1. Validates app exists and has VERSION file
2. Installs dependencies and creates bundle
3. Uploads to R2 with path: `core/apps/gcp-api-{app_name}/versions/{version}.tar.gz`
4. Creates/updates version index for the app

### Environment Setup

Required secrets for deployment:
- `FLOWS_REGISTRY_R2_ACCESS_KEY_ID`
- `FLOWS_REGISTRY_R2_SECRET_ACCESS_KEY`

Configure these in GitHub Settings → Environments → Deployment

## Generated App Structure

Each generated app follows this structure:

```text
generated/storage/
├── blocks/
│   ├── buckets/
│   │   ├── bucketsGet.ts
│   │   ├── bucketsList.ts
│   │   └── ...
│   ├── objects/
│   └── index.ts              # Block registry
├── main.ts                   # App definition
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── VERSION                   # App version (0.1.0)
```

### Block Example

Generated blocks follow this pattern:

```typescript
import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const topicsPublish: AppBlock = {
  name: "Topics - Publish",
  description: "Adds one or more messages to the topic.",
  category: "Topics",

  inputs: {
    default: {
      config: {
        topic: {
          name: "Topic",
          description: "Required. The messages will be published on this topic.",
          type: "string",
          required: true,
        },
        // ... more parameters
      },
      onEvent: async (input) => {
        // Parse service account credentials
        const credentials = JSON.parse(input.app.config.serviceAccountKey);

        // Initialize Google Auth
        const auth = new GoogleAuth({
          credentials,
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Make API request
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input.event.inputConfig.requestBody),
        });

        const result = await response.json();
        await events.emit(result || {});
      },
    },
  },

  outputs: {
    default: {
      possiblePrimaryParents: ["default"],
      type: { /* generated schema */ },
    },
  },
};
```

## Adding New Services

To add support for a new GCP service:

1. Add service name to `SERVICES_TO_GENERATE` in `scripts/gcpAppGenerator.ts`
2. Run `npm run fetch-discovery` to get the latest specs
3. Run `npx tsx scripts/gcpAppGenerator.ts {service-name}` to generate
4. If the service is too large, create a breakdown config in `breakdowns/`

## Maintenance

### Updating Apps

To update apps with latest API changes:

```bash
# 1. Fetch latest Discovery Documents
npm run fetch-discovery

# 2. Regenerate all apps
rm -rf generated
npx tsx scripts/gcpAppGenerator.ts

# 3. Typecheck all apps
for dir in generated/*/; do
  cd "$dir" && npm run typecheck && cd ../..
done
```

### Versioning

Each generated app has a `VERSION` file (currently `0.1.0`). To release updates:

1. Update VERSION file in the specific app
2. Use the manual deployment workflow to deploy
3. The workflow will upload to R2 and update the version index

---

**Repository**: GCP API Flows Apps
**Generated Apps**: 17
**Total Blocks**: 1,079
