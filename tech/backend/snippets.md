# Snippets

![Code](/images/code.webp)

## Node.js static server

Apart from serving static contents on http servers like Apache, Nginx and IIS, we could also using node.js to serve contents thereby having more control over the content and able to integrate into other node.js applications.

- Option 1: Express

``` js
// using express.static
const express = require('express')

const app = express() // serve static files from the "static" directory

app.use(express.static('../dist'))

app.listen(8080, () => { console.log('Server running on port 8080')})
```

- Option 2: Use out-of-the-box package like `http-server`

``` shell
# 1. http-server run on demand
npx http-server /path/to/dist -p 8888

# 2. http-server globally
npm install -g http-server
http-server /path/to/dist -p 8888
```