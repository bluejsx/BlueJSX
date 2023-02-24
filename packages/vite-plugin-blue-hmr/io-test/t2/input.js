import { FuncCompParam, getRefs } from "bluejsx"
import CodeSpace from "../CodeSpace"
import * as monaco from 'monaco-editor'
import { codeOptions as CLASS_CODE_OPTIONS } from './index.module.scss'

export default ({ code }) => {
  const refs = getRefs()
  const self = /* @__PURE__ */ Blue.r(CodeSpace, null, /* @__PURE__ */ Blue.r("label", {
    for: "code-options"
  }, " Coding style: "), /* @__PURE__ */ Blue.r("select", {
    id: "code-options",
    class: CLASS_CODE_OPTIONS,
    ref: [refs, "codeSelector"]
  }, /* @__PURE__ */ Blue.r("option", {
    value: "0"
  }, "JSX"), /* @__PURE__ */ Blue.r("option", {
    value: "1"
  }, "JSX with ref attribute"), /* @__PURE__ */ Blue.r("option", {
    value: "2"
  }, "JSX with AttrHolder"), /* @__PURE__ */ Blue.r("option", {
    value: "3"
  }, "TSX"), /* @__PURE__ */ Blue.r("option", {
    value: "4"
  }, "TSX with ref attribute"), /* @__PURE__ */ Blue.r("option", {
    value: "5"
  }, "TSX with AttrHolder"), /* @__PURE__ */ Blue.r("option", {
    value: "6"
  }, "TSX + SVG Animation"), /* @__PURE__ */ Blue.r("option", {
    value: "7"
  }, "Playing Around")));
    /* <CodeSpace>
    <label for='code-options'> Coding style: </label>
    <select id='code-options' class={CLASS_CODE_OPTIONS} ref={[refs, 'codeSelector']}>
      <option value='0'>JSX</option>
      <option value='1'>JSX with ref attribute</option>
      <option value='2'>JSX with AttrHolder</option>
      <option value='3'>TSX</option>
      <option value='4'>TSX with ref attribute</option>
      <option value='5'>TSX with AttrHolder</option>
      <option value='6'>TSX + SVG Animation</option>
      <option value='7'>Playing Around</option>
    </select>
  </CodeSpace> as ReturnType<typeof CodeSpace> */
  const { codeSelector } = refs
  const JSXURI = monaco.Uri.parse('file:///main.jsx'), TSXURI = monaco.Uri.parse('file:///main.tsx'),
    JSXModel = monaco.editor.getModel(JSXURI) || monaco.editor.createModel(null, 'typescript', JSXURI),
    TSXModel = monaco.editor.getModel(TSXURI) || monaco.editor.createModel(null, 'typescript', TSXURI)
  const onscroll = () => {
    const { unko } = self
    const { top } = self.getBoundingClientRect()
    if (top < 500 && top > 0) {
      self.init().then(()=>applyCode(code, JSXModel))
      //self.scrollIntoView({ behavior: 'smooth' })
      document.scrollingElement.scrollTo({
        top: self.offsetTop - 100,
        left: 0,
        behavior: 'smooth'
      })
      document.removeEventListener('scroll', onscroll)
    }
  }
  document.addEventListener('scroll', onscroll)

  const applyCode = (code, model) => {
    self.editor.setModel(model)
    self.editor.setValue(code)
    self.runCode()
  }
  codeSelector.onchange = async () => {
    switch (codeSelector.value) {
      case '0':
        import('../../examples/JSXDefault?raw').then(({ default: code }) => applyCode(code, JSXModel))
        break;
      case '1':
        import('../../examples/JSXWithRef?raw').then(({ default: code }) => applyCode(code, JSXModel))
        break;
      case '2':
        import('../../examples/JSXAttrHolder?raw').then(({ default: code }) => applyCode(code, JSXModel))
        break;
      case '3':
        import('../../examples/TSXDeault?raw').then(({ default: code }) => applyCode(code, TSXModel))
        break;
      case '4':
        import('../../examples/TSXWithRef?raw').then(({ default: code }) => applyCode(code, TSXModel))
        break;
      case '5':
        import('../../examples/TSXAttrHolder?raw').then(({ default: code }) => applyCode(code, TSXModel))
        break;
      case '6':
        import('../../examples/TSX_SVG_Anim?raw').then(({ default: code }) => applyCode(code, TSXModel))
        break;
      case '7':
        import('../../examples/justPlayAround01?raw').then(({ default: code }) => applyCode(code, TSXModel))
        break;
      default:
        break;
    }
  }
  return self
}