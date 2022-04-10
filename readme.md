![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# type-script web component

This is a web Component that lets you run typescript on the browser. Just like a script tag, you
link your typescript file and it will run on the browser. Using the official typescript transpiler - It does all the transpilation behind the scenes and also minifies the injected javascript if you set the minification option to true.

```html
<type-script src="app.ts" minify="true"></type-script>
```

### Add the following script tag in the head of your .html page. The type should be module

```html
<script type="module" src="https://unpkg.com/type-script-webcomponent@0.0.5/dist/type-script-component/type-script-component.esm.js"></script>
```

### Then in your html

```html
<type-script src="app.ts" minify="true"></type-script>
```

### Using this component

- You can only use one script tag per html page. If you have multiple typescript files, separate them with a comma as shown below.

```html
<type-script src="app1.ts, app2.ts, app3.ts"></type-script>
```

- Order Matters! The code will excute frome left to right. So if app2.ts depends on app1.ts you need
  to put app1.ts first.

### Minification

- The code is not minified by default and the target is es6. If you choose to minify by setting minify to true, the code will first be tranpiled to es5 then get minified (the minification tool only understands es5. For now.)
- You can open devtools and open type-script tag to see the injected javascript.

### The Transpiler

- The component uses the official typescript transpiler. Since the transpiler is large, we only download it once from a cdn. We then
  store it as an array-buffer in indexed-db. That means you dont need an internet connection to run typescript after the first download.

### Limitations

- The type-script tag cannot be a module.
- If you include a normal script tag it will be executed before the type-script tag as the typescript tag is asynchrounous relative to the page. The ts code that runs left to right is synchronous though relative to each other.

### The Script tag

- Put a script tag similar to this `<script type='module' src='https://unpkg.com/type-script-webcomponent@0.0.5/dist/type-script-component/type-script-component.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules

- Run `npm install type-script-webcomponent --save`
- Put a script tag similar to this `<script type='module' src='node_modules/type-script-webcomponent/dist/type-script-component/type-script-component.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Demo

- Look at the [DEMO](https://github.com/Niklus/typescript-demo.git) for more information.
