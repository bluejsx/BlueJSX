var __defProp=Object.defineProperty,__hasOwnProp=Object.prototype.hasOwnProperty,__getOwnPropSymbols=Object.getOwnPropertySymbols,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,t,n)=>t in e?__defProp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,__assign=(e,t)=>{for(var n in t||(t={}))__hasOwnProp.call(t,n)&&__defNormalProp(e,n,t[n]);if(__getOwnPropSymbols)for(var n of __getOwnPropSymbols(t))__propIsEnum.call(t,n)&&__defNormalProp(e,n,t[n]);return e};!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).vjsx={})}(this,(function(e){"use strict";const t=["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","animation","audio","circle","clipPath","color-profile","cursor","defs","desc","discard","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","handler","hkern","image","line","linearGradient","listener","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","prefetch","radialGradient","rect","set","solidColor","stop","svg","switch","symbol","tbreak","text","textArea","textPath","tref","tspan","unknown","use","view","vkern"],n=["class","style","for"],o=e=>0===e||!!e;Object.defineProperties(Element.prototype,{_vf:{value:{}},watch:{value:function(e,t){const n=this._vf[e];n?(n.push(t),o(n.value)&&t(n.value)):this._vf[e]=[t]}}}),Object.defineProperty(EventTarget.prototype,"on",{value:EventTarget.prototype.addEventListener});const r=(e,t)=>{if(t instanceof Function)t(e);else if(t instanceof Array)for(const n of t)r(e,n);else e.append(t)};const a={r:function(e,o,...a){null!=o||(o={});let f,l=!1;if("string"==typeof e)t.includes(e)?(f=document.createElementNS("http://www.w3.org/2000/svg",e),l=!0):f=document.createElement(e);else{if("function"!=typeof e)throw new Error("using invalid thing used as element tag.");if((null==e?void 0:e.prototype)instanceof Element)try{f=new e}catch(i){return console.error(i),null}else f=e(__assign(__assign({},o),{children:[...a]})),a.length=0}if(o)for(const t in o){const e=o[t];"ref"===t?e[0][e[1]]=f:l||n.includes(t)||t.includes("-")?f.setAttribute(t,e):f[t]=e}return r(f,a),f},Fragment:({children:e})=>e};e.AttrHolder=class{constructor(){this._vf={}}watch(e,t){const n=this._vf[e];n?(n.push(t),o(n.value)&&t(n.value)):this._vf[e]=[t]}},e.default=a,e.useAttr=function(e,t,n){var o;null!=(o=e._vf)[t]||(o[t]=[]);const r=e._vf[t];r.value=n,Object.defineProperty(e,t,{get:()=>r.value,set(e){r.value=e;for(let t=r.length;t--;)r[t](e)}}),e[t]=n},Object.defineProperty(e,"__esModule",{value:!0}),e[Symbol.toStringTag]="Module"}));
