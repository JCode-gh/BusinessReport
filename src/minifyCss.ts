/** Strip comments and collapse whitespace — safe for report inline styles (no url() rewriting). */
export function minifyReportCss(css: string): string {
  let stripped = "";
  let i = 0;

  while (i < css.length) {
    if (css[i] === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      i = end === -1 ? css.length : end + 2;
      continue;
    }

    const quote = css[i];
    if (quote === '"' || quote === "'") {
      stripped += quote;
      i += 1;
      while (i < css.length && css[i] !== quote) {
        if (css[i] === "\\") {
          stripped += css[i] + (css[i + 1] ?? "");
          i += 2;
          continue;
        }
        stripped += css[i++];
      }
      if (i < css.length) stripped += css[i++];
      continue;
    }

    stripped += css[i++];
  }

  return stripped
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>+~])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}
