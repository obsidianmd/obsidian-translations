// Generic parsed data: outer keys are section headers, inner keys are key=value pairs
export type ParsedData = Record<string, Record<string, string>>;

/**
 * Parse txt file into generic nested Record structure
 * @param content - The txt file content
 * @returns Record where outer keys are section headers, inner keys are key=value pairs
 */
export function parseTxtFile(content: string): ParsedData {
  const lines = content.split('\n');
  const result: ParsedData = {};

  let currentSectionKey: string | null = null;
  let currentSectionData: Record<string, string> = {};

  for (const line of lines) {
    // Section header [keypath]
    if (line.startsWith('[') && line.endsWith(']')) {
      // Start new section
      currentSectionKey = line.slice(1, -1);
      currentSectionData = {};
      result[currentSectionKey] = currentSectionData;
    }
    // key=value line
    else if (currentSectionKey && line.includes('=')) {
      const equalIndex = line.indexOf('=');
      const key = line.slice(0, equalIndex);
      const value = line.slice(equalIndex + 1);

      // Unescape special characters
      const unescapedValue = value.replace(/(\\\\|\\n)/g, str =>
        str.substring(1) === 'n' ? '\n' : '\\'
      );

      currentSectionData[key] = unescapedValue;
    }
  }

  return result;
}

/**
 * Convert parsed data back to txt format
 * @param data - Parsed data structure
 * @returns Txt file content as string
 */
export function dataToTxtFormat(data: ParsedData): string {
  let output = '';

  for (const [sectionKey, sectionData] of Object.entries(data)) {
    output += `[${sectionKey}]\n`;

    for (const [key, value] of Object.entries(sectionData)) {
      // Escape special characters
      const escapedValue = value.replace(/[\n\\]/g, str =>
        '\\' + (str === '\n' ? 'n' : '\\')
      );
      output += `${key}=${escapedValue}\n`;
    }

    output += '\n';
  }

  return output.slice(0, -1);
}
