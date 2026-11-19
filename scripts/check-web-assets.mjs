import { readdir, stat } from "node:fs/promises";
import { join, resolve, relative } from "node:path";

const directory = resolve(process.argv[2] ?? "dist-web");
const maximumBytes = 25 * 1024 * 1024;

async function checkDirectory(path) {
  const problems = [];
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const fullPath = join(path, entry.name);
    if (entry.isDirectory()) {
      problems.push(...await checkDirectory(fullPath));
    } else if (entry.isFile()) {
      const { size } = await stat(fullPath);
      if (size > maximumBytes) problems.push(`${relative(directory, fullPath)} (${(size / 1024 / 1024).toFixed(1)} MiB)`);
    }
  }
  return problems;
}

const oversized = await checkDirectory(directory);
if (oversized.length) {
  console.error(`Web assets exceed Cloudflare's 25 MiB per-file limit:\n${oversized.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log("Web assets fit Cloudflare's 25 MiB per-file limit.");
}
