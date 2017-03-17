<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tabs">
      <router-link :to='{name:"Goods"}' class="tab-item">商品</router-link>
      <router-link :to='{name:"Ratings"}' class="tab-item">评价</router-link>
      <router-link :to='{name:"Seller"}' class="tab-item">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue'
  import NumStatus from './common/js/NumStatus.js'

  export default {
    name: 'app',
    data: function () {
      return {
        seller: {
          id: '1101'
        }
      }
    },
    components: {
      'v-header': header
    },
    created: function () {
      // 从服务器获取数据
      this.$http.get('./api/seller')
        .then(response => {
          if (response.data.errno === NumStatus.ERR_OK) {
//            this.seller = response.data.data
            this.seller = Object.assign(response.data.data, this.seller)
            console.log(this.seller)
          } else {
            console.err('拿不到数据')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: hidden;

  .tabs {
    display: flex;
    height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);

  .tab-item {
    display: inline-block;
    flex: 1;
    height: 40px;
    text-align: center;
    font-size: 14px;
    line-height: 40px;
    color: rgb(20, 20, 20);
    cursor: pointer;
  }

  .tab-item.active {
    color: rgb(240, 20, 20)
  }

  }
  }
</style>
