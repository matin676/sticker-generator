import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely, resolving conflicts using tailwind-merge.
 * @param {...(string|Object|Array)} inputs - Tailwind classes to merge.
 * @returns {string} The safely merged Tailwind class string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
