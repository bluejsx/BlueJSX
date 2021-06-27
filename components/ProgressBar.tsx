import { ElemType } from 'bluejsx'
import './ProgressBar.scss'
class ProgressBar extends HTMLElement{
  #max = 1
  #value = null
  #bar: ElemType<'div'>
  constructor(){
    super();
    this.#bar = <div part='bar'/> as ElemType<'div'>
    const shadow = this.attachShadow({mode: 'closed'})
    shadow.appendChild(this.#bar);
  }
  static get observedAttributes(){
    return ['max', 'value'];
  }
  connectedCallback(){
    this.render()
  }
  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch(name){
      case 'max':
        this.#max = +newValue
        this.render()
        break;
      case 'value':
        this.#value = Math.min(this.#max, +newValue)
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
    this.setAttribute('value',v.toString())
  }
  set max(max){
    this.setAttribute('max', max.toString())
  }
}
customElements.define('progress-bar', ProgressBar)
export default ProgressBar 