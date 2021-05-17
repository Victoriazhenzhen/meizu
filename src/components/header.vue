<template>
<div class="header">
    <div class="header-warpper clearfix">
        <div class="header-logo fl"></div>
        <div class="header-cart fr">
            <span class="icomoon icon-cart"></span>
        </div>
         <div class="header-user fr">
            <span class="iconmon icon-user"></span>
        </div>
        <div class="header-search fr"> 
            <input class="search-input" type="text" placeholder="购物车">
            <span class="search-icon icomoon icon-search"></span>
        </div>
        <ul class="header-nav fr" >
            <li v-for="(item,index) in navData" :key="index" @mouseenter="showChildren(item)" >
                <!-- 这里注意href要加上javascript：；  如果不加是空的表示刷新页面 -->
                <a class="nav-item" href="javascript:;" @click="goToCategory">{{item.name}}</a>
            </li>
            
        </ul>
        
       
          
    </div>
    <!-- 下面的是动画效果 -->
    <transition name="nav">
        <div class="nav-children" v-show="childrenShow" @mouseleave="hideChildren">
            <div class="children-wrapper">
                <!-- transition-group组件能拿到循环列表的每一个子项 并分别对每个子项加动画 -->
                <transition-group tag="ul" @enter="enter">
                    <!-- 这里 data-index是自定义属性 dataset.index可以拿到它-->
                    <!-- <li class="children-item" v-for="(item,index) in childrenData" :key="index" :data-index="index"> -->
                        <!-- 为了让动画有效果 这里key值改成item.pic  唯一标识符  因为data-index也为index 为了有变化让动画识别-->
                    <li class="children-item" v-for="(item,index) in childrenData" :key="item.pic" :data-index="index">
                        <img :src="item.pic" alt="">
                        <p>{{item.name}}</p>
                        <p>{{item.price}}</p>
                    </li>
                </transition-group>
            </div>
        </div>
    </transition>

</div>
</template>

<script>
import axios from "axios"
// vue中使用第三方类实现动画  先下载npm install velocity-animate --save  velocity是js动画库
import Velocity from "velocity-animate";
export default {
  name: 'vHeader',
  data(){
      return{
          navData:[],
          childrenData:[],
          childrenShow:false,
      }
    },
    // 钩子函数 模板一加载完成就调用
mounted(){
    this.getNavData()
},
  methods:{
        async getNavData(){
          const{data:res} = await axios.get('/api/nav')
          this.navData = res
          //axios请求回来的数据是个对象，里面的data属性才是我们要的数据，所以对data进行解构赋值
          //console.log(res); //打印出data数据
        },
        showChildren(item){
          this.childrenData = item.children
          this.childrenShow = true
        },
        hideChildren(){
          this.childrenShow = false
        //   为了让动画更好看 每次移上去都重新渲染
          this.childrenData = []
        },
        // 这里的el表示循环列表的某一项
        enter(el){
            // 动画需求是每隔一段时间间隔从右往左发生位移 并且透明度从0到1
            // 延迟时间根据每个子项位于第几个触发不同的时间
            const timeOut = el.dataset.index * 150
            setTimeout(function(){
                Velocity(el , {
                    'opacity': 1,
                    'translateX': '-50px'
                })
            },
            timeOut)
        },
        goToCategory(){
            this.$router.push({
               name: 'category'
            })
        }

    }
  
}
</script>

<style lang="less" scoped>
.header{
    width: 100%;
    background-color: white;
    position: relative;
    .header-warpper{
        width: 1240px;
        margin: 0 auto;
        // border: 1px solid red;
    }
    .header-logo{
        width: 140px;
        height: 26px;
        margin: 28px 0;
        background: url("../assets/images/logo.png") no-repeat center;
    }
    .header-cart,.header-user{
        padding: 32px 10px 0px 20px;
    }
    .header-search{
        width: 172px;
        height: 32px;
        color: gray;
        border: 1px solid #ddd;
        border-radius: 2px;
        position: relative;
        margin: 23px 0;
        .search-input{
            width: 127px;
            height: 20px;
            font-size: 12px;
            border: 0;
            outline: none;
            position:absolute;
            left: 5px;
            top: 6px;

        }
        .search-icon{
            position: absolute;
            right: 10px;
            top: 8px;
        }
    }
    .header-nav{
        li{
            display: inline-block;
        }
        a.nav-item{
            display: inline-block;
            font-size: 16px;
            color: #515151;
            padding: 30px 20px;
            cursor: pointer;
            transition: color .1s ease;
        }
         a.nav-item:hover{
             color: #31a5e7;
         }
    }
    .nav-children{
        width: 100%;
        height: 156px;
        background-color: white;
        position: absolute;
        left: 0;
        top: 82px;
        border-bottom: 1px solid #e9e9e9;
        z-index: 1;
        .children-wrapper{
            width: 1240px;
            padding-left: 150px;
            margin: 0 auto;
        }
        .children-item{
            width: 136px;
            height: 145px;
            display: inline-block;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        .children-item img{
            width: 100px;
            height: 100px;
        }
    }
    .nav-enter-active{
        height: 156px;
        transition: height .3s ease-in-out;
    }
    .nav-enter{
        height: 0;
    }
    
}


</style>
