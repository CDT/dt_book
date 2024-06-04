# Quasar

- A Vue.js-based framework for building high-performance, responsive websites, mobile apps, and desktop apps with a unified codebase, offering Material Design components, powerful CLI tools, cross-platform capabilities, and excellent performance optimization features.

## Installation

1. Create a quasar project using template: 

``` bash
yarn create quasar
```

- (Optional) For doing more with Quasar, you should also install the global CLI. With it you can directly run Quasar commands in the terminal, run a local http server for testing or do upgrades on your project.

``` bash
yarn global add @quasar/cli
```

2. Start the dev server

``` bash
cd [project_folder_name]

# if you have the global CLI:
quasar dev
# otherwise:
yarn quasar dev
# or: 
npx quasar dev
```

## File structure

# Project Name

## Project Structure

```
./
│
├── public/    # Static Assets
│
├── src/
│   ├── assets/    # dynamic assets processed by Vite
│   ├── components/    # vue components
|   |   ├── XXX.vue
|   |   └── models.ts    # typescript interfaces 
│   ├── css/    # style files
│   ├── layout/    # layout
│   ├── pages/    # pages
│   └── router/    # router
|   |   ├── index.ts    # do not modify this
|   |   └── routes.ts    # add your routes here
│   ├── App.vue    # app entry file
│   ├── env.d.ts    # env file
│   └── quasar.d.ts    # forces TS to apply `@quasar/app-vite` augmentations of `quasar` package
│
└── quasar.config.js    # quasar app configuration
```

## PWA support

[Developing PWA](https://quasar.dev/quasar-cli-webpack/developing-pwa/introduction/)



## Useful links

1. [Quasar Awesome](https://github.com/quasarframework/quasar-awesome)
    - [Community extensions](https://github.com/quasarframework/quasar-awesome?tab=readme-ov-file#community-app-extensions)
    - [Projects](https://github.com/quasarframework/quasar-awesome?tab=readme-ov-file#projects-using-quasar)