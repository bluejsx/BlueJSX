import VJSX from '../vjsx'
import marked from 'marked'
import { main } from './Main.module.scss'
import Example from './Example'
import Header from './Header'
import Container from './Container'
import article from './article.md?raw'

const {log} = console

const Main = () =>(<div class={main}>
    <Header />
    <Container>{
      marked(article).split('<hr>').map(htmStr=>{
        const page = <section />
        page.innerHTML = htmStr
        return page
      })
    }</Container>
  </div>
)

export default Main