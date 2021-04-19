import { useAttr } from '@vanillajsx/vjsx'
import { CustomProgress } from './CustomProgress'

//takes in attributes as arguments (access to children elements via 'children' attribute)
const Example = ({progValue=0, children})=>{

	//declare elements
	const progress = <CustomProgress min='0' max='100' value={progValue}/>
	const btn = <button>click</button>
	const self = (
		<div class='t3'>
			{btn}
			{progress} 
      {(set, elem)=>elem.watch('progValue',v=>set(v))} %
			{children}
		</div>
	)

  /*
  below defines a property named 'progValue',
	and when 'progValue' changes, 
	all registered listeners will be executed.
  */
	useAttr(self, 'progValue', progValue)

	// functionalities
	//when `self.progValue` changed, set `progress.value` to `self.progValue`
  self.watch('progValue',v=> progress.value = v)

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