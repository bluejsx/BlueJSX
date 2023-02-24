import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./src/index.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: "dev",
  },
  test: false,
  // scriptModule: false,
  package: {
    // package.json properties
    name: "bluejsx",
    version: Deno.args[0],
    description: "BlueJSX - pure javascript with JSX syntax",
    license: "MIT",
    "repository": {
      "type": "git",
      "url": "git://github.com/bluejsx/BlueJSX.git",
    },
    // "type": "module",
    "publishConfig": {
      "registry": "https://registry.npmjs.org/",
    },
    // "main": "./dist/index.js",
    // "types": "./dist/index.d.ts",
    // "files": [
    //   "dist/",
    // ],
    "keywords": [
      "jsx",
      "vanillajs",
      "bluejsx",
      "lightweight",
      "frontend",
    ],
    "bugs": {
      "url": "https://github.com/bluejsx/BlueJSX/issues",
    },
    "homepage": "https://bluejsx.github.io/",
    // "directories": {
    //   "example": "examples",
    //   "lib": "lib",
    // },
    "author": "momijiichigo",
    compilerOptions: {
      lib: ["esnext", "dom"],
    },
  },
});

// post build steps
Deno.copyFileSync("LICENSE.md", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
