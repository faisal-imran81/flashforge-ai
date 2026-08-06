import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    // The 3D scene chunk is legitimately large; the default 500kB warning is
    // noise once it is deliberately split off the critical path.
    chunkSizeWarningLimit: 900,
    minify: "esbuild",
    rollupOptions: {
      output: {
        // Only ALWAYS-LOADED vendors are chunked by hand, split by
        // cadence-of-change so a content edit doesn't invalidate the whole
        // vendor cache on repeat visits.
        //
        // three.js/drei and gsap are deliberately NOT listed. Naming a chunk
        // that is reachable only through a dynamic import lets Rollup place
        // Vite's __vitePreload helper inside it, which makes the entry chunk
        // statically import it — the entire 690kB of three.js then gets
        // <link rel="modulepreload">-ed on every visit, mobile included, and
        // the code splitting silently does nothing. Leaving them out lets Vite
        // derive the async chunks itself, which is correct by construction.
        // NOTE: there is deliberately no `return "vendor"` catch-all. A
        // catch-all also swallows three.js and gsap, forcing them into an
        // always-loaded chunk and undoing the lazy loading entirely.
        // Anything not named here is left for Rollup to place, which keeps
        // async-only dependencies in async chunks.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/[\\/]node_modules[\\/]framer-motion[\\/]/.test(id)) return "motion";
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(id))
            return "react";
        },
      },
    },
  },
  esbuild: {
    // Strip debug logging from production builds only.
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
