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
 * 
 * @param target Your BlueJSX element or AttrHolder object.
 * @param propName Name of the property which you are defining.
 * @param defaultValue Set your default value.
 */
export function useAttr<
  E,
  Obj extends AttrHolder<E>,
  PropName extends string,
  AttrType
>(
  target: Obj,
  propName: PropName,
  defaultValue: AttrType
): asserts target is Obj & Record<PropName, AttrType> & AttrHolder<E & Record<PropName, AttrType>> {
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