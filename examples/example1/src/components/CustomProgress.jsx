import './CustomProgress.scss'
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
export { CustomProgress }