import { defineConfig, normalizePath } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const partialsDir = resolve(__dirname, 'partials');

/**
 * Replaces `<!-- @include name -->` with partials/name.html, so the shared
 * head tags, header/menu and footer are written once for every page.
 * Runs before Vite's own HTML processing, so assets inside partials are
 * bundled exactly as if they were written in the page.
 */
function htmlPartials() {
  const includeTag = /<!--\s*@include\s+([\w-]+)\s*-->/g;
  const watchedDir = `${normalizePath(partialsDir)}/`;
  return {
    name: 'nes-html-partials',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html.replace(includeTag, (_, name) => readFileSync(resolve(partialsDir, `${name}.html`), 'utf8')),
    },
    // Partials aren't in Vite's module graph, so reload the page ourselves.
    handleHotUpdate({ file, server }) {
      if (!file.startsWith(watchedDir)) return;
      server.ws.send({ type: 'full-reload' });
      return [];
    },
  };
}

export default defineConfig({
  plugins: [htmlPartials(), tailwindcss()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,

    /* ── Asset optimization ────────────────────────────── */
    assetsInlineLimit: 4096,         // inline assets < 4 KB
    cssMinify: 'lightningcss',       // fast CSS minification
    minify: 'terser',                // advanced JS minification
    terserOptions: {
      compress: {
        drop_console: true,          // strip console.log in prod
        drop_debugger: true,
        passes: 2,
      },
      format: { comments: false },
    },

    /* ── Code splitting ───────────────────────────────── */
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        work: resolve(__dirname, 'work.html'),
        insights: resolve(__dirname, 'insights.html'),
        contact: resolve(__dirname, 'contact.html'),
        careers: resolve(__dirname, 'careers.html'),
        affiliateApplication: resolve(__dirname, 'affiliate-application.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        notFound: resolve(__dirname, '404.html'),
      },
      output: {
        manualChunks: {
          vendor: [],                // reserved for future deps
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },

    /* ── Reporting ────────────────────────────────────── */
    reportCompressedSize: true,
    chunkSizeWarningLimit: 150,      // warn if chunk > 150 KB
  },
  server: {
    open: true,
    port: 3000,
  },
});
