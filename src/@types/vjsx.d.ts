//import VJSX from '../vjsx'

interface jsxProps {
  id?: string;
  class?: string;
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

type textSetter = (setter: (v:any)=>void, element: JSXElement)=> void;

type HTMLTagName = keyof HTMLElementTagNameMap
type SVGTagName = keyof SVGElementTagNameMap
type JSXChildren = [ JSXElement | string | textSetter | JSXChildren ] | []

declare namespace VJSX{
  namespace JSX {
    type Element = HTMLElement & AdditionalElementProps
    type IntrinsicElements = {
      [key in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[key] | {class: string, children?: JSXChildren}
    } & {
      [key in keyof SVGElementTagNameMap]: SVGElementTagNameMap[key] | {class: string, children?: JSXChildren}
    }
  }
}

/*
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