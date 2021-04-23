/* @jsx VJSX.r */
import VJSX from '../vjsx'

const assertIsElement = (item: any) =>{
	if(!(item instanceof Element)) throw new Error('only HTML element allowed in parameter')
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

const ElemList = ({ Type = 'div', children = [] }: jsxProps) => {
	const container = <Type>
		{children}
	</Type>
	disableInnerSetter(container)
	const self = new Proxy(container, {
		get(target, prop){
			return (target[prop]?.bind?.(target) || target[prop])
			?? (target.children[prop]?.bind?.(target.children) || target.children[prop])
			?? Array.prototype[prop]?.bind(target.children)
		}
	})
	
	container.push = (item: Element): number =>{
		assertIsElement(item)
		container.append(item)
		return container.children.length
	}
	container.shift = ():Element =>{
		const firstChild = container.children[0]
		firstChild.remove()
		return firstChild
	}
	container.pop = (): Element =>{
		const lastChild = container.children[container.children.length]
		lastChild.remove()
		return lastChild
	}
	container.unshift = (...elems: [Element]): number =>{
		container[0].before(...elems)
		return container.children.length
	}
	return self
}

export { ElemList }