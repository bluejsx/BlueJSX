import VJSX from '../vjsx'

const contents = [
  ['View the Source Code of This Page', 'https://github.com/Momijiichigo/VanillaJSX-Draft/tree/master/examples/example1'],
  ['GitHub Repository', 'https://github.com/Momijiichigo/VanillaJSX-Draft/'],
  ['Join Discussions', 'https://github.com/Momijiichigo/VanillaJSX-Draft/discussions']
]
const Menu = () =>{
  self = <div class='hidden'>{
    contents.map(v=>{
      const link = <a href={v[1]}>{v[0]}</a>
    })
  }
  </div>
  
}