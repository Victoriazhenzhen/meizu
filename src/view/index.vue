<template>
  <div>
    <!-- 头部组件 -->
    <v-header></v-header>
    <!-- 轮播图 -->
    <div class="swiper-wrapper">
      <!-- 通过属性绑定动态向子组件swiper传递数据 -->
      <swiper :data="swiperData"></swiper>
      <!-- 轮播图片上的menu菜单 -->
      <ul class="menus">
        <li v-for="(item,index) in menuData" :key="index">
          <a :href="item.href">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <!-- 广告图片 -->
    <ul class="post-wrapper" clearfix>
      <li v-for="(item, index) in postData" :key="index">
        <a :href="item.href">
          <img :src="item.imgUrl" alt="">
        </a>
      </li>
    </ul>
    <!-- 展示的区域 -->
    <div class="index-container">
      <!-- 热卖商品 -->
      <div class="sale">
        <h3 class="title">热卖商品</h3>
        <!-- 通过属性绑定向子组件goodsList传递数据 -->
        <goods-list :data = 'hotSaleData'></goods-list>
      </div>
      <!-- 手机 -->
      <div class="sale">
        <h3 class="title">手机</h3>
        <add-list :data='addListData'></add-list>
        <goods-list :data = 'phoneSaleData'></goods-list>
      </div>
      <!-- 智能配件 -->
      <div class="sale">
        <h3 class="title">智能配件</h3>
        <add-list :data='smartAddData'></add-list>
        <goods-list :data = 'smartSaleData'></goods-list>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="footer"> 
      <!-- 底部组件 -->
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
// 通过axios请求数据  所以得先引入axios
import axios from "axios"
import vHeader from "../components/header"
import swiper from "../components/swiper"
import goodsList from '../components/goodsList'
import AddList from '../components/addList'
import vFooter from '../components/footer'
export default {
  name:'index',
  components:{
    vHeader,
    swiper,
    goodsList,
    AddList,
    vFooter
  },
  data(){
    return{
      swiperData:[],
      menuData:[],
      postData:[],
      hotSaleData:[],
      phoneSaleData: [],
      smartSaleData: [],
      addListData:[],
      smartAddData:[]
    }
  },
  mounted(){
    this.getSwiperData()
    this.getMenuData()
    this.getPostData()
    this.getHotSaleData()
    this.getPhoneSaleData();
    this.getSmartSaleData();
    this.getAddListData()
    this.getSmartAddData()
  },
  methods:{
    async getSwiperData(){
      const {data:res} = await axios.get('/api/advertise')
      this.swiperData = res
    },
    async getMenuData(){
      const {data:res} = await axios.get('/api/menu')
      this.menuData = res
    },
    async getPostData(){
      const {data:res} = await axios.get('/api/post')
      this.postData = res
    },
    async getHotSaleData(){
      const {data:res} = await axios.get('/api/hotsale')
      this.hotSaleData = res
    },
     async getPhoneSaleData(){
      const {data:res} = await axios.get('/api/phonesale')
      this.phoneSaleData = res
    },
     async getSmartSaleData(){
      const {data:res} = await axios.get('/api/smartsale')
      this.smartSaleData = res
    },
    async getAddListData(){
      const {data:res} = await axios.get('/api/phoneRecommend')
      this.addListData = res
    },
    async getSmartAddData(){
      const {data:res} = await axios.get('/api/smartRecommend')
      this.smartAddData = res
    }
  }
}
</script>

<style lang = 'less' scope>
  .swiper-wrapper{
    width: 1240px;
    height: 500px;
    position: relative;
    margin: 0 auto;
    .menus{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 303px;
      background-color: rgba(0, 0, 0, .5);
      padding-top: 17px;

      li{
        height: 57px;
        line-height: 57px;

        a{
          font-size: 16px;
          padding-left: 40px;
          color: #fff;
          transition: color .3 ease;

          &:hover{
            color: #31a5e7;
          }
        }
      }
    }
  }
  /* 广告图片样式 */
  .post-wrapper{
    width: 1240px;
    height: 180px;
    margin: 10px auto 50px;
    li{
      /* display: inline-block; */
      float: left;
      width: 303px;
      height: 108px;
      margin-right: 8px;
      a{
        transition: opacity .3s ease;

        &:hover{
          opacity: .85 ;
        }
      }
      &:last-child{
        margin-right: 0;
      }
    }
  }
  .index-container{
    width: 1240px;
    margin: 0 auto;
    .title{
      font-size: 30px;
      font-weight: 400;
      margin-bottom: 10px;
    }
    .sale{
      margin-bottom: 50px;
    }
  }

  
</style>
