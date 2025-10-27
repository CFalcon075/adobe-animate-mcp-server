/**
 * ActionScript Button Example
 * 
 * This script demonstrates how to create an interactive button with ActionScript 3.0
 * To run: Commands > Run Command... and select this file
 */

// Create a new ActionScript 3.0 document
var doc = fl.createDocument("actionscript3");
doc.width = 800;
doc.height = 600;
doc.frameRate = 24;

var timeline = doc.getTimeline();
timeline.layers[0].name = "Buttons";

// Draw a rectangle for the button
doc.setFillColor(0x3366FF); // Blue
doc.setStrokeColor(0x000000); // Black
doc.addNewRectangle({left: 250, top: 200, right: 550, bottom: 280}, 10);

// Add text to the button
doc.addNewText({left: 300, top: 220, right: 500, bottom: 260});
var textObj = doc.selection[0];
if (textObj) {
    textObj.setTextString("Click Me!");
    var textAttrs = textObj.getTextAttr();
    textAttrs.size = 24;
    textAttrs.face = "Arial";
    textAttrs.fillColor = 0xFFFFFF; // White text
    textObj.setTextAttr(textAttrs);
}

// Select both the rectangle and text
doc.selectAll();

// Convert to button symbol
doc.convertToSymbol("button", "MyButton", "center");

// Set instance name
var buttonInstance = doc.selection[0];
buttonInstance.name = "myButton";

// Add ActionScript to the button
// This code will make the button interactive
var buttonCode = `this.addEventListener(MouseEvent.CLICK, onClick);

function onClick(event:MouseEvent):void {
    trace("Button was clicked!");
    gotoAndStop(2);
}

this.addEventListener(MouseEvent.MOUSE_OVER, onMouseOver);
this.addEventListener(MouseEvent.MOUSE_OUT, onMouseOut);

function onMouseOver(event:MouseEvent):void {
    this.alpha = 0.8;
}

function onMouseOut(event:MouseEvent):void {
    this.alpha = 1.0;
}`;

buttonInstance.actionScript = buttonCode;

// Add a second frame with different content
timeline.insertKeyframe(1);
doc.addNewText({left: 200, top: 350, right: 600, bottom: 400});
var resultText = doc.selection[0];
if (resultText) {
    resultText.setTextString("Button was clicked!");
    var attrs = resultText.getTextAttr();
    attrs.size = 32;
    attrs.face = "Arial";
    attrs.fillColor = 0xFF0000; // Red
    resultText.setTextAttr(attrs);
}

// Add stop() action to both frames
timeline.layers[0].frames[0].actionScript = "stop();";
timeline.layers[0].frames[1].actionScript = "stop();";

// Set document class
doc.docClass = "Main";

fl.outputPanel.clear();
fl.outputPanel.trace("Interactive button created successfully!");
fl.outputPanel.trace("The button has hover effects and navigates to frame 2 on click.");
fl.outputPanel.trace("Remember to create a Main.as file in your project directory.");
fl.outputPanel.trace("");
fl.outputPanel.trace("Example Main.as:");
fl.outputPanel.trace("package {");
fl.outputPanel.trace("    import flash.display.MovieClip;");
fl.outputPanel.trace("    public class Main extends MovieClip {");
fl.outputPanel.trace("        public function Main() {");
fl.outputPanel.trace("            // Constructor code");
fl.outputPanel.trace("        }");
fl.outputPanel.trace("    }");
fl.outputPanel.trace("}");

