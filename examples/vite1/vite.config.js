import withBlueJSX from 'vite-with-bluejsx'
import path from 'path'

export default withBlueJSX({
  bluejsx: {
    /**
     * HMR is currently experimental. 
     * Set false for always reload the page in dev mode.
     */
    hmr: true
  },
  plugins: [],
  base: './',
  assetsInclude: 'public/*',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})