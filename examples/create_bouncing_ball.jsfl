/**
 * Create Bouncing Ball Animation
 * 
 * This script creates a simple bouncing ball animation in Adobe Animate.
 * To run: Commands > Run Command... and select this file
 */

// Create a new document
var doc = fl.createDocument("html5");
doc.width = 800;
doc.height = 600;
doc.frameRate = 24;

// Get the timeline
var timeline = doc.getTimeline();

// Rename the default layer
timeline.layers[0].name = "Ball";

// Draw a ball in the center-top
doc.setFillColor(0xFF0000); // Red
doc.setStrokeColor(0x000000); // Black
doc.addNewOval({left: 375, top: 50, right: 425, bottom: 100});

// Convert to symbol
doc.selectAll();
doc.convertToSymbol("movie clip", "Ball", "center");

// Create keyframes for bouncing animation
timeline.insertKeyframe(12); // Midpoint
timeline.insertKeyframe(24); // End

// Move ball down in frame 12
timeline.currentFrame = 12;
doc.selection[0].y = 500;

// Frame 24 (return to top)
timeline.currentFrame = 24;
doc.selection[0].y = 75;

// Create motion tweens
timeline.currentFrame = 0;
timeline.setSelectedFrames(0, 12);
timeline.createMotionTween();

timeline.currentFrame = 12;
timeline.setSelectedFrames(12, 24);
timeline.createMotionTween();

// Add some easing for realistic bounce
timeline.currentFrame = 0;
timeline.setSelectedFrames(0, 12);

fl.outputPanel.clear();
fl.outputPanel.trace("Bouncing ball animation created successfully!");
fl.outputPanel.trace("Press Enter to play the animation.");

