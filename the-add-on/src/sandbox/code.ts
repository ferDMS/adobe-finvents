import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";
import { DocumentSandboxApi } from "../models/DocumentSandboxApi";

// Get the document sandbox runtime.
const { runtime } = addOnSandboxSdk.instance;

function start(): void {
    // APIs to be exposed to the UI runtime
    // i.e., to the `App.tsx` file of this add-on.
    const sandboxApi: DocumentSandboxApi = {
        createBackgroundRectangle: () => {
            const rectangle = editor.createRectangle();

            const currentPage = editor.context.currentPage;

            const height = currentPage.height;
            const width = currentPage.width;

            // Define rectangle dimensions.
            // Width is up to 1/8 of total width margin
            rectangle.width = width - 2*(width / 8);
            rectangle.height = height - 2*(height / 4);

            // Define rectangle position.
            rectangle.translation = { x: width / 8, y: height / 4 };

            // Define rectangle color.
            const color = { red: 0.9254901960784314, green: 0.8745098039215686, blue: 0.8, alpha: 1 };

            // Fill the rectangle with the color.
            const rectangleFill = editor.makeColorFill(color);
            rectangle.fill = rectangleFill;

            // Add the rectangle to the document.
            const insertionParent = editor.context.insertionParent;
            insertionParent.children.append(rectangle);
        },
        createText: (textContent: string) => {
            const textObject = editor.createText();
            
            // Get current page
            const currentPage = editor.context.currentPage;

            const height = currentPage.height;
            const width = currentPage.width;
        
            // Set the text content.
            textObject.text = textContent;
        
            // Define text position to be centered.
            textObject.translation = { x: width / 2, y: height / 2 };
            
            // Add the text object to the document.
            const insertionParent = editor.context.insertionParent;
            insertionParent.children.append(textObject);
        },
        createTextCoords: (textContent: string, x: number, y: number) => {
            const textObject = editor.createText();

            // Set the text content.
            textObject.text = textContent;
        
            textObject.textAlignment = 1;

            // Define text position to be centered.
            textObject.translation = { x: x, y: y};

            // Add the text object to the document.
            const insertionParent = editor.context.insertionParent;
            insertionParent.children.append(textObject);
        }
    };

    // Expose `sandboxApi` to the UI runtime.
    runtime.exposeApi(sandboxApi);
}

start();
