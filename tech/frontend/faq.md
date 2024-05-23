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