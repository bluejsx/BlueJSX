import { useAttr, AttrHolder, ElemType } from '@vanillajsx/vjsx'
import { Txt } from '@vanillajsx/vjsx/components'
import { CustomProgress } from './CustomProgress'

//takes in attributes as arguments (access to children elements via 'children' attribute)
const Example = ({ progValue = 0, children = null }) => {

  //declare elements
  //const progress = <CustomProgress max='100' value={progValue}/>
  //const btn = <button>click</button>
  const refs: {
    btn?: ElemType<'button'>,
    progress?: ElemType<'progress'>
    percentageText?: Text
  } = {}
  //const percentageText = new Text(progValue.toString())
  const self = (
    <div class='t3'>
      <button ref={[refs, 'btn']}>click</button>
      <CustomProgress ref={[refs, 'progress']} max='100' value={progValue} />
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
  self.watch('progValue', v => {
    progress.value = v
    percentageText.data = v
  })

  btn.onclick = () => {
    /*
      below just looks assigning a value to a property,
      however this is running getter/setter method,
      which executes all registered listener functions via `watch` method.
    */
    if (self.progValue < 100) self.progValue += 10
    else self.progValue = 0
  }

  // return self element
  return self
}
export default Example