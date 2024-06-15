# Element 

## Table

1. [带状态表格](https://element-plus.org/zh-CN/component/table.html#%E5%B8%A6%E7%8A%B6%E6%80%81%E8%A1%A8%E6%A0%BC)

2. [流体高度](https://element-plus.org/zh-CN/component/table.html#%E6%B5%81%E4%BD%93%E9%AB%98%E5%BA%A6)

3. [多级表头](https://element-plus.org/zh-CN/component/table.html#%E5%A4%9A%E7%BA%A7%E8%A1%A8%E5%A4%B4)

4. [单选](https://element-plus.org/zh-CN/component/table.html#%E5%8D%95%E9%80%89)

5. [多选](https://element-plus.org/zh-CN/component/table.html#%E5%A4%9A%E9%80%89)

6. [本地数据排序](https://element-plus.org/zh-CN/component/table.html#%E6%8E%92%E5%BA%8F)

7. [自定义表头](https://element-plus.org/zh-CN/component/table.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A1%A8%E5%A4%B4)

8. [展开行/行明细](https://element-plus.org/zh-CN/component/table.html#%E5%B1%95%E5%BC%80%E8%A1%8C)

9. [树形数据与懒加载](https://element-plus.org/zh-CN/component/table.html#%E6%A0%91%E5%BD%A2%E6%95%B0%E6%8D%AE%E4%B8%8E%E6%87%92%E5%8A%A0%E8%BD%BD)
  1. 需要设置`row-key`
  2. 若数据中含`children`属性，默认为包含子行可展开
  3. 若为异步，需要设置`lazy`, `load`, `treeProps`属性

10. [表尾合计行](https://element-plus.org/zh-CN/component/table.html#%E8%A1%A8%E5%B0%BE%E5%90%88%E8%AE%A1%E8%A1%8C)

11. [合并行或列](https://element-plus.org/zh-CN/component/table.html#%E5%90%88%E5%B9%B6%E8%A1%8C%E6%88%96%E5%88%97)

12. [自定义索引](https://element-plus.org/zh-CN/component/table.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B4%A2%E5%BC%95)

13. [自定义布局](https://element-plus.org/zh-CN/component/table.html#%E8%A1%A8%E6%A0%BC%E5%B8%83%E5%B1%80)

  - `fixed/auto`

14. [小计和合计的生成方法](https://www.cnblogs.com/ricardox3/p/17494368.html)

::: details 相关代码

``` js
//计算小计
const processData = computed(()=>{
  let subtotal = 0 //小计数量
  let temp = [] //重新渲染的数组
  let division = 0 //以日期作为合计分割点
  testData.value.forEach((item, index)=>{
    //给原数据添加序号
    item.index = index + 1
    temp.push(item)
    //同一个日期内
    if(item.findate === testData.value[index + 1]?.findate){
      //同一个站
      if(item.locationname === testData.value[index + 1]?.locationname){
        //同一种票
        if(item.tickettypename === testData.value[index + 1]?.tickettypename){
          subtotal += item.ticketnum
        } else {//不同票据
          subtotal += item.ticketnum
          temp.push({index: null, tickettypename: '小计', ticketnum: subtotal})
          subtotal = 0
        }
      } else{//不同站点
        subtotal += item.ticketnum
        temp.push({index: null, tickettypename: '小计', ticketnum: subtotal})
        subtotal = 0
      }
    } else {//不同日期，添加一个小计与合计
      subtotal += item.ticketnum
      temp.push({index: null, tickettypename: '小计', ticketnum: subtotal})
      subtotal = 0
      temp.push({index: '', tickettypename: '总计', ticketnum: testData.value.slice(division, index + 1).reduce((total, item) => total + item.ticketnum, 0)})
      division = index + 1 //新的分割点
    }
  })
  state.pagination.total = temp.length
  state.pagination.size = temp.length
  return temp
})
//渲染小计和总计的样式
const rowStyle = ({row}) => {
  if(row.tickettypename === '小计') return ('background: #EFEFEF; color: red')
  else if(row.tickettypename === '总计') return ('background: #FCCFDB; font-weight: 700')
}
```
:::

## CSS Utility Classes

```
mt-4: margin top 1rem
mb-4: margin bottom 1rem
pl-4: padding left 1rem
pr-4: padding right 1rem
```