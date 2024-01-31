---
outline: 'deep'
---

# Vue

## Template Refs

### Ref on component

`ref` can also be used on a child component:

``` vue-html
<template>
<div ref="nativeElementRef">Native</div>
<child ref="customElementRef" />
</template>

<script>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

export default {
  setup() {
    const nativeElementRef = ref(null)
    const custElementRef = ref(null)
    
    onMounted(() => {
      // nativeElementRef.value will point to the native DOM element
      // output: RefImpl {...},  <div>Native</div>
      console.log(nativeElementRef, nativeElementRef.value)

      // output: RefImpl {...}, nulll
      console.log(custElementRef, custElementRef.value)
    })
    
    return {
      nativeElementRef
    }
  }
}
</script>
```
::: tip
Components referenced by `ref` are only available after mounted.
:::

Notice that child component using Options API means its every property is exposed by default.
Compared to that, child component using Composition API, `<script setup>` particularly, are private by default. To expose properties, use `defineExpose` macro:

``` vue-html
<script setup>
import { ref } from 'vue'

const a = 1, b = ref(2)

defineExpose({ a, b })
</script>
```

## `v-model` and `.sync`

[👉 Vue.js v-model](https://vuejs.org/guide/components/v-model.html)

[👉 Vue 2 .sync](https://v2.vuejs.org/v2/guide/components-custom-events)

### v-model basics

`v-model` is for two-way binding between parent element and child.

`v-model` is a syntactic sugar, defining a `v-model` variable in the parent is identical to: 
  1. passing the variable's value to the `modelValue` prop of the child
  2. updating the variable's value when the child emits `update:modelValue` event.

Here's how to implement the `v-model` directive in the child component:

Vue 3.4+:

``` vue-html
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>parent bound v-model is: {{ model }}</div>
</template>
```

For Vue version under 3.4 the following syntax should be used: 

``` vue-html
<!-- Child.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

The `defineModel` is a macro and will be expanded as above.

::: tip
Notice that if you use `<script setup lang="ts">`, `$event.target` must be cast to `HTMLInputElement` otherwise errors will be thrown:

``` js
@input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
```
:::

### v-model with custom prop name

`v-model` can also accept an argument as its custom prop name:

``` vue-html
<!-- Parent.vue -->
<child v-model:title="bookTitle" />

<!-- Child.vue vue 3.4+ -->
<script setup>
const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>

<!-- Child.vue under vue 3.4 -->
<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

### v-model with prop options

`v-model` can also accept prop options:

``` vue-html
<!-- child.vue vue 3.4+ -->
const title = defineModel('title', { required: true })
<!-- child.vue under vue 3.4 -->
<script setup>
defineProps({ title: { required: true } })
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

### multiple v-models

Use different `v-model` names to enable multiple `v-model` bindings:

``` vue-html
<!-- Parent -->

<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>

<!-- Child -->
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

### .sync

`.sync` is introduced in vue 2.3.0+.
`.sync` is also a syntactic sugar for two-way binding.
`.sync` is 

``` vue-html
<!-- Parent -->
<text-document :title.sync="doc.title"></text-document>

<!-- will be translated to: -->
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

`.sync` can also be used for an object wihout specifying specific prop names:

``` vue-html
<!-- Parent -->
<text-document v-bind.sync="doc"></text-document>
```

This passes each property in the doc object (e.g. title) as an individual prop, then adds v-on update listeners for each one.