import VJSX from '../vjsx'
import style, {title} from './Header.module.scss'
const { log } = console
const Header = () =>{

  self = <header >
    <div class={title}>Vanilla.JSX</div>
    <span class={style['menu-btn']} onclick={()=>{}}></span>
  </header>

  return self
}
export default Header