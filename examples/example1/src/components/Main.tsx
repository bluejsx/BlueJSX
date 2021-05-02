import '@vanillajsx/vjsx'

import '../declaration.d'

import { main } from './Main.module.scss'
import './container.scss'

import Example from './Example'

const {log} = console


const Main = () =>
  <div class={main}>
    <Example />
  </div>



export default Main