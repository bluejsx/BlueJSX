const path = require('path')
/**
 * @type {import('vite').UserConfig}
 */
export default {
  esbuild: {
    jsxFactory: 'Blue.r',
    jsxFragment: 'Blue.Fragment',
    jsxInject: `import Blue from 'bluejsx'`
  },
}