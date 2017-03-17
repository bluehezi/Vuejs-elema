<template>
    <div class="star">
      <span v-for="item in getClassArr" :class='item' class="star-item"></span>
    </div>
</template>

<script type='text/ecmascript-6'>
  const LENGTH = 5
  export default {
    props: {
      size: {
        type: Number,
        default: 36
      },
      score: {
        type: Number,
        default: 0
      }
    },
    computed: {
      getClassArr: function () {
        let integer = Math.floor(this.score)
        let round = Math.floor(this.score + 0.5)
        let tempClass = []
        while (tempClass.length < integer) {
          tempClass.push('size-' + this.size + '-on')
        }
        if (this.score % 1 !== 0) {
          tempClass.push('size-' + this.size + (round > integer ? '-half' : '-off'))
        }
        while (tempClass.length < LENGTH) {
          tempClass.push('size-' + this.size + 'off')
        }
        return tempClass
      }
    }
  }
</script>

<style lang='scss'>
  .star {
    .star-item {
      display: inline-block;
      margin: 0 10px;
    }
    .star-item.size-24-off {
      width: 10px;
      height: 10px;
      background: url("./star24_off@3x.png") no-repeat;
      background-size: 10px 10px;
    }
    .star-item.size-24-on {
      width: 10px;
      height: 10px;
      background: url("./star24_on@3x.png") no-repeat;
      background-size: 10px 10px;
    }
    .star-item.size-24-half {
      width: 10px;
      height: 10px;
      background: url("./star24_half@3x.png") no-repeat;
      background-size: 10px 10px;
    }

    .star-item.size-36-off {
      width: 15px;
      height: 15px;
      background: url("./star36_off@3x.png") no-repeat;
      background-size: 15px 15px;
    }
    .star-item.size-36-on {
      width: 15px;
      height: 15px;
      background: url("./star36_on@3x.png") no-repeat;
      background-size: 15px 15px;
    }
    .star-item.size-36-half {
      width: 15px;
      height: 15px;
      background: url("./star36_half@3x.png") no-repeat;
      background-size: 15px 15px;
    }

    .star-item.size-48-off {
      width: 20px;
      height: 20px;
      background: url("./star48_off@3x.png") no-repeat;
      background-size: 20px 20px;
    }
    .star-item.size-48-on {
      width: 20px;
      height: 20px;
      background: url("./star48_on@3x.png") no-repeat;
      background-size: 20px 20px;
    }
    .star-item.size-48-half {
      width: 20px;
      height: 20px;
      background: url("./star48_half@3x.png") no-repeat;
      background-size: 20px 20px;
    }
  }

</style>
