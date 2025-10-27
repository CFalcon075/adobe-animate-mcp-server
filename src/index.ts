#!/usr/bin/env node

/**
 * Adobe Animate MCP Server
 * 
 * This MCP server enables AI assistants to control and automate Adobe Animate
 * through the Model Context Protocol.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  CallToolRequest,
} from "@modelcontextprotocol/sdk/types.js";
import { executeJSFL } from "./jsfl-executor.js";
import { AnimateTools } from "./tools.js";

class AdobeAnimateMCPServer {
  private server: Server;
  private tools: AnimateTools;

  constructor() {
    this.server = new Server(
      {
        name: "adobe-animate-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.tools = new AnimateTools();
    this.setupHandlers();
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.tools.getAllTools(),
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest) => {
      const { name, arguments: args } = request.params;

      try {
        const jsflScript = this.tools.generateJSFL(name, args || {});
        const result = await executeJSFL(jsflScript);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing ${name}: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Adobe Animate MCP Server running on stdio");
  }
}

// Start the server
const server = new AdobeAnimateMCPServer();
server.run().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

