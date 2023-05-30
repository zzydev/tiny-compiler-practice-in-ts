import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        passWithNoTests: true,
        exclude: ["**/node_modules/**", "**/dist/**"],
        threads: true,
    },
    resolve: {
        alias: {
            shared: "./src/shared/types",
        },
    },
});
