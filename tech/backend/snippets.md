---
outline: 'deep'
---

![vault boy coding](/images/vaultboycoding.jpg)

# Snippets

## Node.js static server

Apart from serving static contents on http servers like Apache, Nginx and IIS, we could also using node.js to serve contents thereby having more control over the content and able to integrate into other node.js applications.

- Option 1: Express

::: details code

``` js
// using express.static
const express = require('express')

const app = express() // serve static files from the "static" directory

app.use(express.static('../dist'))

app.listen(8080, () => { console.log('Server running on port 8080')})
```
:::

- Option 2: Use out-of-the-box package like `http-server`

::: details code

``` shell
# 1. http-server run on demand
npx http-server /path/to/dist -p 8888

# 2. http-server globally
npm install -g http-server
http-server /path/to/dist -p 8888
```

:::

## PostgreSQL

- 基于[postgres](https://github.com/porsager/postgres)项目

基本功能代码：

::: details code

``` js
const postgres = require('postgres')

const sql = postgres('postgres://postgres:postgres123@192.168.248.98:5432/reportcenter')

// create a table first:
/*
create table emps (
  name varchar2(100),
  age integer
)
*/

const insertDemo = async () => {
  const xs = await sql`
    insert into emps (
      name, age
    ) values (
      'Murray', 68
    )

    returning *
  `
  console.log(xs)
}

const selectDemo = async () => {
  const name = 'Mur', age = 60
  const users = await sql`
    select name, age from emps where
      name like ${ name + '%' }
      and age > ${ age }
  `
  console.log(users)
}

const dynamicColumnSelection = async () => {
  const columns = ['name', 'age']
  console.log(
    await sql`
      select ${ sql(columns) } from emps
    `
  )
  // This will result in:
  // select "name", "age" from users
}

dynamicColumnSelection()
```

:::