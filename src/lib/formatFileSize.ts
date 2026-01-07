/**
 * Format bytes to human readable file size
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.5 MB", "500 KB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Fetch file size from URL using HEAD request
 * @param url - URL of the file
 * @returns File size in bytes, or null if failed
 */
export async function fetchFileSize(url: string): Promise<number | null> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const size = response.headers.get("Content-Length");
    return size ? parseInt(size) : null;
  } catch (error) {
    console.error("Failed to fetch file size:", error);
    return null;
  }
}

/**
 * Calculate total size from multiple files
 * @param files - Array of File objects
 * @returns Formatted total size string
 */
export function calculateTotalSize(files: File[]): string {
  const totalBytes = files.reduce((acc, file) => acc + file.size, 0);
  return formatFileSize(totalBytes);
}
