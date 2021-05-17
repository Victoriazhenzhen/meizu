<!-- 这里是排序组件 -->
<template>
<div class="clearfix sort-box">
    <div class="fl sort-order">
        <a href="javascript:;" @click="setSortKey('recommend')" :class="{'active': activeSortKey === 'recommend'}">推荐</a>
        <a href="javascript:;" @click="setSortKey('new')" :class="{'active': activeSortKey === 'new'}">新品</a>
        <a href="javascript:;" @click="changePrice" :class="{'active': activeSortKey === 'low'||  activeSortKey === 'height'}">
            价格<i class="icomoon arrow" :class="sortArrow"></i>
        </a>
    </div>
    <div class="fr">
        <input type="checkbox" v-model="haveStock">
        <span>仅显示有货商品</span>
    </div>
</div>
</template>

<script>
export default {
    name:"sort-box",
    data(){
        return{
            // 先创建一个字段来标识当前我们点击的是哪个排序条件
            activeSortKey:'',
            // 创建标识价格字段
            activePrice:'low',
            haveStock:false
        }
        
    },
    // 添加侦听属性 来侦听haveStock的变化
    watch:{
        haveStock(val){
            this.$emit('getStock',val)
        }
    },
    // 添加一个计算属性 来控制价格上得箭头图标
    computed:{
        sortArrow(){
            if(this.activePrice === 'low'){
                return 'icon-down'
            }else{
                return 'icon-up'
            }
        }
    },
    mounted(){
        this.setSortKey('recommend')
    },
    methods:{
        setSortKey(val){
            this.activeSortKey = val
            // 传递数据给父组件
            this.$emit('getKey',this.activeSortKey)
        },
        changePrice(){
            if(this.activeSortKey === this.activePrice){
                this.activePrice = this.activePrice === 'low'? 'height' : 'low'
            }
            this.setSortKey(this.activePrice)
        }
    }
}
</script>
<style lang = 'less' scoped>
    .sort-box{
        margin: 30px auto 20px;
        color: #666;
        .sort-order{
            a{
                margin-right: 50px;
                &:hover,&.active{
                    color: #00c3f5;
                    transition: all .3s ease;
                }
                /* 只有当悬浮上去的时候才会有显示箭头 */
                &:hover .arrow{
                    display: inline-block;
                }
            }
            .arrow{
                display: none;
            }
        }
    }
</style>