<template>
    <div class="linetitle">
        <span class="line"></span>
        <h3 v-if='title' class="title">{{title}}</h3>
        <span class="line"></span>
    </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang='scss'>
.linetitle {
    display: flex;
    .line {
        flex: 1;
        height: 0;
        border-bottom: 1px solid rgba(255,255,255,.2);
        position: relative;
        top: 6px;
    }
    .title {
        display: inline-block;
        font-size: 14px;
        line-height: 14px;
        color: #fff;
        font-weight: 700;
        margin: 0 12px;
    }
}
</style>
