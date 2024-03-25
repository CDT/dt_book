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