import type { JSXElementTagName, RefType } from './types'
type NameField<T> = ((value: T) => void)[] & { value?: T }
type ValueField<E> = { [Key in keyof E]: NameField<E[Key]> }

/**
 * value field symbol
 */
const vfSymbol = Symbol('BlueValueField')

const watch = <E, Key extends keyof E>(
  self: AttrHolder<E>,
  name: Key,
  listener: (value: E[Key]) => void
) => {
  const valueField = self[vfSymbol]
  const nameField = valueField[name]
  if (!nameField) {
    valueField[name] = [listener]
  } else {
    nameField.push(listener)
    if (nameField.value !== undefined) listener(nameField.value)
  }
}
/**
 * An object class which can be used with useAttr
 */
export class AttrHolder<E = {}> {
  private [vfSymbol] = {} as ValueField<E>
  constructor() { }
  watch<Key extends keyof E>(name: Key, listener: (value: E[Key]) => void) {
    watch(this, name, listener)
  }
}

Object.defineProperties(Element.prototype, {
  [vfSymbol]: {
    value: {}
  },
  watch: {
    value<E, Key extends keyof E>(
      this: Element & AttrHolder<E>,
      name: Key,
      listener: (value: E[Key]) => void
    ) {
      watch(this, name, listener)
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
  const nameField = (target[vfSymbol][propName] ??= []) as NameField<AttrType>
  nameField.value = defaultValue
  Object.defineProperty(target, propName, {
    get(): AttrType {
      return nameField.value
    },
    set(value: AttrType) {
      nameField.value = value
      for (let i = nameField.length; i--;) nameField[i](value)
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