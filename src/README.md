- 在使用axios的时候，
  this.$http.get('./api/seller')
  /*在此处使用匿名函数的时候，this指向出错，this指向不是指向组件本身，不能给组件的seller赋值，所以改用箭头函数*/
  .then(resposne => {})
  .catch(err => {})

- 背景设置模糊度
  filter: blur(10px)

- 在vue组件中，引入scss文件不能编译 ：原因是配置配置出错  sass依赖 node-sass
    @import 'border.scss'
    npm install style-loader css-loader sass-loader
    {test: /\.css$/, loader: 'style!css'},
    {test: /\.scss$/, loader: 'style!css!sass')}

- VueJs  v-for迭代组件，需要为每个组件设置key

- 文字单行显示，超出部分以...显示
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
- 内容滚动使用了 better-scroll
   https://github.com/ustbhuangyi/better-scroll

- goods页面两个滚动边栏的联动
    先拿到出goods-list中大区块li的高度，再根据实时当前滚动的高度，计算出目前正在浏览哪个区块
    实时滚动到的高度创建better-scroll实例时设置proboType属性值为3，并监听'scroll'事件

- 按指定格式解析时间

        function TimeFormat (date, fmt) {
          if (/(y+)/g.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length))
          }
          let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDay(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
          }
          for (let key in o) {
            if (new RegExp(`(${key})`).test(fmt)) {
              fmt = fmt.replace(RegExp.$1, ('00' + o[key]).substring(RegExp.$1.length))
            }
          }
          return fmt
        }

- 对象合并
    Object.assign()
- 数据存储到本地
  window.localStorage
