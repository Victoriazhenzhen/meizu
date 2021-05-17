<!-- categoryList里的图片组件 -->
<template>
<!-- 通过type值来选择使用哪套样式 -->
<div :class="{'images-wrapper': type === 'small', 'images-wrapper_big': type === 'big'}">
  <!-- 根据索引值来切换 -->
  <img class="img" :src="data[activeIndex]" alt="">
  <ul class="imgs">
    <li class="imgs-item" v-for="(item,index) in data" @click="changeImage(index)" :key="index" :class="{'active': activeIndex === index}">
      <img :src="item" alt="">
    </li>
  </ul>
</div>
</template>

<script>
export default {
    name:"images-list",
    props:{
      data:{
        type:Array,
        default(){
          return []
        }
      },
      // 因为等会别的地方还要用到这个组件 只是样式不同 所以我们根据类型去判断用哪个样式的组件
      type:{
        type:String,
        default:"small"
      }
    },
    data(){
      return{
        activeIndex:0
      }
    },
    methods:{
      changeImage(index){
        this.activeIndex = index
      }
    }
}
</script>
<style lang = 'less' scoped>
/* 第一套small样式 */
  .images-wrapper{
    text-align: center;
    .img{
      height: 230px;
      margin-top: 20px;
    }
    .imgs{
      overflow: hidden;
      margin: 13px auto 15px;
      .imgs-item{
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 4px;
        margin: 0 4px;
        border: 1px solid #EFEFEF;
        cursor: pointer;

        &.active{
          border-color: #bdbdbd;
        }
        img{
        width: 40px;
        height: 40px;
      }
      }
    }
  }
  /* 第二套big样式 */
  .images-wrapper_big{
    text-align: center;
    .img{
      height: 375px;
      margin: 20px auto;
    }
    .imgs{
      overflow: hidden;
      margin-top: 10px;
      .imgs-item{
        display: inline-block;
        width: 75px;
        height: 75px;
        border-radius: 4px;
        margin: 0 5px;
        border: 1px solid transparent;
        cursor: pointer;

        &.active{
          border-color: #dcdcdc;
        }
        img{
        width: 75px;
        height: 75px;
      }
      }
    }
  }
</style>