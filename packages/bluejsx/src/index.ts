import type { JSXProps, JSXChildren, JSXElementTagName, RefsHolderParent, ElemType, RefsHolder } from './types.ts'

import { SVG_TAG_NAMES, ONLY_VIA_SET_ATTRIBUTE } from './data.ts'

import { childRefsSymbol } from './bjsxlib.ts'



const processChild = (element: Element & RefsHolder<Record<string, Element>>, child: any) => {
  if (child instanceof Function) {
    child(element)
  } else if (child instanceof Array) {
    for (const v of child) {
      processChild(element, v)
    }
  } else {
    element.append(child)
    if(child[childRefsSymbol]) {
      const elemRef = element[childRefsSymbol]
      const childRef = child[childRefsSymbol]
      for(const ref in childRef) {
        elemRef[ref] = childRef[ref]
      }
    }
  }
}

type RendererComponentType = JSXElementTagName | ((...args: any) => any) | Element["constructor"]

type RendererReturnType<
  T
> = T extends JSXElementTagName 
  ? ElemType<T>
  : T extends (...args: any) => infer R
    ? R
    : T extends Element["constructor"]
      ? T["prototype"]
      : never

function render<
  T extends RendererComponentType,
  RefName extends string,
  Children extends JSXChildren,
  Returns = RendererReturnType<T>
>(
  component: T,
  props: { ref: RefName },
  ...children: Children
): Returns & RefsHolderParent<{[name in RefName]: Returns}, Children>;

function render<
  T extends RendererComponentType,
  Children extends JSXChildren,
  Returns = RendererReturnType<T> & RefsHolderParent<{}, Children>
>(
  component: T,
  props: { [key: string]: any},
  ...children: Children
): Returns;

function render(component: RendererComponentType, props: JSXProps, ...children: JSXChildren) {
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
      // @ts-ignore: `conponent` is guranteed to be an element constructor
      element = new component()
    } else {
      //if component is a function which returns Element:
      element = component({ ...props, children: [...children] })
      children.length = 0
    }
  } else {
    throw new Error('Invalid Component')
  }
  
  // @ts-ignore: Blue specific property
  element[childRefsSymbol] ??= {}
  // @ts-ignore: Blue specific property
  element.refs = () => element[childRefsSymbol]

  for (const key in props) {
    const prop = props[key]
    if (key === 'ref') {
      // @ts-ignore: Blue specific property
      element[childRefsSymbol][prop] = element
    } else if (isSVG || ONLY_VIA_SET_ATTRIBUTE.has(key) || key.includes('-')) {
      element.setAttribute(key, prop)
    } else {
      //let's see if there would be any problem with IDL attr
      // @ts-ignore: IDL attr
      element[key] = prop
    }
  }
  processChild(element as Element & RefsHolder<Record<string, Element>>, children)

  return element;
}

const Blue = {
  r: render,
  Fragment: ({ children }: { children: Element[] }) => children,
}

export default Blue
export { useAttr, useAttrs, AttrHolder, useConstProps } from './bjsxlib.ts'
export type { ElemType, RefType, FuncCompParam } from './types.ts'
