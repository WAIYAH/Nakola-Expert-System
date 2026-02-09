import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
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
