import Blue from ".";
import { AttrHolder } from ".";
export interface jsxProps {
  [key: string]: any;
}

type JSXElement = Element & AttrHolder

type childFunc = (element?: JSXElement) => void;

export type HTMLTagName = keyof HTMLElementTagNameMap
export type SVGTagName = keyof SVGElementTagNameMap

type JSXChild = (JSXElement | string | childFunc | JSXChildren)
export type JSXChildren = JSXChild[]

type Modify<Original, Alter> = Omit<Original, keyof Alter> & Alter;

export type BlueHTMLAttrs<Element, AdditionalAttr> = Partial<
  Modify<
    Modify<
      Element,
      {
        /**
         * Element's class content attribute as
         * a set of whitespace-separated tokens.
         */
        class: string
        /**
         * A list with two items:
         * 
         * 1. `refs` object.
         * 2. name of variable for the element.
         * 
         * Recommended to use `RefType` or `getRef`
         *  when creating `refs` object.
        */
        ref: [RefType<{}>, string]
        /**
         * CSS text
         */
        style: string
        children: JSXChildren | JSXChild
      }
    >,
    AdditionalAttr
  > & {
    [key: string]: any
  }
>

export type BlueSVGAttrs<Element, AdditionalAttr> = BlueHTMLAttrs<{
  [key in keyof Element]: string
}, AdditionalAttr>

export type JSXElementTags = {
  [key in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[key] & AttrHolder
} & {
    [key in keyof SVGElementTagNameMap]: SVGElementTagNameMap[key] & AttrHolder
  }
export type JSXElementTagName = keyof JSXElementTags

/** Type for specific BlueJSX elements. 
 * ## Usage: 
 * ```ts
 * const d = <div /> as ElemType<'div'> 
 * ```
 * */
export type ElemType<TagName extends JSXElementTagName> = JSXElementTags[TagName]

type ResolveComponent<T> = T extends JSXElementTagName ? ElemType<T> : (
  T extends HTMLElement ? T : (
    T extends ((...args: any) => any) ? ReturnType<T>
    : Blue.JSX.Element
  )
)
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
export type RefType<M extends { [name: string]: (JSXElementTagName | HTMLElement | Function | string) }> = {
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
export type FuncCompParam<Param extends {}> = Param extends { children?: Array<infer Child> }
  ? (
    {
      [key in keyof Param]: key extends 'children' ? ResolveComponent<Child>[] : Param[key]
    }
  )
  : (
    Param & {
      children?: Blue.JSX.Element[]
    }
  )


declare global {
  namespace Blue {
    namespace JSX {
      interface AdditionalAttr { }
      type Element = (HTMLElement | SVGElement) & AttrHolder
      type IntrinsicElements = {
        [key in keyof HTMLElementTagNameMap]: BlueHTMLAttrs<HTMLElementTagNameMap[key], AdditionalAttr>
      } & {
          [key in keyof SVGElementTagNameMap]: BlueSVGAttrs<SVGElementTagNameMap[key], AdditionalAttr>
        }
    }
  }
}