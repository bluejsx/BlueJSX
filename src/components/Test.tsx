import VJSX from '../vjsx'

const Test = (): HTMLDivElement =>{
  const self = <div></div>
  let v = 0
  self.useAttr({
    unko: {
      get(): number{return v},
      set(newV: number){
        console.log('new value: '+newV)
        v = newV
      }
    }
  })
  return self;

}
const t = <Test />
