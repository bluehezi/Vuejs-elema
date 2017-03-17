<template>
    <div class="seller" ref="seller">
      <div class="seller-content">
        <div class="overview">
          <div class="top">
            <h3 class="name">{{seller.name}}</h3>
            <div class="line">
              <star :size="36" :score="seller.score"></star>
              <span class="count">月售{{seller.sellCount}}单</span>
            </div>
            <div class="collect" @click="__toCollect">
              <span class="icon" :class="{active: collectStatus}"><i class="icon-favorite"></i></span>
              <span class="text">{{collectStatus ? '已收藏' : '收藏'}}</span>
            </div>
          </div>
          <div class="bottom">
            <div class="item">
              <h4 class="title">起送价</h4>
              <span class="price">{{seller.minPrice}}</span>
            </div>
            <div class="item">
              <h4 class="title">商家配送</h4>
              <span class="price">{{seller.deliveryPrice}}</span>
            </div>
            <div class="item">
              <h4 class="title">平均配送时间</h4>
              <span class="time">{{seller.deliveryTime}}</span>
            </div>
          </div>
        </div>
        <split></split>
        <div class="activities">
          <h3 class="title">公告与活动</h3>
          <p class="bulletin">{{seller.bulletin}}</p>
          <div class="supports" v-if="seller.supports">
            <support v-for="(item,index) in seller.supports" :key='index' :supportType="item.type" :supportDesc="item.description"></support>
          </div>
        </div>
        <split></split>
        <div class="pics">
          <h3 class="title">商家实景</h3>
          <div class="sight" ref="sight">
            <ul class="pics-list" ref="picslist">
              <li class="pic-item" v-for="item in seller.pics"><img :src="item" width="120px" height="90px"/></li>
            </ul>
          </div>
        </div>
        <split v-if="seller.infos"></split>
        <div class="infos" v-if="seller.infos">
          <h3 class="title">商家信息</h3>
          <ul class="infos-list">
            <li class="info-item" v-for="item in seller.infos">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type='text/ecmascript-6'>
  import star from '../star/star.vue'
  import split from '../split/split.vue'
  import support from '../support/support.vue'
  import BScroll from 'better-scroll'
  import {loadFromLocal, setToLocal} from '../../common/js/storage.js'
  export default {
    data: function () {
      return {
        collectStatus: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false)
        })()
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
      support
    },
    methods: {
      __calculateWidth: function () {  // 实景图片不一定有几个，所以需要动态计算
        let picWidth = 120
        let marginR = 6
        let pics = this.seller.pics
        if (pics) {
          let width = (picWidth + marginR) * pics.length - marginR
          this.$refs.picslist.style.width = width + 'px'
        }
      },
      __initScroll: function () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          })
          this.picsScroll = new BScroll(this.$refs.sight, {
            scrollY: false,
            scrollX: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      __initPicsScroll: function () {
        if (!this.picsScroll) {
          this.picsScroll = new BScroll(this.$refs.sight, {
            scrollY: false,
            scrollX: true
          })
        } else {
          this.picsScroll.refresh()
        }
      },
      __toCollect: function (event) {
        if (event._constructed) {
          this.collectStatus = !this.collectStatus
          setToLocal(this.seller.id, 'favorite', this.collectStatus)
        }
      }
    },
    created: function () {
      this.$nextTick(() => {
        this.__calculateWidth()
        this.__initScroll()
        this.__initPicsScroll()
      })
    },
    updated: function () {
      this.$nextTick(() => {
        this.__calculateWidth()
        this.__initScroll()
        this.__initPicsScroll()
      })
    }
  }
</script>

<style lang='scss'>
.seller {
  position: absolute;
  top: 175px;
  bottom: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  font-size: 0;
  .seller-content {
    .overview {
      padding: 0 18px;
      .top {
        position: relative;
        padding: 18px 0;
        border-bottom: 1px solid rgba(7,17,27,.1);
        .name {
          font-size: 14px;
          line-height: 14px;
          color: rgb(7,17,27);
          font-weight: 700;
        }
        .line {
          margin-top: 8px;
          .star {
            display: inline-block;
            vertical-align: top;
          .star-item {
              margin: 0;
              margin-right: 8px;
            }
          }
          .count {
            vertical-align: top;
            margin-left: 6px;
            font-size: 10px;
            line-height: 18px;
            color: rgb(77,85,93);
          }
        }
        .collect {
          position: absolute;
          right: 8px;
          bottom: 18px;
          text-align: center;
          width: 50px;
          .icon {
            display: block;
            font-size: 24px;
            line-height: 24px;
            color: rgb(77,85,93);
            margin-bottom: 4px;
          }
          .icon.active {
            color: rgb(240,20,20);
          }
          .text {
            display: block;
            font-size: 10px;
            line-height: 10px;
            color: rgb(77,85,93);
          }
        }
      }
      .bottom {
        display: flex;
        flex-direction: row;
        padding: 18px 0;
        .item {
          flex:1 ;
          text-align: center;
          border-right:1px solid rgba(7,17,27,.1);
          .title {
            font-size: 10px;
            line-height: 10px;
            font-weight: 200;
            color: rgb(147,153,159);
            margin-bottom: 4px;
          }
          .price,.time {
            font-size: 24px;
            line-height: 24px;
            font-weight: 200;
            color: rgb(7,17,27);
          }
          .price::after {
            content: '元';
            font-size: 10px;
            line-height: 24px;
            color: rgb(7,17,27);
          }
          .time::after {
            content: '分钟';
            font-size: 10px;
            line-height: 24px;
            color: rgb(7,17,27);
          }
        }
        .item:last-child {
          border: none;
        }
      }
    }
    .activities {
      padding: 18px;
      .title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7,17,27);
        font-weight: 700;
      }
      .bulletin {
        font-size: 14px;
        line-height: 24px;
        color: rgb(240,20,20);
        font-weight: 200;
        padding: 8px 12px 16px 12px;
      }
      .supports {
        .support {
          display: block;
          padding: 16px 12px;
          border-top: 1px solid rgba(7,17,27,.1);
          .desc {
            color: rgb(7,17,27);
            line-height: 16px;
            font-size: 12px;
          }
          .icon {
            width: 16px;
            height: 16px;
            background-size: 16px 16px !important;
          }
        }
      }
    }
    .pics {
      padding: 18px;
      .title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7,17,27);
        font-weight: 700;
        margin-bottom: 12px;
      }
      .sight {
        width: 100%;
        .pics-list {
          height: 90px;
          white-space: nowrap;
          overflow: hidden;
          .pic-item {
            display: inline-block;
            margin-right: 6px;
          }
        }
      }
    }
    .infos {
      padding: 18px;
      .title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7,17,27);
        font-weight: 700;
        margin-bottom: 12px;
      }
      .infos-list {
        .info-item {
          font-size: 12px;
          line-height: 16px;
          font-weight: 200;
          color: rgb(7,17,27);
          border-top: 1px solid rgba(7,17,27,.1);
          padding: 16px 12px;
        }
      }
    }
  }
}
</style>
