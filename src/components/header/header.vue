<template>
    <div class="header">
        <div class='content'>
            <div class="avatar-wrapper">
                <img :src="seller.avatar" style='width:64px;height:64px' class="avatar"/>
            </div>
            <div class="content-main">
              <div class="title">
                <span class="brand"></span>
                <h3 class="name">{{seller.name}}</h3>
              </div>
              <div class="line">
                <span class="desc">{{seller.description}}</span>
                <span class="time">&nbsp;/&nbsp;{{seller.deliveryTime}}分钟送达</span>
              </div>
              <support v-if='seller.supports' :supportType="seller.supports[0].type" :supportDesc="seller.supports[0].description"></support>
              <div class="counter" v-if="seller.supports" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
              </div>
            </div>

        </div>
        <div class="bulletin" @click="showDetail">
          <span class="icon"></span><span class="desc">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="bg" ref="bg">
          <img :src="seller.avatar"/>
        </div>

      <transition name="fade-show">
        <div v-show="show" class="detail-page">
          <div class="page-content">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="supports" v-if="seller.supports">
              <linetitle title="优惠信息"></linetitle>
              <div class="support-wrapper">
                <support v-for="(item,index) in seller.supports" :supportType="item.type" :supportDesc="item.description" :key="index"></support>
              </div>
            </div>
            <div class="bulletin-wrapper">
              <linetitle title="商家公告"></linetitle>
              <p class="bulletin-content">{{seller.bulletin}}</p>
            </div>
            <div class="close" @click="hideDetail">
              <i class="icon-close"></i>
            </div>
          </div>
        </div>
      </transition>

    </div>
</template>

<script type='text/ecmascript-6'>
import support from '../support/support.vue'
import star from '../star/star.vue'
import linetitle from '../linetitle/linetitle.vue'

export default {
  data: function () {
    return {
      show: false
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
    support,
    star,
    linetitle
  },
  updated: function () {
//    this.$refs.bg.style.background = `url(${this.seller.avatar}) no-repeat`
//    this.$refs.bg.style.backgroundSize = `100% 100%`
  },
  methods: {
    showDetail: function () {
      this.show = true
    },
    hideDetail: function () {
      this.show = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../common/scss/icon.css";
    .header {
        position: relative;
        background-color: rgba(7,17,27,.5);
        blur: 10px;
        .bg {
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          width: 100%;
          height: 134px;
          /*filter: blur(10px);*/
          img {
            width: 100%;
            height: 134px;
            filter: blur(10px);
          }
        }
        .content {
          display: flex;
          font-size: 0;
          padding: 24px 24px 18px 24px;
          .avatar-wrapper {
              display: inline-block;
              vertical-aligh: top;
            .avatar {
                border-radius: 4px;
              }
          }
          .content-main {
              flex: 1;
              vertical-align: top;
              margin-left: 16px;
              margin-top: 2px;
              display: inline-block;
              position: relative;
              .title {
                .brand {
                      display: inline-block;
                      height: 18px;
                      width: 30px;
                      background: url('./brand@2x.png') no-repeat;
                      background-size: 30px 18px;
                      vertical-align: top;
                      margin-right: 6px;
                      border-radius: 2px;
                    }
                .name {
                      display: inline-block;
                      font-size: 16px;
                      line-height: 18px;
                      font-weight: 700;
                      color: #ffffff;
                      vertical-align: top;
                    }
                }
                .line {
                    margin: 8px 0 10px 0;
                .desc, .time {
                      color: #ffffff;
                      font-size: 12px;
                      line-height: 12px;
                      font-weight: 200;
                    }
                }
              .counter {
                display: inline-block;
                padding: 7px 8px;
                background-color: rgba(0, 0, 0, .2);
                position: absolute;
                right: 0;
                bottom: -4px;
                border-radius: 19px 19px 20px 20px;
                cursor:pointer;
                .count {
                  font-size: 10px;
                  line-height: 12px;
                  color: #fff;
                  font-weight: 200;
                }
                .icon-keyboard_arrow_right {
                  font-size: 10px;
                  color: #fff;
                  line-height: 12px;
                }
              }
            }
        }
        .bulletin {
          height: 28px;
          background-color: rgba(7, 17, 27, .2);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #fff;
          padding: 0 28px 0 12px;
          position: relative;
          cursor:pointer;
          .icon {
            display: inline-block;
            width: 22px;
            height: 12px;
            background: url("./bulletin@2x.png") no-repeat;
            background-size: 22px 12px;
            vertical-align: top;
            position: relative;
            top: 8px;
            margin-right: 4px;
          }
          .desc {
            font-size: 10px;
            line-height: 28px;
            font-weight: 200;
            color: #ffffff;
          }
          .icon-keyboard_arrow_right {
            display: inline-block;
            position: absolute;
            right: 12px;
            top: 6px;
          }
        }

      .detail-page {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background-color: rgba(7, 17, 27, .8);
        overflow-x: hidden;
        overflow-y: auto;
        .page-content {
          min-height: 100%;
          padding: 64px 36px 96px 36px;
          box-sizing: border-box;
          color: #fff;
          text-align: center;
          position: relative;
          .name {
            font-size: 16px;
            line-height: 16px;
            font-weight: 700;
          }
          .star-wrapper {
            padding: 16px 0 28px 0;
          }
          .supports {
            .support-wrapper {
              margin-top: 24px;
              display: inline-block;
              text-align: left;
              .support {
                margin-bottom: 12px;
              }
            }
          }
          .bulletin-wrapper {
            .bulletin-content {
              font-size: 12px;
              font-weight: 200;
              line-height: 24px;
              color: #fff;
              text-align: left;
              padding: 24px 12px;
            }
          }
          .close {
            position: absolute;
            bottom: 32px;
            left: 50%;
            margin-left: -16px;
            font-size: 32px;
            color: rgba(255,255,255,.5);
            line-height: 32px;
            cursor: pointer;
          }
        }
      }
      .fade-show-enter-active,
      .fade-show-leave-active {
        transition: opacity .3s ease, color .3s ease;
      }
      .fade-show-enter,.fade-show-leave-active {
        opacity: 0;
        color: rgba(0,0,0,0);
      }
    }

</style>
