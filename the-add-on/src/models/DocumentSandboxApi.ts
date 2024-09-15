export interface DocumentSandboxApi {
    createRectangleCoords(red: number, green: number, blue: number, x: number, y: number, w: number, h: number): void;
    createBackgroundRectangle(): void;
    createText(textContent: string): void;
    createTextCoords(textContent: string, x: number, y: number): void;
    clearAll(): void;
}