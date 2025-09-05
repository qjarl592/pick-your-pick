import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function chunk(list: any[], chunkSize: number) {
  return Array.from(
    {
      length: Math.ceil(list.length / chunkSize),
    },
    (_, index) => {
      return list.slice(index * chunkSize, (index + 1) * chunkSize);
    }
  );
}

export function checkIsDev() {
  const forceDevEnv = true; // supabase 이용량 제한 걸린 경우
  return forceDevEnv || process.env.NODE_ENV === "development";
}
