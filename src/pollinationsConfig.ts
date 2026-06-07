export const POLLINATIONS_MODEL =
  (import.meta.env.VITE_POLLINATIONS_MODEL as string | undefined)?.trim() || "openai";

export const POLLINATIONS_API_KEY =
  (import.meta.env.VITE_POLLINATIONS_API_KEY as string | undefined)?.trim() || undefined;
