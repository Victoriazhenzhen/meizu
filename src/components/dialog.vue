<!-- 这是弹框组件 -->
<template>
<!-- 加上name属性表示 下面样式就不能自定义了必须使用.dialog-enter-active -->
<transition name="dialog">
  <div class="dialog-mask" v-show="show">
  <!-- 加上dialog-box盒子实现垂直居中 -->
  <div class="dialog-box">
    <div class="dialog-wrapper" :style="dialogBox">
      <div class="dialog-header" :class="{'dialog-title':title}">
        {{title}}
        <i class="icomoon icon-close dialog-close" @click="close"></i>
      </div>
      <div class="dialog-content" :style="dialogContent">
       <slot></slot>
      </div>
      <div class="dialog-footer" v-if="confirmButtonShow || cancelButtonShow">
        <button v-show="confirmButtonShow" class="btn success w100 mr20" @click="confirm">{{confirmButtonText}}</button>
        <button v-show="cancelButtonShow" class="btn cancel w100" @click="cancel">{{cancelButtonText}}</button>
      </div>
    </div>
  </div>
</div>
</transition>

</template>

<script>
export default {
    name:"v-dialog",
    props:{
      show:{
        type:Boolean,
        default:false
      },
      height:{
        type:Number,
        default:280
      },
      width:{
        type:Number,
        default:760
      },
      title: {
        type: String,
        default: ''
      },
      confirmButtonShow: {
        type: Boolean,
        default: true
      },
      cancelButtonShow: {
        type: Boolean,
        default: true
      },
      confirmButtonText: {
        type: String,
        default: '确定'
      },
      cancelButtonText: {
        type: String,
        default: '取消'
      }
    },
    computed: {
      dialogBox () {
        return {
          width: `${this.width}px`
        };
      },
      dialogContent () {
        return {
          height: `${this.height}px`
        };
      }
    },
    methods:{
      close(){
        // 要使用.sync修饰符 （ 是在当子组件向父组件传递数据时 简化操作的   也就是接收子组件传递来的数据相当于双向绑定   具体看笔记）
        // 就必须在时间函数前加上update：
        this.$emit('update:show',false)
      },
      confirm(){
        this.$emit('confirm')
      },
      cancel(){
        this.$emit('cancel')
      }
    }
}
</script>
<style lang = 'less' scoped>
  .dialog-mask{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(153,153,153,.6);
    /* 相当于table布局 */
    display: table;
    .dialog-box{
      /* 相当于table里面的td  因为vertical-align只对行内元素或者行内块元素有用 所以加上dialog-box盒子实现垂直居中*/
      display: table-cell;
      vertical-align: middle;
    }
  
    .dialog-wrapper{
      margin: 0 auto;
      background-color: #fff;
      text-align: center;
      /* width: 500px; */
    }
    .dialog-header{
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 4px 4px 0 0;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      position: relative;
    }

    .dialog-title{
      border-bottom: 1px solid #efefef;
    }

    .dialog-close{
      position: absolute;
      right: 26px;
      top: 16px;
      color: #bdbdbd;
    }
    /* .dialog-content{
      height: 120px;
      line-height: 120px;
    } */
    .dialog-footer{
      padding-bottom: 30px;
    }

    .mr20{
      margin-right: 20px;
    }

    .wd100{
      width: 100px;
    }
  }
  /* v-enter-active是入场动画的时间段 */
  .dialog-enter-active{
    transition: opacity .3s;
  }
  /* v-enter（这是一个时间点）是元素进入之前的其实状态，此时还没有开始进入。 */
  .dialog-enter{
    opacity: 0;
  }
  
</style>