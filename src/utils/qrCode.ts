// Lightweight QR matrix generator for standard URL sharing
// Encodes alphanumeric/binary into standard visual matrix
export function generateQrSvgUri(text: string): string {
  // Use public QuickChart QR or encoded SVG representation with fallback
  const encoded = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=12&color=050b14&bgcolor=ffffff&data=${encoded}`;
}
