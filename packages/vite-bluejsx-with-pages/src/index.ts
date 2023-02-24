import dirTree from 'directory-tree'
import { resolve, relative, dirname } from 'path'
import { createServer, UserConfig, ViteDevServer } from 'vite'
import withBlueJSX from 'vite-with-bluejsx'
import fs, { constants, accessSync, statSync } from 'fs'
import merge from 'deepmerge'
import { URL } from 'url'

export default function withPages(config: Parameters<typeof withBlueJSX>[0]): UserConfig {
  withBlueJSX(config)
  /** html entry files */
  const entries = {}

  /** directory where `vite.config.js` is located */
  const projectRoot = getPkgJsonDir()


  /** original `pages` folder in project */
  const srcPagesDir = resolve(projectRoot, './pages')

  /** path of entry html files */
  const outPagesDir = resolve(projectRoot, './.bluepages')

  //clean old html sources
  
  try{
    statSync(outPagesDir)
    fs.rmSync(outPagesDir, { recursive: true })
  }catch(e){
    fs.mkdirSync(outPagesDir, { recursive: true })
  }
  
  


  //get pages tree
  const tree = dirTree(srcPagesDir, {
    extensions: /\.(md|mdx|js|jsx|ts|tsx)$/,
    normalizePath: true
  }, ({ name }, path) => {
    const fileName = name.replace(/.[\w]+$/, '')

    if (fileName.indexOf('_') === 0) return null

    const relativePath = relative(projectRoot + '/pages', path)

    /** path location of html entry  */
    const outFilePath = resolve(outPagesDir + '/' + relativePath, '../')

    //create folder structure
    fs.mkdirSync(outFilePath, { recursive: true })
    //output html
    const outHTMLPath = resolve(outFilePath, `./${fileName}.html`)
    fs.writeFileSync(resolve(outFilePath, `./${fileName}.js`), `import Component from '${relative(outFilePath, path)}';import('${relative(outFilePath, srcPagesDir)}/_app').then(({default: Page})=>document.querySelector('#app').appendChild(Page({Component,pageProps:{}})))`)
    const html = fs.readFileSync(`${srcPagesDir}/_template.html`, 'utf-8').replace('</body', `<script type="module" src="./${fileName}.js"></script></body`)
    fs.writeFileSync(outHTMLPath, html)
    //fs.copyFileSync(`${srcPagesDir}/_template.html`, outHTMLPath)
    entries[relativePath.replace(/\//, '_').replace(/.[\w]+$/, '')] = outHTMLPath
  })
  config.plugins ??= []
  /*
  const virtualTreeId = '@virtual:pages-tree'
  config.plugins.push({
    name: 'with-pages-dir-tree', // required, will show up in warnings and errors
    resolveId(id) {
      if (id === virtualTreeId) {
        return virtualTreeId
      }
    },
    load(id) {
      if (id === virtualTreeId) {
        return `export const tree = ${JSON.stringify(tree)}`
      }
    }
  })
  */
  config.plugins.push({
    name: 'with-pages-listen-dir',
    async configureServer(server) {
      const { watcher } = server
      watcher.add(srcPagesDir)
      watcher.on('add', (path, stats) => {
        if (path.includes(srcPagesDir)) restartServer(server)
      })
    }
  })


  return merge(config, {
    build: {
      rollupOptions: {
        input: entries
      },
      emptyOutDir: true,
      outDir: relative(outPagesDir, resolve(projectRoot, './dist'))
    },
    root: outPagesDir,
    publicDir: projectRoot + '/public'
  })
}

function getPkgJsonDir() {

  for (const path of module.paths) {
    try {
      const prospectivePkgJsonDir = dirname(path);
      accessSync(path, constants.F_OK);
      return prospectivePkgJsonDir;
    } catch (e) { }
  }

}

async function restartServer(server: ViteDevServer) {
  // @ts-ignore
  global.__vite_start_time = Date.now()
  const { port } = server.config.server

  await server.close()

  let newServer = null
  try {
    newServer = await createServer(server.config.inlineConfig)
  } catch (err) {
    server.config.logger.error(err.message, {
      timestamp: true,
    })
    return
  }

  for (const key in newServer) {
    if (key !== 'app') {
      // @ts-ignore
      server[key] = newServer[key]
    }
  }
  if (!server.config.server.middlewareMode) {
    await server.listen(port, true)
  } else {
    server.config.logger.info('server restarted.', { timestamp: true })
  }
}