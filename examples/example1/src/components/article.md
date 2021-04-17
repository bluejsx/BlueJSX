<div class='center'>

# Welcome to VanillaJSX!

### Just a pure Javascript with JSX syntax.

Code with pure Javascript, components, and JSX!
</div>


<div class='boxed' style='color: #a01232; font-size: larger;'>

### ⚠️Caution⚠️
- This is still in Draft phase!

</div>

---

### Features
- Component Based Development!
- JSX syntax!
- NO complex framework!
- NO virtual DOMs! Just use your familiar HTML DOMs!
- No Re-rendering by its framework, easier for developers to understand the behavior
- Less Learning Difficulty than React
- Just use your JS skills!
- If you want to change DOM attributes or texts, JUST SET THEM BY YOURSELF!
- TS support



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

---

## Usage
### Installation
```sh
npm i @vanillajsx/vjsx
```
### for [vitejs](https://vitejs.dev/)
in your `vite.config.js`:
```js
export default {
  esbuild: {
    jsxFactory: 'VJSX.r',
    jsxFragment: 'VJSX.Fragment',
    jsxInject: `import VJSX from '@vanillajsx/vjsx'`
  },
  //... other settings
}
```
Then your JSX code would be interpreted as VanillaJSX! Have fun!

---

### When you load VanillaJSX library,
- `on` method, a shorthand of `addEventListener` 
is available on all the objects which provide 'addEventListener'.
- `useAttr` method is defined on all HTML Elements
  - `useAttr` method sets custom attribute properties on your element.
  - This is a shorthand of [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
  - this makes you able to define [Setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)/[Getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) on your elements.

You can code using function component, or using [CustomElement](https://developer.mozilla.org/ja/docs/Web/Web_Components/Using_custom_elements)

#### Code Example

```jsx
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

### Result of the code above
<div id='example-result-space' class='boxed'></div>

- see how changing one value affects other multiple values using CustomEvents

---

## Roadmap

- [x] VanillaJSX processor
  - it dynamically appends components
- [ ] make Typescript code suggestion work
  - maybe making VSCode Extension might be a solution
- [ ] Vite.js HMR Plugin
- [ ] SSG builder
  - it generates 
    - pre-rendered HTML
    - JS files which initializes the components
  - [ViteJS SSG loader](https://vitejs.dev/guide/ssr.html#ssr-specific-plugin-logic)

