# Setup Guide for Adobe Animate MCP Server

This guide will walk you through setting up the Adobe Animate MCP Server step by step, even if you're not familiar with coding.

## What You Need

Before starting, make sure you have:

1. **Adobe Animate** - Any version from 2020 onwards
2. **A computer** running Windows or Mac
3. **Internet connection** - For downloading required software

## Step-by-Step Installation

### Step 1: Install Node.js

Node.js is required to run the MCP server.

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the "LTS" version (recommended for most users)
3. Run the installer
4. Follow the installation wizard (use default settings)
5. Restart your computer after installation

**To verify installation:**
- Open Command Prompt (Windows) or Terminal (Mac)
- Type: `node --version`
- You should see something like `v18.0.0` or higher

### Step 2: Install the MCP Server

1. **Download this project:**
   - If you received this as a ZIP file, extract it to a folder
   - Remember the folder location (e.g., `C:\Users\YourName\adobe-animate-mcp`)

2. **Open Command Prompt or Terminal:**
   - **Windows**: Press `Win + R`, type `cmd`, press Enter
   - **Mac**: Press `Cmd + Space`, type `terminal`, press Enter

3. **Navigate to the project folder:**
   ```bash
   cd "C:\Users\YourName\adobe-animate-mcp"
   ```
   (Replace with your actual folder path)

4. **Install dependencies:**
   ```bash
   npm install
   ```
   Wait for it to complete (may take 1-2 minutes)

5. **Build the project:**
   ```bash
   npm run build
   ```
   This creates the `dist` folder with the compiled code

### Step 3: Setup Claude Desktop (or other MCP client)

#### For Claude Desktop:

1. **Find your configuration file:**
   
   **Windows:**
   - Press `Win + R`
   - Type: `%APPDATA%\Claude`
   - Press Enter
   - Look for `claude_desktop_config.json`
   
   **Mac:**
   - Open Finder
   - Press `Cmd + Shift + G`
   - Type: `~/Library/Application Support/Claude`
   - Press Enter
   - Look for `claude_desktop_config.json`

2. **Edit the configuration file:**
   
   - Right-click the file → "Open with" → Choose "Notepad" (Windows) or "TextEdit" (Mac)
   
   - If the file is empty or doesn't exist, paste this:
   ```json
   {
     "mcpServers": {
       "adobe-animate": {
         "command": "node",
         "args": [
           "C:/Users/YourName/adobe-animate-mcp/dist/index.js"
         ]
       }
     }
   }
   ```
   
   - **IMPORTANT**: Replace `C:/Users/YourName/adobe-animate-mcp` with your actual folder path
   - **IMPORTANT**: Use forward slashes (/) not backslashes (\), even on Windows!
   
   - If the file already has content, add the `adobe-animate` section inside `mcpServers`:
   ```json
   {
     "mcpServers": {
       "existing-server": {
         ...
       },
       "adobe-animate": {
         "command": "node",
         "args": [
           "C:/Users/YourName/adobe-animate-mcp/dist/index.js"
         ]
       }
     }
   }
   ```

3. **Save the file** and close the editor

4. **Restart Claude Desktop** completely (quit and reopen)

### Step 4: Verify Installation

1. Open Claude Desktop
2. Look for a small tool/plugin icon (usually in the bottom corner)
3. You should see "adobe-animate" listed
4. If you see it, you're all set! 🎉

## Testing It Out

### Test 1: Check Connection

In Claude Desktop, try asking:
```
"Can you see the Adobe Animate tools?"
```

Claude should respond confirming it can access the Adobe Animate MCP server.

### Test 2: Create a Simple Animation

1. **First, open Adobe Animate** on your computer

2. Then in Claude Desktop, try:
```
"Create a new Animate document that's 800x600 pixels"
```

3. Check Adobe Animate - you should see a new document appear!

### Test 3: Draw Something

Try:
```
"Draw a red circle at position (200, 200) that's 100 pixels wide"
```

## Troubleshooting

### Problem: "adobe-animate not found" in Claude

**Solution:**
- Check that the path in `claude_desktop_config.json` is correct
- Make sure you used forward slashes (/)
- Verify the `dist/index.js` file exists
- Restart Claude Desktop completely

### Problem: Commands don't seem to work

**Solution:**
- Make sure Adobe Animate is running
- Try running the JSFL code manually (see below)

### Problem: "Node is not recognized"

**Solution:**
- Node.js might not be installed correctly
- Restart your computer after installing Node.js
- Try reinstalling Node.js

## Manual JSFL Execution (If Automatic Execution Fails)

If commands aren't executing automatically:

1. Ask Claude to generate the JSFL code for your desired action
2. Copy the JSFL code Claude provides
3. In Adobe Animate:
   - Go to **Commands** menu → **Run Command...**
   - Paste the code
   - Click **Run**

## Understanding the Folder Structure

```
adobe-animate-mcp/
├── src/                  # Source TypeScript code
├── dist/                 # Compiled JavaScript (auto-generated)
├── examples/            # Example JSFL scripts you can run
├── node_modules/        # Dependencies (auto-generated)
├── package.json         # Project configuration
├── README.md           # Main documentation
└── SETUP_GUIDE.md      # This file
```

## Example Commands to Try

Once everything is set up, try these commands in Claude:

1. **"Create a new animation with dimensions 1920x1080"**
2. **"Add a layer called 'Background'"**
3. **"Draw a blue rectangle that fills the stage"**
4. **"Add the text 'Hello World' in the center with font size 48"**
5. **"Save the document to C:/Users/YourName/Desktop/test.fla"**

## Getting Help

If you're stuck:
1. Check the main README.md file
2. Look at the example JSFL scripts in the `examples/` folder
3. Try running the example scripts manually in Adobe Animate
4. Make sure all prerequisites are installed

## Next Steps

Once you have everything working:
- Explore the example JSFL scripts in the `examples/` folder
- Try creating more complex animations
- Experiment with different commands
- Check the Adobe Animate JSFL documentation for advanced features

Happy animating! 🎨✨

