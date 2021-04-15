import './menu.scss'

const contents = [
  ['View the Source Code of This Page', 'https://github.com/Momijiichigo/VanillaJSX-Draft/tree/master/examples/example1'],
  ['GitHub Repository', 'https://github.com/Momijiichigo/VanillaJSX-Draft/'],
  ['Join Discussions', 'https://github.com/Momijiichigo/VanillaJSX-Draft/discussions']
]
const Menu = () =>{
  let open = false
  const toggleButton = (<div id='h-menu-button'>
    <span></span>
    <span></span>
  </div>)
  const backField = <div id='backfield'></div>
  const self = (<div class='menu_list_container hidden'>
    {toggleButton}
    <div class='menu-list'>{
      contents.map(v=>{
        const link = <p>{v[0]}</p>
        link.onclick = () =>window.open(v[1])
        return link
      })
    }</div>
    {backField}
  </div>)
  self.useAttr({
    open:{
      get(){
        return open
      },
      set(v){
        open = v;
        if(v){
          self.classList.remove('hidden')
        }else{
          self.classList.add('hidden')
        }
      }
    }
  })
  backField.onclick = () => self.open = false
  toggleButton.onclick = () => self.open = !self.open
  return self
}
export default Menu