/**
 * Draw Shapes Demo
 * 
 * Demonstrates drawing various shapes and colors in Adobe Animate
 * To run: Commands > Run Command... and select this file
 */

// Create a new document
var doc = fl.createDocument("html5");
doc.width = 1200;
doc.height = 800;
doc.frameRate = 24;

var timeline = doc.getTimeline();
timeline.layers[0].name = "Shapes";

// Draw a red rectangle
doc.setFillColor(0xFF0000);
doc.setStrokeColor(0x000000);
doc.addNewRectangle({left: 50, top: 50, right: 200, bottom: 200}, 0);

// Draw a blue circle
doc.setFillColor(0x0000FF);
doc.setStrokeColor(0x000000);
doc.addNewOval({left: 250, top: 50, right: 400, bottom: 200});

// Draw a green square
doc.setFillColor(0x00FF00);
doc.setStrokeColor(0x000000);
doc.addNewRectangle({left: 450, top: 50, right: 600, bottom: 200}, 0);

// Draw a yellow oval
doc.setFillColor(0xFFFF00);
doc.setStrokeColor(0x000000);
doc.addNewOval({left: 650, top: 50, right: 900, bottom: 200});

// Draw a purple rounded rectangle
doc.setFillColor(0xFF00FF);
doc.setStrokeColor(0x000000);
doc.addNewRectangle({left: 50, top: 250, right: 200, bottom: 400}, 20);

// Draw a cyan small circle
doc.setFillColor(0x00FFFF);
doc.setStrokeColor(0x000000);
doc.addNewOval({left: 250, top: 250, right: 350, bottom: 350});

// Draw an orange star-ish shape (multiple rectangles)
doc.setFillColor(0xFF8800);
doc.setStrokeColor(0x000000);
doc.addNewRectangle({left: 450, top: 275, right: 550, bottom: 375}, 0);
doc.addNewRectangle({left: 475, top: 250, right: 525, bottom: 400}, 0);
doc.addNewRectangle({left: 425, top: 300, right: 575, bottom: 350}, 0);

// Add title text
doc.addNewText({left: 50, top: 450, right: 400, bottom: 500});
var textObj = doc.selection[0];
if (textObj) {
    textObj.setTextString("Shape Gallery - Created with JSFL");
    var textAttrs = textObj.getTextAttr();
    textAttrs.size = 24;
    textAttrs.face = "Arial";
    textAttrs.fillColor = 0x000000;
    textObj.setTextAttr(textAttrs);
}

fl.outputPanel.clear();
fl.outputPanel.trace("Shape gallery created successfully!");
fl.outputPanel.trace("Various shapes have been drawn on the stage.");

