<template>
<div>
  <!-- 头部组件 -->
  <v-header></v-header>
  <!-- 中间内容区域 -->
  <div class="category-wrapper">
    <!-- 面包屑导航 -->
    <div class="bread">
        <span>首页</span>
        <span class="arrow"> > </span>
        <span>全部</span>
        <span class="arrow"> > </span>
        <span class="last-bread">手机</span>
    </div>
    <!-- 这里是filter-box组件 ：data是给子组件传递出去的数据
      v-on是接收子组件传递进来的数据的触发事件 v-on缩写为@
      filter是子组件传递数据过来时自定义的事件名称  我们这里接收就直接监听这个自定义事件就行
      -->
    <filter-box :data = 'filterBoxData' @filter="getQuery"></filter-box>

    <!-- 这里是sortBox组件 -->
    <sort-box @getKey="getSortKey" @getStock ="getSortStock"></sort-box>

    <!-- 这里是category-list组件 -->
    <category-list @clickItem= "goToDetail" :data = 'categoryListData'></category-list>
    <!-- 这是recommendList组件 -->
    <recommend-list :data='recommendListData'></recommend-list>
  </div>
  <!-- 底部组件 -->
  <v-footer></v-footer>

</div>
  
</template>

<script>
import axios from 'axios'
import vHeader from '../components/header'
import vFooter from '../components/footer'
import categoryList from '../components/categoryList'
import filterBox from '../components/filterBox'
import sortBox from '../components/sortBox'
import recommendList from '../components/recommendList'
export default {
  name:"category",
  components:{
    vHeader,
    vFooter,
    categoryList,
    filterBox,
    sortBox,
    recommendList
  },
  data(){
    return{
    categoryListData:[],
    filterBoxData:[],
    categoryCopy:[],
    recommendListData:[],
    // 把所有的筛选排序都缓存
    currentQuery: null,
    currentStock: null,
    currentKey: null
    }
  },
  mounted(){
    this.getCategoryListData(),
    this.getFilterBoxData(),
    this.getRecommendListData()
  },
  methods:{
    async getCategoryListData(){
      const {data:res} = await axios.get('/api/categoryList')
      this.categoryListData = res
      this.categoryCopy = [].concat(res)
    },
    async getFilterBoxData(){
      const {data:res} = await axios.get('/api/queryList')
      this.filterBoxData = res
    },
    async getRecommendListData(){
      const {data:res} = await axios.get('/api/smartSale')
      this.recommendListData = res
    },
    //  接收子组件传递过来数据后触发的方法 val就是子组件传递过来的数据
    getQuery(val){
      console.log(val);
      this.currentQuery = val
      this.sortGoods() 
    },
    getSortKey(key){
      this.currentKey = key
      this.sortGoods()
    },
    getSortStock(val){
      this.currentStock = val
      this.sortGoods()
    },
    //  把三个方法都缓存到一个函数中  这样就能让三个方法一起使用
    sortGoods(){
      //  加这个的原因就是为了保证每次拿到的categoryListData数据都是最开始没有被筛选的数据  这样的情况下再去筛选才不会有错
      this.categoryListData = [].concat(this.categoryCopy)
      if(this.currentQuery){
        //  将val对象里的key（键）给遍历出来 ， Object.keys()方法拿到对象的key键组成的数组
        // forEach((item,index,input)=>{}) 回调里第一个参数是遍历的数组内容，第二个参数是对应的数组索引，第三个参数是数组本身 
        // 这里key是遍历数组（对象的key键组成的数组）的内容的每一项 注意forEach是没有返回值的 仅仅是拿到遍历数组的每一项
        Object.keys(this.currentQuery).forEach((key)=>{
          if(this.currentQuery[key]){
              //  filter()方法使用指定的回调函数测试所有元素 回调函数里item是测试的每一项
            this.categoryListData = this.categoryListData.filter((item)=>{
              // indexOf（）方法可返回某个指定的字符串值在字符串中首次出现的位置 features是数据里的内容
              return item.features.indexOf(this.currentQuery[key]) >= 0
            })
          }
        })
      }
      if(this.currentStock){
        //  filter()方法使用指定的回调函数测试所有元素 回调函数里item是测试的每一项
        this.categoryListData = this.categoryListData.filter((item)=>{
          //  available是数据里的内容
          return item.available
        })
      }
      if(this.currentKey){
        if(this.currentKey==='recommend'){
        this.categoryListData.sort((a,b)=>{
          return b.shelveTime - a.shelveTime
          })
        }else if(this.currentKey === 'new'){
        this.categoryListData.sort((a,b)=>{
          return b.publishedTime - a.publishedTime
          })
        }else if(this.currentKey === 'low'){
          this.categoryListData.sort((a,b)=>{
          return b.goodsPrice - a.goodsPrice
          })
        }else if(this.currentKey === 'height'){
          this.categoryListData.sort((a,b)=>{
          return a.goodsPrice - b.goodsPrice
          })
        }
      }
      
    },
    // 父组件接收子组件传来的数据item 实现跳转详情页面
    goToDetail(item){
      this.$router.push({
        name: 'Detail',
        params:{
          id:item.id
        }
      })
    }
  }
}
</script>

<style lang= 'less' scoped>
   .category-wrapper{
    width: 1240px;
    margin: 0 auto;
    padding-bottom: 60px;
  }

  .bread{
    height: 40px;
    line-height: 40px;

    .arrow, .last-bread{
      color: #999;
    }
  }
</style>