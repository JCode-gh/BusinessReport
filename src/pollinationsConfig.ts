export const POLLINATIONS_MODEL =
  (import.meta.env.VITE_POLLINATIONS_MODEL as string | undefined)?.trim() || "openai";

export const POLLINATIONS_MAX_TOKENS =
  Number(import.meta.env.VITE_POLLINATIONS_MAX_TOKENS) || 8000;

export const POLLINATIONS_API_KEY =
  (import.meta.env.VITE_POLLINATIONS_API_KEY as string | undefined)?.trim() || undefined;
