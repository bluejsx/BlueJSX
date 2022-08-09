interface jsxProps {
    [key: string]: any;
}
declare type JSXElement = Element & AttrHolder;
declare type childFunc = (element?: JSXElement) => void;
declare type JSXChild = (JSXElement | string | childFunc | JSXChildren);
declare type JSXChildren = JSXChild[];
declare type Modify<Original, Alter> = Omit<Original, keyof Alter> & Alter;
declare type BaseJSXAttrs = {
    /**
     * Element's class content attribute as
     * a set of whitespace-separated tokens.
     */
    class: string;
    /**
     * A list with two items:
     *
     * 1. `refs` object.
     * 2. name of variable for the element.
     *
     * Recommended to use `RefType` or `getRef`
     *  when creating `refs` object.
    */
    ref: [RefType<{}>, string];
    /**
     * CSS text
     */
    style: string;
    [key: string]: any;
};
declare type BlueHTMLAttrs<Element, AdditionalAttr> = Partial<Modify<Modify<Element, BaseJSXAttrs>, AdditionalAttr>>;
declare type BlueSVGAttrs<Element, AdditionalAttr> = BlueHTMLAttrs<{
    [key in keyof Element]: string;
}, AdditionalAttr>;
declare type JSXElementTags = {
    [key in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[key] & AttrHolder;
} & {
    [key in keyof SVGElementTagNameMap]: SVGElementTagNameMap[key] & AttrHolder;
};
declare type JSXElementTagName = keyof JSXElementTags;
/** Type for specific BlueJSX elements.
 * ## Usage:
 * ```ts
 * const d = <div /> as ElemType<'div'>
 * ```
 * */
declare type ElemType<TagName extends JSXElementTagName> = JSXElementTags[TagName];
declare type ResolveComponent<T> = T extends JSXElementTagName ? ElemType<T> : (T extends HTMLElement ? T : (T extends ((...args: any) => any) ? ReturnType<T> : Blue.JSX.Element));
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
declare type RefType<M extends {
    [name: string]: (JSXElementTagName | HTMLElement | Function | string);
}> = {
    [key in keyof M]?: ResolveComponent<M[key]>;
};
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
declare type FuncCompParam<Param extends {}> = (Param extends {
    children: Array<infer Child>;
} ? ({
    [key in keyof Param]: key extends 'children' ? ResolveComponent<Child>[] : Param[key];
}) : (Param & {
    children?: Blue.JSX.Element[];
})) & Partial<BaseJSXAttrs>;
declare global {
    namespace Blue {
        namespace JSX {
            interface AdditionalAttr {
            }
            type Element = (HTMLElement | SVGElement) & AttrHolder;
            type IntrinsicElements = {
                [key in keyof HTMLElementTagNameMap]: BlueHTMLAttrs<HTMLElementTagNameMap[key], AdditionalAttr>;
            } & {
                [key in keyof SVGElementTagNameMap]: BlueSVGAttrs<SVGElementTagNameMap[key], AdditionalAttr>;
            } & {
                [key: string]: BlueHTMLAttrs<Element, AdditionalAttr>;
            };
        }
    }
}

/**
 * value field symbol
 */
declare const vfSymbol: unique symbol;
/**
 * An object class which can be used with useAttr
 */
declare class AttrHolder<E = {}> {
    private [vfSymbol];
    constructor();
    watch<Key extends keyof E>(name: Key, listener: (value: E[Key]) => void): void;
}
/**
 * Defines a property to the target object.
 *
 * You will be able to listen to the changes to the defined property
 * by using:
 * ```ts
 * target.watch('propName', newValue=>{ ... })
 * ```
 *
 * @param target Your BlueJSX element or AttrHolder object.
 * @param propName Name of the property which you are defining.
 * @param defaultValue Set your default value.
 */
declare function useAttr<Obj extends AttrHolder, PropName extends string, AttrType, R extends Record<PropName, AttrType>>(target: Obj, propName: PropName, defaultValue: AttrType): asserts target is Obj & R & AttrHolder<R>;
/**
 * Defines properties to the target object.
 *
 * Usage:
 * ```ts
 * useAttrs(target, {
 *   attr1: 0
 *   attr2: 'hello'
 * })
 *
 * target.attr1 // 0
 * ```
 *
 * You will be able to listen to changes to the defined property
 * by using:
 * ```ts
 * target.watch('attr1', newValue=>{ ... })
 * ```
 *
 * @param target Your BlueJSX element or AttrHolder object.
 * @param attrs Attribute descriptor in the form of `{ attrName: defaultValue }`
 */
declare function useAttrs<Obj extends AttrHolder, Attrs extends {
    [Key in keyof Attrs]: Attrs[Key];
}>(target: Obj, attrs: Attrs): asserts target is Obj & Attrs & AttrHolder<Attrs>;
/**
 * Defines constant properties to the target object.
 *
 * Useful for defining methods to BlueJSX element
 *
 * Usage:
 * ```ts
 * useConstProps(self, {
 *  init(){
 *    console.log('hello!')
 *  }
 * })
 *
 * self.init()
 * ```
 */
declare function useConstProps<Obj extends AttrHolder, Props>(obj: Obj, props: Props): asserts obj is Obj & Props;
/**
 * A function that returns `RefType` object
 *
 * ```ts
 * // both A and B are equivalent.
 * // A
 * const refs: RefType<{
 *   d1: 'div'
 * }> = {}
 *
 * // B
 * const refs = getRef<{
 *   d1: 'div'
 * }>()
 * ```
 */
declare const getRefs: <M extends {
    [name: string]: string | Function | HTMLElement;
}>() => RefType<M>;

declare function render<T extends JSXElementTagName>(component: T, props: jsxProps, ...children: JSXChildren): ElemType<T>;
declare function render<T extends (...args: any) => any>(component: T, props: jsxProps, ...children: JSXChildren): ReturnType<typeof component>;
declare function render<T extends Function>(component: T, props: jsxProps, ...children: JSXChildren): T["prototype"];
declare const Blue$1: {
    r: typeof render;
    Fragment: ({ children }: {
        children: Element[];
    }) => Element[];
};

export { AttrHolder, ElemType, FuncCompParam, RefType, Blue$1 as default, getRefs, useAttr, useAttrs, useConstProps };
