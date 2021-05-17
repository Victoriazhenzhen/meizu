<template>
  <div class="swiper" :style="swiperSize">
    <!-- 轮播的图片 -->
    <ul class="swiper-ul" :style="listSize" @transitionend="setDuration">
      <li class="swiper-list" v-for="(item,index) in data" :key="index">
        <a :href="item.href">
          <img :src="item.imgUrl" alt="" :style="swiperSize">
        </a>
      </li>
      <!-- 解决过渡时最后一张图片切换到第一张出现的问题   后面再加第一张图片  然后key值要跟上面不一样就行-->
      <li v-if="data.length >1 " class="swiper-list" :key="data.length + 1">
        <a :href="data[0].href">
          <img :src="data[0].imgUrl" alt="" :style="swiperSize">
        </a>
      </li>
    </ul>
    <!-- 小圆点 -->
    <ul class="pagination">
      <li v-for="(item,index) in data" :key="index" @click="changeImg(index)" :class="{'active': activeIndex === index}"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name:"swiper",
  // 通过props接收父组件index传来得数据
  props:{
    data:{
      type:Array,
      // 默认数据是空  注意组件的数据参数必须是个函数
      default(){
        return []
      }
    },
    height: {
        type: Number,
        default: 500
      },
    width: {
        type: Number,
        default: 1240
    },
    delay: {
        type: Number,
        default: 5000
    }
  },
  // 计算属性   不要把宽高写死
  computed:{
    swiperSize(){
      return{
        // 模板字符串的拼接要加上${}
        width:` ${this.width}px`,
        height:` ${this.height}px`
      }
    },
    // 这里是整个由data数据里的多少图片组成的ul的宽高  也由计算属性得到
    // 宽度就等于  多少张图片的数量也就是data数据的长度  乘以 每张图片的宽
    // 高度就等于每张图片的高度
    listSize(){
      return{
        // 注意这里长度也要加1  因为多加了一张图片
        width:`${this.width * (this.data.length+1) }px`,
        height:`${this.height}`,
        transform:`translateX(-${this.width * this.activeIndex}px)`,
        // transitionDuration:`.3s`  通过阀值来停掉动画
        transitionDuration:this.haveDuration ? ".3s" : ""

      }
    }  
  },
    // 我们要知道当前在哪一张轮播图上
  data(){
    return{
      //默认为 0  activeIndex作为一个标识符
      activeIndex:0,
      timer:null,
      // 通过阀值来决定要不要停掉过渡动画
      haveDuration:true
    }
  },
  mounted(){
    this.setTimer()
  },
  methods:{
    setTimer(){
      // 开启定时器前要先清除定时器
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        // if(this.activeIndex === (this.data.length-1)){
          // 这里不需要再减一了 因为上面多加了一张图片
        if(this.activeIndex === this.data.length){
          this.activeIndex = 0
          this.haveDuration = false
        }else{
          this.activeIndex++
          this.haveDuration = true
        }
        
      }, this.delay);
    },
    changeImg(index){
      this.activeIndex = index
    },
    setDuration(){
      if(this.activeIndex === this.data.length){
        this.activeIndex = 0;
        this.haveDuration = false
      }
    }
  }
  
}
</script>

<style lang="less" scope>
  .swiper{
    // width: 1240px;
    // height: 500px;
    position: relative;
    overflow: hidden;
    .swiper-ul{
      // 因为li是内联元素 当这几个li的宽度超出时 会自动换行 就会出现空白 所以要去掉他们的间隙
      font-size: 0;
    }
    .swiper-list{
      display: inline-block;
    }
    .pagination{
      position: absolute;
      left: 30%;
      bottom: 20px;
      li{
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #fff;
        margin: 0 5px;
        cursor: pointer;

        &.active{
          background-color: transparent;
          border: 1px solid #fff;
        }
      }
    }
  }

</style>