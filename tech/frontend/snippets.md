---
outline: 'deep'
---

![vault boy coding](/images/vaultboycoding.jpg)

# Snippets

## Vue

### `v-model` passing in vue3

``` js
// In child component
<el-dialog v-model="dialog_visible" .../>

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const saving = ref<boolean>(false)
const dialog_visible = computed({
  get: (): boolean =>  props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val)
})
```

### 如何支持在tab页中支持无需刷新的iframe

[参考](https://juejin.cn/post/6844903894783361032)

在我的普通的多tab页面中，iframe一直会刷新，`<keepalive>`没有用，以下是无需刷新的iframe实现方式：

``` html
<!-- App.vue -->
<el-tabs v-model="currentRoute" tab-position="top" type="card" @tab-remove="onTabRemove" class="router-tabs">
  <el-tab-pane v-for="tab in glob.openTabs" :key="tab.name" :name="tab.name" ref="tabs" closable>
    
    <template #label>
      <el-icon v-if="getRouteByName(tab.name)?.meta?.icon" style="margin-right: 0.2rem"><component :is="getRouteByName(tab.name)?.meta?.icon" /></el-icon>
      {{ tab.label }}
      <el-icon class="refresh-icon is-icon-close" @click="refresh(tab)"><refresh-right /></el-icon>
    </template>

    <router-view v-slot="{ Component }">
      <!-- 页面仅在当前路径等于页面路径时显示，其他情况不显示 -->
      <!-- 如果是iframe页面，也不显示，避免每次都加载 -->
      <keep-alive :include="tab.name">
        <component :key="route.name" :is="tab.name == route.name ? Component : null" 
          v-if="tab.refresh_switch && !tab.iframe_src">
        </component>
      </keep-alive>
    </router-view>

    <!-- 如果是iframe页面 -->
    <iframe v-if="tab.iframe_src" :src="tab.iframe_src" height="900px" width="100%" />
    
  </el-tab-pane>
</el-tabs>
```

``` js
// router.ts
{
  path: '/fr/orgs',
  name: 'fr_orgs',
  component: () => import('@/views/Empty.vue'),
  meta: {
    title: 'HIS科室查询',
    iframe_src: 'http://his.tjh.com/report/ReportServer?reportlet=cdt/orgs.cpt',
    icon: Search,
    roles: ['hlfj_admin']
  }
}
```

``` html
<!-- Empty.vue -->
<template></template>
```

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

## Request

### Fetch

::: details 代码

``` js

interface FetchOptions {
  query?: any;
  data?: any;
  method?: 'GET' | 'POST';
  body_type?: 'FormData' | 'UrlEncoded';
}

export const fetchData = async (
  url: string, 
  options: {
    query?: any,
    data?: any,
    method?: ('GET' | 'POST'),
    body_type?: ('FormData' | 'UrlEncoded' | 'JSON')
  }) => {
  try {
    const { query, data, method = 'GET', body_type = 'UrlEncoded' } = options
    
    url = url + (query ? buildQueryString(query) : '')

    let body: any, headers: any = {}
    
    if (data) {
      if (body_type === 'FormData') {
        body = new FormData()
      } else if (body_type === 'JSON') {
        // 务必注意express需要使用中间件json才能解析json数据
        // app.use(express.json())
        body = JSON.stringify(data)
        headers['Content-Type'] = 'application/json'
      } else if (body_type === 'UrlEncoded') {
        body = new URLSearchParams()
      } else {
        throw new Error('Unrecognized body_type')
      }
      
      if (body_type === 'FormData' || body_type === 'UrlEncoded') {
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            body.append(key, data[key])
          }
        }
      }
    }

    const response = await fetch(url, { method, ...(body ? { body } : {}), headers })
    
    if(!response.ok) {
      throw new Error((await response.json()).message || '请求失败')
    }    
    return await response.json()
  } catch(error) {
    throw error
  }
}

const buildQueryString = (params: any) => {
  const queryString = []

  for (let key in params) {
    if (params[key] != null) {
      queryString.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    }
  }

  return '?' + queryString.join('&')
}
```

:::

### Axios

::: details 代码

``` js

interface RequestOptions {
  formData?: boolean
}

export const http: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: API_TIMEOUT,
  // headers: {'X-Custom-Header': 'foobar'}
})

http.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  if (config.params?.skipBearer) {
    delete config.params.skipBearer
    return config
  }
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

http.interceptors.response.use(
  response => {
    // If the response is successful, return it
    return response
  },
  error => {
    // Log the error here
    console.error(error)
    const errorMsg = error.response?.data?.message || error.message
    toast(errorMsg, 'error')

    // jwt expired then requires login again
    if (errorMsg === 'jwt expired' || errorMsg === 'invalid token') {
      clearLoginInfo()
      router.push('/login')
    }

    // throw an error or handle it in any other way, if needed.
    return Promise.reject(error)
  }
)

export const getData = (url: string, params?: object): any => new Promise((resolve, reject) => {
  http.get(url, {params})
    .then(resp => resolve(resp.data))
    .catch(e => reject(e))
})

export const postData = (url: string, data: object, options?: RequestOptions): any => new Promise((resolve, reject) => {
  let dataToCarry = data
  let httpOptions: any = {}
  if (options?.formData) {
    dataToCarry = convertObjectToFormData(data)
    httpOptions['Content-Type'] = 'multipart/form-data'
  }
  http.post(url, dataToCarry, httpOptions)
       .then(resp => resolve(resp.data))
       .catch(e => reject(e))
})

export const putData = (url: string, data: object): any => new Promise((resolve, reject) => {
  http.put(url, data)
       .then(resp => resolve(resp.data))
       .catch(e => reject(e))
})
```

:::

### Using a proxy

- 注意axios自身的proxy属性是有问题的，经常出现莫名其妙的400错误，因此建议使用`https-proxy-agent`包。

``` js
const { HttpsProxyAgent } = require('https-proxy-agent')

// axios:
axios.get('https://v1.jinrishici.com/all.txt', {
  httpsAgent: new HttpsProxyAgent('http://10.35.51.37:10809')
}).then(response => {
  console.log(response.data)
}).catch(error => {
  console.error(error.response.data)
})

// fetch:
fetch('https://v1.jinrishici.com/all.txt', {
  agent: new HttpsProxyAgent('http://10.35.51.37:10809')
}).then(r => {
  r.text().then(t => console.log(t))
})
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
