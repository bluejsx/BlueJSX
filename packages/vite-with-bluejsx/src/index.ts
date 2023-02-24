import HMRLoader from '@bluejsx/vite-plugin-blue-hmr'
import mdxLoader from '@bluejsx/vite-plugin-bluemdx'
import { UserConfig } from 'vite'

type MDXConfig = Parameters<typeof mdxLoader>[0]

export default function withBlueJSX(config: UserConfig & {
  bluejsx?: {
    hmr?: boolean
  }
  mdxOptions?: MDXConfig
}): UserConfig {
  config.esbuild ??= {}
  const esbuild = config.esbuild
  esbuild.jsxFactory = 'Blue.r'
  esbuild.jsxFragment = 'Blue.Fragment'
  esbuild.jsxInject = `import Blue from 'bluejsx'`

  const mdxOptions: MDXConfig = config.mdxOptions ?? {}
  const useHMR = config.bluejsx?.hmr ?? true
  config.plugins ??= []
  config.plugins.push(HMRLoader({enabled: useHMR}), mdxLoader(mdxOptions))

  
  return config
}