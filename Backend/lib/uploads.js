import "dotenv/config";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const backendDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

export const uploadsDirectory = path.resolve(
  process.env.UPLOADS_DIR || path.join(backendDirectory, "uploads")
);

mkdirSync(uploadsDirectory, { recursive: true });
