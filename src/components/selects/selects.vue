<template>
    <div class="selects">
      <div class="options">
        <span @click='select(2,$event)' class="option positive" :class="{active:type===2}">{{optionDesc.all}}</span>
        <span @click='select(0,$event)' class="option positive" :class="{active:type===0}">{{optionDesc.positive}}</span>
        <span @click='select(1,$event)' class="option negative" :class="{active:type===1}">{{optionDesc.negative}}</span>
      </div>
      <div class="onlyContent" @click="onlyc">
        <span class="icon" :class="{active:only}">
          <i class="icon-check_circle"></i>
        </span>
        <span class="desc">只看有内容的评价</span>
      </div>
    </div>
</template>

<script type='text/ecmascript-6'>
//  const POSITIVE = 0
//  const NEGATIVE = 1
//  const ALL = 2
  import NumStatus from '../../common/js/NumStatus.js'

  export default {
    data: function () {
      return {
        type: NumStatus.ALL,
        only: false
      }
    },
    props: {
      optionDesc: {
        type: Object,
        default: function () {
          return {
            positive: '满意',
            negative: '不满意',
            all: '全部'
          }
        }
      },
      selectedType: {
        type: Number,
        default: NumStatus.ALL
      },
      onlyContent: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      select: function (t, event) {
        if (event._constructed) {
          this.type = t
          this.$emit('typechange', this.type)
        }
      },
      onlyc: function (event) {
        if (event._constructed) {
          this.only = !this.only
          this.$emit('onlychange', this.only)
        }
      }
    },
    created: function () {
      this.type = this.selectedType
      this.only = this.onlyContent
    }
  }
</script>

<style lang='scss'>
.selects {
  font-size: 0;
  .options {
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 1px solid rgba(7,17,27,.1);
    .option {
      display: inline-block;
      padding: 8px 12px;
      font-size: 12px;
      line-height: 16px;
      color: rgb(77,85,93);
      margin-right: 8px;
      cursor: pointer;
    }
    .option.positive {
      background-color: #CCECF8;
    }
    .option.negative {
      background-color: rgba(77,85,93,.2);
    }
    .option.active {
      background-color: rgb(0,160,220);
      color: #fff;
    }
  }
  .onlyContent {
    padding: 12px 18px;
    font-size: 0;
    color: rgb(147,153,159);
    border-bottom: 1px solid rgba(7,17,27,.1);
    cursor: pointer;
    .icon  {
      font-size: 12px;
      line-height: 12px;
      margin-right: 4px;
    }
    .icon.active {
      color: rgb(0,160,220);
    }
    .desc {
      font-size: 12px;
      line-height: 24px;
    }
  }
}
</style>
