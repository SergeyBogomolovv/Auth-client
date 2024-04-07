import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, './src/components'),
      hoc: path.resolve(__dirname, './src/hoc'),
      hooks: path.resolve(__dirname, './src/hooks'),
      interfaces: path.resolve(__dirname, './src/interfaces'),
      pages: path.resolve(__dirname, './src/pages'),
      lib: path.resolve(__dirname, './src/lib'),
      api: path.resolve(__dirname, './src/redux/api'),
      slices: path.resolve(__dirname, './src/redux/slices'),
      schemas: path.resolve(__dirname, './src/schemas'),
    },
  },
})
