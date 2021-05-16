//import VJSX from '../vjsx'

interface jsxProps {
  id?: string;
  class?: string;
  ref?: [object, string];
  [key: string]: any;
}
interface defineAttrsOptions {
  [key: string]: PropertyDescriptor
}
interface ElementWithCustomProps extends Element{
  [key: PropertyKey]: any
}

interface AdditionalElementProps {
  on: typeof EventTarget.prototype.addEventListener,
  watch: (name: string, listener: (value: any)=>void) => void
  _vf: { [key: string]: Function[] & {value?: any} },
  [key: PropertyKey]: any
}

type JSXElement = Element & AdditionalElementProps

type textSetter = (setter?: (v:any)=>void, element?: JSXElement)=> void;

type HTMLTagName = keyof HTMLElementTagNameMap
type SVGTagName = keyof SVGElementTagNameMap
type JSXChildren = ( JSXElement | string | textSetter | JSXChildren )[]

type VJSXHTMLAttrs<Element> = Partial<Element> | {
  class?: string
  children?: JSXChildren
  ref?: [object, string]
  style?: string
}
type VJSXSVGAttrs<Element> = {
  [key in keyof Element]?: string
} | {
  class?: string
  children?: JSXChildren
  ref?: [object, string]
  style?: string
}
declare namespace VJSX{
  namespace JSX {
    type Element = HTMLElement & AdditionalElementProps
    type IntrinsicElements = {
      [key in keyof HTMLElementTagNameMap]: VJSXHTMLAttrs<HTMLElementTagNameMap[key]>
    } & {
      [key in keyof SVGElementTagNameMap]: VJSXSVGAttrs<SVGElementTagNameMap[key]>
    }
  }
  function r<T extends HTMLTagName>(component: T, props: jsxProps, ...children: JSXChildren): HTMLElementTagNameMap[T] & AdditionalElementProps;
  function r<T extends SVGTagName>(component: T, props: jsxProps, ...children: JSXChildren): SVGElementTagNameMap[T] & AdditionalElementProps;
  function r<T extends (...args: any) => any>(component: T, props: jsxProps, ...children: JSXChildren): ReturnType<typeof component>;
  function r<T extends Function>(component: T, props: jsxProps, ...children: JSXChildren): T["prototype"];
}

/*
type setterPrefix = 'set-'

type S<E, key extends keyof E> = Record<`${setterPrefix}${key}`, (func: (v:E[key])=>void)=>void> 
type ElementWithSetterAttr<E> = E | Record<`${setterPrefix}${keyof E}`, (func: (v:any)=>void)=>void> 
interface useAttr{
  <PropName extends string, AttrType>(propName: PropName, defaultValue: AttrType): asserts this is AdditionalElementProps & Record<PropName, AttrType>
}
type HTMLTagName = keyof HTMLElementTagNameMap
type SVGTagName = keyof SVGElementTagNameMap
type JSXChildren = [Element|string|Function|[Element|string]]|[]
function render(component: HTMLTagName, props: jsxProps, ...children: JSXChildren): HTMLElementTagNameMap[HTMLTagName]
function render(component: SVGTagName, props: jsxProps, ...children: JSXChildren): SVGElementTagNameMap[SVGTagName]
function render(component: Function, props: jsxProps, ...children: JSXChildren): ReturnType<typeof Function>
*/