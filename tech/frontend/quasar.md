---
outline: 'deep'
---

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

### Commands

To add pwa mode to an existing project:

``` bash
# go to project root directory
quasar mode add pwa
```

To start dev mode with pwa support:

``` bash
quasar dev -m pwa
```

To build pwa app:

```
quasar build -m pwa
```

### Configuration: `src-pwa`

After adding pwa mode to the project, a folder named `src-pwa` will appear under root directory:

```
./
│
├── src-pwa/
    ├── register-service-worker.js  # (or .ts) App-code *managing* service worke
    └── custom-service-worker.js  # (or .ts) Optional custom service worker file (InjectManifest mode ONLY) 
```

## Layout

### Links

- [Layout builder](https://quasar.dev/layout-builder)
- [Layout gallery](https://quasar.dev/layout/gallery/)

## Admin templates

- [Pratik Quasar Admin](https://github.com/pratik227/quasar-admin)
- [Gin Quasar Admin](https://github.com/Junvary/gin-quasar-admin?tab=readme-ov-file)

## Useful links

1. [Quasar Awesome](https://github.com/quasarframework/quasar-awesome)
    - [Community extensions](https://github.com/quasarframework/quasar-awesome?tab=readme-ov-file#community-app-extensions)
    - [Projects](https://github.com/quasarframework/quasar-awesome?tab=readme-ov-file#projects-using-quasar)

## Snippets

### Login Page

::: details Demo 1

``` html
<template>
  <q-page class="bg-light-green window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Company & Co</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="email" type="email" label="email" />
              <q-input square filled clearable v-model="password" type="password" label="password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="Login" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
```

:::

::: details Demo 2

``` html
<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2 login-card" bordered>
      <q-card-section class="text-center">
        <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
        <div class="text-grey-8">Sign in below to access your account</div>
      </q-card-section>
      <q-card-section>
        <q-input dense outlined v-model="email" label="Email Address"></q-input>
        <q-input dense outlined class="q-mt-md" v-model="password" type="password" label="Password"></q-input>
      </q-card-section>
      <q-card-section>
        <q-btn style="
border-radius: 8px;" color="dark" rounded size="md" label="Sign in" no-caps class="full-width"></q-btn>
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <div class="text-grey-8">Don't have an account yet?
          <a href="#" class="text-dark text-weight-bold" style="text-decoration: none">Sign
            up.</a></div>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref<string>('')
const password = ref<string>('')
</script>

<style scoped>
.login-card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
```

:::


::: details Demo 3

``` html
<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274C5, #5A4A9F);"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:400px;height:540px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">{{ title }}</h4>
          </q-card-section>
          <q-card-section>
            <q-fab
              color="primary"
              @click="switchTypeForm"
              icon="add"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
            >
              <q-tooltip>
                New user register
              </q-tooltip>
            </q-fab>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
                ref="emailRef"
                square
                clearable
                v-model="email"
                type="email"
                lazy-rules
                :rules="[required, isEmail, short]"
                label="Email"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                ref="usernameRef"
                v-if="register"
                square
                clearable
                v-model="username"
                lazy-rules
                :rules="[required, short]"
                type="username"
                label="User"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                ref="passwordRef"
                square
                clearable
                v-model="password"
                :type="passwordFieldType"
                lazy-rules
                :rules="[required, short]"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
              <q-input
                ref="repasswordRef"
                v-if="register"
                square
                clearable
                v-model="repassword"
                :type="passwordFieldType"
                lazy-rules
                :rules="[required, short, diffPassword]"
                label="Repeat Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              color="secondary"
              @click="submit"
              class="full-width text-white"
              :label="btnLabel"
            />
          </q-card-actions>
          <q-card-section
            v-if="!register"
            class="text-center q-pa-sm"
          >
            <p class="text-grey-6">Забыли пароль?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Authentication')
const email = ref(null)
const username = ref(null)
const password = ref(null)
const repassword = ref(null)
const register = ref(false)
const passwordFieldType = ref('password')
const btnLabel = ref('Вход')
const visibility = ref(false)
const visibilityIcon = ref('visibility')

const emailRef = ref(null)
const usernameRef = ref(null)
const passwordRef = ref(null)
const repasswordRef = ref(null)

const required = (val) => {
  return (val && val.length > 0) || 'Required'
}

const diffPassword = (val) => {
  const val2 = password.value
  return val && val === val2 ? true : 'Password not match'
}

const short = (val) => {
  return (val && val.length > 3) || 'Too short'
}

const isEmail = (val) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return emailPattern.test(val) || 'Enter a valid email'
}

const submit = () => {
  if (register.value) {
    emailRef.value.validate()
    usernameRef.value.validate()
    passwordRef.value.validate()
    repasswordRef.value.validate()
  } else {
    emailRef.value.validate()
    passwordRef.value.validate()
  }

  if (!register.value) {
    if (!emailRef.value.hasError && !passwordRef.value.hasError) {
      // Handle successful login
    }
  }
}

const switchTypeForm = () => {
  register.value = !register.value
  title.value = register.value ? 'New user' : 'Authorization'
  btnLabel.value = register.value ? 'Registration' : 'Login'
}

const switchVisibility = () => {
  visibility.value = !visibility.value
  passwordFieldType.value = visibility.value ? 'text' : 'password'
  visibilityIcon.value = visibility.value ? 'visibility_off' : 'visibility'
}
</script>
```

:::