<!-- 这是提交订单页面 -->
<template>
<div>
  <v-header></v-header>
  <div class="order">
    <div class="order-item">
      <h1 class="order-title">收获信息</h1>
      <ul class="address-list clearfix ">
        <li class="address-item fl" :class="{'active':item.checked}" v-for="(item,index) in addressData" :key="index" @click="checkAddress(item)">
          <div class="clearfix address-title">
            <div class="fl">{{item.name}}</div>
            <div class="fr">{{item.phone}}</div>
          </div>
          <div class="address-info">
            {{item.province}}{{item.city}}{{item.district}}{{item.street}}
          </div>
          <div class="address-checked" v-show="item.checked">
            <i class="icomoon icon-check address-i"></i>
          </div>
        </li>
        <li class="address-item fl address-add">
          <div class="address-add-icon">+</div>
          <div>添加新地址</div>
        </li>
      </ul>
    </div>
    <div class="order-item">
      <h1 class="order-title">确认订单信息</h1>
      <table class="order-goods">
        <thead>
          <tr>
            <th class="goods-name">商品</th>
            <th class="goods-price">单价</th>
            <th class="goods-number">数量</th>
            <th class="goods-count">小计</th>
            <th class="goods-express">配送方式</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in orderData" :key="index">
            <td class="goods-name">
              <img :src="item.imageUrl" alt="">
              <div class="goods-desc">
                <p>{{item.goodsName}}</p>
                <p>{{item.goodsDesc}}</p>
              </div>
            </td>
            <td class="goods-price">￥{{item.goodsPrice}}</td>
            <td class="goods-number">{{item.count}}</td>
            <td class="goods-count">￥{{item.goodsPrice * item.count}}</td>
            <td :rowspan="orderData.length" class="goods-express">快递配送，运费<span class="red">￥0.00</span></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="order-footer">
              备注：<textarea name="" id="" placeholder="备注..."></textarea>
            </td>
            <td colspan="2" class="footer-total">合计：<span class="price">￥{{checkedGoodsPrice}}</span></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="order-item clearfix">
      <h1 class="order-title">选择支付方式</h1>
      <div class="order-pay">
        <!-- 支付宝 -->
        <div class="pay-item clearfix">
          <h1 class="pay-title fl">支付宝</h1>
          <ul class="pay-content fl clearfix">
            <li>
              <input v-model="payMode" value="huabei" name="pay" type="radio">
              <img src="..\assets\images\banks\huabei.png" alt="">
            </li>
            <li>
              <input v-model="payMode" value="alipay" name="pay" type="radio">
              <img src="..\assets\images\banks\alipay.png" alt="">
            </li>
          </ul>
        </div>
        <!-- 微信 -->
        <div class="pay-item clearfix">
          <h1 class="pay-title fl">微信</h1>
          <ul class="pay-content fl clearfix">
            <li>
              <input v-model="payMode" value="wechat" name="pay" type="radio">
              <img src="..\assets\images\banks\wechat.png" alt="">
            </li>
          </ul>
        </div>
        <!-- 网上银行 -->
        <div class="pay-item clearfix">
          <h1 class="pay-title fl">网上银行</h1>
          <ul class="pay-content fl clearfix pay-bank">
              <li>
                <input v-model="payMode" value="zhongguo" name="pay" type="radio">
                <img src="../assets/images/banks/zhongguo.png" alt="">
              </li>
              <li>
                <input v-model="payMode" value="jianshe" name="pay" type="radio">
                <img src="../assets/images/banks/jianshe.png" alt="">
              </li>
              <li>
                <input v-model="payMode" value="nongye" name="pay" type="radio">
                <img src="../assets/images/banks/nongye.png" alt="">
              </li>
              <li>
                <input v-model="payMode" value="gongshang" name="pay" type="radio">
                <img src="../assets/images/banks/gongshang.png" alt="">
              </li>
              <li>
                <input v-model="payMode" value="jiaotong" name="pay" type="radio">
                <img src="../assets/images/banks/jiaotong.png" alt="">
              </li>
              <li>
                <input v-model="payMode" value="zhaoshang" name="pay" type="radio">
                <img src="../assets/images/banks/zhaoshang.png" alt="">
              </li>
              <li>
                <input v-model="payMode" value="youzheng" name="pay" type="radio">
                <img src="../assets/images/banks/youzheng.png" alt="">
              </li>
              <li>
                <input v-model="payMode" value="xingye" name="pay" type="radio">
                <img src="../assets/images/banks/xingye.png" alt="">
              </li>
              <li>
                <input v-model="payMode" value="shanghai" name="pay" type="radio">
                <img src="../assets/images/banks/shanghai.png" alt="">
              </li>
          </ul>
        </div>
        <!-- 下单并支付 -->
        <div class="order-total">
          <ul>
            <li class="clearfix">
              <div class="fl">总金额</div>
              <div class="fr">￥{{checkedGoodsPrice}}</div>
            </li>
            <li class="clearfix ">
              <div class="fl">运费</div>
              <div class="fr">￥0.00</div>
            </li>
            <li class="order-line"></li>
            <li class="clearfix">
              <div class="fl">应付</div>
              <div class="fr order-price">￥{{checkedGoodsPrice}}</div>
            </li>
            <li class="fr">
              <a href="javascript:;" class="btn success" @click="pushOrder">下单并支付</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <v-footer></v-footer>
  <!-- 弹框组件   .sync修饰符  是在当子组件向父组件传递数据时 简化操作的   也就是接收子组件传递来的数据相当于双向绑定   具体看笔记-->
  <v-dialog :show.sync = "dialogShow" :width="360" :height= "80" :confirm-button-show = "false" :cancel-button-show = "false">
    <!-- 引用子组件这里写的内容会替换掉子组件中slot -->
        <div>
            <i class="icomoon icon-check-circle add-success"></i>成功提交订单
        </div>
        <a href="javascript:;" @click="goToIndex" class="go-shopcart">返回首页</a>
    </v-dialog>
</div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import axios from 'axios'
import vHeader from '../components/header'
import vFooter from '../components/footer'
import vDialog from '../components/dialog'
export default {
    name:"order",
    components:{
      vFooter,
      vHeader,
      vDialog
    },
    data(){
      return{
        addressData:[],
        payMode:'',
        dialogShow:false
      }
    },
    computed:{
      orderData(){
        // const data = this.$store.state.shopcartData.filter((item)=>{
        //   return item.checked = true
        // })  es6中可简化写法如下
        const data = this.$store.state.shopcartData.filter(item => item.checked)
        return data
      },
      ...mapGetters([
        'checkedGoodsPrice'
      ])
    },
    mounted(){
      this.getAddressData()
    },
    methods:{
      ...mapMutations([
        'REMOVE_GOODS'
      ]),
      async getAddressData(){
        const {data:res} = await axios.get('/api/addressData')
        this.addressData = res
      },
      checkAddress(val){
        this.addressData.forEach(item => {
          item.checked = false
          if(item.id === val.id){
            item.checked = true
          }
        });
      },
      pushOrder () {
        const date = new Date();
        const address = this.addressData.filter(item => item.checked)[0];
        const data = {
          orderId: date.getTime(),
          address: address,
          orderData: this.orderData,
          price: this.checkedGoodsPrice,
          time: date,
          payMode: this.payMode
        };
        this.REMOVE_GOODS();
        console.log(data);
        this.dialogShow = true;
      },
      goToIndex(){
        this.$router.push({
          name:'index'
        })
      }
    }
}
</script>
<style lang = 'less' scoped>
.order{
  width: 1240px;
  margin: 0 auto;
  margin-bottom: 60px;
  .order-item{
    margin-top: 10px;
    padding: 0 40px 10px;
    background-color: #fff;

  }
  .order-title{
    padding: 20px 0;
    font-size: 18px;
    color: black;
    font-weight: bold;
    text-indent: 10px;
    border-bottom: 1px solid #efefef;
  }
  .address-list{
    margin-top:30px;
    padding-left: 12px;
    .address-item{
      margin-bottom: 30px;
      width: 275px;
      height: 144px;
      margin: 0 12px 30px 0;
      border: 1px solid #efefef;
      padding: 15px;
      transition: border-color .8s;
      cursor: pointer;
      position: relative;
      &:hover,&.active{
        border-color: #00c3f5;
      }
    }
  }
  .address-title{
    font-size: 12px;
    color: black;
    font-weight: bold;
    border-bottom: 1px solid #efefef;
    line-height: 25px;
  }
  .address-info{
    font-size: 12px;
    padding-top: 10px;
    /* 文本强制换行   如果不懂请看印象笔记 */
    /* 自动换行 他会截断单词 */
    word-break: break-all; 
    /* 自动换行 他不会截断单词 */
    word-wrap: break-word;
  }
  .address-checked{
    position: absolute;
    width: 0;
    height: 0;
    right: 0;
    bottom: 0;
    border-right: 30px solid #00c3f5;
    border-top: 30px solid transparent;
    .address-i{
      position: absolute;
      right: -30px;
      bottom: 4px;
      color: #fff;
      font-size: 12px;
    }
    .address-add{
      text-align: center;
      transition: color .8s;
      &:hover{
        color: #00c3f5;
      }
      .address-add-icon{
        font-size: 30px;
        margin-top: 30px;
        margin-bottom: 10px;
        line-height: 1;
      }
    }
  }
  
  .order-goods{
    margin-top: 32px;
    border: 1px solid #efefef;

    thead {
      tr{
        height: 63px;
        border-bottom: 1px solid #efefef;
      }

      .goods-number, .goods-count, .goods-express{
        font-size: 18px;
        color: black;
      }

      .goods-name{
        font-size: 12px;
        font-weight: 400;
        color: #666;
      }

    }
    tbody tr{
      border-bottom: 1px solid #efefef;
    }
    tfoot tr{
      background-color: #f5f5f5;
    }
    .goods-name{
      width: 465px;
      padding-left: 10px;
      text-align: left;
      cursor: pointer;
      img{
        width: 120px;
        height: 120px;
        vertical-align: middle;
      }
      .goods-desc{
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
       
      }
    }
    .goods-price{
      width: 225px;
      font-weight: bold;
      text-align: center;
      font-size: 18px;
      color: black;
    }
    .goods-number{
      width: 139px;
      font-weight: bold;
      text-align: center;
    }

    .goods-count{
      width: 173px;
      text-align: right;
      font-weight: bold;
      padding-right: 20px;
      color: #e02b41;
      font-size: 18px;
    }

    .goods-express{
      width: 184px;
      text-align: center;
      color: #999;
      border-left: 1px solid #efefef;
      .red{
        color: #e02b41;
        font-weight: bold;
      }
    }
  }
  .order-footer{
    padding: 15px 20px;
    font-size: 12px;

    textarea{
      width: 552px;
      height: 48px;
      border: 1px solid #efefef;
      padding: 5px;
      outline: 0;
        /* 防止文本域拖拽 */
      resize: none;
      background-color: #fff;
      margin-left: 5px;
      vertical-align: middle;
    }
  }
  .footer-total{
    text-align: right;
    color: #e02b41;
    padding: 15px 20px;
    font-weight: bold;

    .price{
        font-size: 22px;
    }
  }
  .order-pay{
    padding: 40px 26px 14px;
    border: 1px solid #efefef;
    .pay-item{
      margin-bottom: 26px;
    }
    .pay-title{
      width: 60px;
      height: 40px;
      font-size: 14px;
      margin: 0 20px 0 0;
      line-height: 40px;
      color: #333;
    }
    .pay-content{
      li{
        float: left;
        margin-right: 40px;
        margin-bottom: 26px;
      }
      input{
        vertical-align: middle;
        margin-right: 20px;
      }
      img{
        vertical-align: middle;
      }
    }
    .pay-bank{
      width: 1020px;
    }
  }
  .order-total{
    width: 318px;
    float: right;
    margin-top: 30px;
    li{
    margin-bottom: 20px;
      
    }
    .order-line{
      height: 1px;
      background-color: #efefef;
    }
    .order-price{
      color: #e02b41;
      font-size: 20px;
      font-weight: 400;
    }
  }
}
.add-success{
    color: #00c3f5;
    margin-right: 5px;
}
.go-shopcart{
    color: #00c3f5;
    text-decoration: underline;
}
</style>