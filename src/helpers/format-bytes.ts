/**
 * Format bytes to human readable string
 * Source: https://stackoverflow.com/a/18650828
 * @param bytes
 * @param decimals
 * @returns {string} Formatted bytes
 */
export default function formatBytes(bytes: number, decimals = 2): string {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm: number = decimals < 0 ? 0 : decimals;
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i: number = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
