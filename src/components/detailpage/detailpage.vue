<template>
    <transition name="aside-in">
        <div class="detailpage" v-show="showpage" ref="detailpage">
            <div class="page-content">
                <div class="header">
                    <div class="image-wrapper">
                        <img class='image' :src="food.image"/>
                        <span class="back" @click="hide">
                            <i class="icon-arrow_lift"></i>
                        </span>
                    </div>
                    <div class="infos">
                        <h2 class="name">{{food.name}}</h2>
                        <div class="info">
                            <span class="sellcount">月售{{food.sellCount}}份</span>
                            <span v-if='food.rating' class="rating">好评{{food.rating}}%</span>
                        </div>
                        <div class="price">
                            <span class="now">{{food.price}}</span>
                            <span v-if="food.oldPrice" class="old">{{food.oldPrice}}</span>
                        </div>
                        <cartcontrol :food="food" v-on:foodadd="__foodadd"></cartcontrol>
                        <transition name="fade">
                            <span class="addtocart" v-if="!food.count" @click="addfirst">加入购物车</span>
                        </transition>
                    </div>
                </div>
                <split v-if="food.info"></split>
                <div class="good-introduce" v-if="food.info">
                    <h3 class="title">商品介绍</h3>
                    <p class="content">{{food.info}}</p>
                </div>
                <split></split>
                <div class="good-ratings">
                  <h3 class="title">商品评价</h3>
                  <selects :selectedType="selectedType" :onlyContent="onlyContent"
                     @onlychange="onlychange"
                     @typechange="typechange"></selects>
                  <ul class="ratings-list">
                    <li class="rating-item" v-for="rating in food.ratings" v-show="toShow(rating.text,rating.rateType)">
                      <span class="time">{{rating.rateTime | formatTime}}</span>
                      <p class="content">
                        <span class="thumb"><i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i></span>
                        {{rating.text}}
                      </p>
                      <div class="user">
                        <span class="username">{{rating.username}}</span>
                        <img class='avatar' width='12px' height="12px" :src="rating.avatar"/>
                      </div>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type='text/ecmascript-6'>
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import split from '../split/split.vue'
import selects from '../selects/selects.vue'
import BScroll from 'better-scroll'
import {TimeFormat} from '../../common/js/TimeFormat.js'
import NumStatus from '../../common/js/NumStatus.js'
// const POSITIVE = 0
// const NEGATIVE = 1
// const ALL = 2
export default {
  data: function () {
    return {
      showpage: false,
      selectedType: NumStatus.ALL,
      onlyContent: false
    }
  },
  props: {
    food: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    show: function () {
      this.showpage = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.detailpage, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide: function (event) {
      if (event._constructed) {
        this.showpage = false
      }
    },
    addfirst: function (event) {
      if (event._constructed) {
        if (this.food.count === undefined) {
          this.$set(this.food, 'count', 0)
        }
        ++this.food.count
        this.__foodadd(event.target)
      }
    },
    __foodadd: function (target) {
      this.$emit('foodadd', target)
    },
    typechange: function (type) {
      this.selectedType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    onlychange: function (only) {
      this.onlyContent = only
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toShow: function (text, type) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectedType === NumStatus.ALL) {
        return true
      } else {
        return type === this.selectedType
      }
    }
  },
  components: {
    cartcontrol,
    split,
    selects
  },
  filters: {
    formatTime: function (time) {
      let t = new Date(time)
      return TimeFormat(t, 'yyyy-MM-dd hh-mm-ss')
    }
  }
}
</script>

<style lang='scss'>
.detailpage {
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 48px;
    left: 0;
    background-color: #fff;
    .page-content {
        .header {
            font-size: 0;
            .image-wrapper {
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 100%;
                .image {
                    width: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                .back {
                    position: absolute;
                    left: 0;
                    top: 0;
                    font-size: 30px;
                    line-height: 30px;
                    color: rgba(255,255,255,.5);
                    padding: 10px;
                }
                .back:hover {
                    background-color: #666;
                }
            }
            .infos {
                padding:18px;
                position: relative;
                .name {
                    font-size: 14px;
                    line-height: 14px;
                    font-weight: 700;
                    color: rgb(7,17,27);
                }
                .info {
                    padding: 8px 0 18px 0;
                    .sellcount,
                    .rating {
                        font-size: 10px;
                        line-height: 10px;
                        color: rgb(147,153,159);
                    }
                    .sellcount {
                        margin-right: 12px;
                    }
                }
                .price {
                    .old {
                        font-size: 10px;
                        line-height: 10px;
                        font-weight: 700;
                        color: rgb(147,153,159);
                        text-decoration: line-through;
                    }
                    .now {
                        font-size: 14px;
                        line-height: 24px;
                        color: rgb(240,20,20);
                        font-weight: 700;
                        margin-right: 12px;
                    }
                    .now::before,
                    .old::before {
                        content: '￥';
                        font-size: 10px;
                    }
                }
                .addtocart {
                    position: absolute;
                    right: 18px;
                    bottom: 18px;
                    font-size: 12px;
                    line-height: 12px;
                    color: #ffffff;
                    background-color: rgb(0, 160, 220);
                    padding: 6px 12px;
                    border-radius: 12px;
                    cursor: pointer;
                }
                .cartcontrol {
                    right: 18px;
                    bottom: 12px;
                }
            }
        }
        .good-introduce {
            padding: 18px;
            .title {
                font-size: 14px;
                line-height: 14px;
                color: rgb(0,0,0);
                font-weight: 600;
                margin-bottom: 6px;
            }
            .content {
                padding: 0 8px;
                line-height: 24px;
                font-size: 12px;
                color: rgb(77,85,93);
            }
        }
        .good-ratings {
          padding-top: 18px;
          .title {
            font-size: 14px;
            line-height: 14px;
            color: rgb(0,0,0);
            font-weight: 600;
            margin-bottom: 6px;
            padding-left: 18px;
          }
        }
        .ratings-list {
          padding: 0 18px;
          .rating-item {
            padding: 16px 0;
            position: relative;
            border-bottom: 1px solid rgba(7,17,27,.1);
            .time {
              font-size: 10px;
              line-height: 12px;
              color: rgb(147,153,159);
            }
            .content {
              font-size: 12px;
              line-height: 16px;
              color: rgb(7,17,27);
              margin-top: 6px;
              .thumb {
                font-size: 12px;
                line-height: 24px;
                .icon-thumb_up {
                  color: rgb(0,160,220);
                }
                .icon-thumb_down {
                  color: rgb(147,153,159);
                }
              }
            }
            .user {
              position: absolute;
              right: 0;
              top: 16px;
              font-size: 0;
              .username {
                font-size: 10px;
                line-height: 12px;
                color: rgb(147,153,159);
                margin-right: 6px;
              }
              .avatar {
                display: inline-block;
                border-radius: 50%;
              }
            }
          }
          .rating-item:last-child {
            border: none;
          }
        }
    }
}
.aside-in-enter-active,
.aside-in-leave-active {
    transition: transform .3s ease;
}
.aside-in-enter,
.aside-in-leave-active {
    transform: translate3d(100%,0,0);
}
    .fade-enter-active,
    .fade-leave-active {
        transition: transform .3s ease .1s;
    }
    .fade-enter,
    .fade-leave-active {
        transform: scale3d(0,0,1);
    }
</style>

