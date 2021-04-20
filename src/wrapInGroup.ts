import { Linter } from "eslint";

const groupSet = new Set<string>();

const startGroupOnce = (groupName: string) => {
  if (!groupSet.has(groupName)) {
    console.log(`::group::${groupName}`);
    groupSet.add(groupName);
  }
};

export function wrapInGroup(
  groupName: string,
  messages: Linter.LintMessage[],
  cb: (message: Linter.LintMessage) => void
) {
  for (const message of messages) {
    startGroupOnce(groupName);
    cb(message);
  }

  if (groupSet.has(groupName)) {
    console.log("::endgroup::");
  }
}
