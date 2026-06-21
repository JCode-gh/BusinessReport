const env = typeof import.meta !== "undefined" ? import.meta.env : undefined;

export const POLLINATIONS_MODEL =
  (env?.VITE_POLLINATIONS_MODEL as string | undefined)?.trim() || "openai";

export const POLLINATIONS_API_KEY =
  (env?.VITE_POLLINATIONS_API_KEY as string | undefined)?.trim() || undefined;
