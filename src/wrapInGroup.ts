import { startGroup, endGroup } from "@actions/core";
import type { Linter } from "eslint";

const groupMap = new Map<string, boolean>();

function startGroupOnce(groupName: string) {
  if (!groupMap.has(groupName)) {
    startGroup(groupName);
    groupMap.set(groupName, true);
  }
}

export function wrapInGroup(
  groupName: string,
  messages: Linter.LintMessage[],
  callback: (message: Linter.LintMessage) => void
) {
  for (const message of messages) {
    startGroupOnce(groupName);
    callback(message);
  }

  if (groupMap.has(groupName)) {
    endGroup();
  }
}
