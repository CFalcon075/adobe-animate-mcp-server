# JSFL Quick Reference for Adobe Animate MCP

This document provides a quick reference for JSFL (JavaScript for Animate) commands used by the MCP server.

## What is JSFL?

JSFL (JavaScript for Animate, formerly Flash) is a scripting language based on JavaScript that lets you automate tasks in Adobe Animate.

## Core Objects

### fl (Flash/Animate Application)
The main application object.

```javascript
fl.outputPanel.trace("Hello!");  // Print to output panel
fl.outputPanel.clear();          // Clear output panel
fl.createDocument("html5");      // Create new document
fl.getDocumentDOM();             // Get current document
```

### Document Object
Represents an open Animate document (.fla file).

```javascript
var doc = fl.getDocumentDOM();
doc.width = 1920;                // Set width
doc.height = 1080;               // Set height
doc.frameRate = 30;              // Set frame rate
doc.backgroundColor = 0xFF0000;  // Set background color (hex)
doc.save("path/to/file.fla");    // Save document
```

### Timeline Object
Represents the timeline of a document.

```javascript
var timeline = doc.getTimeline();
timeline.currentFrame = 10;          // Set current frame
timeline.currentLayer = 0;           // Set current layer
timeline.layerCount;                 // Get number of layers
timeline.frameCount;                 // Get number of frames
timeline.addNewLayer("LayerName");   // Add new layer
timeline.insertKeyframe(10);         // Insert keyframe
timeline.createMotionTween();        // Create motion tween
```

## Drawing Functions

### Colors

Colors in JSFL are specified as decimal numbers, not hex strings.

```javascript
// Convert hex to decimal:
// #FF0000 (red) = 16711680
// #00FF00 (green) = 65280
// #0000FF (blue) = 255

doc.setFillColor(0xFF0000);    // Red fill
doc.setStrokeColor(0x000000);  // Black stroke
```

### Drawing Shapes

```javascript
// Rectangle
doc.addNewRectangle(
  {left: x, top: y, right: x+width, bottom: y+height},
  cornerRadius  // 0 for sharp corners
);

// Oval
doc.addNewOval(
  {left: x, top: y, right: x+width, bottom: y+height}
);

// Line
doc.addNewLine(
  {x: x1, y: y1},
  {x: x2, y: y2}
);
```

### Text

```javascript
// Add text field
doc.addNewText(
  {left: x, top: y, right: x+width, bottom: y+height}
);

// Modify text
var textObj = doc.selection[0];
textObj.setTextString("Hello World");

// Set text attributes
var attrs = textObj.getTextAttr();
attrs.size = 24;              // Font size
attrs.face = "Arial";         // Font family
attrs.fillColor = 0x000000;   // Text color
textObj.setTextAttr(attrs);
```

## Selection and Manipulation

```javascript
// Selection
doc.selectAll();                  // Select all
doc.selectNone();                 // Deselect all
doc.selection;                    // Array of selected elements

// Manipulation
doc.deleteSelection();            // Delete selected
doc.duplicateSelection();         // Duplicate selected
doc.moveSelectionBy({x: 10, y: 20}); // Move selected

// Symbols
doc.convertToSymbol(
  "movie clip",     // Type: "movie clip", "button", "graphic"
  "SymbolName",     // Name
  "center"          // Registration: "center", "top left", etc.
);
```

## Layers

```javascript
var timeline = doc.getTimeline();

// Add layer
timeline.addNewLayer("LayerName", "normal");
// Types: "normal", "guide", "guided", "mask", "masked", "folder"

// Access layers
timeline.layers[0];           // Get layer by index
timeline.layers[0].name;      // Layer name
timeline.layers[0].visible;   // Visibility
timeline.layers[0].locked;    // Lock status

// Delete layer
timeline.deleteLayer(0);      // Delete by index
```

## Frames and Animation

```javascript
var timeline = doc.getTimeline();

// Frames
timeline.insertKeyframe(10);           // Insert keyframe
timeline.insertBlankKeyframe(10);      // Insert blank keyframe
timeline.clearKeyframe(10);            // Remove keyframe
timeline.removeFrames(10, 20);         // Remove frame range

// Selection
timeline.setSelectedFrames(start, end);  // Select frame range
timeline.getSelectedFrames();            // Get selected frames

// Tweening
timeline.createMotionTween();          // Classic tween
timeline.convertToKeyframes(start, end); // Convert to keyframes
```

## Library

```javascript
// Add to library
doc.addItemToDocument({x: 0, y: 0}, "LibraryItemName");

// Library items
doc.library.items;                    // Array of all items
doc.library.getItemProperty("name");  // Get item property
doc.library.selectItem("ItemName");   // Select library item
doc.library.deleteItem("ItemName");   // Delete library item
```

## Import and Export

```javascript
// Import
doc.importFile(
  "path/to/image.png",
  true  // Import to library (false = to stage)
);

// Export
doc.exportPublishProfileString("path/to/output");
doc.exportSWF("path/to/output.swf");
doc.exportPNG("path/to/output.png", true, true);
```

## File Operations

```javascript
// File paths - ALWAYS use forward slashes!
var path = "C:/Users/Name/Desktop/file.fla";  // Good
var path = "C:\\Users\\Name\\Desktop\\file.fla"; // Bad

// File object
FLfile.exists(path);           // Check if file exists
FLfile.read(path);             // Read file
FLfile.write(path, content);   // Write file
FLfile.remove(path);           // Delete file
```

## Useful Properties

### Document Properties

```javascript
doc.width              // Stage width
doc.height             // Stage height
doc.frameRate          // Frame rate
doc.backgroundColor    // Background color
doc.currentPublishProfile  // Current publish profile
```

### Element Properties

```javascript
element.x              // X position
element.y              // Y position
element.width          // Width
element.height         // Height
element.rotation       // Rotation (degrees)
element.scaleX         // Horizontal scale
element.scaleY         // Vertical scale
element.alpha          // Opacity (0-1)
element.name           // Instance name
```

## Debugging

```javascript
// Output panel
fl.outputPanel.clear();
fl.outputPanel.trace("Debug message");
fl.outputPanel.trace("Variable: " + myVar);

// Alerts (avoid in automation)
alert("Message");

// Confirm dialog (avoid in automation)
confirm("Are you sure?");
```

## Color Conversion

JavaScript helper to convert hex colors to decimal:

```javascript
function hexToDecimal(hex) {
  // Remove # if present
  hex = hex.replace("#", "");
  return parseInt(hex, 16);
}

// Usage:
var red = hexToDecimal("#FF0000");    // 16711680
var blue = hexToDecimal("#0000FF");   // 255
```

## Common Patterns

### Create Document with Content

```javascript
// Create and setup document
var doc = fl.createDocument("html5");
doc.width = 1920;
doc.height = 1080;
doc.frameRate = 30;

// Add content
doc.setFillColor(0xFF0000);
doc.addNewOval({left: 100, top: 100, right: 200, bottom: 200});

// Save
doc.save("C:/path/to/file.fla");
```

### Create Animation

```javascript
var doc = fl.getDocumentDOM();
var timeline = doc.getTimeline();

// Draw shape at frame 0
doc.setFillColor(0xFF0000);
doc.addNewOval({left: 100, top: 100, right: 150, bottom: 150});

// Convert to symbol
doc.selectAll();
doc.convertToSymbol("movie clip", "Ball", "center");

// Create end keyframe
timeline.insertKeyframe(30);

// Move symbol
doc.selection[0].x = 400;

// Create tween
timeline.setSelectedFrames(0, 30);
timeline.createMotionTween();
```

### Iterate Through Layers

```javascript
var timeline = doc.getTimeline();

for (var i = 0; i < timeline.layerCount; i++) {
  var layer = timeline.layers[i];
  fl.outputPanel.trace("Layer " + i + ": " + layer.name);
}
```

## Best Practices

1. **Always check if document exists:**
   ```javascript
   if (fl.getDocumentDOM()) {
     // Your code
   } else {
     fl.outputPanel.trace("No document open");
   }
   ```

2. **Use forward slashes in paths:**
   ```javascript
   var path = "C:/Users/Name/file.fla";  // Correct
   ```

3. **Clear output panel for clean results:**
   ```javascript
   fl.outputPanel.clear();
   ```

4. **Handle errors gracefully:**
   ```javascript
   try {
     // Risky operation
   } catch (e) {
     fl.outputPanel.trace("Error: " + e.message);
   }
   ```

## Resources

- [Official Adobe Animate JSFL Documentation](https://an-scripting.docsforadobe.dev/)
- [JSFL API Reference](https://helpx.adobe.com/animate/using/writing-scripts.html)

## Tips for MCP Integration

When creating JSFL for MCP tools:

1. Always use `fl.outputPanel.trace()` to return results
2. Clear the output panel at the start: `fl.outputPanel.clear()`
3. Use JSON.stringify() for complex data
4. Check for document existence
5. Provide clear error messages
6. Use descriptive variable names

Example template:

```javascript
var doc = fl.getDocumentDOM();
fl.outputPanel.clear();

if (!doc) {
  fl.outputPanel.trace("Error: No document is open");
} else {
  try {
    // Your operation here
    fl.outputPanel.trace("Success: Operation completed");
  } catch (e) {
    fl.outputPanel.trace("Error: " + e.message);
  }
}
```

