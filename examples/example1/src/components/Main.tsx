import marked from 'marked'
import hljs from 'highlight.js'
import '../declaration.d'

import 'github-markdown-css'
import 'highlight.js/styles/vs2015.css'
import { main } from './Main.module.scss'
import './container.scss'

import Example from './Example'
import article from './article.md?raw'

const {log} = console

marked.setOptions({
  highlight: function (code: string, lang: string) {
    return hljs.highlightAuto(code, [lang]).value
  }
})
const Main = () =>{
  const container = (<div class='container'>
    {
      marked(article).split('<hr>').map(htmStr=>(
        <section innerHTML={htmStr} class='markdown-body' />
      ))
    }
  </div>)
  container.querySelector('#example-result-space').appendChild(<Example />)
  const self = <div class={main}>
    {container}
  </div>
  return self
}


export default Main