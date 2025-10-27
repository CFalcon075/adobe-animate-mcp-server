# Adobe Animate MCP Server

A Model Context Protocol (MCP) server that enables AI assistants (like Claude) to control and automate Adobe Animate through natural language commands.

## What is This?

This project allows AI to:
- Create new Adobe Animate documents
- Draw shapes (rectangles, ovals)
- Add text and images
- Create animations with keyframes and tweens
- Manage layers and timelines
- Export animations to various formats
- Run custom JSFL scripts

All through simple conversational commands!

## Prerequisites

- **Adobe Animate** (2020 or later) - Must be installed on your computer
- **Node.js** (18.0 or later) - [Download here](https://nodejs.org/)
- **An MCP-compatible AI client** (like Claude Desktop)

## Installation

### Step 1: Install the Server

Open your terminal/command prompt and run:

```bash
npm install
npm run build
```

### Step 2: Configure Your AI Client

#### For Claude Desktop:

1. Find your Claude Desktop configuration file:
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. Open the file and add this configuration:

```json
{
  "mcpServers": {
    "adobe-animate": {
      "command": "node",
      "args": [
        "D:/Coding Stuff/Model Context Protocol Server Coding/Adobe Animate MCP/dist/index.js"
      ]
    }
  }
}
```

**Important**: Replace the path with the actual path to your `dist/index.js` file. Use forward slashes (/) even on Windows.

3. Restart Claude Desktop

## How to Use

Once installed, you can ask Claude to control Adobe Animate using natural language:

### Example Commands

**Create a new animation:**
```
"Create a new Animate document that's 1920x1080 pixels at 30fps"
```

**Draw shapes:**
```
"Draw a red rectangle at position (100, 100) that's 200 pixels wide and 150 pixels tall"
```

**Add text:**
```
"Add the text 'Hello World' at position (400, 300) with font size 48"
```

**Create animation:**
```
"Create a keyframe at frame 30"
"Create a motion tween from frame 0 to frame 30"
```

**Save your work:**
```
"Save the document to C:/Users/YourName/Desktop/my_animation.fla"
```

**Export:**
```
"Export the animation as HTML5 to C:/Users/YourName/Desktop/output"
```

**Add ActionScript (NEW!):**
```
"Add a stop() action to frame 10"
"Add this ActionScript to the current frame: trace('Hello World');"
"Set the document class to 'Main'"
"Create a button, then add ActionScript to make it play a sound on click"
```

**Debug and Check Errors (NEW!):**
```
"Check for any errors or warnings in my document"
"Test my movie and show me any compilation errors"
"Clear the output panel"
```

**Scan Symbols and Layers (NEW!):**
```
"Show me all symbols in the library"
"List all movie clips in my library"
"Get information about all my layers"
"Select the layer called 'Background'"
"Add ActionScript to the button named 'playButton'"
```

## Available Tools

The server provides these tools to AI:

### Document & Drawing Tools
1. **create_new_document** - Create new Animate documents
2. **save_document** - Save your work
3. **add_layer** - Add new layers to timeline
4. **draw_rectangle** - Draw rectangles
5. **draw_oval** - Draw ovals/circles
6. **add_text** - Add text elements
7. **import_image** - Import images
8. **export_movie** - Export/publish animations

### Animation Tools
9. **create_keyframe** - Insert keyframes
10. **create_motion_tween** - Create motion animations
11. **convert_to_symbol** - Convert to symbols (movie clips, buttons, graphics)

### ActionScript 3.0 Tools (NEW!)
12. **add_actionscript_to_frame** - Add ActionScript code to a specific frame
13. **add_actionscript_to_instance** - Add ActionScript to a button or movie clip
14. **set_document_class** - Set the document class for AS3 projects
15. **add_stop_action** - Add stop() to a frame
16. **add_gotoAndPlay_action** - Add gotoAndPlay() navigation
17. **add_gotoAndStop_action** - Add gotoAndStop() navigation

### Utility Tools
18. **get_document_info** - Get document information
19. **select_all** - Select all elements
20. **delete_selection** - Delete selected elements
21. **run_custom_jsfl** - Run custom JSFL code for advanced operations

### Debugging Tools (NEW!)
22. **get_compiler_errors** - Get compiler errors, warnings, and document status
23. **clear_output_panel** - Clear the Adobe Animate output panel

### Library & Layer Scanning Tools (NEW!)
24. **get_library_items** - List all symbols and items in the library (with type filtering)
25. **get_layers_info** - Get detailed information about all layers
26. **select_layer_by_name** - Select a specific layer by its name
27. **add_actionscript_to_symbol_by_name** - Add ActionScript to a symbol instance by name

## How It Works

This server uses Adobe Animate's JSFL (JavaScript for Animate) scripting language to control the application. When you give a command to Claude:

1. Claude understands your request
2. Selects the appropriate tool
3. The MCP server generates JSFL code
4. The code is executed in Adobe Animate
5. Results are returned to Claude

## Important Notes

### About JSFL Execution

Adobe Animate's JSFL execution has some limitations:

- **Adobe Animate must be running** for commands to work
- Some commands require manual execution (see Troubleshooting below)
- Always use **forward slashes (/)** in file paths, even on Windows
  - Good: `C:/Users/Name/Desktop/file.fla`
  - Bad: `C:\Users\Name\Desktop\file.fla`

### Troubleshooting

If commands aren't executing automatically:

**Method 1: Manual JSFL Execution**

1. Ask Claude to generate the JSFL code
2. Copy the code
3. In Adobe Animate, go to: **Commands > Run Command...**
4. Paste the code and click **Run**

**Method 2: Install as Command**

1. Ask Claude for the JSFL code
2. Save it as a `.jsfl` file
3. Place it in:
   - Windows: `C:\Users\[YourUsername]\AppData\Local\Adobe\Animate [Version]\en_US\Configuration\Commands\`
   - Mac: `~/Library/Application Support/Adobe/Animate [Version]/en_US/Configuration/Commands/`
4. Restart Adobe Animate
5. Access from: **Commands menu** > **[Your Script Name]**

## Example JSFL Scripts

The `examples/` folder contains sample JSFL scripts you can run manually:

- `create_bouncing_ball.jsfl` - Creates a simple bouncing ball animation
- `draw_shapes.jsfl` - Demonstrates drawing various shapes
- `create_text_animation.jsfl` - Creates animated text

To use these:
1. Open Adobe Animate
2. Go to **Commands > Run Command...**
3. Browse to the example file and run it

## Development

### Project Structure

```
adobe-animate-mcp-server/
├── src/
│   ├── index.ts           # Main MCP server
│   ├── tools.ts           # Tool definitions and JSFL generation
│   └── jsfl-executor.ts   # JSFL execution logic
├── examples/              # Example JSFL scripts
├── dist/                  # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

### Building

```bash
npm run build
```

### Running Locally

```bash
npm start
```

## Advanced Usage

### Custom JSFL Scripts

You can run custom JSFL code using the `run_custom_jsfl` tool:

```
"Run this JSFL code: fl.outputPanel.trace('Hello from JSFL!');"
```

### Combining Multiple Operations

Claude can execute multiple operations in sequence:

```
"Create a new 1920x1080 document, add a layer called 'Background', 
draw a blue rectangle at (0,0) that fills the entire stage, 
then add another layer called 'Text' and add 'My Animation' in white text 
at the center of the stage"
```

## Contributing

This is an open-source project. Feel free to:
- Report issues
- Submit improvements
- Add new tools and features
- Share your creative uses!

## Resources

- [Adobe Animate JSFL Reference](https://an-scripting.docsforadobe.dev/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

## License

MIT License - See LICENSE file for details

## Support

If you run into issues:
1. Make sure Adobe Animate is running
2. Check that Node.js is installed correctly
3. Verify the path in your Claude Desktop config
4. Try running JSFL code manually to test Adobe Animate scripting

## Disclaimer

This is an unofficial tool and is not affiliated with or endorsed by Adobe. Adobe Animate is a trademark of Adobe Inc.

