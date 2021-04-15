import Menu from './Menu'
import {title} from './Header.module.scss'

const { log } = console
const Header = () =>{
  self = <header >
    <div class={title}>Vanilla.JSX</div>
    <Menu />
  </header>

  return self
}
export default Header