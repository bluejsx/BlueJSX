import type { JSXElementTagName, RefType } from './types.ts'
type NameField<T> = ((value: T) => void)[] & { value?: T }
type ValueField<E> = { [Key in keyof E]: NameField<E[Key]> }

/**
 * value field symbol
 */
const vfSymbol = Symbol()

/**
 * child refs symbol
 */
export const childRefsSymbol = Symbol()

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
    get(): AttrType | undefined {
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
export function useAttrs<
  Obj extends AttrHolder,
  Attrs extends { [Key in keyof Attrs]: Attrs[Key] }
>(
  target: Obj,
  attrs: Attrs
): asserts target is Obj & Attrs & AttrHolder<Attrs> {
  const vf = target[vfSymbol] as ValueField<Attrs>
  for (const propName in attrs) {
    const defaultValue = attrs[propName]
    const nameField = (vf[propName] ??= [])
    nameField.value = defaultValue
    Object.defineProperty(target, propName, {
      get() {
        return nameField.value
      },
      set(value) {
        nameField.value = value
        for (let i = nameField.length; i--;) nameField[i](value)
      }
    });
    // @ts-ignore
    target[propName] = defaultValue
  }
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
