import { defineConfig } from 'vite'
import { resolve } from 'node:path'

const page = (n: string) => resolve(__dirname, n)
export default defineConfig({
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        index: page('index.html'),
        products: page('products.html'),
        about: page('about.html'),
        contact: page('contact.html'),
        news: page('news.html'),
        404: page('404.html'),
      },
    },
  },
})
