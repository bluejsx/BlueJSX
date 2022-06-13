import type { JSXElementTagName, RefType } from './types'
type ValueField<E> = { [Key in keyof E]: Function[] & { value?: E[Key] } }
/**
 * An object class which can be used with useAttr
 */
export class AttrHolder<E = {}> {
  private _vf: ValueField<E>
  constructor() {
    this._vf = {} as ValueField<E>
  }
  watch<Key extends keyof E>(name: Key, listener: (value: E[Key]) => void): void {
    const valueField = this._vf[name]
    if (!valueField) {
      this._vf[name] = [listener]
    } else {
      valueField.push(listener)
      if (valueField.value !== undefined) listener(valueField.value)
    }
  }
}

Object.defineProperties(Element.prototype, {
  _vf: {
    value: {} as { [key: string]: Function[] & { value?: any } }
  },
  watch: {
    value: function (name: string, listener: (value: any) => void) {
      const valueField = this._vf[name]
      if (!valueField) {
        this._vf[name] = [listener]
      } else {
        valueField.push(listener)
        if (valueField.value !== undefined) listener(valueField.value)
      }
    }
  }
})

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
export function useAttr<
  Obj extends AttrHolder,
  PropName extends string,
  AttrType,
  R extends Record<PropName, AttrType>
>(
  target: Obj,
  propName: PropName,
  defaultValue: AttrType
): asserts target is Obj & R & AttrHolder<R> {
  // @ts-ignore
  target._vf[propName] ??= []
  // @ts-ignore
  const vf = target._vf[propName]
  vf.value = defaultValue
  Object.defineProperty(target, propName, {
    get(): AttrType {
      return vf.value
    },
    set(value: AttrType) {
      vf.value = value
      for (let i = vf.length; i--;) vf[i](value)
    }
  });
  // @ts-ignore
  target[propName] = defaultValue
}

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
export function useConstProps<
  Obj extends AttrHolder,
  Props
>(
  obj: Obj,
  props: Props
): asserts obj is Obj & Props {
  const descriptor: PropertyDescriptorMap = {}
  for (const key in props) {
    descriptor[key] = { value: props[key] }
  }
  Object.defineProperties(obj, descriptor)
}

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
export const getRefs = <M extends {
  [name: string]: (JSXElementTagName | HTMLElement | Function | string)
}>(): RefType<M> => ({})