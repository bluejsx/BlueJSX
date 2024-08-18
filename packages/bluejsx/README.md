

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

#### Experimental HMR
![b1](https://github.com/user-attachments/assets/e979189e-6422-4a0a-9f57-a1a4b1fc2933)
[How it's implemented](https://github.com/bluejsx/BlueJSX/discussions/5#discussion-3631908)


## Installation

> You can find more variety of templates. See [here](https://bluejsx.github.io/docs/templates.html) for more info.

```sh
# in your project folder, run:
npx degit bluejsx/templates/vite-ts # initialize your TS project
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
