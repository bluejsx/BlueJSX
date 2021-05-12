import { useAttr } from '@vanillajsx/vjsx'
import { Txt, ElemList } from '@vanillajsx/vjsx/components'

import { CustomProgress } from './CustomProgress'

//takes in attributes as arguments (access to children elements via 'children' attribute)
const Example = ({progValue=0, children=null})=>{

  //declare elements
  //const progress = <CustomProgress max='100' value={progValue}/>
  //const btn = <button>click</button>
  const refs: {
    btn?: HTMLButtonElement,
    progress?: HTMLProgressElement
    percentageText?: Text
  } = {}
  //const percentageText = new Text(progValue.toString())
  const self = (
    <div class='t3'>
      <button ref={[refs, 'btn']}>click</button>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g fill="white" stroke="green" stroke-width="5">
          <circle cx="40" cy="40" r="25" />
          <circle cx="60" cy="60" r="25" />
        </g>
      </svg>
      <CustomProgress ref={[refs, 'progress']} max='100' value={progValue}/>
      <Txt ref={[refs, 'percentageText']}>{progValue}</Txt> %
      {children}
    </div>
  )
  const { btn, progress, percentageText } = refs

  /*
  below defines a property named 'progValue',
  and when 'progValue' changes, 
  all registered listeners will be executed.
  */
  useAttr(self, 'progValue', progValue)

  // functionalities
  //when `self.progValue` changed, set `progress.value` to `self.progValue`
  self.watch('progValue',v=>{
    progress.value = v
    percentageText.data = v
  })

  btn.onclick = () =>{
    /*
      below just looks assigning a value to a property,
      however this is running getter/setter method,
      which executes all registered listener functions via `watch` method.
    */
    if(self.progValue<100) self.progValue+=10
    else self.progValue = 0
  }

  // return self element
  return self	
}
export default Example