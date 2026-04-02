/** Trigger a browser file download from a Blob or string. */
export declare function downloadBlob(blob: Blob, filename: string): void;
/** Trigger a browser file download from a string. */
export declare function downloadText(text: string, filename: string, mimeType?: string): void;
/** Trigger a browser file download from an ArrayBuffer. */
export declare function downloadBuffer(buffer: ArrayBuffer, filename: string): void;
