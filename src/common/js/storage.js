/**
 * Created by bluedoor on 2017/3/15.
 */
'use strict'
export function loadFromLocal (id, key, def) {
  var storage = window.localStorage
  var seller = storage.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)
  if (!seller[id]) {
    return def
  }
  return seller[id][key] || def
}
export function setToLocal (id, key, val) {
  var storage = window.localStorage
  var seller = storage.__seller__
  if (!seller) {
    seller = {}
  } else {
    seller = JSON.parse(seller)
  }
  if (!seller[id]) {
    seller[id] = {}
  }
  seller[id][key] = val
  storage.__seller__ = JSON.stringify(seller)
}
