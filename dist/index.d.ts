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
declare type VJSXHTMLAttrs<Element> = Partial<Element> | {
    class?: string;
    children?: JSXChildren;
    ref?: [object, string];
    style?: string;
    [key: string]: any;
};
declare type VJSXSVGAttrs<Element> = {
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
declare global {
    namespace VJSX {
        namespace JSX {
            type Element = (HTMLElement | SVGElement) & AdditionalElementProps;
            type IntrinsicElements = {
                [key in keyof HTMLElementTagNameMap]: VJSXHTMLAttrs<HTMLElementTagNameMap[key]>;
            } & {
                [key in keyof SVGElementTagNameMap]: VJSXSVGAttrs<SVGElementTagNameMap[key]>;
            };
        }
    }
}

declare class AttrHolder {
    _vf: {
        [key: string]: Function[] & {
            value?: any;
        };
    };
    constructor();
    watch(name: string, listener: (value: any) => void): void;
}
declare function useAttr<Obj extends AttrHolder, PropName extends string, AttrType>(target: Obj, propName: PropName, defaultValue: AttrType): asserts target is Obj & Record<PropName, AttrType>;

declare function render<T extends HTMLTagName>(component: T, props: jsxProps, ...children: JSXChildren): HTMLElementTagNameMap[T] & AdditionalElementProps;
declare function render<T extends SVGTagName>(component: T, props: jsxProps, ...children: JSXChildren): SVGElementTagNameMap[T] & AdditionalElementProps;
declare function render<T extends (...args: any) => any>(component: T, props: jsxProps, ...children: JSXChildren): ReturnType<typeof component>;
declare function render<T extends Function>(component: T, props: jsxProps, ...children: JSXChildren): T["prototype"];
declare const VJSX: {
    r: typeof render;
    Fragment: ({ children }: {
        children: Element[];
    }) => Element[];
};

declare type ElemType<tagName extends keyof JSXElementTags> = JSXElementTags[tagName];

export default VJSX;
export { AttrHolder, ElemType, useAttr };
