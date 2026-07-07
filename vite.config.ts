import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

// Plain Vite + TanStack Start configuration.
// Order matters: tsconfig paths, then Tailwind, then the TanStack Start
// plugin (which owns the SSR pipeline), then the React plugin.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    nitro(),
    tailwindcss(),
    tanstackStart({
      // Route TanStack Start's server entry to src/server.ts, our SSR error wrapper.
      server: {
        entry: "server",
      },
    }),
    viteReact(),
  ],
});
