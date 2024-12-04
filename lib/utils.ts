import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface bsz {
  site_pv: string;
  site_uv: string;
  page_pv: string;
  page_uv: string;
}

interface Resp {
  success: boolean;
  data: bsz;
  code: number;
}

export { cn };

export type { bsz, Resp };
