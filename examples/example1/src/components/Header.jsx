import Menu from './Menu'
import {title} from './Header.module.scss'

const { log } = console
const Header = () =>(
  <header >
    <div class={title}>Vanilla.JSX</div>
    <Menu />
  </header>)
export default Header