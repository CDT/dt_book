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

export const fetchData = async (url: string, options: FetchOptions) => {
  
  const { query, data, method = 'GET', body_type } = options

  try {
    
    url = url + (query ? buildQueryString(options.query) : '')

    let body: FormData | URLSearchParams | undefined
    
    if (data) {
      body = body_type === 'FormData' ? new FormData() : new URLSearchParams()
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          body.append(key, data[key])
        }
      }
    }

    const response = await fetch(url, { method, ...(body ? { body } : {}) })
    
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
    queryString.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
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
