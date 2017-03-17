<template>
  <div class="buycart">
    <div class="content" @click="toggleList">
      <div class="left-wrapper" :class="{highlight:totalCount>0}">
        <div class="logo">
            <span class="logo-wrapper">
              <i class="icon-shopping_cart"></i>
            </span>
          <span v-show='totalCount' class="count">{{totalCount}}</span>
          <transition-group name='drop' tag="div" class="ball-container"
                            v-on:before-enter="beforeEnter"
                            v-on:enter="enter"
                            v-on:after-enter="afterEnter"
            >
            <div class="ball" v-for="(ball,index) in balls" v-show="ball.show" :key="index">
              <div class="inner inner-hook"></div>
            </div>
          </transition-group>
        </div>
        <span class="totalprice">￥{{totalPrice}}</span>
        <span class="desc">另需配送费{{seller.deliveryPrice}}元</span>
      </div>
      <div @click.stop.prevent='goToBuy' class="right-wrapper" :class="{highlight:totalPrice>=seller.minPrice}">{{buyInfo}}</div>
    </div>

    <transition name="fold">
      <div v-show='listShow' class="foods-detail">
        <div class="header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="detail-content" ref="detail">
          <ul class="foods-ul">
            <li class='food-item' v-for="item in foods">
              <div class="wrapper">
                <span class="name">{{item.name}}</span>
                <span class="price">{{item.price}}</span>
                <cartcontrol @foodadd='foodadd' :food="item"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import BScroll from 'better-scroll'
  export default {
    data: function () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true  // 折叠状态
      }
    },
    props: {
      seller: {
        type: Object,
        default: function () {
          return {}
        }
      },
      foods: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    computed: {
      totalPrice: function () {
        let total = 0
        this.foods.forEach((item) => {
          total += item.count * item.price
        })
        return total
      },
      buyInfo: function () {
        if (this.totalPrice === 0) {
          return `${this.seller.minPrice}起送`
        } else if (this.totalPrice < this.seller.minPrice) {
          return `还差${this.seller.minPrice - this.totalPrice}元`
        }
        return '马上下单'
      },
      totalCount: function () {
        let total = 0
        this.foods.forEach((item) => {
          total += item.count
        })
        return total
      },
      listShow: function () {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (this.scroll === undefined) {
              this.scroll = new BScroll(this.$refs.detail, {click: true})
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      foodadd: function (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter: function (el) {
        let count = this.dropBalls.length
//        if (count--) {
        while (count--) {
          let ball = this.dropBalls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 32)
            el.style.display = ''
            el.style.transform = `translate3d(0,${y}px,0)`
            el.style.webkitTransform = `translate3d(0,${y}px,0)`

            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.transform = `translate3d(${x}px,0,0)`
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter: function (el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.transform = 'translate3d(0,0,0)'
          el.style.webkitTransform = 'translate3d(0,0,0)'

          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.transform = 'translate3d(0,0,0)'
          inner.style.webkitTransform = 'translate3d(0,0,0)'
        })
      },
      afterEnter: function (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      toggleList: function () {
        if (this.totalCount === 0) {
          return
        }
        this.fold = !this.fold
      },
      empty: function (event) {
        let len = this.foods.length
        for (var i = 0; i < len; i++) {
          this.foods[i].count = 0
        }
      },
      goToBuy: function () {
        if (this.totalPrice < this.seller.minPrice) {
          return
        }
        window.alert('确认支付' + this.totalPrice + '元')
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang='scss'>
  .drop-enter-active {
    transition: all .4s cubic-bezier(.49, -.29, .75, .41);
  }
  .buycart {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 48px;
    font-size: 0;
    .content {
      display: flex;
      width: 100%;
      background-color: #141d27;
    cursor: pointer;
  .left-wrapper {
      flex: 1;
      height: 100%;
      padding-left: 68px;
      .logo {
        position: absolute;
        top: -10px;
        left: 15px;
        display: inline-block;
        width: 44px;
        height: 44px;
        padding: 6px;
        background-color: #141d27;
        border-radius: 50%;
        text-align: center;
        .logo-wrapper {
          display: block;
          width: 44px;
          height: 44px;
          font-size: 24px;
          line-height: 44px;
          color: rgba(255,255,255,.4);
          background-color: #2B343C;
          border-radius: 50%;
        }
        .count {
          position: absolute;
          width: 30px;
          padding: 6px 0;
          right: 0;
          top: 0;
          font-size: 9px;
          line-height: 10px;
          font-weight: 700;
          border-radius: 30px;
          color: #fff;
          background-color: rgb(240, 20, 20);
          box-shadow: 0 0 5px #666;
        }
        .ball-container {
          .ball {
            position: fixed;
            bottom: 22px;
            left: 32px;
            z-index: 500;
            .inner{
              width: 16px;
              height: 16px;
              background-color: rgb(0, 160, 240);
              border-radius: 50%;
              transition: transform .4s linear;
            }
          }
        }
      }
      .totalprice {
        display: inline-block;
        padding: 0 12px 0 12px;
        font-size: 14px;
        line-height: 24px;
        margin-top: 12px;
        color: rgba(255,255,255,.4);
        font-weight: 700;
        border-right: 1px solid rgba(255,255,255,.1);
      }
      .desc {
        font-weight: 200;
        line-height: 48px;
        font-size: 12px;
        color: rgba(255,255,255,.4);
        padding-left: 12px;
      }
    }
    .left-wrapper.highlight {
      .logo {
        .logo-wrapper {
          background-color: rgb(0,160,240);
          color: #fff;
        }
      }
      .totalprice {
        color: #fff;
      }
    }
    .right-wrapper {
      flex: 0 0 115px;
      width: 115px;
      height: 100%;
      background-color: #2B333B;
      line-height: 48px;
      font-size: 12px;
      color: rgba(255,255,255,.4);
      font-weight: 700;
      text-align: center;
    }
    .right-wrapper.highlight {
      background-color: rgba(0, 255, 0,.3);
      color: #fff;
    }
  }
    .foods-detail {
      position: absolute;
      left: 0;
      bottom: 48px;
      width: 100%;
      max-height: 258px;
      z-index: -1;
      background-color: #fff;
      overflow: hidden;
      .header {
        height: 100%;
        padding: 0 18px;
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7,17,27,.1);
        .title {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
        }
        .empty {
          position: absolute;
          right: 18px;
          top: 0;
          line-height: 40px;
          font-size: 14px;
          color: rgb(0,160,240);
          cursor: pointer;
        }
      }
      .detail-content {
        max-height: 218px;
        overflow: hidden;
        .foods-ul {
          padding: 0 18px;
          .food-item {
            padding: 12px 0;
            border-bottom: 1px solid rgba(7,17,27,.1);
            .wrapper {
              position: relative;
              .name {
                font-size: 14px;
                line-height: 24px;
                color: rgb(7,17,27);
              }
              .price {
                position: absolute;
                right: 86px;
                top: 0;
                font-size: 14px;
                font-weight: 700;
                line-height: 24px;
                color: rgb(240,20,20);
              }
              .price::before {
                content: '￥';
                font-size: 10px;
                font-weight: normal;
                line-height: 24px;
                color: rgb(240,20,20);
              }
              .cartcontrol {
                bottom: -4px;
              }
            }
          }
        .food-item:last-child {
          border: none;
        }
      }
    }
  }
 }
  .fold-enter-active,
  .fold-leave-active {
    transition: transform .3s ease;
  }
  .fold-enter,
  .fold-leave-active {
    transform: translate3d(0,100%,0);
  }

</style>
