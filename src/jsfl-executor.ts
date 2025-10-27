/**
 * JSFL Executor
 * 
 * Handles execution of JSFL scripts in Adobe Animate
 */

import { writeFileSync, unlinkSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export interface JSFLResult {
  success: boolean;
  output?: string;
  error?: string;
}

/**
 * Execute JSFL script in Adobe Animate
 * 
 * This function writes the JSFL script to a temporary file and executes it
 * using Adobe Animate's command line interface or file watching mechanism.
 * 
 * Note: Adobe Animate must be running for this to work.
 */
export async function executeJSFL(jsflCode: string): Promise<JSFLResult> {
  try {
    // Generate unique file names
    const timestamp = Date.now();
    const tempFileName = `animate_mcp_${timestamp}.jsfl`;
    const outputFileName = `animate_mcp_output_${timestamp}.json`;
    const outputFilePath = join(tmpdir(), outputFileName);
    
    // Convert to file URI format for FLfile.write() (JSFL requires file:// format)
    const outputFileURI = 'file:///' + outputFilePath.replace(/\\/g, '/');
    
    // Replace placeholder with file URI
    const processedCode = jsflCode.replace(/%%OUTPUT_FILE%%/g, outputFileURI);
    
    // Try Adobe Animate's Commands folder first (more reliable)
    const userProfile = process.env.USERPROFILE || process.env.HOME || "";
    const animateCommandsPaths = [
      join(userProfile, "AppData", "Local", "Adobe", "Animate 2024", "en_US", "Configuration", "Commands"),
      join(userProfile, "AppData", "Local", "Adobe", "Animate 2023", "en_US", "Configuration", "Commands"),
      join(userProfile, "AppData", "Local", "Adobe", "Animate 2022", "en_US", "Configuration", "Commands"),
    ];
    
    let tempFilePath = join(tmpdir(), tempFileName);
    
    // Try to use Commands folder if it exists
    for (const commandsPath of animateCommandsPaths) {
      try {
        const fs = await import("fs");
        if (fs.existsSync(commandsPath)) {
          tempFilePath = join(commandsPath, tempFileName);
          break;
        }
      } catch (e) {
        // Continue to next path
      }
    }

    // Write JSFL code to temporary file
    writeFileSync(tempFilePath, processedCode, "utf8");

    // Try to execute the JSFL file
    // Method 1: Try using Adobe Animate's command line (Windows)
    const animatePaths = [
      "C:\\Program Files\\Adobe\\Adobe Animate 2024\\Animate.exe",
      "C:\\Program Files\\Adobe\\Adobe Animate 2023\\Animate.exe",
      "C:\\Program Files\\Adobe\\Adobe Animate 2022\\Animate.exe",
      "C:\\Program Files\\Adobe\\Adobe Animate CC 2021\\Animate.exe",
      "C:\\Program Files\\Adobe\\Adobe Animate CC 2020\\Animate.exe",
    ];

    let executed = false;
    let output = "";
    let error = "";

    // Try to find and execute with Adobe Animate
    for (const animatePath of animatePaths) {
      try {
        // Adobe Animate on Windows can execute JSFL files via command line
        const command = `"${animatePath}" "${tempFilePath}"`;
        const result = await execAsync(command, { timeout: 30000 });
        output = result.stdout;
        error = result.stderr;
        executed = true;
        break;
      } catch (e) {
        // Try next path
        continue;
      }
    }

    // Wait longer for Adobe Animate to read and execute the file before cleanup
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Try to read output file
    let outputData: any = null;
    try {
      if (existsSync(outputFilePath)) {
        const outputContent = readFileSync(outputFilePath, 'utf8');
        outputData = JSON.parse(outputContent);
        unlinkSync(outputFilePath); // Clean up output file
      }
    } catch (e) {
      // Output file not created or invalid JSON - continue with default behavior
    }

    // Clean up JSFL temporary file
    try {
      unlinkSync(tempFilePath);
    } catch (e) {
      // Ignore cleanup errors
    }

    if (!executed) {
      // Alternative method: Write to Adobe Animate's Scripts folder
      return {
        success: false,
        error: `Could not execute JSFL. Please ensure Adobe Animate is installed and running.
        
Alternative method:
1. Copy the JSFL script to: C:\\Users\\YourUsername\\AppData\\Local\\Adobe\\Animate 2024\\en_US\\Configuration\\Commands\\
2. Run it from Adobe Animate's Commands menu

Or manually run the script from: ${tempFilePath}`,
      };
    }

    // Return structured output if available
    if (outputData) {
      return {
        success: outputData.success !== false,
        output: outputData.data ? JSON.stringify(outputData.data, null, 2) : outputData.error,
        error: outputData.error || undefined,
      };
    }

    return {
      success: true,
      output: output || "JSFL executed successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Alternative executor that uses Adobe Animate's file monitoring
 * This requires placing the JSFL file in Adobe Animate's Commands folder
 */
export function generateManualInstructions(jsflCode: string): string {
  return `
To manually execute this JSFL script:

1. Save the following code to a .jsfl file:

${jsflCode}

2. Place it in one of these locations:
   - Windows: C:\\Users\\[YourUsername]\\AppData\\Local\\Adobe\\Animate [Version]\\[Language]\\Configuration\\Commands\\
   - Mac: ~/Library/Application Support/Adobe/Animate [Version]/[Language]/Configuration/Commands/

3. Open Adobe Animate and run it from: Commands menu > [Your Script Name]

Or simply copy the code and run it from Adobe Animate's Commands > Run Command... menu.
`;
}

