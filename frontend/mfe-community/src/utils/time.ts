export function formatRelativeTime(dateString?: string): string {
  if (!dateString) return "Just now";

  const date = new Date(dateString);
  const now = new Date();
  
  if (isNaN(date.getTime())) return "Just now";
  
  const diffMs = now.getTime() - date.getTime();
  
  if (diffMs < 60000) return "Just now";

  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  // Long durations: show full date
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}
