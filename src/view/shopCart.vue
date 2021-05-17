<!-- 购物车页面 -->
<template>
<div>
  <v-header></v-header>
  <div v-if="shopcartData.length > 0" class="shopcart-wrapper">
    <table class="shopcart-header">
      <tr>
        <td class="cart-select">
          <input type="checkbox" class="cart-checkbox" :checked = 'isAllChecked' @click="checkAllGoods">
          <span>全选</span>
        </td>
        <td class="cart-name">商品</td>
        <td class="cart-price">单价(元)</td>
        <td class="cart-num">数量</td>
        <td class="cart-total">小计(元)</td>
        <td class="cart-operate">操作</td>
      </tr>
    </table>
    <div class="shopcart-list">
      <table>
        <tr v-for="(item,index) in shopcartData" :key="index" class="cart-product">
          <td class="cart-select">
            <input type="checkbox" class="cart-checkbox" :checked= "item.checked" @click="checkedGoods(item.id)">
            <img class="cart-img" :src="item.imageUrl" alt="">
          </td>
          <td class="cart-name">
            <span class="cart-title">{{item.goodsName}}</span>
            <span class="cart-desc">{{item.goodsDesc}}</span>
          </td>
          <td class="cart-price">￥{{item.goodsPrice}}</td>
          <td class="cart-num">
            <div class="cart-input clearfix" >
              <button class="fl" @click="reduce(item.id)">-</button>
              <input class="fl" v-model="item.count" type="number">
              <button class="fl" @click="increase(item.id)">+</button>
            </div>
          </td>
          <td class="cart-total">￥{{item.count * item.goodsPrice}}</td>
          <td class="cart-operate">
            <i class="icomoon icon-close" @click="shopcartDelete(item.id)"></i>
          </td>
        </tr>
      </table>
    </div>
    <div class="clearfix shopcart-footer">
      <div class="fl">
        <input type="checkbox" class="cart-checkbox" :checked = 'isAllChecked' @click="checkAllGoods">
        <span >全选</span>
        <span class="footer-remove">删除选中的商品</span>
        <span>共<span class="footer-number gary">{{shopcartTotal}}</span>件商品，已选中<span class="footer-number blue">{{checkedGoodsTotal}}</span>件商品</span>
      </div>
      <div class="fr">
        <span>已优惠<span class="footer-number red">0.00</span>元，合计(不含运费): <span class="footer-number red footer-total">￥{{checkedGoodsPrice}}</span></span>
        <a href="javascript:;" class="btn success" :class="{'cancel': checkedGoodsTotal <= 0}" @click="goToOrder">去结算</a>
      </div>
    </div>
  </div>
  <!-- 当没有任何商品时显示的页面 -->
  <div v-else class="shopcart-empty">
    <div class="empty-content">
      <div class="empty-left"></div>
      <div class="empty-right">
        <p class="empty-desc">购物车内还没有商品，赶紧去选购吧</p>
        <a href="javascript:;" class="btn success" @click="goToIndex">返回商城首页</a>
      </div>
    </div>
  </div>
  <v-footer></v-footer>
  <!-- 弹框组件   .sync修饰符  是在当子组件向父组件传递数据时 简化操作的   也就是接收子组件传递来的数据相当于双向绑定   具体看笔记-->
  <v-dialog :show.sync= "dialogShow" title="提示" :width="500" @confirm = "confirmDelete" @cancel = "dialogShow = false">
    <!-- 引用子组件这里写的内容会替换掉子组件中slot -->
    <div style="height:120px;line-height:120px">您确定删掉这件商品吗？</div>
  </v-dialog>
</div>
</template>

<script>
import vHeader from '../components/header'
import vFooter from '../components/footer'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import vDialog from '../components/dialog'
export default {
    name:"shopcart",
    components:{
       vHeader,
       vFooter,
       vDialog
    },
    data(){
      return{
        dialogShow:false,
        // 存id值
        current:null
      }
    },
    computed:{
      shopcartData(){
        return this.$store.state.shopcartData
      },
      ...mapGetters([
        'isAllChecked',
        'checkedGoodsTotal',
        'checkedGoodsPrice',
        'shopcartTotal',
      ])
      
    },
    methods:{
      goToIndex(){
        this.$router.push({
          name: 'index'
        })
      },
      goToOrder(){
        this.$router.push({
          name: 'Order'
        })
      },
      ...mapMutations([
        'INCREASE_SHOPCART',
        'REDUCE_SHOPCART',
        'CHECK_GOODS',
        'CHECK_ALL_GOODS',
        'DEL_SHOPCART'
      ]),
      increase(id){
        // this.$store.commit('INCREASE_SHOPCART',id)使用辅助函数改成下列写法
        this.INCREASE_SHOPCART(id)

      },
      reduce(id){
        // this.$store.commit('REDUCE_SHOPCART',id)使用辅助函数改成下列写法
        this.REDUCE_SHOPCART(id)
      },
      checkedGoods(id){
        this.CHECK_GOODS(id)
      },
      checkAllGoods(){
        this.CHECK_ALL_GOODS(this.isAllChecked)
      },
      shopcartDelete(id){
        // this.DEL_SHOPCART(id)
        this.dialogShow = true
        this.current = id
      },
      confirmDelete(){
        // this.DEL_SHOPCART(id)这里id值是拿不到的 因为我们没传过来  所以要在点击删除图标时就把id值存起来
        this.DEL_SHOPCART(this.current)
        this.dialogShow = false
      }
    }
}
</script>
<style lang = 'less' scoped>
  .shopcart-wrapper{
    width: 1240px;
    margin: 10px auto;
    .shopcart-header{
      height: 50px;
      background-color: #fff;
      border-bottom: 1px solid #efefef;
      color: #333;
    }
    .cart-select{
      width: 220px;
      padding-left: 45px;
      text-align: left;
      
      .cart-img{
        width: 100px;
        height: 100px;
        margin-left: 35px;
        vertical-align: middle;
      }
    }
    .cart-checkbox{
        width: 16px;
        height: 16px;
        border-color: #bdbdbd;
        display: inline-block;
        background-color: #fff;
        border-radius: 2px;
        font-size: 10px;
        vertical-align: middle;
      }
    .cart-name{
      width: 270px;
      text-align: left;
      .cart-title{
        display: inline-block;
        width: 100%;
        /* 三部曲  溢出的文字省略号显示 */
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .cart-desc{
        color: #999;
      }
    }
    .cart-price{
      width: 220px;
      text-align: center;
    }
    .cart-num{
      width: 200px;
      text-align: center;
    }
    .cart-total{
      width: 160px;
      text-align: center;
    }
    .cart-operate{
      width: 170px;
      padding-right: 40px;
      text-align: right;
    }
    .shopcart-list{
      background-color: #fff;
      margin-bottom: 10px;
    }
    .cart-product{
      height: 150px;
      border-top: 1px solid #efefef;
      &:last-child{
        border-bottom: 1px solid #efefef;
      }
    }
    .cart-input{
      width: 140px;
      height: 38px;
      border: 1px solid #efefef;
      margin: 0 auto;
      border-radius: 4px;
      button{
        width: 38px;
        height: 38px;
        text-align: center;
        background-color: transparent;
        border: none;
        font-size: 20px;
        cursor: pointer;
      }
      input{
        width: 58px;
        height: 36px;
        border: none;
        border-right: 1px solid #efefef;
        border-left: 1px solid #efefef;
        text-align: center;
      }
    }

    .shopcart-footer{
      height: 70px;
      line-height: 70px;
      background-color: #fff;
      padding: 0 45px;
      color: #666;

      .footer-remove{
        color: #999;
        margin: 0 30px 0 20px;
      }

      .footer-number{
        font-weight: bold;
        margin: 0 5px;
      }

      .gray{
        color: #333;
      }

      .blue{
        color: #00c3f5;
      }

      .red{
        color: #e02b41;
      }
      .footer-total{
        font-size: 20px;
        margin-right: 35px;
      }
    }
  }
  .shopcart-empty{
    width: 1240px;
    margin: 10px auto;
    background-color: #fff;
    /* 相当于table标签 */
    display: table;
    height: 360px;

    .empty-content{
      /* 相当于td标签 */
      display: table-cell;
      text-align: center;
      vertical-align: middle;
    }
    .empty-left{
      display: inline-block;
      width: 100px;
      height: 114px;
      background: url("../assets/images/shopcart.png") no-repeat;
      margin-right: 30px;
      vertical-align: middle;
    }

    .empty-right{
      display: inline-block;
      vertical-align: middle;
      text-align: left;
    }
    .empty-desc{
      color: #666;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
    }
  }
</style>