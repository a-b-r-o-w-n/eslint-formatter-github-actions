import type { ESLint } from "eslint";
import { warning, error } from "@actions/core";
import { formatMessage } from "./formatMessage";
import { wrapInGroup } from "./wrapInGroup";

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

    wrapInGroup(relFilePath, messages, (message) => {
      if (!message.ruleId) {
        return;
      }

      switch (message.severity) {
        // warning
        case 1:
          warning(formatMessage(relFilePath, message));
          break;
        // error
        case 2:
          error(formatMessage(relFilePath, message));
          break;
        default:
          break;
      }
    });
  }
}

module.exports = report;
