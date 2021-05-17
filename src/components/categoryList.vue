<template>
<div>
  <!-- 从goodsList里粘贴过来的 然后做下修改即可 -->
  <!-- 点击后跳转详情页  注意不能直接在这里子组件内跳转 要在其父级内点击跳转事件  因为不同的父组件引用这个子组件后跳转不同的页面 -->
  <ul v-if="data.length > 0 " class="clearfix">
  <!--  并不是每个li的最后一个子元素都不需要右边距  我们要通过计算才能知道 
  当(index+1)%4 === 0 时才不需要右边距  因为index从0开始的  除以4的余数等于0时才不需要  -->
    <li @click= "clickItem(item)" class="goods-list" v-for="(item,index) in data" :key="index" :class="{'last-child': ( index+ 1) % 4 === 0}">
      <a :href="item.href">
        <!-- 这里引入imagesList.vue里的图片组件 -->
        <images-list :data = 'item.colorImageUrls'></images-list>
        <div class="goods-name">{{item.goodsName}}</div>
        <div class="goods-desc">{{item.goodsDesc}}</div>
        <div class="goods-price">
          <i>￥</i>
          {{item.goodsPrice}}
          <span  class="goods-lower" v-if="item.lower">起</span>
          <span class="goods-oldprice" v-if="item.oldPrice">{{item.oldPrice}}</span>
        </div>
      </a>
      <!-- 是否是新品 要用到绝对定位 所以放到与a同级 -->
      <div class="goods-new" v-if="item.newProduct">新品</div>
    </li>
  </ul>

  <!-- 筛选后没有数据的dom结构 -->
  <div v-else class="clearfix empty">
    <div class="fl empty-bg"></div>
    <div class="fr empty-desc">
      <div class="title">抱歉没有找到相关商品</div>
        <p>
          建议您：<br>
          1.适当减少筛选条件 <br>
          2.尝试其他条件
        </p>
    </div>
  </div>
</div>
</template>

<script>
// 引入图片组件
import imagesList from './imagesList'
export default {
  name:'category-list',
  components:{
    imagesList
  },
  props:{
    data:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    clickItem(item){
      this.$emit('clickItem',item)
    }
  }
}
</script>

<style lang = 'less' scoped>
  .goods-list{
  float: left;
  width: 303px;
  height: 416px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  margin-top: 10px;
  margin-right: 9px;
  transition: all .3 ease;
  overflow: hidden;
  text-align: center;
  
  &:hover{
    box-shadow: 0 15px 30px rgba(0,0,0,.1);
  }
  /* 并不是每个li的最后一个子元素都不需要右边距  我们要通过计算才能知道 当(index+1)%4 === 0 时才不需要右边距  因为index从0开始的  除以4的余数等于0时才不需要 */
  &.last-child{
    margin-right: 0;
  }
}
  .goods-img{
    height: 230px;
    margin-top: 30px;
  }

  .goods-name{
    margin-bottom: 2px;
    color: #333;
    font-size: 14px;
  }

  .goods-desc{
    font-size: 12px;
    color: #999;
  }

  .goods-price{
    position: relative;
    display: inline-block;
    padding-left: 14px;
    font-size: 18px;
    color: #c00;

    i{
      font-style: normal;
      font-size: 14px;
      position: absolute;
      left: 0;
      top: 5px;
    }

    .goods-lower{
      font-size: 12px;
    }

    .goods-oldprice{
      text-decoration: line-through;
      color: #666;
      font-size: 14px;
      margin-left: 8px;
    }
  }
.goods-new{
    position: absolute;
    left: 30px;
    top: 30px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 50%;
    /* 渐变背景 */
    background: linear-gradient(120deg,#2e74f6,#56bdf9);
    color: #fff;
  }
  /* 筛选后没有数据的样式 */
.empty{
  width: 335px;
  margin: 120px auto 380px;
  .empty-bg{
    background: url('../assets/images/xiongmao.png') no-repeat;
    width: 105px;
    height: 135px;
    margin-right: 30px;
  }
  .empty-desc{
    width: 200px;

    .title{
      font-size: 18px;
      color: #00c3f5;
      padding: 15px 0 15px;
    }
  }
}
</style>