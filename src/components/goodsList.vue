<template>
  <ul class="clearfix">
  <!--  并不是每个li的最后一个子元素都不需要右边距  我们要通过计算才能知道 
  当(index+1)%4 === 0 时才不需要右边距  因为index从0开始的  除以4的余数等于0时才不需要  -->
    <li class="goods-list" v-for="(item,index) in data" :key="index" :class="{'last-child': ( index+ 1) % 4 === 0}">
      <a :href="item.href">
        <img class="goods-img" :src="item.goodsUrl" alt="">
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
</template>

<script>
export default {
  name:'goods-List',
  props:{
    data:{
      type:Array,
      // 默认数据是空  注意组件的数据参数必须是个函数
      default(){
        return []
      }
    }
  }
}
</script>

<style lang = 'less' scope>
.goods-list{
  float: left;
  width: 303px;
  height: 400px;
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
    margin-top: 30px;
    margin-bottom: 2px;
    color: #333;
    font-size: 16px;
  }

  .goods-desc{
    font-size: 14px;
    color: #999;
  }

  .goods-price{
    position: relative;
    display: inline-block;
    padding-left: 14px;
    font-size: 22px;
    color: #c00;

    i{
      font-style: normal;
      font-size: 14px;
      position: absolute;
      left: 0;
      top: 5px;
    }

    .goods-lower{
      font-size: 14px;
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



</style>