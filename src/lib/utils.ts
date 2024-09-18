import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const bigIntToString = (data: unknown): string | object | unknown => {
  if (typeof data === "bigint") {
    return data.toString();
  }
  if (Array.isArray(data)) {
    return data.map(bigIntToString);
  }
  if (typeof data === "object" && data !== null) {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, bigIntToString(value)]));
  }
  return data;
};
