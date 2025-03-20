import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const boyURL = 'https://avatar.iran.liara.run/public/17';
export const girlURL = 'https://avatar.iran.liara.run/public/98';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
