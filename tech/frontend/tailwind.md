# Tailwind

- Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. 
- It is different from other CSS frameworks like Bootstrap or Foundation in that it doesn't provide pre-designed UI components. Instead, it provides low-level utility classes that you can use to build completely custom designs without writing CSS from scratch.


## Use tailwind

1. install

``` bash
yarn add -D tailwindcss postcss autoprefixer
```

2. init tailwind

``` bash
npx tailwindcss init -p
# -p stands for postcss
```

two files will be created: `tailwind.config.js` and `postcss.config.js`

3. configure `tailwind.config.js`:

``` js
content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ]
```

The content option in the `tailwind.config.js` file is used to specify the files or directories that Tailwind CSS should scan for utilities.

4. Add tailwind directives to your root css

``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Typography

1. install typography

``` bash
yarn add -D @tailwindcss/typography
```

2. config `tailwind.config.js`:

``` js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ]
}
```

