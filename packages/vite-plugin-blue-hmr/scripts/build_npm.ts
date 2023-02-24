import { build, emptyDir } from "https://deno.land/x/dnt@0.25.1/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./src/index.ts"],
  outDir: "./npm",
  test: false,
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "@bluejsx/vite-plugin-blue-hmr",
    version: Deno.args[0],
    description: "vite plugin for HMR with Bluejsx.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git://github.com/bluejsx/plugins.git",
    },
    bugs: {
      url: "https://github.com/bluejsx/codeTransformer/issues",
    },
  },
});

// post build steps
Deno.copyFileSync("README.md", "npm/README.md");