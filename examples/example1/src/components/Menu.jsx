import './menu.scss'

const contents = [
  ['View the Source Code of This Page', 'https://github.com/Momijiichigo/VanillaJSX-Draft/tree/master/examples/example1'],
  ['GitHub Repository', 'https://github.com/Momijiichigo/VanillaJSX-Draft/'],
  ['Join Discussions', 'https://github.com/Momijiichigo/VanillaJSX-Draft/discussions']
]
const Menu = () =>{
  let open = false
  const backField = <div id='backfield'></div>
  const self = <div class={'menu_list hidden'}>{
    contents.map(v=>{
      const link = <p>{v[0]}</p>
      link.onclick = () =>window.open(v[1])
      return link
    }
    )
  }
  {backField}
  </div>
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
  return self
}
export default Menu