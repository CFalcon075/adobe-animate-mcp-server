# Quick Start Guide

Get up and running with Adobe Animate MCP in 5 minutes!

## Prerequisites Check

✅ Adobe Animate installed (2020 or later)  
✅ Node.js installed (18.0 or later)  
✅ Claude Desktop or another MCP-compatible client

Not installed? See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

## Installation (3 steps)

### 1. Install Dependencies

Open terminal/command prompt in this folder and run:

```bash
npm install
npm run build
```

### 2. Configure Claude Desktop

Edit your Claude config file:
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`

Add this (replace the path with your actual path):

```json
{
  "mcpServers": {
    "adobe-animate": {
      "command": "node",
      "args": ["D:/Coding Stuff/Model Context Protocol Server Coding/Adobe Animate MCP/dist/index.js"]
    }
  }
}
```

**Important**: Use forward slashes (/) even on Windows!

### 3. Restart Claude Desktop

Completely quit and reopen Claude Desktop.

## Test It Out

### Test 1: Verify Connection

Open Claude Desktop and ask:
```
"Can you see the Adobe Animate tools?"
```

### Test 2: Create Your First Animation

1. **Open Adobe Animate** on your computer
2. In Claude, say:
```
"Create a new Animate document that's 800x600 pixels, 
then draw a red circle at (200, 200) that's 100 pixels in diameter"
```
3. Watch Adobe Animate create it! 🎉

## Common Commands

Once working, try these:

### Create Documents
```
"Create a new Animate document 1920x1080 at 30fps"
```

### Draw Shapes
```
"Draw a blue rectangle at (100, 100) that's 200x150 pixels"
"Draw a green oval at (300, 200) that's 150 pixels wide and 100 tall"
```

### Add Text
```
"Add the text 'Hello World' at (400, 300) with font size 48 and red color"
```

### Layers and Animation
```
"Add a new layer called 'Background'"
"Create a keyframe at frame 30"
"Create a motion tween from frame 0 to frame 30"
```

### Save and Export
```
"Save the document to C:/Users/YourName/Desktop/my_animation.fla"
"Export as HTML5 to C:/Users/YourName/Desktop/output"
```

## Example Projects

Try creating these step-by-step:

### 1. Simple Logo
```
1. "Create a new 800x600 document"
2. "Add a layer called 'Logo'"
3. "Draw a blue circle at (400, 300) that's 200 pixels wide"
4. "Add white text 'My Brand' at the center with size 36"
5. "Save to Desktop/logo.fla"
```

### 2. Bouncing Ball
```
1. "Create a new 800x600 document at 24fps"
2. "Draw a red circle at (400, 50) that's 50 pixels wide"
3. "Select all elements and convert to a movie clip symbol called 'Ball'"
4. "Create a keyframe at frame 12"
5. "In frame 12, move the ball to y position 500"
6. "Create a keyframe at frame 24"
7. "In frame 24, move the ball back to y position 75"
8. "Create motion tweens between frames 0-12 and 12-24"
```

### 3. Title Animation
```
1. "Create a new 1920x1080 document"
2. "Add text 'Welcome!' at (960, 540) with font size 72"
3. "Convert the text to a movie clip called 'Title'"
4. "Set the alpha to 0 at frame 0"
5. "Create a keyframe at frame 30"
6. "Set the alpha to 100 at frame 30"
7. "Create a motion tween from 0 to 30"
```

## Troubleshooting

### "Commands don't execute"

**Check:**
1. Is Adobe Animate running?
2. Did you restart Claude Desktop after config changes?
3. Is the path in config correct?

**Alternative**: Run JSFL manually
1. Ask Claude for the JSFL code
2. In Animate: Commands > Run Command...
3. Paste and run

### "Node not found"

- Restart computer after installing Node.js
- Verify: Open terminal, type `node --version`

### "MCP server not showing"

- Check config file path is correct
- Use forward slashes (/) in paths
- Restart Claude Desktop completely

## What Can You Create?

With this MCP server, you can automate:
- ✅ Logo animations
- ✅ Banner ads
- ✅ Social media content
- ✅ Educational animations
- ✅ Game sprites
- ✅ UI mockups
- ✅ Motion graphics
- ✅ And much more!

## Learn More

- [README.md](README.md) - Full documentation
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup instructions
- [JSFL_REFERENCE.md](JSFL_REFERENCE.md) - JSFL command reference
- [examples/](examples/) - Example JSFL scripts

## Tips for Success

1. **Always have Adobe Animate open** before giving commands
2. **Use specific coordinates and sizes** for best results
3. **Build animations step by step** - don't try to do everything at once
4. **Save frequently** - use "save document" commands
5. **Experiment** - try different shapes, colors, and animations!

## Getting Help

If something doesn't work:
1. Check Adobe Animate is running
2. Try the manual JSFL execution method
3. Review the troubleshooting section
4. Check the detailed SETUP_GUIDE.md

## Have Fun! 🎨

You now have AI-powered animation capabilities. Start simple and build up to more complex animations. The possibilities are endless!

---

**Ready to dive deeper?** Check out the full [README.md](README.md) for all available tools and advanced features.

