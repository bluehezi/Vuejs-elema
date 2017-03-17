<template>
    <div class="goods">
      <div class="goods-content">
        <div class="main-list" ref="mainlist">
          <ul class="list">
            <li class='good-item' v-for="(good,index) in goods" :class='{active:active === index}'
                @click="__scroll(index, $event)">
              <div class="support-wrapper">
                <support :supportType="good.type" :supportDesc="good.name"></support>
              </div>
            </li>
          </ul>
        </div>
        <div class="goods-list" ref="goodslist">
          <ul class="goods-sort">
            <li class='goods-sort-item' v-for="good in goods">
              <h2 class="title">{{good.name}}</h2>
              <ul class="food-list">
                <li class='food-item' v-for="food in good.foods" @click='__goToDetail(food,$event)' ref="fooditem">
                  <div class="content">
                    <div class="left">
                      <img class='avatar' width='57px' height='57px' :src="food.icon"/>
                    </div>
                    <div class="right">
                      <h3 class="name">{{food.name}}</h3>
                      <span v-if='food.description' class="text desc">{{food.description}}</span>
                      <div class="line">
                        <span class="text count">月售{{food.sellCount}}份</span>
                        <span class="text rating">好评率{{food.rating}}%</span>
                      </div>
                      <div class="price">
                        <span class="now">{{food.price}}</span>
                        <span v-if='food.oldPrice' class="old">{{food.oldPrice}}</span>
                      </div>
                      <cartcontrol :food="food" v-on:foodadd="__foodadd"></cartcontrol>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <detailpage :food="detailFood" ref="detailpage" v-on:foodadd="__foodadd"></detailpage>
      <buycart ref='buycart' :foods='selectedFoods' :seller="seller"></buycart>
    </div>
</template>

<script type='text/ecmascript-6'>
  import NumStatus from '../../common/js/NumStatus.js'
  import support from '../support/support.vue'
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import buycart from '../buycart/buycart.vue'
  import detailpage from '../detailpage/detailpage.vue'
  export default {
    props: {
      seller: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data: function () {
      return {
        goods: [],
        itemHeight: [],
        currentHeight: 0,
        detailFood: {}
      }
    },
    created: function () {
      this.$http.get('./api/goods')
        .then(response => {
          if (response.data.errno === NumStatus.ERR_OK) {
            this.goods = response.data.data
            this.$nextTick(() => {
              this.__initScroll()
              this.__calculateHeight()
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    components: {
      support: support,
      cartcontrol,
      buycart,
      detailpage
    },
    methods: {
      __initScroll: function () {
        this.mainScroll = new BScroll(this.$refs.mainlist, {
          click: true
        })
        this.goodsScroll = new BScroll(this.$refs.goodslist, {
          click: true,
          probeType: 3
        })
        this.goodsScroll.on('scroll', (pos) => {
          // 记录当前高度
          this.currentHeight = -pos.y
        })
      },
      // 计算高度
      __calculateHeight: function () {
        let listItem = this.$refs.goodslist.getElementsByClassName('goods-sort-item')
        let totalHeight = 0
        this.itemHeight.push(totalHeight)
        Array.prototype.forEach.call(listItem, (item, index) => {
          this.itemHeight.push(totalHeight += item.clientHeight)
        })
      },
      __scroll: function (index, event) {
        if (event._constructed) {
          var items = this.$refs.goodslist.getElementsByClassName('goods-sort-item')
          this.goodsScroll.scrollToElement(items[index])
        }
      },
      __foodadd: function (target) {
        this.$nextTick(() => {
          this.$refs.buycart.foodadd(target)
        })
      },
      __goToDetail: function (food, event) {
        if (event._constructed) {
          this.detailFood = food
          this.$refs.detailpage.show()
        }
      }
    },
    computed: {
      active: function () {
        if (this.currentHeight < 0) {
          return 0
        }
        if (this.currentHeight > this.itemHeight[this.itemHeight - 2]) {
          return this.itemHeight.length - 2
        }
        for (let i = 0; i < this.itemHeight.length - 1; i++) {
          if (this.currentHeight >= this.itemHeight[i] && this.currentHeight < this.itemHeight[i + 1]) {
            return i
          }
        }
      },
      selectedFoods: function () {
        var selectedFoods = []
        this.goods.forEach(item => {
          item.foods.forEach(food => {
            if (food.count > 0) {
              selectedFoods.push(food)
            }
          })
        })
        return selectedFoods
      }
    }
  }
</script>

<style lang='scss'>
  .goods {
    position: absolute;
    left: 0;
    top: 175px;
    bottom: 0;
    width: 100%;
    .goods-content {
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 48px;
      left: 0;
      display: flex;
      .main-list {
        flex: 0 0 80px;
        width: 80px;
        overflow: hidden;
        .list {
          background-color: #f3f5f7;
          .good-item {
            padding: 0 12px;
            height: 54px;
            font-size: 0;
            cursor: pointer;
            .support-wrapper {
              border-bottom: 1px solid rgba(7,17,27,.1);
              height:100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              .support {
                .desc {
                  font-weight: 200;
                  color: rgb(20,20,20);
                  line-height: 14px;
                  font-size: 12px;
                }
              }
            }
          }
          .good-item.active {
            position: relative;
            top: -2px;
            background-color: #fff;
            .support-wrapper {
              border: none;
              .support {
                .desc {
                  color: rgb(0,0,0);
                }
              }
            }
          }
          .good-item:last-child {
            border: none;
          }
        }
      }
      .goods-list {
        flex: 1;
        overflow: hidden;
        .goods-sort {
          .goods-sort-item {
            .title {
              font-size: 12px;
              line-height: 26px;
              color: rgb(147,153,159);
              background-color: #f3f5f7;
              border-left: 2px solid #d9dde1;
              font-weight: 700;
              padding-left: 14px;
            }
            .food-list {
              padding: 0 18px;
              .food-item:last-child {
                border: none;
              }
              .food-item {
                border-bottom: 1px solid rgba(7,17,27,.1);
                cursor: pointer;
                .content {
                  display: flex;
                  padding: 18px 0;
                  .left {
                    flex: 0 0 57px;
                    margin-right: 10px;
                    .avatar {
                      border-radius: 4px;
                    }
                  }
                  .right {
                    flex: 1;
                    font-size: 0;
                    position: relative;
                    .name {
                      font-size: 14px;
                      line-height: 14px;
                      color: rgb(7,17,27);
                      font-weight: 700;
                      margin-top: 2px;
                      margin-bottom: 8px;
                    }
                    .text {
                      display: inline-block;
                      font-size: 10px;
                      line-height: 10px;
                      color: rgb(147,153,159);
                    }
                    .desc {
                      width: 40%;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      height: 10px;
                    }
                    .line {
                      margin-top: 8px;
                      .count {
                        margin-right: 12px;
                      }
                    }
                    .price {
                      font-size: 0;
                      margin-top: 8px;
                      .now {
                        display: inline-block;
                        font-size: 16px;
                        line-height: 24px;
                        font-weight: 700;
                        color: rgb(240,20,20);
                        margin-right: 8px;
                      }
                      .now::before {
                        content: '￥';
                        font-size: 10px;
                        line-height: 24px;
                        color: rgb(240,20,20);
                      }
                      .old {
                        display: inline-block;
                        font-size: 10px;
                        color: rgb(147,153,159);
                        font-weight: 700;
                        line-height: 24px;
                        text-decoration: line-through;
                        margin-right: 8px;
                      }
                      .old::before {
                        content: '￥';
                        font-size: 10px;
                        color: rgb(147,153,157);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
   }
  }
</style>
