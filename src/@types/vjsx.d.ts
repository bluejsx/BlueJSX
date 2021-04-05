type eventOn = (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions)=> void
interface jsxProps {
  id?: string;
  class?: string;
  [key: string]: any;
} 
/*interface defineAttrOptions {
  set:(v)=>void,
  get:()=>any
}*/
interface defineAttrsOptions {
  [key: string]: PropertyDescriptor
}
interface ElementWithCustomProps extends Element{
  [key: string]: any
}