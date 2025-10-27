/**
 * Create Text Animation
 * 
 * Creates an animated text title with fade-in and slide effects
 * To run: Commands > Run Command... and select this file
 */

// Create a new document
var doc = fl.createDocument("html5");
doc.width = 1920;
doc.height = 1080;
doc.frameRate = 30;
doc.backgroundColor = 0x222222; // Dark gray background

var timeline = doc.getTimeline();
timeline.layers[0].name = "Title Text";

// Add text
doc.addNewText({left: 500, top: 400, right: 1400, bottom: 680});
var textObj = doc.selection[0];

if (textObj) {
    textObj.setTextString("Welcome to Adobe Animate");
    
    // Set text formatting
    var textAttrs = textObj.getTextAttr();
    textAttrs.size = 72;
    textAttrs.face = "Arial";
    textAttrs.fillColor = 0xFFFFFF; // White
    textObj.setTextAttr(textAttrs);
    
    // Center the text
    doc.setTextRectangle({left: 400, top: 400, right: 1520, bottom: 680});
    
    // Convert to symbol for animation
    doc.selectAll();
    doc.convertToSymbol("movie clip", "TitleText", "center");
    
    // Setup animation: Start invisible and off-screen
    timeline.currentFrame = 0;
    var instance = doc.selection[0];
    instance.x = 960;
    instance.y = 340; // Slightly above center
    
    // Set initial alpha to 0 (invisible)
    doc.selection[0].colorAlphaPercent = 0;
    
    // Create keyframe at frame 30
    timeline.insertKeyframe(30);
    
    // At frame 30, make it visible and in position
    timeline.currentFrame = 30;
    doc.selection[0].colorAlphaPercent = 100;
    doc.selection[0].y = 440; // Move down slightly
    
    // Create motion tween
    timeline.currentFrame = 0;
    timeline.setSelectedFrames(0, 30);
    timeline.createMotionTween();
    
    // Add a hold at the end
    timeline.currentFrame = 30;
    timeline.insertKeyframe(60);
    
    fl.outputPanel.clear();
    fl.outputPanel.trace("Text animation created successfully!");
    fl.outputPanel.trace("The text will fade in and slide down over 30 frames.");
    fl.outputPanel.trace("Press Enter to preview the animation.");
}

