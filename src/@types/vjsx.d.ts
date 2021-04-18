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
  [key: string]: any
}
interface AdditionalElementProps {
	useAttr: (descriptor: defineAttrsOptions)=> void,
  on: typeof EventTarget.prototype.addEventListener,
	[key: string]: any
}

declare namespace VJSX{
  namespace JSX {
    //type Element<T extends HTMLTagName> = HTMLElementTagNameMap[T];
    type Element = HTMLElement & AdditionalElementProps
    //interface Element extends HTMLElement {}
    type IntrinsicElements = {
      [key in keyof HTMLElementTagNameMap]:  HTMLElementTagNameMap[key] | {class: string, children?: any}
    } & {
      [key in keyof SVGElementTagNameMap]: SVGElementTagNameMap[key] | {class: string, children?: any}
    }
  }
}

/*
type HTMLTagName = keyof HTMLElementTagNameMap
type SVGTagName = keyof SVGElementTagNameMap
type JSXChildren = [Element|string|Function|[Element|string]]|[]
function render(component: HTMLTagName, props: jsxProps, ...children: JSXChildren): HTMLElementTagNameMap[HTMLTagName]
function render(component: SVGTagName, props: jsxProps, ...children: JSXChildren): SVGElementTagNameMap[SVGTagName]
function render(component: Function, props: jsxProps, ...children: JSXChildren): ReturnType<typeof Function>
*/