import type { jsxProps, JSXChildren, JSXElementTagName, ElemType } from './types'

import { SVG_TAG_NAMES, ONLY_VIA_SET_ATTRIBUTE } from './data'




const processChild = (element: Element, child: any) => {
  if (child instanceof Function) {
    child(element)
  } else if (child instanceof Array) {
    for (const v of child) {
      processChild(element, v)
    }
  } else {
    element.append(child)
  }
}




function render<T extends JSXElementTagName>(component: T, props: jsxProps, ...children: JSXChildren): ElemType<T>;
function render<T extends (...args: any) => any>(component: T, props: jsxProps, ...children: JSXChildren): ReturnType<typeof component>;
function render<T extends Function>(component: T, props: jsxProps, ...children: JSXChildren): T["prototype"];
function render(component: JSXElementTagName | Function | any, props: jsxProps, ...children: JSXChildren) {
  props ??= {}
  let isSVG = false
  let element: Element;

  if (typeof component === 'string') {
    if (SVG_TAG_NAMES.has(component)) {
      element = document.createElementNS('http://www.w3.org/2000/svg', component)
      isSVG = true
    } else {
      element = document.createElement(component)
    }
  } else if (typeof component === 'function') {
    //if component is custom element class
    if (component?.prototype instanceof Element) {
      element = new component()
    } else {
      //if component is a function which returns Element:
      element = component({ ...props, children: [...children] })
      children.length = 0
    }
  } else {
    throw new Error('Invalid Component')
  }
  for (const key in props) {
    const prop = props[key]
    if (key === 'ref') {
      prop[0][prop[1]] = element
    } else if (isSVG || ONLY_VIA_SET_ATTRIBUTE.has(key) || key.includes('-')) {
      element.setAttribute(key, prop)
    } else {
      //let's see if there would be any problem with IDL attr
      element[key] = prop
    }
  }
  processChild(element, children)

  return element;
}

const Blue = {
  r: render,
  Fragment: ({ children }: { children: Element[] }) => children,
}

export default Blue
export { useAttr, useAttrs, AttrHolder, getRefs, useConstProps } from './bjsxlib'
export { ElemType, RefType, FuncCompParam } from './types'
