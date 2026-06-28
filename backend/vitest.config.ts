import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // Sets runtime environment to Node.js
    globals: true, // Optional: Allows use of describe/test/expect without imports
  },
});
