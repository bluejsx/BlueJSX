import { JSDOM } from 'jspm/jsdom'
const { log } = console
const VANILLA_COMP_CLASS_NAME = 'vnl-comp'
let additionalScriptText = `
document.querySelectorAll(.${VANILLA_COMP_CLASS_NAME}).forEach(v=>{
	
})
`
globalThis.document = (new JSDOM()).window.document
const crt: (tagName: string, options?: ElementCreationOptions)=>HTMLElementWithCustomProps = (tagName)=>document.createElement(tagName)

const processFuncCode = (funcName: string ,code: string) =>{
	code = code.substring(code.indexOf('{'))

	code = `function ${funcName}()${code}`
	return code;
}


const hSSG = (component: string | Function | any, props: jsxProps, ...children: [HTMLElement|string|Function|[HTMLElement|string]]|[]): HTMLElementWithCustomProps =>{
	let element: HTMLElementWithCustomProps;
	if(typeof component === 'string'){
		element = crt(component)
	}else if(typeof component === 'function'){
		//if component is custom element class
		if(component?.prototype instanceof HTMLElement){
			try{
				element = new component()
			}catch(e){
				customElements.define(
					Array.prototype.map.call(component.name, (v:string,i:number)=>{
						const lower = v.toLowerCase();
						if(lower===v || i===0) return lower;
						else return '-'+lower
					}).join('')+'-v',
					component
				)
				element = new component()
			}
		}else{
			//if component is a function which returns HTMLElement:
			const scriptText = component.toString()
			const componentName = component.name

			props.children = children
			children.length=0
			element = component(props)
			element.classList.add(VANILLA_COMP_CLASS_NAME)
			element.dataset.comp+=','+componentName
			additionalScriptText=`
			${additionalScriptText}`
		}
	}else{
		throw new Error('using invalid thing as element tag. Are you using ')
	}
	if(props){
		for(const key in props){
			const prop = props[key]
			let func
			if(key==='class') element.classList.value = prop
			else if(
				key.indexOf('m-') === 0 
				&& ( func = element[key.substring(2)] )?.bind
			){
				if(typeof prop === 'function') func( ...prop(element) )
				else if(prop instanceof Array) func( ...prop )
				else throw new Error('invalid parameter')
			}else{
				//element.setAttribute(key, prop)
				element[key] = prop
			}
			
		}
	}
	
	//let childIndex=0;
	for(const child of children){
		if(child instanceof Function) {
			element.append('')
			
			const self: Text = element.childNodes[element.childNodes.length-1]
			let deleted = false
			
			const setter = v =>{
				if(deleted) throw new Error('The node is deleted. Did you change the value of innerText or innerHTML?')
				self.data=v
			}
			const result = child(setter)
			result && setter(result)
		}else if(child instanceof Array){

			child.forEach(v=>{
				element.append(v)
				//childIndex++
			})
		}else element.append(child)

		//childIndex++
	}
	
	return element;
}
//element?.compNames?.push(componentName) || (element.compNames = [componentName])
			