# SkyblueJSX

### Just a pure Javascript with JSX syntax.

[Running Demo](https://vanillajsx.github.io/)

#### ⚠️Caution⚠️
- This is still in Draft phase!
- specification may change without notice
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

---
### How the Coding Works
When you code this:
```jsx
const elem1 = <div id='elem1'>hi!</div>
```
This will work as:
```js
const elem1 = document.createElement('div')
elem1.id = 'elem1'
elem1.append('hi!')
```
---
## Installation
```sh
npm i @vanillajsx/vjsx
```
### for [vitejs](https://vitejs.dev/)
in your `vite.config.js`:
```js
export default {
  esbuild: {
    jsxFactory: 'Blue.r',
    jsxFragment: 'Blue.Fragment',
    jsxInject: `import Blue from 'bluejsx'`
  },
  //... other settings
}
```
in your `tsconfig.json`/`jsconfig.json`
```json5
{
  /*
  ... your settings ...
  You would need to state "jsx" option of your choice
  */
  "jsxFactory": "Blue.r",
  "jsxFragmentFactory": "Blue.Fragment"
}
```

Then your JSX code would be interpreted as VanillaJSX! Have fun!

---
## Usage

### see [documentation](https://github.com/vanillajsx/VanillaJSX/tree/master/doc)

## Roadmap

- [x] VanillaJSX processor
  - it dynamically appends components
- [ ] Vite.js HMR Plugin
- [ ] SSG builder
  - it generates 
    - pre-rendered HTML
    - JS files which initializes the components
  - [ViteJS SSG loader](https://vitejs.dev/guide/ssr.html#ssr-specific-plugin-logic)
