export interface DocumentSandboxApi {
    createBackgroundRectangle(): void;
    createText(textContent: string): void;
    createTextCoords(textContent: string, x: number, y: number): void;
}