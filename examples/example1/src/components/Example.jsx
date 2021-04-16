import { CustomProgress } from './CustomProgress'

//takes in attributes as arguments (access to children elements via 'children' attribute)
const Example = ({pr1=0, children=null})=>{

	//declare elements
	const progress = <CustomProgress min='0' max='100' value={pr1}/>
	const btn = <button>click</button>
	const self = (
		<div class='t3'>
			{btn}
			{progress} 
      {(set, elem)=>{
        elem.on('pr1change',e=>set(e.detail.value))
        set(pr1)
      }} %
			{children}
		</div>
	)
  //------
  
	//define setters and getters
  
  /*
  below is shorthand of
  Object.defineProperties(self, {...})

  */
	self.useAttr({
		pr1: {
			get(){
				return pr1
			},
			set(v){
				pr1 = v
				self.dispatchEvent(
          new CustomEvent("pr1change", { 
            detail: {
              value: v
            }
          })
        )
			}
		}
	})
  //-------
  
	// functionalities
  self.on('pr1change',e=> progress.value = e.detail.value)
  btn.onclick = () =>{
    /*
      below just looks assigning a value to a property,
    	however this is running getter/setter method.
      So when you change `self.pr1` value, 
    'pr1change' event is dispatched to 'self' element.
    */
    if(self.pr1<100) self.pr1+=10
		else self.pr1 = 0
  }
  //-------
  
	// return self element
	return self	
}
export default Example