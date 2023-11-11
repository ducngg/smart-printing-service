/**
 * Returns the time since a given date in a human readable format
 * Source: https://stackoverflow.com/a/3177838
 * @param date ISO 8601 date string
 * @returns {string} Time since the given date
 */
export default function timeSince(date: number): string {
  const seconds = Math.floor((Date.now() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} năm trước`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} tháng trước`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} ngày trước`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} giờ trước`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} phút trước`;
  }
  if (seconds < 0) {
    return 'Vừa xong';
  }
  return `${Math.floor(seconds)} giây trước`;
}
