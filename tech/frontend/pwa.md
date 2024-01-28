---
outline: 'deep'
---

# PWA: Progressive Web Application

![PWA](/images/pwa.webp)


[Reference: Mozilla PWA Tutorial](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[Reference: PWA Examples](https://github.com/mdn/pwa-examples/tree/main)

## What is a PWA and what are its benefits?

- PWA, aka Progressive Web Applications, are web applications that are 'progressive', which means they can run on devices with **limited capabilities** and **'progressively' add features and functionality** as the browser and device allow.
- No installation required, works offline, similar to native app.

## What is required to build a PWA?
A PWA is a normal web application with these additional assets:
1. `manifest.json`: A PWA manifest file is a JSON file that provides information about the features of that app to make it look and behave like a native app when installed on the user's device. The manifest contains metadata for your app, including its name, icons, and presentational directives.
2. `service worker`: The service worker is what makes the application work offline while making sure the application is always up to date. 
3. `https`: [Service workers are restricted to secure contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts/features_restricted_to_secure_contexts), so HTTPS protocol is mandatory for PWA.

## A simple PWA

### 1. HTML

Here is a simplest html page that displays three images in a row:

``` html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Image Gallery</title>
  <style>
    img {
      width: 30%; 
      float: left;
      margin: 1.5%;
    }
  </style>
</head>
<body>

  <img src="https://i.imgur.com/J7C7MU8.jpg" alt="Image 1">
  <img src="https://i.imgur.com/8P6DoH9.jpg" alt="Image 2"> 
  <img src="https://i.imgur.com/nc2EUNS.jpg" alt="Image 3">

</body>
</html>
```

### 2. Add `manifest.json`

To enable PWA for the web page, add a file named `manifest.json` (name of the file doesn't matter but `manifest` is preferred as a convention) and a reference to `manifest.json` in the html page:

``` html
<!-- index.html -->
<head>
  <title>Image Gallery</title>
  <!-- add a reference to manifest.json -->
  <link rel="manifest" href="manifest.json">
```

`manifest.json`: 

``` json
{
  "name": "Image Gallery",
  "icons": [
    {
      "src": "icon.svg",
      "sizes": "144x144"
    }
  ],
  "start_url": "/",
  "display": "standalone"
}
```

Notice that this is a minimal version of `manifest.json`. All of the following properties are required for the web page to be installable as a PWA app:

- `name`: Name of the PWA app.
- `icons`: Specify icon images of different sizes, for use in different contexts. For example, a smaller low-resolution icon for the address bar, and a higher-resolution icon for the home screen. The minimal size for the image and the minimal value of the `sizes` parameter is `144x144`. 
- `start_url`: As the name suggests, the starting url of the PWA app.
- `display`:  The display mode changes how much of browser UI is shown to the user and can range from browser (when the full browser window is shown) to fullscreen (when the app is fullscreened). [Look up available values here](https://developer.mozilla.org/en-US/docs/Web/Manifest/display#values)

### 3. Register the PWA

### 4. Service Worker

## Demos

[↓ Download Menustrual Tracker](/misc/ct.zip)

## QA

### Why my application is not installable?

- **Question:** Why is there no install button at the right corner of the address bar?

- **Answer:** To troubleshoot this bug, use **Lighthouse** chrome extension to analyze web page loading results. After the analyzing is complete, a report will be generated and it will have a `PWA` section displaying errors including why this app is not installable.