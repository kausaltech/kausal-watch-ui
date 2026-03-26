/**
 * Returns the base URL of the PDF export service, or undefined if not configured.
 * Must only be called on the server (reads process.env).
 */
export function getPdfExportServiceUrl(): string | undefined {
  return process.env.GOTENBERG_URL;
}

/**
 * Returns true if the server-side PDF export service is configured.
 * Must only be called on the server (reads process.env).
 */
export function isPdfExportConfigured(): boolean {
  return !!getPdfExportServiceUrl();
}
