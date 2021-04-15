import type { Linter } from "eslint";

export function formatMessage(filePath: string, result: Linter.LintMessage) {
  const { ruleId, line, column, message } = result;

  let output = `file=${filePath}`;

  if (line) {
    output += `,line=${line}`;
  }

  if (column) {
    output += `,col=${column}`;
  }

  output += `::[${ruleId}] ${message}`;

  return output;
}
