import { FuncCompParam, useAttr, ElemType } from 'bluejsx'
import style from './index.module.css'
export const App = (
  { progValue = 0, children }: FuncCompParam<{
    progValue: number
  }>
) => {

  const progText = new Text()
  const self = (
    <div>
      <button ref='btn'>click</button>
      <progress ref='progress' max={100} value={progValue} />
      {progText}%
      {children}
    </div>
  )
  const { btn, progress } = self.refs<{
    btn: 'button',
    progress: 'progress'
  }>()
  /*
    below defines a property named 'progValue',
    and when 'progValue' changes, 
    all registered listeners will be executed.
  */
  useAttr(self, 'progValue', progValue)

  // when `self.progValue` changes, run the following listener
  self.watch('progValue', value => {
    progress.value = value
    progText.data = value.toString()
  })

  btn.onclick = () => {
    if (self.progValue < 100) self.progValue += 10
    else self.progValue = 0
  }


  // return self element
  return self
}