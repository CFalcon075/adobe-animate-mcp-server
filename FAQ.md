# Frequently Asked Questions (FAQ)

## General Questions

### What is MCP?

MCP (Model Context Protocol) is an open standard that allows AI assistants (like Claude) to interact with external tools and applications. Think of it as a bridge that lets AI control software on your computer.

### What is JSFL?

JSFL (JavaScript for Animate, formerly Flash) is Adobe Animate's scripting language. It's based on JavaScript and allows you to automate tasks in Animate.

### Do I need to know how to code?

No! That's the beauty of this project. You can tell Claude what you want to create in plain English, and Claude will generate and execute the necessary code.

### Is this officially supported by Adobe?

No, this is an independent open-source project. It uses Adobe Animate's official JSFL scripting API, which is documented and supported by Adobe for automation purposes.

## Installation Questions

### What versions of Adobe Animate are supported?

Adobe Animate 2020 and later. The server should work with:
- Adobe Animate 2024
- Adobe Animate 2023
- Adobe Animate 2022
- Adobe Animate 2021
- Adobe Animate 2020

### Can I use this with other AI assistants besides Claude?

Yes! Any AI assistant that supports the Model Context Protocol (MCP) can use this server. Claude Desktop is the most popular, but others are emerging.

### Do I need Adobe Creative Cloud subscription?

Yes, you need a valid Adobe Animate license/subscription to use Adobe Animate itself. This MCP server just provides a way to control it through AI.

### Can I install this on Mac?

Yes! The server works on both Windows and Mac. However, the automatic JSFL execution might work differently on Mac. You may need to use manual JSFL execution (see Troubleshooting).

## Usage Questions

### Does Adobe Animate need to be running?

Yes, Adobe Animate must be running for commands to execute. The MCP server communicates with the running application.

### Can I use this while working in Animate normally?

Yes! You can use this alongside your regular Animate workflow. The AI-generated scripts will affect the currently open document.

### What happens if I make a mistake?

You can use Ctrl+Z (Cmd+Z on Mac) to undo actions in Animate, just like normal. The AI-generated scripts are no different from manual actions.

### Can the AI see what's on my Animate canvas?

No, the AI cannot see the visual canvas. However, it can query document information (dimensions, layers, frame count, etc.) and remember what it created during the conversation.

### How do I stop the server?

The server runs only when Claude Desktop is running and using it. When you close Claude Desktop, the server stops automatically.

## Technical Questions

### Why use forward slashes in Windows paths?

JSFL requires forward slashes in file paths, even on Windows. This is a JSFL requirement, not a limitation of this server.

Good: `C:/Users/Name/Desktop/file.fla`  
Bad: `C:\Users\Name\Desktop\file.fla`

### Can I run custom JSFL code?

Yes! Use the `run_custom_jsfl` tool. In Claude, you can say:
```
"Run this JSFL code: fl.outputPanel.trace('Hello!');"
```

### Where does the JSFL code get executed?

The server generates JSFL code and attempts to execute it in Adobe Animate. If automatic execution fails, you can run it manually through Animate's Commands menu.

### Can I see the JSFL code being generated?

Yes! Just ask Claude to show you the JSFL code instead of executing it:
```
"Show me the JSFL code to draw a red circle, but don't execute it"
```

### How do I add new tools/commands?

Edit `src/tools.ts` to add new tool definitions and their corresponding JSFL generators. Then rebuild with `npm run build`.

## Troubleshooting

### Commands aren't executing automatically

This is common! Try these solutions:

**Solution 1: Manual Execution**
1. Ask Claude to show you the JSFL code
2. Copy it
3. In Animate: Commands > Run Command...
4. Paste and run

**Solution 2: Save as Script**
1. Save the JSFL code as a `.jsfl` file
2. Place in Animate's Commands folder
3. Access from Commands menu

**Solution 3: Check Paths**
- Verify Adobe Animate is installed
- Update `animatePaths` in `src/jsfl-executor.ts` if needed

### "Cannot find module '@modelcontextprotocol/sdk'"

Run `npm install` in the project folder to install dependencies.

### Changes to code aren't taking effect

After editing any `.ts` files, you must rebuild:
```bash
npm run build
```

Then restart Claude Desktop.

### Adobe Animate crashes when running scripts

This usually means there's an error in the JSFL code. Check:
- Are you trying to perform operations on a closed document?
- Are coordinates within the stage bounds?
- Is the document type supported for the operation?

### "Error: No document is open"

You need to have a document open in Animate. Either:
1. Manually open/create a document in Animate
2. Ask Claude to create a new document first

## Feature Questions

### Can I import/export files?

Yes! You can:
- Import images: `import_image` tool
- Export to various formats: `export_movie` tool
- Save FLA files: `save_document` tool

### Can I create motion tweens?

Yes! Use the `create_motion_tween` tool. You need:
1. An object on the stage
2. Keyframes at start and end positions
3. Then create the tween between them

### Can I work with symbols and the library?

Yes! You can:
- Convert elements to symbols: `convert_to_symbol`
- Import library items (via custom JSFL)
- Manage symbol instances

### Can I create shape tweens?

Shape tweens require custom JSFL code. Use the `run_custom_jsfl` tool with appropriate JSFL commands.

### Can I work with ActionScript/code?

Yes, through custom JSFL! You can add ActionScript to frames, buttons, and objects using JSFL commands.

### What export formats are supported?

Adobe Animate supports exporting to:
- HTML5 Canvas
- WebGL
- SVG
- Animated GIF
- Video (via Media Encoder)
- SWF (legacy)

Use the `export_movie` tool and specify the format.

## Performance Questions

### Is there a delay when executing commands?

Yes, there may be a small delay:
1. Claude processes your request (1-2 seconds)
2. JSFL code is generated (<1 second)
3. Code is executed in Animate (varies by operation)

### Can I batch multiple operations?

Yes! Claude can chain multiple operations:
```
"Create a new document, add 3 layers named Layer1, Layer2, Layer3, 
and draw a red circle on Layer1, a blue square on Layer2, 
and green text on Layer3"
```

### Will this slow down my computer?

No, the MCP server is lightweight. It only runs when Claude is actively using it.

## Security Questions

### Is it safe to let AI control my software?

The AI can only execute commands through the MCP server, which only has access to Adobe Animate's documented JSFL API. It cannot:
- Access other applications
- Read arbitrary files on your computer
- Execute system commands
- Access the internet independently

However, always review what you're asking Claude to do, especially when working with important files.

### Can Claude access my files?

Claude can only access Adobe Animate documents through JSFL commands you approve. It cannot browse your file system or access files outside of what you explicitly tell it to work with.

### Should I use this on production files?

It's recommended to:
1. Test on copies of important files first
2. Save backups regularly
3. Use version control for important projects
4. Verify AI-generated results before continuing

## Advanced Questions

### Can I extend this server with new features?

Yes! The server is open source. You can:
1. Add new tools in `src/tools.ts`
2. Modify JSFL generation logic
3. Add new execution methods
4. Contribute back to the project

### Can I use this in a production pipeline?

Yes, but consider:
- Testing thoroughly first
- Implementing proper error handling
- Creating backups and version control
- Monitoring execution results

### Can multiple MCP servers run simultaneously?

Yes! Claude Desktop can connect to multiple MCP servers at once. You could have servers for Animate, Photoshop, etc., all available simultaneously.

### Can I run this on a server/cloud?

The MCP server itself can run anywhere Node.js runs, but Adobe Animate must be installed and running on the same machine. So cloud/server deployment is limited unless you have Animate installed there.

### Can I create a GUI for this?

The MCP server uses stdin/stdout for communication with Claude. To create a GUI, you'd need to:
1. Create a separate client application
2. Implement the MCP protocol
3. Connect to the server
4. Design your interface

## Getting More Help

### Where can I find JSFL documentation?

- [Official Adobe JSFL Documentation](https://an-scripting.docsforadobe.dev/)
- [JSFL_REFERENCE.md](JSFL_REFERENCE.md) in this project
- Adobe Animate Help menu

### Where can I learn about MCP?

- [Model Context Protocol Website](https://modelcontextprotocol.io/)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)
- [MCP Specification](https://modelcontextprotocol.io/specification/draft)

### How do I report bugs or request features?

This depends on where you got this project. If it's on GitHub or another platform, use their issue tracking system. Otherwise, document the issue clearly with:
- What you tried to do
- What happened
- What you expected to happen
- Any error messages

### Can I contribute to this project?

Yes! Contributions are welcome. You can:
- Fix bugs
- Add new tools
- Improve documentation
- Share example scripts
- Help other users

---

**Didn't find your answer?** Check the other documentation files:
- [README.md](README.md) - Main documentation
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Installation guide
- [QUICK_START.md](QUICK_START.md) - Quick start tutorial
- [JSFL_REFERENCE.md](JSFL_REFERENCE.md) - JSFL command reference

