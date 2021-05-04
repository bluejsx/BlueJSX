# Documentation

## Basic

The usage of VanillaJSX is simple!

### native HTML elements

```jsx
const elem1 = <div id='elem1'>hi!</div>
```
↑This will work as:
```js
const elem1 = document.createElement('div')
elem1.id = 'elem1'
elem1.append('hi!')
```
FYI
- VJSX sets attributes as [IDL attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#content_versus_idl_attributes). 
- This means VJSX uses `elem['attrName']='value'` instead of `elem.setAttribute('attrName', 'value')`
  - (except for `class` attribute and SVG elements)
  - This makes you able to set HTML properties such as `innerHTML` and `onclick`.

### Function components

You can make components with functions.

- Your function components:
  - can take attributes as function parameters
    - children elements via `children` parameter
  - need to return Element.
  - runs only once.

```jsx
const App = ({ name, children }) =>{
  const self = <div>
    Hello, {name}!
    <hr>
    {children}
  </div>
  return self
}

document.querySelector('#app').appendChild(
  <App name='VanillaJSX'>
    <div>This is child element</div>
  </App>)
```

#### Dynamic Attributes
VJSX provides `useAttr` function:
```ts
import { useAttr } from '@vanillajsx/vjsx'
useAttr(elem: Element, propName: string, defaultValue: any)
```
- This defines custom property setter/getter on your element.
- You are able to listen the value change using `watch` listener:
    ```ts
    elem.watch(propName: string, (newValue) => void)
    ```
    - `watch` listener is similar to `addEventListener` 
    - The difference is that the listener function in `watch` recieves the new property value, not `Event` object.

Example:

```jsx
import { useAttr } from '@vanillajsx/vjsx'

const Example = ({progValue=0, children})=>{
  const progress = <progress max='100' value={progValue}/>
  const btn = <button>click</button>
  const self = (
    <div class='t3'>
      {btn}
      {progress}
      {children}
    </div>
  )
  useAttr(self, 'progValue', progValue)
  self.watch('progValue',v=> progress.value = v)

  btn.onclick = () =>{
    /*
      below just looks assigning a value to a property,
      however this is running getter/setter method,
      which executes all listener functions registered via `watch` method.
    */
    if(self.progValue<100) self.progValue+=10
    else self.progValue = 0
  }
  return self	
}
```
### Text setter

If you insert function into JSX element as a child, You will get a value-setter function of the text field. For example:
```jsx
let count = 0
<div>
  count: {(set, element)=>element.onclick=()=>set(count++)}!!!
</div>
```
This element counts up the number of clicking of the element.

## Custom Element components

This is VanillaJS way to implement custom HTML elements.
For details see [CustomElement Documentation](https://developer.mozilla.org/ja/docs/Web/Web_Components/Using_custom_elements)

Example:

```jsx
class CustomProgress extends HTMLElement{
  #max = 1
  #value = null
  #bar
  constructor(...args){
    super(...args);
    this.#bar = <div part='bar'/>
    const shadow = this.attachShadow({mode: 'closed'})
    shadow.appendChild(this.#bar);
  }
  static get observedAttributes(){
    return ['max', 'value'];
  }
  connectedCallback(){
    this.render()
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch(name){
      case 'max':
        this.#max = +newValue
        this.render()
        break;
      case 'value':
        this.#value = Math.min(this.#max, newValue)
        this.render()
        break;
      default:
        break;
    }
  }
  render(){
    if(this.#value){
      this.classList.remove('indeterminate')
      if(this.#value === this.#max) this.classList.add('complete')
      const r = this.#value / this.#max * 100
      this.#bar.style.width = r+'%';
    }else{
      this.#bar.style.width=''
      this.classList.remove('complete')
      this.classList.add('indeterminate')
    }
  }
  get value(){
    return this.#value
  }
  get max(){
    return this.#max
  }
  set value(v){
    this.setAttribute('value',v)
  }
  set max(max){
    this.setAttribute('max',max)
  }
}
customElements.define('custom-progress',CustomProgress)
export default CustomProgress
```
In this case, you can use either
```jsx
<custom-progress />
```
or 
```jsx
<CustomProgress />
```
