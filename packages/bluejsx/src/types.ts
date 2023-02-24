import Blue from "./index.ts";
import { AttrHolder } from "./index.ts";
import { childRefsSymbol } from "./bjsxlib.ts";


export type JSXProps = {
  children?: JSXChildren
} & {
  [key: string]: any;
}

type JSXElement = Element & AttrHolder & RefsHolder<object>

type ChildFunc = (element?: JSXElement) => void;

export type HTMLTagName = keyof HTMLElementTagNameMap
export type SVGTagName = keyof SVGElementTagNameMap

type JSXChild = (JSXElement | string | ChildFunc | JSXChildren)
export type JSXChildren = JSXChild[]

type Modify<Original, Alter> = Omit<Original, keyof Alter> & Alter;

type BaseJSXAttrs = {
  /**
   * Element's class content attribute as
   * a set of whitespace-separated tokens.
   */
  class: string
  /**
   * Variable name of the element to be used.
   *
   * Example:
   * 
   * ```tsx
   * const self = <div>
   *  <progress ref="p1" />
   *  <FuncComponent ref="comp1" />
   *  <ClassComponent ref="comp2" />
   * </div>
   * 
   * const { p1, comp1, comp2 } = self.refs()
   * ```
   */
  ref: string
  /**
   * CSS text
   */
  style: string
  [key: string]: any
}
export type BlueHTMLAttrs<Element, AdditionalAttr> = Partial<
  Modify<
    Modify<Element, BaseJSXAttrs>,
    AdditionalAttr
  >
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

export interface RefsHolder<Refs> {
  [childRefsSymbol]: Refs,
  /**
   * Example:
   * 
   * ```tsx
   * const self = <div>
   *  <progress ref="p1" />
   *  <FuncComponent ref="comp1" />
   *  <ClassComponent ref="comp2" />
   * </div>
   * 
   * const { p1, comp1, comp2 } = self.refs<{
   *  p1: 'progress'  //element tag name
   *  comp1: typeof FuncComponent  //function component
   *  comp2: ClassComponent //Custom Element (extends HTMLElement)
   * }>()
   * ```
   */
  refs<M extends {
    [name: string]: (JSXElementTagName | HTMLElement | Function | string)
  }>(): RefType<M>
}

export type RefsHolderParent<Refs, Remainder extends (object|string)[]> = 
  Remainder extends [RefsHolder<infer R>]
    ? RefsHolder<Refs & R>
    : Remainder extends [RefsHolder<infer R>, ...(infer Rest)]
    // @ts-ignore: This is a bug in TypeScript
      ? RefsHolderParent<Refs & R, Rest>
      : Remainder extends [infer _, ...(infer Rest)]
	// @ts-ignore: This is a bug in TypeScript
	? RefsHolderParent<Refs, Rest>
	:RefsHolder<Refs>


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
  [key in keyof M]: ResolveComponent<M[key]>
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
export type FuncCompParam<Param extends {}> = (
  Param extends {
    children: Array<infer Child>
  } ? ({
    [key in keyof Param]: key extends 'children' ? ResolveComponent<Child>[] : Param[key]
  }) : (Param & {
    children?: Blue.JSX.Element[]
  })
) & Partial<BaseJSXAttrs>

declare global {
  namespace Blue {
    namespace JSX {
      interface AdditionalAttr { }
      type Element = (HTMLElement | SVGElement) & AttrHolder & RefsHolder<object>
      type IntrinsicElements = {
        [key in keyof HTMLElementTagNameMap]: BlueHTMLAttrs<HTMLElementTagNameMap[key], AdditionalAttr>
      } & {
        [key in keyof SVGElementTagNameMap]: BlueSVGAttrs<SVGElementTagNameMap[key], AdditionalAttr>
      } & {
        [key: string]: BlueHTMLAttrs<Element, AdditionalAttr>
      }
    }
  }
}
