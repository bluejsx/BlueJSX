import VJSX from '../vjsx'
type eventOn = (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions)=> void
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
	useAttr: (descriptor: defineAttrsOptions)=> void
	[key: string]: any
}

declare namespace JSX {
  //type Element = ReturnType<typeof VJSX.r>;
  type Element = HTMLElement | SVGElement
  //interface Element extends HTMLElement {}
  type IntrinsicElements = HTMLElementTagNameMap & SVGElementTagNameMap
}

/*
type HTMLTagName = keyof HTMLElementTagNameMap
type SVGTagName = keyof SVGElementTagNameMap
type JSXChildren = [Element|string|Function|[Element|string]]|[]
function render(component: HTMLTagName, props: jsxProps, ...children: JSXChildren): HTMLElementTagNameMap[HTMLTagName]
function render(component: SVGTagName, props: jsxProps, ...children: JSXChildren): SVGElementTagNameMap[SVGTagName]
function render(component: Function, props: jsxProps, ...children: JSXChildren): ReturnType<typeof Function>
*/