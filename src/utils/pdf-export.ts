/** Paper size (A4) and margins of the exported PDF, in inches. */
export const PDF_PAGE = {
  width: 8.27,
  height: 11.69,
  marginTop: 1.5,
  marginBottom: 1,
  marginLeft: 0.7,
  marginRight: 0.7,
};

/** Width of the exported PDF's printable area, in inches. */
export const PDF_CONTENT_WIDTH_IN = PDF_PAGE.width - PDF_PAGE.marginLeft - PDF_PAGE.marginRight;

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
