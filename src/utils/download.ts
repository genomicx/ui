/** Trigger a browser file download from a Blob or string. */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Trigger a browser file download from a string. */
export function downloadText(text: string, filename: string, mimeType = 'text/plain'): void {
  downloadBlob(new Blob([text], { type: mimeType }), filename);
}

/** Trigger a browser file download from an ArrayBuffer. */
export function downloadBuffer(buffer: ArrayBuffer, filename: string): void {
  downloadBlob(new Blob([buffer]), filename);
}
