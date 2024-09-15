import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";
import { DocumentSandboxApi } from "../models/DocumentSandboxApi";

// Get the document sandbox runtime.
const { runtime } = addOnSandboxSdk.instance;

function start(): void {
    // APIs to be exposed to the UI runtime
    // i.e., to the `App.tsx` file of this add-on.
    const sandboxApi: DocumentSandboxApi = {
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
        },
        createRectangleCoords: (red: number, green: number, blue: number, x: number, y: number, w: number, h: number) => {
            const rectangle = editor.createRectangle();

            rectangle.width = w;
            rectangle.height = h;

            // Define rectangle position.
            rectangle.translation = { x: x, y: y };

            // Define rectangle color.
            const color = { red: red, green: green, blue: blue, alpha: 1 };

            // Fill the rectangle with the color.
            const rectangleFill = editor.makeColorFill(color);
            rectangle.fill = rectangleFill;

            // Add the rectangle to the document.
            const insertionParent = editor.context.insertionParent;
            insertionParent.children.append(rectangle);
        },
        createBackgroundRectangle: () => {
            const currentPage = editor.context.currentPage;
            const pageH = currentPage.height;
            const pageW = currentPage.width;

            const w = pageW - (2*(pageW/8));
            const h = pageH - (2*(pageH/4));

            // Define rectangle color.
            const red = 0.8196078431372549;
            const green = 0.9137254901960784;
            const blue = 0.9647058823529412;

            // Define rectangle position.
            const x = pageW / 8;
            const y = pageH / 4;

            // Use createRectangleCoords to create the rectangle
            sandboxApi.createRectangleCoords(red, green, blue, x, y, w, h);
        }
    };

    // Expose `sandboxApi` to the UI runtime.
    runtime.exposeApi(sandboxApi);
}

start();
