import { mergeConfig } from "vite";
import { defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
      exclude: [...configDefaults.exclude, "./tests/*"],
    },
  })
);
