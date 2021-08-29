interface jsxProps {
    [key: string]: any;
}
declare type AdditionalElementProps = {
    on: typeof EventTarget.prototype.addEventListener;
    watch: (name: string, listener: (value: any) => void) => void;
    _vf: {
        [key: string]: Function[] & {
            value?: any;
        };
    };
} & {
    [key in PropertyKey]: any;
};
declare type JSXElement = Element & AdditionalElementProps;
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
    [key in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[key] & AdditionalElementProps;
} & {
    [key in keyof SVGElementTagNameMap]: SVGElementTagNameMap[key] & AdditionalElementProps;
};
declare type JSXElementTagNames = keyof JSXElementTags;
declare global {
    namespace Blue {
        namespace JSX {
            type Element = (HTMLElement | SVGElement) & AdditionalElementProps;
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
declare class AttrHolder {
    _vf: {
        [key: string]: Function[] & {
            value?: any;
        };
    };
    constructor();
    watch(name: string, listener: (value: any) => void): void;
}
/**
 *
 * @param target Your BlueJSX element or AttrHolder object.
 * @param propName Name of the property which you are defining.
 * @param defaultValue Set your default value.
 */
declare function useAttr<Obj extends AttrHolder, PropName extends string, AttrType>(target: Obj, propName: PropName, defaultValue: AttrType): asserts target is Obj & Record<PropName, AttrType>;

declare function render<T extends HTMLTagName>(component: T, props: jsxProps, ...children: JSXChildren): HTMLElementTagNameMap[T] & AdditionalElementProps;
declare function render<T extends SVGTagName>(component: T, props: jsxProps, ...children: JSXChildren): SVGElementTagNameMap[T] & AdditionalElementProps;
declare function render<T extends (...args: any) => any>(component: T, props: jsxProps, ...children: JSXChildren): ReturnType<typeof component>;
declare function render<T extends Function>(component: T, props: jsxProps, ...children: JSXChildren): T["prototype"];
declare const Blue: {
    r: typeof render;
    Fragment: ({ children }: {
        children: Element[];
    }) => Element[];
};

/** Type for specific BlueJSX elements.
 * Usage:
 * ```ts
 * const d = <div /> as ElemType<'div'>
 * ```
 * */
declare type ElemType<tagName extends JSXElementTagNames> = JSXElementTags[tagName];
/**
 * A type for reference object.
 *
 * usage:
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
    [key in keyof M]?: M[key] extends JSXElementTagNames ? ElemType<M[key]> : M[key] extends HTMLElement ? M[key] : M[key] extends ((...args: any) => any) ? ReturnType<M[key]> : Blue.JSX.Element;
};
/**
 * usage:
 * ```ts
 * const Component = (
 *  {attrA}: FuncCompParam<{attrA?: string}>
 * ) => <div />
 * ```
 */
declare type FuncCompParam<Param> = {
    children?: [Blue.JSX.Element];
} & Param;

export { AttrHolder, ElemType, FuncCompParam, RefType, Blue as default, useAttr };
