#!/usr/bin/env node

/**
 * GCP Flows App Generator
 *
 * Generates Flows apps from GCP API Discovery Documents (OpenAPI-based)
 * This mirrors the AWS generator pattern but for GCP services
 */

import fs from "fs";
import path from "path";
import { spawn } from "child_process";

// Types for GCP Discovery Document structure
interface DiscoveryDocument {
  kind: string;
  discoveryVersion: string;
  id: string;
  name: string;
  version: string;
  title: string;
  description: string;
  documentationLink?: string;
  protocol: string;
  baseUrl: string;
  basePath: string;
  rootUrl: string;
  servicePath: string;
  parameters?: Record<string, Parameter>;
  auth?: AuthConfig;
  schemas?: Record<string, Schema>;
  resources?: Record<string, Resource>;
  methods?: Record<string, Method>;
}

interface Parameter {
  type: string;
  description?: string;
  required?: boolean;
  location?: string;
  enum?: string[];
  default?: any;
}

interface Schema {
  id?: string;
  type: string;
  description?: string;
  properties?: Record<string, Schema>;
  items?: Schema;
  required?: string[];
  additionalProperties?: boolean | Schema;
  enum?: string[];
  $ref?: string;
}

interface Method {
  id: string;
  path: string;
  httpMethod: string;
  description?: string;
  parameters?: Record<string, Parameter>;
  request?: { $ref: string };
  response?: { $ref: string };
  scopes?: string[];
}

interface Resource {
  methods?: Record<string, Method>;
  resources?: Record<string, Resource>;
}

interface AuthConfig {
  oauth2?: {
    scopes?: Record<string, { description: string }>;
  };
}

interface ServiceMetadata {
  name: string;
  version: string;
  title: string;
  description: string;
  baseUrl: string;
  packageName: string;
}

interface ParsedService {
  metadata: ServiceMetadata;
  methods: Record<string, Method>;
  schemas: Record<string, Schema>;
}

interface ServiceBreakdown {
  service: string;
  description: string;
  apps: Record<
    string,
    {
      name: string;
      description: string;
      methods: string[];
    }
  >;
}

class GCPAppGenerator {
  private services: Map<string, ParsedService> = new Map();
  private breakdowns: Map<string, ServiceBreakdown> = new Map();

  /**
   * Load GCP Discovery Documents from a directory
   */
  async loadDiscoveryDocuments(discoveryPath: string) {
    console.log(`Loading GCP Discovery Documents from ${discoveryPath}...`);

    if (!fs.existsSync(discoveryPath)) {
      throw new Error(`Discovery directory not found: ${discoveryPath}`);
    }

    const files = fs
      .readdirSync(discoveryPath)
      .filter((file) => file.endsWith(".json"));

    console.log(`Found ${files.length} discovery documents`);

    for (const file of files) {
      try {
        const filePath = path.join(discoveryPath, file);
        const service = await this.loadDiscoveryDocument(filePath);
        if (service) {
          this.services.set(service.metadata.name, service);
          console.log(`✓ Loaded ${service.metadata.title}`);
        }
      } catch (error: any) {
        console.warn(`⚠ Failed to load ${file}:`, error.message);
      }
    }

    console.log(`Successfully loaded ${this.services.size} services`);

    // Load service breakdown configurations
    await this.loadBreakdownConfigurations();
  }

  /**
   * Load service breakdown configurations from JSON files
   */
  private async loadBreakdownConfigurations() {
    console.log("Loading service breakdown configurations...");

    const breakdownsDir = path.resolve("./breakdowns");

    try {
      if (!fs.existsSync(breakdownsDir)) {
        console.log(
          "No breakdowns directory found, proceeding without breakdowns"
        );
        return;
      }

      const breakdownFiles = fs
        .readdirSync(breakdownsDir)
        .filter((file: string) => file.endsWith("-breakdown.json"));

      for (const file of breakdownFiles) {
        try {
          const filePath = path.join(breakdownsDir, file);
          const content = fs.readFileSync(filePath, "utf8");
          const breakdown: ServiceBreakdown = JSON.parse(content);
          this.breakdowns.set(breakdown.service, breakdown);
          console.log(
            `✓ Loaded breakdown configuration for ${breakdown.service}`
          );
        } catch (error: any) {
          console.warn(
            `⚠ Failed to load breakdown file ${file}:`,
            error.message
          );
        }
      }
    } catch (error: any) {
      console.log(
        "Error reading breakdowns directory, proceeding without breakdowns"
      );
    }
  }

  private async loadDiscoveryDocument(
    filePath: string
  ): Promise<ParsedService | null> {
    const content = fs.readFileSync(filePath, "utf8");
    const doc: DiscoveryDocument = JSON.parse(content);

    // Extract all methods from resources
    const methods: Record<string, Method> = {};
    this.extractMethods(doc.resources || {}, methods, "");

    // Also check for top-level methods
    if (doc.methods) {
      Object.entries(doc.methods).forEach(([name, method]) => {
        methods[name] = method;
      });
    }

    return {
      metadata: {
        name: doc.name,
        version: doc.version,
        title: doc.title,
        description: doc.description,
        baseUrl: doc.rootUrl + doc.servicePath,
        packageName: this.getGCPPackageName(doc.name),
      },
      methods,
      schemas: doc.schemas || {},
    };
  }

  /**
   * Recursively extract methods from nested resources
   */
  private extractMethods(
    resources: Record<string, Resource>,
    methods: Record<string, Method>,
    prefix: string
  ) {
    for (const [resourceName, resource] of Object.entries(resources)) {
      const resourcePrefix = prefix ? `${prefix}.${resourceName}` : resourceName;

      if (resource.methods) {
        for (const [methodName, method] of Object.entries(resource.methods)) {
          const fullMethodName = `${resourcePrefix}.${methodName}`;
          methods[fullMethodName] = method;
        }
      }

      if (resource.resources) {
        this.extractMethods(resource.resources, methods, resourcePrefix);
      }
    }
  }

  /**
   * Generate Flows app for a specific GCP service
   */
  async generateServiceApp(serviceName: string, outputDir: string) {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service not loaded: ${serviceName}`);
    }

    const breakdown = this.breakdowns.get(serviceName);

    if (breakdown) {
      console.log(
        `Found breakdown configuration for ${serviceName}, generating ${
          Object.keys(breakdown.apps).length
        } separate apps...`
      );

      for (const [appKey, appConfig] of Object.entries(breakdown.apps)) {
        await this.generateBreakdownApp(
          service,
          breakdown,
          appKey,
          appConfig,
          outputDir
        );
      }

      console.log(
        `✓ Generated ${
          Object.keys(breakdown.apps).length
        } separate apps for ${serviceName}`
      );
    } else {
      console.log(
        `Generating single app for ${service.metadata.title}...`
      );

      const appDir = path.join(outputDir, serviceName);
      fs.mkdirSync(appDir, { recursive: true });

      await this.generateMainApp(service, appDir);
      const blocksDir = path.join(appDir, "blocks");
      fs.mkdirSync(blocksDir, { recursive: true });

      await this.generateActionBlocks(service, blocksDir);
      await this.generatePackageJson(service, appDir);
      await this.generateConfigs(appDir);
      await this.generateVersionFile(appDir);
      await this.formatCode(service, appDir);

      console.log(`✓ Generated ${serviceName} app in ${appDir}`);
    }
  }

  /**
   * Generate a separate app directory for a breakdown category
   */
  private async generateBreakdownApp(
    service: ParsedService,
    breakdown: ServiceBreakdown,
    appKey: string,
    appConfig: { name: string; description: string; methods: string[] },
    outputDir: string
  ) {
    console.log(`Generating ${appConfig.name} app...`);

    const appDir = path.join(outputDir, appKey);
    fs.mkdirSync(appDir, { recursive: true });

    // Filter methods for this breakdown app
    const filteredMethods: Record<string, Method> = {};
    const filteredBlocks: string[] = [];

    for (const methodName of appConfig.methods) {
      if (service.methods[methodName]) {
        filteredMethods[methodName] = service.methods[methodName];
        filteredBlocks.push(this.methodNameToBlockName(methodName));
      } else {
        console.warn(
          `⚠ Method ${methodName} not found in ${breakdown.service} service`
        );
      }
    }

    const filteredService: ParsedService = {
      ...service,
      methods: filteredMethods,
    };

    // Generate main.ts
    const content = this.generateMainAppContent(appConfig.name);
    fs.writeFileSync(path.join(appDir, "main.ts"), content);

    // Generate blocks
    const blocksDir = path.join(appDir, "blocks");
    fs.mkdirSync(blocksDir, { recursive: true });
    await this.generateActionBlocks(filteredService, blocksDir);

    // Generate configs
    await this.generatePackageJson(filteredService, appDir);
    await this.generateConfigs(appDir);
    await this.generateVersionFile(appDir);
    await this.formatCode(filteredService, appDir);

    console.log(`✓ Generated ${appConfig.name} app in ${appDir}`);
  }

  private async generateMainApp(service: ParsedService, appDir: string) {
    const content = this.generateMainAppContent(service.metadata.title);
    fs.writeFileSync(path.join(appDir, "main.ts"), content);
  }

  private generateMainAppContent(appName: string): string {
    return `import { defineApp } from "@slflows/sdk/v1";
import { blocks } from "./blocks";

export const app = defineApp({
  name: "${appName}",
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
`;
  }

  private async generateActionBlocks(
    service: ParsedService,
    blocksDir: string
  ) {
    const methods = Object.entries(service.methods);
    const blocksByCategory = new Map<string, Array<{ name: string; methodName: string; method: Method }>>();

    // Group blocks by category
    for (const [methodName, method] of methods) {
      const blockName = this.methodNameToBlockName(methodName);
      const category = this.extractCategory(methodName);
      const categoryDir = this.categoryToDirectoryName(category);

      if (!blocksByCategory.has(categoryDir)) {
        blocksByCategory.set(categoryDir, []);
      }
      blocksByCategory.get(categoryDir)!.push({ name: blockName, methodName, method });
    }

    // Generate blocks organized by category
    const allBlocks: Array<{ name: string; category: string }> = [];

    for (const [categoryDir, blocks] of blocksByCategory) {
      const categoryPath = path.join(blocksDir, categoryDir);
      fs.mkdirSync(categoryPath, { recursive: true });

      for (const { name: blockName, methodName, method } of blocks) {
        const fileName = `${blockName}.ts`;
        await this.generateActionBlock(
          service,
          methodName,
          method,
          path.join(categoryPath, fileName)
        );
        allBlocks.push({ name: blockName, category: categoryDir });
      }
    }

    // Generate index.ts with imports from category directories
    const indexContent =
      allBlocks
        .map(({ name, category }) => `import ${name} from './${category}/${name}';`)
        .join("\n") +
      "\n\nexport const blocks = {\n" +
      allBlocks.map(({ name }) => `  ${name},`).join("\n") +
      "\n};\n";

    fs.writeFileSync(path.join(blocksDir, "index.ts"), indexContent);
  }

  private async generateActionBlock(
    service: ParsedService,
    methodName: string,
    method: Method,
    filePath: string
  ) {
    const blockName = this.methodNameToBlockName(methodName);
    const packageName = service.metadata.packageName;

    // Generate input config from method parameters
    const inputConfig = this.generateInputConfig(service, method);
    const outputType = this.generateOutputType(service, method);
    const category = this.extractCategory(methodName);
    const humanName = this.createHumanName(methodName, category);

    const content = `import { AppBlock, events } from "@slflows/sdk/v1";
import { GoogleAuth } from "google-auth-library";

const ${blockName}: AppBlock = {
  name: "${humanName}",
  description: \`${this.cleanDocumentation(method.description || "")}\`,
  category: "${category}",
  inputs: {
    default: {
      config: ${JSON.stringify(inputConfig, null, 8).replace(/"/g, '"')},
      onEvent: async (input) => {
        // Parse service account credentials
        const credentials = JSON.parse(input.app.config.serviceAccountKey);

        // Initialize Google Auth
        const auth = new GoogleAuth({
          credentials,
          scopes: ${JSON.stringify(method.scopes || ["https://www.googleapis.com/auth/cloud-platform"])},
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Build request URL and parameters
        const baseUrl = "${service.metadata.baseUrl}";
        const path = \`${method.path}\`;
        const url = baseUrl + path;

        // Make API request using fetch
        const requestOptions: RequestInit = {
          method: "${method.httpMethod}",
          headers: {
            "Authorization": \`Bearer \${accessToken.token}\`,
            "Content-Type": "application/json",
          },
        };

        ${method.request ? `// Add request body\n        if (input.event.inputConfig.requestBody) {\n          requestOptions.body = JSON.stringify(input.event.inputConfig.requestBody);\n        }` : ""}

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error(\`GCP API error: \${response.status} \${response.statusText}\`);
        }

        const result = await response.json();
        await events.emit(result || {});
      },
    },
  },
  outputs: {
    default: {
      possiblePrimaryParents: ["default"],
      type: ${JSON.stringify(outputType, null, 6)},
    },
  },
};

export default ${blockName};
`;

    fs.writeFileSync(filePath, content);
  }

  private generateInputConfig(
    service: ParsedService,
    method: Method
  ): Record<string, any> {
    const config: Record<string, any> = {};

    if (method.parameters) {
      for (const [paramName, param] of Object.entries(method.parameters)) {
        // Skip deprecated parameters
        const description = param.description || `Parameter: ${paramName}`;
        if (description.toLowerCase().includes('deprecated')) {
          continue;
        }

        const enumNote = param.enum ? ` Valid values: ${param.enum.join(', ')}` : '';

        config[paramName] = {
          name: this.humanizeName(paramName),
          description: description + enumNote,
          type: this.mapGCPTypeToFlows(param.type),
          required: param.required || false,
        };
      }
    }

    // Add request body if method has one
    if (method.request?.$ref) {
      const schema = service.schemas[method.request.$ref];
      if (schema) {
        config.requestBody = {
          name: "Request Body",
          description: schema.description || "Request body",
          type: this.schemaToFlowsType(schema, service.schemas),
          required: true,
        };
      }
    }

    return config;
  }

  private generateOutputType(
    service: ParsedService,
    method: Method
  ): any {
    if (!method.response?.$ref) {
      return { type: "object", additionalProperties: true };
    }

    const schema = service.schemas[method.response.$ref];
    if (!schema) {
      return { type: "object", additionalProperties: true };
    }

    return this.schemaToFlowsType(schema, service.schemas);
  }

  private schemaToFlowsType(
    schema: Schema,
    allSchemas: Record<string, Schema>,
    depth = 0
  ): any {
    // Prevent infinite recursion
    if (depth > 3) {
      return { type: "object", additionalProperties: true };
    }

    // Handle $ref
    if (schema.$ref) {
      const refSchema = allSchemas[schema.$ref];
      if (refSchema) {
        return this.schemaToFlowsType(refSchema, allSchemas, depth + 1);
      }
    }

    switch (schema.type) {
      case "object":
        if (schema.properties) {
          const properties: Record<string, any> = {};
          const required: string[] = schema.required || [];

          for (const [propName, propSchema] of Object.entries(schema.properties)) {
            properties[propName] = this.schemaToFlowsType(
              propSchema,
              allSchemas,
              depth + 1
            );
          }

          return {
            type: "object",
            properties,
            ...(required.length > 0 ? { required } : { additionalProperties: true }),
          };
        }
        return { type: "object", additionalProperties: true };

      case "array":
        if (schema.items) {
          return {
            type: "array",
            items: this.schemaToFlowsType(schema.items, allSchemas, depth + 1),
          };
        }
        return { type: "array", items: { type: "any" } };

      case "string":
        if (schema.enum) {
          return { type: "string", enum: schema.enum };
        }
        return { type: "string" };

      case "integer":
      case "number":
        return { type: "number" };

      case "boolean":
        return { type: "boolean" };

      default:
        return { type: "string" };
    }
  }

  private mapGCPTypeToFlows(type: string): string {
    switch (type) {
      case "string":
        return "string";
      case "integer":
      case "number":
        return "number";
      case "boolean":
        return "boolean";
      case "array":
        return "array";
      case "object":
        return "object";
      default:
        return "string";
    }
  }

  private async generatePackageJson(service: ParsedService, appDir: string) {
    // Only include @google-cloud packages that actually exist on npm
    // Most GCP APIs are accessed via REST API with google-auth-library
    const hasNpmPackage = [
      "compute",
      "storage",
      "container",
      "monitoring",
      "pubsub",
      "run",
      "dns",
    ].includes(service.metadata.name);

    const packageJson = {
      scripts: {
        typecheck: "npx tsc --noEmit",
        format: "npx prettier --write .",
        bundle: "npx flowctl version bundle -e main.ts",
      },
      dependencies: {
        "@slflows/sdk": "*",
        "google-auth-library": "^9.0.0",
        ...(hasNpmPackage ? { [service.metadata.packageName]: "^3.0.0" } : {}),
      },
      devDependencies: {
        typescript: "^5.0.0",
        prettier: "^3.0.0",
        "@types/node": "^20.0.0",
        "@useflows/flowctl": "^0.1.1",
      },
      peerDependencies: {
        "@slflows/sdk": "*",
      },
    };

    fs.writeFileSync(
      path.join(appDir, "package.json"),
      JSON.stringify(packageJson, null, 2)
    );

    // Run npm install
    console.log(`Installing dependencies for ${service.metadata.name}...`);

    return new Promise<void>((resolve, reject) => {
      const npmInstall = spawn("npm", ["install"], {
        cwd: appDir,
        stdio: "pipe",
      });

      let output = "";
      npmInstall.stdout.on("data", (data) => {
        output += data.toString();
      });

      npmInstall.stderr.on("data", (data) => {
        output += data.toString();
      });

      npmInstall.on("close", (code) => {
        if (code === 0) {
          console.log(
            `✓ Dependencies installed for ${service.metadata.name}`
          );
          resolve();
        } else {
          console.error(
            `✗ npm install failed for ${service.metadata.name}:`
          );
          console.error(output);
          reject(new Error(`npm install failed with code ${code}`));
        }
      });
    });
  }

  private async generateVersionFile(appDir: string) {
    const versionFile = path.join(appDir, "VERSION");

    if (fs.existsSync(versionFile)) {
      console.log(`VERSION file already exists in ${appDir}, skipping...`);
      return;
    }

    fs.writeFileSync(versionFile, "0.1.0\n");
    console.log(`✓ Created VERSION file with 0.1.0 in ${appDir}`);
  }

  private async generateConfigs(appDir: string) {
    const tsConfig = {
      compilerOptions: {
        target: "ES2022",
        module: "ESNext",
        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: "react-jsx",
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
      },
      include: ["**/*.ts", "**/*.tsx"],
      exclude: ["node_modules"],
    };

    fs.writeFileSync(
      path.join(appDir, "tsconfig.json"),
      JSON.stringify(tsConfig, null, 2)
    );
  }

  private async formatCode(service: ParsedService, appDir: string) {
    console.log(`Formatting code for ${service.metadata.name}...`);

    return new Promise<void>((resolve, reject) => {
      const prettierFormat = spawn("npm", ["run", "format"], {
        cwd: appDir,
        stdio: "pipe",
      });

      let output = "";
      prettierFormat.stdout.on("data", (data) => {
        output += data.toString();
      });

      prettierFormat.stderr.on("data", (data) => {
        output += data.toString();
      });

      prettierFormat.on("close", (code) => {
        if (code === 0) {
          console.log(`✓ Code formatted for ${service.metadata.name}`);
          resolve();
        } else {
          console.warn(
            `⚠ Code formatting failed for ${service.metadata.name}:`
          );
          console.warn(output);
          resolve();
        }
      });
    });
  }

  // Utility methods
  private createHumanName(methodName: string, category: string): string {
    // Create "Category - Operation" format
    // forwardingRules.aggregatedList -> "Forwarding Rules - Aggregated List"
    // topics.publish -> "Topics - Publish"

    const parts = methodName.split(".");
    const filtered = parts.filter(p => !["projects"].includes(p));

    // Get the operation (last part)
    const operation = filtered[filtered.length - 1];

    // Humanize the operation part
    const humanOperation = operation
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return `${category} - ${humanOperation}`;
  }

  private categoryToDirectoryName(category: string): string {
    // Convert "Bucket Access Controls" to "bucket_access_controls"
    return category
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
  }

  private extractCategory(methodName: string): string {
    // Extract the resource type as category
    // projects.topics.publish -> Topics
    // instances.list -> Instances
    // buckets.get -> Buckets
    const parts = methodName.split(".");

    // Filter out "projects" and get the resource name (second-to-last part usually)
    const filtered = parts.filter(p => !["projects"].includes(p));

    if (filtered.length === 0) {
      return "General";
    }

    // Get the resource type (typically the first meaningful part)
    const resourceName = filtered[0];

    // Capitalize and make it readable
    return resourceName
      .charAt(0).toUpperCase() +
      resourceName.slice(1)
      .replace(/([A-Z])/g, " $1")
      .trim();
  }

  private methodNameToBlockName(methodName: string): string {
    // Convert projects.topics.publish to topicsPublish (drop the first segment if it's "projects")
    const parts = methodName.split(".");

    // Remove common prefixes like "projects" that don't add value
    const filtered = parts.filter(p => !["projects"].includes(p));

    // If we filtered everything, keep the last two parts
    const relevant = filtered.length > 0 ? filtered : parts.slice(-2);

    const blockName = relevant
      .map((part, i) => {
        // Remove hyphens and capitalize following letter (kebab-case to camelCase)
        const normalized = part.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        return i === 0 ? normalized : this.capitalize(normalized);
      })
      .join("");

    // Handle reserved JavaScript/TypeScript keywords
    const reservedKeywords = [
      'delete', 'default', 'export', 'import', 'return', 'break', 'case',
      'catch', 'class', 'const', 'continue', 'debugger', 'do', 'else',
      'enum', 'extends', 'false', 'finally', 'for', 'function', 'if',
      'implements', 'in', 'instanceof', 'interface', 'let', 'new', 'null',
      'package', 'private', 'protected', 'public', 'static', 'super',
      'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void',
      'while', 'with', 'yield'
    ];

    if (reservedKeywords.includes(blockName.toLowerCase())) {
      return blockName + 'Operation';
    }

    return blockName;
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private humanizeName(str: string): string {
    // Convert projects.topics.publish to "Topics Publish" (drop "projects")
    const parts = str.split(".");
    const filtered = parts.filter(p => !["projects"].includes(p));
    const relevant = filtered.length > 0 ? filtered : parts.slice(-2);

    return relevant
      .map(part =>
        part
          // Handle camelCase
          .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          // Capitalize first letter
          .charAt(0).toUpperCase() + part.slice(1)
      )
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  private getGCPPackageName(serviceName: string): string {
    // GCP uses @google-cloud/service-name pattern
    return `@google-cloud/${serviceName}`;
  }

  private cleanDocumentation(doc: string): string {
    if (!doc) return "";

    let cleaned = doc
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .replace(/`/g, "'")  // Replace backticks with single quotes to avoid template literal issues
      .trim();

    const firstSentenceMatch = cleaned.match(/^[^.]*\./);
    if (firstSentenceMatch) {
      return firstSentenceMatch[0];
    }

    return cleaned.substring(0, 100) + (cleaned.length > 100 ? "..." : "");
  }
}

// Hardcoded list of services to generate (common GCP DevOps services)
const SERVICES_TO_GENERATE = [
  "compute",
  "storage",
  "container",
  "cloudfunctions",
  "cloudresourcemanager",
  "iam",
  "monitoring",
  "pubsub",
  "cloudbuild",
  "run",
  "secretmanager",
  "dns",
  "cloudkms",
  "sqladmin",
] as const;

// CLI interface
async function main() {
  const generator = new GCPAppGenerator();

  const discoveryPath = "./gcp-api-discovery";
  const outputDir = "./generated";

  const args = process.argv.slice(2);
  const serviceName = args[0];

  try {
    await generator.loadDiscoveryDocuments(discoveryPath);

    if (serviceName) {
      if (!SERVICES_TO_GENERATE.includes(serviceName as any)) {
        console.error(`❌ Service '${serviceName}' is not in the supported services list.`);
        console.log(`Supported services: ${SERVICES_TO_GENERATE.join(', ')}`);
        process.exit(1);
      }

      console.log(`📦 Generating ${serviceName}...`);
      await generator.generateServiceApp(serviceName, outputDir);
      console.log(`✅ Successfully generated ${serviceName}`);
    } else {
      console.log(
        `Generating apps for ${SERVICES_TO_GENERATE.length} GCP services...`
      );

      for (const serviceName of SERVICES_TO_GENERATE) {
        try {
          console.log(`\n📦 Generating ${serviceName}...`);
          await generator.generateServiceApp(serviceName, outputDir);
          console.log(`✅ Successfully generated ${serviceName}`);
        } catch (error: any) {
          console.error(`❌ Failed to generate ${serviceName}:`, error.message);
        }
      }

      console.log("\n🎉 Generation complete!");
    }
  } catch (error: any) {
    console.error("❌ Generation failed:", error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (process.argv[1] === import.meta.url.replace('file://', '')) {
  main();
}

export { GCPAppGenerator };
