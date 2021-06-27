
const valueExists = (value: any): boolean =>{
  if(value===0) return true
  return !!value
}
/**
 * An object class which can be used with useAttr
 */
export class AttrHolder {
  _vf: { [key: string]: Function[] & {value?: any} }
  constructor(){
    this._vf = {}
  }
  watch(name: string, listener: (value: any)=>void): void {
    const valueField = this._vf[name]
    if(!valueField){
      this._vf[name] = [listener]
    }else{
      valueField.push(listener)
      if(valueExists(valueField.value)) listener(valueField.value)
    }
  }
}

Object.defineProperties(Element.prototype, {
  _vf: {
    value: {} as { [key: string]: Function[] & {value?: any} }
  },
  watch: {
    value: function(name: string, listener: (value: any)=>void){
      const valueField = this._vf[name]
      if(!valueField){
        this._vf[name] = [listener]
      }else{
        valueField.push(listener)
        if(valueExists(valueField.value)) listener(valueField.value)
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
export function useAttr<Obj extends AttrHolder, PropName extends string, AttrType>(target: Obj, propName: PropName, defaultValue: AttrType): asserts target is Obj & Record<PropName, AttrType>
{
  target._vf[propName] ??= []
  const vf = target._vf[propName]
  vf.value = defaultValue
  Object.defineProperty(target, propName, {
    get(): AttrType{
      return vf.value
    },
    set(value: AttrType){
      vf.value = value
      for(let i=vf.length;i--;) vf[i](value)
    }
  });
  (target as any)[propName] = defaultValue
}