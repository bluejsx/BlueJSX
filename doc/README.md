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
- Blue sets attributes as [IDL attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#content_versus_idl_attributes). 
- This means Blue uses `elem['attrName']='value'` instead of `elem.setAttribute('attrName', 'value')`
  - This makes you able to set HTML properties such as `innerHTML` and `onclick`.
  - Exceptions:
    - SVG elements
    - `class` and `style` attribute
    - attributes that include dash `-`
    
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

### Ref Attribute

You can avoid breaking down DOM trees.
By using `ref` attribute, you can replace the following code:
```jsx
const btn = <button>click</button>
const progress = <progress max='10' value='0' />
const self = (
  <div>
    {btn}
    {progress}
  </div>
)
btn.onclick = () => progress.value++
```

with:
```jsx
const refs = {}
const self = (
  <div>
    <button ref={[refs, 'btn']}>click</button>
    <progress ref={[refs, 'progress']} max='10' value='0' />
  </div>
)
const { btn, progress } = refs
btn.onclick = () => progress.value++
```

Here is the usage:

First, make a new empty object:

```js
const refs = {}
```

Next, add `ref` attribute to your element, and set the following array:

```jsx
<button ref={[refs, 'btn']}>
```

After the Element declarations, add following code:

```js
const { btn } = ref
```

Great! You can now be able to use the button element with the `btn` variable. Don't forget, the value of `ref` attribute is:
```ts
[object, string]
//[<object for reference passing>, <name of the element you prefer to use>]
```

### Text setter

You can use [Text](https://developer.mozilla.org/en-US/docs/Web/API/Text) object (which is defined natively on browser) to change DOM texts dynamically. 

```jsx
const countText = new Text('0')
<div onclick={()=>countText.data++}>
  count: {countText}!!!
</div>
```

The element above counts up the number of clicking of the element.

Alternatively you can use JSX style `Text` node if you prefer using `ref` attribute:

```jsx
import { Txt } from 'bluejsx/components'

const ref = {}
<div ref={[ref, 'main']}>
  count: <Txt ref={[ref, 'countText']} data='0' />!!!
</div>

const { main, countText } = ref
main.onclick = () => countText.data++
```

### Dynamic Attributes
Blue provides `useAttr` function:
```ts
import { useAttr } from 'bluejsx'
useAttr(elem: AttrHolder, propName: string, defaultValue: any)
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
import { useAttr } from 'bluejsx'

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
  self.watch('progValue', v=> progress.value = v)

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

#### If you want to use Protected Attributes (States)

You can use `AttrHolder` object:

```jsx
import { useAttr, AttrHolder } from 'bluejsx'

const state = new AttrHolder()

useAttr(state, 'attr1', 0)
state.watch('attr1', v=> console.log(v))

state.attr1 = 50
```

This would be useful when you want to make private attributes, which can't be accesed outside of your function component.

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

### Tips

Since you load VanillaJSX in your javascript, `on` method, a shorthand of `addEventListener` is available on all the objects which provide `addEventListener` method (i.e. `EventTarget` objects).

This can be simply implemented by the code below:

```js
EventTarget.prototype.on = EventTarget.prototype.addEventListener
```

