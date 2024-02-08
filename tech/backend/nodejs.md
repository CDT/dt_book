# Node.js

## Tagged templates

[Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)

Tagged templates allow you to parse and transform template literals using a 'tag' function.

Here is a simple demonstration:

``` js
// Tag function
function tag(strings, ...values) {
  console.log(strings) 
  console.log(values)
  return values + ' ' + strings.join(' ')
}

// Template literal
const firstname = 'John'
const lastname = 'Doe'
const tagged = tag`Hello ${firstname} ${lastname}!`

console.log(tagged)
```

The output is:

```
[ 'Hello ', ' ', '!' ]
[ 'John', 'Doe' ]
John,Doe Hello    !
```