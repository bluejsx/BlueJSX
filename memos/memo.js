const Base = ({children}) =><div>{children}</div>
const Test3 = ({pr1,children})=>{
	//value setters
	let pr1Setter = () =>{}

	//declare elements
	const elem1 = <Base>aaa</Base>
	const elem2 = <div>pr1:{s=>elem2.setValue=s}</div>
	const p1 = <progress min='0' max='10'></progress>
	const b1 = <button>click</button>
	const self =  (
		<div>
			{elem1}
			{elem2}
			{p1}
			{b1}
			{children}
		</div>
	)
	//element attributes
	self.defineAttrs({
		pr1: {
			get(){
				return pr1
			},
			set(v){
				pr1 = v
				pr1Setter(v)
			}
		}
	})
	// functionalities
	elem1.onmousehover = ()=>elem1.innerText+='a'
	const setProgress = v => p1.value = v
	b1.onclick = ()=>setProgress(p1.value+1)
	// return self element
	return self	
}
////////
/*
const COMP_NAME_MAP = {
	'Xzt5Nm': Test3
}
Object.prototype.getKey = function(value){
	for(const key of Object.keys(this)){
		if(this[key]===value) return key;
	}
	return null
}*/
//////
const COMP_NAME_MAP = {
	'Xzt5Nm': Test3
}
const getChildren = (self) => Array.prototype.filter.call(self.children, v=>{
	const corr = v.dataset?.prt===selfKey
	if(corr){
		const compList = v.dataset?.comp.split(',') || []
		compList.forEach(comp=>COMP_NAME_MAP[comp](v))
		v.removeAttribute('data-comp')
		return true
	}
	return false
})
/////
import { getChildren, COMP_NAME_MAP } from 'vnllaTools'
const Test3Init = (self)=>{
	//value setters
	let pr1Setter = () =>{}
	/*
	<div class='v-Xzt5Nm'>
		<div>aaa</div>
		<div>pr1:3</div>
		<progress min='0' max='10'></progress>
		<button>click</button>
	*/
	//declare elements
	const children = getChildren(self)
	const elem1 = children[0]
	const elem2 = children[1]
	const p1 = children[2]
	const b1 = children[3]
	
	//element attributes
	self.defineAttrs({
		pr1: {
			get(){
				return pr1
			},
			set(v){
				pr1 = v
				pr1Setter(v)
			}
		}
	})
	// functionalities
	elem1.onmousehover = ()=>elem1.innerText+='a'
	const setProgress = v => p1.value = v
	b1.onclick = ()=>setProgress(p1.value+1)
	// return self element
	//return self	
}
///main
document.querySelectorAll('.vnl-comp').forEach(v=>{
	const compList = v.dataset?.comp.split(',') || []
	compList.forEach(comp=>COMP_NAME_MAP[comp](v))
	v.removeAttribute('data-comp')
})

a = <div data-comp='Base,Test3' ></div>