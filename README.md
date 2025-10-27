# Adobe Animate MCP Server

A Model Context Protocol (MCP) server that enables AI assistants to control and automate Adobe Animate through natural language commands.

## 🎯 What is This?

This project allows AI to:
- Create new Adobe Animate documents
- Draw shapes (rectangles, ovals)
- Add text and images
- Create animations with keyframes and tweens
- Manage layers and timelines
- **Apply ActionScript 3.0 code** to frames, buttons, and objects
- Scan symbols and layers
- Debug and check errors
- Export animations to various formats

All through simple conversational commands!

## ✨ Features

- **27 Tools** for complete Adobe Animate control
- **ActionScript 3.0 Support** - Add code to frames, instances, and set document classes
- **Library & Layer Scanning** - Query symbols and layers by name
- **Debugging Tools** - Get compiler errors and document status
- **Full Output Capture** - See actual results from JSFL operations
- **JSON Polyfill** - Works with JSFL's older JavaScript engine

## 📦 Prerequisites

- **Adobe Animate** (2020 or later) - Must be installed on your computer
- **Node.js** (18.0 or later) - [Download here](https://nodejs.org/)
- **An MCP-compatible AI client** (like Claude Desktop or Cursor IDE)

## 🚀 Installation

### Step 1: Clone and Install

```bash
git clone https://github.com/CFalcon075/adobe-animate-mcp-server.git
cd adobe-animate-mcp-server
npm install
npm run build
```

### Step 2: Configure Your AI Client

#### For Cursor IDE:

Edit `%USERPROFILE%\\.cursor\\mcp.json`:

```json
{
  "mcpServers": {
    "adobe-animate": {
      "command": "node",
      "args": [
        "/path/to/adobe-animate-mcp-server/dist/index.js"
      ]
    }
  }
}
```

Replace the path with your actual installation path.

#### For Claude Desktop:

Edit `%APPDATA%\\Claude\\claude_desktop_config.json` with the same format.

### Step 3: Restart Your AI Client

## 🎨 Usage Examples

### Create Documents
```
"Create a new Animate document 800x600 pixels"
```

### Draw Shapes
```
"Draw a red circle at (200, 200) that's 100 pixels wide"
```

### Add ActionScript
```
"Add a stop() action to frame 1"
"Select the layer called 'intro' and add ActionScript to make it play once then continue"
```

### Scan and Debug
```
"Show me all layers in my document"
"List all symbols in the library"
"Check for any errors in my document"
```

## 🛠️ Available Tools (27 Total)

See full documentation for all 27 tools including document management, drawing, animation, ActionScript, debugging, and library scanning.

## 📖 Documentation

- **QUICK_START.md** - 5-minute getting started guide
- **SETUP_GUIDE.md** - Detailed installation instructions
- **JSFL_REFERENCE.md** - JSFL command reference
- **FAQ.md** - Frequently asked questions
- **PROJECT_OVERVIEW.md** - Project structure guide

## 📁 Project Structure

```
adobe-animate-mcp-server/
├── src/                  # TypeScript source code
│   ├── index.ts         # Main MCP server
│   ├── tools.ts         # 27 tool definitions
│   └── jsfl-executor.ts # JSFL execution engine
├── examples/            # Example JSFL scripts
├── dist/                # Compiled JavaScript (generated)
└── docs/                # Comprehensive documentation
```

## 🔧 Development

```bash
npm run build   # Compile TypeScript
npm start       # Run the server
```

## 📝 License

MIT License - See LICENSE file

## ⚠️ Disclaimer

This is an unofficial tool and is not affiliated with or endorsed by Adobe. Adobe Animate is a trademark of Adobe Inc.

## 🙏 Contributing

This is a private repository. Contact the owner for contribution guidelines.

---

**Built with ❤️ using the Model Context Protocol**
