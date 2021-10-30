

<div align='center'>

![logo](https://bluejsx.github.io/vjsx.png)
#  Welcome to BlueJSX!

### Just a pure Javascript with JSX syntax.

Code with pure Javascript, components, and JSX!
</div>

---

### Features
- Component Based Development
- JSX syntax
- NO complex framework
- NO virtual DOMs! Just use your familiar HTML DOMs!
- No Re-rendering by its framework, easier for developers to understand the behavior
- Less Learning Difficulty than React
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
elem1.id = 'elem1'
elem1.append('hi!')
```



## Installation

If you prefer JS over TS, replace `bluejsx/templates/vite-ts` with `bluejsx/templates/vite-js`:
```sh
npx degit bluejsx/templates/vite-ts my-blue-app
cd my-blue-app
npm i
```
Congrats! Your environment is ready!


To start dev server, run:

```sh
npm run dev
```

To build you project, run:

```sh
npm run build
```

### Enabling BlueJSX manually in your vite project
If you want to move your pre-existing vite project into the BlueJSX project, please follow the instruction below:

```
npm i -D bluejsx vite-with-bluejsx
```

In your `vite.config.js`:

```js
import withBlueJSX from 'vite-with-bluejsx'
export default withBlueJSX({
  // your vite settings
})
```



## Document

### Please see the [document](https://bluejsx.github.io/docs/)


## Roadmap

- [x] BlueJSX processor
  - it dynamically appends components
- [x] Vite.js HMR Plugin
  - HMR updates the DOM without reloading the whole page during dev
  - Experimental
- [ ] SSG builder
  - it generates 
    - pre-rendered HTML
    - JS files which initializes the components
  - [ViteJS SSG loader](https://vitejs.dev/guide/ssr.html#ssr-specific-plugin-logic)
