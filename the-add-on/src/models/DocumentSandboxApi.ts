export interface DocumentSandboxApi {
    createRectangle(): void;
    createText(textContent: string): void;
    createTextCoords(textContent: string, x: number, y: number): void;
}