/**
 * Created by bluedoor on 2017/3/15.
 */
export function TimeFormat (date, fmt) {
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
