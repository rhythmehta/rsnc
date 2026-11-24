import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { defineConfig } from "vite";
import { discoveryFiles, writeSite } from "./scripts/generate-static-pages";

const project = fileURLToPath(new URL(".", import.meta.url));
const root = join(project, ".generated-site");

export default defineConfig(({ isPreview }) => {
  const input = isPreview ? undefined : writeSite(root);
  const discovery = discoveryFiles();

  if (!isPreview) {
    for (const [file, contents] of Object.entries(discovery)) {
      writeFileSync(join(root, file), contents);
    }
  }

  return {
    root,
    publicDir: join(project, "public"),
    appType: "mpa",
    build: {
      outDir: join(project, "dist"),
      emptyOutDir: true,
      modulePreload: false,
      rollupOptions: { input },
    },
    plugins: [{
      name: "rsnc-discovery",
      generateBundle() {
        for (const [fileName, source] of Object.entries(discovery)) {
          this.emitFile({ type: "asset", fileName, source });
        }
      },
    }],
  };
});
