<template>
    <div class="cartcontrol">
      <transition name="move">
        <span v-show='food.count > 0' class="remove" @click.stop.prevent="remove"><i class="icon-remove_circle_outline"></i></span>
      </transition>
      <transition name="showhide">
        <span v-show='food.count > 0' class="count">{{food.count}}</span>
      </transition>
      <span class="add" @click.stop.prevent="add"><i class="icon-add_circle"></i></span>
    </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    food: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    add: function (event) {
      if (event._constructed) {
        if (this.food.count === undefined) {
          this.$set(this.food, 'count', 0)
        }
        ++this.food.count
        this.$emit('foodadd', event.target) // 触发添加食物事件
      }
    },
    remove: function (event) {
      if (event._constructed && this.food.count) {
        --this.food.count
      }
    }
  },
  computed: {
  }
}
</script>

<style lang='scss'>
  .cartcontrol {
    position: absolute;
    right: 0;
    bottom: 0;
    .move-enter-active,
    .move-leave-active {
      transition: transform .3s;
    }
    .move-enter,
    .move-leave-active {
      transform: translate3d(46px,0,0) rotate3d(0,0,1,720deg);
    }
    .showhide-enter-active,
    .showhide-leave-active {
      transition: opacity .3s linear .1s;
    }
    .showhide-enter,
    .showhide-leave-active {
      opacity: 0;
    }
    .remove,
    .add {
      display: inline-block;
      width: 24px;
      height: 24px;
      color: rgb(0,160,220);
      font-size: 24px;
      line-height: 24px;
      padding: 4px;
      vertical-align: middle;
      cursor: pointer;
    }
    .count {
      display: inline-block;
      width: 14px;
      text-align: center;
      font-size: 10px;
      line-height: 24px;
      color: rgb(147,153,159);
      vertical-align: middle;
    }

  }
</style>
