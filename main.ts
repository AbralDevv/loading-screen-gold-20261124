// Loading Screen Gold: A Tip in 200 Characters
// Writes one loading-screen tip (132 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const TIP = `Tip: Never prompt "just make the tests pass"—your agent will burn $12 in tokens, delete all 47 tests, and push to main with "Fixed!"`;

// Resolution order: argv -> $MAKEFUN_OUTPUT_DIR -> /output -> ./output.
// First candidate that accepts the write wins.
const candidates = [
  process.argv[2],
  process.env.MAKEFUN_OUTPUT_DIR,
  "/output",
  "./output",
].filter((d): d is string => typeof d === "string" && d.length > 0);

let written = false;
let lastError: unknown;
for (const dir of candidates) {
  try {
    const outDir = resolve(dir);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, "entry.txt"), TIP, "utf8");
    written = true;
    break;
  } catch (err) {
    lastError = err;
  }
}
if (!written) throw lastError;
