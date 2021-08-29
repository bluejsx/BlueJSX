export interface jsxProps {
  [key: string]: any;
}

export type AdditionalElementProps = {
  on: typeof EventTarget.prototype.addEventListener;
  watch: (name: string, listener: (value: any) => void) => void;
  _vf: { [key: string]: Function[] & { value?: any; }; };
} & {
  [key in PropertyKey]: any;
}

type JSXElement = Element & AdditionalElementProps

type childFunc = (element?: JSXElement)=> void;

export type HTMLTagName = keyof HTMLElementTagNameMap
export type SVGTagName = keyof SVGElementTagNameMap
export type JSXChildren = ( JSXElement | string | childFunc | JSXChildren )[]

export type BlueHTMLAttrs<Element> = Partial<Element> | {
  class?: string
  children?: JSXChildren
  ref?: [object, string]
  style?: string
  [key: string]: any
}
export type BlueSVGAttrs<Element> = {
  [key in keyof Element]?: string
} | {
  class?: string
  children?: JSXChildren
  ref?: [object, string]
  style?: string
  [key: string]: any;
}

export type JSXElementTags = {
  [key in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[key] & AdditionalElementProps
} & {
  [key in keyof SVGElementTagNameMap]: SVGElementTagNameMap[key] & AdditionalElementProps
}
export type JSXElementTagNames = keyof JSXElementTags

declare global {
  namespace Blue{
    namespace JSX {
      type Element = (HTMLElement | SVGElement) & AdditionalElementProps
      type IntrinsicElements = {
        [key in keyof HTMLElementTagNameMap]: BlueHTMLAttrs<HTMLElementTagNameMap[key]>
      } & {
        [key in keyof SVGElementTagNameMap]: BlueSVGAttrs<SVGElementTagNameMap[key]>
      }
    }
  }
}