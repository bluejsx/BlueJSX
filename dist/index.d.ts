interface jsxProps {
    [key: string]: any;
}
declare type AdditionalElementProps<E> = AttrHolder<E> & {
    on: typeof EventTarget.prototype.addEventListener;
} & {
    [key in PropertyKey]: any;
};
declare type JSXElement = Element & AdditionalElementProps<{}>;
declare type childFunc = (element?: JSXElement) => void;
declare type HTMLTagName = keyof HTMLElementTagNameMap;
declare type SVGTagName = keyof SVGElementTagNameMap;
declare type JSXChildren = (JSXElement | string | childFunc | JSXChildren)[];
declare type BlueHTMLAttrs<Element> = Partial<Element> | {
    class?: string;
    children?: JSXChildren;
    ref?: [object, string];
    style?: string;
    [key: string]: any;
};
declare type BlueSVGAttrs<Element> = {
    [key in keyof Element]?: string;
} | {
    class?: string;
    children?: JSXChildren;
    ref?: [object, string];
    style?: string;
    [key: string]: any;
};
declare type JSXElementTags = {
    [key in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[key] & AdditionalElementProps<{}>;
} & {
    [key in keyof SVGElementTagNameMap]: SVGElementTagNameMap[key] & AdditionalElementProps<{}>;
};
declare type JSXElementTagNames = keyof JSXElementTags;
/** Type for specific BlueJSX elements.
 * ## Usage:
 * ```ts
 * const d = <div /> as ElemType<'div'>
 * ```
 * */
declare type ElemType<tagName extends JSXElementTagNames> = JSXElementTags[tagName];
declare type ResolveComponent<T> = T extends JSXElementTagNames ? ElemType<T> : T extends HTMLElement ? T : T extends ((...args: any) => any) ? ReturnType<T> : Blue.JSX.Element;
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
    [name: string]: (JSXElementTagNames | HTMLElement | Function | string);
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
declare type FuncCompParam<Param extends {}> = Param extends {
    children: any[];
} ? ({
    [key in keyof Param]: key extends 'children' ? ResolveComponent<Param['children'][0]>[] : Param[key];
}) : ({
    children?: Blue.JSX.Element[];
}) & Param;
declare global {
    namespace Blue {
        namespace JSX {
            type Element = (HTMLElement | SVGElement) & AdditionalElementProps<{}>;
            type IntrinsicElements = {
                [key in keyof HTMLElementTagNameMap]: BlueHTMLAttrs<HTMLElementTagNameMap[key]>;
            } & {
                [key in keyof SVGElementTagNameMap]: BlueSVGAttrs<SVGElementTagNameMap[key]>;
            };
        }
    }
}

/**
 * An object class which can be used with useAttr
 */
declare class AttrHolder<E> {
    private _vf;
    constructor();
    watch<Key extends keyof E>(name: Key, listener: (value: E[Key]) => void): void;
}
/**
 *
 * @param target Your BlueJSX element or AttrHolder object.
 * @param propName Name of the property which you are defining.
 * @param defaultValue Set your default value.
 */
declare function useAttr<E, Obj extends AttrHolder<E>, PropName extends string, AttrType>(target: Obj, propName: PropName, defaultValue: AttrType): asserts target is Obj & Record<PropName, AttrType> & AttrHolder<E & Record<PropName, AttrType>>;

declare function render<T extends HTMLTagName>(component: T, props: jsxProps, ...children: JSXChildren): HTMLElementTagNameMap[T] & AdditionalElementProps<{}>;
declare function render<T extends SVGTagName>(component: T, props: jsxProps, ...children: JSXChildren): SVGElementTagNameMap[T] & AdditionalElementProps<{}>;
declare function render<T extends (...args: any) => any>(component: T, props: jsxProps, ...children: JSXChildren): ReturnType<typeof component>;
declare function render<T extends Function>(component: T, props: jsxProps, ...children: JSXChildren): T["prototype"];
declare const Blue$1: {
    r: typeof render;
    Fragment: ({ children }: {
        children: Element[];
    }) => Element[];
};

export { AttrHolder, ElemType, FuncCompParam, RefType, Blue$1 as default, useAttr };
