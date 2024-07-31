# Frequently Asked Questions

## 为什么我的first-of-child和first-of-type不起作用？

[参考](https://stackoverflow.com/questions/2717480/css-selector-for-first-element-with-class)

以下代码哪一个p元素的字体会加粗？

``` html
<!DOCTYPE html>
<html>

<head>
<style>
.c1:nth-child(2) {
  font-weight: bold;
}
</style>
</head>

<body>
<p class='c1'><span>aaaa</span></p >
<p class='c2'>xxxx</p >
<p class='c1'><span>bbbb</span></p >
<p class='c1'><span>cccc</span></p >
</body>

</html>
```

答案是都不会。

`nth-child`会寻找父节点下的第`n`个元素，**无视**其前面的selector属性。因此，`nth-child(2)`会先找到父节点`<body>`下的第二个元素`<p class='c2'>`，然后按照selector属性`.c1`进行匹配，发现不匹配，因此最后不会应用css属性。

类似的，`nth-of-type`与`nth-child`类似，会先寻找第`n`个`type`符合的元素，然后再按照selector属性进行匹配。`nth-of-type`的`type`指的是html标签名，例如`p:nth-of-type(n)`会去寻找第`n`个`<p>`元素。

## How to deep clone an array of objects in Javascript ?

[Ref](https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript)

- Option 1:

`let clonedArray = JSON.parse(JSON.stringify(nodesArray))`

- Option 2:

`array2 = structuredClone(array1);`

- Option 3:

`clonedArray = nodesArray.map(a => {return {...a}})`

## Websocket

WebSockets enable real-time, bidirectional communication between client and server over a single, persistent TCP connection, offering efficient data exchange for applications requiring live updates and interaction.

Typical WebSocket use cases:

1. Chat applications
2. Live sports scores/updates
3. Stock market tickers
4. Multiplayer games
5. Collaborative editing tools
6. Real-time analytics dashboards
7. Social media feeds
8. IoT device communication
9. Live auctions
10. Video conferencing systems

These applications benefit from WebSockets' ability to push instant updates from server to client without constant polling.

::: details Demo code

- Frontend:

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSocket Demo</title>
</head>
<body>
    <h1>WebSocket Demo</h1>
    <input type="text" id="messageInput" placeholder="Enter a message">
    <button onclick="sendMessage()">Send</button>
    <div id="messages"></div>

    <script>
        const socket = new WebSocket('ws://localhost:8080');
        const messagesDiv = document.getElementById('messages');

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        socket.onmessage = (event) => {
            const message = document.createElement('p');
            message.textContent = event.data;
            messagesDiv.appendChild(message);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value;
            socket.send(message);
            input.value = '';
        }
    </script>
</body>
</html>
```

- Backend:

``` js
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    ws.send(`Server received: ${message}`);
  });

  ws.send('Welcome to the WebSocket server!');
});

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
```

:::