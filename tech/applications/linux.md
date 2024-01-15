---
outline: 'deep'
---

# Linux System Operations

![Angry Linux](/images/angry_linux.jpg)

## Troubleshooting

**1. Why my shell script setting up environment variables does not work?**

**Description :lady_beetle:**: My script below does not work property, no proxy is displayed with `echo $http_proxy` aftering running the script with `./[script name].sh`: 

``` shell
#!/bin/sh
export http_proxy=http://1.2.3.4:888
```

**Answer :wink:**: Running a shell script `./[script name].sh` will start a sub-shell and run the script within the sub-shell's session instead of current shell. To run the script within current shell's session, you should run the script with `source [script name].sh` instead.

---

**2.**

**Description :lady_beetle:**: 

**Answer :wink:**: