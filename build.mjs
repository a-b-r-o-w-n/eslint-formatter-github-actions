import esbuild from "esbuild";
import fs from "fs-extra";

async function clean() {
  await fs.emptyDir("./lib");
}

async function build() {
  await esbuild.build({
    entryPoints: ["./src/reporter.ts"],
    outfile: "./lib/eslint-formatter-github-actions.js",
    bundle: true,
    platform: "node",
    target: ["es2015"],
  });
}

clean()
  .then(build)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
