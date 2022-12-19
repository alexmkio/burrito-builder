import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],

    // https://vitest.dev/config/
    test: {
      // https://vitest.dev/config/#mockreset
      resetMocks: true,

      // https://vitest.dev/config/#reporters
      reporters: "verbose",

      // https://vitest.dev/config/#environment
      environment: "jsdom",

      /**
       * https://vitest.dev/config/#setupfiles
       * They will be run before each test file.
       */
      // setupFiles: ['./src/setupTests.tsx'],

      /**
       * https://vitest.dev/config/#coverage
       * Pass-through options to https://github.com/bcoe/c8
       */
      coverage: {
        all: true,
        src: ["src"],
        lines: 70,
        exclude: [
          "src/**/*.d.ts",
          "src/**/*.stories.*",
          "src/__mocks__/**/*",
          "src/mockApi/**/*",
          "src/stories/**/*",
          "src/lib/rtl-utils/**/*",
          "src/util/axe-core-importer.ts",
        ],
        include: ["src/**/*.{js,jsx,ts,tsx}"],
        reporter: ["text", "html"],
      },

      /**
       * https://vitest.dev/config/#watchexclude
       * Default: ['node_modules', 'dist']
       * Glob pattern of file paths to be ignored from triggering watch rerun.
       */
      // watchExclude: ['dist', 'coverage', '.storybook', 'node_modules'],
    },
  };
});
