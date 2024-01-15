# PWA: Progressive Web Application

![PWA](/images/pwa.webp)

## What is a PWA and what are its benefits?

- PWA, aka Progressive Web Applications, are web applications that are 'progressive', which means they can run on devices with **limited capabilities** and **'progressively' add features and functionality** as the browser and device allow.
- No installation required, works offline, similar to native app.

## What is required to build a PWA?
A PWA is a normal web application with these additional assets:
1. `manifest.json`: 
2. `service worker`: 
3. `https`: [Service workers are restricted to secure contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts/features_restricted_to_secure_contexts), so HTTPS protocol is mandatory for PWA.

### How to add a built-in TLS certificate and serve the web app over HTTPS

[See how to serve via https with local-web-server](/tech/backend/snippets.html#use-local-web-server-to-host-https-content)

## Demo: Menstrual tracker

``` html
<!-- index.html -->
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Cycle Tracker</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Period tracker</h1>
    <form>
      <fieldset>
        <legend>Enter your period start and end date</legend>
        <p>
          <label for="start-date">Start date</label>
          <input type="date" id="start-date" required />
        </p>
        <p>
          <label for="end-date">End date</label>
          <input type="date" id="end-date" required />
        </p>
      </fieldset>
      <p>
        <button type="submit">Add Period</button>
      </p>
    </form>
    <section id="past-periods"></section>
    <script src="app.js" defer></script>
  </body>
</html>
```

``` css
/* style.css */
body {
  margin: 1vh 1vw;
  background-color: #efe;
}
ul,
fieldset,
legend {
  border: 1px solid;
  background-color: #fff;
}
ul {
  padding: 0;
  font-family: monospace;
}
li,
legend {
  list-style-type: none;
  padding: 0.2em 0.5em;
  background-color: #cfc;
}
li:nth-of-type(even) {
  background-color: inherit;
}
```