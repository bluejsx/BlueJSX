import Blue from ".";

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

type childFunc = (element?: JSXElement) => void;

export type HTMLTagName = keyof HTMLElementTagNameMap
export type SVGTagName = keyof SVGElementTagNameMap
export type JSXChildren = (JSXElement | string | childFunc | JSXChildren)[]

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

/** Type for specific BlueJSX elements. 
 * ## Usage: 
 * ```ts
 * const d = <div /> as ElemType<'div'> 
 * ```
 * */
export type ElemType<tagName extends JSXElementTagNames> = JSXElementTags[tagName]

type ResolveComponent<T> = T extends JSXElementTagNames ? ElemType<T> : T extends HTMLElement ? T : T extends ((...args: any) => any) ? ReturnType<T> : Blue.JSX.Element
/**
 * A type for reference object.
 * 
 * ## Usage:
 * ```ts
 * const refs: RefType<{
 *  elem1: 'button'  //element tag name
 *  elem2: typeof FuncComponent  //function component
 *  elem3: ClassComponent //Custom Element (extends HTMLElement)
 * }> = {}
 * ```
 */
export type RefType<M extends { [name: string]: (JSXElementTagNames | HTMLElement | Function | string) }> = {
  [key in keyof M]?: ResolveComponent<M[key]>
}

/**
 * ## Usage:
 * ```ts
 * const Component = ({ attrA, children }: FuncCompParam<{
 *   attrA?: string
 * }>) => <div />
 * ```
 * ---
 * For children parameter, you can use abbreviation type, just like in `RefType`:
 * ```ts
 * const A = ({ children }: FuncCompParam<{
 *   children?: typeof Component[]
 * }>) => <div />
 * 
 * const B = ({ children }: FuncCompParam<{
 *   children?: 'div'[]
 * }>) => <div />
 * ```
 */
export type FuncCompParam<Param extends {}> = Param extends { children: any[] } ? ({
  [key in keyof Param]: key extends 'children' ? ResolveComponent<Param['children'][0]>[] : Param[key]
}) : ({
  children?: Blue.JSX.Element[]
}) & Param


declare global {
  namespace Blue {
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