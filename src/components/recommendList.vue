<!-- 这是商品推荐组件 -->
<template>
<div>
  <div class="clearfix recommend-header">
    <h3 class="fl title">推荐商品</h3>
    <div class="fr">
      <i class="icomoon icon-left pagination-item" :class="{'disabled': activeIndex === 0}" @click="prev"></i>
      <i class="icomoon icon-right pagination-item" :class="{'disabled': activeIndex === pageSize}" @click="next"></i>
    </div>
  </div>
  <div class="recommend-content">
     <!-- 从goodsList里粘贴过来的 然后做下修改即可 -->
    <ul class="clearfix" :style="listWrapper">
      <!--  并不是每个li的最后一个子元素都不需要右边距  我们要通过计算才能知道 
      当(index+1)%4 === 0 时才不需要右边距  因为index从0开始的  除以4的余数等于0时才不需要  -->
      <li class="goods-list" v-for="(item,index) in data" :key="index" :class="{'last-child': ( index+ 1) % 4 === 0}">
        <a :href="item.href">
          <img :src="item.goodsUrl" alt="">
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
  </div>
</div>
</template>

<script>
export default {
    name:"recommend-list",
    props:{
      data:{
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        activeIndex:0
      }
    },
    computed: {
      listWrapper () {
        // 注意计算属性要加上return 且属性要用模板字符串
        return {
          width: `${(this.data.length) * 250}px`,
          transform:`translateX(-${this.activeIndex * 1240}px)`,
          transitionDuration: '.3s'
        }
      },
      pageSize(){
        return Math.floor(this.data.length / 5)

      }
    },
    methods:{
      prev(){
        if(this.activeIndex === 0) return;
        this.activeIndex -= 1
      },
      next(){
        if(this.activeIndex === this.pageSize) return;
        this.activeIndex += 1
      }
    },
    
}
</script>
<style lang = 'less' scoped>
  .recommend-header{
    margin: 30px auto 10px;
    .title{
      font-size: 30px;
      font-weight: 400;
    }
    .pagination-item{
      display: inline-block;
      width: 24px;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      text-align: center;
      cursor: pointer;
      color: #00c3f5;
      border: 1px solid #00c3f5;
      &.disabled{
        color: #efefef;
        border-color: #dcdcdc;
      }
    }
  }
  .recommend-content{
    width: 1240px;
    background-color: white;
    overflow: hidden;
    img{
      height: 180px;
      &:hover{
        /* 鼠标放上去图片变大的效果  transform缩放效果scale*/
        transform: scale(1.2);
        transition: all .3s;
      }
    }

    .goods-list{
    float: left;
    width: 220px;
    margin: 0 15px;
    padding: 34px 0 15px;
    background-color: #fff;
    cursor: pointer;
    position: relative;
    margin-top: 10px;
    margin-right: 9px;
    transition: all .3 ease;
    overflow: hidden;
    text-align: center;

    /* 并不是每个li的最后一个子元素都不需要右边距  我们要通过计算才能知道 当(index+1)%4 === 0 时才不需要右边距  因为index从0开始的  除以4的余数等于0时才不需要 */
    &.last-child{
      margin-right: 0;
    }
  }
    .goods-name{
      margin-bottom: 2px;
      color: #555757;
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
      font-size: 16px;
      color: #c00;
      margin-top: 8px;

      i{
        font-style: normal;
        font-size: 12px;
        position: absolute;
        left: 0;
        top: 2px;
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
  }
  
</style>