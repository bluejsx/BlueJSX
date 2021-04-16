import { defineAttrsOptions, ElementWithCustomProps, jsxProps, AdditionalElementProps } from './@types/vjsx.d';
import { SVG_TAG_NAMES } from './data'

EventTarget.prototype.on = EventTarget.prototype.addEventListener;

Element.prototype.ready = function(func: Function){
	func(this)
}


Element.prototype.useAttr = function(descriptor: defineAttrsOptions){
	Object.defineProperties(this, descriptor)
}


const disableInnerSetter = (elem: ElementWithCustomProps) =>{
	
	Object.defineProperties(elem,{
		innerHTML:{
			set(){}
		},
		innerText:{
			set(){}
		}
	})
}

const generateTagName = (name: string): string =>
name.replace(/[A-Z]/g,'-$&').substring(1).toLowerCase()

const processChild = (element: Element, child: any) =>{
	if(child instanceof Function) {
		element.append('')
		
		const self = element.childNodes[element.childNodes.length-1] as Text
		disableInnerSetter(element)
		const setter = v =>{
			self.data=v.toString()
		}
		const result = child(setter, element)
		result && setter(result)
	}else if(child instanceof Array){
		for(const v of child){
			processChild(element, v)
		}
	}else element.append(child)
}


type HTMLTagName = keyof HTMLElementTagNameMap
type SVGTagName = keyof SVGElementTagNameMap
type JSXChildren = [ Element | string | Function | JSXChildren ] | []

function render<T extends HTMLTagName>(component: T, props: jsxProps, ...children: JSXChildren): HTMLElementTagNameMap[T] & AdditionalElementProps;
function render<T extends SVGTagName>(component: T, props: jsxProps, ...children: JSXChildren): SVGElementTagNameMap[T] & AdditionalElementProps;
function render<T extends (...args: any) => any>(component: T, props: jsxProps, ...children: JSXChildren): ReturnType<typeof component>;
function render (component: HTMLTagName | SVGTagName | Function | any, props: jsxProps, ...children: JSXChildren){
	props ?? (props = {})
	let element: Element;

	if(typeof component === 'string'){
		if(SVG_TAG_NAMES.includes(component)){
			element = document.createElementNS('http://www.w3.org/2000/svg', component)
		}else {
			element = document.createElement(component)
		}
	}else if(typeof component === 'function'){
		//if component is custom element class
		if(component?.prototype instanceof Element){
			try{
				element = new component()
			}catch(e){
				customElements.define(
					generateTagName(component.name),
					component
				)
				element = new component()
			}
		}else{
			//if component is a function which returns Element:
			element = component({...props, children: [...children]})
			children.length = 0
		}
	}else{
		throw new Error('using invalid thing used as element tag.')
	}
	if(props){
		for(const key in props){
			const prop = props[key]
			if(key==='class') element.classList.value = prop
			else{
				if(element instanceof SVGElement){
					element.setAttribute(key, prop)
				} else {
					try{
						element[key] = prop
					}catch(e){
						element.setAttribute(key, prop)
					}
				}
			}
			
		}
	}
	processChild(element, children)
	
	return element;
}

const VJSX = {
	r: render,
	Fragment: ({ children }: {children: [Element]}) =>children,
}

export default VJSX

/*
merge string items if there are continuous string items

	const childList = []
	let strComp = []
	let previousChildWasString = false;
	for(let i=0;i<children.length;i++){
		const v=children[i]
		if(typeof v === 'string' || typeof v === 'function'){
			//when the child was string or function
			strComp.push(v)
			if(previousChildWasString){
				//if previous child & current child are str/func  
				
				/*
				children[i-1]+=v
				children.splice(i, 1)
				i--
				
			}else{
				//if previous child was NOT str/func & current child are str/func
				
				previousChildWasString=true
			}
		}else{
			//when the child was NOT str/func

			if(strComp.length!==0) childList.push(strComp) 
			strComp=[]
			childList.push(v)
			
			previousChildWasString=false
		} 
	}
	let childIndex=0

	*/