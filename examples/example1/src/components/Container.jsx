import VJSX from '../vjsx'
import { container } from './Container.module.scss'
const Container = ({children}) =>(
  <div class={container}>
    {children}
  </div>
)
export default Container