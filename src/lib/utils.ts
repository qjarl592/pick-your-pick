import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const bigIntToString = (data: any): any => {
//   if (typeof data === "bigint") {
//     return data.toString();
//   }
//   if (Array.isArray(data)) {
//     return data.map(bigIntToString);
//   }
//   if (typeof data === "object" && data !== null) {
//     return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, bigIntToString(value)]));
//   }
//   return data;
// };

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
  return process.env.NODE_ENV === "development";
}
