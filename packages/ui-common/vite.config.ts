import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      formats: ['es'],
      fileName: 'components/index',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@radix-ui/react-select',
        '@radix-ui/react-dialog',
        '@radix-ui/react-toast',
      ],
    },
  },
})
