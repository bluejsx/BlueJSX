# VanillaJSX

### Just a pure Javascript with JSX syntax.
####⚠️Caution
- This is still in Draft phase!
### Features
- Component based!
- JSX syntax!
- NO complex framework!
- NO virtual DOMs!
- No Re-rendering by its framework, easier for developers to understand the behavior
- Less Learning Difficulty than React
- Just use your JS skills!
- If you want to change DOM attributes, JUST SET VALUE BY YOURSELF
- TS support

---
### How the Coding Works
When you code this:
```jsx
const elem1 = <div id='elem1'>hi!</div>
```
This will work as:
```js
const elem1 = document.createElement('div')
elem1.append('hi!')
elem1.id = 'elem1'
```

When you load VanillaJSX library,
- `on` method, a shorthand of `addEventListener` 
is available on all the objects which provide 'addEventListener'.
- `useAttr` method is defined on all HTML Elements
  - `useAttr` method sets custom attribute properties on your element.
  - This is a shorthand of [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
  - this makes you able to define [Setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)/[Getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) on your elements.

You can code using function component, or using CustomElement

#### Code Example
```jsx
import VJSX from '../../vjsxlib/vjsx'
import { CustomProgress } from './CustomProgress'

//takes in attributes as arguments (access to children elements via 'children' attribute)
const Example = ({pr1=0, children})=>{

  //declare elements
  const progress = <CustomProgress min='0' max='100' value={pr1}/>
  const btn = <button>click</button>
  const self = (
    <div class='t3'>
      {btn}
      {progress} 
      {(set, elem)=>{
        elem.on('pr1change',e=>set(e.detail.value))
        set(pr1)
      }} %
      {children}
    </div>
  )
  //------
  
  //define setters and getters
  
  /*
  below is shorthand of
  Object.defineProperties(self, {...})
  */
  self.useAttr({
    pr1: {
      get(){
        return pr1
      },
      set(v){
        pr1 = v
        self.dispatchEvent(
          new CustomEvent("pr1change", { 
            detail: {
              value: v
            }
          })
        )
      }
    }
  })
  //-------
  
  // functionalities
  self.on('pr1change',e=> progress.value = e.detail.value)
  btn.onclick = () =>{
    /*
      below just looks assigning a value to a property,
      however this is running getter/setter method.
      So when you change 'self.pr1' value, 
      'pr1change' event is dispatched to 'self' element.
    */
    if(self.pr1<100) self.pr1+=10
    else self.pr1 = 0
  }
  //-------
  
  // return self element
  return self	
}
```
## Roadmap

- [x] dynamic JSX processor
- [ ] SSG builder