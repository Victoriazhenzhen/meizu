<!-- 在这里是筛选组件 -->
<template>
   <ul class="filter-box">
        <li class="box-item clearfix" v-for="(item,index) in data" :key="index">
            <div class="filter-title fl">{{item.name}}:</div>
            <ul class="fl">
                <li :class="{'active':activeFilter[item.key] === info.value }" class='filter-item fl' v-for="(info,i) in item.queryList" :key="i" @click="changeFilter(item.key,info.value)">
                        {{info.name}}
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
export default {
    name:"filter-box",
    props:{
        data:{
            type: Array,
            default:[]
        }
    },
    data(){
        return{
            // 做成一个对象的形式来使item.key和info.value一一对应 从而达到高亮的效果
            activeFilter:{}
        }
    },
    methods:{
        changeFilter(key,val){
            // this.activeFilter[key] =val 这里不能直接这么赋值 每次对象里面的字段发生改变时 vue是检测不到的 所以要写成this.$set
            this.$set(this.activeFilter, key, val)
            // 把筛选好的值传递给父组件category.vue  $emit方法 第一个参数为自定义事件的名称  第二个参数为要传递的数据
            this.$emit('filter',this.activeFilter)
        }
    }
}
</script>
<style lang = 'less' scoped>
    .filter-box{
        width: 1240px;
        margin: 0 auto;
        background-color: white;
        padding: 15px 10px;
        border: 1px solid #efefef;
        .box-item{
            line-height: 46px;
        }
        .filter-title{
            width: 85px;
            padding-left: 10px;
            /* 表示不换行 */
            white-space: nowrap;
            color: #333;
            overflow: hidden;
        }
        .filter-item{
            cursor: pointer;
            margin-right: 62px;
            &.active{
                color: #00c3f5;
            }
        }
    }
</style>