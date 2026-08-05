import { XMLBuilder, XMLParser, XMLValidator } from "fast-xml-parser";

export type XmlFormatResult =
  { ok: true; value: string } | { ok: false; error: string };

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  preserveOrder: true,
  trimValues: false,
  commentPropName: "#comment",
});

const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  preserveOrder: true,
  format: true,
  indentBy: "  ",
  commentPropName: "#comment",
  suppressEmptyNode: false,
});

const minifyBuilder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  preserveOrder: true,
  format: false,
  commentPropName: "#comment",
  suppressEmptyNode: false,
});

export function formatXml(input: string): XmlFormatResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter XML to format." };
  }

  const validation = XMLValidator.validate(trimmed);
  if (validation !== true) {
    return {
      ok: false,
      error:
        typeof validation === "object" && "err" in validation
          ? validation.err.msg
          : "Invalid XML input.",
    };
  }

  try {
    const parsed: unknown = parser.parse(trimmed);
    return { ok: true, value: builder.build(parsed).trimEnd() };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error && error.message
          ? error.message
          : "Unable to format XML.",
    };
  }
}

export function minifyXml(input: string): XmlFormatResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter XML to minify." };
  }

  const validation = XMLValidator.validate(trimmed);
  if (validation !== true) {
    return {
      ok: false,
      error:
        typeof validation === "object" && "err" in validation
          ? validation.err.msg
          : "Invalid XML input.",
    };
  }

  try {
    const parsed: unknown = parser.parse(trimmed);
    return { ok: true, value: minifyBuilder.build(parsed).trim() };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error && error.message
          ? error.message
          : "Unable to minify XML.",
    };
  }
}

export function validateXml(input: string): XmlFormatResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter XML to validate." };
  }

  const validation = XMLValidator.validate(trimmed);
  if (validation !== true) {
    return {
      ok: false,
      error:
        typeof validation === "object" && "err" in validation
          ? validation.err.msg
          : "Invalid XML input.",
    };
  }

  return { ok: true, value: trimmed };
}
