import type { HTMLTagName, jsxProps, JSXChildren, AdditionalElementProps, SVGTagName, JSXElementTags, JSXElementTagNames } from './types'

import { SVG_TAG_NAMES, ONLY_VIA_SET_ATTRIBUTE } from './data'


Object.defineProperty(EventTarget.prototype, 'on', {
  value: EventTarget.prototype.addEventListener
})


const processChild = (element: Element, child: any) =>{
  if(child instanceof Function) {
    child(element)
  }else if(child instanceof Array){
    for(const v of child){
      processChild(element, v)
    }
  }else element.append(child)
}



function render<T extends HTMLTagName>(component: T, props: jsxProps, ...children: JSXChildren): HTMLElementTagNameMap[T] & AdditionalElementProps;
function render<T extends SVGTagName>(component: T, props: jsxProps, ...children: JSXChildren): SVGElementTagNameMap[T] & AdditionalElementProps;
function render<T extends (...args: any) => any>(component: T, props: jsxProps, ...children: JSXChildren): ReturnType<typeof component>;
function render<T extends Function>(component: T, props: jsxProps, ...children: JSXChildren): T["prototype"];
function render (component: HTMLTagName | SVGTagName | Function | any, props: jsxProps, ...children: JSXChildren){
  props ?? (props = {})
  let isSVG = false
  let element: Element;

  if(typeof component === 'string'){
    if(SVG_TAG_NAMES.has(component)){
      element = document.createElementNS('http://www.w3.org/2000/svg', component)
      isSVG = true
    }else {
      element = document.createElement(component)
    }
  }else if(typeof component === 'function'){
    //if component is custom element class
    if(component?.prototype instanceof Element){
      element = new component()
    }else{
      //if component is a function which returns Element:
      element = component({...props, children: [...children]})
      children.length = 0
    }
  }else{
    throw new Error('Invalid Component')
  }
  if(props){
    for(const key in props){
      const prop = props[key]
      if(key==='ref') prop[0][prop[1]] = element
      else if(isSVG || ONLY_VIA_SET_ATTRIBUTE.has(key) || key.includes('-')){
        element.setAttribute(key, prop)
      } else {
        //let's see if there would be any problem with IDL attr
        element[key] = prop
      }
      
    }
  }
  processChild(element, children)
  
  return element;
}

const Blue = {
  r: render,
  Fragment: ({ children }: {children: Element[]}) =>children,
}

export default Blue
export { useAttr, AttrHolder } from './bjsxlib'
/** Type for specific BlueJSX elements. 
 * Usage: 
 * ```ts
 * const d = <div /> as ElemType<'div'> 
 * ```
 * */
export type ElemType<tagName extends JSXElementTagNames> = JSXElementTags[tagName]

/**
 * A type for reference object.
 * 
 * usage:
 * ```ts
 * const refs: RefType<{
 *  elem1: 'button'  //element tag name
 *  elem2: typeof FuncComponent  //function component
 *  elem3: ClassComponent //Custom Element (extends HTMLElement)
 * }> = {}
 * ```
 */
export type RefType<M extends {[name: string]: ( JSXElementTagNames | HTMLElement | Function | string )}> = {
  [key in keyof M]?: M[key] extends JSXElementTagNames ? ElemType<M[key]> : M[key] extends HTMLElement ? M[key] : M[key] extends ((...args: any)=>any) ? ReturnType<M[key]> : Blue.JSX.Element
}

/**
 * usage:
 * ```ts
 * const Component = (
 *  {attrA}: FuncCompParam<{attrA?: string}>
 * ) => <div />
 * ```
 */
export type FuncCompParam<Param> = {
  children?: [Blue.JSX.Element]
} & Param