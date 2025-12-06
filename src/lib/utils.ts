import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, fromUnixTime } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a Unix timestamp (in seconds) to a human-readable date and time string */
export function formatTimestamp(timestamp: number): string {
  return format(fromUnixTime(timestamp), "dd/MM/yyyy 'at' HH:mm")
}
