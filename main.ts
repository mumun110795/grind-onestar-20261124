// One-Star Review of Something Essential — entry generator.
//
// The whole entry is a single line of text: an earnest one-star
// review of sleep, written the way someone would complain about an
// app that used to work and now does not. This program simply
// writes that line, unchanged, to entry.txt in the output folder.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The review itself. Kept on one line, deliberately under the
// competition's 160-character ceiling.
const REVIEW =
  "1 star. Sleep used to knock me out instantly. Now: 2 hours to load, crash at 3 a.m., dreams are reruns of my worst day, still charged 8 hours. Can't uninstall.";

// Where the grader expects the result. Defaults to /output, but an
// explicit OUTPUT_DIR always wins so the entry can be produced
// anywhere for a local check.
const outputDir = process.env.OUTPUT_DIR ?? "/output";

// Guard the one rule that matters here: a review that is empty or
// over the limit is not an entry at all, so fail loudly instead of
// writing a file that would be rejected.
if (REVIEW.length < 1 || REVIEW.length > 160) {
  throw new Error(
    `review must be 1-160 characters, got ${REVIEW.length}`,
  );
}

// Create the folder if it is missing. The folder itself is never
// removed — on the grading runner it may be a mounted volume, and
// deleting a mount point would break the run.
mkdirSync(outputDir, { recursive: true });

const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, REVIEW, "utf8");

console.log(`wrote ${REVIEW.length} characters to ${entryPath}`);
