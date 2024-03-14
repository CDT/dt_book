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

- `sql`方法：

| Interpolation syntax       | Usage                         | Example                                                   |
| -------------              | -------------                 | -------------                                             |
| `${ sql`` }`               | for keywords or sql fragments | `` await sql`SELECT * FROM users ${sql`order by age desc` }` ``  |
| `${ sql(string) }`         | for identifiers               | ``await sql`SELECT * FROM ${sql('table_name')` ``               |
| `${ sql([] or {}, ...) }`  | for helpers                   | ``await sql`INSERT INTO users ${sql({ name: 'Peter'})}` ``      |
| `${ 'somevalue' }`         | for values                    | ``await sql`SELECT * FROM users WHERE age = ${42}` ``           |


基本功能代码：

::: details code

``` js
const postgres = require('postgres')

const sql = postgres('postgres://username:password@ip:5432/dbname')

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
  console.log(sql(columns))
  console.log(
    await sql`
      select ${ sql(columns) } from emps
    `
  )
  // This will result in:
  // select "name", "age" from users
}

const dynamicInsertion = async () => {
  const user = {
    name: 'Murray',
    age: 68
  }
  
  await sql`
    insert into emps ${
      sql(user, 'name', 'age')
    }
  `
  
  // Which results in:
  // insert into emps ("name", "age") values ($1, $2)
  
  // The columns can also be given with an array
  const columns = ['name', 'age']
  
  await sql`
    insert into emps ${
      sql(user, columns)
    }
  `
  console.log('insertion complete')
}

const multipleInsertions = async () => {
  const users = [{
    name: 'Murray',
    age: 68,
    garbage: 'ignore'
  },
  {
    name: 'Walter',
    age: 80
  }]
  
  await sql`insert into emps ${ sql(users, 'name', 'age') }`
  
  // Is translated to:
  // insert into users ("name", "age") values ($1, $2), ($3, $4)
  
  // Here you can also omit column names which will use object keys as columns
  // await sql`insert into emps ${ sql(users) }`
  
  // Which results in:
  // insert into users ("name", "age") values ($1, $2), ($3, $4)
  console.log('multiple insertions complete')
}

const dynamicColUpdate = async () => {
  const user = {
    id: 1,
    name: 'Murray',
    age: 68
  }
  
  await sql`
    update emps set ${
      sql(user, 'name', 'age')
    }
    where id = ${ user.id }
  `
  
  // Which results in:
  // update users set "name" = $1, "age" = $2 where user_id = $3
  
  // The columns can also be given with an array
  const columns = ['name', 'age']
  
  await sql`
    update emps set ${
      sql(user, columns)
    }
    where id = ${ user.id }
  `

  console.log('update complete')
}

const multipleUpdates = async () => {
  // To create multiple updates in a single query
  // it is necessary to use arrays instead of objects to 
  // ensure that the order of the items correspond with the column names.

  const users = [
    [1, 'John', 34],
    [2, 'Jane', 27],
  ]

  await sql`
    update emps set name = update_data.name, age = (update_data.age)::int
    from (values ${sql(users)}) as update_data (id, name, age)
    where emps.id = (update_data.id)::int
    returning emps.id, emps.name, emps.age
  `

  console.log('multiple update complete')
}

const dynamicWhere1 = async () => {
  console.log(await sql`
    select
      *
    from emps
    where age in ${ sql([68, 75, 23, 34]) }
  `)

  const [{ a, b, c }] = await sql`
  select
    *
  from (values ${ sql(['a', 'b', 'c']) }) as x(a, b, c)
  `
  console.log({a, b, c})

}

const dynamicWhere2 = async () => {
  const olderThan = x => sql`and age > ${ x }`

  const filterAge = true

  console.log(await sql`
    select
    *
    from emps
    where name is not null ${
      filterAge
        ? olderThan(5)
        : sql``
    }
  `)

  // or simpler:
  console.log(await sql`select * from emps where name is not null
    ${ filterAge ? sql`and age > ${ x }` : sql`` }
  `)

  // Which results in:
  // select * from emps where name is not null
  // Or
  // select * from emps where name is not null and age > 50
}

const dynamicTableNameAndColumns = async () => {
  const table = 'emps'
    , column = 'id'
    , age = 42
    , name = 'John'

  console.log(await sql`
    select ${ sql(column) } from ${ sql(table) }
      where age = ${ age }
         or name = ${ name }
  `)

  // Which results in:
  // select "id" from "emps"
  // Think: why age and name don't need to be wrapped in sql method
}

const sqlFunction = async () => {
  const date = null

  await sql`
    update users set updated_at = ${ date || sql`now()` }
  `

  // Which results in:
  // update users set updated_at = now()
}

dynamicTableNameAndColumns()
```

:::

- Debugging:

::: details code

``` js
const postgres = require('postgres')

const sql = postgres('postgres://...', {
  debug: (connection, query, parameters, paramTypes) => {
    if (query.includes('pg_')) return // omit queries on native tables
    console.log('connection: ', connection) // connection is a number, and I don't know its meaning
    console.log('query: ', query)
    console.log('parameters: ', parameters)
    console.log('paramTypes: ', paramTypes) // paramTypes are also numbers, also don't know its meaning
  }
})

const selectDemo = async () => {
  const users = await sql`
    select
      *
    from emps
    where age in ${ sql([68, 75, 23]) } or name in ${ sql(['John']) }
  `
}

// transaction
const trans1 = async () => {
  const [user, user1] = await sql.begin(async sql => {
    const [user] = await sql`
      insert into usertest (
        name
      ) values (
        'Murray'
      )
      returning *
    `

    const [user1] = await sql`
      insert into usertest (
        name
      ) values (
        ${ user.name } || 'abc'
      )
      returning *
    `

    return [user, user1]
  })
}


selectDemo()
```
:::

## 杂项

### log4js

::: details 代码

``` js
// 日志配置
log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    debug: {
      type: 'dateFile',
      filename: `${__dirname}/log/debug.log`,
      pattern: 'yyyy-MM-dd',
      numBackups: 10
    },
    error: {
      type: 'dateFile',
      filename: `${__dirname}/log/error.log`,
      pattern: 'yyyy-MM-dd',
      numBackups: 10
    },
    errorFilter: {
      type: 'logLevelFilter',
      appender: 'error',
      level: 'error'
    }
  },
  categories: {
    default: { appenders: ['out', 'debug', 'errorFilter'], level: "debug" }
  }
});

const logger = log4js.getLogger('common')
logger.level = 'debug'
```

:::