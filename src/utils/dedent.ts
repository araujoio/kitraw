export function dedent(strings: TemplateStringsArray, ...values: any[]) {
  const fullString = strings.reduce((acc, str, i) => acc + str + (values[i] ?? ""), "");

  // Split into lines
  const lines = fullString.split("\n");

  // Skip the first line if it's empty (common in multi-line templates)
  if (lines[0].trim() === "") lines.shift();
  // Skip the last line if it's empty
  if (lines.length > 0 && lines[lines.length - 1].trim() === "") lines.pop();

  // Find the minimum indentation of non-empty lines
  const minIndent = lines
    .filter((line) => line.trim() !== "")
    .reduce((min, line) => {
      const indent = line.match(/^\s*/)?.[0].length ?? 0;
      return Math.min(min, indent);
    }, Infinity);

  // Remove the minimum indentation from each line
  return lines
    .map((line) => (line.trim() === "" ? "" : line.slice(minIndent)))
    .join("\n");
}
