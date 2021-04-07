import Menu from './Menu'
import style, {title} from './Header.module.scss'

const { log } = console
const Header = () =>{
  const menu = <Menu />
  self = <header >
    <div class={title}>Vanilla.JSX</div>
    <span class={style['menu-btn']} onclick={()=>{
      if(menu.open) menu.open=false
      else menu.open=true
    }}></span>
    {menu}
  </header>

  return self
}
export default Header