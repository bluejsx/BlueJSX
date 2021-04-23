/*
SSG compile flow

HTML output direction:
- first build the webpage with providing VJSX_SSG.r instead of VJSX.r
- VJSX_SSG.r is almost same as VJSX.r
- differences are that VJSX_SSG.r:
	- writes data-vxf attribute to each elements from function components
- after first build, simulate rendering the page using JSDOM
- after rendering, output the innerHTML value of the root element
- then merge them with template html file

JS output direction:
- look into the function component codes,
- with excluding inner scope codes (scopes inside event listeners, etc)
- then if parser finds innerText, innerHTML, setAttribute, classList, dataset, id, etc, 
- delete them because it will be already rendered in HTML
- look for the 'self' element of the component, replace it with a value comes from parameter
- generate function analysis data in form of js object:
import { ExportName } from 'path/to/file.js'
{
	'path/to/file.js#ExportName': {
		comp: ExportName,
		dependency: [36,]
	},
	'path/to/another/file.js#AAA': {
		
	}
}
- 
*/


const Base = ({children}) =><div>{children}</div>
const Test3 = ({pr1,children})=>{
	let self;
	const elem2 = <div>pr1:{s=>self.watch('pr1',v=>s(v))}</div>
	const p1 = <progress max='10'></progress>
	const b1 = <button>click</button>
	self =  (
		<Base>
			{b1}
			{elem2}
			{p1}
			{children}
		</Base>
	)
	//preserve
	useAttr(self, 'pr1', pr1)
	self.watch('pr1', v=>p1.value=v)
	b1.onclick = ()=>{
		self.pr1++;
	}
	//delete
	
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
a = {
	'path/to/file#default':{
		dependency: {
			props: [pr1]
		}
	}
}
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