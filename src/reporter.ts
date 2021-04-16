import type { ESLint } from "eslint";
import { formatMessage } from "./formatMessage";

function getRelativePath(path: string) {
  const { GITHUB_WORKSPACE } = process.env;

  if (GITHUB_WORKSPACE) {
    return path.replace(`${GITHUB_WORKSPACE}/`, "");
  }

  return path;
}

export default function report(results: ESLint.LintResult[]) {
  for (const result of results) {
    const { filePath, messages } = result;
    const relFilePath = getRelativePath(filePath);

    for (const message of messages) {
      if (!message.ruleId) {
        return;
      }

      switch (message.severity) {
        // warning
        case 1:
          console.log("::warning", formatMessage(relFilePath, message));
          break;
        // error
        case 2:
          console.log("::error", formatMessage(relFilePath, message));
          break;
        default:
          break;
      }
    }
  }
}

module.exports = report;
