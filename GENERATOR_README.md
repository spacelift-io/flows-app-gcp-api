# GCP Flows App Generator

This repository contains a generator that creates Flows apps from GCP API Discovery Documents (OpenAPI specifications). It mirrors the AWS app generator pattern but is specifically designed for Google Cloud Platform services.

## Overview

The generator automatically creates complete Flows apps for GCP services, including:

- **Service-specific blocks** for each API method
- **Type-safe input/output schemas** from API definitions
- **GCP authentication** using service account keys
- **Complete app structure** with CI/CD ready configuration

## Architecture

```text
flows-app-gcp-api/
├── scripts/
│   ├── gcpAppGenerator.ts      # Main generator script
│   └── fetchDiscoveryDocs.ts   # Discovery document fetcher
├── breakdowns/                 # Service breakdown configurations (optional)
│   └── compute-breakdown.json  # Example: Split large APIs into sub-apps
├── gcp-api-discovery/         # Downloaded API discovery documents (gitignored)
│   ├── compute-v1.json
│   ├── storage-v1.json
│   └── ...
├── generated/                  # Generated Flows apps (gitignored)
│   ├── compute/
│   ├── storage/
│   └── ...
└── package.json
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Fetch GCP Discovery Documents

Download the latest API specifications from Google:

```bash
npm run fetch-discovery
```

This downloads discovery documents for these services:
- Compute Engine (compute)
- Cloud Storage (storage)
- Google Kubernetes Engine (container)
- Cloud Functions (cloudfunctions)
- Cloud Resource Manager (cloudresourcemanager)
- IAM (iam)
- Cloud Logging (logging)
- Cloud Monitoring (monitoring)
- Pub/Sub (pubsub)
- Cloud Build (cloudbuild)
- Cloud Run (run)
- Secret Manager (secretmanager)
- Cloud DNS (dns)
- Cloud KMS (cloudkms)
- Cloud SQL (sqladmin)

### 3. Generate Apps

Generate all supported services:

```bash
npm run generate
```

Or generate a specific service:

```bash
npm run generate:service compute
```

### 4. Generated App Structure

Each generated app will have:

```text
generated/compute/
├── VERSION                    # Version file (0.1.0)
├── main.ts                   # App definition with GCP auth config
├── package.json              # Dependencies (@google-cloud/compute, etc.)
├── tsconfig.json            # TypeScript configuration
└── blocks/
    ├── index.ts             # Block registry
    ├── instancesList.ts     # Auto-generated blocks for each API method
    ├── instancesInsert.ts
    └── ...
```

## How It Works

### Discovery Document Loading

The generator reads GCP Discovery Documents (OpenAPI/JSON format) which describe:
- Available API methods
- Input parameters and schemas
- Output response schemas
- Authentication scopes
- Documentation

### App Generation Process

1. **Parse Discovery Document** - Extract service metadata, methods, and schemas
2. **Generate Main App** - Create app definition with GCP authentication config
3. **Generate Blocks** - Create one block per API method with:
   - Input validation from parameter schemas
   - Output types from response schemas
   - GCP authentication using service account keys
   - HTTP client using native fetch API
4. **Install Dependencies** - Run `npm install` for each generated app
5. **Format Code** - Apply Prettier formatting

### Authentication

Generated apps use **GCP Service Account authentication**:

```typescript
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
}
```

### Block Structure

Each generated block follows this pattern:

```typescript
import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const instancesList: AppBlock = {
  name: "List Instances",
  description: "Lists instances in a zone",
  inputs: {
    default: {
      config: {
        // Auto-generated from API parameters
        zone: {
          name: "Zone",
          description: "The name of the zone",
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
        const url = `https://compute.googleapis.com/compute/v1/projects/${projectId}/zones/${zone}/instances`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        await events.emit(result || {});
      },
    },
  },
  outputs: {
    default: {
      // Auto-generated output schema
    },
  },
};
```

## Service Breakdowns

For large APIs (like Compute Engine with 500+ methods), you can split them into multiple apps using breakdown configurations:

### Example: `breakdowns/compute-breakdown.json`

```json
{
  "service": "compute",
  "description": "Split Compute Engine API into manageable apps",
  "apps": {
    "compute-instances": {
      "name": "Compute Engine - Instances",
      "description": "Instance lifecycle management",
      "methods": [
        "instances.list",
        "instances.insert",
        "instances.delete",
        "instances.start",
        "instances.stop"
      ]
    },
    "compute-disks": {
      "name": "Compute Engine - Disks",
      "description": "Persistent disk management",
      "methods": [
        "disks.list",
        "disks.insert",
        "disks.delete",
        "disks.createSnapshot"
      ]
    }
  }
}
```

When a breakdown exists, the generator creates separate apps in:
- `generated/compute-instances/`
- `generated/compute-disks/`

## Supported Services

The generator is configured to support these common GCP DevOps services:

| Service | API Name | Description |
|---------|----------|-------------|
| Compute Engine | `compute` | VM instances, disks, networks |
| Cloud Storage | `storage` | Object storage buckets |
| Google Kubernetes Engine | `container` | Kubernetes clusters |
| Cloud Functions | `cloudfunctions` | Serverless functions |
| Resource Manager | `cloudresourcemanager` | Projects and resources |
| IAM | `iam` | Identity and access management |
| Cloud Logging | `logging` | Log management |
| Cloud Monitoring | `monitoring` | Metrics and alerting |
| Pub/Sub | `pubsub` | Message queuing |
| Cloud Build | `cloudbuild` | CI/CD pipelines |
| Cloud Run | `run` | Serverless containers |
| Secret Manager | `secretmanager` | Secrets management |
| Cloud DNS | `dns` | DNS management |
| Cloud KMS | `cloudkms` | Key management |
| Cloud SQL | `sqladmin` | Managed databases |

## Development Workflow

### 1. Update Discovery Documents

GCP APIs evolve over time. To update:

```bash
npm run fetch-discovery
```

### 2. Regenerate Apps

After updating discovery documents:

```bash
npm run generate
```

Or regenerate specific service:

```bash
npm run generate:service storage
```

### 3. Create Breakdowns (Optional)

For large services, create a breakdown configuration:

```bash
# Create breakdowns/servicename-breakdown.json
{
  "service": "compute",
  "description": "Split into sub-apps",
  "apps": {
    "compute-instances": {
      "name": "Compute - Instances",
      "description": "Instance management",
      "methods": ["instances.list", "instances.insert"]
    }
  }
}
```

### 4. Test Generated Apps

```bash
cd generated/compute
npm run typecheck
npm run bundle
```

## Differences from AWS Generator

| Aspect | AWS | GCP |
|--------|-----|-----|
| **API Format** | Smithy JSON AST | OpenAPI/Discovery JSON |
| **Auth** | Access Key + Secret Key | Service Account JSON |
| **SDK Pattern** | `@aws-sdk/client-*` | `@google-cloud/*` |
| **Client Init** | AWS SDK v3 clients | Google Auth Library + fetch |
| **Method Naming** | CamelCase operations | Dot notation (resource.method) |
| **Repository** | Git submodule | Fetched via Discovery API |

## Generator Internals

### Key Classes

**`GCPAppGenerator`** - Main generator class
- `loadDiscoveryDocuments()` - Load and parse discovery docs
- `generateServiceApp()` - Generate complete app
- `generateActionBlocks()` - Generate blocks for API methods
- `generatePackageJson()` - Create package.json with dependencies

### Type Mapping

Discovery Document types → Flows types:

| Discovery Type | Flows Type |
|---------------|------------|
| `string` | `string` |
| `integer`, `number` | `number` |
| `boolean` | `boolean` |
| `array` | `array` with items |
| `object` | `object` with properties |

### Schema Handling

- Resolves `$ref` references between schemas
- Handles nested objects and arrays
- Extracts required fields
- Prevents infinite recursion (max depth: 3)

## Troubleshooting

### Discovery Documents Not Found

```bash
npm run fetch-discovery
```

### Generated App Has Type Errors

Check the discovery document for the service:
```bash
cat gcp-api-discovery/servicename-v1.json | jq .
```

### npm install Fails in Generated App

The generator includes common dependencies. For missing packages:
```bash
cd generated/servicename
npm install --save-dev @types/missing-package
```

## Future Enhancements

- [ ] Support for GCP client library wrappers instead of raw fetch
- [ ] Automatic breakdown generation for large services
- [ ] Support for paginated responses
- [ ] Mock/test mode with fake credentials
- [ ] Custom endpoint support (useful for emulators)
- [ ] Rate limiting and retry logic in generated blocks

## Comparison to Manual Implementation

### Manual Block Creation
```typescript
// ~50 lines per method × 100 methods = 5000 lines of boilerplate
// Prone to inconsistencies and type errors
```

### Generated Block Creation
```bash
npm run generate
# Generates 100+ blocks in seconds
# Consistent, type-safe, up-to-date with API
```

## Related AWS Generator

This generator is modeled after `../flows-app-aws-api/scripts/awsAppGenerator.ts`. Key learnings:

- ✅ Automatic block generation from API specs
- ✅ Service breakdown support for large APIs
- ✅ Consistent authentication patterns
- ✅ Type-safe input/output schemas
- ✅ Version management and CI/CD ready structure

## Contributing

To add a new GCP service:

1. Add service name to `SERVICES_TO_GENERATE` in `gcpAppGenerator.ts`
2. Run `npm run fetch-discovery` to get its discovery document
3. Run `npm run generate:service servicename`
4. (Optional) Create a breakdown config if the service is large

## License

Same as parent repository.
