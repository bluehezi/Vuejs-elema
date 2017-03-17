<template>
    <div class="ratings" ref="ratings">
      <div class="content">
        <div class="overview">
          <div class="left">
            <span class="score">{{seller.score}}</span>
            <span class="text">综合评分</span>
            <span class="rate">高于周边商家{{seller.rankRate}}%</span>
          </div>
          <div class="right">
            <div class="line">
              <span class="name">服务态度</span><star :size="36" :score="seller.serviceScore"></star>
            </div>
            <div class="line">
              <span class="name">食物评分</span><star :size="36" :score="seller.foodScore"></star>
            </div>
            <div class="line">
              <span class="name">送达时间</span><span class="time">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <div class="ratings-content">
          <selects :selectedType="selectedType" :onlyContent="onlyContent"
                   @onlychange="onlychange"
                   @typechange="typechange"></selects>
          <ul class="ratings-list">
            <li class="rating-item" v-for="item in ratings" v-show="toShow(item.text,item.rateType)">
              <div class="wrapper">
                <div class="avatar">
                  <img :src="item.avatar" width="28px" height="28px"/>
                </div>
                <div class="infos">
                  <span class="username">{{item.username}}</span>
                  <div class="line">
                    <star :size="24" :score="item.score"></star>
                    <span v-if='item.deliveryTime' class="time">{{item.deliveryTime}}分钟送达</span>
                  </div>
                  <p class="text">{{item.text}}</p>
                  <div class="recommend">
                    <span class="thumb"><i :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></i></span>
                    <span v-for='recom in item.recommend' class="item">{{recom}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type='text/ecmascript-6'>
  import star from '../star/star.vue'
  import split from '../split/split.vue'
  import selects from '../selects/selects.vue'
  import BScroll from 'better-scroll'
  const ALL = 2
//  const POSITIVE = 0
//  const NEGATIVE = 1
  export default {
    data: function () {
      return {
        selectedType: ALL,
        onlyContent: false,
        ratings: []
      }
    },
    props: {
      seller: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    components: {
      star,
      split,
      selects
    },
    created: function () {
      this.$http.get('./api/ratings')
        .then(response => {
          if (response.data.errno === 0) {
            this.ratings = response.data.data
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              })
            })
          }
        }).catch(err => {
          console.log(err)
        })
    },
    methods: {
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
        if (this.selectedType === ALL) {
          return true
        } else {
          return type === this.selectedType
        }
      }
    }
  }
</script>

<style lang='scss'>
.ratings {
  position: absolute;
  top:175px;
  bottom: 0;
  left:0;
  width: 100%;
  overflow:hidden;
  .content {

  .overview {
    padding: 18px 0;
    display: flex;
    .left {
      flex: 0 0 137px;
      border-right: 1px solid rgba(7,17,27,.1);
      text-align: center;
      .score {
        display: block;
        font-size: 24px;
        line-height: 28px;
        font-weight: 700;
        color: rgb(255,153,0);
      }
      .text {
        display: block;
        color: rgb(7,17,27);
        font-size: 12px;
        line-height: 12px;
        font-weight: 700;
        margin: 6px 0;
      }
      .rate {
        font-size: 10px;
        line-height: 10px;
        color: rgba(7,17,27,.8);
      }
    }
    .right {
      flex: 1;
      padding-left: 24px;
      .line {
        margin-bottom: 8px;
        .name {
          display: inline-block;
          font-size: 12px;
          line-height: 18px;
          color: rgb(7,17,27);
          vertical-align: top;
          margin-right: 8px;
        }
        .star {
          position: relative;
          top: 2px;
          display: inline-block;
          vertical-align: top;
          .star-item {
            margin: 0 4px;
          }
        }
        .time {
          font-size: 12px;
          line-height: 18px;
          color: rgb(147,153,159);
        }
      }
    }
  }
  .ratings-content {
    .ratings-list {
      padding: 0 18px;
      .rating-item {
        padding: 18px 0;
        border-bottom: 1px solid rgba(7,17,27,.1);
        .wrapper {
          display: flex;
          .avatar {
            flex: 0 0 28px;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            overflow: hidden;
            margin-right: 12px;
          }
          .infos {
            flex: 1;
            .username {
              display: block;
              font-size: 10px;
              line-height: 12px;
              color: rgb(7,17,27);
            }
            .line {
              font-size: 0;
              margin-right: 4px;
              margin-top: 4px;
              margin-bottom: 6px;
              .star {
                display: inline-block;
                .star-item {
                  margin: 0;
                  margin-right: 4px;
                }
              }
              .time {
                font-size: 10px;
                line-height: 12px;
                font-weight: 200;
                color: rgb(147,153,159);
              }
            }
            .text {
              font-size: 12px;
              line-height: 18px;
              color: rgb(7,17,27);
              margin-bottom: 8px;
            }
            .recommend {
              font-size: 0;
              .thumb {
                position: relative;
                top: 3px;
                font-size: 9px;
                line-height: 16px;
                vertical-align:top;
                margin-right: 8px;
                .icon-thumb_up {
                  color: rgb(0,160,220);
                }
                .icon-thumb_down {
                  color: rgb(147,153,159);
                }
              }
              .item {
                vertical-align: top;
                display: inline-block;
                width: 60px;
                font-size: 9px;
                line-height: 16px;
                color: rgb(147,153,159);
                background-color: #fff;
                border: 1px solid rgba(7,17,27,.1);
                border-radius: 2px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: center;
                margin-right: 8px;
                margin-bottom: 2px;
                cursor: pointer;
              }
            }
          }
        }
      }
      .rating-item:last-child {
        border: none;
      }
    }
  }
}
}

</style>
