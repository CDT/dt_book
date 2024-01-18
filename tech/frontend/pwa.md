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


## Demo: Menstrual Tracker

[Download code](/misc/ct.zip)