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
      name: "create_layer_folder",
      description: "Create a timeline layer folder with optional placement and visibility/lock settings",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of the timeline folder to create",
          },
          position: {
            type: "number",
            description: "Optional layer index to create the folder near",
          },
          addAbove: {
            type: "boolean",
            description: "If true, create above the position/current layer; if false, create below",
            default: true,
          },
          visible: {
            type: "boolean",
            description: "Whether the folder should be visible",
            default: true,
          },
          locked: {
            type: "boolean",
            description: "Whether the folder should be locked",
            default: false,
          },
        },
        required: ["name"],
      },
    },
    {
      name: "create_timeline_folder_structure",
      description: "Create a game-friendly timeline folder structure with optional child layers under each folder",
      inputSchema: {
        type: "object",
        properties: {
          structure: {
            type: "array",
            description: "Optional custom structure. Each item has folderName and optional layers.",
            items: {
              type: "object",
              properties: {
                folderName: {
                  type: "string",
                  description: "Folder layer name",
                },
                layers: {
                  type: "array",
                  description: "Normal child layer names to create below the folder",
                  items: {
                    type: "string",
                  },
                },
              },
              required: ["folderName"],
            },
          },
          addMissingOnly: {
            type: "boolean",
            description: "Skip folders/layers that already exist by name",
            default: true,
          },
          expandFolders: {
            type: "boolean",
            description: "Expand created folders after creating the structure",
            default: true,
          },
        },
      },
    },
    {
      name: "get_timeline_tree",
      description: "Return the current timeline as structured folder/layer metadata",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "move_layer_to_folder",
      description: "Move a timeline layer next to a folder so it becomes part of that folder block",
      inputSchema: {
        type: "object",
        properties: {
          layerName: {
            type: "string",
            description: "Name of the layer or folder to move",
          },
          folderName: {
            type: "string",
            description: "Name of the destination folder layer",
          },
          position: {
            type: "string",
            description: "Where to place the layer in the folder block: 'first' or 'last'",
            default: "last",
          },
        },
        required: ["layerName", "folderName"],
      },
    },
    {
      name: "set_folder_expanded",
      description: "Expand or collapse a timeline folder, optionally applying recursively",
      inputSchema: {
        type: "object",
        properties: {
          folderName: {
            type: "string",
            description: "Name of the folder to expand or collapse. Use '*' for all folders.",
          },
          expanded: {
            type: "boolean",
            description: "True to expand, false to collapse",
            default: true,
          },
          recursive: {
            type: "boolean",
            description: "Apply to nested folders as well",
            default: false,
          },
        },
        required: ["folderName"],
      },
    },
    {
      name: "rename_layer_or_folder",
      description: "Rename a timeline layer or folder by its current name",
      inputSchema: {
        type: "object",
        properties: {
          currentName: {
            type: "string",
            description: "Current layer or folder name",
          },
          newName: {
            type: "string",
            description: "New layer or folder name",
          },
        },
        required: ["currentName", "newName"],
      },
    },
    {
      name: "delete_layer_or_folder",
      description: "Delete a timeline layer or folder by name, optionally deleting its folder block contents",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of the layer or folder to delete",
          },
          includeContents: {
            type: "boolean",
            description: "For folder layers, delete the folder and the following layers in its folder block",
            default: false,
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
      name: "get_project_info",
      description: "Get the current Animate project/document name, file path, save state, and related project metadata",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "get_actionscript_info",
      description: "Get ActionScript version, document class, source/class paths, publish profile, and AS2/AS3 capability warnings",
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
      description: "Add ActionScript 2.0 or 3.0 code to a specific frame on the timeline",
      inputSchema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "ActionScript code to add to the frame",
          },
          scriptVersion: {
            type: "string",
            description: "ActionScript version: 'as2', 'as3', or 'auto'",
            default: "auto",
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
      description: "Add ActionScript 2.0 or 3.0 code to a selected movie clip or button instance",
      inputSchema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "ActionScript code to add to the instance",
          },
          scriptVersion: {
            type: "string",
            description: "ActionScript version: 'as2', 'as3', or 'auto'",
            default: "auto",
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
      name: "set_actionscript_version",
      description: "Attempt to set the document ActionScript version to AS2 or AS3 using safe exposed JSFL properties",
      inputSchema: {
        type: "object",
        properties: {
          scriptVersion: {
            type: "string",
            description: "Target ActionScript version: 'as2' or 'as3'",
          },
        },
        required: ["scriptVersion"],
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
      name: "add_as2_keyboard_controls",
      description: "Add AS2 keyboard movement controls for a named player instance",
      inputSchema: {
        type: "object",
        properties: {
          playerInstanceName: {
            type: "string",
            description: "AS2 instance name to move",
            default: "player",
          },
          speed: {
            type: "number",
            description: "Movement speed in pixels per frame",
            default: 6,
          },
          frameNumber: {
            type: "number",
            description: "Frame number where to add the code",
          },
          layerIndex: {
            type: "number",
            description: "Layer index where to add the code",
          },
        },
      },
    },
    {
      name: "add_as2_button_handler",
      description: "Add an AS2 button event handler that navigates to a target frame",
      inputSchema: {
        type: "object",
        properties: {
          buttonInstanceName: {
            type: "string",
            description: "Button or movie clip instance name",
          },
          eventName: {
            type: "string",
            description: "AS2 handler property such as 'onRelease', 'onPress', or 'onRollOver'",
            default: "onRelease",
          },
          targetFrame: {
            type: "number",
            description: "Target frame number, 1-based",
          },
          playMode: {
            type: "string",
            description: "'play' for gotoAndPlay or 'stop' for gotoAndStop",
            default: "play",
          },
          frameNumber: {
            type: "number",
            description: "Timeline frame where to add the handler",
          },
          layerIndex: {
            type: "number",
            description: "Timeline layer where to add the handler",
          },
        },
        required: ["buttonInstanceName", "targetFrame"],
      },
    },
    {
      name: "add_as2_frame_loop",
      description: "Add an AS2 onEnterFrame loop with a custom body",
      inputSchema: {
        type: "object",
        properties: {
          body: {
            type: "string",
            description: "Code to run inside the onEnterFrame function",
            default: "trace('AS2 frame loop tick');",
          },
          frameNumber: {
            type: "number",
            description: "Timeline frame where to add the loop",
          },
          layerIndex: {
            type: "number",
            description: "Timeline layer where to add the loop",
          },
        },
      },
    },
    {
      name: "add_as3_keyboard_controls",
      description: "Add AS3 keyboard movement controls for a named player instance",
      inputSchema: {
        type: "object",
        properties: {
          playerInstanceName: {
            type: "string",
            description: "AS3 instance name to move",
            default: "player",
          },
          speed: {
            type: "number",
            description: "Movement speed in pixels per key press",
            default: 6,
          },
          frameNumber: {
            type: "number",
            description: "Frame number where to add the code",
          },
          layerIndex: {
            type: "number",
            description: "Layer index where to add the code",
          },
        },
      },
    },
    {
      name: "add_as3_button_handler",
      description: "Add an AS3 MouseEvent.CLICK button handler that navigates to a target frame",
      inputSchema: {
        type: "object",
        properties: {
          buttonInstanceName: {
            type: "string",
            description: "Button or movie clip instance name",
          },
          targetFrame: {
            type: "number",
            description: "Target frame number, 1-based",
          },
          playMode: {
            type: "string",
            description: "'play' for gotoAndPlay or 'stop' for gotoAndStop",
            default: "play",
          },
          frameNumber: {
            type: "number",
            description: "Timeline frame where to add the handler",
          },
          layerIndex: {
            type: "number",
            description: "Timeline layer where to add the handler",
          },
        },
        required: ["buttonInstanceName", "targetFrame"],
      },
    },
    {
      name: "add_as3_document_class_stub",
      description: "Create an AS3 document class stub beside the FLA and set it as the document class",
      inputSchema: {
        type: "object",
        properties: {
          className: {
            type: "string",
            description: "Document class name",
            default: "Main",
          },
          packageName: {
            type: "string",
            description: "Optional AS3 package name",
            default: "",
          },
          directory: {
            type: "string",
            description: "Optional output directory. Defaults to the FLA directory.",
          },
          overwrite: {
            type: "boolean",
            description: "Overwrite the file if it already exists",
            default: false,
          },
        },
      },
    },
    {
      name: "create_actionscript_file",
      description: "Create an external AS2 or AS3 .as file beside the FLA or in a provided folder",
      inputSchema: {
        type: "object",
        properties: {
          scriptVersion: {
            type: "string",
            description: "ActionScript version: 'as2' or 'as3'",
            default: "as3",
          },
          className: {
            type: "string",
            description: "Class/file base name",
            default: "Main",
          },
          packageName: {
            type: "string",
            description: "Optional package name for AS3 or dotted class path for AS2",
            default: "",
          },
          directory: {
            type: "string",
            description: "Optional output directory. Defaults to the FLA directory.",
          },
          fileName: {
            type: "string",
            description: "Optional explicit file name ending in .as",
          },
          code: {
            type: "string",
            description: "Optional full ActionScript source code. If omitted, a version-specific class stub is generated.",
          },
          overwrite: {
            type: "boolean",
            description: "Overwrite the file if it already exists",
            default: false,
          },
        },
      },
    },
    {
      name: "scan_actionscript_usage",
      description: "Scan frames and symbol instances for ActionScript and classify likely AS2/AS3 syntax",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "test_movie_and_report",
      description: "Test the movie and return ActionScript/project metadata with guidance for compiler output",
      inputSchema: {
        type: "object",
        properties: {},
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
      description: "Add ActionScript 2.0 or 3.0 code to a symbol instance by finding it by name on the stage",
      inputSchema: {
        type: "object",
        properties: {
          instanceName: {
            type: "string",
            description: "Instance name of the symbol on the stage",
          },
          code: {
            type: "string",
            description: "ActionScript code to add",
          },
          scriptVersion: {
            type: "string",
            description: "ActionScript version: 'as2', 'as3', or 'auto'",
            default: "auto",
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
      case "create_layer_folder":
        return this.jsfl_createLayerFolder(args);
      case "create_timeline_folder_structure":
        return this.jsfl_createTimelineFolderStructure(args);
      case "get_timeline_tree":
        return this.jsfl_getTimelineTree(args);
      case "move_layer_to_folder":
        return this.jsfl_moveLayerToFolder(args);
      case "set_folder_expanded":
        return this.jsfl_setFolderExpanded(args);
      case "rename_layer_or_folder":
        return this.jsfl_renameLayerOrFolder(args);
      case "delete_layer_or_folder":
        return this.jsfl_deleteLayerOrFolder(args);
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
      case "get_project_info":
        return this.jsfl_getProjectInfo(args);
      case "get_actionscript_info":
        return this.jsfl_getActionScriptInfo(args);
      case "select_all":
        return this.jsfl_selectAll(args);
      case "delete_selection":
        return this.jsfl_deleteSelection(args);
      case "run_custom_jsfl":
        return this.jsfl_runCustomJSFL(args);
      case "add_actionscript_to_frame":
        return this.jsfl_addActionScriptToFrame(args);
      case "add_actionscript_to_instance":
        return this.jsfl_addActionScriptToInstance(args);
      case "set_actionscript_version":
        return this.jsfl_setActionScriptVersion(args);
      case "set_document_class":
        return this.jsfl_setDocumentClass(args);
      case "add_as2_keyboard_controls":
        return this.jsfl_addAS2KeyboardControls(args);
      case "add_as2_button_handler":
        return this.jsfl_addAS2ButtonHandler(args);
      case "add_as2_frame_loop":
        return this.jsfl_addAS2FrameLoop(args);
      case "add_as3_keyboard_controls":
        return this.jsfl_addAS3KeyboardControls(args);
      case "add_as3_button_handler":
        return this.jsfl_addAS3ButtonHandler(args);
      case "add_as3_document_class_stub":
        return this.jsfl_addAS3DocumentClassStub(args);
      case "create_actionscript_file":
        return this.jsfl_createActionScriptFile(args);
      case "scan_actionscript_usage":
        return this.jsfl_scanActionScriptUsage(args);
      case "test_movie_and_report":
        return this.jsfl_testMovieAndReport(args);
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

  private jsfl_runCustomJSFL(args: Record<string, any>): string {
    const code = typeof args.code === "string" ? args.code : "";

    return `${this.getJSONPolyfill()}
var __mcpOutputPath = "%%OUTPUT_FILE%%";
var __mcpResult;
var __mcpEvalResult;

function __mcpHasOutputFile() {
  try {
    return FLfile.exists(__mcpOutputPath);
  } catch (__mcpExistsError) {
    return false;
  }
}

try {
  __mcpEvalResult = eval(${JSON.stringify(code)});

  if (typeof __mcpResult === "undefined" && typeof __mcpEvalResult !== "undefined") {
    __mcpResult = __mcpEvalResult;
  }

  if (!__mcpHasOutputFile()) {
    FLfile.write(__mcpOutputPath, JSON.stringify({
      success: true,
      data: typeof __mcpResult !== "undefined" ? __mcpResult : {
        message: "JSFL executed successfully"
      }
    }));
  }
} catch (__mcpCaughtError) {
  var __mcpErrorMessage = (__mcpCaughtError && __mcpCaughtError.message)
    ? __mcpCaughtError.message
    : String(__mcpCaughtError);

  try {
    fl.outputPanel.trace("MCP custom JSFL error: " + __mcpErrorMessage);
  } catch (__mcpTraceError) {
  }

  FLfile.write(__mcpOutputPath, JSON.stringify({
    success: false,
    error: __mcpErrorMessage
  }));
}
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

  private getTimelineFolderHelpers(): string {
    return String.raw`
function findLayerIndexByName(timeline, layerName) {
  for (var i = 0; i < timeline.layerCount; i++) {
    if (timeline.layers[i].name === layerName) {
      return i;
    }
  }

  return -1;
}

function getLayerHasActionScript(layer) {
  if (!layer || !layer.frames) {
    return false;
  }

  for (var i = 0; i < layer.frames.length; i++) {
    if (layer.frames[i].actionScript && layer.frames[i].actionScript.length > 0) {
      return true;
    }
  }

  return false;
}

function getLayerSummary(timeline, index) {
  var layer = timeline.layers[index];
  return {
    index: index,
    name: layer.name,
    type: layer.layerType,
    isFolder: layer.layerType === "folder",
    visible: layer.visible,
    locked: layer.locked,
    frameCount: layer.frameCount,
    outline: layer.outline,
    color: layer.color,
    hasActionScript: getLayerHasActionScript(layer)
  };
}

function getFolderRange(timeline, folderIndex) {
  var endIndex = folderIndex;

  for (var i = folderIndex + 1; i < timeline.layerCount; i++) {
    if (timeline.layers[i].layerType === "folder") {
      break;
    }
    endIndex = i;
  }

  return {
    startIndex: folderIndex,
    endIndex: endIndex,
    childCount: Math.max(0, endIndex - folderIndex)
  };
}

function buildTimelineTree(timeline) {
  var tree = {
    totalLayers: timeline.layerCount,
    currentLayer: timeline.currentLayer,
    treeModel: "folder-blocks",
    note: "Adobe JSFL exposes timeline layers as a flat list. Folder children are interpreted as the following non-folder layers until the next folder layer.",
    layers: [],
    folders: []
  };
  var currentFolder = null;

  for (var i = 0; i < timeline.layerCount; i++) {
    var layerData = getLayerSummary(timeline, i);
    tree.layers.push(layerData);

    if (layerData.isFolder) {
      currentFolder = layerData;
      currentFolder.children = [];
      currentFolder.range = getFolderRange(timeline, i);
      tree.folders.push(currentFolder);
    } else if (currentFolder) {
      currentFolder.children.push(layerData);
      layerData.folderName = currentFolder.name;
    }
  }

  return tree;
}

function writeTimelineResult(results) {
  fl.outputPanel.clear();
  fl.outputPanel.trace(JSON.stringify(results.data || results.error, null, 2));
  var outputPath = "%%OUTPUT_FILE%%";
  FLfile.write(outputPath, JSON.stringify(results));
}
`;
  }

  private jsfl_createLayerFolder(args: Record<string, any>): string {
    const name = args.name;
    const hasPosition = typeof args.position === "number";
    const position = hasPosition ? args.position : 0;
    const addAbove = args.addAbove !== false;
    const visible = args.visible !== false;
    const locked = args.locked === true;

    return `${this.getJSONPolyfill()}
${this.getTimelineFolderHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  var timeline = doc.getTimeline();
  var folderName = ${JSON.stringify(name)};
  var existingIndex = findLayerIndexByName(timeline, folderName);

  if (existingIndex !== -1) {
    results.error = "Layer or folder '" + folderName + "' already exists";
    results.data = { existingIndex: existingIndex, timeline: buildTimelineTree(timeline) };
  } else {
    if (${hasPosition}) {
      timeline.currentLayer = Math.max(0, Math.min(${position}, timeline.layerCount - 1));
    }

    var folderIndex = timeline.addNewLayer(folderName, "folder", ${addAbove});
    timeline.layers[folderIndex].visible = ${visible};
    timeline.layers[folderIndex].locked = ${locked};
    timeline.expandFolder(true, false, folderIndex);

    results.success = true;
    results.data = {
      folderName: folderName,
      folderIndex: folderIndex,
      created: true,
      timeline: buildTimelineTree(timeline)
    };
  }
} else {
  results.error = "No document is open";
}

writeTimelineResult(results);
`;
  }

  private jsfl_createTimelineFolderStructure(args: Record<string, any>): string {
    const defaultStructure = [
      { folderName: "Actions", layers: ["Frame Scripts", "Labels"] },
      { folderName: "UI", layers: ["HUD", "Menus", "Text"] },
      { folderName: "Player", layers: ["Player Art", "Player Hitbox", "Player Effects"] },
      { folderName: "Enemies", layers: ["Enemy Art", "Enemy Hitboxes", "Enemy Effects"] },
      { folderName: "World", layers: ["Platforms", "Pickups", "Triggers"] },
      { folderName: "Background", layers: ["Sky", "Backdrop", "Parallax"] },
      { folderName: "Audio", layers: ["Music", "SFX"] },
    ];
    const structure = Array.isArray(args.structure) && args.structure.length > 0 ? args.structure : defaultStructure;
    const addMissingOnly = args.addMissingOnly !== false;
    const expandFolders = args.expandFolders !== false;

    return `${this.getJSONPolyfill()}
${this.getTimelineFolderHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };
var structure = ${JSON.stringify(structure)};

if (doc) {
  var timeline = doc.getTimeline();
  var createdFolders = [];
  var createdLayers = [];
  var skipped = [];

  for (var i = 0; i < structure.length; i++) {
    var folderName = structure[i].folderName;
    var childLayers = structure[i].layers || [];
    var folderIndex = findLayerIndexByName(timeline, folderName);

    if (folderIndex === -1) {
      if (timeline.layerCount > 0) {
        timeline.currentLayer = timeline.layerCount - 1;
      }
      folderIndex = timeline.addNewLayer(folderName, "folder", false);
      createdFolders.push({ name: folderName, index: folderIndex });
    } else if (${addMissingOnly}) {
      skipped.push({ name: folderName, reason: "already exists" });
    }

    timeline.currentLayer = folderIndex;

    for (var j = 0; j < childLayers.length; j++) {
      var childName = childLayers[j];
      if (${addMissingOnly} && findLayerIndexByName(timeline, childName) !== -1) {
        skipped.push({ name: childName, reason: "already exists" });
        continue;
      }

      var childIndex = timeline.addNewLayer(childName, "normal", false);
      createdLayers.push({ name: childName, index: childIndex, folderName: folderName });
      timeline.currentLayer = childIndex;
    }

    if (${expandFolders}) {
      var currentFolderIndex = findLayerIndexByName(timeline, folderName);
      if (currentFolderIndex !== -1) {
        timeline.expandFolder(true, true, currentFolderIndex);
      }
    }
  }

  results.success = true;
  results.data = {
    createdFolders: createdFolders,
    createdLayers: createdLayers,
    skipped: skipped,
    timeline: buildTimelineTree(timeline)
  };
} else {
  results.error = "No document is open";
}

writeTimelineResult(results);
`;
  }

  private jsfl_getTimelineTree(args: Record<string, any>): string {
    return `${this.getJSONPolyfill()}
${this.getTimelineFolderHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  var timeline = doc.getTimeline();
  results.success = true;
  results.data = buildTimelineTree(timeline);
} else {
  results.error = "No document is open";
}

writeTimelineResult(results);
`;
  }

  private jsfl_moveLayerToFolder(args: Record<string, any>): string {
    const layerName = args.layerName;
    const folderName = args.folderName;
    const position = args.position === "first" ? "first" : "last";

    return `${this.getJSONPolyfill()}
${this.getTimelineFolderHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  var timeline = doc.getTimeline();
  var layerName = ${JSON.stringify(layerName)};
  var folderName = ${JSON.stringify(folderName)};
  var layerIndex = findLayerIndexByName(timeline, layerName);
  var folderIndex = findLayerIndexByName(timeline, folderName);

  if (layerIndex === -1) {
    results.error = "Layer '" + layerName + "' not found";
  } else if (folderIndex === -1) {
    results.error = "Folder '" + folderName + "' not found";
  } else if (timeline.layers[folderIndex].layerType !== "folder") {
    results.error = "'" + folderName + "' exists but is not a folder layer";
  } else if (layerIndex === folderIndex) {
    results.error = "A folder cannot be moved into itself";
  } else {
    var range = getFolderRange(timeline, folderIndex);
    var targetIndex = "${position}" === "first" ? folderIndex : range.endIndex;
    timeline.reorderLayer(layerIndex, targetIndex, false);

    var newLayerIndex = findLayerIndexByName(timeline, layerName);
    var newFolderIndex = findLayerIndexByName(timeline, folderName);
    timeline.expandFolder(true, false, newFolderIndex);

    results.success = true;
    results.data = {
      layerName: layerName,
      folderName: folderName,
      position: "${position}",
      oldLayerIndex: layerIndex,
      newLayerIndex: newLayerIndex,
      note: "Layer folder membership is represented by timeline order in JSFL; this tool moves the layer into the folder block.",
      timeline: buildTimelineTree(timeline)
    };
  }
} else {
  results.error = "No document is open";
}

writeTimelineResult(results);
`;
  }

  private jsfl_setFolderExpanded(args: Record<string, any>): string {
    const folderName = args.folderName;
    const expanded = args.expanded !== false;
    const recursive = args.recursive === true;

    return `${this.getJSONPolyfill()}
${this.getTimelineFolderHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  var timeline = doc.getTimeline();
  var folderName = ${JSON.stringify(folderName)};

  if (folderName === "*") {
    timeline.expandFolder(${expanded}, true, -1);
    results.success = true;
    results.data = {
      folderName: "*",
      expanded: ${expanded},
      recursive: true,
      timeline: buildTimelineTree(timeline)
    };
  } else {
    var folderIndex = findLayerIndexByName(timeline, folderName);
    if (folderIndex === -1) {
      results.error = "Folder '" + folderName + "' not found";
    } else if (timeline.layers[folderIndex].layerType !== "folder") {
      results.error = "'" + folderName + "' exists but is not a folder layer";
    } else {
      timeline.expandFolder(${expanded}, ${recursive}, folderIndex);
      results.success = true;
      results.data = {
        folderName: folderName,
        folderIndex: folderIndex,
        expanded: ${expanded},
        recursive: ${recursive},
        timeline: buildTimelineTree(timeline)
      };
    }
  }
} else {
  results.error = "No document is open";
}

writeTimelineResult(results);
`;
  }

  private jsfl_renameLayerOrFolder(args: Record<string, any>): string {
    const currentName = args.currentName;
    const newName = args.newName;

    return `${this.getJSONPolyfill()}
${this.getTimelineFolderHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  var timeline = doc.getTimeline();
  var currentName = ${JSON.stringify(currentName)};
  var newName = ${JSON.stringify(newName)};
  var layerIndex = findLayerIndexByName(timeline, currentName);
  var duplicateIndex = findLayerIndexByName(timeline, newName);

  if (layerIndex === -1) {
    results.error = "Layer or folder '" + currentName + "' not found";
  } else if (duplicateIndex !== -1) {
    results.error = "Layer or folder '" + newName + "' already exists";
  } else {
    var oldType = timeline.layers[layerIndex].layerType;
    timeline.layers[layerIndex].name = newName;
    results.success = true;
    results.data = {
      oldName: currentName,
      newName: newName,
      layerIndex: layerIndex,
      type: oldType,
      timeline: buildTimelineTree(timeline)
    };
  }
} else {
  results.error = "No document is open";
}

writeTimelineResult(results);
`;
  }

  private jsfl_deleteLayerOrFolder(args: Record<string, any>): string {
    const name = args.name;
    const includeContents = args.includeContents === true;

    return `${this.getJSONPolyfill()}
${this.getTimelineFolderHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  var timeline = doc.getTimeline();
  var layerName = ${JSON.stringify(name)};
  var layerIndex = findLayerIndexByName(timeline, layerName);
  var deleted = [];

  if (layerIndex === -1) {
    results.error = "Layer or folder '" + layerName + "' not found";
  } else {
    var targetLayer = timeline.layers[layerIndex];
    if (targetLayer.layerType === "folder" && ${includeContents}) {
      var range = getFolderRange(timeline, layerIndex);
      for (var i = range.endIndex; i >= range.startIndex; i--) {
        deleted.push({ name: timeline.layers[i].name, index: i, type: timeline.layers[i].layerType });
        timeline.deleteLayer(i);
      }
    } else {
      deleted.push({ name: targetLayer.name, index: layerIndex, type: targetLayer.layerType });
      timeline.deleteLayer(layerIndex);
    }

    results.success = true;
    results.data = {
      deleted: deleted,
      includeContents: ${includeContents},
      timeline: buildTimelineTree(timeline)
    };
  }
} else {
  results.error = "No document is open";
}

writeTimelineResult(results);
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

function getFileNameFromPath(path, fallbackName) {
  if (!path) {
    return fallbackName || "";
  }

  var normalizedPath = String(path).replace(/\\\\/g, "/");
  var slashIndex = normalizedPath.lastIndexOf("/");
  return slashIndex >= 0 ? normalizedPath.substring(slashIndex + 1) : normalizedPath;
}

function stripExtension(fileName) {
  if (!fileName) {
    return "";
  }

  var dotIndex = fileName.lastIndexOf(".");
  return dotIndex > 0 ? fileName.substring(0, dotIndex) : fileName;
}

if (doc) {
  var timeline = doc.getTimeline();
  var documentName = doc.name || "Untitled";
  var documentPath = doc.path || "";
  var fileName = getFileNameFromPath(documentPath, documentName);
  var projectName = stripExtension(fileName || documentName);
  var info = {
    documentName: documentName,
    projectName: projectName,
    fileName: fileName,
    path: documentPath,
    pathURI: doc.pathURI || "",
    saved: !!documentPath,
    modified: doc.canRevert(),
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

  private jsfl_getProjectInfo(args: Record<string, any>): string {
    return `${this.getJSONPolyfill()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

function getFileNameFromPath(path, fallbackName) {
  if (!path) {
    return fallbackName || "";
  }

  var normalizedPath = String(path).replace(/\\\\/g, "/");
  var slashIndex = normalizedPath.lastIndexOf("/");
  return slashIndex >= 0 ? normalizedPath.substring(slashIndex + 1) : normalizedPath;
}

function getDirectoryFromPath(path) {
  if (!path) {
    return "";
  }

  var normalizedPath = String(path).replace(/\\\\/g, "/");
  var slashIndex = normalizedPath.lastIndexOf("/");
  return slashIndex >= 0 ? normalizedPath.substring(0, slashIndex) : "";
}

function stripExtension(fileName) {
  if (!fileName) {
    return "";
  }

  var dotIndex = fileName.lastIndexOf(".");
  return dotIndex > 0 ? fileName.substring(0, dotIndex) : fileName;
}

function getExtension(fileName) {
  if (!fileName) {
    return "";
  }

  var dotIndex = fileName.lastIndexOf(".");
  return dotIndex > 0 && dotIndex < fileName.length - 1 ? fileName.substring(dotIndex + 1) : "";
}

if (doc) {
  var timeline = doc.getTimeline();
  var documentName = doc.name || "Untitled";
  var documentPath = doc.path || "";
  var fileName = getFileNameFromPath(documentPath, documentName);
  var projectName = stripExtension(fileName || documentName);
  var libraryItems = doc.library ? doc.library.items : [];
  var itemTypeCounts = {};
  var openDocuments = [];

  for (var i = 0; i < libraryItems.length; i++) {
    var itemType = libraryItems[i].itemType || "unknown";
    itemTypeCounts[itemType] = (itemTypeCounts[itemType] || 0) + 1;
  }

  if (fl.documents) {
    for (var j = 0; j < fl.documents.length; j++) {
      openDocuments.push({
        name: fl.documents[j].name || "",
        path: fl.documents[j].path || "",
        current: fl.documents[j] === doc
      });
    }
  }

  var projectInfo = {
    projectName: projectName,
    documentName: documentName,
    fileName: fileName,
    extension: getExtension(fileName),
    directory: getDirectoryFromPath(documentPath),
    path: documentPath,
    pathURI: doc.pathURI || "",
    saved: !!documentPath,
    modified: doc.canRevert(),
    documentClass: doc.docClass || "",
    dimensions: {
      width: doc.width,
      height: doc.height,
      frameRate: doc.frameRate
    },
    timeline: {
      currentFrame: timeline.currentFrame,
      currentLayer: timeline.currentLayer,
      layerCount: timeline.layerCount
    },
    library: {
      totalItems: libraryItems.length,
      itemTypeCounts: itemTypeCounts
    },
    openDocuments: openDocuments
  };

  results.success = true;
  results.data = projectInfo;

  fl.outputPanel.clear();
  fl.outputPanel.trace("===== PROJECT INFORMATION =====");
  fl.outputPanel.trace(JSON.stringify(projectInfo, null, 2));
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
    return String.raw`
// Safe JSON.stringify for JSFL. Some Animate runtimes expose JSON but do not
// escape Windows paths in a way Node can parse.
if (typeof JSON === 'undefined') {
  JSON = {};
}

JSON.stringify = function(obj) {
      function quoteString(value) {
        return '"' + String(value)
          .replace(/\\/g, "\\\\")
          .replace(/"/g, '\\"')
          .replace(/\r/g, "\\r")
          .replace(/\n/g, "\\n")
          .replace(/\t/g, "\\t")
          .replace(/\f/g, "\\f")
          .replace(/\x08/g, "\\b") + '"';
      }

      var t = typeof obj;
      if (obj === null) {
        return "null";
      }

      if (t != "object") {
        if (t == "string") return quoteString(obj);
        if (t == "number" || t == "boolean") return String(obj);
        if (t == "undefined" || t == "function") return "null";
        return String(obj);
      } else {
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
          v = obj[n];
          t = typeof v;
          if (arr) {
            json.push(JSON.stringify(v));
          } else if (t != "undefined" && t != "function") {
            json.push(quoteString(n) + ":" + JSON.stringify(v));
          }
        }
        return (arr ? "[" : "{") + json.join(",") + (arr ? "]" : "}");
      }
    };
`;
  }

  private getActionScriptHelpers(): string {
    return String.raw`
function normalizeScriptVersion(version) {
  var normalized = String(version || "auto").toLowerCase();
  if (normalized === "2" || normalized === "as2" || normalized === "actionscript2" || normalized === "actionscript 2.0") {
    return "as2";
  }
  if (normalized === "3" || normalized === "as3" || normalized === "actionscript3" || normalized === "actionscript 3.0") {
    return "as3";
  }
  return "auto";
}

function classifyActionScriptCode(code) {
  var source = String(code || "");
  var as2Score = 0;
  var as3Score = 0;
  var signals = [];

  if (source.match(/\b_root\b|\b_level\d+\b|\bonEnterFrame\b|\bonRelease\b|\bonPress\b|\bKey\.isDown\b|_\w+/)) {
    as2Score += 2;
    signals.push("AS2-style globals/properties");
  }
  if (source.match(/\bimport\s+flash\.|\baddEventListener\b|\bMouseEvent\b|\bKeyboardEvent\b|:\s*(void|int|Number|String|Boolean)\b|\bpackage\s*\{/)) {
    as3Score += 2;
    signals.push("AS3 events/types/packages");
  }
  if (source.match(/\bclass\s+[\w.]+\s*\{/)) {
    as2Score += 1;
    signals.push("class declaration");
  }
  if (source.match(/\bfunction\s+\w+\s*\([^)]*\)\s*:\s*\w+/)) {
    as3Score += 1;
    signals.push("typed function signature");
  }

  var likelyVersion = "unknown";
  if (as2Score > as3Score) {
    likelyVersion = "as2";
  } else if (as3Score > as2Score) {
    likelyVersion = "as3";
  } else if (source.length > 0) {
    likelyVersion = "ambiguous";
  }

  return {
    likelyVersion: likelyVersion,
    as2Score: as2Score,
    as3Score: as3Score,
    signals: signals
  };
}

function safeGetProperty(obj, propertyName) {
  try {
    var value = obj[propertyName];
    if (typeof value === "undefined") {
      return null;
    }
    return value;
  } catch (error) {
    return null;
  }
}

function getActionScriptInfo(doc) {
  var asVersion = safeGetProperty(doc, "asVersion");
  var normalizedDocumentVersion = asVersion === 2 ? "as2" : (asVersion === 3 ? "as3" : "unknown");
  var warnings = [];

  if (normalizedDocumentVersion !== "as2") {
    warnings.push("ActionScript 2.0 is legacy/deprecated and may not compile in modern Adobe Animate. The MCP can insert/manage AS2 code, but compilation depends on the host app and document publish settings.");
  }

  return {
    documentName: doc.name || "",
    documentType: safeGetProperty(doc, "type"),
    path: doc.path || "",
    asVersion: asVersion,
    normalizedDocumentVersion: normalizedDocumentVersion,
    documentClass: safeGetProperty(doc, "docClass") || "",
    sourcePath: safeGetProperty(doc, "sourcePath"),
    classPath: safeGetProperty(doc, "classPath"),
    currentPublishProfile: safeGetProperty(doc, "currentPublishProfile"),
    publishProfiles: safeGetProperty(doc, "publishProfiles"),
    supportsAS3DocumentClass: true,
    as2CompileSupport: normalizedDocumentVersion === "as2" ? "document-reports-as2" : "not-confirmed",
    warnings: warnings
  };
}

function getVersionWarnings(requestedVersion, info, code) {
  var warnings = [];
  var scriptVersion = normalizeScriptVersion(requestedVersion);
  var syntax = classifyActionScriptCode(code || "");

  if (scriptVersion === "auto") {
    scriptVersion = syntax.likelyVersion === "unknown" || syntax.likelyVersion === "ambiguous"
      ? (info.normalizedDocumentVersion === "unknown" ? "as3" : info.normalizedDocumentVersion)
      : syntax.likelyVersion;
  }

  if (scriptVersion === "as2" && info.normalizedDocumentVersion !== "as2") {
    warnings.push("AS2 code was inserted, but this document/app does not report AS2 compile support. Modern Adobe Animate may not compile AS2.");
  }
  if (scriptVersion === "as3" && info.normalizedDocumentVersion === "as2") {
    warnings.push("AS3 code was inserted into a document that reports AS2 publish settings.");
  }
  if (syntax.likelyVersion !== "unknown" && syntax.likelyVersion !== "ambiguous" && syntax.likelyVersion !== scriptVersion) {
    warnings.push("Code syntax looks like " + syntax.likelyVersion + " but requested version is " + scriptVersion + ".");
  }

  return {
    requestedVersion: requestedVersion || "auto",
    resolvedVersion: scriptVersion,
    syntax: syntax,
    warnings: warnings
  };
}

function findTimelineFrame(layer, frameIdx) {
  if (!layer || !layer.frames) {
    return null;
  }

  for (var i = 0; i < layer.frames.length; i++) {
    if (layer.frames[i].startFrame <= frameIdx &&
        (i + 1 >= layer.frames.length || layer.frames[i + 1].startFrame > frameIdx)) {
      return layer.frames[i];
    }
  }

  return null;
}

function getPathDirectory(path) {
  if (!path) {
    return "";
  }
  var normalized = String(path).replace(/\\/g, "/");
  var slashIndex = normalized.lastIndexOf("/");
  return slashIndex >= 0 ? normalized.substring(0, slashIndex) : "";
}

function pathToFileURI(path) {
  var normalized = String(path || "").replace(/\\/g, "/");
  if (normalized.match(/^[A-Za-z]:\//)) {
    return "file:///" + normalized;
  }
  if (normalized.indexOf("file:///") === 0) {
    return normalized;
  }
  if (normalized.charAt(0) === "/") {
    return "file://" + normalized;
  }
  return normalized;
}

function joinPath(directory, fileName) {
  var normalized = String(directory || "").replace(/\\/g, "/");
  if (normalized.charAt(normalized.length - 1) !== "/") {
    normalized += "/";
  }
  return normalized + fileName;
}

function ensureFolderPath(directory) {
  if (!directory) {
    return false;
  }
  var normalized = String(directory).replace(/\\/g, "/");
  var parts = normalized.split("/");
  var current = "";

  for (var i = 0; i < parts.length; i++) {
    if (!parts[i]) {
      continue;
    }
    if (i === 0 && parts[i].match(/^[A-Za-z]:$/)) {
      current = parts[i];
      continue;
    }
    current = current ? current + "/" + parts[i] : parts[i];
    var uri = pathToFileURI(current);
    if (!FLfile.exists(uri)) {
      FLfile.createFolder(uri);
    }
  }

  return true;
}

function writeActionScriptResult(results) {
  fl.outputPanel.clear();
  fl.outputPanel.trace(JSON.stringify(results.data || results.error, null, 2));
  var outputPath = "%%OUTPUT_FILE%%";
  FLfile.write(outputPath, JSON.stringify(results));
}
`;
  }

  private buildAddActionScriptToFrameJSFL(code: string, scriptVersion: string, frameNumber: any, layerIndex: any): string {
    return `${this.getJSONPolyfill()}
${this.getActionScriptHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };
var code = ${JSON.stringify(code)};
var requestedVersion = ${JSON.stringify(scriptVersion)};

if (doc) {
  var timeline = doc.getTimeline();
  var frameIdx = ${frameNumber};
  var layerIdx = ${layerIndex};
  var info = getActionScriptInfo(doc);
  var versionResult = getVersionWarnings(requestedVersion, info, code);

  if (layerIdx < 0 || layerIdx >= timeline.layerCount) {
    results.error = "Layer index " + layerIdx + " is out of range";
  } else {
    timeline.currentLayer = layerIdx;
    var layer = timeline.layers[layerIdx];
    var targetFrame = findTimelineFrame(layer, frameIdx);

    if (targetFrame) {
      targetFrame.actionScript = code;
      results.success = true;
      results.data = {
        action: "add_actionscript_to_frame",
        scriptVersion: versionResult.resolvedVersion,
        requestedVersion: versionResult.requestedVersion,
        syntax: versionResult.syntax,
        warnings: versionResult.warnings,
        layerIndex: layerIdx,
        layerName: layer.name,
        frameNumber: frameIdx,
        codeLength: code.length,
        document: info
      };
    } else {
      results.error = "Could not find frame at index " + frameIdx;
    }
  }
} else {
  results.error = "No document is open";
}

writeActionScriptResult(results);
`;
  }

  // ActionScript 2.0 and 3.0 Support Methods

  private jsfl_getActionScriptInfo(args: Record<string, any>): string {
    return `${this.getJSONPolyfill()}
${this.getActionScriptHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  results.success = true;
  results.data = getActionScriptInfo(doc);
} else {
  results.error = "No document is open";
}

writeActionScriptResult(results);
`;
  }

  private jsfl_addActionScriptToFrame(args: Record<string, any>): string {
    const code = args.code;
    const frameNumber = args.frameNumber !== undefined ? args.frameNumber : "timeline.currentFrame";
    const layerIndex = args.layerIndex !== undefined ? args.layerIndex : "timeline.currentLayer";
    const scriptVersion = args.scriptVersion || "auto";

    return this.buildAddActionScriptToFrameJSFL(code, scriptVersion, frameNumber, layerIndex);
  }

  private jsfl_addActionScriptToInstance(args: Record<string, any>): string {
    const code = args.code;
    const instanceName = args.instanceName || "";
    const scriptVersion = args.scriptVersion || "auto";

    return `${this.getJSONPolyfill()}
${this.getActionScriptHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };
var code = ${JSON.stringify(code)};
var requestedVersion = ${JSON.stringify(scriptVersion)};

if (doc) {
  var info = getActionScriptInfo(doc);
  var versionResult = getVersionWarnings(requestedVersion, info, code);

  if (doc.selection.length > 0) {
    var instance = doc.selection[0];

    // Set instance name if provided
    if ("${instanceName}" !== "") {
      instance.name = "${instanceName}";
    }

    // Add ActionScript to the instance
    if (instance.elementType === "instance") {
      // For movie clips and buttons, add script
      instance.actionScript = code;
      results.success = true;
      results.data = {
        action: "add_actionscript_to_instance",
        instanceName: instance.name || "unnamed",
        scriptVersion: versionResult.resolvedVersion,
        requestedVersion: versionResult.requestedVersion,
        syntax: versionResult.syntax,
        warnings: versionResult.warnings,
        codeLength: code.length,
        document: info
      };
    } else {
      results.error = "Selected element is not a symbol instance";
    }
  } else {
    results.error = "No element selected. Please select a movie clip or button instance.";
  }
} else {
  results.error = "No document is open";
}

writeActionScriptResult(results);
`;
  }

  private jsfl_setActionScriptVersion(args: Record<string, any>): string {
    const scriptVersion = args.scriptVersion;

    return `${this.getJSONPolyfill()}
${this.getActionScriptHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };
var requestedVersion = normalizeScriptVersion(${JSON.stringify(scriptVersion)});

if (doc) {
  var before = getActionScriptInfo(doc);
  var targetNumber = requestedVersion === "as2" ? 2 : 3;
  var warnings = [];

  if (requestedVersion !== "as2" && requestedVersion !== "as3") {
    results.error = "scriptVersion must be 'as2' or 'as3'";
  } else {
    try {
      doc.asVersion = targetNumber;
    } catch (error) {
      warnings.push("Could not set doc.asVersion directly: " + String(error));
    }

    var after = getActionScriptInfo(doc);
    if (requestedVersion === "as2" && after.normalizedDocumentVersion !== "as2") {
      warnings.push("The document did not report AS2 after the change. Modern Adobe Animate may not support compiling AS2; use a legacy Flash/Animate host for full AS2 compilation.");
    }

    results.success = after.normalizedDocumentVersion === requestedVersion;
    results.data = {
      requestedVersion: requestedVersion,
      before: before,
      after: after,
      warnings: warnings,
      manualFallback: "If the version did not change, open File > Publish Settings and choose the ActionScript version manually in a host that supports it."
    };
  }
} else {
  results.error = "No document is open";
}

writeActionScriptResult(results);
`;
  }

  private jsfl_setDocumentClass(args: Record<string, any>): string {
    const className = args.className;

    return `${this.getJSONPolyfill()}
${this.getActionScriptHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  doc.docClass = "${className}";
  var info = getActionScriptInfo(doc);
  results.success = true;
  results.data = {
    action: "set_document_class",
    className: "${className}",
    scriptVersion: "as3",
    warnings: info.normalizedDocumentVersion === "as2" ? ["Document reports AS2; document classes are AS3-only."] : [],
    document: info,
    note: "Make sure to create a ${className}.as file in your project directory or use add_as3_document_class_stub."
  };
} else {
  results.error = "No document is open";
}

writeActionScriptResult(results);
`;
  }

  private jsfl_addAS2KeyboardControls(args: Record<string, any>): string {
    const player = args.playerInstanceName || "player";
    const speed = args.speed || 6;
    const frameNumber = args.frameNumber !== undefined ? args.frameNumber : "timeline.currentFrame";
    const layerIndex = args.layerIndex !== undefined ? args.layerIndex : "timeline.currentLayer";
    const code = `// AS2 keyboard controls for ${player}
var moveSpeed:Number = ${speed};

this.onEnterFrame = function() {
  if (Key.isDown(Key.LEFT)) {
    ${player}._x -= moveSpeed;
  }
  if (Key.isDown(Key.RIGHT)) {
    ${player}._x += moveSpeed;
  }
  if (Key.isDown(Key.UP)) {
    ${player}._y -= moveSpeed;
  }
  if (Key.isDown(Key.DOWN)) {
    ${player}._y += moveSpeed;
  }
};`;

    return this.buildAddActionScriptToFrameJSFL(code, "as2", frameNumber, layerIndex);
  }

  private jsfl_addAS2ButtonHandler(args: Record<string, any>): string {
    const button = args.buttonInstanceName;
    const targetFrame = args.targetFrame;
    const eventName = args.eventName || "onRelease";
    const playMode = args.playMode === "stop" ? "gotoAndStop" : "gotoAndPlay";
    const frameNumber = args.frameNumber !== undefined ? args.frameNumber : "timeline.currentFrame";
    const layerIndex = args.layerIndex !== undefined ? args.layerIndex : "timeline.currentLayer";
    const code = `// AS2 button handler for ${button}
${button}.${eventName} = function() {
  ${playMode}(${targetFrame});
};`;

    return this.buildAddActionScriptToFrameJSFL(code, "as2", frameNumber, layerIndex);
  }

  private jsfl_addAS2FrameLoop(args: Record<string, any>): string {
    const body = args.body || "trace('AS2 frame loop tick');";
    const frameNumber = args.frameNumber !== undefined ? args.frameNumber : "timeline.currentFrame";
    const layerIndex = args.layerIndex !== undefined ? args.layerIndex : "timeline.currentLayer";
    const code = `// AS2 frame loop
this.onEnterFrame = function() {
${body.split("\n").map((line: string) => `  ${line}`).join("\n")}
};`;

    return this.buildAddActionScriptToFrameJSFL(code, "as2", frameNumber, layerIndex);
  }

  private jsfl_addAS3KeyboardControls(args: Record<string, any>): string {
    const player = args.playerInstanceName || "player";
    const speed = args.speed || 6;
    const frameNumber = args.frameNumber !== undefined ? args.frameNumber : "timeline.currentFrame";
    const layerIndex = args.layerIndex !== undefined ? args.layerIndex : "timeline.currentLayer";
    const code = `// AS3 keyboard controls for ${player}
import flash.events.KeyboardEvent;
import flash.ui.Keyboard;

stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);

function onKeyDown(event:KeyboardEvent):void {
  if (event.keyCode == Keyboard.LEFT) {
    ${player}.x -= ${speed};
  } else if (event.keyCode == Keyboard.RIGHT) {
    ${player}.x += ${speed};
  } else if (event.keyCode == Keyboard.UP) {
    ${player}.y -= ${speed};
  } else if (event.keyCode == Keyboard.DOWN) {
    ${player}.y += ${speed};
  }
}`;

    return this.buildAddActionScriptToFrameJSFL(code, "as3", frameNumber, layerIndex);
  }

  private jsfl_addAS3ButtonHandler(args: Record<string, any>): string {
    const button = args.buttonInstanceName;
    const targetFrame = args.targetFrame;
    const playMode = args.playMode === "stop" ? "gotoAndStop" : "gotoAndPlay";
    const frameNumber = args.frameNumber !== undefined ? args.frameNumber : "timeline.currentFrame";
    const layerIndex = args.layerIndex !== undefined ? args.layerIndex : "timeline.currentLayer";
    const handlerName = `${button.replace(/[^A-Za-z0-9_]/g, "_")}ClickHandler`;
    const code = `// AS3 button handler for ${button}
import flash.events.MouseEvent;

${button}.addEventListener(MouseEvent.CLICK, ${handlerName});

function ${handlerName}(event:MouseEvent):void {
  ${playMode}(${targetFrame});
}`;

    return this.buildAddActionScriptToFrameJSFL(code, "as3", frameNumber, layerIndex);
  }

  private generateAS3ClassCode(className: string, packageName = ""): string {
    const packageLine = packageName ? `package ${packageName} {` : "package {";
    return `${packageLine}
  import flash.display.MovieClip;

  public class ${className} extends MovieClip {
    public function ${className}() {
      trace("${className} initialized");
    }
  }
}`;
  }

  private generateAS2ClassCode(className: string, packageName = ""): string {
    const qualifiedName = packageName ? `${packageName}.${className}` : className;
    return `class ${qualifiedName} {
  public function ${className}() {
    trace("${qualifiedName} initialized");
  }
}`;
  }

  private jsfl_createActionScriptFile(args: Record<string, any>): string {
    const scriptVersion = (args.scriptVersion || "as3").toLowerCase() === "as2" ? "as2" : "as3";
    const className = args.className || "Main";
    const packageName = args.packageName || "";
    const fileName = args.fileName || `${className}.as`;
    const code = args.code || (scriptVersion === "as2"
      ? this.generateAS2ClassCode(className, packageName)
      : this.generateAS3ClassCode(className, packageName));
    const directory = args.directory || "";
    const overwrite = args.overwrite === true;

    return `${this.getJSONPolyfill()}
${this.getActionScriptHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };
var requestedDirectory = ${JSON.stringify(directory)};
var fileName = ${JSON.stringify(fileName)};
var code = ${JSON.stringify(code)};
var overwrite = ${overwrite};
var scriptVersion = ${JSON.stringify(scriptVersion)};
var packageName = ${JSON.stringify(packageName)};

if (doc) {
  var info = getActionScriptInfo(doc);
  var baseDirectory = requestedDirectory || getPathDirectory(doc.path);

  if (!baseDirectory) {
    results.error = "No output directory was provided and the current document has not been saved yet.";
  } else {
    if (scriptVersion === "as3" && packageName) {
      baseDirectory = joinPath(baseDirectory, packageName.replace(/\./g, "/"));
    }

    ensureFolderPath(baseDirectory);
    var outputPath = joinPath(baseDirectory, fileName);
    var outputURI = pathToFileURI(outputPath);

    if (FLfile.exists(outputURI) && !overwrite) {
      results.error = "ActionScript file already exists: " + outputPath;
      results.data = { outputPath: outputPath, overwriteRequired: true };
    } else {
      var wrote = FLfile.write(outputURI, code);
      results.success = !!wrote;
      results.data = {
        action: "create_actionscript_file",
        scriptVersion: scriptVersion,
        className: ${JSON.stringify(className)},
        packageName: packageName,
        fileName: fileName,
        outputPath: outputPath,
        outputURI: outputURI,
        codeLength: code.length,
        warnings: scriptVersion === "as2" ? getVersionWarnings("as2", info, code).warnings : getVersionWarnings("as3", info, code).warnings,
        document: info
      };
      if (!wrote) {
        results.error = "FLfile.write returned false for " + outputPath;
      }
    }
  }
} else {
  results.error = "No document is open";
}

writeActionScriptResult(results);
`;
  }

  private jsfl_addAS3DocumentClassStub(args: Record<string, any>): string {
    const className = args.className || "Main";
    const packageName = args.packageName || "";
    const directory = args.directory || "";
    const overwrite = args.overwrite === true;
    const code = this.generateAS3ClassCode(className, packageName);

    return `${this.getJSONPolyfill()}
${this.getActionScriptHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };
var className = ${JSON.stringify(className)};
var packageName = ${JSON.stringify(packageName)};
var requestedDirectory = ${JSON.stringify(directory)};
var overwrite = ${overwrite};
var code = ${JSON.stringify(code)};

if (doc) {
  var info = getActionScriptInfo(doc);
  var baseDirectory = requestedDirectory || getPathDirectory(doc.path);

  if (!baseDirectory) {
    results.error = "No output directory was provided and the current document has not been saved yet.";
  } else {
    if (packageName) {
      baseDirectory = joinPath(baseDirectory, packageName.replace(/\./g, "/"));
    }

    ensureFolderPath(baseDirectory);
    var outputPath = joinPath(baseDirectory, className + ".as");
    var outputURI = pathToFileURI(outputPath);

    if (FLfile.exists(outputURI) && !overwrite) {
      results.error = "Document class file already exists: " + outputPath;
      results.data = { outputPath: outputPath, overwriteRequired: true };
    } else {
      var wrote = FLfile.write(outputURI, code);
      doc.docClass = packageName ? packageName + "." + className : className;
      info = getActionScriptInfo(doc);
      results.success = !!wrote;
      results.data = {
        action: "add_as3_document_class_stub",
        className: className,
        qualifiedClassName: doc.docClass,
        outputPath: outputPath,
        outputURI: outputURI,
        codeLength: code.length,
        warnings: getVersionWarnings("as3", info, code).warnings,
        document: info
      };
      if (!wrote) {
        results.error = "FLfile.write returned false for " + outputPath;
      }
    }
  }
} else {
  results.error = "No document is open";
}

writeActionScriptResult(results);
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

  private jsfl_scanActionScriptUsage(args: Record<string, any>): string {
    return `${this.getJSONPolyfill()}
${this.getActionScriptHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  var timeline = doc.getTimeline();
  var info = getActionScriptInfo(doc);
  var frameScripts = [];
  var instanceScripts = [];
  var totals = {
    frameScripts: 0,
    instanceScripts: 0,
    likelyAS2: 0,
    likelyAS3: 0,
    ambiguous: 0,
    unknown: 0
  };

  function recordClassification(classification) {
    if (classification.likelyVersion === "as2") {
      totals.likelyAS2++;
    } else if (classification.likelyVersion === "as3") {
      totals.likelyAS3++;
    } else if (classification.likelyVersion === "ambiguous") {
      totals.ambiguous++;
    } else {
      totals.unknown++;
    }
  }

  for (var i = 0; i < timeline.layerCount; i++) {
    var layer = timeline.layers[i];
    for (var j = 0; j < layer.frames.length; j++) {
      var frame = layer.frames[j];
      if (frame.actionScript && frame.actionScript.length > 0) {
        var frameClassification = classifyActionScriptCode(frame.actionScript);
        recordClassification(frameClassification);
        totals.frameScripts++;
        frameScripts.push({
          layerIndex: i,
          layerName: layer.name,
          frameNumber: frame.startFrame,
          codeLength: frame.actionScript.length,
          classification: frameClassification
        });
      }

      if (frame.elements) {
        for (var k = 0; k < frame.elements.length; k++) {
          var element = frame.elements[k];
          if (element.actionScript && element.actionScript.length > 0) {
            var instanceClassification = classifyActionScriptCode(element.actionScript);
            recordClassification(instanceClassification);
            totals.instanceScripts++;
            instanceScripts.push({
              layerIndex: i,
              layerName: layer.name,
              frameNumber: frame.startFrame,
              instanceName: element.name || "",
              elementType: element.elementType || "",
              codeLength: element.actionScript.length,
              classification: instanceClassification
            });
          }
        }
      }
    }
  }

  var mixedVersionRisk = totals.likelyAS2 > 0 && totals.likelyAS3 > 0;
  var warnings = [];
  if (mixedVersionRisk) {
    warnings.push("This document appears to contain both AS2-style and AS3-style code. AS2 and AS3 are not compatible in the same publish target.");
  }
  if (totals.likelyAS2 > 0 && info.normalizedDocumentVersion !== "as2") {
    warnings.push("AS2-style code was found, but the document does not report AS2 publish settings.");
  }

  results.success = true;
  results.data = {
    document: info,
    totals: totals,
    mixedVersionRisk: mixedVersionRisk,
    warnings: warnings,
    frameScripts: frameScripts,
    instanceScripts: instanceScripts
  };
} else {
  results.error = "No document is open";
}

writeActionScriptResult(results);
`;
  }

  private jsfl_testMovieAndReport(args: Record<string, any>): string {
    return `${this.getJSONPolyfill()}
${this.getActionScriptHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };

if (doc) {
  var info = getActionScriptInfo(doc);
  fl.outputPanel.clear();
  doc.testMovie();
  results.success = true;
  results.data = {
    action: "testMovie",
    message: "Test movie started. Adobe Animate writes compiler/runtime details to its Output panel.",
    document: info,
    guidance: [
      "Use get_compiler_errors with testMovie false after Animate finishes if you need current document script locations.",
      "AS2 compilation depends on legacy host/document support; modern Animate may not compile AS2."
    ]
  };
} else {
  results.error = "No document is open";
}

writeActionScriptResult(results);
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
    const scriptVersion = args.scriptVersion || "auto";

    return `${this.getJSONPolyfill()}
${this.getActionScriptHelpers()}
var doc = fl.getDocumentDOM();
var results = { success: false, data: null, error: null };
var code = ${JSON.stringify(code)};
var requestedVersion = ${JSON.stringify(scriptVersion)};

if (doc) {
  var timeline = doc.getTimeline();
  var info = getActionScriptInfo(doc);
  var versionResult = getVersionWarnings(requestedVersion, info, code);
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
            element.actionScript = code;
            found = true;
            results.success = true;
            results.data = {
              instanceName: "${instanceName}",
              layer: layer.name,
              frameNumber: frame.startFrame,
              codeAdded: true,
              scriptVersion: versionResult.resolvedVersion,
              requestedVersion: versionResult.requestedVersion,
              syntax: versionResult.syntax,
              warnings: versionResult.warnings,
              codeLength: code.length,
              document: info
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

