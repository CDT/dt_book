# Vue

## Template Refs

### Ref on component

`ref` can also be used on a child component:

``` vue
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

``` vue
<script setup>
import { ref } from 'vue'

const a = 1, b = ref(2)

defineExpose({ a, b })
</script>
```