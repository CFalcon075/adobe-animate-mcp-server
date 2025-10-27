/**
 * Adobe Animate MCP Tools
 * 
 * Defines all the tools (actions) that AI can perform in Adobe Animate
 */

import { Tool } from "@modelcontextprotocol/sdk/types.js";

export class AnimateTools {
  private tools: Tool[] = [
    {
      name: "create_new_document",
      description: "Create a new Adobe Animate document with specified dimensions and frame rate",
      inputSchema: {
        type: "object",
        properties: {
          width: {
            type: "number",
            description: "Width of the document in pixels",
            default: 1920,
          },
          height: {
            type: "number",
            description: "Height of the document in pixels",
            default: 1080,
          },
          frameRate: {
            type: "number",
            description: "Frame rate (fps) of the animation",
            default: 24,
          },
          docType: {
            type: "string",
            description: "Document type (html5, actionscript3, etc.)",
            default: "html5",
          },
        },
      },
    },
    {
      name: "save_document",
      description: "Save the current document to a specified path",
      inputSchema: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Full path where to save the .fla file (use forward slashes)",
          },
        },
        required: ["path"],
      },
    },
    {
      name: "add_layer",
      description: "Add a new layer to the current timeline",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of the new layer",
          },
          layerType: {
            type: "string",
            description: "Type of layer: 'normal', 'guide', 'folder', 'mask'",
            default: "normal",
          },
        },
        required: ["name"],
      },
    },
    {
      name: "draw_rectangle",
      description: "Draw a rectangle on the stage at specified coordinates",
      inputSchema: {
        type: "object",
        properties: {
          x: {
            type: "number",
            description: "X coordinate of top-left corner",
          },
          y: {
            type: "number",
            description: "Y coordinate of top-left corner",
          },
          width: {
            type: "number",
            description: "Width of rectangle",
          },
          height: {
            type: "number",
            description: "Height of rectangle",
          },
          fillColor: {
            type: "string",
            description: "Fill color in hex format (e.g., '#FF0000')",
            default: "#000000",
          },
          strokeColor: {
            type: "string",
            description: "Stroke color in hex format",
            default: "#000000",
          },
        },
        required: ["x", "y", "width", "height"],
      },
    },
    {
      name: "draw_oval",
      description: "Draw an oval/ellipse on the stage",
      inputSchema: {
        type: "object",
        properties: {
          x: {
            type: "number",
            description: "X coordinate of bounding box top-left",
          },
          y: {
            type: "number",
            description: "Y coordinate of bounding box top-left",
          },
          width: {
            type: "number",
            description: "Width of bounding box",
          },
          height: {
            type: "number",
            description: "Height of bounding box",
          },
          fillColor: {
            type: "string",
            description: "Fill color in hex format",
            default: "#000000",
          },
          strokeColor: {
            type: "string",
            description: "Stroke color in hex format",
            default: "#000000",
          },
        },
        required: ["x", "y", "width", "height"],
      },
    },
    {
      name: "add_text",
      description: "Add text to the stage",
      inputSchema: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "The text content to add",
          },
          x: {
            type: "number",
            description: "X coordinate",
          },
          y: {
            type: "number",
            description: "Y coordinate",
          },
          fontSize: {
            type: "number",
            description: "Font size in points",
            default: 12,
          },
          fontFamily: {
            type: "string",
            description: "Font family name",
            default: "Arial",
          },
          color: {
            type: "string",
            description: "Text color in hex format",
            default: "#000000",
          },
        },
        required: ["text", "x", "y"],
      },
    },
    {
      name: "create_keyframe",
      description: "Create a keyframe at specified frame number",
      inputSchema: {
        type: "object",
        properties: {
          frameNumber: {
            type: "number",
            description: "Frame number where to insert keyframe (0-based)",
          },
          layerIndex: {
            type: "number",
            description: "Index of the layer (0-based, defaults to current layer)",
          },
        },
        required: ["frameNumber"],
      },
    },
    {
      name: "create_motion_tween",
      description: "Create a classic motion tween between two keyframes",
      inputSchema: {
        type: "object",
        properties: {
          startFrame: {
            type: "number",
            description: "Starting frame number",
          },
          endFrame: {
            type: "number",
            description: "Ending frame number",
          },
        },
        required: ["startFrame", "endFrame"],
      },
    },
    {
      name: "convert_to_symbol",
      description: "Convert selected elements to a symbol (Movie Clip, Button, or Graphic)",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of the symbol",
          },
          symbolType: {
            type: "string",
            description: "Type: 'movie clip', 'button', or 'graphic'",
            default: "movie clip",
          },
          registrationPoint: {
            type: "string",
            description: "Registration point: 'center', 'top left', etc.",
            default: "center",
          },
        },
        required: ["name"],
      },
    },
    {
      name: "import_image",
      description: "Import an image file to the stage or library",
      inputSchema: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Full path to the image file (use forward slashes)",
          },
          toLibrary: {
            type: "boolean",
            description: "Import to library only (true) or to stage (false)",
            default: false,
          },
        },
        required: ["path"],
      },
    },
    {
      name: "export_movie",
      description: "Export/publish the animation to various formats",
      inputSchema: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Full path for the exported file (use forward slashes)",
          },
          format: {
            type: "string",
            description: "Export format: 'swf', 'html5', 'gif', 'video', etc.",
            default: "html5",
          },
        },
        required: ["path"],
      },
    },
    {
      name: "get_document_info",
      description: "Get information about the current document (dimensions, frame rate, layers, etc.)",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "select_all",
      description: "Select all elements on the current frame",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "delete_selection",
      description: "Delete currently selected elements",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "run_custom_jsfl",
      description: "Execute custom JSFL (JavaScript for Animate) code directly",
      inputSchema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "JSFL code to execute",
          },
        },
        required: ["code"],
      },
    },
    {
      name: "add_actionscript_to_frame",
      description: "Add ActionScript 3.0 code to a specific frame on the timeline",
      inputSchema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "ActionScript 3.0 code to add to the frame",
          },
          frameNumber: {
            type: "number",
            description: "Frame number where to add the code (0-based, defaults to current frame)",
          },
          layerIndex: {
            type: "number",
            description: "Index of the layer (0-based, defaults to current layer)",
          },
        },
        required: ["code"],
      },
    },
    {
      name: "add_actionscript_to_instance",
      description: "Add ActionScript 3.0 code to a selected movie clip or button instance",
      inputSchema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "ActionScript 3.0 code to add to the instance",
          },
          instanceName: {
            type: "string",
            description: "Instance name of the object (will be set if not already named)",
          },
        },
        required: ["code"],
      },
    },
    {
      name: "set_document_class",
      description: "Set the document class for ActionScript 3.0 project",
      inputSchema: {
        type: "object",
        properties: {
          className: {
            type: "string",
            description: "Name of the document class (e.g., 'Main')",
          },
        },
        required: ["className"],
      },
    },
    {
      name: "add_stop_action",
      description: "Add a stop() action to a frame to stop the timeline",
      inputSchema: {
        type: "object",
        properties: {
          frameNumber: {
            type: "number",
            description: "Frame number where to add stop() (defaults to current frame)",
          },
        },
      },
    },
    {
      name: "add_gotoAndPlay_action",
      description: "Add a gotoAndPlay() action to navigate to a specific frame",
      inputSchema: {
        type: "object",
        properties: {
          targetFrame: {
            type: "number",
            description: "Frame number to go to (1-based, as in Flash)",
          },
          currentFrame: {
            type: "number",
            description: "Frame where to add this code (defaults to current frame)",
          },
        },
        required: ["targetFrame"],
      },
    },
    {
      name: "add_gotoAndStop_action",
      description: "Add a gotoAndStop() action to navigate to a frame and stop",
      inputSchema: {
        type: "object",
        properties: {
          targetFrame: {
            type: "number",
            description: "Frame number to go to (1-based, as in Flash)",
          },
          currentFrame: {
            type: "number",
            description: "Frame where to add this code (defaults to current frame)",
          },
        },
        required: ["targetFrame"],
      },
    },
    {
      name: "get_compiler_errors",
      description: "Get compiler errors, warnings, and output panel messages from Adobe Animate to help debug issues",
      inputSchema: {
        type: "object",
        properties: {
          testMovie: {
            type: "boolean",
            description: "If true, test the movie to get compilation errors. If false, just read current output panel.",
            default: false,
          },
        },
      },
    },
    {
      name: "clear_output_panel",
      description: "Clear the output panel in Adobe Animate",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "get_library_items",
      description: "Get a list of all symbols and items in the library (movie clips, buttons, graphics, etc.)",
      inputSchema: {
        type: "object",
        properties: {
          itemType: {
            type: "string",
            description: "Filter by type: 'movie clip', 'button', 'graphic', 'bitmap', 'sound', 'video', 'font', or 'all'",
            default: "all",
          },
        },
      },
    },
    {
      name: "get_layers_info",
      description: "Get detailed information about all layers in the current timeline",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "select_layer_by_name",
      description: "Select a specific layer by its name to work with it",
      inputSchema: {
        type: "object",
        properties: {
          layerName: {
            type: "string",
            description: "Name of the layer to select",
          },
        },
        required: ["layerName"],
      },
    },
    {
      name: "add_actionscript_to_symbol_by_name",
      description: "Add ActionScript 3.0 code to a symbol instance by finding it by name on the stage",
      inputSchema: {
        type: "object",
        properties: {
          instanceName: {
            type: "string",
            description: "Instance name of the symbol on the stage",
          },
          code: {
            type: "string",
            description: "ActionScript 3.0 code to add",
          },
        },
        required: ["instanceName", "code"],
      },
    },
  ];

  getAllTools(): Tool[] {
    return this.tools;
  }

  generateJSFL(toolName: string, args: Record<string, any>): string {
    switch (toolName) {
      case "create_new_document":
        return this.jsfl_createNewDocument(args);
      case "save_document":
        return this.jsfl_saveDocument(args);
      case "add_layer":
        return this.jsfl_addLayer(args);
      case "draw_rectangle":
        return this.jsfl_drawRectangle(args);
      case "draw_oval":
        return this.jsfl_drawOval(args);
      case "add_text":
        return this.jsfl_addText(args);
      case "create_keyframe":
        return this.jsfl_createKeyframe(args);
      case "create_motion_tween":
        return this.jsfl_createMotionTween(args);
      case "convert_to_symbol":
        return this.jsfl_convertToSymbol(args);
      case "import_image":
        return this.jsfl_importImage(args);
      case "export_movie":
        return this.jsfl_exportMovie(args);
      case "get_document_info":
        return this.jsfl_getDocumentInfo(args);
      case "select_all":
        return this.jsfl_selectAll(args);
      case "delete_selection":
        return this.jsfl_deleteSelection(args);
      case "run_custom_jsfl":
        return args.code || "";
      case "add_actionscript_to_frame":
        return this.jsfl_addActionScriptToFrame(args);
      case "add_actionscript_to_instance":
        return this.jsfl_addActionScriptToInstance(args);
      case "set_document_class":
        return this.jsfl_setDocumentClass(args);
      case "add_stop_action":
        return this.jsfl_addStopAction(args);
      case "add_gotoAndPlay_action":
        return this.jsfl_addGotoAndPlayAction(args);
      case "add_gotoAndStop_action":
        return this.jsfl_addGotoAndStopAction(args);
      case "get_compiler_errors":
        return this.jsfl_getCompilerErrors(args);
      case "clear_output_panel":
        return this.jsfl_clearOutputPanel(args);
      case "get_library_items":
        return this.jsfl_getLibraryItems(args);
      case "get_layers_info":
        return this.jsfl_getLayersInfo(args);
      case "select_layer_by_name":
        return this.jsfl_selectLayerByName(args);
      case "add_actionscript_to_symbol_by_name":
        return this.jsfl_addActionScriptToSymbolByName(args);
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }

  private jsfl_createNewDocument(args: Record<string, any>): string {
    const width = args.width || 1920;
    const height = args.height || 1080;
    const frameRate = args.frameRate || 24;

    // Create document without specifying type (uses default), then set properties
    return `
var doc = fl.createDocument();
doc.width = ${width};
doc.height = ${height};
doc.frameRate = ${frameRate};
fl.outputPanel.clear();
fl.outputPanel.trace("Created new document: " + ${width} + "x" + ${height} + " @ " + ${frameRate} + "fps");
`;
  }

  private jsfl_saveDocument(args: Record<string, any>): string {
    return `
if (fl.getDocumentDOM()) {
  var success = fl.getDocumentDOM().save("${args.path}");
  fl.outputPanel.clear();
  fl.outputPanel.trace(success ? "Document saved successfully" : "Failed to save document");
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_addLayer(args: Record<string, any>): string {
    const layerName = args.name;
    const layerType = args.layerType || "normal";

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  var timeline = doc.getTimeline();
  timeline.addNewLayer("${layerName}", "${layerType}");
  fl.outputPanel.clear();
  fl.outputPanel.trace("Added new layer: ${layerName}");
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_drawRectangle(args: Record<string, any>): string {
    const { x, y, width, height } = args;
    const fillColor = this.hexToDecimal(args.fillColor || "#000000");
    const strokeColor = this.hexToDecimal(args.strokeColor || "#000000");

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  doc.setFillColor(${fillColor});
  doc.setStrokeColor(${strokeColor});
  doc.addNewRectangle({left:${x}, top:${y}, right:${x + width}, bottom:${y + height}}, 0);
  fl.outputPanel.clear();
  fl.outputPanel.trace("Drew rectangle at (${x}, ${y}) with size ${width}x${height}");
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_drawOval(args: Record<string, any>): string {
    const { x, y, width, height } = args;
    const fillColor = this.hexToDecimal(args.fillColor || "#000000");
    const strokeColor = this.hexToDecimal(args.strokeColor || "#000000");

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  doc.setFillColor(${fillColor});
  doc.setStrokeColor(${strokeColor});
  doc.addNewOval({left:${x}, top:${y}, right:${x + width}, bottom:${y + height}});
  fl.outputPanel.clear();
  fl.outputPanel.trace("Drew oval at (${x}, ${y}) with size ${width}x${height}");
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_addText(args: Record<string, any>): string {
    const { text, x, y } = args;
    const fontSize = args.fontSize || 12;
    const fontFamily = args.fontFamily || "Arial";
    const color = this.hexToDecimal(args.color || "#000000");

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  doc.addNewText({left:${x}, top:${y}, right:${x + 200}, bottom:${y + 50}});
  var textObj = doc.selection[0];
  if (textObj) {
    textObj.setTextString("${text.replace(/"/g, '\\"')}");
    doc.setTextRectangle({left:${x}, top:${y}, right:${x + 200}, bottom:${y + 50}});
    var textAttrs = textObj.getTextAttr();
    textAttrs.size = ${fontSize};
    textAttrs.face = "${fontFamily}";
    textAttrs.fillColor = ${color};
    textObj.setTextAttr(textAttrs);
  }
  fl.outputPanel.clear();
  fl.outputPanel.trace("Added text at (${x}, ${y})");
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_createKeyframe(args: Record<string, any>): string {
    const frameNumber = args.frameNumber;
    const layerIndex = args.layerIndex !== undefined ? args.layerIndex : "timeline.currentLayer";

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  var timeline = doc.getTimeline();
  var layerIdx = ${layerIndex};
  timeline.currentLayer = layerIdx;
  timeline.insertKeyframe(${frameNumber});
  fl.outputPanel.clear();
  fl.outputPanel.trace("Created keyframe at frame ${frameNumber}");
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_createMotionTween(args: Record<string, any>): string {
    const { startFrame, endFrame } = args;

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  var timeline = doc.getTimeline();
  timeline.setSelectedFrames(${startFrame}, ${endFrame});
  timeline.createMotionTween();
  fl.outputPanel.clear();
  fl.outputPanel.trace("Created motion tween from frame ${startFrame} to ${endFrame}");
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_convertToSymbol(args: Record<string, any>): string {
    const name = args.name;
    const symbolType = args.symbolType || "movie clip";
    const registrationPoint = args.registrationPoint || "center";

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  if (doc.selection.length > 0) {
    doc.convertToSymbol("${symbolType}", "${name}", "${registrationPoint}");
    fl.outputPanel.clear();
    fl.outputPanel.trace("Converted selection to symbol: ${name}");
  } else {
    fl.outputPanel.clear();
    fl.outputPanel.trace("Error: No elements selected");
  }
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_importImage(args: Record<string, any>): string {
    const path = args.path;
    const toLibrary = args.toLibrary || false;

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  doc.importFile("${path}", ${toLibrary});
  fl.outputPanel.clear();
  fl.outputPanel.trace("Imported image from ${path}");
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_exportMovie(args: Record<string, any>): string {
    const path = args.path;
    const format = args.format || "html5";

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  doc.exportPublishProfileString("${path}");
  fl.outputPanel.clear();
  fl.outputPanel.trace("Exported animation to ${path}");
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_getDocumentInfo(args: Record<string, any>): string {
    return `${this.getJSONPolyfill()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  var timeline = doc.getTimeline();
  var info = {
    width: doc.width,
    height: doc.height,
    frameRate: doc.frameRate,
    currentFrame: timeline.currentFrame,
    layerCount: timeline.layerCount,
    layers: []
  };
  
  for (var i = 0; i < timeline.layerCount; i++) {
    var layer = timeline.layers[i];
    info.layers.push({
      name: layer.name,
      frameCount: layer.frameCount,
      layerType: layer.layerType
    });
  }
  
  results.success = true;
  results.data = info;
  
  fl.outputPanel.clear();
  fl.outputPanel.trace(JSON.stringify(info, null, 2));
} else {
  results.error = "No document is open";
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}

// Write results to temp file
var outputPath = "%%OUTPUT_FILE%%";
FLfile.write(outputPath, JSON.stringify(results));
`;
  }

  private jsfl_selectAll(args: Record<string, any>): string {
    return `
var doc = fl.getDocumentDOM();
if (doc) {
  doc.selectAll();
  fl.outputPanel.clear();
  fl.outputPanel.trace("Selected all elements");
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_deleteSelection(args: Record<string, any>): string {
    return `
var doc = fl.getDocumentDOM();
if (doc) {
  doc.deleteSelection();
  fl.outputPanel.clear();
  fl.outputPanel.trace("Deleted selection");
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private hexToDecimal(hex: string): number {
    // Remove # if present
    hex = hex.replace("#", "");
    return parseInt(hex, 16);
  }

  // JSON polyfill for JSFL (older JavaScript engine without native JSON)
  private getJSONPolyfill(): string {
    return `
// JSON polyfill for JSFL
if (typeof JSON === 'undefined') {
  JSON = {
    stringify: function(obj) {
      var t = typeof obj;
      if (t != "object" || obj === null) {
        if (t == "string") return '"' + obj.replace(/"/g, '\\\\"') + '"';
        return String(obj);
      } else {
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
          v = obj[n];
          t = typeof v;
          if (t == "string") v = '"' + v.replace(/"/g, '\\\\"') + '"';
          else if (t == "object" && v !== null) v = JSON.stringify(v);
          json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
      }
    }
  };
}
`;
  }

  // ActionScript 3.0 Support Methods

  private jsfl_addActionScriptToFrame(args: Record<string, any>): string {
    const code = args.code;
    const frameNumber = args.frameNumber !== undefined ? args.frameNumber : "timeline.currentFrame";
    const layerIndex = args.layerIndex !== undefined ? args.layerIndex : "timeline.currentLayer";

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  var timeline = doc.getTimeline();
  var frameIdx = ${frameNumber};
  var layerIdx = ${layerIndex};
  
  timeline.currentLayer = layerIdx;
  var layer = timeline.layers[layerIdx];
  
  // Find the frame at the specified index
  var frameArray = layer.frames;
  var targetFrame = null;
  
  for (var i = 0; i < frameArray.length; i++) {
    if (frameArray[i].startFrame <= frameIdx && 
        (i + 1 >= frameArray.length || frameArray[i + 1].startFrame > frameIdx)) {
      targetFrame = frameArray[i];
      break;
    }
  }
  
  if (targetFrame) {
    targetFrame.actionScript = ${JSON.stringify(code)};
    fl.outputPanel.clear();
    fl.outputPanel.trace("Added ActionScript to frame " + frameIdx + " on layer " + layerIdx);
  } else {
    fl.outputPanel.clear();
    fl.outputPanel.trace("Error: Could not find frame at index " + frameIdx);
  }
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_addActionScriptToInstance(args: Record<string, any>): string {
    const code = args.code;
    const instanceName = args.instanceName || "";

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  if (doc.selection.length > 0) {
    var instance = doc.selection[0];
    
    // Set instance name if provided
    if ("${instanceName}" !== "") {
      instance.name = "${instanceName}";
    }
    
    // Add ActionScript to the instance
    if (instance.elementType === "instance") {
      // For movie clips and buttons, add script
      instance.actionScript = ${JSON.stringify(code)};
      fl.outputPanel.clear();
      fl.outputPanel.trace("Added ActionScript to instance: " + (instance.name || "unnamed"));
    } else {
      fl.outputPanel.clear();
      fl.outputPanel.trace("Error: Selected element is not a symbol instance");
    }
  } else {
    fl.outputPanel.clear();
    fl.outputPanel.trace("Error: No element selected. Please select a movie clip or button instance.");
  }
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_setDocumentClass(args: Record<string, any>): string {
    const className = args.className;

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  doc.docClass = "${className}";
  fl.outputPanel.clear();
  fl.outputPanel.trace("Set document class to: ${className}");
  fl.outputPanel.trace("Note: Make sure to create a ${className}.as file in your project directory");
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_addStopAction(args: Record<string, any>): string {
    const frameNumber = args.frameNumber !== undefined ? args.frameNumber : "timeline.currentFrame";

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  var timeline = doc.getTimeline();
  var frameIdx = ${frameNumber};
  var layer = timeline.layers[timeline.currentLayer];
  
  // Find the frame
  var frameArray = layer.frames;
  var targetFrame = null;
  
  for (var i = 0; i < frameArray.length; i++) {
    if (frameArray[i].startFrame <= frameIdx && 
        (i + 1 >= frameArray.length || frameArray[i + 1].startFrame > frameIdx)) {
      targetFrame = frameArray[i];
      break;
    }
  }
  
  if (targetFrame) {
    // Add stop() to existing ActionScript or create new
    var existingCode = targetFrame.actionScript || "";
    if (existingCode && !existingCode.match(/stop\\s*\\(\\s*\\)/)) {
      targetFrame.actionScript = existingCode + "\\nstop();";
    } else if (!existingCode) {
      targetFrame.actionScript = "stop();";
    }
    fl.outputPanel.clear();
    fl.outputPanel.trace("Added stop() action to frame " + frameIdx);
  } else {
    fl.outputPanel.clear();
    fl.outputPanel.trace("Error: Could not find frame at index " + frameIdx);
  }
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_addGotoAndPlayAction(args: Record<string, any>): string {
    const targetFrame = args.targetFrame;
    const currentFrame = args.currentFrame !== undefined ? args.currentFrame : "timeline.currentFrame";

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  var timeline = doc.getTimeline();
  var frameIdx = ${currentFrame};
  var layer = timeline.layers[timeline.currentLayer];
  
  // Find the frame
  var frameArray = layer.frames;
  var targetFrame = null;
  
  for (var i = 0; i < frameArray.length; i++) {
    if (frameArray[i].startFrame <= frameIdx && 
        (i + 1 >= frameArray.length || frameArray[i + 1].startFrame > frameIdx)) {
      targetFrame = frameArray[i];
      break;
    }
  }
  
  if (targetFrame) {
    var gotoCode = "gotoAndPlay(${targetFrame});";
    var existingCode = targetFrame.actionScript || "";
    if (existingCode) {
      targetFrame.actionScript = existingCode + "\\n" + gotoCode;
    } else {
      targetFrame.actionScript = gotoCode;
    }
    fl.outputPanel.clear();
    fl.outputPanel.trace("Added gotoAndPlay(${targetFrame}) to frame " + frameIdx);
  } else {
    fl.outputPanel.clear();
    fl.outputPanel.trace("Error: Could not find frame at index " + frameIdx);
  }
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_addGotoAndStopAction(args: Record<string, any>): string {
    const targetFrame = args.targetFrame;
    const currentFrame = args.currentFrame !== undefined ? args.currentFrame : "timeline.currentFrame";

    return `
var doc = fl.getDocumentDOM();
if (doc) {
  var timeline = doc.getTimeline();
  var frameIdx = ${currentFrame};
  var layer = timeline.layers[timeline.currentLayer];
  
  // Find the frame
  var frameArray = layer.frames;
  var targetFrame = null;
  
  for (var i = 0; i < frameArray.length; i++) {
    if (frameArray[i].startFrame <= frameIdx && 
        (i + 1 >= frameArray.length || frameArray[i + 1].startFrame > frameIdx)) {
      targetFrame = frameArray[i];
      break;
    }
  }
  
  if (targetFrame) {
    var gotoCode = "gotoAndStop(${targetFrame});";
    var existingCode = targetFrame.actionScript || "";
    if (existingCode) {
      targetFrame.actionScript = existingCode + "\\n" + gotoCode;
    } else {
      targetFrame.actionScript = gotoCode;
    }
    fl.outputPanel.clear();
    fl.outputPanel.trace("Added gotoAndStop(${targetFrame}) to frame " + frameIdx);
  } else {
    fl.outputPanel.clear();
    fl.outputPanel.trace("Error: Could not find frame at index " + frameIdx);
  }
} else {
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}
`;
  }

  private jsfl_getCompilerErrors(args: Record<string, any>): string {
    const testMovie = args.testMovie || false;

    if (testMovie) {
      // Test the movie and capture compiler errors
      return `${this.getJSONPolyfill()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  // Clear output first
  fl.outputPanel.clear();
  
  // Test the movie to trigger compilation
  fl.getDocumentDOM().testMovie();
  
  results.success = true;
  results.data = {
    action: "testMovie",
    message: "Compilation started. Check Adobe Animate output panel for errors."
  };
  
  fl.outputPanel.trace("===== COMPILATION STARTED =====");
  fl.outputPanel.trace("Check output panel for any errors or warnings");
} else {
  results.error = "No document is open";
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}

// Write results to temp file
var outputPath = "%%OUTPUT_FILE%%";
FLfile.write(outputPath, JSON.stringify(results));
`;
    } else {
      // Just report current state
      return `${this.getJSONPolyfill()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  var timeline = doc.getTimeline();
  var statusData = {
    document: doc.name,
    path: doc.path || "Not saved",
    modified: doc.canRevert(),
    currentFrame: timeline.currentFrame,
    totalLayers: timeline.layerCount,
    actionScriptLocations: []
  };
  
  // Check for ActionScript in frames
  for (var i = 0; i < timeline.layerCount; i++) {
    var layer = timeline.layers[i];
    for (var j = 0; j < layer.frames.length; j++) {
      var frame = layer.frames[j];
      if (frame.actionScript && frame.actionScript.length > 0) {
        statusData.actionScriptLocations.push({
          layer: i,
          layerName: layer.name,
          frame: frame.startFrame
        });
      }
    }
  }
  
  results.success = true;
  results.data = statusData;
  
  fl.outputPanel.trace("===== DOCUMENT STATUS =====");
  fl.outputPanel.trace(JSON.stringify(statusData, null, 2));
  fl.outputPanel.trace("===== TIP =====");
  fl.outputPanel.trace("To see compilation errors, use testMovie: true");
} else {
  results.error = "No document is open";
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}

// Write results to temp file
var outputPath = "%%OUTPUT_FILE%%";
FLfile.write(outputPath, JSON.stringify(results));
`;
    }
  }

  private jsfl_clearOutputPanel(args: Record<string, any>): string {
    return `
fl.outputPanel.clear();
fl.outputPanel.trace("Output panel cleared");
`;
  }

  private jsfl_getLibraryItems(args: Record<string, any>): string {
    const itemType = args.itemType || "all";

    return `${this.getJSONPolyfill()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  var library = doc.library;
  var items = library.items;
  var libraryData = {
    filterType: "${itemType}",
    totalItems: 0,
    items: []
  };
  
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var typeMatch = "${itemType}" === "all" || item.itemType === "${itemType}";
    
    if (typeMatch) {
      var itemData = {
        name: item.name,
        type: item.itemType
      };
      
      // Additional info for symbol types
      if (item.itemType === "movie clip" || item.itemType === "button" || item.itemType === "graphic") {
        itemData.symbolType = item.symbolType;
        if (item.linkageClassName) {
          itemData.linkageClass = item.linkageClassName;
        }
      }
      
      libraryData.items.push(itemData);
      libraryData.totalItems++;
    }
  }
  
  results.success = true;
  results.data = libraryData;
  
  // Still trace for user visibility
  fl.outputPanel.clear();
  fl.outputPanel.trace("===== LIBRARY ITEMS =====");
  fl.outputPanel.trace(JSON.stringify(libraryData, null, 2));
} else {
  results.error = "No document is open";
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}

// Write results to temp file
var outputPath = "%%OUTPUT_FILE%%";
FLfile.write(outputPath, JSON.stringify(results));
`;
  }

  private jsfl_getLayersInfo(args: Record<string, any>): string {
    return `${this.getJSONPolyfill()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  var timeline = doc.getTimeline();
  var layersData = {
    totalLayers: timeline.layerCount,
    currentLayer: timeline.currentLayer,
    layers: []
  };
  
  for (var i = 0; i < timeline.layerCount; i++) {
    var layer = timeline.layers[i];
    
    // Check for ActionScript in frames
    var hasActionScript = false;
    for (var j = 0; j < layer.frames.length; j++) {
      if (layer.frames[j].actionScript && layer.frames[j].actionScript.length > 0) {
        hasActionScript = true;
        break;
      }
    }
    
    layersData.layers.push({
      index: i,
      name: layer.name,
      type: layer.layerType,
      visible: layer.visible,
      locked: layer.locked,
      frameCount: layer.frameCount,
      outline: layer.outline,
      hasActionScript: hasActionScript
    });
  }
  
  results.success = true;
  results.data = layersData;
  
  // Still trace for user visibility
  fl.outputPanel.clear();
  fl.outputPanel.trace("===== LAYERS INFORMATION =====");
  fl.outputPanel.trace(JSON.stringify(layersData, null, 2));
} else {
  results.error = "No document is open";
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}

// Write results to temp file
var outputPath = "%%OUTPUT_FILE%%";
FLfile.write(outputPath, JSON.stringify(results));
`;
  }

  private jsfl_selectLayerByName(args: Record<string, any>): string {
    const layerName = args.layerName;

    return `${this.getJSONPolyfill()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  var timeline = doc.getTimeline();
  var found = false;
  var availableLayers = [];
  
  for (var i = 0; i < timeline.layerCount; i++) {
    availableLayers.push(timeline.layers[i].name);
    if (timeline.layers[i].name === "${layerName}") {
      timeline.currentLayer = i;
      found = true;
      results.success = true;
      results.data = {
        layerName: "${layerName}",
        layerIndex: i,
        selected: true
      };
      fl.outputPanel.clear();
      fl.outputPanel.trace("Selected layer: ${layerName} (index " + i + ")");
      break;
    }
  }
  
  if (!found) {
    results.error = "Layer '${layerName}' not found";
    results.data = { availableLayers: availableLayers };
    fl.outputPanel.clear();
    fl.outputPanel.trace("Error: Layer '${layerName}' not found");
    fl.outputPanel.trace("Available layers: " + availableLayers.join(", "));
  }
} else {
  results.error = "No document is open";
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}

// Write results to temp file
var outputPath = "%%OUTPUT_FILE%%";
FLfile.write(outputPath, JSON.stringify(results));
`;
  }

  private jsfl_addActionScriptToSymbolByName(args: Record<string, any>): string {
    const instanceName = args.instanceName;
    const code = args.code;

    return `${this.getJSONPolyfill()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  var timeline = doc.getTimeline();
  var found = false;
  
  // Search through all layers and frames for the instance
  for (var i = 0; i < timeline.layerCount; i++) {
    var layer = timeline.layers[i];
    for (var j = 0; j < layer.frames.length; j++) {
      var frame = layer.frames[j];
      if (frame.elements) {
        for (var k = 0; k < frame.elements.length; k++) {
          var element = frame.elements[k];
          if (element.elementType === "instance" && element.name === "${instanceName}") {
            element.actionScript = ${JSON.stringify(code)};
            found = true;
            results.success = true;
            results.data = {
              instanceName: "${instanceName}",
              layer: layer.name,
              frameNumber: frame.startFrame,
              codeAdded: true
            };
            fl.outputPanel.clear();
            fl.outputPanel.trace("Added ActionScript to instance: ${instanceName}");
            fl.outputPanel.trace("Layer: " + layer.name);
            fl.outputPanel.trace("Frame: " + frame.startFrame);
            break;
          }
        }
        if (found) break;
      }
    }
    if (found) break;
  }
  
  if (!found) {
    results.error = "Instance '${instanceName}' not found on stage";
    fl.outputPanel.clear();
    fl.outputPanel.trace("Error: Instance '${instanceName}' not found on stage");
    fl.outputPanel.trace("Make sure the instance exists and has an instance name");
  }
} else {
  results.error = "No document is open";
  fl.outputPanel.clear();
  fl.outputPanel.trace("Error: No document is open");
}

// Write results to temp file
var outputPath = "%%OUTPUT_FILE%%";
FLfile.write(outputPath, JSON.stringify(results));
`;
  }
}

