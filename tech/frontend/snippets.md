---
outline: 'deep'
---

![vault boy coding](/images/vaultboycoding.jpg)

# Snippets

## Element Plus

### Theme switch

``` vue
<template>
  <el-switch v-model="isDark" :active-action-icon="Moon" :inactive-action-icon="Sunny" class="theme-switch"/>
</template>

<script lang="ts" setup>
import { useDark } from "@vueuse/core"
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = useDark()
</script>
```

## Others

### Date and time formatter

``` js

export const formatDate = (date: Date | string): string => {

  if (typeof date === 'string') date = new Date(date)

  const year = date.getFullYear()

  let month:any = date.getMonth() + 1
  month = month.toString().padStart(2, '0')

  let day:any = date.getDate()
  day = day.toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const formatDatetime = (datetime: Date | string): string => {
  if (typeof datetime === 'string') datetime = new Date(datetime)

  let hour:any = datetime.getHours()
  hour = hour.toString().padStart(2, '0')

  let minute:any = datetime.getMinutes()
  minute = minute.toString().padStart(2, '0')

  let second:any = datetime.getSeconds()
  second = second.toString().padStart(2, '0')

  return formatDate(datetime) + ` ${hour}:${minute}:${second}`
  
}
```
