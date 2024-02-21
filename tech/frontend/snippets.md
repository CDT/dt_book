---
outline: 'deep'
---

![vault boy coding](/images/vaultboycoding.jpg)

# Snippets

## Element Plus

### Theme switch

``` vue
<el-switch v-model="isDark" :active-action-icon="Moon" :inactive-action-icon="Sunny" class="theme-switch"/>

import { useDark } from "@vueuse/core"
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = useDark()
```