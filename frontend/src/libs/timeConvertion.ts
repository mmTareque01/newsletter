import { FormattedTime, TimeComponents } from "@/types/time";

export function formatTime(isoString: string): FormattedTime {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid ISO date string");
  }

  return {
    iso: date.toISOString(),
    locale: date.toString(),
    localeDate: date.toLocaleDateString(),
    localeTime: date.toLocaleTimeString(),
    dateTime: formatDateTime(date),
    components: getTimeComponents(date),
    relative: getRelativeTime(date),
    unix: Math.floor(date.getTime() / 1000),
  };
}

function formatDateTime(date: Date): string {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
}

function getTimeComponents(date: Date): TimeComponents {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
  const absDiff = Math.abs(diffInSeconds);

  if (absDiff < 60)
    return `${diffInSeconds} second${absDiff !== 1 ? "s" : ""} ${
      diffInSeconds > 0 ? "from now" : "ago"
    }`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const absMinutes = Math.abs(diffInMinutes);
  if (absMinutes < 60)
    return `${diffInMinutes} minute${absMinutes !== 1 ? "s" : ""} ${
      diffInMinutes > 0 ? "from now" : "ago"
    }`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  const absHours = Math.abs(diffInHours);
  if (absHours < 24)
    return `${diffInHours} hour${absHours !== 1 ? "s" : ""} ${
      diffInHours > 0 ? "from now" : "ago"
    }`;

  const diffInDays = Math.floor(diffInHours / 24);
  const absDays = Math.abs(diffInDays);
  return `${diffInDays} day${absDays !== 1 ? "s" : ""} ${
    diffInDays > 0 ? "from now" : "ago"
  }`;
}

// Usage example
// const timeData = formatTime("2025-05-29T13:55:47.999Z");
// console.log(timeData);
