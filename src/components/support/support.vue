<template>
    <div class="support">
      <span v-if='typeClass' class="icon" :class="typeClass"></span>
      <span class="desc">{{supportDesc}}</span>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data: function () {
      return {
        typeArr: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    props: {
      supportType: {
        type: Number,
        default: 0
      },
      supportDesc: {
        type: String
      }
    },
    computed: {
      typeClass: function () {
        return this.typeArr[this.supportType]
      }
    }
  }
</script>

<style lang="scss">
  .support {
    .icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      vert-align: top;
      margin-right: 4px;
    }
    .desc {
      font-size: 10px;
      line-height: 12px;
      font-weight: 200;
      color: #ffffff;
      vertical-align: top;
    }
    .icon.decrease {
      background: url("./decrease_1@2x.png") no-repeat;
      background-size: 12px 12px;
    }
    .icon.discount {
      background: url("./discount_1@2x.png") no-repeat;
      background-size: 12px 12px;
    }
    .icon.guarantee {
      background: url("./guarantee_1@2x.png") no-repeat;
      background-size: 12px 12px;
    }
    .icon.invoice {
      background: url("./invoice_1@2x.png") no-repeat;
      background-size: 12px 12px;
    }
    .icon.special {
      background: url("./special_1@2x.png") no-repeat;
      background-size: 12px 12px;
    }
    @media screen and (min-device-pixel-ratio: 3.0) {
      .icon.decrease {
        background: url("./decrease_1@3x.png") no-repeat;
        background-size: 12px 12px;
      }
      .icon.discount {
        background: url("./discount_1@3x.png") no-repeat;
        background-size: 12px 12px;
      }
      .icon.guarantee {
        background: url("./guarantee_1@3x.png") no-repeat;
        background-size: 12px 12px;
      }
      .icon.invoice {
        background: url("./invoice_1@3x.png") no-repeat;
        background-size: 12px 12px;
      }
      .icon.special {
        background: url("./special_1@3x.png") no-repeat;
        background-size: 12px 12px;
      }
    }
  }
</style>
