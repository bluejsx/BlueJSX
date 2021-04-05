import './style.css'
import VJSX from '../../../src/vjsx'
import { Example } from './components/Example'

/*
When you load VanillaJSX library,
- 'on' method, a shorthand of 'addEventListener', 
is available on all the objects which provides 'addEventListener'.
- 'useAttr' method is defined on all HTML Elements
  - 'useAttr' method sets custom attribute properties on your element.
	- this is a shorthand of Object.defineProperties
	  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
	- this makes you able to define Setter/Getters on your elements.

*/

document.querySelector('#app').appendChild(<div>
	<Example /> <br />
</div>)